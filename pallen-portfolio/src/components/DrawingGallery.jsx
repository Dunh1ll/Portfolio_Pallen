import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Info, X, ChevronLeft, ChevronRight } from 'lucide-react'

const drawings = [
  { file: 'drawing_01.jpg', title: 'Jiraiya', caption: '2025', medium: 'PEN' },
  { file: 'drawing_02.jpg', title: 'Collection', caption: '2026', medium: 'PEN' },
  { file: 'drawing_03.jpg', title: 'Roronoa Zoro', caption: '2025', medium: 'PEN' },
  { file: 'drawing_04.jpg', title: 'Liebe', caption: '2024', medium: 'PEN' },
  { file: 'drawing_05.jpg', title: 'Luffy', caption: '2025', medium: 'PEN' },
  { file: 'drawing_06.jpg', title: 'Senku & Tsukasa', caption: '2024', medium: 'Pencil/Pen' },
]

const accents = ['#a855f7', '#6366f1', '#8b5cf6', '#d946ef', '#7c3aed', '#bd5cf6']

function DrawingTile({ slot, index, aspect, onOpen }) {
  const [hover, setHover] = useState(false)
  const [imgOk, setImgOk] = useState(true)
  const accent = accents[index % accents.length]

  return (
    <div
      role="button"
      aria-label={`View ${slot.title} larger`}
      onClick={() => onOpen(index)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen(index)
        }
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      tabIndex={0}
      data-cursor-label="View"
      className="relative overflow-hidden rounded-[18px] transition-transform duration-200 flex-1 outline-none cursor-zoom-in"
      style={{
        aspectRatio: aspect,
        transform: hover ? 'translateY(-5px)' : 'translateY(0)',
        border: `${hover ? '1.5px' : '1px'} solid ${hover ? `${accent}73` : 'var(--card-border)'}`,
        boxShadow: hover ? `0 0 32px 2px ${accent}2e` : '0 0 12px rgba(0,0,0,0.08)',
      }}
    >
      {imgOk ? (
        <img
          src={`/drawings/${slot.file}`}
          alt={`${slot.title} — ${slot.medium} drawing, ${slot.caption}`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hover ? 'scale(1.06)' : 'scale(1)' }}
          onError={() => setImgOk(false)}
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${accent}33, var(--bg-3) 70%)` }}
        />
      )}

      {/* Index badge (visible when not hovered) */}
      <div
        className="absolute top-3 right-3 w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold text-white transition-opacity duration-200"
        style={{ background: 'rgba(0,0,0,0.4)', opacity: hover ? 0 : 0.6 }}
      >
        {index + 1}
      </div>

      {/* Hover / focus caption overlay */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-[18px] transition-opacity duration-200"
        style={{
          opacity: hover ? 1 : 0,
          background: 'linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.85) 100%)',
        }}
      >
        {slot.medium && (
          <span
            className="w-fit px-2 py-[3px] rounded text-[9px] font-bold tracking-[1.5px] mb-1.5"
            style={{ background: `${accent}40`, color: accent, border: `1px solid ${accent}66` }}
          >
            {slot.medium.toUpperCase()}
          </span>
        )}
        <p className="text-white text-[15px] font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
          {slot.title}
        </p>
        {slot.caption && <p className="text-white/55 text-[10px]">{slot.caption}</p>}
      </div>
    </div>
  )
}

// Full-screen viewer: arrow keys / swipe to move, Esc or click outside to close.
function Lightbox({ index, onClose, onMove }) {
  const closeRef = useRef(null)
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const touchX = useRef(null)
  const [imgOk, setImgOk] = useState(true)
  const slot = drawings[index]
  const accent = accents[index % accents.length]

  useEffect(() => setImgOk(true), [index])

  useEffect(() => {
    const opener = document.activeElement
    closeRef.current?.focus()

    const html = document.documentElement
    const previous = { overflow: html.style.overflow, paddingRight: html.style.paddingRight }
    const scrollbar = window.innerWidth - html.clientWidth
    html.style.overflow = 'hidden'
    if (scrollbar > 0) html.style.paddingRight = `${scrollbar}px`

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') onMove(1)
      else if (e.key === 'ArrowLeft') onMove(-1)
      else if (e.key === 'Tab') {
        // keep keyboard focus inside the viewer
        const order = [closeRef.current, prevRef.current, nextRef.current]
        const at = order.indexOf(document.activeElement)
        e.preventDefault()
        order[(at + (e.shiftKey ? -1 : 1) + order.length) % order.length]?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      html.style.overflow = previous.overflow
      html.style.paddingRight = previous.paddingRight
      opener?.focus?.()
    }
  }, [onClose, onMove])

  const navButton = 'absolute top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-200'
  const navStyle = { background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${slot.title}, drawing ${index + 1} of ${drawings.length}`}
      className="fixed inset-0 z-[95] flex items-center justify-center p-4 md:p-10"
      style={{
        background: 'rgba(5,5,5,0.88)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        animation: 'fadeIn 0.25s ease',
      }}
      onClick={onClose}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        touchX.current = null
        if (Math.abs(dx) > 50) onMove(dx < 0 ? 1 : -1)
      }}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer"
        style={navStyle}
      >
        <X size={18} />
      </button>
      <button
        ref={prevRef}
        type="button"
        onClick={(e) => { e.stopPropagation(); onMove(-1) }}
        aria-label="Previous drawing"
        className={`${navButton} left-3 md:left-8`}
        style={navStyle}
      >
        <ChevronLeft size={20} />
      </button>
      <button
        ref={nextRef}
        type="button"
        onClick={(e) => { e.stopPropagation(); onMove(1) }}
        aria-label="Next drawing"
        className={`${navButton} right-3 md:right-8`}
        style={navStyle}
      >
        <ChevronRight size={20} />
      </button>

      <figure
        key={index}
        className="flex flex-col items-center max-w-full"
        style={{ animation: 'lightboxIn 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {imgOk ? (
          <img
            src={`/drawings/${slot.file}`}
            alt={`${slot.title} — ${slot.medium} drawing, ${slot.caption}`}
            className="max-w-[88vw] max-h-[74vh] object-contain rounded-xl"
            style={{ boxShadow: `0 20px 80px -20px ${accent}66` }}
            onError={() => setImgOk(false)}
          />
        ) : (
          <div
            className="w-[min(88vw,520px)] aspect-[4/5] max-h-[74vh] rounded-xl flex items-center justify-center text-white/70 text-sm"
            style={{ background: `linear-gradient(135deg, ${accent}44, #111 70%)` }}
          >
            Image unavailable
          </div>
        )}
        <figcaption className="mt-5 text-center">
          <p className="text-white text-lg font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
            {slot.title}
          </p>
          <p className="text-white/60 text-xs mt-1">
            {slot.medium} · {slot.caption} · {index + 1} of {drawings.length}
          </p>
        </figcaption>
      </figure>
    </div>,
    document.body
  )
}

export default function DrawingGallery() {
  const [open, setOpen] = useState(null)
  const topRow = drawings.slice(0, 3)
  const bottomRow = drawings.slice(3, 6)

  const close = () => setOpen(null)
  const move = (step) => setOpen((i) => (i === null ? i : (i + step + drawings.length) % drawings.length))

  return (
    <div>
      <div className="flex gap-3.5">
        {topRow.map((slot, i) => (
          <DrawingTile key={slot.file} slot={slot} index={i} aspect={i === 1 ? 3 / 4 : 4 / 5} onOpen={setOpen} />
        ))}
      </div>
      <div className="flex gap-3.5 mt-3.5">
        {bottomRow.map((slot, i) => {
          const realIndex = i + 3
          return (
            <div key={slot.file} className={i === 0 ? 'flex-[2]' : 'flex-1'}>
              <DrawingTile slot={slot} index={realIndex} aspect={i === 0 ? 16 / 9 : 4 / 5} onOpen={setOpen} />
            </div>
          )
        })}
      </div>
      <div className="flex items-center gap-1.5 mt-6">
        <Info size={12} style={{ color: 'var(--muted)' }} />
        <p className="text-[11px]" style={{ color: 'var(--muted)' }}>
          Click any piece to view it larger.
        </p>
      </div>

      {open !== null && <Lightbox index={open} onClose={close} onMove={move} />}
    </div>
  )
}