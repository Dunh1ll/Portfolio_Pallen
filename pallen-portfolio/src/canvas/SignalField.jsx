import { useEffect, useRef } from 'react'
import { useCanvasSize } from '../utils/useCanvasSize'
import { useTheme } from '../theme/ThemeContext'
import { afterIntro, prefersReducedMotion } from '../lib/motion'

const SPACING = 26 // distance between dots
const RADIUS = 150 // how far the cursor's influence reaches
const RIPPLE_MS = 1500
const GREEN = '74,222,128' // same green as the "Available" dot

// An invisible grid of dots that lights up around the cursor, and sends a green
// pulse outward when you click. Nothing is drawn until you interact, so the
// hero looks the same as before while idle. One pulse also plays on load.
export default function SignalField() {
  const [containerRef, { width: w, height: h }] = useCanvasSize()
  const canvasRef = useRef(null)
  const { dark } = useTheme()

  useEffect(() => {
    if (!w || !h || prefersReducedMotion()) return
    const canvas = canvasRef.current
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    const ctx = canvas.getContext('2d')
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const cols = Math.floor(w / SPACING)
    const rows = Math.floor(h / SPACING)
    const energy = new Float32Array(cols * rows)
    const base = dark ? '255,255,255' : '0,0,0'
    let ripples = []
    let pointer = null // last pointer position in viewport coordinates
    let raf = 0

    const frame = (now) => {
      raf = 0
      ctx.clearRect(0, 0, w, h)
      const rect = canvas.getBoundingClientRect()
      const mx = pointer ? pointer.x - rect.left : -9999
      const my = pointer ? pointer.y - rect.top : -9999
      ripples = ripples.filter((r) => now - r.t0 < RIPPLE_MS)
      let moving = false

      for (let i = 0; i < cols; i++) {
        const x = i * SPACING + SPACING / 2
        for (let j = 0; j < rows; j++) {
          const y = j * SPACING + SPACING / 2
          const d = Math.hypot(x - mx, y - my)
          const target = d < RADIUS ? Math.pow(1 - d / RADIUS, 2) : 0

          let ring = 0
          for (const r of ripples) {
            const age = (now - r.t0) / RIPPLE_MS
            const radius = age * Math.max(w, h) * 0.6
            const dd = Math.abs(Math.hypot(x - r.x, y - r.y) - radius)
            if (dd < 48) ring = Math.max(ring, (1 - dd / 48) * (1 - age))
          }

          const idx = i * rows + j
          const e = energy[idx] + (target - energy[idx]) * 0.18
          energy[idx] = e
          if (Math.abs(target - e) > 0.004) moving = true

          if (ring > 0.03) {
            ctx.fillStyle = `rgba(${GREEN},${Math.min(1, ring * 0.95)})`
            ctx.beginPath()
            ctx.arc(x, y, 1.2 + ring * 2.4, 0, Math.PI * 2)
            ctx.fill()
          } else if (e > 0.02) {
            ctx.fillStyle = `rgba(${base},${e * 0.55})`
            ctx.beginPath()
            ctx.arc(x, y, 1 + e * 2.2, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }
      if (moving || ripples.length) raf = requestAnimationFrame(frame)
    }
    const start = () => {
      if (!raf) raf = requestAnimationFrame(frame)
    }

    const visible = () => {
      const r = canvas.getBoundingClientRect()
      return r.bottom > 0 && r.top < window.innerHeight
    }
    const onMove = (e) => {
      if (e.pointerType === 'touch') return
      pointer = { x: e.clientX, y: e.clientY }
      if (visible()) start()
    }
    const onDown = (e) => {
      const r = canvas.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      if (x < 0 || y < 0 || x > w || y > h) return
      ripples.push({ x, y, t0: performance.now() })
      start()
    }
    const onLeave = () => {
      pointer = null
      start()
    }
    const onScroll = () => {
      if (pointer && visible()) start()
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)

    // One pulse after the title has landed, spreading out from the name.
    let intro
    const stopWaiting = afterIntro(() => {
      intro = setTimeout(() => {
        ripples.push({ x: w * 0.2, y: h * 0.6, t0: performance.now() })
        start()
      }, 1500)
    })

    return () => {
      stopWaiting()
      clearTimeout(intro)
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('scroll', onScroll)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [w, h, dark])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  )
}