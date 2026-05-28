import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendLeadEmail, escapeHtml } from '@/lib/email'

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

    try {
      const html = `
        <h2>Nouveau lead simulateur — MAT INDUS</h2>
        <table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px">
          <tr><td><b>Nom</b></td><td>${escapeHtml(String(name))}</td></tr>
          <tr><td><b>Société</b></td><td>${escapeHtml(String(company))}</td></tr>
          <tr><td><b>Email</b></td><td><a href="mailto:${escapeHtml(String(email))}">${escapeHtml(String(email))}</a></td></tr>
          <tr><td colspan="2"><hr></td></tr>
          <tr><td><b>Cycles / jour</b></td><td>${escapeHtml(String(cycles_per_day))}</td></tr>
          <tr><td><b>Jours / an</b></td><td>${escapeHtml(String(days_per_year))}</td></tr>
          <tr><td><b>Prix gaz</b></td><td>${escapeHtml(String(gas_price))} €/kWh</td></tr>
          <tr><td><b>Prix élec.</b></td><td>${escapeHtml(String(elec_price))} €/kWh</td></tr>
          <tr><td><b>Économies annuelles</b></td><td><b>${escapeHtml(String(annual_savings))} €</b></td></tr>
          <tr><td><b>ROI</b></td><td>${escapeHtml(String(roi_months))} mois</td></tr>
        </table>
      `
      await sendLeadEmail({
        subject: `Simulateur — ${company} (${name})`,
        html,
        replyTo: String(email),
      })
    } catch (emailErr) {
      console.error('[simulator-lead] email send failed (lead still saved):', emailErr)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[simulator-lead] exception:', err)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
