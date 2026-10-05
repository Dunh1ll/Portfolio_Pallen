import { useEffect, useState } from 'react'
import { Mail, Copy, ArrowUp } from 'lucide-react'
import { FacebookIcon, GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons'
import CtaButton from './CtaButton'
import Magnetic from './Magnetic'
import ScrollReveal from './ScrollReveal'
import { RevealText } from './TextEffects'
import { SECTIONS, scrollToSection } from '../lib/sections'
import { EMAIL, SOCIALS, copyToClipboard } from '../lib/links'
import { showToast } from '../lib/toast'

const SOCIAL_ICONS = [
  { ...SOCIALS.github, icon: GithubIcon },
  { ...SOCIALS.linkedin, icon: LinkedinIcon },
  { ...SOCIALS.facebook, icon: FacebookIcon },
  { ...SOCIALS.instagram, icon: InstagramIcon },
]

const clock = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Manila',
  hour: 'numeric',
  minute: '2-digit',
  second: '2-digit',
  hour12: true,
})

// A live clock for where I am (Laguna, Philippines).
function LocalTime() {
  const [now, setNow] = useState(() => clock.format(new Date()))
  useEffect(() => {
    const id = setInterval(() => setNow(clock.format(new Date())), 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="flex items-center gap-2.5">
      <span className="relative flex w-2 h-2">
        <span className="absolute inline-flex w-full h-full rounded-full opacity-60 animate-ping" style={{ background: '#4ade80' }} />
        <span className="relative inline-flex w-2 h-2 rounded-full" style={{ background: '#4ade80' }} />
      </span>
      <p className="text-[12px]" style={{ color: 'var(--body)' }}>
        Laguna, PH · <span className="tabular-nums font-semibold" style={{ color: 'var(--head)' }}>{now}</span> PHT
      </p>
    </div>
  )
}

export default function Footer() {
  const copyEmail = async () => {
    showToast((await copyToClipboard(EMAIL)) ? 'Email address copied' : 'Could not copy the email address')
  }

  return (
    <footer
      className="relative overflow-hidden px-8 md:px-20 pt-20 pb-8"
      style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)' }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 items-end">
        <div>
          <ScrollReveal>
            <p className="text-xs font-bold tracking-[3px] mb-3" style={{ color: 'var(--eyebrow)' }}>
              WHAT'S NEXT?
            </p>
          </ScrollReveal>
          <h2
            className="text-4xl md:text-6xl font-bold"
            style={{ color: 'var(--head)', fontFamily: 'Playfair Display, serif', letterSpacing: '-2px', lineHeight: 1.05 }}
          >
            <RevealText text="Have an idea? Let's build it together." />
          </h2>
          <ScrollReveal delay={0.2}>
            <div className="flex flex-wrap gap-3 mt-9">
              <Magnetic>
                <CtaButton label="Send an email" icon={Mail} filled onClick={() => { window.location.href = `mailto:${EMAIL}` }} />
              </Magnetic>
              <Magnetic>
                <CtaButton label="Copy email" icon={Copy} onClick={copyEmail} />
              </Magnetic>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-col gap-7 lg:items-end">
            <LocalTime />
            <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 lg:justify-end">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={s.id === 'home' ? '/' : `/#${s.id}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection(s.id) }}
                  className="text-[13px] transition-colors duration-200 hover:!text-[var(--head)]"
                  style={{ color: 'var(--body)', textDecoration: 'none' }}
                >
                  {s.label}
                </a>
              ))}
            </nav>
            <div className="flex gap-3">
              {SOCIAL_ICONS.map(({ label, url, icon: Icon }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:-translate-y-1"
                  style={{ background: 'var(--card)', border: '1px solid var(--card-border)', color: 'var(--icon)' }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Giant name: the outline lights up in color around the cursor */}
      <div
        aria-hidden="true"
        className="glow-text relative select-none text-center mt-16 md:mt-20 font-bold leading-[0.85]"
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(84px, 21vw, 380px)',
          letterSpacing: '-0.04em',
          paddingBottom: '0.06em',
        }}
      >
        <span className="glow-stroke">PALLEN</span>
        <span className="glow-fill">PALLEN</span>
      </div>

      <div
        className="mt-8 pt-6 flex flex-wrap items-center justify-between gap-3 text-[11px]"
        style={{ borderTop: '1px solid var(--border)', color: 'var(--muted)' }}
      >
        <p>© {new Date().getFullYear()} Prince Dunhill Pallen. All rights reserved.</p>
        <p>Designed & built with React, Vite & Tailwind.</p>
        <button
          type="button"
          onClick={() => scrollToSection('home')}
          className="hidden md:flex items-center gap-1.5 cursor-pointer transition-colors duration-200 hover:!text-[var(--head)]"
          style={{ background: 'none', border: 'none', color: 'inherit', fontSize: 'inherit' }}
        >
          Back to top <ArrowUp size={12} />
        </button>
      </div>
    </footer>
  )
}