import { executiveKPIs } from "@/lib/dashboard-data";
import { Activity, ArrowUpRight, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";

export default function ExecutiveHero() {
  const heroKPIs = executiveKPIs.filter((kpi) =>
    ["executive-health", "maturity-score", "sla-compliance", "transformation-progress"].includes(kpi.id)
  );

  return (
    <section className="min-h-[calc(100vh-7rem)] rounded-2xl border border-[#E5E0DB]/20 bg-[#1C1208] text-white overflow-hidden relative p-8 md:p-12 flex flex-col justify-between shadow-2xl shadow-[#1C1208]/20">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(241,90,34,0.24),transparent_34%,rgba(255,255,255,0.04)_72%,transparent)]" />
      <div className="absolute right-8 top-8 h-48 w-48 rounded-full border border-white/10" />
      <div className="absolute right-20 top-20 h-24 w-24 rounded-full border border-accent/30" />

      <div className="relative z-10 flex items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="relative h-11 w-11 rounded-xl bg-white/10 border border-white/10 overflow-hidden">
            <Image src="/logo-hit.png" alt="HIT" fill className="object-contain p-2" priority />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.28em] text-accent">
              Leadership Presentation Mode
            </span>
            <p className="text-xs text-white/60 font-semibold mt-1">HIT Operations Platform</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          Friday Executive Readout
        </div>
      </div>

      <div className="relative z-10 max-w-5xl py-16 md:py-20">
        <div className="inline-flex items-center gap-2 rounded-full bg-accent/15 border border-accent/25 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-accent mb-8">
          <ShieldCheck className="h-4 w-4" />
          Operational governance transformation
        </div>
        <h1 className="text-5xl md:text-7xl xl:text-8xl font-black tracking-tight leading-[0.94] text-white max-w-5xl">
          From fragmented execution to executive operational control.
        </h1>
        <p className="mt-8 max-w-3xl text-base md:text-lg leading-relaxed text-white/72 font-medium">
          A cinematic leadership view of why the current implementation model creates risk, where the bottlenecks live, and how HIT evolves toward scalable governance, stronger customer success and real-time operational intelligence.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {heroKPIs.map((kpi) => (
          <div key={kpi.id} className="rounded-xl border border-white/10 bg-white/[0.07] p-5 min-h-32">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/55">{kpi.title}</span>
              <Activity className="h-4 w-4 text-accent" />
            </div>
            <div className="mt-5 flex items-end gap-1">
              <span className="text-4xl font-black text-white tracking-tight">{kpi.value}</span>
              {kpi.unit && <span className="pb-1 text-sm font-black text-white/50">{kpi.unit}</span>}
            </div>
            <div className="mt-4 flex items-center gap-1 text-[10px] font-black uppercase text-emerald-400">
              <ArrowUpRight className="h-3.5 w-3.5" />
              {kpi.change} {kpi.description}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
