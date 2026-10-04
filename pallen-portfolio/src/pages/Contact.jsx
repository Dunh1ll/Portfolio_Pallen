import { Timer, Mail, Phone } from 'lucide-react'
import { FacebookIcon, GithubIcon, LinkedinIcon, InstagramIcon } from '../components/SocialIcons'
import ScrollReveal from '../components/ScrollReveal'
import HoverCard from '../components/HoverCard'
import IconSquare from '../components/IconSquare'
import ContactForm from '../components/ContactForm'

const contacts = [
  { icon: FacebookIcon, platform: 'Facebook', handle: 'Dunhill Pallen', detail: 'facebook.com/dnhll.plln', url: 'https://www.facebook.com/dnhll.plln' },
  { icon: GithubIcon, platform: 'GitHub', handle: 'Dunh1ll', detail: 'github.com/Dunh1ll', url: 'https://github.com/Dunh1ll' },
  { icon: Mail, platform: 'Gmail', handle: 'cpe.pallen.princedunhill@gmail.com', detail: 'cpe.pallen.princedunhill@gmail.com', url: 'mailto:cpe.pallen.princedunhill@gmail.com' },
  { icon: LinkedinIcon, platform: 'LinkedIn', handle: 'Prince Dunhill Pallen', detail: 'linkedin.com/in/pallen-prince-dunhill', url: 'https://www.linkedin.com/in/pallen-prince-dunhill/' },
  { icon: InstagramIcon, platform: 'Instagram', handle: '@nturdanii', detail: 'instagram.com/nturdanii', url: 'https://www.instagram.com/nturdanii?igsh=eGxsdmVwc3BwMGt5' },
  { icon: Phone, platform: 'Mobile', handle: '0950 464 7074', detail: 'Philippines', url: 'tel:+639504647074' },
]

export default function Contact() {
  return (
    <div className="px-8 md:px-20 py-16" style={{ background: 'var(--bg)' }}>
      <ScrollReveal>
        <p className="text-xs font-bold tracking-[3px] mb-3" style={{ color: 'var(--eyebrow)' }}>
          04 — CONTACT
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <h2
          className="text-4xl md:text-5xl font-bold mb-13"
          style={{ color: 'var(--head)', fontFamily: 'Playfair Display, serif', letterSpacing: '-1px' }}
        >
          Let's work together.
        </h2>
      </ScrollReveal>

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
              <a href={c.url} target="_blank" rel="noopener noreferrer" className="no-underline block">
                <HoverCard slideRight className="!py-3.5 !px-[18px]">
                  <IconSquare icon={c.icon} size={36} />
                  <div className="ml-3.5 overflow-hidden">
                    <p className="text-xs font-bold" style={{ color: 'var(--card-text)' }}>{c.platform}</p>
                    <p className="text-[11px] truncate" style={{ color: 'var(--card-sub)' }}>{c.handle}</p>
                  </div>
                </HoverCard>
              </a>
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