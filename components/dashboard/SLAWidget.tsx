import { cn } from "@/lib/utils";
import { AlertCircle, Clock, ShieldAlert, Zap, TrendingUp, HelpCircle } from "lucide-react";
import React from "react";

interface SLATask {
  id: string;
  processName: string;
  clientName: string;
  elapsedTime: number;
  timeLimit: number;
  department: string;
  riskProbability: number; // 0-100%
  status: "normal" | "warning" | "breached";
}

const SAMPLE_SLAS: SLATask[] = [
  {
    id: "SLA-101",
    processName: "Provisionamento & Configuração CLI",
    clientName: "Ambev Enterprise",
    elapsedTime: 112,
    timeLimit: 120,
    department: "NOC Técnico",
    riskProbability: 92,
    status: "warning",
  },
  {
    id: "SLA-102",
    processName: "Validação Geográfica de Postes",
    clientName: "Bradesco Agências",
    elapsedTime: 78,
    timeLimit: 48,
    department: "Engenharia TI",
    riskProbability: 100,
    status: "breached",
  },
  {
    id: "SLA-103",
    processName: "Handoff Comercial & Upload Checklist",
    clientName: "Petrobras Hub",
    elapsedTime: 12,
    timeLimit: 24,
    department: "Comercial / Vendas",
    riskProbability: 25,
    status: "normal",
  },
  {
    id: "SLA-104",
    processName: "Vistoria Física de Infraestrutura",
    clientName: "GPA Matriz",
    elapsedTime: 54,
    timeLimit: 72,
    department: "Operações Campo",
    riskProbability: 60,
    status: "normal",
  },
  {
    id: "SLA-105",
    processName: "Homologação de Roteador Core",
    clientName: "SulAmérica Seguros",
    elapsedTime: 96,
    timeLimit: 96,
    department: "NOC Técnico",
    riskProbability: 98,
    status: "warning",
  },
];

export default function SLAWidget() {
  return (
    <div className="rounded-2xl border border-border bg-background p-6 space-y-6 select-none flex flex-col justify-between h-full">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4 gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
            <h3 className="font-black text-sm uppercase tracking-wider text-primary">
              Monitor de SLA Técnico & prazos
            </h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Acompanhamento preditivo de tempos de go-live e filas críticas de atendimento.
          </p>
        </div>

        {/* Estatísticas de SLA */}
        <div className="flex gap-4">
          <div className="text-right">
            <span className="text-[10px] font-black uppercase text-[#7A7268] block">Conformidade Geral</span>
            <span className="text-base font-black text-emerald-600">96.4%</span>
          </div>
          <div className="h-8 w-px bg-border self-center" />
          <div className="text-right">
            <span className="text-[10px] font-black uppercase text-[#7A7268] block">Brechas Ativas</span>
            <span className="text-base font-black text-destructive">2 Contas</span>
          </div>
        </div>
      </div>

      {/* Lista de Processos sob SLAs */}
      <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1 scrollbar-thin">
        {SAMPLE_SLAS.map((task) => {
          const percentage = Math.min((task.elapsedTime / task.timeLimit) * 100, 100);
          
          let progressColor = "bg-emerald-500";
          let textColor = "text-emerald-700 bg-emerald-50";
          let statusLabel = "Dentro do Prazo";

          if (task.status === "warning") {
            progressColor = "bg-accent";
            textColor = "text-accent bg-accent/10";
            statusLabel = "Risco de Quebra";
          } else if (task.status === "breached") {
            progressColor = "bg-destructive";
            textColor = "text-destructive bg-destructive/10";
            statusLabel = "SLA Estourado";
          }

          return (
            <div 
              key={task.id} 
              className="p-4 rounded-xl border border-border bg-secondary/20 hover:bg-secondary/40 transition-colors space-y-3 group"
            >
              {/* Infos primárias */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-accent font-mono">{task.id}</span>
                    <span className="text-xs font-black text-primary group-hover:text-accent transition-colors">
                      {task.processName}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-muted-foreground font-semibold">
                    <span className="text-[#1C1208]">{task.clientName}</span>
                    <span>•</span>
                    <span>Setor: {task.department}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className={cn("text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full", textColor)}>
                    {statusLabel}
                  </span>
                </div>
              </div>

              {/* Barra de Progresso HSL e Tempos */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Tempo Corrido: {task.elapsedTime}h / Meta {task.timeLimit}h</span>
                  </span>
                  <span>{percentage.toFixed(0)}%</span>
                </div>
                
                <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                  <div 
                    className={cn("h-full rounded-full transition-all duration-500", progressColor)}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              {/* Predição e Ações Rápidas */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-2 border-t border-border/40 gap-2">
                <div className="flex items-center gap-1.5 text-[9px] font-bold">
                  <Zap className="w-3.5 h-3.5 text-accent" />
                  <span className="text-[#7A7268]">Probabilidade de Estouro (IA):</span>
                  <span className={cn(
                    "px-1.5 py-0.5 rounded font-mono",
                    task.riskProbability > 80 ? "text-destructive bg-destructive/5 font-black" : "text-primary"
                  )}>
                    {task.riskProbability}%
                  </span>
                </div>

                <div className="flex gap-2">
                  <button className="text-[9px] font-black uppercase text-[#7A7268] hover:text-primary transition-colors cursor-pointer select-none">
                    Ver logs
                  </button>
                  <button className="text-[9px] font-black uppercase text-accent hover:text-accent-hover transition-colors cursor-pointer select-none">
                    Escalar Chamado
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Rápido insight de rodapé */}
      <div className="p-3 bg-accent/5 border border-accent/20 rounded-xl text-[10px] text-accent font-semibold flex items-center gap-2">
        <ShieldAlert className="w-4 h-4 flex-shrink-0" />
        <span>
          A IA prevê que a automatização do handoff do Comercial reduzirá o risco de violação em 68% no faturamento SAP.
        </span>
      </div>
    </div>
  );
}
