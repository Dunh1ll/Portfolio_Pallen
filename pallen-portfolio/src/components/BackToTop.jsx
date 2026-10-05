import { useEffect, useRef, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { scrollToSection } from '../lib/sections'

const R = 19
const C = 2 * Math.PI * R

// Round button with a progress ring; appears once you've scrolled past the hero.
export default function BackToTop() {
  const ringRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0
      if (ringRef.current) ringRef.current.style.strokeDashoffset = String(C * (1 - p))
      setVisible(window.scrollY > Math.max(500, window.innerHeight * 0.7))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <button
      type="button"
      onClick={() => scrollToSection('home')}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className="fixed right-5 bottom-5 z-40 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300"
      style={{
        background: 'color-mix(in srgb, var(--card) 90%, transparent)',
        border: '1px solid var(--border)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        color: 'var(--head)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.9)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <svg className="absolute inset-0 -rotate-90" width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
        <circle
          ref={ringRef}
          cx="22"
          cy="22"
          r={R}
          fill="none"
          stroke="var(--head)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C}
        />
      </svg>
      <ArrowUp size={16} />
    </button>
  )
}