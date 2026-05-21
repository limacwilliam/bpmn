import React from "react";
import { Flame, TrendingUp } from "lucide-react";
import { enterpriseBottlenecks } from "@/lib/enterprise-operational-data";

export default function BottlenecksPage() {
  const critical = enterpriseBottlenecks.filter((item) => item.severity === "CRITICAL");
  const recommended = enterpriseBottlenecks.slice(0, 4);

  return (
    <div className="space-y-8 select-none">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-black text-primary tracking-tight">Análise de Gargalos</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Identificação automática de pontos de lentidão e estrangulamentos operacionais com base em Process Mining.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-semibold">
        <div className="rounded-xl border border-border bg-background p-6 space-y-6">
          <div className="border-b border-border pb-4 flex items-center gap-2">
            <Flame className="w-5 h-5 text-accent animate-pulse" />
            <h3 className="font-black text-sm uppercase tracking-wider text-primary">Gargalos Críticos Detectados</h3>
          </div>

          <div className="space-y-4">
            {critical.map((bottleneck) => (
              <div key={bottleneck.id} className="p-4 rounded-lg bg-secondary/50 border border-border space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-bold text-sm text-primary">{bottleneck.title}</span>
                  <span className="px-2 py-0.5 text-[9px] font-black uppercase bg-destructive text-destructive-foreground rounded-full">Crítico</span>
                </div>
                <p className="text-xs text-muted-foreground">{bottleneck.impact}</p>
                <div className="flex flex-wrap items-center gap-4 text-[10px] text-muted-foreground pt-2">
                  <span>Latência Média: <strong className="text-destructive font-black">+{bottleneck.averageDelayHours}h</strong></span>
                  <span>Departamento: {bottleneck.affectedDepartment}</span>
                  <span>Processos: {bottleneck.relatedProcesses.join(", ")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-background p-6 space-y-6">
          <div className="border-b border-border pb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            <h3 className="font-black text-sm uppercase tracking-wider text-primary">Ações Recomendadas (IA)</h3>
          </div>

          <div className="space-y-4 text-xs">
            {recommended.map((bottleneck) => (
              <div key={bottleneck.id} className="p-4 border border-border rounded-lg bg-background hover:border-accent transition-all space-y-2">
                <span className="font-bold text-primary block">{bottleneck.suggestedAction}</span>
                <p className="text-muted-foreground leading-relaxed">{bottleneck.customerImpact}</p>
                <span className="text-[9px] font-black text-accent block uppercase tracking-wider">
                  Ganho esperado: reduzir {bottleneck.averageDelayHours}h de latência média
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export const metadata = { title: "Análise de Gargalos - HIT Governance" };
