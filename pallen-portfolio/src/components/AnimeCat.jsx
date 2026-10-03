import { useEffect, useRef, useState } from 'react'

export default function AnimeCat() {
  const wrapRef = useRef(null)
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 })
  const [blink, setBlink] = useState(false)

  // Cursor tracking — eyes shift slightly toward the mouse, clamped small
  useEffect(() => {
    function onMove(e) {
      const el = wrapRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height * 0.35 // roughly where the eyes sit
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy) || 1
      const maxOffset = 3.2
      setEyeOffset({
        x: (dx / dist) * Math.min(maxOffset, dist / 40),
        y: (dy / dist) * Math.min(maxOffset, dist / 40),
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Random blinking, same rhythm idea as _scheduleBlink (2.5s–7s gaps, occasional double-blink)
  useEffect(() => {
    let cancelled = false
    async function loop() {
      while (!cancelled) {
        const wait = 2500 + Math.random() * 4500
        await new Promise((r) => setTimeout(r, wait))
        if (cancelled) return
        setBlink(true)
        await new Promise((r) => setTimeout(r, 110))
        setBlink(false)
        if (Math.random() < 0.22) {
          await new Promise((r) => setTimeout(r, 90))
          setBlink(true)
          await new Promise((r) => setTimeout(r, 110))
          setBlink(false)
        }
      }
    }
    loop()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div ref={wrapRef} className="w-[220px] h-[240px] animate-catBreathe">
      <svg viewBox="0 0 220 240" width="220" height="240">
        {/* Ears */}
        <path d="M55 70 L40 20 L85 55 Z" fill="#0a0a0a" />
        <path d="M165 70 L180 20 L135 55 Z" fill="#0a0a0a" />
        {/* Head */}
        <ellipse cx="110" cy="110" rx="70" ry="60" fill="#0a0a0a" />
        {/* Body */}
        <ellipse cx="110" cy="205" rx="55" ry="45" fill="#0a0a0a" />
        {/* Eyes (track cursor) */}
        <g>
          <ellipse cx="82" cy="105" rx="11" ry={blink ? 1 : 13} fill="#e8e8e8" />
          <ellipse cx="138" cy="105" rx="11" ry={blink ? 1 : 13} fill="#e8e8e8" />
          {!blink && (
            <>
              <circle cx={82 + eyeOffset.x} cy={105 + eyeOffset.y} r="5" fill="#0a0a0a" />
              <circle cx={138 + eyeOffset.x} cy={105 + eyeOffset.y} r="5" fill="#0a0a0a" />
            </>
          )}
        </g>
        {/* Nose */}
        <path d="M105 125 L115 125 L110 132 Z" fill="#ff8fa3" />
      </svg>
    </div>
  )
}