import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const LIMITS = { name: 100, email: 254, subject: 150, message: 2000 }

// Naive in-memory rate limit (per serverless instance). Good enough to blunt
// casual abuse; use Upstash/Vercel KV or Turnstile for something stronger.
const hits = new Map()
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5

function rateLimited(ip) {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > MAX_PER_WINDOW
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown'
  if (rateLimited(ip)) {
    return res.status(429).json({ error: 'Too many messages. Please try again later.' })
  }

  const body = req.body || {}

  // Honeypot: real users never fill this hidden field. Pretend success to bots.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return res.status(200).json({ success: true })
  }

  const { name, email, subject, message } = body

  // Type checks — never trust the client.
  for (const v of [name, email, message]) {
    if (typeof v !== 'string') {
      return res.status(400).json({ error: 'Name, email, and message are required.' })
    }
  }
  if (subject !== undefined && typeof subject !== 'string') {
    return res.status(400).json({ error: 'Invalid subject.' })
  }

  const clean = {
    name: name.trim(),
    email: email.trim(),
    subject: (subject || '').trim() || 'Portfolio Inquiry',
    message: message.trim(),
  }

  if (!clean.name || !clean.email || !clean.message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' })
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(clean.email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' })
  }
  if (clean.message.length < 10) {
    return res.status(400).json({ error: 'Message is too short.' })
  }
  for (const key of Object.keys(LIMITS)) {
    if (clean[key].length > LIMITS[key]) {
      return res.status(400).json({ error: `${key} is too long.` })
    }
  }
  // Header-injection guard: no line breaks in single-line fields.
  if (/[\r\n]/.test(clean.name + clean.email + clean.subject)) {
    return res.status(400).json({ error: 'Invalid characters in input.' })
  }

  try {
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // swap to your verified domain later
      to: 'cpe.pallen.princedunhill@gmail.com',
      replyTo: clean.email,
      subject: `[Portfolio] ${clean.subject}`,
      text: `Name: ${clean.name}\nEmail: ${clean.email}\nSubject: ${clean.subject}\n\n${clean.message}`,
      html: `
        <h2>New message from your portfolio</h2>
        <p><strong>Name:</strong> ${escapeHtml(clean.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(clean.email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(clean.subject)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(clean.message).replace(/\n/g, '<br>')}</p>
      `,
    })

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Resend error:', err)
    return res.status(500).json({ error: 'Failed to send message. Please try again later.' })
  }
}