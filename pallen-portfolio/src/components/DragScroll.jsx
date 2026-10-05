import { useRef, useState } from 'react'

// A horizontally scrolling row that can also be dragged with the mouse.
// Touch screens keep their normal swipe. Links inside don't fire after a drag.
export default function DragScroll({ children, className = '' }) {
  const ref = useRef(null)
  const suppressClick = useRef(false)
  const [dragging, setDragging] = useState(false)

  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return
    const el = ref.current
    const startX = e.clientX
    const startScroll = el.scrollLeft
    let moved = false

    const onMove = (ev) => {
      const dx = ev.clientX - startX
      if (!moved && Math.abs(dx) > 5) {
        moved = true
        setDragging(true)
      }
      if (moved) el.scrollLeft = startScroll - dx
    }
    const onUp = () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      if (moved) {
        suppressClick.current = true
        setTimeout(() => { suppressClick.current = false }, 0)
        // settle on the nearest card, like the normal scroll-snapping does
        const box = el.getBoundingClientRect()
        const pad = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0
        let best = el.scrollLeft
        let bestGap = Infinity
        for (const item of el.children) {
          const left = item.getBoundingClientRect().left - box.left + el.scrollLeft - pad
          const gap = Math.abs(left - el.scrollLeft)
          if (gap < bestGap) { bestGap = gap; best = left }
        }
        el.scrollTo({ left: Math.max(best, 0), behavior: 'smooth' })
      }
      setDragging(false)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  return (
    <div
      ref={ref}
      data-cursor-label="Drag"
      onPointerDown={onPointerDown}
      onDragStart={(e) => e.preventDefault()}
      onClickCapture={(e) => {
        if (suppressClick.current) {
          e.preventDefault()
          e.stopPropagation()
        }
      }}
      className={`${className} ${dragging ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
      style={dragging ? { scrollSnapType: 'none' } : undefined}
    >
      {children}
    </div>
  )
}