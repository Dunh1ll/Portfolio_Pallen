export function SkillBlock({ label, items }) {
  return (
    <div>
      <p className="text-xs font-bold tracking-wide mb-3" style={{ color: 'var(--eyebrow)' }}>
        {label.toUpperCase()}
      </p>
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div key={item.name}>
            <div className="flex justify-between mb-1">
              <span className="text-[13px] font-medium" style={{ color: 'var(--card-text)' }}>
                {item.name}
              </span>
              <span className="text-[11px]" style={{ color: 'var(--card-sub)' }}>
                {Math.round(item.proficiency * 100)}%
              </span>
            </div>
            <div className="h-[5px] rounded-full overflow-hidden" style={{ background: 'var(--bg-3)' }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${item.proficiency * 100}%`, background: 'var(--head)' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}