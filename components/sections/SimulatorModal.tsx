'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { Calculator, ArrowRight, TrendingDown, Clock, Leaf, Trees, Flame, Zap, X } from 'lucide-react'
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
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit,
  decimals = 0,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step: number
  unit: string
  decimals?: number
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
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[var(--amber)]"
      />
    </div>
  )
}

// ── Lead capture step ────────────────────────────────────────────────────────

function LeadForm({ onSubmit }: { onSubmit: (name: string) => void }) {
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = 'Requis'
    if (!company.trim()) e.company = 'Requis'
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Email invalide'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    // Fire-and-forget lead capture — backend can be wired later
    fetch('/api/simulator-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, company, email }),
    }).catch(() => {})
    onSubmit(name.split(' ')[0] || name)
  }

  const inputClass = (field: string) =>
    `w-full rounded-lg border px-3 py-2.5 text-sm text-midnight placeholder:text-foreground/30 outline-none transition focus:ring-2 focus:ring-[var(--amber)]/40 focus:border-[var(--amber)] ${
      errors[field] ? 'border-red-400' : 'border-border'
    }`

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--amber)] mb-2">
          Simulateur énergétique
        </p>
        <DialogTitle className="text-2xl font-black text-midnight leading-tight">
          Calculez vos économies<br />gaz vs endothermique
        </DialogTitle>
        <p className="mt-3 text-sm text-foreground/60">
          Recevez votre analyse personnalisée basée sur les données techniques réelles de nos cabines.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-foreground/70 mb-1.5">Prénom et Nom *</label>
          <input
            type="text"
            placeholder="Jean Dupont"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass('name')}
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-foreground/70 mb-1.5">Société *</label>
          <input
            type="text"
            placeholder="Carrosserie Martin"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={inputClass('company')}
          />
          {errors.company && <p className="text-xs text-red-500 mt-1">{errors.company}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-foreground/70 mb-1.5">Email professionnel *</label>
          <input
            type="email"
            placeholder="jean@carrosserie-martin.fr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass('email')}
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-[var(--amber)] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-105 hover:-translate-y-0.5 mt-2"
        >
          Calculer mes économies
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      <p className="mt-4 text-center text-xs text-foreground/35">
        Vos données sont utilisées uniquement pour cette simulation. Aucun démarchage, aucune revente.
      </p>
    </div>
  )
}

// ── Simulator + results step ─────────────────────────────────────────────────

function SimulatorResults({ firstName, locale }: { firstName: string; locale: string }) {
  const [cyclesPerDay, setCyclesPerDay] = useState(4)
  const [daysPerYear, setDaysPerYear] = useState(250)
  const [gasPrice, setGasPrice] = useState(0.06)
  const [elecPrice, setElecPrice] = useState(0.15)
  const [priceDiff, setPriceDiff] = useState(10000)

  const r = useMemo(() => {
    const totalCycles = cyclesPerDay * daysPerYear
    const gasEnergyCost =
      (GAS_KWH_PER_CYCLE * gasPrice + GAS_ELEC_KWH_PER_CYCLE * elecPrice) * totalCycles
    const endoEnergyCost = ENDO_ELEC_KWH_PER_CYCLE * elecPrice * totalCycles
    const gasTotal = gasEnergyCost + GAS_SUBSCRIPTION + ELEC_SUBSCRIPTION_GAS
    const endoTotal = endoEnergyCost + ELEC_SUBSCRIPTION_ENDO
    const annualSavings = gasTotal - endoTotal
    const roiYears = annualSavings > 0 ? priceDiff / annualSavings : Infinity
    const roiMonths = Math.round(roiYears * 12)
    const gasCO2 =
      (GAS_KWH_PER_CYCLE * GAS_CO2_FACTOR + GAS_ELEC_KWH_PER_CYCLE * ELEC_CO2_FACTOR) *
      totalCycles / 1000
    const endoCO2 = (ENDO_ELEC_KWH_PER_CYCLE * ELEC_CO2_FACTOR * totalCycles) / 1000
    const co2Avoided = gasCO2 - endoCO2
    const trees = Math.round((co2Avoided * 1000) / 10.2)

    return {
      gasTotal: Math.round(gasTotal),
      endoTotal: Math.round(endoTotal),
      annualSavings: Math.round(annualSavings),
      roiYears,
      roiMonths,
      co2Avoided: Math.round(co2Avoided * 10) / 10,
      trees,
    }
  }, [cyclesPerDay, daysPerYear, gasPrice, elecPrice, priceDiff])

  const roiLabel =
    r.roiYears === Infinity
      ? '—'
      : r.roiMonths < 24
      ? `${r.roiMonths} mois`
      : `${r.roiYears.toFixed(1).replace('.', ',')} ans`

  const barMax = Math.max(r.gasTotal, r.endoTotal)

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-border">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--amber)] mb-1">
          Votre simulation
        </p>
        <DialogTitle className="text-lg font-black text-midnight">
          {firstName ? `Bonjour ${firstName} — voici votre analyse` : 'Votre analyse énergétique'}
        </DialogTitle>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-border">
          {/* Left: Sliders */}
          <div className="p-5 space-y-5">
            <p className="text-xs font-semibold text-foreground/50 uppercase tracking-wider">Paramètres</p>
            <SliderRow label="Cycles / jour" value={cyclesPerDay} onChange={setCyclesPerDay} min={1} max={12} step={1} unit="cycles" />
            <SliderRow label="Jours travaillés / an" value={daysPerYear} onChange={setDaysPerYear} min={100} max={365} step={5} unit="jours" />
            <SliderRow label="Prix du gaz naturel" value={gasPrice} onChange={setGasPrice} min={0.03} max={0.20} step={0.005} unit="€/kWh" decimals={3} />
            <SliderRow label="Prix de l'électricité" value={elecPrice} onChange={setElecPrice} min={0.05} max={0.40} step={0.005} unit="€/kWh" decimals={3} />
            <SliderRow label="Surcoût endothermique" value={priceDiff} onChange={setPriceDiff} min={0} max={50000} step={1000} unit="€" />
          </div>

          {/* Right: Results */}
          <div className="p-5 space-y-4">
            <p className="text-xs font-semibold text-foreground/50 uppercase tracking-wider">Résultats</p>

            {/* Cost bars */}
            <div className="space-y-2.5">
              {[
                { label: 'Gaz', value: r.gasTotal, icon: <Flame size={12} />, color: 'bg-red-400' },
                { label: 'Endothermique', value: r.endoTotal, icon: <Zap size={12} />, color: 'bg-[var(--amber)]' },
              ].map((b) => (
                <div key={b.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="flex items-center gap-1 text-foreground/60">{b.icon}{b.label}</span>
                    <span className="font-bold text-midnight tabular-nums">{b.value.toLocaleString('fr-FR')} €/an</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${b.color} rounded-full transition-all duration-500`}
                      style={{ width: `${Math.max(4, (b.value / barMax) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Key metrics */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {[
                { icon: <TrendingDown size={14} />, label: 'Économie / an', value: `${r.annualSavings.toLocaleString('fr-FR')} €`, highlight: true },
                { icon: <Clock size={14} />, label: 'ROI', value: roiLabel, highlight: r.roiYears < 5 },
                { icon: <Leaf size={14} />, label: 'CO₂ évité', value: `${r.co2Avoided} t/an`, highlight: false },
                { icon: <Trees size={14} />, label: 'Équiv. arbres', value: r.trees.toLocaleString('fr-FR'), highlight: false },
              ].map((m) => (
                <div
                  key={m.label}
                  className={`rounded-lg p-3 ${m.highlight ? 'bg-midnight text-white' : 'bg-gray-50'}`}
                >
                  <div className={`mb-1 ${m.highlight ? 'text-[var(--amber)]' : 'text-foreground/40'}`}>{m.icon}</div>
                  <p className={`text-[10px] ${m.highlight ? 'text-white/50' : 'text-foreground/50'}`}>{m.label}</p>
                  <p className={`text-base font-black tabular-nums ${m.highlight ? 'text-white' : 'text-midnight'}`}>{m.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quote CTA */}
      <div className="border-t border-border p-5 bg-surface/50">
        <p className="text-xs text-foreground/50 mb-3 text-center">
          Prêt à passer à la cabine endothermique ? Demandez un devis personnalisé.
        </p>
        <Link
          href={`/${locale}/devis`}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--amber)] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-105 hover:-translate-y-0.5"
        >
          Demander un devis gratuit
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

// ── Main export ──────────────────────────────────────────────────────────────

export default function SimulatorModal() {
  const locale = useLocale()
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<'form' | 'results'>('form')
  const [firstName, setFirstName] = useState('')

  const handleFormSubmit = (name: string) => {
    setFirstName(name)
    setStep('results')
  }

  const handleOpenChange = (next: boolean) => {
    setOpen(next)
    if (!next) {
      // Reset on close
      setTimeout(() => setStep('form'), 300)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg bg-[var(--amber)] px-8 py-3 text-base font-semibold text-white shadow-amber transition-all hover:brightness-105 hover:-translate-y-0.5"
      >
        <Calculator className="h-4 w-4" />
        Calculer mes économies
      </button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          showCloseButton={false}
          className="sm:max-w-2xl p-0 gap-0 overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-foreground/50 transition hover:bg-black/10 hover:text-foreground"
            aria-label="Fermer"
          >
            <X className="h-4 w-4" />
          </button>

          {step === 'form' ? (
            <LeadForm onSubmit={handleFormSubmit} />
          ) : (
            <SimulatorResults firstName={firstName} locale={locale} />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
