import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Local only: serves api/contact.js at /api/contact while running `npm run dev`,
// so the contact form can be tested without `vercel dev`.
// Put RESEND_API_KEY=... in a file called .env.local (never commit it).
function localApi() {
  return {
    name: 'local-api',
    apply: 'serve',
    configureServer(server) {
      const env = loadEnv('development', process.cwd(), '')
      for (const [k, v] of Object.entries(env)) if (process.env[k] === undefined) process.env[k] = v

      server.middlewares.use('/api/contact', async (req, res) => {
        const send = (code, data) => {
          res.statusCode = code
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(data))
        }
        const shim = { status(c) { this.code = c; return this }, json(d) { send(this.code || 200, d) } }
        try {
          let raw = ''
          for await (const chunk of req) raw += chunk
          let body = {}
          try { body = raw ? JSON.parse(raw) : {} } catch { /* leave empty */ }
          const mod = await server.ssrLoadModule('/api/contact.js')
          await mod.default({ method: req.method, headers: req.headers, body }, shim)
        } catch (err) {
          console.error('Local /api/contact error:', err)
          send(500, { error: 'Local API error. See the terminal for details.' })
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), localApi()],
})