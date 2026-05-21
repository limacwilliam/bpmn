"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, Box, ChevronRight, GitBranch, Layers, Network, ShieldCheck } from "lucide-react";
import React from "react";

export interface DependencyItem {
  id: string;
  name: string;
  department: string;
  type: "UPSTREAM" | "DOWNSTREAM"; // Entradas ou saídas
  handoffStatus: "STABLE" | "DELAYED" | "CRITICAL";
  system: string;
}

interface ProcessDependenciesProps {
  dependencies?: DependencyItem[];
  className?: string;
}

const HANDOFF_METADATA = {
  STABLE: "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/40",
  DELAYED: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/40",
  CRITICAL: "bg-destructive/10 text-destructive border-destructive/20 animate-pulse",
};

export default function ProcessDependencies({
  dependencies = [],
  className,
}: ProcessDependenciesProps) {
  // Filtra as dependências
  const upstream = dependencies.filter((d) => d.type === "UPSTREAM");
  const downstream = dependencies.filter((d) => d.type === "DOWNSTREAM");

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-background p-6 space-y-6 select-none shadow-sm",
        className
      )}
    >
      {/* 1. Header do Mapeamento */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-accent" />
          <h4 className="font-black text-sm uppercase tracking-wider text-primary">Matriz de Dependências & Handoffs</h4>
        </div>
        <span className="text-[9px] font-black bg-secondary border border-border px-2 py-0.5 rounded-full text-muted-foreground select-none">
          {dependencies.length} Conexões Sistêmicas
        </span>
      </div>

      {/* 2. Fluxograma de Blocos Upstream -> PROCESSO ATUAL -> Downstream */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 items-center relative select-none">
        
        {/* Lado Esquerdo: Entradas Upstream (Colunas 1 a 2) */}
        <div className="lg:col-span-2 space-y-3">
          <span className="text-[9px] font-black uppercase text-accent tracking-widest block border-b border-border pb-1">
            Entradas (Upstream)
          </span>
          <div className="space-y-2">
            {upstream.map((dep) => (
              <div
                key={dep.id}
                className="p-3.5 rounded-lg border border-border bg-secondary/35 hover:border-accent/20 transition-all text-xs font-semibold space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-primary font-bold truncate block">{dep.name}</span>
                  <span className={cn("text-[8px] font-black uppercase px-1.5 py-0.25 rounded border", HANDOFF_METADATA[dep.handoffStatus])}>
                    {dep.handoffStatus === "STABLE" ? "Estável" : dep.handoffStatus === "DELAYED" ? "Atraso" : "Crítico"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[9px] text-[#7A7268]">
                  <span>{dep.department}</span>
                  <span className="font-mono bg-white/5 border border-border px-1.5 py-0.25 rounded">{dep.system}</span>
                </div>
              </div>
            ))}
            {upstream.length === 0 && (
              <span className="text-[10px] text-muted-foreground block text-center py-4 bg-secondary/10 border border-dashed border-border rounded-lg">
                Nenhum predecessor mapeado.
              </span>
            )}
          </div>
        </div>

        {/* Setas Conectoras 1 (Coluna 3) */}
        <div className="hidden lg:flex lg:col-span-1 justify-center items-center select-none text-muted-foreground/60">
          <ArrowRight className="w-6 h-6 animate-pulse text-accent" />
        </div>

        {/* Centro: Processo Atual (Coluna 4) */}
        <div className="lg:col-span-1 flex flex-col items-center justify-center p-4 rounded-xl border-2 border-accent/30 bg-accent/5 text-center space-y-2 select-none shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-8 h-8 bg-accent/10 rounded-bl-full flex items-center justify-center">
            <Layers className="w-3.5 h-3.5 text-accent animate-pulse" />
          </div>
          <GitBranch className="w-7 h-7 text-accent" />
          <span className="text-[10px] font-black uppercase text-accent tracking-wider block">PROCESSO</span>
          <span className="text-xs font-black text-primary leading-tight block">ATIVIDADE CENTRAL</span>
        </div>

        {/* Setas Conectoras 2 (Coluna 5) */}
        <div className="hidden lg:flex lg:col-span-1 justify-center items-center select-none text-muted-foreground/60">
          <ArrowRight className="w-6 h-6 animate-pulse text-accent" />
        </div>

        {/* Lado Direito: Saídas Downstream (Colunas 6 a 7) */}
        <div className="lg:col-span-2 space-y-3">
          <span className="text-[9px] font-black uppercase text-indigo-600 tracking-widest block border-b border-border pb-1">
            Saídas (Downstream)
          </span>
          <div className="space-y-2">
            {downstream.map((dep) => (
              <div
                key={dep.id}
                className="p-3.5 rounded-lg border border-border bg-secondary/35 hover:border-accent/20 transition-all text-xs font-semibold space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-primary font-bold truncate block">{dep.name}</span>
                  <span className={cn("text-[8px] font-black uppercase px-1.5 py-0.25 rounded border", HANDOFF_METADATA[dep.handoffStatus])}>
                    {dep.handoffStatus === "STABLE" ? "Estável" : dep.handoffStatus === "DELAYED" ? "Atraso" : "Crítico"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[9px] text-[#7A7268]">
                  <span>{dep.department}</span>
                  <span className="font-mono bg-white/5 border border-border px-1.5 py-0.25 rounded">{dep.system}</span>
                </div>
              </div>
            ))}
            {downstream.length === 0 && (
              <span className="text-[10px] text-muted-foreground block text-center py-4 bg-secondary/10 border border-dashed border-border rounded-lg">
                Nenhum sucessor mapeado.
              </span>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
