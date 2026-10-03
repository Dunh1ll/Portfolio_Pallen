import { useEffect, useRef } from 'react'
import { mulberry32 } from '../utils/rng'
import { useCanvasSize } from '../utils/useCanvasSize'

export default function Noise() {
  const [containerRef, { width: w, height: h }] = useCanvasSize()
  const canvasRef = useRef(null)

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

    const rand = mulberry32(42)
    for (let i = 0; i < 3200; i++) {
      ctx.beginPath()
      ctx.arc(rand() * w, rand() * h, 0.6, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255,255,255,${rand() * 0.025})`
      ctx.fill()
    }
  }, [w, h])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none">
      <canvas ref={canvasRef} />
    </div>
  )
}