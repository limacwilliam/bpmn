"use client";

import React from "react";
import { AlertCircle, Flame, ShieldAlert, Sparkles, TrendingUp } from "lucide-react";

interface AIInsightsWidgetProps {
  healthScore: number;
}

export default function AIInsightsWidget({ healthScore }: AIInsightsWidgetProps) {
  // Simular métricas baseadas no healthScore
  const caosOperacional = Math.max(100 - healthScore - 12, 10);
  const atritoIntersetorial = Math.max(100 - healthScore - 5, 15);
  const slaRiskIndex = Math.max(100 - healthScore, 5);
  const churnEst = healthScore < 40 ? "14.2%" : healthScore < 70 ? "6.8%" : "1.2%";

  return (
    <div className="rounded-xl border border-border bg-background p-6 shadow-sm space-y-5">
      <div className="border-b border-border pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4.5 h-4.5 text-accent animate-pulse" />
          <h3 className="font-black text-sm uppercase tracking-wider text-primary">
            Indicadores Rápidos de Governança
          </h3>
        </div>
        <span className="text-[10px] text-muted-foreground font-black uppercase tracking-wider">
          Tempo Real
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Caos Operacional */}
        <div className="p-3.5 rounded-lg border border-border bg-secondary/15 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-black">
              Caos Operacional
            </span>
            <Flame className="w-3.5 h-3.5 text-accent" />
          </div>
          <div className="space-y-1.5">
            <span className="text-xl font-black text-primary block leading-none">
              {caosOperacional}%
            </span>
            <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-accent"
                style={{ width: `${caosOperacional}%` }}
              />
            </div>
          </div>
        </div>

        {/* Atrito Intersetorial */}
        <div className="p-3.5 rounded-lg border border-border bg-secondary/15 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-black">
              Atrito Intersetorial
            </span>
            <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="space-y-1.5">
            <span className="text-xl font-black text-primary block leading-none">
              {atritoIntersetorial}%
            </span>
            <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500"
                style={{ width: `${atritoIntersetorial}%` }}
              />
            </div>
          </div>
        </div>

        {/* Risco de SLA */}
        <div className="p-3.5 rounded-lg border border-border bg-secondary/15 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-black">
              SLA Risk Index
            </span>
            <ShieldAlert className="w-3.5 h-3.5 text-destructive" />
          </div>
          <div className="space-y-1.5">
            <span className="text-xl font-black text-primary block leading-none">
              {slaRiskIndex}%
            </span>
            <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-destructive"
                style={{ width: `${slaRiskIndex}%` }}
              />
            </div>
          </div>
        </div>

        {/* Estimativa de Churn */}
        <div className="p-3.5 rounded-lg border border-border bg-secondary/15 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-black">
              Estimativa de Churn
            </span>
            <TrendingUp className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <span className="text-xl font-black text-primary block leading-none">
              {churnEst}
            </span>
            <span className="text-[9px] text-muted-foreground font-semibold block leading-none">
              Projeção 30 dias
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
