// Reusable building blocks for the Work page —
// ports of PallenMetaBadge, PallenGrayPill, PallenRcoCard, PallenIconSquare-based
// detail cards, and the project "hero" header card from pallen_work_page.dart

export function MetaBadge({ icon: Icon, text }) {
  return (
    <div
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-medium"
      style={{ background: 'var(--bg-3)', border: '1px solid var(--border)', color: 'var(--body)' }}
    >
      <Icon size={12} />
      {text}
    </div>
  )
}

export function GrayPill({ children }) {
  return (
    <span
      className="px-2.5 py-1 rounded-full text-[10.5px] font-semibold"
      style={{ background: 'var(--bg-3)', color: 'var(--body)', border: '1px solid var(--border)' }}
    >
      {children}
    </span>
  )
}

export function TagRow({ label, items }) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <span className="text-[9.5px] font-bold tracking-[2.5px]" style={{ color: 'var(--muted)' }}>
        {label.toUpperCase()}
      </span>
      <div className="h-px w-6" style={{ background: 'var(--line)' }} />
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <GrayPill key={item}>{item}</GrayPill>
        ))}
      </div>
    </div>
  )
}

export function RcoCard({ icon: Icon, title, body }) {
  return (
    <div
      className="rounded-xl p-6 h-full"
      style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
        style={{ background: 'var(--bg-3)', border: '1px solid var(--border)' }}
      >
        <Icon size={17} style={{ color: 'var(--icon)' }} />
      </div>
      <p className="text-[13px] font-bold mb-2" style={{ color: 'var(--card-text)' }}>{title}</p>
      <p className="text-[12px] leading-[1.7]" style={{ color: 'var(--card-sub)' }}>{body}</p>
    </div>
  )
}

// Reusable "3-up" detail card used for activities / deliverables / departments.
// visual can be: { type: 'illustration', node: <svg/> } or { type: 'checklist', items: [...] }
export function DetailCard({ icon: Icon, title, subtitle, visual, caption, description }) {
  return (
    <div
      className="rounded-xl p-6 h-full flex flex-col"
      style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}
    >
      <div className="flex items-center gap-3 mb-1">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: 'var(--bg-3)', border: '1px solid var(--border)' }}
        >
          <Icon size={17} style={{ color: 'var(--icon)' }} />
        </div>
        <p className="text-[13px] font-bold" style={{ color: 'var(--card-text)' }}>{title}</p>
      </div>
      {subtitle && (
        <p className="text-[9.5px] font-medium ml-12 -mt-1 mb-3" style={{ color: 'var(--body)' }}>
          {subtitle}
        </p>
      )}

      <div
        className="rounded-lg h-[120px] relative overflow-hidden flex items-center justify-center mt-3"
        style={{ background: 'var(--bg-3)' }}
      >
        {visual.type === 'illustration' && visual.node}
        {visual.type === 'checklist' && (
          <div className="w-full h-full p-3 flex flex-col justify-evenly">
            {visual.items.map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12l3 3 5-6" />
                </svg>
                <span className="text-[10px] font-medium" style={{ color: 'var(--body)' }}>{item}</span>
              </div>
            ))}
          </div>
        )}
        {caption && (
          <span
            className="absolute bottom-2 left-2.5 text-[9.5px] font-semibold tracking-wide"
            style={{ color: 'var(--muted)' }}
          >
            {caption}
          </span>
        )}
      </div>

      <p className="text-[11px] leading-[1.6] mt-3" style={{ color: 'var(--card-sub)' }}>
        {description}
      </p>
    </div>
  )
}

export function ProjectHeroCard({ chips, title, titleSize = 52, description, badges, icon: Icon, iconNode }) {
  return (
    <div
      className="rounded-xl p-9 flex items-start gap-8"
      style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}
    >
      <div className="flex-1">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
          {chips.map((chip) => (
            <div
              key={chip}
              className="px-3 py-1.5 rounded-md text-[9.5px] font-bold tracking-[2px] backdrop-blur-md"
              style={{ color: 'var(--body)', background: 'color-mix(in srgb, var(--head) 7%, transparent)', border: '1px solid color-mix(in srgb, var(--head) 14%, transparent)' }}
            >
              {chip}
            </div>
          ))}
        </div>
        <h3
          className="font-bold whitespace-pre-line"
          style={{ color: 'var(--head)', fontFamily: 'Playfair Display, serif', fontSize: titleSize, letterSpacing: -2, lineHeight: 0.95 }}
        >
          {title}
        </h3>
        <p className="text-sm leading-[1.65] mt-3.5 max-w-2xl" style={{ color: 'var(--body)' }}>
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mt-6">
          {badges.map((b) => (
            <MetaBadge key={b.text} icon={b.icon} text={b.text} />
          ))}
        </div>
      </div>
      <div
        className="w-[90px] h-[90px] rounded-[22px] flex items-center justify-center shrink-0"
        style={{ background: 'var(--card)', border: '1px solid var(--border)', boxShadow: '0 0 24px rgba(255,255,255,0.06)' }}
      >
        {iconNode ? iconNode : <Icon size={38} style={{ color: 'var(--icon)' }} />}
      </div>
    </div>
  )
}

// ── Simplified inline SVG illustrations (stand-ins for the Dart CustomPainters) ──

export function LightingIllustration() {
  return (
    <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
      <rect x="10" y="10" width="60" height="8" rx="2" stroke="var(--icon)" strokeWidth="1.5" />
      <line x1="16" y1="14" x2="64" y2="14" stroke="var(--icon)" strokeWidth="1" strokeDasharray="2 3" />
      <path d="M40 22 L40 34 M32 34 L48 34 M34 40 L46 40 M36 46 L44 46" stroke="var(--icon)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="40" cy="30" r="3" fill="none" stroke="#4ade80" strokeWidth="1.2" />
    </svg>
  )
}

export function WiringIllustration() {
  return (
    <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
      <rect x="26" y="18" width="28" height="24" rx="3" stroke="var(--icon)" strokeWidth="1.5" />
      <circle cx="35" cy="26" r="2" fill="var(--icon)" />
      <circle cx="45" cy="26" r="2" fill="var(--icon)" />
      <circle cx="35" cy="34" r="2" fill="var(--icon)" />
      <circle cx="45" cy="34" r="2" fill="var(--icon)" />
      <path d="M10 30 L26 30 M54 30 L70 30" stroke="var(--icon)" strokeWidth="1.5" />
    </svg>
  )
}

export function PcbIllustration() {
  return (
    <svg width="100" height="70" viewBox="0 0 100 70" fill="none">
      <rect x="15" y="10" width="70" height="50" rx="3" stroke="#4ade80" strokeWidth="1.3" />
      <rect x="35" y="24" width="30" height="22" rx="2" stroke="var(--icon)" strokeWidth="1.2" />
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={`t${i}`} x1={40 + i * 6} y1="18" x2={40 + i * 6} y2="24" stroke="var(--icon)" strokeWidth="1" />
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={`b${i}`} x1={40 + i * 6} y1="46" x2={40 + i * 6} y2="52" stroke="var(--icon)" strokeWidth="1" />
      ))}
      <circle cx="22" cy="17" r="1.6" fill="var(--icon)" />
      <circle cx="78" cy="17" r="1.6" fill="var(--icon)" />
      <circle cx="22" cy="53" r="1.6" fill="var(--icon)" />
      <circle cx="78" cy="53" r="1.6" fill="var(--icon)" />
    </svg>
  )
}

export function ThreeDBoxIllustration() {
  return (
    <svg width="70" height="55" viewBox="0 0 70 55" fill="none">
      <path d="M15 15 L35 5 L55 15 L55 40 L35 50 L15 40 Z" stroke="var(--icon)" strokeWidth="1.4" />
      <path d="M15 15 L35 25 L55 15 M35 25 L35 50" stroke="var(--icon)" strokeWidth="1.4" />
    </svg>
  )
}

export function BlindStickIllustration({ color = 'var(--icon)' }) {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <line x1="16" y1="6" x2="36" y2="46" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="16" cy="6" r="4" fill="none" stroke={color} strokeWidth="1.6" />
      <path d="M24 12 L20 16 M20 12 L24 16" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      <path d="M30 26 L26 30 M26 26 L30 30" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}