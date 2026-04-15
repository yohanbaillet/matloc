import { redirect } from 'next/navigation'
import { createAuthClient, createAdminClient } from '@/lib/supabase/server'
import LogoutButton from './LogoutButton'

type Lead = {
  id: string
  name: string
  company: string
  email: string
  cycles_per_day: number
  days_per_year: number
  gas_price: number
  elec_price: number
  price_diff: number
  annual_savings: number
  roi_months: number
  created_at: string
}

function roiLabel(months: number) {
  if (!months) return '—'
  return months < 24 ? `${months} mois` : `${(months / 12).toFixed(1)} ans`
}

export default async function AdminPage() {
  const authClient = await createAuthClient()
  const { data: { session } } = await authClient.auth.getSession()

  if (!session) redirect('/admin/login')

  const { data: leads, error } = await createAdminClient()
    .from('simulator_leads')
    .select('*')
    .order('created_at', { ascending: false })

  const totalLeads = leads?.length ?? 0
  const avgSavings = leads?.length
    ? Math.round(leads.reduce((s, l) => s + (l.annual_savings ?? 0), 0) / leads.length)
    : 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-0.5">MatLoc Indus</p>
          <h1 className="text-lg font-bold text-gray-900">Leads simulateur</h1>
        </div>
        <LogoutButton />
      </header>

      <main className="p-6 max-w-7xl mx-auto space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { label: 'Total leads', value: totalLeads.toString() },
            { label: 'Économie moyenne', value: avgSavings ? `${avgSavings.toLocaleString('fr-FR')} €/an` : '—' },
            { label: 'Dernier lead', value: leads?.[0] ? new Date(leads[0].created_at).toLocaleDateString('fr-FR') : '—' },
          ].map((k) => (
            <div key={k.label} className="bg-white rounded-xl border border-gray-100 p-4">
              <p className="text-xs text-gray-400 mb-1">{k.label}</p>
              <p className="text-2xl font-bold text-gray-900">{k.value}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Tous les leads</h2>
            <span className="text-sm text-gray-400">{totalLeads} entrée{totalLeads > 1 ? 's' : ''}</span>
          </div>

          {error && (
            <p className="p-6 text-sm text-red-500">Erreur : {error.message}</p>
          )}

          {!error && totalLeads === 0 && (
            <p className="p-6 text-sm text-gray-400">Aucun lead pour le moment.</p>
          )}

          {!error && totalLeads > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left border-b border-gray-100">
                    <th className="px-4 py-3 font-medium text-gray-500">Date</th>
                    <th className="px-4 py-3 font-medium text-gray-500">Nom</th>
                    <th className="px-4 py-3 font-medium text-gray-500">Société</th>
                    <th className="px-4 py-3 font-medium text-gray-500">Email</th>
                    <th className="px-4 py-3 font-medium text-gray-500 text-right">Économie/an</th>
                    <th className="px-4 py-3 font-medium text-gray-500 text-right">ROI</th>
                    <th className="px-4 py-3 font-medium text-gray-500 text-right">Cycles/j</th>
                    <th className="px-4 py-3 font-medium text-gray-500 text-right">Jours/an</th>
                    <th className="px-4 py-3 font-medium text-gray-500 text-right">Gaz €/kWh</th>
                    <th className="px-4 py-3 font-medium text-gray-500 text-right">Élec €/kWh</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {(leads as Lead[]).map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="px-4 py-3 text-gray-400 whitespace-nowrap text-xs">
                        {new Date(lead.created_at).toLocaleString('fr-FR', {
                          day: '2-digit', month: '2-digit', year: 'numeric',
                          hour: '2-digit', minute: '2-digit',
                        })}
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900">{lead.name}</td>
                      <td className="px-4 py-3 text-gray-600">{lead.company}</td>
                      <td className="px-4 py-3">
                        <a href={`mailto:${lead.email}`} className="text-orange-500 hover:underline">
                          {lead.email}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-emerald-600 tabular-nums">
                        {lead.annual_savings?.toLocaleString('fr-FR')} €
                      </td>
                      <td className="px-4 py-3 text-right text-gray-600 tabular-nums">
                        {roiLabel(lead.roi_months)}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-500 tabular-nums">{lead.cycles_per_day}</td>
                      <td className="px-4 py-3 text-right text-gray-500 tabular-nums">{lead.days_per_year}</td>
                      <td className="px-4 py-3 text-right text-gray-500 tabular-nums">{lead.gas_price}</td>
                      <td className="px-4 py-3 text-right text-gray-500 tabular-nums">{lead.elec_price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
