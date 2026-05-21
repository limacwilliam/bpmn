import React from "react";
import { Map, Milestone, Calendar, ArrowRight, CheckCircle2 } from "lucide-react";

export default function RoadmapsPage() {
  return (
    <div className="space-y-8 select-none">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-black text-primary tracking-tight">Transformation Roadmaps</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Acompanhamento de marcos de maturidade de processos, cronogramas de automação e implantações de melhorias.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-background p-6 space-y-6 font-semibold">
        <div className="border-b border-border pb-4 flex items-center gap-2">
          <Milestone className="w-5 h-5 text-accent animate-pulse" />
          <h3 className="font-black text-sm uppercase tracking-wider text-primary">Marcos Estratégicos Ativos (Q2 - 2026)</h3>
        </div>

        <div className="relative border-l-2 border-border pl-6 space-y-8 ml-3 text-xs">
          <div className="relative">
            <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 border-accent bg-background flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-primary">Automação SAP & Integração API</span>
                <span className="px-2 py-0.5 text-[9px] font-black uppercase bg-accent/15 text-accent rounded-full">Em Andamento</span>
              </div>
              <p className="text-muted-foreground font-medium">Substituição do processo manual de conciliação bancária por Service Tasks integrados ao ERP.</p>
              <span className="text-[10px] text-muted-foreground font-semibold block pt-1">Meta Conclusão: 15 de Junho, 2026</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 border-emerald-500 bg-background flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 bg-background rounded-full" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-primary">Mapeamento Completo de KYC de Onboarding</span>
                <span className="px-2 py-0.5 text-[9px] font-black uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 rounded-full">Homologado</span>
              </div>
              <p className="text-muted-foreground font-medium">Mapeamento de todas as etapas de cadastro de clientes com redução de 45% nos tempos de atrito.</p>
              <span className="text-[10px] text-muted-foreground font-semibold block pt-1">Concluído em: 10 de Maio, 2026</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 border-border bg-background flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-border" />
            </div>
            <div className="space-y-1 border-opacity-30">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-primary text-opacity-50">Auditoria IA de SLAs Global</span>
                <span className="px-2 py-0.5 text-[9px] font-black uppercase bg-muted text-muted-foreground rounded-full">Não Iniciado</span>
              </div>
              <p className="text-muted-foreground font-medium text-opacity-50">Implementação de agente IA rodando no servidor para predizer incidentes em toda a governança.</p>
              <span className="text-[10px] text-muted-foreground font-semibold block pt-1 text-opacity-50">Meta Conclusão: Q3 - 2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export const metadata = { title: "Roadmaps Estratégicos - HIT Governance" };
