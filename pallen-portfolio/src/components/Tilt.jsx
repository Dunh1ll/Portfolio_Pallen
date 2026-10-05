import { useRef } from 'react'
import { canHover, prefersReducedMotion } from '../lib/motion'

// 3D tilt that follows the cursor, with a soft light glare across the surface.
export default function Tilt({ children, max = 9, className = '', radius = '0.75rem' }) {
  const ref = useRef(null)
  const glareRef = useRef(null)

  const onMove = (e) => {
    if (!canHover() || prefersReducedMotion()) return
    const el = ref.current
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    el.style.transition = 'transform 0.12s linear'
    el.style.transform =
      `perspective(900px) rotateX(${(0.5 - py) * 2 * max}deg) rotateY(${(px - 0.5) * 2 * max}deg) scale3d(1.03, 1.03, 1.03)`
    const glare = glareRef.current
    glare.style.opacity = '1'
    glare.style.background =
      `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.28), transparent 55%)`
  }
  const onLeave = () => {
    const el = ref.current
    el.style.transition = 'transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)'
    el.style.transform = ''
    glareRef.current.style.opacity = '0'
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`relative ${className}`}
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      {children}
      <div
        ref={glareRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ borderRadius: radius, opacity: 0, transition: 'opacity 0.4s ease', mixBlendMode: 'soft-light' }}
      />
    </div>
  )
}