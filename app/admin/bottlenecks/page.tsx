import React from "react";
import { Flame, Clock, TrendingUp, AlertTriangle, ArrowRight } from "lucide-react";

export default function BottlenecksPage() {
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
            <div className="p-4 rounded-lg bg-secondary/50 border border-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-primary">Aprovação SAP (Financeiro)</span>
                <span className="px-2 py-0.5 text-[9px] font-black uppercase bg-destructive text-destructive-foreground rounded-full">Crítico</span>
              </div>
              <p className="text-xs text-muted-foreground">Etapa manual que causa o acúmulo de mais de 45 requisições por dia.</p>
              <div className="flex items-center gap-4 text-[10px] text-muted-foreground pt-2">
                <span>Latência Média: <strong className="text-destructive font-black">+2h 15m</strong></span>
                <span>Impacto Geral: 87%</span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-secondary/50 border border-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-primary">Validação de KYC (Onboarding)</span>
                <span className="px-2 py-0.5 text-[9px] font-black uppercase bg-amber-500 text-white rounded-full">Alerta</span>
              </div>
              <p className="text-xs text-muted-foreground">Validação cadastral lenta por dependência de múltiplos bureaus.</p>
              <div className="flex items-center gap-4 text-[10px] text-muted-foreground pt-2">
                <span>Latência Média: <strong className="text-amber-600 font-black">+45 min</strong></span>
                <span>Impacto Geral: 42%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-background p-6 space-y-6">
          <div className="border-b border-border pb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            <h3 className="font-black text-sm uppercase tracking-wider text-primary">Ações Recomendadas (IA)</h3>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 border border-border rounded-lg bg-background hover:border-accent transition-all space-y-2">
              <span className="font-bold text-primary block">Integração Direta via API (Financeiro)</span>
              <p className="text-muted-foreground leading-relaxed">
                A IA recomenda migrar a tarefa de conciliação SAP para um Service Task automatizado.
              </p>
              <span className="text-[9px] font-black text-accent block uppercase tracking-wider">Redução Estimada: 82% no Tempo</span>
            </div>

            <div className="p-4 border border-border rounded-lg bg-background hover:border-accent transition-all space-y-2">
              <span className="font-bold text-primary block">Paralelização de Etapas (KYC)</span>
              <p className="text-muted-foreground leading-relaxed">
                Mover a análise de KYC para rodar em paralelo com a criação da conta sandbox.
              </p>
              <span className="text-[9px] font-black text-accent block uppercase tracking-wider">Ganho Estimado: Redução de 20 min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export const metadata = { title: "Análise de Gargalos - HIT Governance" };
