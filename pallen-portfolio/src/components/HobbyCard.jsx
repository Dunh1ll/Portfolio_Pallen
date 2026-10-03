export default function HobbyCard({ icon: Icon, accentColor, title, subtitle, description, tag, tagIcon: TagIcon }) {
  return (
    <div
      className="rounded-xl p-5 h-full flex flex-col gap-3 relative overflow-hidden"
      style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}
    >
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ background: `radial-gradient(circle at 80% 0%, ${accentColor}, transparent 60%)` }}
      />
      <div className="relative flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background: `${accentColor}22`, color: accentColor }}
        >
          <Icon size={18} />
        </div>
        <div>
          <p className="text-sm font-bold" style={{ color: 'var(--card-text)' }}>{title}</p>
          <p className="text-[11px]" style={{ color: 'var(--card-sub)' }}>{subtitle}</p>
        </div>
      </div>
      <p className="relative text-[12px] leading-relaxed" style={{ color: 'var(--card-sub)' }}>
        {description}
      </p>
      <div
        className="relative w-fit flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold mt-auto"
        style={{ background: `${accentColor}18`, color: accentColor }}
      >
        <TagIcon size={11} />
        {tag}
      </div>
    </div>
  )
}