import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

// Listens for showToast() calls and shows one small message at the bottom.
export default function Toaster() {
  const [toast, setToast] = useState(null)
  const timer = useRef(null)

  useEffect(() => {
    const onToast = (e) => {
      setToast({ text: e.detail, id: Date.now() })
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setToast(null), 2200)
    }
    window.addEventListener('app-toast', onToast)
    return () => {
      window.removeEventListener('app-toast', onToast)
      clearTimeout(timer.current)
    }
  }, [])

  if (!toast) return null

  return createPortal(
    <div
      key={toast.id}
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 z-[150] px-4 py-2.5 rounded-full text-xs font-semibold"
      style={{
        background: 'var(--head)',
        color: 'var(--bg)',
        boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
        animation: 'toastIn 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) both',
      }}
    >
      {toast.text}
    </div>,
    document.body
  )
}