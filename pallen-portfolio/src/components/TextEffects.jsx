import { useEffect, useRef, useState } from 'react'
import { afterIntro, prefersReducedMotion } from '../lib/motion'

// Hero title: every letter rises into place one after another, and lifts
// slightly when the cursor passes over it.
export function SplitLetters({ text, delay = 0.6, step = 0.07 }) {
  return (
    <span
      aria-label={text}
      className="block overflow-hidden"
      style={{ padding: '0.08em 0 0.14em', margin: '-0.08em 0 -0.14em' }}
    >
      {[...text].map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="hero-letter-wrap inline-block"
          style={{ animation: `letterRise 0.95s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay + i * step}s both` }}
        >
          <span className="hero-letter inline-block">{ch === ' ' ? ' ' : ch}</span>
        </span>
      ))}
    </span>
  )
}

// Section titles: words slide up out of a mask when the title scrolls into view.
export function RevealText({ text, delay = 0 }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <span ref={ref} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block overflow-hidden align-top"
          style={{ padding: '0.1em 0 0.2em', margin: '-0.1em 0.26em -0.2em 0' }}
        >
          <span
            className="inline-block"
            style={{
              transform: shown ? 'translateY(0)' : 'translateY(115%)',
              transition: `transform 0.85s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay + i * 0.07}s`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  )
}

const ROLES = ['ESP32 firmware', 'Flutter apps', 'Go backends', 'PCB layouts in KiCad']

// "I build ..." line that types and deletes each thing I build.
export function TypedRoles() {
  const [text, setText] = useState('')
  const reduced = prefersReducedMotion()
  const full = `I build ${ROLES.slice(0, -1).join(', ')}, and ${ROLES[ROLES.length - 1]}.`

  useEffect(() => {
    if (reduced) return
    let i = 0
    let pos = 0
    let deleting = false
    let timer

    const tick = () => {
      const word = ROLES[i]
      if (!deleting) {
        pos++
        setText(word.slice(0, pos))
        if (pos === word.length) {
          deleting = true
          timer = setTimeout(tick, 1700)
          return
        }
        timer = setTimeout(tick, 60)
      } else {
        pos--
        setText(word.slice(0, pos))
        if (pos === 0) {
          deleting = false
          i = (i + 1) % ROLES.length
          timer = setTimeout(tick, 350)
          return
        }
        timer = setTimeout(tick, 30)
      }
    }
    // starts after the intro is over and the title has landed
    const stopWaiting = afterIntro(() => {
      timer = setTimeout(tick, 1900)
    })
    return () => {
      stopWaiting()
      clearTimeout(timer)
    }
  }, [reduced])

  if (reduced) {
    return (
      <p className="text-[13px]" style={{ color: 'var(--body)' }}>{full}</p>
    )
  }

  return (
    <p className="text-[13px] min-h-[1.6em] flex items-center" aria-label={full} style={{ color: 'var(--body)' }}>
      <span aria-hidden="true">
        I build{' '}
        <span style={{ color: 'var(--head)', fontWeight: 600 }}>{text}</span>
        <span className="typed-caret" />
      </span>
    </p>
  )
}