import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getSupabaseAdmin } from '@/lib/supabase'

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

    const supabase = getSupabaseAdmin()
    const { error } = await supabase.from('contact_leads').insert({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone || null,
      message: data.message,
    })

    if (error) {
      console.error('[contact] Supabase error:', error)
      return NextResponse.json({ error: 'Database error', detail: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error' }, { status: 400 })
    }
    console.error('[contact] error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
