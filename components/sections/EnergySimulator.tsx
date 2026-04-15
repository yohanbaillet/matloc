'use client'

import { useState, useMemo } from 'react'
import { TrendingDown, Clock, Leaf, Trees, Flame, Zap } from 'lucide-react'

// Technical constants from MatLoc Indus documentation
const GAS_KWH_PER_CYCLE = 220.8       // kWh of gas per cycle
const GAS_ELEC_KWH_PER_CYCLE = 30.4   // kWh electricity (fans) per cycle
const ENDO_ELEC_KWH_PER_CYCLE = 21.9  // kWh electricity per cycle (panels + fans)
const GAS_CO2_FACTOR = 0.227           // kgCO₂e/kWh — natural gas
const ELEC_CO2_FACTOR = 0.147          // kgCO₂e/kWh — French electricity grid
const GAS_SUBSCRIPTION = 1000          // €/year — gas network
const ELEC_SUBSCRIPTION_GAS = 400      // €/year — 36 kVA tarif bleu
const ELEC_SUBSCRIPTION_ENDO = 2650    // €/year — 63 kVA tarif jaune

function InputRow({
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
      <div className="flex justify-between text-sm mb-2">
        <span className="text-foreground/60">{label}</span>
        <span className="font-semibold text-midnight tabular-nums">
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
        className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[var(--amber)]"
      />
      <div className="flex justify-between text-xs text-foreground/30 mt-1">
        <span>{decimals > 0 ? min.toFixed(decimals) : min.toLocaleString('fr-FR')} {unit}</span>
        <span>{decimals > 0 ? max.toFixed(decimals) : max.toLocaleString('fr-FR')} {unit}</span>
      </div>
    </div>
  )
}

function CostBar({
  label,
  value,
  max,
  color,
  icon,
}: {
  label: string
  value: number
  max: number
  color: string
  icon: React.ReactNode
}) {
  const pct = Math.max(4, (value / max) * 100)
  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-2">
        <div className="flex items-center gap-2">
          <span className="text-foreground/50 w-4 h-4">{icon}</span>
          <span className="text-foreground/70">{label}</span>
        </div>
        <span className="font-bold text-midnight tabular-nums">
          {value.toLocaleString('fr-FR')} €/an
        </span>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

function MetricCard({
  icon,
  label,
  value,
  sub,
  highlight = false,
}: {
  icon: React.ReactNode
  label: string
  value: string
  sub?: string
  highlight?: boolean
}) {
  return (
    <div
      className={`rounded-xl p-4 flex flex-col gap-1 ${
        highlight ? 'bg-midnight text-white' : 'bg-white shadow-sm border border-gray-100'
      }`}
    >
      <div className={`w-5 h-5 ${highlight ? 'text-[var(--amber)]' : 'text-foreground/30'}`}>
        {icon}
      </div>
      <p className={`text-xs mt-1 ${highlight ? 'text-white/50' : 'text-foreground/50'}`}>
        {label}
      </p>
      <p className={`text-xl font-bold tabular-nums ${highlight ? 'text-white' : 'text-midnight'}`}>
        {value}
      </p>
      {sub && (
        <p className={`text-xs ${highlight ? 'text-white/40' : 'text-foreground/40'}`}>{sub}</p>
      )}
    </div>
  )
}

export default function EnergySimulator() {
  const [cyclesPerDay, setCyclesPerDay] = useState(4)
  const [daysPerYear, setDaysPerYear] = useState(250)
  const [gasPrice, setGasPrice] = useState(0.06)
  const [elecPrice, setElecPrice] = useState(0.15)
  const [priceDiff, setPriceDiff] = useState(10000)

  const r = useMemo(() => {
    const totalCycles = cyclesPerDay * daysPerYear

    // Annual energy costs
    const gasEnergyCost =
      (GAS_KWH_PER_CYCLE * gasPrice + GAS_ELEC_KWH_PER_CYCLE * elecPrice) * totalCycles
    const endoEnergyCost = ENDO_ELEC_KWH_PER_CYCLE * elecPrice * totalCycles

    // Annual total costs including subscriptions
    const gasTotal = gasEnergyCost + GAS_SUBSCRIPTION + ELEC_SUBSCRIPTION_GAS
    const endoTotal = endoEnergyCost + ELEC_SUBSCRIPTION_ENDO

    const annualSavings = gasTotal - endoTotal
    const roiYears = annualSavings > 0 ? priceDiff / annualSavings : Infinity
    const roiMonths = Math.round(roiYears * 12)

    // CO₂ (French grid factors)
    const gasCO2 =
      (GAS_KWH_PER_CYCLE * GAS_CO2_FACTOR + GAS_ELEC_KWH_PER_CYCLE * ELEC_CO2_FACTOR) *
      totalCycles /
      1000
    const endoCO2 = (ENDO_ELEC_KWH_PER_CYCLE * ELEC_CO2_FACTOR * totalCycles) / 1000
    const co2Avoided = gasCO2 - endoCO2
    // 49 tonnes ≈ 4 800 trees/year → 1 tree ≈ 10.2 kg CO₂/year
    const trees = Math.round((co2Avoided * 1000) / 10.2)

    return {
      gasTotal: Math.round(gasTotal),
      endoTotal: Math.round(endoTotal),
      annualSavings: Math.round(annualSavings),
      roiYears,
      roiMonths,
      gasCO2: Math.round(gasCO2 * 10) / 10,
      endoCO2: Math.round(endoCO2 * 10) / 10,
      co2Avoided: Math.round(co2Avoided * 10) / 10,
      trees,
    }
  }, [cyclesPerDay, daysPerYear, gasPrice, elecPrice, priceDiff])

  const roiLabel =
    r.roiYears === Infinity
      ? '—'
      : r.roiMonths < 24
      ? `${r.roiMonths} mois`
      : `${(r.roiYears).toFixed(1).replace('.', ',')} ans`

  return (
    <section className="section-padding bg-surface">
      <div className="container-site">
        <div className="text-center mb-12">
          <p className="text-[var(--amber)] font-medium text-sm uppercase tracking-widest mb-3">
            Simulateur
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-midnight">
            Gaz ou endothermique — calculez votre économie
          </h2>
          <p className="mt-4 text-foreground/60 max-w-2xl mx-auto">
            Ajustez les paramètres selon votre atelier. Les calculs sont issus des données techniques
            réelles de nos cabines.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Inputs */}
          <div className="bg-white rounded-2xl p-8 shadow-sm space-y-7">
            <h3 className="font-semibold text-midnight">Vos paramètres</h3>

            <InputRow
              label="Cycles par jour"
              value={cyclesPerDay}
              onChange={setCyclesPerDay}
              min={1}
              max={12}
              step={1}
              unit="cycles"
            />
            <InputRow
              label="Jours travaillés par an"
              value={daysPerYear}
              onChange={setDaysPerYear}
              min={100}
              max={365}
              step={5}
              unit="jours"
            />
            <InputRow
              label="Prix du gaz naturel"
              value={gasPrice}
              onChange={setGasPrice}
              min={0.03}
              max={0.20}
              step={0.005}
              unit="€/kWh"
              decimals={3}
            />
            <InputRow
              label="Prix de l'électricité"
              value={elecPrice}
              onChange={setElecPrice}
              min={0.05}
              max={0.40}
              step={0.005}
              unit="€/kWh"
              decimals={3}
            />
            <InputRow
              label="Surcoût cabine endothermique"
              value={priceDiff}
              onChange={setPriceDiff}
              min={0}
              max={50000}
              step={1000}
              unit="€"
            />
          </div>

          {/* Results */}
          <div className="space-y-4">
            {/* Cost bars */}
            <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="font-semibold text-midnight">Coût annuel de fonctionnement</h3>
              <CostBar
                label="Cabine gaz"
                value={r.gasTotal}
                max={Math.max(r.gasTotal, r.endoTotal)}
                color="bg-red-400"
                icon={<Flame size={14} />}
              />
              <CostBar
                label="Cabine endothermique"
                value={r.endoTotal}
                max={Math.max(r.gasTotal, r.endoTotal)}
                color="bg-[var(--amber)]"
                icon={<Zap size={14} />}
              />
              <p className="text-xs text-foreground/40 pt-1">
                Inclut abonnements réseau (gaz 300 mbar + électricité)
              </p>
            </div>

            {/* Metric cards */}
            <div className="grid grid-cols-2 gap-4">
              <MetricCard
                icon={<TrendingDown size={20} />}
                label="Économie annuelle"
                value={`${r.annualSavings.toLocaleString('fr-FR')} €`}
                highlight
              />
              <MetricCard
                icon={<Clock size={20} />}
                label="Retour sur investissement"
                value={roiLabel}
                highlight={r.roiYears < 5}
              />
              <MetricCard
                icon={<Leaf size={20} />}
                label="CO₂ évité par an"
                value={`${r.co2Avoided} t`}
                sub={`gaz: ${r.gasCO2} t · endo: ${r.endoCO2} t`}
              />
              <MetricCard
                icon={<Trees size={20} />}
                label="Équivalent arbres plantés"
                value={r.trees.toLocaleString('fr-FR')}
                sub="par an"
              />
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-foreground/30 mt-10">
          Basé sur : gaz 220,8 kWh/cycle + élec 30,4 kWh/cycle · endothermique 21,9 kWh/cycle ·
          CO₂ gaz 0,227 · CO₂ élec 0,147 kgCO₂e/kWh (réseau électrique français).
          Abonnements : gaz 1 000 €/an · élec gaz 400 €/an · élec endo 2 650 €/an.
        </p>
      </div>
    </section>
  )
}
