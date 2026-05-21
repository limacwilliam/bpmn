"use client";

import React from "react";
import {
  Activity,
  AlertOctagon,
  Clock,
  Coins,
  TrendingDown,
  Workflow,
  Zap
} from "lucide-react";
import { processStats } from "./mockData";

interface BPMNAnalyticsOverlayProps {
  workflowMode: "AS_IS" | "TO_BE";
  isOpen: boolean;
}

export default function BPMNAnalyticsOverlay({
  workflowMode,
  isOpen
}: BPMNAnalyticsOverlayProps) {
  if (!isOpen) return null;

  const stats = workflowMode === "AS_IS" ? processStats.AS_IS : processStats.TO_BE;
  const isAsIs = workflowMode === "AS_IS";

  return (
    <div className="absolute top-4 right-4 left-4 md:left-auto z-20 md:w-96 bg-background/95 border border-border rounded-xl shadow-2xl p-4 select-none backdrop-blur-md animate-[fade-in_0.2s_ease-out]">
      <div className="flex items-center justify-between border-b border-border pb-3 mb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-accent animate-pulse" />
          <div>
            <h3 className="font-black text-xs uppercase tracking-wider text-primary">
              Inteligência de Processo
            </h3>
            <p className="text-[9px] text-muted-foreground">
              Métricas reais de provisionamento.
            </p>
          </div>
        </div>

        <span
          className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
            isAsIs
              ? "bg-destructive/15 text-destructive border border-destructive/20"
              : "bg-emerald-500/15 text-emerald-600 border border-emerald-500/20"
          }`}
        >
          {isAsIs ? "Fluxo AS IS (Gargalos)" : "Fluxo TO BE (Otimizado)"}
        </span>
      </div>

      {/* Cartões de Indicadores Chave */}
      <div className="grid grid-cols-2 gap-3 mb-3.5">
        {/* Tempo total de ciclo */}
        <div className="p-3 bg-secondary/50 rounded-xl border border-border/80 text-left flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-[8px] font-black uppercase tracking-wider">Duração Total</span>
            <Clock className="w-3.5 h-3.5 text-accent" />
          </div>
          <span className="text-sm font-black text-primary mt-1">{stats.totalDuration}</span>
          <span className="text-[8px] text-muted-foreground mt-0.5">Tempo ponta a ponta</span>
        </div>

        {/* Conformidade SLA */}
        <div className="p-3 bg-secondary/50 rounded-xl border border-border/80 text-left flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-[8px] font-black uppercase tracking-wider">SLA Atingido</span>
            <Zap className="w-3.5 h-3.5 text-accent" />
          </div>
          <span
            className={`text-sm font-black mt-1 ${
              isAsIs ? "text-destructive" : "text-emerald-600"
            }`}
          >
            {stats.slaCompliance}
          </span>
          <span className="text-[8px] text-muted-foreground mt-0.5">Dentro do prazo legal</span>
        </div>

        {/* Handoffs Manuais */}
        <div className="p-3 bg-secondary/50 rounded-xl border border-border/80 text-left flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-[8px] font-black uppercase tracking-wider">Handoffs</span>
            <Workflow className="w-3.5 h-3.5 text-accent" />
          </div>
          <span className="text-sm font-black text-primary mt-1">{stats.averageHandoffs}</span>
          <span className="text-[8px] text-muted-foreground mt-0.5">Passagens de bastão</span>
        </div>

        {/* Custos Operacionais */}
        <div className="p-3 bg-secondary/50 rounded-xl border border-border/80 text-left flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-[8px] font-black uppercase tracking-wider">Custo Fixo</span>
            <Coins className="w-3.5 h-3.5 text-accent" />
          </div>
          <span className="text-sm font-black text-primary mt-1">{stats.operationalCost}</span>
          <span className="text-[8px] text-muted-foreground mt-0.5">Gasto em processamento</span>
        </div>
      </div>

      {/* Caixa de Texto de Alerta / Sucesso */}
      <div
        className={`p-3 rounded-xl border text-[10px] leading-relaxed text-left flex gap-2 ${
          isAsIs
            ? "bg-destructive/5 border-destructive/20 text-primary"
            : "bg-emerald-500/5 border-emerald-500/20 text-primary"
        }`}
      >
        {isAsIs ? (
          <>
            <AlertOctagon className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
            <div>
              <strong className="text-destructive block font-bold uppercase tracking-wider text-[9px] mb-0.5">
                Perda Crítica Detectada
              </strong>
              Gargalos acumulados na triagem de Engenharia e configuração manual de roteadores do NOC aumentam o tempo de go-live em mais de 115 horas e estouram SLAs em 37.6% dos clientes.
            </div>
          </>
        ) : (
          <>
            <TrendingDown className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-emerald-600 block font-bold uppercase tracking-wider text-[9px] mb-0.5">
                Otimização Sistemática por IA
              </strong>
              A integração de APIs de provisionamento SDN, viabilidade preditiva no Geoportal e agendamento self-service geraram uma redução global de **96% na latência**, estabilizando a conformidade em 99.8%.
            </div>
          </>
        )}
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
