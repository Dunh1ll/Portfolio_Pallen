import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import SideDots from './components/SideDots'
import Home from './pages/Home'
import About from './pages/About'
import Work from './pages/Work'
import Design from './pages/Design'
import Contact from './pages/Contact'
import { sectionFromLocation, scrollToSection, useActiveSection } from './lib/sections'

// One continuous page: every part of the portfolio is a section on the same scroll.
function Section({ id, children, divider = true }) {
  return (
    <section
      id={id}
      style={divider ? { borderTop: '1px solid var(--border)' } : undefined}
    >
      {children}
    </section>
  )
}

function App() {
  const active = useActiveSection()
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
      <Navbar active={active} />
      <SideDots active={active} />
      <main>
        <Section id="home" divider={false}><Home /></Section>
        <Section id="about"><About /></Section>
        <Section id="work"><Work /></Section>
        <Section id="design"><Design /></Section>
        <Section id="contact"><Contact /></Section>
      </main>
    </div>
  )
}

export default App