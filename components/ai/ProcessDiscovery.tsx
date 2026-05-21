"use client";

import React, { useState } from "react";
import { ArrowRight, Layers, Shuffle, CheckCircle, Radio } from "lucide-react";
import { ProcessStep } from "./types";

interface ProcessDiscoveryProps {
  steps: ProcessStep[];
}

export default function ProcessDiscovery({ steps }: ProcessDiscoveryProps) {
  const [viewMode, setViewMode] = useState<"side" | "timeline">("side");

  const asIsSteps = steps.filter((s) => s.mode === "AS_IS");
  const toBeSteps = steps.filter((s) => s.mode === "TO_BE");

  const getStepTypeColor = (type: string) => {
    switch (type) {
      case "START":
        return "bg-emerald-500 text-white border-emerald-600";
      case "END":
        return "bg-violet-600 text-white border-violet-700";
      case "SYSTEM_TASK":
        return "bg-accent text-white border-accent-hover";
      case "USER_TASK":
        return "bg-[#281F17] text-white border-primary";
      default:
        return "bg-secondary text-primary border-border";
    }
  };

  return (
    <div className="rounded-xl border border-border bg-background p-6 shadow-sm space-y-6">
      <div className="border-b border-border pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4.5 h-4.5 text-accent" />
          <h3 className="font-black text-sm uppercase tracking-wider text-primary">
            Descoberta Automática de Processo (AS IS vs TO BE)
          </h3>
        </div>

        <div className="flex items-center bg-secondary/80 border border-border p-1 rounded-lg">
          <button
            onClick={() => setViewMode("side")}
            className={`px-3 py-1 text-[10px] font-black uppercase rounded transition-all cursor-pointer ${
              viewMode === "side" ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-primary"
            }`}
          >
            Lado a Lado
          </button>
          <button
            onClick={() => setViewMode("timeline")}
            className={`px-3 py-1 text-[10px] font-black uppercase rounded transition-all cursor-pointer ${
              viewMode === "timeline" ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-primary"
            }`}
          >
            Timeline Otimizada
          </button>
        </div>
      </div>

      {viewMode === "side" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
          {/* Fluxo AS IS (Atual) */}
          <div className="space-y-4 rounded-xl border border-border bg-secondary/10 p-5">
            <div className="flex items-center justify-between border-b border-border pb-2.5">
              <span className="text-[11px] font-black uppercase tracking-wider text-destructive flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-destructive animate-pulse" />
                Modelo AS IS (Atual - Gargalos)
              </span>
              <span className="text-[9px] text-muted-foreground font-black uppercase">
                {asIsSteps.length} Passos discutidos
              </span>
            </div>

            <div className="space-y-3 relative pl-3 border-l-2 border-dashed border-border/80">
              {asIsSteps.map((step, idx) => (
                <div key={step.id} className="relative flex items-center gap-3 group">
                  <div className="absolute -left-[19px] w-2.5 h-2.5 rounded-full border bg-background border-border group-hover:border-destructive transition-colors" />
                  
                  <div className="flex-1 bg-background border border-border rounded-lg p-3 transition-all hover:translate-x-0.5 shadow-sm flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="text-[11px] font-black text-primary block leading-none">
                        {step.title}
                      </span>
                      <span className="text-[9px] text-muted-foreground font-semibold block uppercase">
                        Raia: {step.lane}
                      </span>
                    </div>
                    <span className="bg-destructive/15 px-2 py-0.5 rounded border border-destructive/25 text-[8px] uppercase tracking-wide text-destructive font-black">
                      {step.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Divisor Visuall de Transição */}
          <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-accent text-white items-center justify-center border-2 border-background shadow-md">
            <Shuffle className="w-4 h-4" />
          </div>

          {/* Fluxo TO BE (Proposto) */}
          <div className="space-y-4 rounded-xl border border-border bg-accent/[0.02] p-5">
            <div className="flex items-center justify-between border-b border-border pb-2.5">
              <span className="text-[11px] font-black uppercase tracking-wider text-accent flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-accent" />
                Modelo TO BE (Alvo - Otimizado)
              </span>
              <span className="text-[9px] text-muted-foreground font-black uppercase">
                {toBeSteps.length} Passos estruturados
              </span>
            </div>

            <div className="space-y-3 relative pl-3 border-l-2 border-dashed border-accent/25">
              {toBeSteps.map((step, idx) => (
                <div key={step.id} className="relative flex items-center gap-3 group">
                  <div className="absolute -left-[19px] w-2.5 h-2.5 rounded-full border bg-background border-border group-hover:border-accent transition-colors" />
                  
                  <div className="flex-1 bg-background border border-border hover:border-accent/40 rounded-lg p-3 transition-all hover:translate-x-0.5 shadow-sm flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="text-[11px] font-black text-primary block leading-none">
                        {step.title}
                      </span>
                      <span className="text-[9px] text-muted-foreground font-semibold block uppercase">
                        Raia: {step.lane}
                      </span>
                    </div>
                    <span className="bg-accent/15 px-2 py-0.5 rounded border border-accent/25 text-[8px] uppercase tracking-wide text-accent font-black">
                      {step.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-secondary/25 border border-border p-6 rounded-xl space-y-6">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-black block">
            Jornada do Fluxo de Trabalho Integrada (TO BE)
          </span>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 overflow-x-auto pb-4 custom-scrollbar">
            {toBeSteps.map((step, idx) => (
              <div key={step.id} className="flex items-center gap-2 shrink-0 md:max-w-[130px]">
                <div className="space-y-2 text-center md:text-left">
                  <div className={`mx-auto md:mx-0 w-8 h-8 rounded-full border flex items-center justify-center text-[10px] font-bold shadow-sm ${getStepTypeColor(step.type)}`}>
                    0{idx + 1}
                  </div>
                  <div>
                    <span className="text-[10.5px] font-black text-primary block leading-tight truncate md:whitespace-normal">
                      {step.title}
                    </span>
                    <span className="text-[8px] text-muted-foreground uppercase font-semibold block mt-0.5">
                      {step.lane}
                    </span>
                  </div>
                </div>
                {idx < toBeSteps.length - 1 && (
                  <ArrowRight className="hidden md:block w-4.5 h-4.5 text-muted-foreground ml-2 shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
