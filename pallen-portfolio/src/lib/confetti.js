import { prefersReducedMotion } from './motion'

const COLORS = ['#8b5cf6', '#22d3ee', '#4ade80', '#fbbf24', '#f472b6', '#ffffff']

// A short burst of confetti from a point on screen (used when a message sends).
// Draws on a temporary full-screen canvas and removes it when finished.
export function confetti({ x = window.innerWidth / 2, y = window.innerHeight / 2, count = 90 } = {}) {
  if (prefersReducedMotion()) return

  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const canvas = document.createElement('canvas')
  canvas.setAttribute('aria-hidden', 'true')
  canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:160'
  canvas.width = window.innerWidth * dpr
  canvas.height = window.innerHeight * dpr
  document.body.appendChild(canvas)
  const ctx = canvas.getContext('2d')
  ctx.scale(dpr, dpr)

  const pieces = Array.from({ length: count }, () => {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.9 // mostly upward
    const speed = 6 + Math.random() * 9
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 5 + Math.random() * 6,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.35,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      round: Math.random() < 0.3,
    }
  })

  const DURATION = 1900
  const start = performance.now()
  const frame = (now) => {
    const age = now - start
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    for (const p of pieces) {
      p.vy += 0.28 // gravity
      p.vx *= 0.992
      p.x += p.vx
      p.y += p.vy
      p.rot += p.vr
      ctx.save()
      ctx.globalAlpha = Math.max(0, 1 - Math.max(age - 1200, 0) / (DURATION - 1200))
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      ctx.fillStyle = p.color
      if (p.round) {
        ctx.beginPath()
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
        ctx.fill()
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
      }
      ctx.restore()
    }
    if (age < DURATION) requestAnimationFrame(frame)
    else canvas.remove()
  }
  requestAnimationFrame(frame)
}