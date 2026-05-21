"use client";

import { cn } from "@/lib/utils";
import { CheckCircle2, ChevronRight, Compass, ShieldAlert, Sparkles } from "lucide-react";
import React from "react";

export type MaturityLevelType = 1 | 2 | 3 | 4 | 5;

interface MaturityScoreProps {
  level: MaturityLevelType;
  missingRequirements?: string[];
  recommendations?: string[];
  className?: string;
}

const MATURITY_METADATA = {
  1: {
    title: "Nível 1 - Caótico (Chaotic)",
    description: "Processos sem documentação, dependentes de heroismo pessoal e com latências imprevisíveis.",
    color: "text-red-600 dark:text-red-400 border-red-200 bg-red-500/5",
    progressWidth: "w-1/5",
  },
  2: {
    title: "Nível 2 - Reativo (Reactive)",
    description: "Processos parcialmente mapeados em spreadsheets locais, resolvidos sob incêndio e retrabalho.",
    color: "text-amber-600 dark:text-amber-400 border-amber-200 bg-amber-500/5",
    progressWidth: "w-2/5",
  },
  3: {
    title: "Nível 3 - Estruturado (Structured)",
    description: "Modelado em BPMN oficial da HIT, com lanes definidas e proprietários ativos de processo.",
    color: "text-blue-600 dark:text-blue-400 border-blue-200 bg-blue-500/5",
    progressWidth: "w-3/5",
  },
  4: {
    title: "Nível 4 - Gerenciado (Managed)",
    description: "Integrado com triggers sistêmicos (APIs), monitoramento ativo de SLAs e dashboards operacionais.",
    color: "text-indigo-600 dark:text-indigo-400 border-indigo-200 bg-indigo-500/5",
    progressWidth: "w-4/5",
  },
  5: {
    title: "Nível 5 - Escalável (Scalable)",
    description: "Orquestração ponta a ponta nativa da HIT, mitigação térmica de gargalos por IA e auditorias contínuas.",
    color: "text-accent border-accent/20 bg-accent/5",
    progressWidth: "w-full",
  },
};

export default function MaturityScore({
  level,
  missingRequirements = [],
  recommendations = [],
  className,
}: MaturityScoreProps) {
  const meta = MATURITY_METADATA[level] || MATURITY_METADATA[1];

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-background p-6 space-y-6 select-none shadow-sm transition-all hover:shadow-md",
        className
      )}
    >
      {/* 1. Header do Nível de Maturidade */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={cn("p-3 rounded-lg border", meta.color)}>
            <Compass className="w-6 h-6 animate-spin-slow" />
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Maturidade Operacional</span>
            <h4 className="text-base font-black text-primary leading-tight">{meta.title}</h4>
          </div>
        </div>

        {/* Círculo do Score */}
        <div className="flex items-center gap-1 bg-secondary border border-border px-4 py-2 rounded-full font-black text-primary text-sm shadow-inner">
          <span className="text-accent">{level}</span>
          <span className="text-muted-foreground">/ 5</span>
        </div>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        {meta.description}
      </p>

      {/* 2. Barra de Progresso em HSL */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[9px] font-black uppercase text-[#7A7268] tracking-wider">
          <span>Nível de Integridade</span>
          <span>{(level * 20)}% Concluído</span>
        </div>
        <div className="w-full h-2.5 bg-secondary rounded-full overflow-hidden border border-border">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500 ease-out",
              level === 5 ? "bg-accent shadow-md shadow-accent/35 animate-pulse" : "bg-primary"
            )}
            style={{ width: `${level * 20}%` }}
          />
        </div>
      </div>

      {/* 3. Requisitos Pendentes e Recomendações */}
      {(missingRequirements.length > 0 || recommendations.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-border">
          
          {/* Requisitos Faltantes */}
          {missingRequirements.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase text-destructive tracking-widest flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0" />
                Requisitos Faltantes ({missingRequirements.length})
              </span>
              <ul className="space-y-1.5 text-xs text-muted-foreground font-semibold">
                {missingRequirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-destructive mt-0.5 flex-shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Recomendações de Evolução */}
          {recommendations.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase text-accent tracking-widest flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                Recomendações da IA Operacional
              </span>
              <ul className="space-y-1.5 text-xs text-muted-foreground font-semibold">
                {recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
