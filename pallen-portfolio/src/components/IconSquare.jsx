export default function IconSquare({ icon: Icon, size = 36 }) {
  return (
    <div
      className="flex items-center justify-center rounded-lg shrink-0"
      style={{ width: size, height: size, background: 'var(--bg-3)', border: '1px solid var(--border)' }}
    >
      <Icon size={size * 0.5} style={{ color: 'var(--icon)' }} />
    </div>
  )
}