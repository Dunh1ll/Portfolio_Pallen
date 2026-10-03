import { useEffect, useRef } from 'react'
import { mulberry32 } from '../utils/rng'
import { useCanvasSize } from '../utils/useCanvasSize'
import { useTheme } from '../theme/ThemeContext'

export default function GeoBackground() {
  const [containerRef, { width: w, height: h }] = useCanvasSize()
  const canvasRef = useRef(null)
  const { dark } = useTheme()

  useEffect(() => {
    if (!w || !h) return
    const canvas = canvasRef.current
    const dpr = window.devicePixelRatio || 1
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, w, h)

    const rand = mulberry32(7) // same seed idea as Dart's math.Random(7)

    // Concentric arcs, focal point top-right
    const focalX = w * 0.78
    const focalY = h * 0.18
    for (let i = 0; i < 9; i++) {
      const radius = 80 + i * 70
      const opacity = 0.6 - i * 0.06
      ctx.beginPath()
      ctx.arc(focalX, focalY, radius, 0, Math.PI * 2)
      ctx.strokeStyle = dark
        ? `rgba(40,40,40,${opacity})`
        : `rgba(180,180,180,${opacity * 0.7})`
      ctx.lineWidth = 1
      ctx.stroke()
    }

    // Diagonal ruled lines
    ctx.strokeStyle = dark ? '#161616' : '#dcdcdc'
    ctx.lineWidth = 0.8
    for (let x = -h; x < w + h; x += 32) {
      ctx.beginPath()
      ctx.moveTo(x, h)
      ctx.lineTo(x + h, 0)
      ctx.stroke()
    }

    // Scattered triangles
    for (let i = 0; i < 12; i++) {
      const rx = rand() * w
      const ry = rand() * h
      const rs = 6 + rand() * 18
      const opacity = 0.04 + rand() * 0.06
      ctx.strokeStyle = dark ? `rgba(255,255,255,${opacity})` : `rgba(0,0,0,${opacity})`
      ctx.lineWidth = 0.8
      ctx.beginPath()
      ctx.moveTo(rx, ry - rs)
      ctx.lineTo(rx + rs * 0.866, ry + rs * 0.5)
      ctx.lineTo(rx - rs * 0.866, ry + rs * 0.5)
      ctx.closePath()
      ctx.stroke()
    }

    // Scattered rotated squares
    for (let i = 0; i < 8; i++) {
      const rx = rand() * w
      const ry = rand() * h
      const rs = 5 + rand() * 12
      const opacity = 0.03 + rand() * 0.05
      ctx.strokeStyle = dark ? `rgba(255,255,255,${opacity})` : `rgba(0,0,0,${opacity})`
      ctx.lineWidth = 0.7
      ctx.save()
      ctx.translate(rx, ry)
      ctx.rotate(Math.PI / 4)
      ctx.strokeRect(-rs / 2, -rs / 2, rs, rs)
      ctx.restore()
    }

    // Corner bracket marks (top-right)
    ctx.strokeStyle = dark ? '#262626' : '#bbbbbb'
    ctx.lineWidth = 1.5
    const bl = 18
    ctx.beginPath()
    ctx.moveTo(w - 40, 36)
    ctx.lineTo(w - 40 + bl, 36)
    ctx.lineTo(w - 40 + bl, 36 + bl)
    ctx.stroke()
    ctx.strokeStyle = dark ? '#1e1e1e' : '#cccccc'
    ctx.beginPath()
    ctx.moveTo(w - 60, 52)
    ctx.lineTo(w - 50, 52)
    ctx.lineTo(w - 50, 62)
    ctx.stroke()

    // Dotted cross reticle (left-middle)
    const reticleX = w * 0.08
    const reticleY = h * 0.52
    ctx.fillStyle = dark ? '#2a2a2a' : '#bbbbbb'
    for (let i = -3; i <= 3; i++) {
      if (i === 0) continue
      ctx.beginPath()
      ctx.arc(reticleX + i * 8, reticleY, 1.2, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(reticleX, reticleY + i * 8, 1.2, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.fillStyle = dark ? '#333333' : '#aaaaaa'
    ctx.beginPath()
    ctx.arc(reticleX, reticleY, 2.5, 0, Math.PI * 2)
    ctx.fill()

    // Two concentric hexagon outlines (bottom-right area)
    const hexCx = w * 0.85
    const hexCy = h * 0.72
    const drawHex = (r, color) => {
      ctx.strokeStyle = color
      ctx.lineWidth = 1
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = Math.PI / 6 + (i * Math.PI) / 3
        const hx = hexCx + r * Math.cos(angle)
        const hy = hexCy + r * Math.sin(angle)
        if (i === 0) ctx.moveTo(hx, hy)
        else ctx.lineTo(hx, hy)
      }
      ctx.closePath()
      ctx.stroke()
    }
    drawHex(90, dark ? '#1a1a1a' : '#cccccc')
    drawHex(58, dark ? '#141414' : '#d5d5d5')

    // Bottom-left gradient patch
    const grad = ctx.createLinearGradient(0, h, w * 0.45, h * 0.6)
    if (dark) {
      grad.addColorStop(0, 'rgba(17,17,17,0.13)')
      grad.addColorStop(1, 'rgba(0,0,0,0)')
    } else {
      grad.addColorStop(0, 'rgba(221,221,221,0.13)')
      grad.addColorStop(1, 'rgba(245,245,245,0)')
    }
    ctx.fillStyle = grad
    ctx.fillRect(0, h * 0.6, w * 0.45, h * 0.4)
  }, [w, h, dark])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none">
      <canvas ref={canvasRef} />
    </div>
  )
}