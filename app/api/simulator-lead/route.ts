import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      name, company, email,
      cycles_per_day, days_per_year, gas_price, elec_price, price_diff,
      annual_savings, roi_months,
    } = body

    console.log('[simulator-lead] received:', { name, company, email })

    if (!name || !company || !email) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY

    console.log('[simulator-lead] env check — url:', !!url, 'key:', !!key)

    if (!url || !key) {
      return NextResponse.json({ error: 'Missing env vars' }, { status: 500 })
    }

    const supabase = createClient(url, key)

    const { error } = await supabase.from('simulator_leads').insert({
      name,
      company,
      email,
      cycles_per_day,
      days_per_year,
      gas_price,
      elec_price,
      price_diff,
      annual_savings,
      roi_months,
    })

    if (error) {
      console.error('[simulator-lead] Supabase error:', JSON.stringify(error))
      return NextResponse.json({ error: 'Database error', detail: error.message }, { status: 500 })
    }

    console.log('[simulator-lead] inserted OK')
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[simulator-lead] exception:', err)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
