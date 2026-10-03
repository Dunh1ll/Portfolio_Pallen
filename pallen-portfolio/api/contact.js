import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, subject, message } = req.body || {}

  // Server-side validation — never trust the client, even though the
  // frontend already checks this too.
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' })
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' })
  }
  if (message.trim().length < 10) {
    return res.status(400).json({ error: 'Message is too short.' })
  }

  try {
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // swap to your verified domain later
      to: 'cpe.pallen.princedunhill@gmail.com',
      replyTo: email,
      subject: `[Portfolio] ${subject || 'Portfolio Inquiry'}`,
      html: `
        <h2>New message from your portfolio</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || 'Portfolio Inquiry'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Resend error:', err)
    return res.status(500).json({ error: 'Failed to send message. Please try again later.' })
  }
}