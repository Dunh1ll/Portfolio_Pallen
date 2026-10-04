import { useState } from 'react'
import { Info } from 'lucide-react'

const drawings = [
  { file: 'drawing_01.jpg', title: 'Jiraiya', caption: '2025', medium: 'PEN' },
  { file: 'drawing_02.jpg', title: 'Collection', caption: '2026', medium: 'PEN' },
  { file: 'drawing_03.jpg', title: 'Roronoa Zoro', caption: '2025', medium: 'PEN' },
  { file: 'drawing_04.jpg', title: 'Liebe', caption: '2024', medium: 'PEN' },
  { file: 'drawing_05.jpg', title: 'Luffy', caption: '2025', medium: 'PEN' },
  { file: 'drawing_06.jpg', title: 'Senku & Tsukasa', caption: '2024', medium: 'Pencil/Pen' },
]

const accents = ['#a855f7', '#6366f1', '#8b5cf6', '#d946ef', '#7c3aed', '#bd5cf6']

function DrawingTile({ slot, index, aspect }) {
  const [hover, setHover] = useState(false)
  const [imgOk, setImgOk] = useState(true)
  const accent = accents[index % accents.length]

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      tabIndex={0}
      className="relative overflow-hidden rounded-[18px] transition-transform duration-200 flex-1 outline-none"
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
          className="absolute inset-0 w-full h-full object-cover"
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

export default function DrawingGallery() {
  const topRow = drawings.slice(0, 3)
  const bottomRow = drawings.slice(3, 6)

  return (
    <div>
      <div className="flex gap-3.5">
        {topRow.map((slot, i) => (
          <DrawingTile key={slot.file} slot={slot} index={i} aspect={i === 1 ? 3 / 4 : 4 / 5} />
        ))}
      </div>
      <div className="flex gap-3.5 mt-3.5">
        {bottomRow.map((slot, i) => {
          const realIndex = i + 3
          return (
            <div key={slot.file} className={i === 0 ? 'flex-[2]' : 'flex-1'}>
              <DrawingTile slot={slot} index={realIndex} aspect={i === 0 ? 16 / 9 : 4 / 5} />
            </div>
          )
        })}
      </div>
      <div className="flex items-center gap-1.5 mt-6">
        <Info size={12} style={{ color: 'var(--muted)' }} />
        <p className="text-[11px]" style={{ color: 'var(--muted)' }}>
          Hover over (or tab to) any piece for details.
        </p>
      </div>
    </div>
  )
}