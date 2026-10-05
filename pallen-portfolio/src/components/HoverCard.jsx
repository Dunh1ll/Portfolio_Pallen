import { useState } from 'react'

export default function HoverCard({ children, slideRight = false, className = '' }) {
  const [hover, setHover] = useState(false)

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`spotlight flex items-center rounded-lg px-4 py-3 transition-all duration-200 ${className}`}
      style={{
        background: hover ? 'var(--card-h)' : 'var(--card)',
        border: `1px solid ${hover ? 'var(--card-border-h)' : 'var(--card-border)'}`,
        transform: slideRight && hover ? 'translateX(4px)' : 'translateX(0)',
      }}
    >
      {children}
    </div>
  )
}