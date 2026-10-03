import { useState } from 'react'
import { ExternalLink } from 'lucide-react'

export default function DesignCard({ index, title, subtitle, description, tags, previewImg, accentColor, url }) {
  const [hover, setHover] = useState(false)
  const [imgOk, setImgOk] = useState(true)

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="block rounded-[20px] overflow-hidden shrink-0 transition-all duration-300 no-underline"
      style={{
        width: 500,
        background: hover ? 'var(--card-h)' : 'var(--card)',
        border: (hover ? '1.5px' : '1px') + ' solid ' + (hover ? accentColor + '80' : 'var(--card-border)'),
        boxShadow: hover ? '0 0 40px 4px ' + accentColor + '2e' : '0 0 16px rgba(0,0,0,0.08)',
        transform: hover ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      {/* Preview area */}
      <div className="relative h-[180px] w-full overflow-hidden" style={{ background: '#0a0a0a' }}>
        {imgOk ? (
          <img
            src={previewImg}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setImgOk(false)}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, ' + accentColor + '33, #0a0a0a 70%)' }}
          />
        )}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.3) 100%)' }}
        />
        {hover && (
          <div className="absolute inset-0" style={{ border: '1px solid ' + accentColor + '40' }} />
        )}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-200"
          style={{ opacity: hover ? 1 : 0 }}
        >
          <div className="flex items-center gap-1.5 px-[18px] py-2.5 rounded-[10px] bg-white/10 border border-white/25">
            <ExternalLink size={13} className="text-white/90" />
            <span className="text-white/90 text-xs font-bold">Visit Project</span>
          </div>
        </div>
      </div>

      {/* Text content */}
      <div className="p-6">
        <div className="flex items-center gap-2.5 mb-2.5">
          <span className="text-[10px] font-bold tracking-[2.5px]" style={{ color: accentColor + 'b3' }}>
            {index}
          </span>
          <div className="h-px w-6" style={{ background: accentColor + '4d' }} />
          <div className="flex-1" />
          <div
            className="flex items-center gap-1.5 px-2 py-[3px] rounded"
            style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.25)' }}
          >
            <span className="w-[5px] h-[5px] rounded-full bg-[#4ade80]" />
            <span className="text-[9.5px] font-bold text-[#4ade80]">Live</span>
          </div>
        </div>
        <h3
          className="text-2xl font-bold leading-none"
          style={{ color: 'var(--head)', fontFamily: 'Playfair Display, serif', letterSpacing: '-0.5px' }}
        >
          {title}
        </h3>
        <p className="text-xs font-semibold mt-1" style={{ color: accentColor + 'd9' }}>{subtitle}</p>
        <p
          className="text-xs leading-[1.65] mt-3 overflow-hidden"
          style={{ color: 'var(--body)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}
        >
          {description}
        </p>
        <div className="flex flex-wrap gap-[7px] mt-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-[5px] rounded-md text-[10.5px] font-semibold"
              style={{
                background: accentColor + '14',
                color: accentColor + 'e6',
                border: '1px solid ' + accentColor + '33',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  )
}