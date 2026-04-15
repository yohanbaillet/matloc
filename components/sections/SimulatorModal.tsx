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
const GAS_SUBSCRIPTION = 1000
const ELEC_SUBSCRIPTION_GAS = 400
const ELEC_SUBSCRIPTION_ENDO = 2650

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
      <div className="flex justify-between mb-1.5">
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
  const [activeTab, setActiveTab] = useState<'gas' | 'endo'>('gas')
  const [viewYears, setViewYears] = useState(5)

  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const defaultPrices = LOCALE_PRICES[locale] ?? LOCALE_PRICES.fr
  const [cyclesPerDay, setCyclesPerDay] = useState(4)
  const [daysPerYear, setDaysPerYear] = useState(250)
  const [gasPrice, setGasPrice] = useState(defaultPrices.gasPrice)
  const [elecPrice, setElecPrice] = useState(defaultPrices.elecPrice)
  const [gasCabinPrice, setGasCabinPrice] = useState(50000)
  const [priceDiff, setPriceDiff] = useState(10000)

  const endoCabinPrice = gasCabinPrice + priceDiff

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
      co2Avoided: Math.round((gasCO2 - endoCO2) * 10) / 10,
      trees: Math.round(((gasCO2 - endoCO2) * 1000) / 10.2),
    }
  }, [cyclesPerDay, daysPerYear, gasPrice, elecPrice, priceDiff])

  const roiLabel = r.roiYears === Infinity ? '—'
    : r.roiMonths < 24 ? t('roi_months', { months: r.roiMonths })
    : t('roi_years', { years: r.roiYears.toFixed(1).replace('.', ',') })

  // Benefits over time
  const netBenefit = r.annualSavings * viewYears - priceDiff
  const isProfit = netBenefit >= 0
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
    if (!next) setTimeout(() => {
      setPhase('sliders')
      setShowPriceSliders(false)
      setActiveTab('gas')
      setViewYears(5)
    }, 300)
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

          <div className="flex-1 overflow-y-auto">

            {/* ── Phase 1: Sliders ── */}
            {phase === 'sliders' && (
              <div className="p-6 space-y-6">
                <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wider">{t('params_label')}</p>
                <div className="space-y-5">
                  <SliderRow label={t('cycles_label')} value={cyclesPerDay} onChange={setCyclesPerDay} min={1} max={12} step={1} unit={t('unit_cycles')} />
                  <SliderRow label={t('days_label')} value={daysPerYear} onChange={setDaysPerYear} min={100} max={365} step={5} unit={t('unit_days')} />
                  <SliderRow label={t('gas_cabin_price_label')} value={gasCabinPrice} onChange={setGasCabinPrice} min={20000} max={120000} step={1000} unit="€" />
                  <SliderRow label={t('price_diff_label')} value={priceDiff} onChange={setPriceDiff} min={0} max={40000} step={500} unit="€" />
                </div>

                {/* Advanced energy prices */}
                <div className="border border-border rounded-lg overflow-hidden">
                  <button type="button" onClick={() => setShowPriceSliders(!showPriceSliders)}
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

            {/* ── Phase 2: Lead form ── */}
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

            {/* ── Phase 3: Results ── */}
            {phase === 'results' && (
              <div className="p-6 space-y-5">

                {/* Tab toggle */}
                <div className="flex rounded-xl border border-border overflow-hidden">
                  <button
                    onClick={() => setActiveTab('gas')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold transition ${
                      activeTab === 'gas'
                        ? 'bg-midnight text-white'
                        : 'bg-gray-50 text-foreground/50 hover:text-foreground/80'
                    }`}>
                    <Flame size={14} /> {t('gas_label')}
                  </button>
                  <button
                    onClick={() => setActiveTab('endo')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold transition ${
                      activeTab === 'endo'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-50 text-foreground/50 hover:text-foreground/80'
                    }`}>
                    <Zap size={14} /> {t('endo_label')}
                  </button>
                </div>

                {/* ── Gas tab ── */}
                {activeTab === 'gas' && (
                  <div className="space-y-3">
                    {/* Cabin price */}
                    <div className="rounded-xl border border-border px-5 py-4 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Flame size={15} className="text-foreground/40" />
                        <p className="text-sm font-semibold text-midnight">{t('gas_cabin_label')}</p>
                      </div>
                      <p className="text-2xl font-black tabular-nums text-midnight">
                        {gasCabinPrice.toLocaleString('fr-FR')} €
                      </p>
                    </div>
                    {/* Annual costs */}
                    <div className="rounded-xl border border-border overflow-hidden">
                      <div className="px-4 py-3 border-b border-border flex justify-between items-center">
                        <span className="text-sm text-foreground/60">{t('results_energy')}</span>
                        <span className="font-bold tabular-nums text-midnight">{r.gasEnergyCost.toLocaleString('fr-FR')} €<span className="font-normal text-foreground/40 text-xs">{t('per_year')}</span></span>
                      </div>
                      <div className="px-4 py-3 border-b border-border flex justify-between items-center bg-gray-50/50">
                        <span className="text-sm text-foreground/60">{t('results_subscription')}</span>
                        <span className="font-bold tabular-nums text-midnight">{r.gasSubscription.toLocaleString('fr-FR')} €<span className="font-normal text-foreground/40 text-xs">{t('per_year')}</span></span>
                      </div>
                      <div className="px-4 py-4 flex justify-between items-center">
                        <span className="text-sm font-bold text-midnight">{t('results_total')}</span>
                        <span className="text-2xl font-black tabular-nums text-midnight">{r.gasTotal.toLocaleString('fr-FR')} €<span className="font-normal text-foreground/40 text-sm">{t('per_year')}</span></span>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Endo tab ── */}
                {activeTab === 'endo' && (
                  <div className="space-y-3">
                    {/* Cabin price */}
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Zap size={15} className="text-emerald-600" />
                        <p className="text-sm font-semibold text-midnight">{t('endo_cabin_label')}</p>
                      </div>
                      <p className="text-2xl font-black tabular-nums text-emerald-700">
                        {endoCabinPrice.toLocaleString('fr-FR')} €
                      </p>
                    </div>
                    {/* Annual costs */}
                    <div className="rounded-xl border border-border overflow-hidden">
                      <div className="px-4 py-3 border-b border-border flex justify-between items-center">
                        <span className="text-sm text-foreground/60">{t('results_energy')}</span>
                        <span className="font-bold tabular-nums text-emerald-600">{r.endoEnergyCost.toLocaleString('fr-FR')} €<span className="font-normal text-foreground/40 text-xs">{t('per_year')}</span></span>
                      </div>
                      <div className="px-4 py-3 border-b border-border flex justify-between items-center bg-gray-50/50">
                        <span className="text-sm text-foreground/60">{t('results_subscription')}</span>
                        <span className="font-bold tabular-nums text-emerald-600">{r.endoSubscription.toLocaleString('fr-FR')} €<span className="font-normal text-foreground/40 text-xs">{t('per_year')}</span></span>
                      </div>
                      <div className="px-4 py-4 flex justify-between items-center">
                        <span className="text-sm font-bold text-midnight">{t('results_total')}</span>
                        <span className="text-2xl font-black tabular-nums text-emerald-600">{r.endoTotal.toLocaleString('fr-FR')} €<span className="font-normal text-foreground/40 text-sm">{t('per_year')}</span></span>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Common section: benefits over time ── */}
                <div className="rounded-xl border border-border p-5 space-y-4 bg-gray-50/40">
                  <p className="text-xs font-semibold text-foreground/40 uppercase tracking-widest">
                    {t('endo_benefits_title')}
                  </p>

                  {/* Years slider */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-foreground/60">{t('roi_over_time')}</span>
                      <span className="text-base font-black text-midnight tabular-nums">
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

                  {/* Net benefit */}
                  <div className={`rounded-xl px-5 py-4 flex items-center justify-between transition-colors ${
                    isProfit
                      ? 'bg-emerald-50 border border-emerald-200'
                      : 'bg-amber-50 border border-amber-200'
                  }`}>
                    <div>
                      <p className={`text-xs font-semibold mb-0.5 ${isProfit ? 'text-emerald-700' : 'text-amber-700'}`}>
                        {t('net_benefit_label')} — {viewYears} {t('years_unit')}
                      </p>
                      <p className="text-[11px] text-foreground/40">{t('results_paid_back')} : {roiLabel}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {isProfit
                        ? <TrendingDown size={16} className="text-emerald-600" />
                        : <TrendingUp size={16} className="text-amber-600" />
                      }
                      <p className={`text-2xl font-black tabular-nums ${isProfit ? 'text-emerald-700' : 'text-amber-700'}`}>
                        {isProfit ? '+' : ''}{netBenefit.toLocaleString('fr-FR')} €
                      </p>
                    </div>
                  </div>

                  {/* CO2 + Trees */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-white border border-border p-3.5">
                      <Leaf size={13} className="text-foreground/30 mb-1" />
                      <p className="text-[11px] text-foreground/50">{t('co2_label')}</p>
                      <p className="text-lg font-black tabular-nums text-midnight">{r.co2Avoided} t{t('per_year')}</p>
                    </div>
                    <div className="rounded-xl bg-white border border-border p-3.5">
                      <Trees size={13} className="text-foreground/30 mb-1" />
                      <p className="text-[11px] text-foreground/50">{t('trees_label')}</p>
                      <p className="text-lg font-black tabular-nums text-midnight">{r.trees.toLocaleString('fr-FR')}</p>
                    </div>
                  </div>

                  {/* Disclaimer */}
                  <p className="text-[10px] text-foreground/35 text-center leading-relaxed">
                    {t('disclaimer')}<br />
                    {t('results_prices_note', { gasPrice: gasPrice.toFixed(3), elecPrice: elecPrice.toFixed(3) })}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Quote CTA */}
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
