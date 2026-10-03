export default function FadeSlide({ children, delay = 0, className = '' }) {
  return (
    <div
      className={`animate-fadeSlide ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  )
}