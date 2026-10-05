import { useCountUp, useInView } from '../lib/motion'

function Metric({ value, decimals = 0, suffix = '', label, index }) {
  const { ref, inView } = useInView({ threshold: 0.5 })
  const shown = useCountUp(value, inView, { duration: 1500, delay: index * 120 })

  return (
    <div
      ref={ref}
      className="spotlight rounded-xl px-5 py-4"
      style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}
    >
      <p
        className="text-3xl font-bold leading-none tabular-nums"
        style={{ color: 'var(--head)', fontFamily: 'Playfair Display, serif', letterSpacing: '-1px' }}
        aria-label={`${value.toFixed(decimals)}${suffix}`}
      >
        <span aria-hidden="true">{shown.toFixed(decimals)}{suffix}</span>
      </p>
      <p className="text-[11px] mt-2 leading-snug" style={{ color: 'var(--card-sub)' }}>
        {label}
      </p>
    </div>
  )
}

// A row of key numbers that count up when scrolled into view.
export default function MetricStrip({ items }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {items.map((m, i) => (
        <Metric key={m.label} index={i} {...m} />
      ))}
    </div>
  )
}