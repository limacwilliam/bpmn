import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, Clock, Flame, ShieldAlert, Sparkles, User } from "lucide-react";
import React from "react";

interface Milestone {
  id: string;
  stageName: string;
  quarter: string;
  progress: number; // 0-100%
  status: "completed" | "in_progress" | "blocked" | "planned";
  owner: string;
  description: string;
  delayText?: string;
}

const ROADMAP_MILESTONES: Milestone[] = [
  {
    id: "MLS-01",
    stageName: "Mapeamento AS IS Detalhado",
    quarter: "T3-2025",
    progress: 100,
    status: "completed",
    owner: "William Lima (Ops)",
    description: "Levantamento e diagramação de todas as 12 ineficiências intersetoriais no provisionamento de conectividade.",
  },
  {
    id: "MLS-02",
    stageName: "Desenho e Modelagem do Fluxo TO BE",
    quarter: "T4-2025",
    progress: 100,
    status: "completed",
    owner: "Mariana Costa (Comercial)",
    description: "Definição do fluxo otimizado com redução de handoffs humanos e automatização de e-mails KYC/Postes.",
  },
  {
    id: "MLS-03",
    stageName: "Integração do Core API com ERP SAP",
    quarter: "T1-2026",
    progress: 85,
    status: "in_progress",
    owner: "Carlos Ramos (Engenharia)",
    description: "Desenvolvimento dos webhooks bidirecionais de faturamento automático SAP Billing e validação de postes.",
  },
  {
    id: "MLS-04",
    stageName: "Piloto Hypercare com Clientes VIP",
    quarter: "T2-2026",
    progress: 30,
    status: "in_progress",
    owner: "Juliana Mendes (CS)",
    description: "Homologação assistida de go-live nas contas da Ambev e Bradesco com resposta e agendamento proativo.",
    delayText: "Aguardando homologação de postes",
  },
  {
    id: "MLS-05",
    stageName: "Go-Live Operacional e Automatização Geral",
    quarter: "T3-2026",
    progress: 0,
    status: "planned",
    owner: "William Lima (Ops)",
    description: "Virada de chave definitiva do legado manual e encerramento de planilhas locais no OneDrive.",
  },
];

export default function OperationalTimeline() {
  return (
    <div className="rounded-2xl border border-border bg-background p-6 space-y-6 select-none flex flex-col justify-between h-full">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4 gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent" />
            <h3 className="font-black text-sm uppercase tracking-wider text-primary">
              Roadmap de Transformação AS IS ➔ TO BE
            </h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Acompanhamento evolutivo dos marcos estratégicos para automação de processos da HIT.
          </p>
        </div>

        {/* Status de Roadmap */}
        <div className="flex items-center gap-2 bg-secondary px-3 py-1 rounded-full border border-border">
          <span className="text-[10px] font-black uppercase text-[#7A7268]">Progresso Global:</span>
          <span className="text-xs font-black text-accent">63.0%</span>
        </div>
      </div>

      {/* Timeline List */}
      <div className="space-y-6 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border/60">
        {ROADMAP_MILESTONES.map((milestone) => {
          let nodeIcon = <Circle className="w-5 h-5 text-muted-foreground bg-background" />;
          let cardBorder = "border-border bg-background";
          let statusText = "Agendado";
          let textColor = "text-muted-foreground";

          if (milestone.status === "completed") {
            nodeIcon = <CheckCircle2 className="w-5 h-5 text-emerald-500 bg-background fill-emerald-50" />;
            cardBorder = "border-emerald-500/20 bg-emerald-500/5";
            statusText = "Concluído";
            textColor = "text-emerald-700";
          } else if (milestone.status === "in_progress") {
            nodeIcon = <Clock className="w-5 h-5 text-accent bg-background fill-accent/5 animate-spin-slow" />;
            cardBorder = "border-accent/30 bg-accent/5";
            statusText = "Em Execução";
            textColor = "text-accent";
          } else if (milestone.status === "blocked") {
            nodeIcon = <Flame className="w-5 h-5 text-destructive bg-background fill-destructive/5" />;
            cardBorder = "border-destructive/30 bg-destructive/5";
            statusText = "Gargalo Crítico";
            textColor = "text-destructive";
          }

          return (
            <div key={milestone.id} className="relative group">
              {/* Icone do Nó */}
              <div className="absolute -left-8.5 top-0.5 z-10">
                {nodeIcon}
              </div>

              {/* Card de Detalhe */}
              <div className={cn(
                "p-4 rounded-xl border transition-all duration-300",
                cardBorder,
                milestone.status === "in_progress" ? "shadow-sm shadow-accent/5" : "hover:border-accent/40"
              )}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-border/40 pb-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black uppercase bg-[#1C1208]/10 text-primary px-2 py-0.5 rounded font-mono">
                      {milestone.quarter}
                    </span>
                    <h4 className="text-xs font-black text-primary group-hover:text-accent transition-colors leading-snug">
                      {milestone.stageName}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2">
                    {milestone.delayText && (
                      <span className="text-[9px] font-bold text-destructive bg-destructive/10 px-2 py-0.5 rounded-full flex items-center gap-1 select-none">
                        <ShieldAlert className="w-3 h-3" />
                        <span>Atrasado</span>
                      </span>
                    )}
                    <span className={cn("text-[9px] font-black uppercase font-sans tracking-wide", textColor)}>
                      {statusText} ({milestone.progress}%)
                    </span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  {milestone.description}
                </p>

                {/* Dono & Progresso Interno */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[10px] pt-1">
                  <div className="flex items-center gap-1.5 font-semibold text-muted-foreground">
                    <User className="w-3.5 h-3.5" />
                    <span>Líder Técnico: {milestone.owner}</span>
                  </div>

                  {milestone.status === "in_progress" && (
                    <div className="w-full sm:w-28 space-y-1">
                      <div className="flex justify-between text-[8px] font-black text-muted-foreground uppercase">
                        <span>Sprint</span>
                        <span>{milestone.progress}%</span>
                      </div>
                      <div className="w-full h-1 bg-border rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-accent rounded-full transition-all duration-300"
                          style={{ width: `${milestone.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
