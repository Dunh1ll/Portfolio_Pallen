import { Palette } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import DesignCard from '../components/DesignCard'
import { GrayPill } from '../components/WorkCards'

const projects = [
  {
    index: '01', title: 'Facebook', subtitle: 'Social Media UI Clone',
    description: "A pixel-faithful recreation of Facebook's web interface — including the News Feed, Stories bar, sidebar navigation, Marketplace preview, and responsive right-panel widgets. Built to study Meta's design system and component hierarchy.",
    tags: ['HTML', 'CSS', 'JavaScript'],
    previewImg: '/design/facebook_preview.jpg',
    accentColor: '#1877F2',
    url: 'https://dunh1ll.github.io/facebook-clone/',
  },
  {
    index: '02', title: 'YouTube', subtitle: 'Video Platform UI Clone',
    description: "Full recreation of YouTube's homepage grid, sidebar, search bar, video card components with thumbnail, channel avatar, view count, and duration badge. Studied Google's Material You design language and responsive video grid system.",
    tags: ['React', 'HTML', 'JavaScript', 'CSS'],
    previewImg: '/design/youtube_preview.jpg',
    accentColor: '#FF0000',
    url: 'https://dunh1ll.github.io/Youtube-clone/',
  },
  {
    index: '03', title: 'Netflix', subtitle: 'Streaming Platform UI Clone',
    description: "Recreation of Netflix's dark-mode streaming interface — hero banner with cinematic overlay, horizontal content carousels, hover-expand cards, category rows, and the profile selector screen. Focused on motion design and depth through layered gradients.",
    tags: ['HTML', 'CSS', 'JavaScript'],
    previewImg: '/design/netflix_preview.jpg',
    accentColor: '#E50914',
    url: 'https://dunh1ll.github.io/netflix-clone-ui/',
  },
]

export default function Design() {
  return (
    <div className="px-8 md:px-20 py-16" style={{ background: 'var(--bg)' }}>
      <ScrollReveal>
        <p className="text-xs font-bold tracking-[3px] mb-3" style={{ color: 'var(--eyebrow)' }}>
          03 — UI/UX DESIGN
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <h2
          className="text-4xl md:text-5xl font-bold mb-3"
          style={{ color: 'var(--head)', fontFamily: 'Playfair Display, serif', letterSpacing: '-1px' }}
        >
          Interfaces that feel right.
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <p className="text-sm max-w-xl mb-14" style={{ color: 'var(--body)' }}>
          A collection of UI clone projects — built to study design systems, practice layout precision, and sharpen visual instinct.
        </p>
      </ScrollReveal>

      {/* Horizontal scroll carousel */}
      <ScrollReveal delay={0.2}>
        <div className="flex gap-6 overflow-x-auto pb-4 -mx-8 px-8 md:-mx-20 md:px-20 snap-x snap-mandatory">
          {projects.map((p) => (
            <div key={p.title} className="snap-start">
              <DesignCard {...p} />
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Design philosophy */}
      <ScrollReveal delay={0.1} className="mt-14">
        <div
          className="rounded-2xl p-8 flex items-start gap-6"
          style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}
        >
          <div
            className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: 'var(--bg-3)', border: '1px solid var(--border)' }}
          >
            <Palette size={20} style={{ color: 'var(--icon)' }} />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2.5" style={{ color: 'var(--card-text)', fontFamily: 'Playfair Display, serif' }}>
              Design Philosophy
            </h3>
            <p className="text-[13px] leading-[1.75]" style={{ color: 'var(--body)' }}>
              Every clone was built from scratch without templates — measuring spacing, studying typographic
              hierarchy, and reverse-engineering component structure. The goal is to understand how
              world-class design teams think, then apply those principles to original work.
            </p>
            <div className="flex flex-wrap gap-2 mt-4.5">
              {['Figma', 'Flutter', 'HTML/CSS', 'Component Design', 'Responsive Layout', 'Color Theory'].map((t) => (
                <GrayPill key={t}>{t}</GrayPill>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}