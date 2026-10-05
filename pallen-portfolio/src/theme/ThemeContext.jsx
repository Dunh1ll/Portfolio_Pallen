import { createContext, useContext, useLayoutEffect, useState } from 'react'
import { flushSync } from 'react-dom'

const ThemeContext = createContext(null)
const STORAGE_KEY = 'pallen-theme'

const reducedMotion = () =>
  !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

function getInitialDark() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'dark') return true
    if (saved === 'light') return false
  } catch {
    // storage unavailable (private mode, etc.) — fall through
  }
  // Default to dark, but respect an explicit light OS preference.
  return !window.matchMedia?.('(prefers-color-scheme: light)').matches
}

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(getInitialDark)

  // Layout effect so the class is on <html> before the browser paints (and
  // before a view transition takes its "after" snapshot).
  useLayoutEffect(() => {
    document.documentElement.classList.toggle('light', !dark)
    try {
      localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light')
    } catch {
      // ignore
    }
  }, [dark])

  // Pass the click event to make the new theme spread out from the button.
  const toggleTheme = (event) => {
    const next = !dark
    const canAnimate = typeof document.startViewTransition === 'function' && !reducedMotion()
    if (!canAnimate) {
      setDark(next)
      return
    }

    const rect = event?.currentTarget?.getBoundingClientRect?.()
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2
    const y = rect ? rect.top + rect.height / 2 : 0
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

    const transition = document.startViewTransition(() => {
      flushSync(() => setDark(next))
    })
    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 750, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', pseudoElement: '::view-transition-new(root)' }
        )
      })
      .catch(() => {})
  }

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (ctx === null) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return ctx
}