import { useEffect, useRef, useState } from 'react'

const FILL_MS = 1400 // how long each bar takes to "load"
const STAGGER_MS = 130 // delay between one skill and the next

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// Counts 0 -> target while the bar fills, so the number and bar stay in sync.
function useCountUp(target, active, delayMs) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    if (prefersReducedMotion()) {
      setValue(target)
      return
    }
    let raf
    const timer = setTimeout(() => {
      const start = performance.now()
      const tick = (now) => {
        const t = Math.min((now - start) / FILL_MS, 1)
        const eased = 1 - Math.pow(1 - t, 3) // ease-out cubic, matches the bar
        setValue(Math.round(target * eased))
        if (t < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, delayMs)
    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(raf)
    }
  }, [target, active, delayMs])

  return value
}

function SkillRow({ item, index, active }) {
  const color = item.color || 'var(--head)'
  const percent = Math.round(item.proficiency * 100)
  const delay = index * STAGGER_MS
  const reduced = prefersReducedMotion()
  const shown = useCountUp(percent, active, delay)

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span
          className="flex items-center gap-2 text-[13px] font-medium"
          style={{ color: 'var(--card-text)' }}
        >
          <span
            aria-hidden="true"
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{
              background: color,
              boxShadow: `0 0 6px ${color}`,
              opacity: active ? 1 : 0.25,
              transition: `opacity 0.4s ease ${delay}ms`,
            }}
          />
          {item.name}
        </span>
        <span className="text-[11px] tabular-nums" style={{ color: 'var(--card-sub)' }}>
          {reduced ? percent : shown}%
        </span>
      </div>

      <div
        className="h-[5px] rounded-full overflow-hidden"
        style={{ background: 'var(--bg-3)' }}
        role="progressbar"
        aria-label={`${item.name} proficiency`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
      >
        <div
          className="relative h-full rounded-full overflow-hidden"
          style={{
            width: active ? `${percent}%` : '0%',
            background: color,
            boxShadow: `0 0 10px ${color}66`,
            transition: reduced
              ? 'none'
              : `width ${FILL_MS}ms cubic-bezier(0.33, 1, 0.68, 1) ${delay}ms`,
          }}
        >
          {/* Moving shine that makes the bar look like it is loading */}
          {active && !reduced && (
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-full"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)',
                animation: `skillShine 1s ease-in-out ${delay}ms 2`,
                transform: 'translateX(-100%)',
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export function SkillBlock({ label, items }) {
  const ref = useRef(null)
  const [active, setActive] = useState(false)

  // Start loading when the block scrolls into view (once).
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref}>
      <p className="text-xs font-bold tracking-wide mb-3" style={{ color: 'var(--eyebrow)' }}>
        {label.toUpperCase()}
      </p>
      <div className="flex flex-col gap-3">
        {items.map((item, i) => (
          <SkillRow key={item.name} item={item} index={i} active={active} />
        ))}
      </div>
    </div>
  )
}