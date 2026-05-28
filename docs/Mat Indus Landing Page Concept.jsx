import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Calculator,
  Factory,
  Gauge,
  Leaf,
  ShieldCheck,
  Sparkles,
  ThermometerSun,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ACCENT = "#FF6A00";

export default function MatIndusLandingPageConcept() {
  const [cycles, setCycles] = useState(4);
  const [days, setDays] = useState(250);

  const roi = useMemo(() => {
    const gasPerCycle = 18.3;
    const endoPerCycle = 7.8;
    const annualSavings = (gasPerCycle - endoPerCycle) * cycles * days - 1250;
    const co2Saved = 49 * (cycles * days) / 1000;
    return {
      savings: Math.max(0, annualSavings),
      co2: Math.max(0, co2Saved),
      months: annualSavings > 0 ? Math.round((10000 / annualSavings) * 12) : 0,
    };
  }, [cycles, days]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] font-sans text-white">
      <Navigation />
      <Hero />
      <ProductArchitecture />
      <EndothermicTechnology />
      <EcologicalTransition />
      <AutomationAI />
      <TechnicalValidation cycles={cycles} days={days} setCycles={setCycles} setDays={setDays} roi={roi} />
      <About />
      <FinalCTA />
    </main>
  );
}

function Navigation() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#050505]/85 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center border border-white/80 text-sm font-black">M</div>
          <div className="text-xl font-black uppercase tracking-[-0.05em]">MAT INDUS</div>
        </div>

        <div className="hidden items-center gap-9 font-mono text-xs uppercase tracking-[.12em] text-white/50 md:flex">
          <span>Solutions</span>
          <span>Endothermic</span>
          <span>Automation</span>
          <span>ROI</span>
        </div>

        <Button className="rounded-full bg-white px-6 font-mono text-xs uppercase tracking-[.12em] text-black hover:bg-[#FF6A00] hover:text-white">
          Request Project Study
        </Button>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[860px] overflow-hidden border-b border-white/10">
      <IndustrialBackground />

      <div className="relative mx-auto grid max-w-[1440px] items-center gap-16 px-6 py-28 md:grid-cols-[0.9fr_1.1fr]">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
          <MetaLabel>MAT INDUS / INDUSTRIAL PAINT SYSTEMS</MetaLabel>

          <h1 className="mt-8 max-w-4xl text-[64px] font-semibold uppercase leading-[0.9] tracking-[-0.055em] md:text-[112px]">
            Industrial painting systems engineered for the <span className="text-[#FF6A00]">next generation.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-[1.7] text-[#B3B3B3]">
            Advanced paint cabin technologies combining thermal performance, operational efficiency and ecological transition for automotive and industrial environments.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="h-14 rounded-full bg-white px-8 font-mono text-xs uppercase tracking-[.12em] text-black hover:bg-[#FF6A00] hover:text-white">
              Explore Solutions <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 rounded-full border-white/15 bg-white/[0.03] px-8 font-mono text-xs uppercase tracking-[.12em] text-white hover:border-[#FF6A00]/60 hover:bg-[#FF6A00]/10">
              Request Project Study
            </Button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.12 }}>
          <CabinHeroVisual />
        </motion.div>
      </div>
    </section>
  );
}

function CabinHeroVisual() {
  return (
    <div className="relative min-h-[620px]">
      <div className="absolute inset-0 rounded-full bg-[#FF6A00]/20 blur-[120px]" />
      <div className="absolute right-0 top-8 h-[560px] w-[88%] rounded-[32px] border border-white/10 bg-[#111111] shadow-[0_0_60px_rgba(255,106,0,.12)]">
        <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/10 to-transparent" />

        <div className="absolute bottom-14 left-1/2 w-[82%] -translate-x-1/2 rounded-t-[32px] border border-white/20 bg-[#f2f2f2] p-5 text-black shadow-2xl">
          <div className="mb-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-[.16em] text-black/45">
            <span>Precision airflow cabin</span>
            <span>60°C / Stable</span>
          </div>
          <div className="relative h-[330px] overflow-hidden rounded-[24px] border border-black/10 bg-white">
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/10 to-transparent" />
            <div className="absolute left-10 right-10 top-8 grid grid-cols-3 gap-5">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-56 rounded-xl border border-black/10 bg-[#F8F8F8] shadow-[inset_0_0_30px_rgba(0,0,0,.04)]" />
              ))}
            </div>
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#FF6A00]/25 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 h-8 rounded-full bg-[#111]" />
          </div>
        </div>

        <div className="absolute right-8 top-8 rounded-full border border-[#FF6A00]/30 bg-[#FF6A00]/10 px-4 py-2 font-mono text-xs uppercase tracking-[.12em] text-[#FF8A3D]">
          Thermal efficiency system
        </div>
      </div>
    </div>
  );
}

function ProductArchitecture() {
  const products = [
    ["Endothermic Paint Cabins", "Radiant thermal panels, rapid heat-up and stable temperature.", "22 kWh / cycle", "md:col-span-2 md:row-span-2"],
    ["Gas Paint Cabins", "Proven combustion-based paint cabin systems.", "Classic system", ""],
    ["Truck Paint Booths", "Large-format cabins for utility vehicles and heavy trucks.", "Custom dimensions", ""],
    ["Preparation Stations", "Ventilated preparation environments for sanding and paint prep.", "Airflow controlled", ""],
    ["Paint Mixing Rooms", "Secure extraction, storage and mixing areas.", "Workshop ready", ""],
    ["Robotic Arm Systems", "AI-assisted painting, trajectory generation and process repeatability.", "-40% paint use", "md:col-span-2"],
    ["Retractable Booths", "Flexible industrial booth solutions for constrained spaces.", "Modular", ""],
  ];

  return (
    <section className="relative border-b border-white/10 px-6 py-[140px]">
      <div className="mx-auto max-w-[1440px]">
        <SectionIntro label="SECTION 02 / PRODUCT ARCHITECTURE" title="A modular infrastructure for every painting environment." />

        <div className="mt-16 grid auto-rows-[260px] gap-5 md:grid-cols-4">
          {products.map(([title, text, metric, span], index) => (
            <motion.div key={title} whileHover={{ y: -6 }} transition={{ duration: 0.3 }} className={`${span} group relative overflow-hidden rounded-[24px] border border-[#2A2A2A] bg-[#111111] p-8 shadow-[0_12px_40px_rgba(0,0,0,.45)]`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,106,0,.18),transparent_32%)] opacity-0 transition duration-500 group-hover:opacity-100" />
              <div className="absolute inset-0 opacity-[0.035] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px]" />
              <div className="relative flex h-full flex-col justify-between">
                <div>
                  <div className="font-mono text-xs uppercase tracking-[.12em] text-[#FF8A3D]">0{index + 1}</div>
                  <h3 className="mt-5 max-w-sm text-3xl font-medium leading-[1.05] tracking-[-0.04em]">{title}</h3>
                  <p className="mt-4 max-w-md text-sm leading-7 text-[#B3B3B3]">{text}</p>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-5 font-mono text-xs uppercase tracking-[.12em] text-white/45">
                  <span>{metric}</span>
                  <ArrowRight className="h-4 w-4 text-[#FF6A00] transition group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EndothermicTechnology() {
  const metrics = [
    ["22 kWh", "Average energy consumption per cycle"],
    ["3.2 kg", "CO₂ emissions per cycle"],
    ["≈ 3.4 yrs", "Estimated ROI depending on usage"],
    ["0", "Direct combustion emissions"],
  ];

  return (
    <section className="relative overflow-hidden border-b border-white/10 px-6 py-[140px]">
      <IndustrialBackground soft />
      <div className="relative mx-auto grid max-w-[1440px] gap-16 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <MetaLabel>SECTION 03 / ENDOTHERMIC TECHNOLOGY</MetaLabel>
          <h2 className="mt-8 text-6xl font-semibold uppercase leading-[.95] tracking-[-0.05em] md:text-[86px]">
            Heat the part. <span className="text-[#FF6A00]">Not the room.</span>
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-[1.7] text-[#B3B3B3]">
            Endothermic technology uses electric radiant panels to heat surfaces directly, reducing thermal losses while improving temperature stability and operational control.
          </p>

          <div className="mt-10 grid gap-3">
            {["Up to 50% energy reduction", "Rapid heat-up time", "Stable and homogeneous temperature", "Reduced maintenance", "No combustion"].map((item) => (
              <div key={item} className="flex items-center gap-3 border-b border-white/10 py-3 text-white/75">
                <Zap className="h-4 w-4 text-[#FF6A00]" /> {item}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {metrics.map(([value, label]) => (
            <div key={value} className="rounded-[24px] border border-[#2A2A2A] bg-[#111111] p-8 shadow-[0_0_60px_rgba(255,106,0,.08)]">
              <div className="text-6xl font-semibold tracking-[-0.06em] text-[#FF6A00]">{value}</div>
              <p className="mt-5 font-mono text-xs uppercase leading-6 tracking-[.12em] text-[#B3B3B3]">{label}</p>
            </div>
          ))}

          <div className="relative col-span-full min-h-[280px] overflow-hidden rounded-[24px] border border-[#2A2A2A] bg-[#171717] p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(255,106,0,.28),transparent_38%)]" />
            <div className="relative grid h-full grid-cols-3 gap-5">
              {[1, 2, 3].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04]">
                  <div className="h-full rounded-2xl bg-gradient-to-t from-[#FF6A00]/25 to-transparent" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EcologicalTransition() {
  return (
    <section className="relative overflow-hidden bg-[#F2F2F2] px-6 py-[140px] text-black">
      <div className="mx-auto grid max-w-[1440px] items-center gap-16 md:grid-cols-[1.05fr_.95fr]">
        <div className="grid grid-cols-2 gap-5">
          {["Carbon reduction", "Cleaner workshops", "Energy optimization", "Reduced thermal loss"].map((item) => (
            <div key={item} className="min-h-[210px] rounded-[24px] border border-black/10 bg-white p-7">
              <Leaf className="h-6 w-6 text-[#FF6A00]" />
              <h3 className="mt-10 text-2xl font-medium uppercase leading-[1.05] tracking-[-0.04em]">{item}</h3>
            </div>
          ))}
        </div>

        <div>
          <MetaLabel dark>SECTION 04 / ECOLOGICAL TRANSITION</MetaLabel>
          <h2 className="mt-8 text-6xl font-semibold uppercase leading-[.95] tracking-[-0.05em] md:text-[82px]">
            Cleaner technologies for the next generation of production.
          </h2>
          <p className="mt-8 text-lg leading-[1.7] text-black/60">
            MAT INDUS supports automotive and industrial workshops with painting systems designed to reduce operational impact without compromising performance.
          </p>
        </div>
      </div>
    </section>
  );
}

function AutomationAI() {
  return (
    <section className="relative border-y border-white/10 px-6 py-[140px]">
      <div className="mx-auto grid max-w-[1440px] gap-16 md:grid-cols-[.85fr_1.15fr]">
        <div>
          <MetaLabel>SECTION 05 / AUTOMATION & AI</MetaLabel>
          <h2 className="mt-8 text-6xl font-semibold uppercase leading-[.95] tracking-[-0.05em] md:text-[82px]">
            Intelligent workflows for industrial painting precision.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {[
            [Bot, "3D scanning", "Recognition of surfaces and painting zones."],
            [Gauge, "Trajectory mapping", "Optimized movement paths for repeatability."],
            [ShieldCheck, "Operator safety", "Reduced exposure and more controlled processes."],
            [Factory, "Standardized output", "Consistent quality across production cycles."],
          ].map(([Icon, title, text]) => (
            <Card key={title} className="rounded-[24px] border-[#2A2A2A] bg-[#111111] text-white">
              <CardContent className="p-8">
                <Icon className="h-7 w-7 text-[#FF6A00]" />
                <h3 className="mt-10 text-3xl font-medium uppercase tracking-[-0.04em]">{title}</h3>
                <p className="mt-4 leading-7 text-[#B3B3B3]">{text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechnicalValidation({ cycles, days, setCycles, setDays, roi }) {
  return (
    <section className="bg-[#F2F2F2] px-6 py-[140px] text-black">
      <div className="mx-auto grid max-w-[1440px] gap-12 md:grid-cols-[.85fr_1.15fr]">
        <div>
          <MetaLabel dark>SECTION 06 / TECHNICAL VALIDATION</MetaLabel>
          <h2 className="mt-8 text-6xl font-semibold uppercase leading-[.95] tracking-[-0.05em] md:text-[82px]">
            Economic proof, not marketing claims.
          </h2>
          <p className="mt-8 text-lg leading-[1.7] text-black/60">
            Convert workshop usage into energy cost, operating savings, CO₂ reduction and return on investment.
          </p>
        </div>

        <Card className="rounded-[24px] border-black/10 bg-white shadow-[0_12px_40px_rgba(0,0,0,.12)]">
          <CardContent className="p-8">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <Label value={`Cycles / day — ${cycles}`} />
                <input type="range" min="1" max="8" value={cycles} onChange={(e) => setCycles(Number(e.target.value))} className="mt-5 w-full accent-[#FF6A00]" />
                <Label value={`Days / year — ${days}`} className="mt-10" />
                <input type="range" min="100" max="300" value={days} onChange={(e) => setDays(Number(e.target.value))} className="mt-5 w-full accent-[#FF6A00]" />
              </div>

              <div className="rounded-[24px] bg-[#050505] p-7 text-white">
                <Calculator className="h-7 w-7 text-[#FF6A00]" />
                <div className="mt-8 font-mono text-xs uppercase tracking-[.12em] text-white/45">Estimated annual savings</div>
                <div className="mt-2 text-6xl font-semibold tracking-[-0.06em] text-[#FF6A00]">{Math.round(roi.savings).toLocaleString("fr-FR")}€</div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Metric value={`${roi.months}`} label="months ROI" />
                  <Metric value={`${roi.co2.toFixed(1)}t`} label="CO₂ avoided" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="border-y border-white/10 px-6 py-[140px]">
      <div className="mx-auto grid max-w-[1440px] gap-16 md:grid-cols-[1fr_1fr]">
        <SectionIntro label="SECTION 07 / ABOUT MAT INDUS" title="Specialized expertise for modern industrial painting." />
        <div className="space-y-8 text-lg leading-[1.7] text-[#B3B3B3]">
          <p>
            MAT INDUS supports automotive and industrial professionals with high-performance painting systems engineered for operational efficiency, durability and long-term sustainability.
          </p>
          <p>
            With strong technical expertise and a commitment to innovation, MAT INDUS delivers complete painting solutions adapted to the evolving standards of modern industry.
          </p>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative overflow-hidden px-6 py-[140px]">
      <IndustrialBackground />
      <div className="relative mx-auto max-w-5xl text-center">
        <MetaLabel>PROJECT ENGAGEMENT</MetaLabel>
        <h2 className="mt-8 text-6xl font-semibold uppercase leading-[.92] tracking-[-0.055em] md:text-[96px]">
          Build the future of your painting infrastructure.
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-[1.7] text-[#B3B3B3]">
          Start with a project study: dimensions, process, energy, constraints, budget and ROI.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Button size="lg" className="h-14 rounded-full bg-white px-8 font-mono text-xs uppercase tracking-[.12em] text-black hover:bg-[#FF6A00] hover:text-white">
            Request Project Study
          </Button>
          <Button size="lg" variant="outline" className="h-14 rounded-full border-white/15 bg-white/[0.03] px-8 font-mono text-xs uppercase tracking-[.12em] text-white hover:border-[#FF6A00]/60 hover:bg-[#FF6A00]/10">
            Explore Solutions
          </Button>
        </div>
      </div>
    </section>
  );
}

function IndustrialBackground({ soft = false }) {
  return (
    <>
      <div className="absolute inset-0 opacity-[0.055] [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className={`absolute inset-0 ${soft ? "bg-[radial-gradient(circle_at_25%_50%,rgba(255,106,0,.14),transparent_28%)]" : "bg-[radial-gradient(circle_at_70%_25%,rgba(255,106,0,.20),transparent_28%),radial-gradient(circle_at_20%_80%,rgba(255,255,255,.08),transparent_30%)]"}`} />
    </>
  );
}

function MetaLabel({ children, dark = false }) {
  return <div className={`font-mono text-xs font-semibold uppercase tracking-[.12em] ${dark ? "text-black/50" : "text-[#FF8A3D]"}`}>{children}</div>;
}

function SectionIntro({ label, title }) {
  return (
    <div>
      <MetaLabel>{label}</MetaLabel>
      <h2 className="mt-8 max-w-4xl text-6xl font-semibold uppercase leading-[.95] tracking-[-0.05em] md:text-[82px]">{title}</h2>
    </div>
  );
}

function Metric({ value, label }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
      <div className="text-2xl font-semibold text-white">{value}</div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-[.12em] text-white/40">{label}</div>
    </div>
  );
}

function Label({ value, className = "" }) {
  return <div className={`font-mono text-xs font-semibold uppercase tracking-[.12em] text-black/55 ${className}`}>{value}</div>;
}
