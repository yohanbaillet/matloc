import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendLeadEmail, escapeHtml } from '@/lib/email'

const schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    const html = `
      <h2>Nouveau message de contact — MAT INDUS</h2>
      <table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px">
        <tr><td><b>Nom</b></td><td>${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}</td></tr>
        <tr><td><b>Email</b></td><td><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
        <tr><td><b>Téléphone</b></td><td>${escapeHtml(data.phone || '—')}</td></tr>
        <tr><td valign="top"><b>Message</b></td><td>${escapeHtml(data.message).replace(/\n/g, '<br>')}</td></tr>
      </table>
    `

    await sendLeadEmail({
      subject: `Contact — ${data.firstName} ${data.lastName}`,
      html,
      replyTo: data.email,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error' }, { status: 400 })
    }
    console.error('[contact] error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
