import { SECTIONS, scrollToSection } from '../lib/sections'

// Small dot navigation on the right edge: shows where you are on the page.
export default function SideDots({ active }) {
  return (
    <nav
      aria-label="Page sections"
      className="hidden md:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3"
    >
      {SECTIONS.map((s) => {
        const on = s.id === active
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => scrollToSection(s.id)}
            aria-label={`Go to ${s.label}`}
            aria-current={on ? 'true' : undefined}
            className="group flex items-center gap-2 cursor-pointer"
            style={{ background: 'none', border: 'none', padding: 2 }}
          >
            <span
              className="text-[10px] font-semibold tracking-wide opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200"
              style={{ color: 'var(--body)' }}
            >
              {s.label}
            </span>
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: 6,
                height: on ? 22 : 6,
                background: on ? 'var(--head)' : 'var(--border-h)',
              }}
            />
          </button>
        )
      })}
    </nav>
  )
}