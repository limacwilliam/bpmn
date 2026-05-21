"use client";

import React from "react";
import { Clock, HelpCircle, ArrowRight, Zap, Ban } from "lucide-react";
import { BottleneckDetail } from "./types";

interface BottleneckAnalysisProps {
  bottlenecks: BottleneckDetail[];
}

export default function BottleneckAnalysis({ bottlenecks }: BottleneckAnalysisProps) {
  return (
    <div className="rounded-xl border border-border bg-background p-6 shadow-sm space-y-5">
      <div className="border-b border-border pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Ban className="w-4.5 h-4.5 text-accent" />
          <h3 className="font-black text-sm uppercase tracking-wider text-primary">
            Diagnóstico de Gargalos &amp; Handoffs Manuais
          </h3>
        </div>
        <span className="text-[10px] text-muted-foreground font-black uppercase tracking-wider">
          {bottlenecks.length} Pontos de Latência
        </span>
      </div>

      <div className="space-y-4">
        {bottlenecks.map((b) => (
          <div
            key={b.id}
            className="group rounded-lg border border-border bg-secondary/20 hover:bg-secondary/40 p-4.5 transition-all duration-300 flex flex-col md:flex-row md:items-start justify-between gap-4"
          >
            {/* Esquerda: Identificação e Dores */}
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-black text-primary group-hover:text-accent transition-colors">
                  {b.step}
                </span>
                <span className="bg-accent/15 px-2 py-0.5 rounded border border-accent/25 text-[9px] uppercase tracking-wide text-accent font-black">
                  {b.lane}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[10.5px]">
                <div className="space-y-1">
                  <span className="text-[9px] text-muted-foreground uppercase font-black tracking-wide block">
                    Impacto Operacional &amp; SLA:
                  </span>
                  <p className="text-muted-foreground leading-relaxed font-semibold">
                    {b.impact}
                  </p>
                </div>
                <div className="space-y-1 bg-background border border-border/80 rounded-lg p-2.5">
                  <span className="text-[9px] text-accent uppercase font-black tracking-wide block flex items-center gap-1">
                    <Zap className="w-3 h-3 text-accent" />
                    Proposta de Automatização (TO BE):
                  </span>
                  <p className="text-primary leading-normal font-semibold">
                    {b.mitigation}
                  </p>
                </div>
              </div>
            </div>

            {/* Direita: Latência Mapeada */}
            <div className="flex flex-row md:flex-col items-center justify-between md:justify-center md:items-end gap-2.5 border-t md:border-t-0 md:border-l border-border pt-3 md:pt-0 md:pl-5 md:min-w-[120px] shrink-0">
              <span className="text-[9px] uppercase text-muted-foreground font-black tracking-wider block">
                Fila / Atraso:
              </span>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-destructive/10 border border-destructive/35 text-destructive font-black text-xs">
                <Clock className="w-3.5 h-3.5" />
                {b.delay}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
