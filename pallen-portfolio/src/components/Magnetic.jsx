import { useRef } from 'react'
import { canHover, prefersReducedMotion } from '../lib/motion'

// Pulls its child a little toward the cursor, then springs back on leave.
// The extra padding (cancelled by negative margin) widens the pull zone.
export default function Magnetic({ children, strength = 0.3, className = '' }) {
  const ref = useRef(null)

  const onMove = (e) => {
    if (!canHover() || prefersReducedMotion()) return
    const el = ref.current
    const rect = el.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    el.style.transition = 'transform 0.15s ease-out'
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`
  }
  const onLeave = () => {
    const el = ref.current
    el.style.transition = 'transform 0.6s cubic-bezier(0.2, 1.6, 0.4, 1)'
    el.style.transform = ''
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`inline-block p-3 -m-3 ${className}`}
    >
      {children}
    </div>
  )
}