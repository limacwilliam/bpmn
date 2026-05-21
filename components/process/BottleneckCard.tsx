"use client";

import { cn } from "@/lib/utils";
import { AlertOctagon, AlertTriangle, ArrowRight, CheckCircle2, Clock, Flame, Sliders } from "lucide-react";
import React, { useState } from "react";

export type BottleneckSeverityType = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

interface BottleneckCardProps {
  id: string;
  title: string;
  severity: BottleneckSeverityType;
  rootCause: string;
  latency: string;
  impact: string;
  suggestedAction: string;
  onMitigate?: (id: string) => void;
  className?: string;
}

const SEVERITY_METADATA = {
  LOW: {
    label: "Baixa Criticidade",
    color: "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/40",
    Icon: Clock,
  },
  MEDIUM: {
    label: "Média Criticidade",
    color: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/40",
    Icon: Sliders,
  },
  HIGH: {
    label: "Alta Criticidade",
    color: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/40 animate-pulse",
    Icon: AlertTriangle,
  },
  CRITICAL: {
    label: "Gargalo Crítico",
    color: "bg-destructive/10 text-destructive border-destructive/20 animate-pulse",
    Icon: AlertOctagon,
  },
};

export default function BottleneckCard({
  id,
  title,
  severity,
  rootCause,
  latency,
  impact,
  suggestedAction,
  onMitigate,
  className,
}: BottleneckCardProps) {
  const [mitigated, setMitigated] = useState(false);
  const meta = SEVERITY_METADATA[severity] || SEVERITY_METADATA.LOW;
  const Icon = meta.Icon;

  const handleMitigate = () => {
    setMitigated(true);
    if (onMitigate) {
      onMitigate(id);
    }
  };

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-background p-6 space-y-4 select-none shadow-sm transition-all duration-300 relative overflow-hidden",
        mitigated ? "opacity-60 bg-secondary/20 scale-[0.98]" : "hover:shadow-md hover:border-accent/30",
        className
      )}
    >
      {/* 1. Header do Gargalo */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <Flame className={cn("w-4 h-4", mitigated ? "text-muted-foreground" : "text-accent animate-pulse")} />
          <h4 className="font-bold text-sm text-primary truncate max-w-[200px] sm:max-w-xs">{title}</h4>
        </div>

        {mitigated ? (
          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/40 text-[9px] font-black uppercase px-2 py-0.5 rounded-full select-none">
            <CheckCircle2 className="w-2.5 h-2.5" /> Gargalo Mitigado
          </span>
        ) : (
          <span className={cn("inline-flex items-center gap-1 text-[9px] font-black uppercase px-2 py-0.5 rounded-full border select-none", meta.color)}>
            <Icon className="w-2.5 h-2.5" /> {meta.label}
          </span>
        )}
      </div>

      {/* 2. Conteúdo e Informações do Gargalo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
        <div className="space-y-1">
          <span className="text-[10px] uppercase text-muted-foreground font-black">Causa Raiz</span>
          <p className="text-primary font-medium">{rootCause}</p>
        </div>

        <div className="space-y-1 sm:text-right">
          <span className="text-[10px] uppercase text-muted-foreground font-black">Latência Medida</span>
          <p className="text-destructive font-black text-sm">{latency}</p>
        </div>
      </div>

      <div className="p-3 bg-secondary/50 border border-border rounded-lg text-xs space-y-1 font-semibold">
        <span className="text-[9px] uppercase text-muted-foreground font-black block">Impacto Operacional</span>
        <p className="text-primary font-medium">{impact}</p>
      </div>

      {/* 3. Ação Sugerida e Botão de Mitigação */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-2 gap-3 border-t border-border">
        <div className="text-xs space-y-0.5 font-semibold">
          <span className="text-[9px] uppercase text-accent font-black block">Mitigação Sugerida</span>
          <p className="text-muted-foreground font-medium">{suggestedAction}</p>
        </div>

        {!mitigated && (
          <button
            onClick={handleMitigate}
            className="inline-flex items-center justify-center gap-1.5 bg-accent text-white hover:bg-accent-hover text-[10px] font-black uppercase px-4 py-2 rounded-full transition-colors shadow-sm cursor-pointer select-none whitespace-nowrap self-end sm:self-auto"
          >
            Mitigar
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
