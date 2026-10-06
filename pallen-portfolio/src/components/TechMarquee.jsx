import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/motion'

// Skills use the same colors as the Technical Skills bars on the About page.
const ITEMS = [
  { name: 'ESP32', color: '#E7352C' },
  { name: 'Arduino', color: '#00979D' },
  { name: 'React', color: '#61DAFB' },
  { name: 'Flutter', color: '#40A9FF' },
  { name: 'Go', color: '#00ADD8' },
  { name: 'C++', color: '#659AD2' },
  { name: 'KiCad', color: '#4F8FC9' },
  { name: 'JavaScript', color: '#F7DF1E' },
  { name: 'Python', color: '#4B8BBE' },
  { name: 'PostgreSQL', color: '#4F8FC9' },
  { name: 'Fusion 360', color: '#F89820' },
  { name: 'Java', color: '#F89820' },
  { name: 'MySQL', color: '#E48E00' },
  { name: 'HTML', color: '#E34F26' },
  { name: 'CSS', color: '#2D8CFF' },
  { name: 'Linux', color: '#A8B9CC' },
  { name: 'Figma', color: '#A259FF' },
]

function Row({ hidden = false }) {
  return (
    <ul className={`flex shrink-0 items-center gap-12 pr-12 ${hidden ? 'marquee-dup' : ''}`} aria-hidden={hidden || undefined}>
      {ITEMS.map((item) => (
        <li
          key={item.name}
          className="flex items-center gap-3 whitespace-nowrap text-[15px] font-semibold"
          style={{ color: 'var(--card-text)', fontFamily: 'Playfair Display, serif' }}
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: item.color, boxShadow: `0 0 8px ${item.color}` }}
          />
          {item.name}
        </li>
      ))}
    </ul>
  )
}

// A slow ticker of the tools I use. It pauses on hover and speeds up while you scroll.
export default function TechMarquee() {
  const trackRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const track = trackRef.current
    const anim = track?.getAnimations?.()[0]
    if (!anim) return

    let lastY = window.scrollY
    let rate = 1
    let target = 1
    let raf = 0

    const loop = () => {
      rate += (target - rate) * 0.08
      target += (1 - target) * 0.06 // boost fades back to normal speed
      anim.updatePlaybackRate(rate)
      raf = rate > 1.02 || target > 1.02 ? requestAnimationFrame(loop) : 0
      if (!raf) anim.updatePlaybackRate(1)
    }
    const onScroll = () => {
      const dy = Math.abs(window.scrollY - lastY)
      lastY = window.scrollY
      target = Math.min(1 + dy / 5, 9)
      if (!raf) raf = requestAnimationFrame(loop)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      className="marquee relative overflow-hidden py-5"
      style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)' }}
      aria-label="Tools and technologies I use"
      role="region"
    >
      <div className="marquee-mask">
        <div ref={trackRef} className="marquee-track flex w-max">
          <Row />
          <Row hidden />
        </div>
      </div>
    </div>
  )
}