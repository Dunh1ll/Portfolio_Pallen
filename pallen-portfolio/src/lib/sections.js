import { useEffect, useState } from 'react'

// The five parts of the one-page portfolio, in the order they appear.
export const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'design', label: 'Design' },
  { id: 'contact', label: 'Contact' },
]

const ids = SECTIONS.map((s) => s.id)

const prefersReducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// Section a URL points at: '/#about' or an old-style '/about' link.
export function sectionFromLocation() {
  const hash = window.location.hash.replace('#', '')
  if (ids.includes(hash)) return hash
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '')
  return ids.includes(path) ? path : null
}

// Smoothly scroll to a section. Tells the navbar which way we're going so it
// can tuck itself away on the way down and reappear on the way up.
export function scrollToSection(id, { updateUrl = true } = {}) {
  const el = document.getElementById(id)
  if (!el) return
  const top = id === 'home' ? 0 : el.getBoundingClientRect().top + window.scrollY
  const down = top > window.scrollY

  window.dispatchEvent(new CustomEvent('section-jump', { detail: { id, down } }))
  window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })

  if (updateUrl) {
    const url = id === 'home' ? window.location.pathname.replace(/^\/[a-z]+$/, '/') : `/#${id}`
    window.history.pushState(null, '', url)
  }
}

// Which section is currently in the middle of the screen.
export function useActiveSection() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      // A thin band just above the middle of the screen decides the active section.
      { rootMargin: '-45% 0px -54% 0px', threshold: 0 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return active
}