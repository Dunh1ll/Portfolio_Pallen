import { useEffect, useRef, useState } from 'react'
import { finishIntro, introPlaying } from '../lib/motion'

const COUNT_MS = 1100 // how long the 0 → 100 count takes
const LIFT_MS = 850 // how long the curtain takes to lift away

const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2) // ease-in-out

// A short intro on the first visit of a session: the name appears, a counter runs
// 0 → 100, then the curtain lifts and the hero animates in. Click or press a key
// to skip. Never shown again in the same session, or with reduced motion.
export default function Preloader() {
  const [active] = useState(introPlaying)
  const [count, setCount] = useState(0)
  const [lifting, setLifting] = useState(false)
  const [gone, setGone] = useState(!active)
  const skip = useRef(() => {})

  useEffect(() => {
    if (!active) return
    let raf = 0
    let start = 0
    let done = false
    const timers = []

    const lift = () => {
      if (done) return
      done = true
      setCount(100)
      timers.push(
        setTimeout(() => {
          setLifting(true)
          finishIntro() // hero animations start as the curtain begins to rise
          timers.push(setTimeout(() => setGone(true), LIFT_MS + 50))
        }, 180)
      )
    }
    skip.current = lift

    const tick = (now) => {
      if (!start) start = now
      const t = Math.min((now - start) / COUNT_MS, 1)
      setCount(Math.round(ease(t) * 100))
      if (t < 1) raf = requestAnimationFrame(tick)
      else lift()
    }
    raf = requestAnimationFrame(tick)
    const onKey = () => skip.current()
    window.addEventListener('keydown', onKey)

    return () => {
      window.removeEventListener('keydown', onKey)
      cancelAnimationFrame(raf)
      timers.forEach(clearTimeout)
      finishIntro() // never leave the page locked, even if this unmounts early
    }
  }, [active])

  if (gone) return null

  return (
    <div
      role="status"
      aria-label="Loading"
      onPointerDown={() => skip.current()}
      className="fixed inset-0 z-[200] cursor-pointer"
      style={{
        transform: lifting ? 'translateY(-100%)' : 'translateY(0)',
        transition: `transform ${LIFT_MS}ms cubic-bezier(0.76, 0, 0.24, 1)`,
        pointerEvents: lifting ? 'none' : 'auto',
      }}
    >
      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-12" style={{ background: 'var(--bg)' }}>
        <p className="text-[10px] font-bold tracking-[3px]" style={{ color: 'var(--muted)' }}>
          PORTFOLIO — {new Date().getFullYear()}
        </p>

        <div className="flex flex-col items-start">
          <div
            className="font-bold leading-[0.88] text-6xl md:text-8xl overflow-hidden"
            style={{ color: 'var(--head)', fontFamily: 'Playfair Display, serif', letterSpacing: '-4px', padding: '0.06em 0 0.12em' }}
            aria-hidden="true"
          >
            {[...'PALLEN'].map((ch, i) => (
              <span
                key={i}
                className="inline-block"
                style={{ animation: `letterRise 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) ${0.1 + i * 0.06}s both` }}
              >
                {ch}
              </span>
            ))}
          </div>
          <p className="mt-3 text-[11px] font-semibold tracking-[3px]" style={{ color: 'var(--body)' }}>
            COMPUTER ENGINEER · LAGUNA, PH
          </p>
        </div>

        <div>
          <div className="flex items-end justify-between mb-3">
            <span className="text-[10px] font-bold tracking-[3px]" style={{ color: 'var(--muted)' }}>
              LOADING
            </span>
            <span
              className="text-5xl md:text-7xl font-bold leading-none tabular-nums"
              style={{ color: 'var(--head)', fontFamily: 'Playfair Display, serif', letterSpacing: '-2px' }}
            >
              {String(count).padStart(3, '0')}
            </span>
          </div>
          <div className="h-[2px] w-full" style={{ background: 'var(--border)' }}>
            <div
              className="h-full origin-left"
              style={{
                transform: `scaleX(${count / 100})`,
                background: 'linear-gradient(90deg, var(--accent-a), var(--accent-b))',
              }}
            />
          </div>
        </div>
      </div>

      {/* curved lower edge of the curtain, so it lifts away like a wave */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 top-full"
        style={{
          height: '9vw',
          background: 'var(--bg)',
          borderRadius: '0 0 50% 50% / 0 0 100% 100%',
        }}
      />
    </div>
  )
}