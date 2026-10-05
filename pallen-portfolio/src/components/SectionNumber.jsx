// A large outlined number pinned to the right edge while its section is on screen.
// It sits behind the content, and each section's number swaps in as you scroll.
export default function SectionNumber({ n }) {
  return (
    <div
      aria-hidden="true"
      className="hidden md:block absolute inset-0 -z-10 overflow-clip pointer-events-none"
    >
      <div className="sticky top-[14vh] flex justify-end pr-[3vw]">
        <span
          className="font-bold leading-none select-none"
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(140px, 19vw, 300px)',
            letterSpacing: '-0.04em',
            color: 'transparent',
            WebkitTextStroke: '1px var(--border)',
          }}
        >
          {n}
        </span>
      </div>
    </div>
  )
}