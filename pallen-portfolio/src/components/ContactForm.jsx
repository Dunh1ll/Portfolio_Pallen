import { useState } from 'react'
import { Send, Loader2 } from 'lucide-react'
import FormField from './FormField'
import Banner from './Banner'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('') // honeypot — real users never see/fill this
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState(null) // { type: 'success' | 'error', message: string }

  async function handleSend() {
    setStatus(null)

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ type: 'error', message: 'Please fill in your name, email, and message.' })
      return
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' })
      return
    }
    if (message.trim().length < 10) {
      setStatus({ type: 'error', message: 'Your message is too short — please write at least 10 characters.' })
      return
    }

    setSending(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim() || 'Portfolio Inquiry',
          message: message.trim(),
          website,
        }),
      })

      if (res.ok) {
        setStatus({ type: 'success', message: "Message sent! I'll get back to you within 48 hours." })
        setTimeout(() => {
          setName(''); setEmail(''); setSubject(''); setMessage(''); setStatus(null)
        }, 4000)
      } else {
        const data = await res.json().catch(() => ({}))
        setStatus({ type: 'error', message: data.error || 'Send failed. Please try again.' })
      }
    } catch {
      setStatus({ type: 'error', message: 'Something went wrong. Check your connection and try again.' })
    } finally {
      setSending(false)
    }
  }

  return (
    <div
      className="rounded-2xl p-8 relative"
      style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}
    >
      <div aria-live="polite">
        {status && <Banner type={status.type} message={status.message} />}
      </div>

      <div className="flex flex-col gap-5">
        <input
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField label="Your Name" value={name} onChange={setName} maxLength={100} required />
          <FormField label="Your Email" value={email} onChange={setEmail} type="email" maxLength={254} required />
        </div>
        <FormField label="Subject" value={subject} onChange={setSubject} maxLength={150} />
        <FormField label="Message" value={message} onChange={setMessage} multiline maxLength={2000} required />

        <button
          onClick={handleSend}
          disabled={sending}
          className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-bold transition-opacity duration-150"
          style={{
            background: 'var(--head)',
            color: 'var(--bg)',
            opacity: sending ? 0.7 : 1,
            cursor: sending ? 'not-allowed' : 'pointer',
          }}
        >
          {sending ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send size={16} />
              Send Message
            </>
          )}
        </button>
      </div>
    </div>
  )
}