import { Briefcase, Mail, Download } from 'lucide-react'
import GeoBackground from '../canvas/GeoBackground'
import DotGrid from '../canvas/DotGrid'
import Noise from '../canvas/Noise'
import FadeSlide from '../components/FadeSlide'
import GlassChip from '../components/GlassChip'
import CtaButton from '../components/CtaButton'
import QuickStat from '../components/QuickStat'
import AvailRow from '../components/AvailRow'
import AnimeCat from '../components/AnimeCat'
import ProfilePhotoGlow from '../components/ProfilePhotoGlow'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ minHeight: 'calc(100vh - 73px)', background: 'var(--bg)' }}
    >
      <GeoBackground />
      <Noise />
      <DotGrid />

      {/* Left accent line */}
      <div
        className="absolute left-14 top-24 bottom-24 w-px hidden md:block"
        style={{
          background:
            'linear-gradient(to bottom, transparent, var(--border), color-mix(in srgb, var(--border) 60%, transparent), transparent)',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-12 px-8 md:px-20 pt-16 pb-24 min-h-[calc(100vh-73px)]">
        {/* LEFT: Identity */}
        <div className="flex-[58] max-w-2xl">
          <FadeSlide delay={0.2}>
            <GlassChip>COMPUTER ENGINEER · LAGUNA, PH</GlassChip>
          </FadeSlide>

          <FadeSlide delay={0.6} className="mt-8">
            <h1
              className="font-bold leading-[0.88] text-6xl md:text-8xl"
              style={{ color: 'var(--head)', fontFamily: 'Playfair Display, serif', letterSpacing: '-4px' }}
            >
              PALLEN
            </h1>
          </FadeSlide>

          <FadeSlide delay={0.8} className="mt-6">
            <p className="text-[15px] leading-[1.65]" style={{ color: 'var(--body)' }}>
              Full-Stack Developer & Embedded Systems Engineer
              <br />
              building technology that bridges hardware and software.
            </p>
          </FadeSlide>

          <FadeSlide delay={1.0} className="mt-9">
            <div className="flex flex-wrap gap-3">
              <CtaButton label="See My Work" icon={Briefcase} filled onClick={() => navigate('/work')} />
              <CtaButton label="Contact Me" icon={Mail} onClick={() => navigate('/contact')} />
              <CtaButton
                label="Resume"
                icon={Download}
                onClick={() => window.open('https://drive.google.com/file/d/1392cs0UZbuROHIWIG9S2tzfpIGLvuulo/view?usp=drive_link', '_blank')}
              />
            </div>
          </FadeSlide>
        </div>

        {/* RIGHT: Cat + profile */}
        <div className="flex-[32] flex flex-col items-center gap-4">
          <FadeSlide delay={0.3}>
            <AnimeCat />
          </FadeSlide>
          <FadeSlide delay={0.5}>
            <ProfilePhotoGlow />
          </FadeSlide>
          <FadeSlide delay={0.7}>
            <p className="text-sm font-bold text-center" style={{ color: 'var(--head)' }}>
              Prince Dunhill Pallen
            </p>
          </FadeSlide>
          <FadeSlide delay={0.8}>
            <AvailRow />
          </FadeSlide>
          <FadeSlide delay={0.9}>
            <div className="flex flex-wrap justify-center gap-2">
              <QuickStat value="15" label="Languages" />
              <QuickStat value="3" label="CAD Tools" />
              <QuickStat value="1" label="Thesis" />
            </div>
          </FadeSlide>
        </div>
      </div>

      {/* Scroll indicator */}
      <FadeSlide delay={1.2} className="absolute bottom-6 left-0 right-0 flex flex-col items-center">
        <span className="text-[9px] font-bold tracking-[3px]" style={{ color: 'var(--muted)' }}>
          SCROLL
        </span>
        <div
          className="w-px h-[30px] mt-2"
          style={{ background: 'linear-gradient(to bottom, var(--muted), transparent)' }}
        />
      </FadeSlide>
    </div>
  )
}