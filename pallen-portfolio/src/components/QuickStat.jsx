import { useCountUp, useInView } from '../lib/motion'

// Small stat chip whose number counts up when it appears.
export default function QuickStat({ value, label, delay = 0 }) {
  const target = parseInt(value, 10)
  const { ref, inView } = useInView({ threshold: 0.5 })
  const shown = useCountUp(Number.isNaN(target) ? 0 : target, inView, { duration: 1300, delay: delay * 1000 })

  return (
    <div
      ref={ref}
      className="px-3 py-[7px] rounded-lg text-center transition-transform duration-200 hover:-translate-y-0.5"
      style={{
        background: 'color-mix(in srgb, var(--head) 5%, transparent)',
        border: '1px solid color-mix(in srgb, var(--head) 12%, transparent)',
      }}
    >
      <div
        className="text-[16px] font-bold leading-none tabular-nums"
        style={{ color: 'var(--head)' }}
        aria-label={value}
      >
        <span aria-hidden="true">{Number.isNaN(target) ? value : Math.round(shown)}</span>
      </div>
      <div className="text-[9px]" style={{ color: 'var(--body)' }}>
        {label}
      </div>
    </div>
  )
}