import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  Search, Home as HomeIcon, User, Briefcase, Palette, Mail, Sun, Moon, Copy, FileText, CornerDownLeft,
} from 'lucide-react'
import { FacebookIcon, GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons'
import { SECTIONS, scrollToSection } from '../lib/sections'
import { EMAIL, RESUME_URL, SOCIALS, copyToClipboard } from '../lib/links'
import { showToast } from '../lib/toast'
import { introPlaying } from '../lib/motion'
import { useTheme } from '../theme/ThemeContext'

const SECTION_ICONS = { home: HomeIcon, about: User, work: Briefcase, design: Palette, contact: Mail }

// A keyboard-first menu (Ctrl/⌘ + K) to jump around the page or run quick actions.
export default function CommandPalette() {
  const { dark, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const returnFocus = useRef(null)

  const commands = useMemo(
    () => [
      ...SECTIONS.map((s) => ({
        id: `go-${s.id}`,
        group: 'Go to',
        label: s.label,
        icon: SECTION_ICONS[s.id],
        keywords: 'section page jump scroll',
        run: () => scrollToSection(s.id),
      })),
      {
        id: 'theme',
        group: 'Actions',
        label: dark ? 'Switch to light theme' : 'Switch to dark theme',
        icon: dark ? Sun : Moon,
        keywords: 'theme dark light mode appearance',
        run: () => toggleTheme(),
      },
      {
        id: 'copy-email',
        group: 'Actions',
        label: 'Copy email address',
        icon: Copy,
        keywords: 'email gmail mail copy contact',
        run: async () => showToast((await copyToClipboard(EMAIL)) ? 'Email address copied' : 'Could not copy the email address'),
      },
      {
        id: 'send-email',
        group: 'Actions',
        label: 'Send me an email',
        icon: Mail,
        keywords: 'email mailto write message',
        run: () => { window.location.href = `mailto:${EMAIL}` },
      },
      {
        id: 'resume',
        group: 'Actions',
        label: 'Open resume',
        icon: FileText,
        keywords: 'cv resume download',
        run: () => window.open(RESUME_URL, '_blank', 'noopener'),
      },
      { id: 'github', group: 'Links', label: 'GitHub', icon: GithubIcon, keywords: 'code repositories', run: () => window.open(SOCIALS.github.url, '_blank', 'noopener') },
      { id: 'linkedin', group: 'Links', label: 'LinkedIn', icon: LinkedinIcon, keywords: 'profile work network', run: () => window.open(SOCIALS.linkedin.url, '_blank', 'noopener') },
      { id: 'facebook', group: 'Links', label: 'Facebook', icon: FacebookIcon, keywords: 'social', run: () => window.open(SOCIALS.facebook.url, '_blank', 'noopener') },
      { id: 'instagram', group: 'Links', label: 'Instagram', icon: InstagramIcon, keywords: 'social photos', run: () => window.open(SOCIALS.instagram.url, '_blank', 'noopener') },
    ],
    [dark, toggleTheme]
  )

  const results = useMemo(() => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
    if (!words.length) return commands
    return commands.filter((c) => {
      const hay = `${c.label} ${c.group} ${c.keywords}`.toLowerCase()
      return words.every((w) => hay.includes(w))
    })
  }, [commands, query])

  const close = useCallback(() => setOpen(false), [])
  const run = useCallback(
    (cmd) => {
      if (!cmd) return
      setOpen(false)
      // let the menu finish closing before a page-wide effect (like the theme switch) starts
      setTimeout(() => cmd.run(), 60)
    },
    []
  )

  // Open with Ctrl/⌘ + K, or from the navbar button.
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (introPlaying()) return
        setOpen((o) => !o)
      }
    }
    const onOpen = () => !introPlaying() && setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('open-palette', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('open-palette', onOpen)
    }
  }, [])

  // Focus the search box on open, give focus back on close, and hold the page still.
  useEffect(() => {
    if (!open) return
    returnFocus.current = document.activeElement
    setQuery('')
    setIndex(0)
    const previousOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    const t = setTimeout(() => inputRef.current?.focus(), 0)
    return () => {
      clearTimeout(t)
      document.documentElement.style.overflow = previousOverflow
      returnFocus.current?.focus?.()
    }
  }, [open])

  useEffect(() => setIndex(0), [query])

  // keep the highlighted row in view
  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [index, results])

  if (!open) return null

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      close()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setIndex((i) => (results.length ? (i + 1) % results.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setIndex((i) => (results.length ? (i - 1 + results.length) % results.length : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      run(results[index])
    } else if (e.key === 'Tab') {
      e.preventDefault() // the search box is the only stop; arrows move through results
    }
  }

  let lastGroup = null

  return createPortal(
    <div
      className="fixed inset-0 z-[130] flex items-start justify-center px-4"
      style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', animation: 'fadeIn 0.2s ease both' }}
      onPointerDown={(e) => e.target === e.currentTarget && close()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
        onKeyDown={onKeyDown}
        className="w-full max-w-[560px] mt-[14vh] rounded-2xl overflow-hidden"
        style={{
          background: 'var(--card)',
          border: '1px solid var(--card-border)',
          boxShadow: '0 30px 80px -20px rgba(0,0,0,0.6)',
          animation: 'paletteIn 0.25s cubic-bezier(0.2, 0.8, 0.2, 1) both',
        }}
      >
        <div className="flex items-center gap-3 px-4 py-3.5" style={{ borderBottom: '1px solid var(--border)' }}>
          <Search size={16} style={{ color: 'var(--muted)' }} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sections and actions…"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={results[index] ? `palette-${results[index].id}` : undefined}
            aria-label="Search commands"
            autoComplete="off"
            spellCheck={false}
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: 'var(--card-text)' }}
          />
          <kbd className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ background: 'var(--bg-3)', color: 'var(--muted)', border: '1px solid var(--border)' }}>
            ESC
          </kbd>
        </div>

        <ul ref={listRef} id="palette-list" role="listbox" className="max-h-[52vh] overflow-y-auto p-2">
          {results.length === 0 && (
            <li className="px-3 py-8 text-center text-xs" style={{ color: 'var(--muted)' }}>
              Nothing matches “{query}”.
            </li>
          )}
          {results.map((cmd, i) => {
            const header = cmd.group !== lastGroup
            lastGroup = cmd.group
            const Icon = cmd.icon
            const selected = i === index
            return (
              <li key={cmd.id} role="presentation">
                {header && (
                  <p className="px-3 pt-3 pb-1 text-[10px] font-bold tracking-[2px]" style={{ color: 'var(--muted)' }}>
                    {cmd.group.toUpperCase()}
                  </p>
                )}
                <div
                  id={`palette-${cmd.id}`}
                  role="option"
                  aria-selected={selected}
                  onPointerMove={() => setIndex(i)}
                  onClick={() => run(cmd)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-[13px]"
                  style={{
                    background: selected ? 'var(--bg-3)' : 'transparent',
                    color: 'var(--card-text)',
                  }}
                >
                  <Icon size={15} style={{ color: 'var(--icon)' }} />
                  <span className="flex-1">{cmd.label}</span>
                  {selected && <CornerDownLeft size={13} style={{ color: 'var(--muted)' }} />}
                </div>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-4 px-4 py-2.5 text-[10px]" style={{ borderTop: '1px solid var(--border)', color: 'var(--muted)' }}>
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span>esc close</span>
        </div>
      </div>
    </div>,
    document.body
  )
}