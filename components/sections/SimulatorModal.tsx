'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { Calculator, ArrowRight, TrendingDown, TrendingUp, Leaf, Trees, Flame, Zap, X, ChevronDown, ChevronUp } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'

// Technical constants from MatLoc Indus documentation
const GAS_KWH_PER_CYCLE = 220.8
const GAS_ELEC_KWH_PER_CYCLE = 30.4
const ENDO_ELEC_KWH_PER_CYCLE = 21.9
const GAS_CO2_FACTOR = 0.227
const ELEC_CO2_FACTOR = 0.147
const GAS_SUBSCRIPTION = 1000      // gas network subscription €/year
const ELEC_SUBSCRIPTION_GAS = 400  // electricity subscription for gas booth €/year
const ELEC_SUBSCRIPTION_ENDO = 2650 // electricity subscription for endo booth €/year

// Average energy prices by locale (€/kWh, commercial/industrial rates)
const LOCALE_PRICES: Record<string, { gasPrice: number; elecPrice: number }> = {
  fr: { gasPrice: 0.06, elecPrice: 0.15 },
  en: { gasPrice: 0.08, elecPrice: 0.24 },
  de: { gasPrice: 0.07, elecPrice: 0.25 },
  es: { gasPrice: 0.05, elecPrice: 0.14 },
  nl: { gasPrice: 0.10, elecPrice: 0.22 },
  zh: { gasPrice: 0.04, elecPrice: 0.09 },
}

function SliderRow({
  label, value, onChange, min, max, step, unit, decimals = 0,
}: {
  label: string; value: number; onChange: (v: number) => void
  min: number; max: number; step: number; unit: string; decimals?: number
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-foreground/60 text-sm">{label}</span>
        <span className="font-semibold text-midnight text-sm tabular-nums">
          {decimals > 0 ? value.toFixed(decimals) : value.toLocaleString('fr-FR')} {unit}
        </span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full cursor-pointer"
        style={{ background: `linear-gradient(to right, var(--amber) ${pct}%, #e5e7eb ${pct}%)` }}
      />
    </div>
  )
}

export default function SimulatorModal() {
  const t = useTranslations('simulator')
  const locale = useLocale()
  const [open, setOpen] = useState(false)
  const [phase, setPhase] = useState<'sliders' | 'form' | 'results'>('sliders')
  const [firstName, setFirstName] = useState('')
  const [showPriceSliders, setShowPriceSliders] = useState(false)
  const [viewYears, setViewYears] = useState(5)

  // Form state
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Slider state — gas/elec default to locale-specific averages
  const defaultPrices = LOCALE_PRICES[locale] ?? LOCALE_PRICES.fr
  const [cyclesPerDay, setCyclesPerDay] = useState(4)
  const [daysPerYear, setDaysPerYear] = useState(250)
  const [gasPrice, setGasPrice] = useState(defaultPrices.gasPrice)
  const [elecPrice, setElecPrice] = useState(defaultPrices.elecPrice)
  const [priceDiff, setPriceDiff] = useState(10000)

  const r = useMemo(() => {
    const totalCycles = cyclesPerDay * daysPerYear
    const gasEnergyCost = (GAS_KWH_PER_CYCLE * gasPrice + GAS_ELEC_KWH_PER_CYCLE * elecPrice) * totalCycles
    const endoEnergyCost = ENDO_ELEC_KWH_PER_CYCLE * elecPrice * totalCycles
    const gasSubscription = GAS_SUBSCRIPTION + ELEC_SUBSCRIPTION_GAS
    const endoSubscription = ELEC_SUBSCRIPTION_ENDO
    const gasTotal = gasEnergyCost + gasSubscription
    const endoTotal = endoEnergyCost + endoSubscription
    const annualSavings = gasTotal - endoTotal
    const roiYears = annualSavings > 0 ? priceDiff / annualSavings : Infinity
    const roiMonths = Math.round(roiYears * 12)
    const gasCO2 = (GAS_KWH_PER_CYCLE * GAS_CO2_FACTOR + GAS_ELEC_KWH_PER_CYCLE * ELEC_CO2_FACTOR) * totalCycles / 1000
    const endoCO2 = ENDO_ELEC_KWH_PER_CYCLE * ELEC_CO2_FACTOR * totalCycles / 1000
    const co2Avoided = gasCO2 - endoCO2
    return {
      gasEnergyCost: Math.round(gasEnergyCost),
      endoEnergyCost: Math.round(endoEnergyCost),
      gasSubscription,
      endoSubscription,
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

  // ROI-over-time calculations for the years slider
  const gasCumulative = r.gasTotal * viewYears
  const endoCumulative = r.endoTotal * viewYears + priceDiff
  const netBenefit = gasCumulative - endoCumulative
  const isProfit = netBenefit >= 0
  const cumulativeMax = Math.max(gasCumulative, endoCumulative)
  const gasBarPct = Math.round((gasCumulative / cumulativeMax) * 100)
  const endoBarPct = Math.round((endoCumulative / cumulativeMax) * 100)
  const yearsPct = ((viewYears - 1) / (15 - 1)) * 100

  const validateForm = () => {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = t('form_required')
    if (!company.trim()) e.company = t('form_required')
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = t('form_invalid_email')
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    fetch('/api/simulator-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name, company, email,
        cycles_per_day: cyclesPerDay,
        days_per_year: daysPerYear,
        gas_price: gasPrice,
        elec_price: elecPrice,
        price_diff: priceDiff,
        annual_savings: r.annualSavings,
        roi_months: r.roiMonths,
      }),
    })
      .then(async (res) => {
        const json = await res.json()
        if (!res.ok) console.error('[simulator-lead] API error:', res.status, json)
      })
      .catch((err) => console.error('[simulator-lead] fetch error:', err))
    setFirstName(name.split(' ')[0] || name)
    setPhase('results')
  }

  const handleOpenChange = (next: boolean) => {
    setOpen(next)
    if (!next) setTimeout(() => { setPhase('sliders'); setShowPriceSliders(false); setViewYears(5) }, 300)
  }

  const fieldClass = (f: string) =>
    `w-full rounded-lg border px-3 py-2.5 text-sm text-midnight placeholder:text-foreground/40 outline-none transition focus:ring-2 focus:ring-[var(--amber)]/40 focus:border-[var(--amber)] ${errors[f] ? 'border-red-400' : 'border-border'}`

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg bg-[var(--amber)] px-8 py-3 text-base font-semibold text-white shadow-amber transition-all hover:brightness-105 hover:-translate-y-0.5">
        <Calculator className="h-4 w-4" />
        {t('hero_cta')}
      </button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent showCloseButton={false}
          className="sm:max-w-lg p-0 gap-0 overflow-hidden max-h-[90dvh] flex flex-col">

          {/* Close */}
          <button onClick={() => setOpen(false)}
            className="absolute top-3 right-3 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-foreground/50 transition hover:bg-black/10 hover:text-foreground">
            <X className="h-4 w-4" />
          </button>

          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-border shrink-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--amber)] mb-1">{t('badge')}</p>
            <DialogTitle className="text-lg font-black text-midnight">
              {phase === 'results' && firstName
                ? t('modal_title_revealed', { name: firstName })
                : t('modal_title_default')}
            </DialogTitle>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto">

            {/* Phase 1 — Sliders */}
            {phase === 'sliders' && (
              <div className="p-6 space-y-6">
                <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wider">{t('params_label')}</p>
                <div className="space-y-5">
                  <SliderRow label={t('cycles_label')} value={cyclesPerDay} onChange={setCyclesPerDay} min={1} max={12} step={1} unit={t('unit_cycles')} />
                  <SliderRow label={t('days_label')} value={daysPerYear} onChange={setDaysPerYear} min={100} max={365} step={5} unit={t('unit_days')} />
                  <SliderRow label={t('price_diff_label')} value={priceDiff} onChange={setPriceDiff} min={0} max={50000} step={1000} unit="€" />
                </div>

                {/* Advanced: price sliders (collapsible) */}
                <div className="border border-border rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setShowPriceSliders(!showPriceSliders)}
                    className="w-full flex items-center justify-between px-4 py-3 text-xs font-semibold text-foreground/50 uppercase tracking-wider bg-gray-50 hover:bg-gray-100 transition">
                    <span>{t('gas_price_label')} · {t('elec_price_label')}</span>
                    {showPriceSliders ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                  {showPriceSliders && (
                    <div className="p-4 space-y-4 bg-white">
                      <p className="text-[11px] text-foreground/40">
                        {t('results_prices_note', { gasPrice: gasPrice.toFixed(3), elecPrice: elecPrice.toFixed(3) })}
                      </p>
                      <SliderRow label={t('gas_price_label')} value={gasPrice} onChange={setGasPrice} min={0.02} max={0.25} step={0.005} unit={t('unit_kwh')} decimals={3} />
                      <SliderRow label={t('elec_price_label')} value={elecPrice} onChange={setElecPrice} min={0.05} max={0.45} step={0.005} unit={t('unit_kwh')} decimals={3} />
                    </div>
                  )}
                </div>

                <button onClick={() => setPhase('form')}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-[var(--amber)] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-105">
                  {t('reveal_cta')} <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Phase 2 — Lead form */}
            {phase === 'form' && (
              <div className="p-6">
                <div className="mb-5">
                  <p className="font-bold text-midnight text-base">{t('reveal_title')}</p>
                  <p className="text-sm text-foreground/50 mt-1">{t('reveal_subtitle')}</p>
                </div>
                <form onSubmit={handleFormSubmit} className="space-y-3">
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
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-[var(--amber)] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-105">
                    {t('form_submit')} <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
                <p className="mt-3 text-center text-[11px] text-foreground/40">{t('form_privacy')}</p>
              </div>
            )}

            {/* Phase 3 — Results */}
            {phase === 'results' && (
              <div className="p-6 space-y-4">

                {/* 1 — Cabin investment banner */}
                <div className="rounded-xl border border-[var(--amber)]/30 bg-[var(--amber)]/5 px-5 py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Zap size={15} className="text-[var(--amber)] shrink-0" />
                    <p className="text-sm font-semibold text-midnight">{t('cabin_investment')}</p>
                  </div>
                  <p className="text-xl font-black tabular-nums text-midnight">
                    {priceDiff.toLocaleString('fr-FR')} €
                  </p>
                </div>

                {/* 2 — Annual cost comparison table */}
                <div className="rounded-xl overflow-hidden border border-border">
                  <div className="grid grid-cols-3 bg-gray-50 px-4 py-2.5 border-b border-border">
                    <div />
                    <div className="text-center flex items-center justify-center gap-1 text-xs font-semibold text-foreground/60 uppercase tracking-wide">
                      <Flame size={11} /> {t('gas_label')}
                    </div>
                    <div className="text-center flex items-center justify-center gap-1 text-xs font-semibold text-emerald-600 uppercase tracking-wide">
                      <Zap size={11} /> {t('endo_label')}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 px-4 py-3 border-b border-border items-center">
                    <div className="text-xs text-foreground/50">{t('results_energy')}</div>
                    <div className="text-center font-semibold tabular-nums text-sm text-midnight">
                      {r.gasEnergyCost.toLocaleString('fr-FR')} €
                    </div>
                    <div className="text-center font-semibold tabular-nums text-sm text-emerald-600">
                      {r.endoEnergyCost.toLocaleString('fr-FR')} €
                    </div>
                  </div>
                  <div className="grid grid-cols-3 px-4 py-3 border-b border-border items-center bg-gray-50/50">
                    <div className="text-xs text-foreground/50">{t('results_subscription')}</div>
                    <div className="text-center font-semibold tabular-nums text-sm text-midnight">
                      {r.gasSubscription.toLocaleString('fr-FR')} €
                    </div>
                    <div className="text-center font-semibold tabular-nums text-sm text-emerald-600">
                      {r.endoSubscription.toLocaleString('fr-FR')} €
                    </div>
                  </div>
                  <div className="grid grid-cols-3 px-4 py-3.5 items-center">
                    <div className="text-xs font-bold text-midnight">{t('results_total')}</div>
                    <div className="text-center font-black tabular-nums text-base text-midnight">
                      {r.gasTotal.toLocaleString('fr-FR')} €
                    </div>
                    <div className="text-center font-black tabular-nums text-base text-emerald-600">
                      {r.endoTotal.toLocaleString('fr-FR')} €
                    </div>
                  </div>
                </div>

                {/* 3 — ROI over time slider */}
                <div className="rounded-xl border border-border p-4 space-y-4">
                  {/* Section header + years slider */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wider">
                        {t('roi_over_time')}
                      </p>
                      <span className="text-sm font-black text-midnight tabular-nums">
                        {viewYears} {t('years_unit')}
                      </span>
                    </div>
                    <input
                      type="range" min={1} max={15} step={1} value={viewYears}
                      onChange={(e) => setViewYears(Number(e.target.value))}
                      className="w-full h-1.5 rounded-full cursor-pointer"
                      style={{ background: `linear-gradient(to right, var(--amber) ${yearsPct}%, #e5e7eb ${yearsPct}%)` }}
                    />
                    <div className="flex justify-between text-[10px] text-foreground/30 mt-1">
                      <span>1</span><span>15</span>
                    </div>
                  </div>

                  {/* Cumulative cost bars */}
                  <div className="space-y-3">
                    {/* Gas bar */}
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="flex items-center gap-1 text-foreground/60">
                          <Flame size={11} /> {t('gas_label')} ({t('cumulative')})
                        </span>
                        <span className="font-bold text-midnight tabular-nums">
                          {gasCumulative.toLocaleString('fr-FR')} €
                        </span>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-red-300 rounded-full transition-all duration-300"
                          style={{ width: `${gasBarPct}%` }}
                        />
                      </div>
                    </div>
                    {/* Endo bar */}
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="flex items-center gap-1 text-emerald-600">
                          <Zap size={11} /> {t('endo_label')} ({t('cumulative')})
                        </span>
                        <span className="font-bold text-emerald-600 tabular-nums">
                          {endoCumulative.toLocaleString('fr-FR')} €
                        </span>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-400 rounded-full transition-all duration-300"
                          style={{ width: `${endoBarPct}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Net benefit card */}
                  <div className={`rounded-lg px-4 py-3 flex items-center justify-between transition-colors ${
                    isProfit
                      ? 'bg-emerald-50 border border-emerald-200'
                      : 'bg-amber-50 border border-amber-200'
                  }`}>
                    <div className="flex items-center gap-2">
                      {isProfit
                        ? <TrendingDown size={15} className="text-emerald-600" />
                        : <TrendingUp size={15} className="text-amber-600" />
                      }
                      <p className={`text-sm font-semibold ${isProfit ? 'text-emerald-800' : 'text-amber-800'}`}>
                        {t('net_benefit_label')}
                      </p>
                    </div>
                    <p className={`text-xl font-black tabular-nums ${isProfit ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {isProfit ? '+' : ''}{netBenefit.toLocaleString('fr-FR')} €
                    </p>
                  </div>

                  {/* Breakeven note */}
                  <p className="text-[11px] text-foreground/40 text-center">
                    {t('results_paid_back')} : <span className="font-semibold text-foreground/60">{roiLabel}</span>
                  </p>
                </div>

                {/* 4 — CO2 + Trees */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-gray-50 p-4">
                    <div className="mb-1 text-foreground/40"><Leaf size={14} /></div>
                    <p className="text-[11px] text-foreground/50">{t('co2_label')}</p>
                    <p className="text-xl font-black tabular-nums text-midnight">
                      {r.co2Avoided} t{t('per_year')}
                    </p>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-4">
                    <div className="mb-1 text-foreground/40"><Trees size={14} /></div>
                    <p className="text-[11px] text-foreground/50">{t('trees_label')}</p>
                    <p className="text-xl font-black tabular-nums text-midnight">
                      {r.trees.toLocaleString('fr-FR')}
                    </p>
                  </div>
                </div>

                {/* 5 — Disclaimer */}
                <p className="text-[10px] text-foreground/40 text-center leading-relaxed">
                  {t('disclaimer')}
                  <br />
                  {t('results_prices_note', { gasPrice: gasPrice.toFixed(3), elecPrice: elecPrice.toFixed(3) })}
                </p>
              </div>
            )}
          </div>

          {/* Quote CTA — only after results */}
          {phase === 'results' && (
            <div className="border-t border-border p-5 bg-surface/50 shrink-0">
              <p className="text-xs text-foreground/50 mb-3 text-center">{t('quote_teaser')}</p>
              <Link
                href={`/${locale}/devis?name=${encodeURIComponent(name)}&company=${encodeURIComponent(company)}&email=${encodeURIComponent(email)}`}
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
