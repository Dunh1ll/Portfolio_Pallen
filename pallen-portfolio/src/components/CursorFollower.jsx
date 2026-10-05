import { useEffect, useRef, useState } from 'react'
import { canHover, prefersReducedMotion } from '../lib/motion'

const INTERACTIVE = 'a, button, [role="button"], summary, label, select, [data-cursor]'
const TEXT_FIELDS = 'input, textarea'
const LABELED = '[data-cursor-label]'

// A small dot plus a trailing ring that follows the mouse and swells over links
// and buttons. The normal cursor stays visible. Only runs with a real mouse.
export default function CursorFollower() {
  const [enabled] = useState(() => canHover() && !prefersReducedMotion())
  const wrapRef = useRef(null)
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)
  const labelTextRef = useRef(null)

  useEffect(() => {
    if (!enabled) return
    const wrap = wrapRef.current
    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    const labelText = labelTextRef.current
    let x = -100, y = -100, rx = -100, ry = -100
    let raf = 0

    const loop = () => {
      rx += (x - rx) * 0.2
      ry += (y - ry) * 0.2
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      label.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`
      // keep animating until the ring has caught up
      raf = Math.abs(x - rx) + Math.abs(y - ry) > 0.2 ? requestAnimationFrame(loop) : 0
    }
    const start = () => {
      if (!raf) raf = requestAnimationFrame(loop)
    }

    const onMove = (e) => {
      if (e.pointerType === 'touch') return
      x = e.clientX
      y = e.clientY
      wrap.dataset.visible = 'true'
      start()
    }
    const onOver = (e) => {
      const t = e.target
      const labeled = t?.closest?.(LABELED)
      if (t?.closest?.(TEXT_FIELDS)) wrap.dataset.mode = 'text'
      else if (t?.closest?.(INTERACTIVE)) wrap.dataset.mode = 'link'
      else if (labeled) {
        labelText.textContent = labeled.dataset.cursorLabel // e.g. "View" or "Drag"
        wrap.dataset.mode = 'label'
      } else wrap.dataset.mode = 'default'
    }
    const onDown = () => { wrap.dataset.pressed = 'true' }
    const onUp = () => { wrap.dataset.pressed = 'false' }
    const onLeave = () => { wrap.dataset.visible = 'false' }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="cursor-layer"
      data-visible="false"
      data-mode="default"
      data-pressed="false"
    >
      <div ref={ringRef} className="cursor-ring">
        <div className="cursor-ring-inner" />
      </div>
      <div ref={labelRef} className="cursor-label">
        <div ref={labelTextRef} className="cursor-label-inner" />
      </div>
      <div ref={dotRef} className="cursor-dot">
        <div className="cursor-dot-inner" />
      </div>
    </div>
  )
}