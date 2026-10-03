import { useEffect, useRef } from 'react'
import { useCanvasSize } from '../utils/useCanvasSize'
import { useTheme } from '../theme/ThemeContext'

export default function DotGrid() {
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

    const spacing = 22
    for (let x = spacing; x < w; x += spacing) {
      for (let y = spacing; y < h; y += spacing) {
        const alphaX = x / w
        const alphaY = 1 - y / h
        const alpha = Math.min(1, Math.max(0, alphaX * alphaY))
        if (alpha < 0.04) continue
        ctx.beginPath()
        ctx.arc(x, y, 1, 0, Math.PI * 2)
        ctx.fillStyle = dark
          ? `rgba(50,50,50,${alpha * 0.9})`
          : `rgba(160,160,160,${alpha * 0.7})`
        ctx.fill()
      }
    }
  }, [w, h, dark])

  return (
    <div ref={containerRef} className="absolute right-0 top-0 w-[45%] h-[60%] pointer-events-none">
      <canvas ref={canvasRef} />
    </div>
  )
}