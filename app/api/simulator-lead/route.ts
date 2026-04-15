import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, company, email } = body

    if (!name || !company || !email) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // TODO: save to Supabase or send via Resend
    console.log('[simulator-lead]', { name, company, email })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
