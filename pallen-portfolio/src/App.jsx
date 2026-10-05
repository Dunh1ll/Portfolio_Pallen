import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import SideDots from './components/SideDots'
import SectionNumber from './components/SectionNumber'
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'
import CursorFollower from './components/CursorFollower'
import Preloader from './components/Preloader'
import Toaster from './components/Toaster'
import CommandPalette from './components/CommandPalette'
import Footer from './components/Footer'
import { useSpotlight } from './lib/motion'
import Home from './pages/Home'
import About from './pages/About'
import Work from './pages/Work'
import Design from './pages/Design'
import Contact from './pages/Contact'
import { sectionFromLocation, scrollToSection, useActiveSection } from './lib/sections'

// One continuous page: every part of the portfolio is a section on the same scroll.
// The section owns its background, so the big section number can sit between the
// background and the content.
function Section({ id, children, number, bg, divider = true }) {
  return (
    <section
      id={id}
      className="relative isolate"
      style={{ background: bg, borderTop: divider ? '1px solid var(--border)' : undefined }}
    >
      {number && <SectionNumber n={number} />}
      {children}
    </section>
  )
}

function App() {
  const active = useActiveSection()
  useSpotlight()
  const [ready, setReady] = useState(false) // true once an incoming link has been honoured

  // Opening an old link such as /about, or /#work, lands on that section.
  // The back/forward buttons also move between sections.
  useEffect(() => {
    const initial = sectionFromLocation()
    let timer
    if (initial && initial !== 'home') {
      requestAnimationFrame(() => {
        const el = document.getElementById(initial)
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY })
      })
      timer = setTimeout(() => setReady(true), 400)
    } else {
      setReady(true)
    }
    const onPop = () => scrollToSection(sectionFromLocation() || 'home', { updateUrl: false })
    window.addEventListener('popstate', onPop)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('popstate', onPop)
    }
  }, [])

  // Keep the address bar in step with the section being read.
  useEffect(() => {
    if (!ready) return
    const target = active === 'home' ? '/' : `/#${active}`
    if (window.location.pathname + window.location.hash !== target) {
      window.history.replaceState(null, '', target)
    }
  }, [active, ready])

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[210] focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold"
        style={{ background: 'var(--head)', color: 'var(--bg)' }}
      >
        Skip to content
      </a>
      <Preloader />
      <ScrollProgress />
      <CursorFollower />
      <Navbar active={active} />
      <SideDots active={active} />
      <BackToTop />
      <Toaster />
      <CommandPalette />
      <main id="main" tabIndex={-1} className="outline-none">
        <Section id="home" divider={false}><Home /></Section>
        <Section id="about" number="01" bg="var(--bg)"><About /></Section>
        <Section id="work" number="02" bg="var(--bg-2)"><Work /></Section>
        <Section id="design" number="03" bg="var(--bg)"><Design /></Section>
        <Section id="contact" number="04" bg="var(--bg)"><Contact /></Section>
      </main>
      <Footer />
    </div>
  )
}

export default App