import {
  User, GraduationCap, Zap, Lightbulb, Handshake, TrendingUp,
  Cpu, Compass, Box, Gamepad2, Trophy, PenTool, Palette, Swords,
} from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import SubLabel from '../components/SubLabel'
import IconSquare from '../components/IconSquare'
import HoverCard from '../components/HoverCard'
import { SkillBlock } from '../components/SkillBlock'
import HobbyCard from '../components/HobbyCard'
import DrawingGallery from '../components/DrawingGallery'

const education = [
  { icon: GraduationCap, title: 'BS in Computer Engineering', status: 'Graduate — 2026', statusColor: '#4ade80' },
  { icon: Zap, title: 'Electrical Installation and Maintenance', status: 'Senior High School — Graduate, 2022', statusColor: '#4ade80' },
]

const values = [
  { icon: Lightbulb, title: 'Innovation', desc: 'Creating technology that solves real problems.' },
  { icon: Handshake, title: 'Collaboration', desc: 'Building systems that connect people and ideas.' },
  { icon: TrendingUp, title: 'Growth', desc: 'Continuously learning across hardware and software.' },
]

const tools = [
  { icon: Cpu, title: 'KiCad', desc: 'PCB Design & Schematic Layout' },
  { icon: Compass, title: 'AutoCAD', desc: '3D Modeling & Technical Drawing' },
  { icon: Box, title: 'Fusion 360', desc: '3D CAD Design & Simulation' },
]

const skillGroups = [
  { label: 'Frontend', items: [
    { name: 'HTML', color: '#E34F26', proficiency: 0.92 }, { name: 'CSS', color: '#2D8CFF', proficiency: 0.88 },
    { name: 'JavaScript', color: '#F7DF1E', proficiency: 0.85 }, { name: 'React', color: '#61DAFB', proficiency: 0.82 },
    { name: 'Flutter', color: '#40A9FF', proficiency: 0.90 },
  ]},
  { label: 'Backend', items: [
    { name: 'Go', color: '#00ADD8', proficiency: 0.80 }, { name: 'Java', color: '#F89820', proficiency: 0.85 },
    { name: 'Python', color: '#4B8BBE', proficiency: 0.88 }, { name: 'C++', color: '#659AD2', proficiency: 0.82 },
    { name: 'C', color: '#A8B9CC', proficiency: 0.78 },
  ]},
  { label: 'Database', items: [
    { name: 'PostgreSQL', color: '#4F8FC9', proficiency: 0.80 }, { name: 'MySQL', color: '#E48E00', proficiency: 0.82 },
    { name: 'JSON', color: '#CBCB41', proficiency: 0.90 },
  ]},
  { label: 'Low-Level / Other', items: [
    { name: 'Assembly Language', color: '#22C55E', proficiency: 0.70 }, { name: 'HDL', color: '#818CF8', proficiency: 0.65 },
  ]},
]

const hobbies = [
  { icon: Gamepad2, accentColor: '#3b82f6', title: 'Mobile Games', subtitle: 'Online',
    description: 'Grinding ranked matches and perfecting team comps. MLBB is where strategy meets reflexes.',
    tag: 'Online Gaming', tagIcon: Swords },
  { icon: Trophy, accentColor: '#ea580c', title: 'Basketball', subtitle: 'On the court',
    description: "Hitting the court keeps me sharp and grounded. There's nothing like a good game to clear the mind.",
    tag: 'Sports', tagIcon: Trophy },
  { icon: PenTool, accentColor: '#a855f7', title: 'Drawing', subtitle: 'Art & illustration',
    description: 'Sketching characters, scenes, and ideas. Drawing is my way of expressing creativity beyond the screen.',
    tag: 'Visual Art', tagIcon: Palette },
]

export default function About() {
  return (
    <div className="px-8 md:px-20 py-16" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <ScrollReveal>
        <p className="text-xs font-bold tracking-[3px] mb-3" style={{ color: 'var(--eyebrow)' }}>
          01 — ABOUT ME
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <h2
          className="text-4xl md:text-5xl font-bold mb-12"
          style={{ color: 'var(--head)', fontFamily: 'Playfair Display, serif', letterSpacing: '-1px' }}
        >
          The person behind the profile.
        </h2>
      </ScrollReveal>

      <div className="flex flex-col md:flex-row gap-14">
        {/* LEFT: Bio, education, values, tools */}
        <div className="flex-[44] flex flex-col gap-9">
          <ScrollReveal>
            <div
              className="w-20 h-20 rounded-lg overflow-hidden flex items-center justify-center mb-6"
              style={{ border: '2px solid var(--border)', background: 'var(--card)' }}
            >
              <User size={36} style={{ color: 'var(--icon)' }} />
            </div>
          </ScrollReveal>

          <div className="flex flex-col gap-4 text-sm leading-[1.85]" style={{ color: 'var(--body)' }}>
            <ScrollReveal delay={0.1}>
              <p>
                I'm a Computer Engineering graduate with a passion for building systems that
                make a tangible difference. My journey began with a curiosity for how things work —
                from the circuits on a PCB to the lines of code running on a server.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p>
                Today, I combine full-stack development with embedded systems expertise. I'm
                motivated by the challenge of solving real-world problems — especially those that
                improve accessibility and quality of life.
              </p>
            </ScrollReveal>
          </div>

          <div>
            <ScrollReveal><SubLabel>Education</SubLabel></ScrollReveal>
            <div className="flex flex-col gap-2.5 mt-3.5">
              {education.map((e, i) => (
                <ScrollReveal key={e.title} delay={0.1 * (i + 1)}>
                  <HoverCard slideRight>
                    <IconSquare icon={e.icon} />
                    <div className="ml-4">
                      <p className="text-[13px] font-bold" style={{ color: 'var(--card-text)' }}>{e.title}</p>
                      <p className="text-[11px] font-semibold mt-1" style={{ color: e.statusColor }}>{e.status}</p>
                    </div>
                  </HoverCard>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <div>
            <ScrollReveal><SubLabel>Values & Goals</SubLabel></ScrollReveal>
            <div className="flex flex-col gap-2.5 mt-3.5">
              {values.map((v, i) => (
                <ScrollReveal key={v.title} delay={0.1 * i}>
                  <HoverCard slideRight>
                    <IconSquare icon={v.icon} size={32} />
                    <div className="ml-3.5">
                      <p className="text-xs font-bold" style={{ color: 'var(--card-text)' }}>{v.title}</p>
                      <p className="text-[11px] mt-0.5" style={{ color: 'var(--card-sub)' }}>{v.desc}</p>
                    </div>
                  </HoverCard>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <div>
            <ScrollReveal><SubLabel>Engineering Tools</SubLabel></ScrollReveal>
            <div className="flex flex-col gap-2.5 mt-3.5">
              {tools.map((t, i) => (
                <ScrollReveal key={t.title} delay={0.1 * i}>
                  <HoverCard slideRight>
                    <IconSquare icon={t.icon} size={34} />
                    <div className="ml-3.5">
                      <p className="text-xs font-bold" style={{ color: 'var(--card-text)' }}>{t.title}</p>
                      <p className="text-[11px]" style={{ color: 'var(--card-sub)' }}>{t.desc}</p>
                    </div>
                  </HoverCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Technical skills */}
        <div className="flex-[56] flex flex-col gap-7">
          <ScrollReveal><SubLabel>Technical Skills</SubLabel></ScrollReveal>
          <ScrollReveal delay={0.1} className="-mt-5">
            <p className="text-[13px]" style={{ color: 'var(--body)' }}>
              Languages, frameworks, and technologies I use daily.
            </p>
          </ScrollReveal>
          {skillGroups.map((group, i) => (
            <ScrollReveal key={group.label} delay={0.1 * i}>
              <SkillBlock label={group.label} items={group.items} />
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px my-16" style={{ background: 'linear-gradient(to right, transparent, var(--line), transparent)' }} />

      {/* Outside the code */}
      <ScrollReveal>
        <p className="text-xs font-bold tracking-[3px] mb-3" style={{ color: 'var(--eyebrow)' }}>
          OUTSIDE THE CODE
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <h2
          className="text-3xl font-bold mb-9"
          style={{ color: 'var(--head)', fontFamily: 'Playfair Display, serif', letterSpacing: '-0.5px' }}
        >
          When I'm not building, I'm...
        </h2>
      </ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {hobbies.map((h, i) => (
          <ScrollReveal key={h.title} delay={0.1 * i}>
            <HobbyCard {...h} />
          </ScrollReveal>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px my-16" style={{ background: 'linear-gradient(to right, transparent, var(--line), transparent)' }} />

      {/* Drawings */}
      <ScrollReveal>
        <p className="text-xs font-bold tracking-[3px] mb-3" style={{ color: 'var(--eyebrow)' }}>
          MY DRAWINGS
        </p>
        <h2
          className="text-3xl font-bold mb-2"
          style={{ color: 'var(--head)', fontFamily: 'Playfair Display, serif', letterSpacing: '-0.5px' }}
        >
          Sketches Anime Characters.
        </h2>
        <p className="text-sm mb-9" style={{ color: 'var(--body)' }}>
          A glimpse into the art I create in my downtime — anime characters.
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.2}>
        <DrawingGallery />
      </ScrollReveal>
    </div>
  )
}