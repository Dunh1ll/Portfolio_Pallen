import { useEffect, useRef, useState } from 'react'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// True on devices with a real mouse (not touch screens).
export const canHover = () =>
  typeof window !== 'undefined' &&
  !!window.matchMedia?.('(hover: hover) and (pointer: fine)').matches

// ── Intro sequence ──
// index.html marks the page with data-intro="playing" on a first visit. The
// preloader clears it when it starts to lift; everything that should wait for the
// reveal (hero animations, count-ups, typing) waits for that moment.
export const introPlaying = () =>
  typeof document !== 'undefined' && document.documentElement.dataset.intro === 'playing'

export function finishIntro() {
  if (!introPlaying()) return
  delete document.documentElement.dataset.intro
  try {
    sessionStorage.setItem('pallen-intro', '1')
  } catch {
    // storage unavailable: the intro may simply play again next visit
  }
  window.dispatchEvent(new Event('intro-done'))
}

// Runs cb now, or as soon as the intro ends. Returns a cleanup function.
export function afterIntro(cb) {
  if (!introPlaying()) {
    cb()
    return () => {}
  }
  const handler = () => cb()
  window.addEventListener('intro-done', handler, { once: true })
  return () => window.removeEventListener('intro-done', handler)
}

// Becomes true the first time the element scrolls into view (after the intro).
export function useInView({ threshold = 0.3 } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let observer
    const stopWaiting = afterIntro(() => {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true)
            observer.disconnect()
          }
        },
        { threshold }
      )
      observer.observe(el)
    })
    return () => {
      stopWaiting()
      observer?.disconnect()
    }
  }, [threshold])

  return { ref, inView }
}

// Counts from 0 up to `target` once `active` turns true. Returns a plain number.
export function useCountUp(target, active, { duration = 1400, delay = 0 } = {}) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    if (prefersReducedMotion()) {
      setValue(target)
      return
    }
    let raf
    const start = performance.now() + delay
    const tick = (now) => {
      const t = Math.min(Math.max((now - start) / duration, 0), 1)
      setValue(target * (1 - Math.pow(1 - t, 3))) // ease-out cubic
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, active, duration, delay])

  return value
}

// One listener for the whole page: any element with the "spotlight" class gets
// --mx / --my set to the cursor position, which the CSS uses for a soft glow.
export function useSpotlight() {
  useEffect(() => {
    if (!canHover()) return
    let raf = 0
    let last = null

    const apply = () => {
      raf = 0
      const el = last?.target?.closest?.('.spotlight, .glow-text')
      if (!el) return
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${last.clientX - rect.left}px`)
      el.style.setProperty('--my', `${last.clientY - rect.top}px`)
    }
    const onMove = (e) => {
      last = e
      if (!raf) raf = requestAnimationFrame(apply)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])
}

// Smooth pointer position for depth effects. Sets --px / --py (each from -1 at the
// left/top edge to 1 at the right/bottom edge) on the element, easing toward the
// mouse. Children can then shift by different amounts using calc(var(--px) * Npx).
export function useParallaxPointer(ref) {
  useEffect(() => {
    if (!canHover() || prefersReducedMotion()) return
    const el = ref.current
    if (!el) return
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0

    const loop = () => {
      cx += (tx - cx) * 0.08
      cy += (ty - cy) * 0.08
      el.style.setProperty('--px', cx.toFixed(3))
      el.style.setProperty('--py', cy.toFixed(3))
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.002 ? requestAnimationFrame(loop) : 0
    }
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(loop)
    }
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      if (r.bottom < 0 || r.top > window.innerHeight) return
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2
      kick()
    }
    const onLeave = () => {
      tx = 0
      ty = 0
      kick()
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [ref])
}