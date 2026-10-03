export default function QuickStat({ value, label }) {
  return (
    <div
      className="px-3 py-[7px] rounded-lg text-center"
      style={{
        background: 'color-mix(in srgb, var(--head) 5%, transparent)',
        border: '1px solid color-mix(in srgb, var(--head) 12%, transparent)',
      }}
    >
      <div className="text-[16px] font-bold leading-none" style={{ color: 'var(--head)' }}>
        {value}
      </div>
      <div className="text-[9px]" style={{ color: 'var(--body)' }}>
        {label}
      </div>
    </div>
  )
}