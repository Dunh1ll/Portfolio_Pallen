import { useState } from 'react'

// Colors come from the theme, so the buttons read well in both light and dark.
export default function CtaButton({ label, icon: Icon, filled, onClick }) {
  const [hover, setHover] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative flex items-center gap-2 px-[22px] py-[13px] rounded-[10px] text-[13px] font-bold overflow-hidden transition-all duration-200 cursor-pointer"
      style={{
        transform: hover ? 'translateY(-3px)' : 'translateY(0)',
        background: filled
          ? 'var(--head)'
          : hover
            ? 'color-mix(in srgb, var(--head) 9%, transparent)'
            : 'transparent',
        color: filled ? 'var(--bg)' : 'var(--card-text)',
        border: filled ? '1px solid var(--head)' : `1px solid ${hover ? 'var(--head)' : 'var(--border-h)'}`,
        boxShadow: hover
          ? '0 12px 28px -10px color-mix(in srgb, var(--head) 50%, transparent)'
          : '0 0 0 transparent',
      }}
    >
      {/* light sweeps across the button on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 -left-1/2 w-1/2 pointer-events-none"
        style={{
          background: 'linear-gradient(100deg, transparent, rgba(255,255,255,0.35), transparent)',
          transform: hover ? 'translateX(420%) skewX(-15deg)' : 'translateX(0) skewX(-15deg)',
          transition: hover ? 'transform 0.8s ease' : 'none',
          opacity: filled ? 0.6 : 0.25,
        }}
      />
      <Icon size={14} className="relative transition-transform duration-200 group-hover:scale-110" />
      <span className="relative">{label}</span>
    </button>
  )
}