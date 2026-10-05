import FadeSlide from './FadeSlide'

const shift = (x, y) => ({
  transform: `translate3d(calc(var(--px, 0) * ${x}px), calc(var(--py, 0) * ${y}px), 0)`,
})

// Two soft colored glows behind the profile photo. They drift on their own and
// slide a little against the mouse, which makes the hero feel layered.
export function Aurora() {
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute right-[2%] top-[18%] hidden md:block" style={shift(-40, -26)}>
        <div
          className="aurora-blob"
          style={{
            width: 620,
            height: 620,
            background:
              'radial-gradient(closest-side, color-mix(in srgb, var(--accent-a) var(--aurora-strength), transparent), transparent)',
          }}
        />
      </div>
      <div className="absolute right-[16%] top-[44%] hidden md:block" style={shift(34, 22)}>
        <div
          className="aurora-blob"
          style={{
            width: 480,
            height: 480,
            animationDelay: '-7s',
            animationDirection: 'reverse',
            background:
              'radial-gradient(closest-side, color-mix(in srgb, var(--accent-b) var(--aurora-strength), transparent), transparent)',
          }}
        />
      </div>
    </div>
  )
}

const CHIPS = [
  { name: 'ESP32', color: '#E7352C', pos: { left: '-17%', top: '10%' }, depth: [22, 14], dur: 6.2, delay: 1.3 },
  { name: 'Flutter', color: '#40A9FF', pos: { right: '-15%', top: '22%' }, depth: [30, 18], dur: 7.1, delay: 1.5 },
  { name: 'Go', color: '#00ADD8', pos: { left: '-12%', top: '57%' }, depth: [26, 20], dur: 5.6, delay: 1.7 },
  { name: 'KiCad', color: '#4F8FC9', pos: { right: '-13%', top: '70%' }, depth: [34, 16], dur: 6.7, delay: 1.9 },
  { name: 'React', color: '#61DAFB', pos: { left: '58%', top: '-7%' }, depth: [18, 24], dur: 7.6, delay: 2.1 },
]

// Small tool chips that float around the profile photo (large screens only).
export function FloatingChips() {
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none hidden lg:block">
      {CHIPS.map((c) => (
        <div key={c.name} className="absolute" style={{ ...c.pos, ...shift(c.depth[0], c.depth[1]) }}>
          <FadeSlide delay={c.delay}>
            <div
              className="tech-chip flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap"
              style={{
                animationDuration: `${c.dur}s`,
                animationDelay: `${-c.delay}s`,
                color: 'var(--card-text)',
                background: 'color-mix(in srgb, var(--card) 82%, transparent)',
                border: '1px solid var(--border)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                boxShadow: '0 10px 24px -12px rgba(0,0,0,0.35)',
              }}
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: c.color, boxShadow: `0 0 8px ${c.color}` }}
              />
              {c.name}
            </div>
          </FadeSlide>
        </div>
      ))}
    </div>
  )
}