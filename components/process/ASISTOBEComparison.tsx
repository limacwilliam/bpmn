"use client";

import { cn } from "@/lib/utils";
import { AlertTriangle, ArrowRight, CheckCircle2, Clock, Flame, GitBranch, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import React from "react";

interface GainMetric {
  label: string;
  asIsValue: string;
  toBeValue: string;
  gain: string;
  isPositive: boolean;
}

interface ASISTOBEComparisonProps {
  processName: string;
  asIsDescription: string;
  toBeDescription: string;
  inefficiencies: string[];
  improvements: string[];
  gains: GainMetric[];
  className?: string;
}

export default function ASISTOBEComparison({
  processName,
  asIsDescription,
  toBeDescription,
  inefficiencies = [],
  improvements = [],
  gains = [],
  className,
}: ASISTOBEComparisonProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-background p-6 space-y-8 select-none shadow-sm",
        className
      )}
    >
      {/* 1. Header do Painel Comparador */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4 gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase text-accent tracking-widest block">Dashboard de Otimização</span>
          <h3 className="font-black text-lg text-primary tracking-tight">Comparador de Jornada: {processName}</h3>
        </div>
        <span className="inline-flex items-center gap-1 bg-accent/15 text-accent border border-accent/30 text-[9px] font-black uppercase px-2.5 py-1 rounded-full select-none animate-pulse">
          <Sparkles className="w-3.5 h-3.5" /> Transformação Digital Ativa
        </span>
      </div>

      {/* 2. Split Screen Side-by-Side: AS IS vs TO BE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 select-none">
        
        {/* Lado Esquerdo: Mapeamento Corrente (AS IS) */}
        <div className="space-y-6 rounded-xl border border-border/80 bg-secondary/15 p-5 relative overflow-hidden">
          {/* Tarja de Identificação */}
          <div className="absolute top-0 right-0 w-32 h-6 bg-[#7A7268]/20 border-l border-b border-border rounded-bl-lg flex items-center justify-center text-[9px] font-black uppercase text-[#7A7268]">
            <Clock className="w-3 h-3 mr-1" /> Estado Corrente
          </div>

          <div className="space-y-2">
            <h4 className="font-black text-sm text-[#7A7268] uppercase tracking-wider flex items-center gap-1.5 pt-2">
              Mapeamento AS IS
            </h4>
            <p className="text-xs text-muted-foreground font-semibold leading-relaxed">
              {asIsDescription}
            </p>
          </div>

          {/* Ineficiências */}
          <div className="space-y-3 pt-3 border-t border-border">
            <span className="text-[10px] font-black uppercase text-destructive tracking-widest flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
              Ineficiências & Fugas Operacionais
            </span>
            <ul className="space-y-2 text-xs text-muted-foreground font-semibold">
              {inefficiencies.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-destructive/5 border border-destructive/20 p-2.5 rounded-lg">
                  <Flame className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="leading-normal">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Lado Direito: Design Ideal (TO BE) */}
        <div className="space-y-6 rounded-xl border border-accent/25 bg-accent/5 p-5 relative overflow-hidden shadow-sm">
          {/* Tarja de Identificação */}
          <div className="absolute top-0 right-0 w-32 h-6 bg-accent/20 border-l border-b border-accent/30 rounded-bl-lg flex items-center justify-center text-[9px] font-black uppercase text-accent animate-pulse">
            <Sparkles className="w-3 h-3 mr-1" /> Jornada TO BE
          </div>

          <div className="space-y-2">
            <h4 className="font-black text-sm text-accent uppercase tracking-wider flex items-center gap-1.5 pt-2">
              Design TO BE
            </h4>
            <p className="text-xs text-muted-foreground font-semibold leading-relaxed">
              {toBeDescription}
            </p>
          </div>

          {/* Melhorias */}
          <div className="space-y-3 pt-3 border-t border-accent/20">
            <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-widest flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
              Melhorias & Automações Projetadas
            </span>
            <ul className="space-y-2 text-xs text-muted-foreground font-semibold">
              {improvements.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="leading-normal">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      {/* 3. Bloco de Ganhos Operacionais Comparados */}
      <div className="space-y-4 pt-4 border-t border-border select-none">
        <h4 className="font-black text-xs text-primary uppercase tracking-wider">Métricas de Retorno Projetadas (Gains)</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gains.map((gain, idx) => (
            <div key={idx} className="rounded-xl border border-border bg-secondary/15 p-4 space-y-3">
              <span className="text-[9px] font-black uppercase text-[#7A7268] tracking-wider block border-b border-border pb-1">
                {gain.label}
              </span>
              
              <div className="flex items-center justify-between font-semibold text-xs gap-3">
                <div className="space-y-0.5">
                  <span className="text-[9px] text-[#7A7268] block">No AS IS</span>
                  <span className="font-black text-[#7A7268] line-through">{gain.asIsValue}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-accent animate-pulse" />
                <div className="space-y-0.5">
                  <span className="text-[9px] text-accent block">No TO BE</span>
                  <span className="font-black text-primary text-sm">{gain.toBeValue}</span>
                </div>
              </div>

              {/* Tag de ganho final */}
              <div className="flex items-center justify-between text-[10px] font-black uppercase pt-1 border-t border-border/50">
                <span className="text-muted-foreground">Retorno Operacional</span>
                <span className={cn("flex items-center gap-0.5", gain.isPositive ? "text-emerald-600" : "text-destructive")}>
                  <TrendingUp className="w-3.5 h-3.5" />
                  {gain.gain}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
