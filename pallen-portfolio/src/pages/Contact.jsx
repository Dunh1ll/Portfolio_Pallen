import { useRef, useState } from 'react'
import { Timer, Mail, Phone, Copy, Check } from 'lucide-react'
import { FacebookIcon, GithubIcon, LinkedinIcon, InstagramIcon } from '../components/SocialIcons'
import ScrollReveal from '../components/ScrollReveal'
import { RevealText } from '../components/TextEffects'
import HoverCard from '../components/HoverCard'
import IconSquare from '../components/IconSquare'
import ContactForm from '../components/ContactForm'
import { EMAIL, PHONE_DISPLAY, PHONE_LINK, SOCIALS, copyToClipboard } from '../lib/links'
import { showToast } from '../lib/toast'

const contacts = [
  { icon: FacebookIcon, platform: 'Facebook', handle: 'Dunhill Pallen', detail: 'facebook.com/dnhll.plln', url: SOCIALS.facebook.url },
  { icon: GithubIcon, platform: 'GitHub', handle: 'Dunh1ll', detail: 'github.com/Dunh1ll', url: SOCIALS.github.url },
  { icon: Mail, platform: 'Gmail', handle: EMAIL, detail: EMAIL, url: `mailto:${EMAIL}`, copy: EMAIL, copied: 'Email address copied' },
  { icon: LinkedinIcon, platform: 'LinkedIn', handle: 'Prince Dunhill Pallen', detail: 'linkedin.com/in/pallen-prince-dunhill', url: SOCIALS.linkedin.url },
  { icon: InstagramIcon, platform: 'Instagram', handle: '@nturdanii', detail: 'instagram.com/nturdanii', url: SOCIALS.instagram.url },
  { icon: Phone, platform: 'Mobile', handle: PHONE_DISPLAY, detail: 'Philippines', url: `tel:${PHONE_LINK}`, copy: PHONE_DISPLAY, copied: 'Phone number copied' },
]

export default function Contact() {
  const [copiedKey, setCopiedKey] = useState(null)
  const timer = useRef(null)

  const handleCopy = async (c) => {
    const ok = await copyToClipboard(c.copy)
    setCopiedKey(ok ? c.platform : null)
    showToast(ok ? c.copied : 'Could not copy. Select the text and copy it instead.')
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopiedKey(null), 2000)
  }

  return (
    <div className="px-8 md:px-20 py-16">
      <ScrollReveal>
        <p className="text-xs font-bold tracking-[3px] mb-3" style={{ color: 'var(--eyebrow)' }}>
          04 — CONTACT
        </p>
      </ScrollReveal>
      <h2
          className="text-4xl md:text-5xl font-bold mb-13"
          style={{ color: 'var(--head)', fontFamily: 'Playfair Display, serif', letterSpacing: '-1px' }}
        ><RevealText text="Let's work together." /></h2>

      <div className="flex flex-col md:flex-row gap-14 mt-13">
        {/* LEFT: Intro + response time + contact list */}
        <div className="flex-[36] flex flex-col gap-3">
          <ScrollReveal>
            <p className="text-sm leading-[1.8] mb-2" style={{ color: 'var(--body)' }}>
              Open to full-time opportunities, freelance projects, and interesting
              collaborations. Whether you have a question or just want to say hi —
              my inbox is open.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <HoverCard slideRight className="!py-3.5 !px-[18px]">
              <IconSquare icon={Timer} size={36} />
              <div className="ml-3.5">
                <p className="text-xs font-bold" style={{ color: 'var(--card-text)' }}>Response Time</p>
                <p className="text-[11px]" style={{ color: 'var(--card-sub)' }}>I typically reply within 48 hours.</p>
              </div>
            </HoverCard>
          </ScrollReveal>

          {contacts.map((c, i) => (
            <ScrollReveal key={c.platform} delay={0.05 * i}>
              <div className="relative">
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="no-underline block">
                  <HoverCard slideRight className={`!py-3.5 !px-[18px] ${c.copy ? '!pr-14' : ''}`}>
                    <IconSquare icon={c.icon} size={36} />
                    <div className="ml-3.5 overflow-hidden">
                      <p className="text-xs font-bold" style={{ color: 'var(--card-text)' }}>{c.platform}</p>
                      <p className="text-[11px] truncate" style={{ color: 'var(--card-sub)' }}>{c.handle}</p>
                    </div>
                  </HoverCard>
                </a>
                {c.copy && (
                  <button
                    type="button"
                    onClick={() => handleCopy(c)}
                    aria-label={`Copy ${c.platform === 'Gmail' ? 'email address' : 'phone number'}`}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-md flex items-center justify-center cursor-pointer transition-colors duration-200"
                    style={{
                      background: 'var(--bg-3)',
                      border: '1px solid var(--border)',
                      color: copiedKey === c.platform ? '#4ade80' : 'var(--icon)',
                    }}
                  >
                    {copiedKey === c.platform ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* RIGHT: Message form */}
        <div className="flex-[64]">
          <ScrollReveal delay={0.15}>
            <ContactForm />
          </ScrollReveal>
        </div>
      </div>

    </div>
  )
}