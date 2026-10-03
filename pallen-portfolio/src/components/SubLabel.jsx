export default function SubLabel({ children }) {
  return (
    <h3 className="text-[13px] font-bold tracking-[1px]" style={{ color: 'var(--head)' }}>
      {children}
    </h3>
  )
}