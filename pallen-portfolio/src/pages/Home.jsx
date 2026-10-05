import { useEffect, useRef, useState } from 'react'
import { Briefcase, Mail, Download } from 'lucide-react'
import GeoBackground from '../canvas/GeoBackground'
import DotGrid from '../canvas/DotGrid'
import Noise from '../canvas/Noise'
import SignalField from '../canvas/SignalField'
import FadeSlide from '../components/FadeSlide'
import GlassChip from '../components/GlassChip'
import CtaButton from '../components/CtaButton'
import QuickStat from '../components/QuickStat'
import AvailRow from '../components/AvailRow'
import ProfilePhotoGlow from '../components/ProfilePhotoGlow'
import Magnetic from '../components/Magnetic'
import Tilt from '../components/Tilt'
import TechMarquee from '../components/TechMarquee'
import { SplitLetters, TypedRoles } from '../components/TextEffects'
import { scrollToSection } from '../lib/sections'
import { Aurora, FloatingChips } from '../components/HeroDepth'
import { prefersReducedMotion, useParallaxPointer } from '../lib/motion'
import { RESUME_URL } from '../lib/links'

export default function Home() {
  const [atTop, setAtTop] = useState(true)
  const heroRef = useRef(null)
  const contentRef = useRef(null)
  const bgRef = useRef(null)
  useParallaxPointer(heroRef)

  // As you scroll away, the hero content drifts down and fades while the
  // background lags behind it, which gives the page some depth.
  useEffect(() => {
    const reduced = prefersReducedMotion()
    let raf = 0

    const update = () => {
      raf = 0
      const y = window.scrollY
      setAtTop(y < 40)
      if (reduced) return
      const p = Math.min(Math.max(y / (window.innerHeight * 0.85), 0), 1)
      if (contentRef.current) {
        contentRef.current.style.transform = `translate3d(0, ${p * 70}px, 0) scale(${1 - p * 0.05})`
        contentRef.current.style.opacity = String(1 - p * 0.9)
      }
      if (bgRef.current) bgRef.current.style.transform = `translate3d(0, ${p * 40}px, 0)`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div
        ref={heroRef}
        className="relative w-full overflow-hidden"
        style={{ minHeight: 'calc(100vh - 73px)', background: 'var(--bg)' }}
      >
        <div ref={bgRef} className="absolute inset-0 will-change-transform">
          <GeoBackground />
          <Noise />
          <DotGrid />
        </div>
        <Aurora />
        <SignalField />

        {/* Left accent line */}
        <div
          className="absolute left-14 top-24 bottom-24 w-px hidden md:block"
          style={{
            background:
              'linear-gradient(to bottom, transparent, var(--border), color-mix(in srgb, var(--border) 60%, transparent), transparent)',
          }}
        />

        {/* Main content */}
        <div
          ref={contentRef}
          className="relative z-10 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12 px-8 md:px-20 pt-16 pb-24 min-h-[calc(100vh-73px)] will-change-transform"
        >
          {/* LEFT: Identity */}
          <div className="flex-[58] max-w-2xl">
            <FadeSlide delay={0.2}>
              <GlassChip>COMPUTER ENGINEER · LAGUNA, PH</GlassChip>
            </FadeSlide>

            <div className="mt-8">
              <h1
                className="font-bold leading-[0.88] text-6xl md:text-8xl"
                style={{ color: 'var(--head)', fontFamily: 'Playfair Display, serif', letterSpacing: '-4px' }}
              >
                <SplitLetters text="PALLEN" delay={0.5} />
              </h1>
            </div>

            <FadeSlide delay={1.0} className="mt-6">
              <p className="text-[15px] leading-[1.65]" style={{ color: 'var(--body)' }}>
                Full-Stack Developer & Embedded Systems Engineer
                <br />
                building technology that bridges hardware and software.
              </p>
              <div className="mt-3">
                <TypedRoles />
              </div>
            </FadeSlide>

            <FadeSlide delay={1.2} className="mt-9">
              <div className="flex flex-wrap gap-3">
                <Magnetic>
                  <CtaButton label="See My Work" icon={Briefcase} filled onClick={() => scrollToSection('work')} />
                </Magnetic>
                <Magnetic>
                  <CtaButton label="Contact Me" icon={Mail} onClick={() => scrollToSection('contact')} />
                </Magnetic>
                <Magnetic>
                  <CtaButton
                    label="Resume"
                    icon={Download}
                    onClick={() => window.open(RESUME_URL, '_blank')}
                  />
                </Magnetic>
              </div>
            </FadeSlide>
          </div>

          {/* RIGHT: profile — pushed toward the right edge on larger screens */}
          <div className="w-full lg:w-auto flex-[32] flex flex-col items-center lg:items-end">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <FadeSlide delay={0.4}>
                  <Tilt>
                    <ProfilePhotoGlow />
                  </Tilt>
                </FadeSlide>
                <FloatingChips />
              </div>
              <FadeSlide delay={0.6}>
                <p className="text-sm font-bold text-center" style={{ color: 'var(--head)' }}>
                  Prince Dunhill Pallen
                </p>
              </FadeSlide>
              <FadeSlide delay={0.7}>
                <AvailRow />
              </FadeSlide>
              <FadeSlide delay={0.8}>
                <div className="flex flex-wrap justify-center gap-2">
                  <QuickStat value="15" label="Languages" delay={1.0} />
                  <QuickStat value="3" label="CAD Tools" delay={1.1} />
                  <QuickStat value="1" label="Thesis" delay={1.2} />
                </div>
              </FadeSlide>
            </div>
          </div>
        </div>

        {/* Scroll indicator — scroll or click to continue to the next section */}
        <FadeSlide delay={1.6} className="absolute bottom-6 left-0 right-0 z-20 flex flex-col items-center pointer-events-none">
          <button
            type="button"
            onClick={() => scrollToSection('about')}
            aria-label="Scroll down to the About section"
            className="flex flex-col items-center cursor-pointer transition-opacity duration-300"
            style={{ background: 'none', border: 'none', opacity: atTop ? 1 : 0, pointerEvents: atTop ? 'auto' : 'none' }}
          >
            <span className="text-[9px] font-bold tracking-[3px]" style={{ color: 'var(--muted)' }}>
              SCROLL
            </span>
            <div
              className="w-px h-[30px] mt-2 animate-scrollCue"
              style={{ background: 'linear-gradient(to bottom, var(--muted), transparent)' }}
            />
          </button>
        </FadeSlide>
      </div>

      <TechMarquee />
    </>
  )
}