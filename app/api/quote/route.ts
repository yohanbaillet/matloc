import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getSupabaseAdmin } from '@/lib/supabase'

const schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  company: z.string().min(2),
  sector: z.string().min(1),
  projectType: z.string().min(1),
  message: z.string().min(10),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    const supabase = getSupabaseAdmin()
    const { error } = await supabase.from('quote_leads').insert({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      company: data.company,
      sector: data.sector,
      project_type: data.projectType,
      message: data.message,
    })

    if (error) {
      console.error('[quote] Supabase error:', error)
      return NextResponse.json({ error: 'Database error', detail: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error' }, { status: 400 })
    }
    console.error('[quote] error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
