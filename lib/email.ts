import { Resend } from 'resend'

const CONTACT_TO = process.env.CONTACT_EMAIL_TO || 'contact@matindus.fr'
const CONTACT_FROM = process.env.CONTACT_EMAIL_FROM || 'MAT INDUS <noreply@matindus.fr>'

let _resend: Resend | null = null
function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  if (!_resend) _resend = new Resend(key)
  return _resend
}

type EmailArgs = {
  subject: string
  html: string
  replyTo?: string
}

export async function sendLeadEmail({ subject, html, replyTo }: EmailArgs) {
  const client = getResend()
  if (!client) {
    console.warn('[email] RESEND_API_KEY missing — skipping send')
    return { skipped: true as const }
  }

  const { error } = await client.emails.send({
    from: CONTACT_FROM,
    to: CONTACT_TO,
    subject,
    html,
    replyTo,
  })

  if (error) {
    console.error('[email] Resend error:', error)
    throw new Error(error.message || 'Email send failed')
  }

  return { skipped: false as const }
}

export function escapeHtml(input: string) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
