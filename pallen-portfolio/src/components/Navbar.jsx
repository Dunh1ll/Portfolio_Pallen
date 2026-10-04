import { useEffect, useRef, useState } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../theme/ThemeContext'
import { SECTIONS, scrollToSection } from '../lib/sections'

export default function Navbar({ active }) {
  const { dark, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)
  const openRef = useRef(false)
  const quietUntil = useRef(0) // ignore scroll events while a section jump is animating
  openRef.current = open

  // Hide the bar when scrolling down, bring it back when scrolling up.
  useEffect(() => {
    lastY.current = window.scrollY
    let ticking = false

    const update = () => {
      const y = Math.max(window.scrollY, 0)
      const delta = y - lastY.current
      ticking = false

      if (performance.now() < quietUntil.current) {
        lastY.current = y
        return
      }
      if (y < 80) {
        setHidden(false) // always visible near the top
      } else if (Math.abs(delta) > 6) {
        setHidden(delta > 0 && !openRef.current) // small moves are ignored: no flicker
      }
      if (Math.abs(delta) > 6) lastY.current = y
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    // A click on a nav link jumps to a section: tuck the bar away going down,
    // show it going up, and don't let the animated scroll flip it back and forth.
    const onJump = (e) => {
      quietUntil.current = performance.now() + 1100
      setHidden(e.detail.down && e.detail.id !== 'home')
      setOpen(false)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('section-jump', onJump)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('section-jump', onJump)
    }
  }, [])

  const go = (id) => (e) => {
    e.preventDefault()
    scrollToSection(id)
  }

  return (
    <nav
      className="sticky top-0 z-50"
      onFocus={() => setHidden(false)}
      style={{
        borderBottom: '1px solid var(--border)',
        background: 'color-mix(in srgb, var(--bg) 88%, transparent)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.35s cubic-bezier(0.33, 1, 0.68, 1)',
      }}
    >
      <div className="flex items-center justify-between px-5 md:px-10 py-5">
        <a
          href="/"
          onClick={go('home')}
          style={{ color: 'var(--head)', fontWeight: 600, letterSpacing: '0.05em', textDecoration: 'none' }}
        >
          PALLEN
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex gap-7">
          {SECTIONS.map((s) => {
            const on = s.id === active
            return (
              <a
                key={s.id}
                href={s.id === 'home' ? '/' : `/#${s.id}`}
                onClick={go(s.id)}
                aria-current={on ? 'true' : undefined}
                style={{
                  color: on ? 'var(--head)' : 'var(--body)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: on ? 600 : 400,
                  transition: 'color 0.2s',
                }}
              >
                {s.label}
              </a>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
            className="flex items-center gap-1.5"
            style={{
              background: 'var(--card)',
              color: 'var(--card-text)',
              border: '1px solid var(--border)',
              padding: '0.4rem 0.9rem',
              borderRadius: '999px',
              cursor: 'pointer',
              fontSize: '0.85rem',
            }}
          >
            {dark ? <Sun size={14} /> : <Moon size={14} />}
            <span className="hidden sm:inline">{dark ? 'Light' : 'Dark'}</span>
          </button>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg"
            style={{
              background: 'var(--card)',
              color: 'var(--card-text)',
              border: '1px solid var(--border)',
              cursor: 'pointer',
            }}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden absolute left-0 right-0 top-full z-50 flex flex-col gap-1 px-5 py-3"
          style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}
        >
          {SECTIONS.map((s) => {
            const on = s.id === active
            return (
              <a
                key={s.id}
                href={s.id === 'home' ? '/' : `/#${s.id}`}
                onClick={go(s.id)}
                aria-current={on ? 'true' : undefined}
                className="py-2.5"
                style={{
                  color: on ? 'var(--head)' : 'var(--body)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: on ? 600 : 400,
                }}
              >
                {s.label}
              </a>
            )
          })}
        </div>
      )}
    </nav>
  )
}