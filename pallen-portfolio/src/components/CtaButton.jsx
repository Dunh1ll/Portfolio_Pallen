import { useState } from 'react'

export default function CtaButton({ label, icon: Icon, filled, onClick }) {
  const [hover, setHover] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex items-center gap-2 px-[22px] py-[13px] rounded-[10px] text-[13px] font-bold transition-all duration-200"
      style={{
        transform: hover ? 'translateY(-3px)' : 'translateY(0)',
        background: filled
          ? (hover ? 'var(--color-p85)' : 'var(--color-p98)')
          : (hover ? 'rgba(255,255,255,0.14)' : 'transparent'),
        color: filled ? 'var(--color-p00)' : 'var(--color-p70)',
        border: filled ? 'none' : `1px solid ${hover ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.14)'}`,
        boxShadow: filled && hover ? '0 0 24px 2px rgba(255,255,255,0.3)' : 'none',
      }}
    >
      <Icon size={14} />
      {label}
    </button>
  )
}