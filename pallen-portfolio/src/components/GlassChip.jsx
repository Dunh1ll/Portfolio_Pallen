export default function GlassChip({ children }) {
  return (
    <div
      className="inline-block px-3 py-1.5 rounded-md text-[9.5px] font-bold tracking-[2px] backdrop-blur-md"
      style={{
        color: 'var(--body)',
        background: 'color-mix(in srgb, var(--head) 7%, transparent)',
        border: '1px solid color-mix(in srgb, var(--head) 14%, transparent)',
      }}
    >
      {children}
    </div>
  )
}