import ExecutiveKPICard from "@/components/dashboard/ExecutiveKPICard";
import ExecutiveSummaryPanel from "@/components/dashboard/ExecutiveSummaryPanel";
import {
  executiveKPIs,
  executiveRecommendations,
  organizationalHealthSignals,
  processMaturityScores,
  type KPIIconKey,
} from "@/lib/dashboard-data";
import {
  AlertTriangle,
  Compass,
  Flame,
  GitBranch,
  ShieldAlert,
  SlidersHorizontal,
  Award,
  Layers,
  Activity,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import DashboardClient from "./DashboardClient";

const KPI_ICON_MAP: Record<KPIIconKey, LucideIcon> = {
  processes: GitBranch,
  projects: Layers,
  bottlenecks: Flame,
  sla: SlidersHorizontal,
  risk: ShieldAlert,
  maturity: Compass,
  customers: AlertTriangle,
  openRisks: Award,
  transformation: Zap,
  health: Activity,
};

export default function DashboardPage() {
  return (
    <div className="space-y-8 select-none font-sans">
      {/* 1. Cabeçalho Executivo de Governança */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 select-none">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-black text-primary tracking-tight uppercase">
            Plataforma HIT Operational Intelligence
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Painel Executivo de Governança Operacional, Monitoramento Preditivo de SLAs e Transformação AS IS / TO BE.
          </p>
        </div>
      </div>

      {/* 2. Painel Superior com Veredito de IA (HIT Lead Ops Advisor) */}
      <ExecutiveSummaryPanel />

      {/* 3. Grid de 10 Cards de Métricas Operacionais com Sparklines e Alertas */}
      <div className="space-y-3">
        <span className="text-[10px] font-black uppercase text-[#7A7268] tracking-widest block pl-1">
          Indicadores de Performance e Saúde Operacional (10 KPIs)
        </span>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 select-none">
          {executiveKPIs.map((kpi) => (
            <Link key={kpi.id} href={kpi.href} className="block h-full">
              <ExecutiveKPICard
                title={kpi.title}
                value={kpi.value}
                unit={kpi.unit}
                change={kpi.change}
                isPositive={kpi.isPositive}
                icon={KPI_ICON_MAP[kpi.icon]}
                description={kpi.description}
                sparklineData={kpi.sparklineData}
                isAlert={kpi.isAlert}
                alertText={kpi.alertText}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* 4. Componente Cliente Interativo (Cockpit Operacional com Abas) */}
      <DashboardClient />

      {/* 5. Inteligência Organizacional, Maturidade e Recomendações Estratégicas */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <section className="rounded-2xl border border-border bg-background p-6 space-y-5">
          <div className="border-b border-border pb-4">
            <span className="text-[10px] font-black uppercase text-accent tracking-widest">
              Organizational Health
            </span>
            <h2 className="text-sm font-black uppercase tracking-wider text-primary mt-1">
              Capacidade, carga e concentração de ownership
            </h2>
          </div>

          <div className="space-y-4">
            {organizationalHealthSignals.map((signal) => {
              const overload = signal.workload - signal.capacity;
              return (
                <div key={signal.department} className="rounded-xl border border-border bg-secondary/15 p-4 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-black text-primary">{signal.department}</span>
                    <span className="text-[9px] font-black uppercase text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                      Risco {signal.ownershipRisk}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold text-muted-foreground">
                      <span>Carga {signal.workload}%</span>
                      <span>Capacidade {signal.capacity}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-border overflow-hidden">
                      <div className="h-full rounded-full bg-accent" style={{ width: `${Math.min(signal.workload, 100)}%` }} />
                    </div>
                  </div>
                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    {signal.dependency}
                    {overload > 0 && (
                      <span className="font-black text-destructive"> Sobrecarga de {overload} pts.</span>
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-background p-6 space-y-5">
          <div className="border-b border-border pb-4">
            <span className="text-[10px] font-black uppercase text-accent tracking-widest">
              Process Maturity Center
            </span>
            <h2 className="text-sm font-black uppercase tracking-wider text-primary mt-1">
              Evolução por área: caótico até escalável
            </h2>
          </div>

          <div className="space-y-3.5">
            {processMaturityScores.map((maturity) => (
              <div key={maturity.department} className="rounded-xl border border-border/80 bg-secondary/10 p-4 space-y-2.5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-black text-primary">{maturity.department}</span>
                  <span className="text-[10px] font-black text-primary">Nível {maturity.level} / 5</span>
                </div>
                <div className="h-2 rounded-full bg-border overflow-hidden">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${maturity.score}%` }} />
                </div>
                <p className="text-[11px] leading-relaxed text-muted-foreground">{maturity.evidence}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-[#1C1208] p-6 space-y-5 text-white shadow-xl shadow-[#1C1208]/10">
          <div className="border-b border-white/10 pb-4">
            <span className="text-[10px] font-black uppercase text-accent tracking-widest">
              Executive Recommendation Center
            </span>
            <h2 className="text-sm font-black uppercase tracking-wider text-white mt-1">
              Prioridades que movem governança e retenção
            </h2>
          </div>

          <div className="space-y-4">
            {executiveRecommendations.map((recommendation) => (
              <div key={recommendation.id} className="rounded-xl border border-white/10 bg-white/[0.07] p-4 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[9px] font-black uppercase text-accent">{recommendation.id}</span>
                  <span className="text-[9px] font-black uppercase bg-white/10 text-white px-2 py-0.5 rounded-full">
                    {recommendation.priority}
                  </span>
                </div>
                <div>
                  <h3 className="text-xs font-black text-white leading-snug">{recommendation.title}</h3>
                  <p className="text-[11px] leading-relaxed text-white/70 mt-1">{recommendation.impact}</p>
                </div>
                <div className="flex items-center justify-between text-[9px] font-black uppercase text-white/60 border-t border-white/10 pt-3">
                  <span>{recommendation.owner}</span>
                  <span>SLA ação: {recommendation.due}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Dashboard Executivo e Inteligência Operacional - HIT Governance",
  description: "Visão consolidada de maturidade de processos, SLAs contratuais e mitigação de gargalos.",
};
