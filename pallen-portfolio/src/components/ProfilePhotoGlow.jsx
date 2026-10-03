export default function ProfilePhotoGlow() {
  return (
    <div
      className="w-[200px] h-[200px] rounded-xl overflow-hidden animate-photoPulse"
    >
      <img
        src="/profile.jpg"
        alt="Prince Dunhill Pallen"
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.style.display = 'none'
          e.target.nextSibling.style.display = 'flex'
        }}
      />
      <div
        className="w-full h-full items-center justify-center hidden"
        style={{ background: 'var(--color-p10)', color: 'var(--color-p40)' }}
      >
        <svg width="72" height="72" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5z" />
        </svg>
      </div>
    </div>
  )
}