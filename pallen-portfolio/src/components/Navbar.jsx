import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../theme/ThemeContext'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/work', label: 'Work' },
  { to: '/design', label: 'Design' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const { dark, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // Close the mobile menu on navigation and scroll to top.
  useEffect(() => {
    setOpen(false)
    window.scrollTo(0, 0)
  }, [pathname])

  const linkStyle = ({ isActive }) => ({
    color: isActive ? 'var(--head)' : 'var(--body)',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: isActive ? 600 : 400,
  })

  return (
    <nav
      className="relative"
      style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}
    >
      <div className="flex items-center justify-between px-5 md:px-10 py-5">
        <span style={{ color: 'var(--head)', fontWeight: 600, letterSpacing: '0.05em' }}>
          PALLEN
        </span>

        {/* Desktop links */}
        <div className="hidden md:flex gap-7">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} style={linkStyle}>
              {link.label}
            </NavLink>
          ))}
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
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} style={linkStyle} className="py-2.5">
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  )
}