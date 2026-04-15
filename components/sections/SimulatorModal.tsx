'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { Calculator, ArrowRight, TrendingDown, Clock, Leaf, Trees, Flame, Zap, X, Lock } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'

// Technical constants from MatLoc Indus documentation
const GAS_KWH_PER_CYCLE = 220.8
const GAS_ELEC_KWH_PER_CYCLE = 30.4
const ENDO_ELEC_KWH_PER_CYCLE = 21.9
const GAS_CO2_FACTOR = 0.227
const ELEC_CO2_FACTOR = 0.147
const GAS_SUBSCRIPTION = 1000
const ELEC_SUBSCRIPTION_GAS = 400
const ELEC_SUBSCRIPTION_ENDO = 2650

function SliderRow({
  label, value, onChange, min, max, step, unit, decimals = 0,
}: {
  label: string; value: number; onChange: (v: number) => void
  min: number; max: number; step: number; unit: string; decimals?: number
}) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-foreground/60 text-xs">{label}</span>
        <span className="font-semibold text-midnight text-xs tabular-nums">
          {decimals > 0 ? value.toFixed(decimals) : value.toLocaleString('fr-FR')} {unit}
        </span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[var(--amber)]"
      />
    </div>
  )
}

function LeadForm({ onSubmit, onClose }: { onSubmit: (name: string) => void; onClose: () => void }) {
  const t = useTranslations('simulator')
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = t('form_required')
    if (!company.trim()) e.company = t('form_required')
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = t('form_invalid_email')
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    fetch('/api/simulator-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, company, email }),
    }).catch(() => {})
    onSubmit(name.split(' ')[0] || name)
  }

  const fieldClass = (f: string) =>
    `w-full rounded-lg border px-3 py-2 text-sm text-midnight placeholder:text-foreground/30 outline-none transition focus:ring-2 focus:ring-[var(--amber)]/40 focus:border-[var(--amber)] ${errors[f] ? 'border-red-400' : 'border-border'}`

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center p-4 bg-white/90 backdrop-blur-sm rounded-b-xl">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-bold text-midnight text-base">{t('reveal_title')}</p>
            <p className="text-xs text-foreground/50 mt-0.5">{t('reveal_subtitle')}</p>
          </div>
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-gray-100 text-foreground/40">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input type="text" placeholder={`${t('form_name_label')} *`} value={name}
              onChange={(e) => setName(e.target.value)} className={fieldClass('name')} />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div>
            <input type="text" placeholder={`${t('form_company_label')} *`} value={company}
              onChange={(e) => setCompany(e.target.value)} className={fieldClass('company')} />
            {errors.company && <p className="text-xs text-red-500 mt-1">{errors.company}</p>}
          </div>
          <div>
            <input type="email" placeholder={`${t('form_email_label')} *`} value={email}
              onChange={(e) => setEmail(e.target.value)} className={fieldClass('email')} />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>
          <button type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-[var(--amber)] px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-105">
            {t('form_submit')} <ArrowRight className="h-4 w-4" />
          </button>
        </form>
        <p className="mt-3 text-center text-[10px] text-foreground/35">
          {t('form_privacy')}
        </p>
      </div>
    </div>
  )
}

export default function SimulatorModal() {
  const t = useTranslations('simulator')
  const locale = useLocale()
  const [open, setOpen] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [firstName, setFirstName] = useState('')

  const [cyclesPerDay, setCyclesPerDay] = useState(4)
  const [daysPerYear, setDaysPerYear] = useState(250)
  const [gasPrice, setGasPrice] = useState(0.06)
  const [elecPrice, setElecPrice] = useState(0.15)
  const [priceDiff, setPriceDiff] = useState(10000)

  const r = useMemo(() => {
    const totalCycles = cyclesPerDay * daysPerYear
    const gasEnergyCost = (GAS_KWH_PER_CYCLE * gasPrice + GAS_ELEC_KWH_PER_CYCLE * elecPrice) * totalCycles
    const endoEnergyCost = ENDO_ELEC_KWH_PER_CYCLE * elecPrice * totalCycles
    const gasTotal = gasEnergyCost + GAS_SUBSCRIPTION + ELEC_SUBSCRIPTION_GAS
    const endoTotal = endoEnergyCost + ELEC_SUBSCRIPTION_ENDO
    const annualSavings = gasTotal - endoTotal
    const roiYears = annualSavings > 0 ? priceDiff / annualSavings : Infinity
    const roiMonths = Math.round(roiYears * 12)
    const gasCO2 = (GAS_KWH_PER_CYCLE * GAS_CO2_FACTOR + GAS_ELEC_KWH_PER_CYCLE * ELEC_CO2_FACTOR) * totalCycles / 1000
    const endoCO2 = ENDO_ELEC_KWH_PER_CYCLE * ELEC_CO2_FACTOR * totalCycles / 1000
    const co2Avoided = gasCO2 - endoCO2
    return {
      gasTotal: Math.round(gasTotal),
      endoTotal: Math.round(endoTotal),
      annualSavings: Math.round(annualSavings),
      roiYears,
      roiMonths,
      co2Avoided: Math.round(co2Avoided * 10) / 10,
      trees: Math.round((co2Avoided * 1000) / 10.2),
    }
  }, [cyclesPerDay, daysPerYear, gasPrice, elecPrice, priceDiff])

  const roiLabel = r.roiYears === Infinity ? '—'
    : r.roiMonths < 24 ? t('roi_months', { months: r.roiMonths })
    : t('roi_years', { years: r.roiYears.toFixed(1).replace('.', ',') })

  const barMax = Math.max(r.gasTotal, r.endoTotal)

  const handleReveal = (name: string) => {
    setFirstName(name)
    setRevealed(true)
    setShowForm(false)
  }

  const handleOpenChange = (next: boolean) => {
    setOpen(next)
    if (!next) setTimeout(() => { setRevealed(false); setShowForm(false) }, 300)
  }

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg bg-[var(--amber)] px-8 py-3 text-base font-semibold text-white shadow-amber transition-all hover:brightness-105 hover:-translate-y-0.5">
        <Calculator className="h-4 w-4" />
        {t('hero_cta')}
      </button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent showCloseButton={false}
          className="sm:max-w-2xl p-0 gap-0 overflow-hidden max-h-[90vh] flex flex-col">

          {/* Close */}
          <button onClick={() => setOpen(false)}
            className="absolute top-3 right-3 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-foreground/50 transition hover:bg-black/10 hover:text-foreground">
            <X className="h-4 w-4" />
          </button>

          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-border shrink-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--amber)] mb-1">{t('badge')}</p>
            <DialogTitle className="text-lg font-black text-midnight">
              {revealed && firstName ? t('modal_title_revealed', { name: firstName }) : t('modal_title_default')}
            </DialogTitle>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">

              {/* Sliders — always visible */}
              <div className="p-5 space-y-5">
                <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wider">{t('params_label')}</p>
                <SliderRow label={t('cycles_label')} value={cyclesPerDay} onChange={setCyclesPerDay} min={1} max={12} step={1} unit={t('unit_cycles')} />
                <SliderRow label={t('days_label')} value={daysPerYear} onChange={setDaysPerYear} min={100} max={365} step={5} unit={t('unit_days')} />
                <SliderRow label={t('gas_price_label')} value={gasPrice} onChange={setGasPrice} min={0.03} max={0.20} step={0.005} unit={t('unit_kwh')} decimals={3} />
                <SliderRow label={t('elec_price_label')} value={elecPrice} onChange={setElecPrice} min={0.05} max={0.40} step={0.005} unit={t('unit_kwh')} decimals={3} />
                <SliderRow label={t('price_diff_label')} value={priceDiff} onChange={setPriceDiff} min={0} max={50000} step={1000} unit="€" />
              </div>

              {/* Results — blurred until revealed */}
              <div className="relative p-5 space-y-4">
                {showForm && <LeadForm onSubmit={handleReveal} onClose={() => setShowForm(false)} />}

                <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wider">{t('results_label')}</p>

                <div className={`space-y-4 transition-all duration-500 ${!revealed ? 'blur-sm select-none pointer-events-none' : ''}`}>
                  {/* Cost bars */}
                  <div className="space-y-2.5">
                    {[
                      { label: t('gas_label'), value: r.gasTotal, icon: <Flame size={12} />, color: 'bg-red-400' },
                      { label: t('endo_label'), value: r.endoTotal, icon: <Zap size={12} />, color: 'bg-[var(--amber)]' },
                    ].map((b) => (
                      <div key={b.label}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="flex items-center gap-1 text-foreground/60">{b.icon}{b.label}</span>
                          <span className="font-bold text-midnight tabular-nums">{b.value.toLocaleString('fr-FR')} €{t('per_year')}</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full ${b.color} rounded-full transition-all duration-500`}
                            style={{ width: `${Math.max(4, (b.value / barMax) * 100)}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Metric cards */}
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { icon: <TrendingDown size={14} />, label: t('saving_label'), value: `${r.annualSavings.toLocaleString('fr-FR')} €`, highlight: true },
                      { icon: <Clock size={14} />, label: t('roi_label'), value: roiLabel, highlight: r.roiYears < 5 },
                      { icon: <Leaf size={14} />, label: t('co2_label'), value: `${r.co2Avoided} t${t('per_year')}`, highlight: false },
                      { icon: <Trees size={14} />, label: t('trees_label'), value: r.trees.toLocaleString('fr-FR'), highlight: false },
                    ].map((m) => (
                      <div key={m.label} className={`rounded-lg p-3 ${m.highlight ? 'bg-midnight text-white' : 'bg-gray-50'}`}>
                        <div className={`mb-1 ${m.highlight ? 'text-[var(--amber)]' : 'text-foreground/40'}`}>{m.icon}</div>
                        <p className={`text-[10px] ${m.highlight ? 'text-white/50' : 'text-foreground/50'}`}>{m.label}</p>
                        <p className={`text-base font-black tabular-nums ${m.highlight ? 'text-white' : 'text-midnight'}`}>{m.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gate CTA */}
                {!revealed && !showForm && (
                  <button onClick={() => setShowForm(true)}
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-midnight px-5 py-3 text-sm font-semibold text-white transition hover:bg-midnight/90 mt-2">
                    <Lock className="h-3.5 w-3.5" />
                    {t('reveal_cta')}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Quote CTA — only after reveal */}
          {revealed && (
            <div className="border-t border-border p-5 bg-surface/50 shrink-0">
              <p className="text-xs text-foreground/50 mb-3 text-center">
                {t('quote_teaser')}
              </p>
              <Link href={`/${locale}/devis`}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--amber)] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-105 hover:-translate-y-0.5">
                {t('quote_cta')} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
