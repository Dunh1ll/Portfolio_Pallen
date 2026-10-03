import { NavLink } from 'react-router-dom'
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

  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.25rem 2.5rem',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg)',
      }}
    >
      <span style={{ color: 'var(--head)', fontWeight: 600, letterSpacing: '0.05em' }}>
        PALLEN
      </span>

      <div style={{ display: 'flex', gap: '1.75rem' }}>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            style={({ isActive }) => ({
              color: isActive ? 'var(--head)' : 'var(--body)',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: isActive ? 600 : 400,
            })}
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      <button
        onClick={toggleTheme}
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
        {dark ? '☀️ Light' : '🌙 Dark'}
      </button>
    </nav>
  )
}