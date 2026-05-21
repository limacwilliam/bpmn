"use client";

import React, { useState } from "react";
import { User, ClipboardList, CheckCircle2, ChevronDown, Check, Send } from "lucide-react";
import { AIRecommendation } from "./types";

interface AIRecommendationsProps {
  recommendations: AIRecommendation[];
}

export default function AIRecommendations({ recommendations }: AIRecommendationsProps) {
  const [expandedId, setExpandedId] = useState<string | null>(recommendations[0]?.id || null);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [notifiedOwners, setNotifiedOwners] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const toggleStep = (stepKey: string) => {
    setCompletedSteps((prev) => ({ ...prev, [stepKey]: !prev[stepKey] }));
  };

  const triggerNotification = (e: React.MouseEvent, recId: string, owner: string) => {
    e.stopPropagation();
    setNotifiedOwners((prev) => ({ ...prev, [recId]: true }));
    setTimeout(() => {
      alert(`Notificação de governança e SLA disparada via Teams/Email com sucesso para o proprietário: ${owner}`);
    }, 200);
  };

  return (
    <div className="rounded-xl border border-border bg-background p-6 shadow-sm space-y-5">
      <div className="border-b border-border pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-4.5 h-4.5 text-accent" />
          <h3 className="font-black text-sm uppercase tracking-wider text-primary">
            Planos de Ação Operacionais &amp; Responsáveis
          </h3>
        </div>
        <span className="text-[10px] text-muted-foreground font-black uppercase tracking-wider">
          {recommendations.length} Iniciativas
        </span>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => {
          const isExpanded = expandedId === rec.id;
          const isNotified = notifiedOwners[rec.id] ?? false;

          return (
            <div
              key={rec.id}
              className={`rounded-lg border transition-all duration-300 ${
                isExpanded ? "border-accent bg-accent/[0.01]" : "border-border bg-secondary/15 hover:bg-secondary/35"
              }`}
            >
              {/* Header da Recomendação */}
              <div
                onClick={() => toggleExpand(rec.id)}
                className="p-4 flex items-center justify-between gap-4 cursor-pointer select-none"
              >
                <div className="space-y-1">
                  <span className="text-xs font-black text-primary leading-tight block">
                    {rec.title}
                  </span>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-semibold">
                    <User className="w-3 h-3 text-accent" />
                    <span>Dono do Fluxo: <strong className="text-primary font-bold">{rec.owner}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => triggerNotification(e, rec.id, rec.owner)}
                    disabled={isNotified}
                    className={`px-3 py-1.5 rounded text-[9px] uppercase font-black cursor-pointer inline-flex items-center gap-1 transition-all ${
                      isNotified
                        ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                        : "bg-primary text-primary-foreground hover:bg-primary/95 border border-primary hover:-translate-y-0.5 shadow-sm"
                    }`}
                  >
                    {isNotified ? (
                      <>
                        <Check className="w-3 h-3" />
                        Cobrado!
                      </>
                    ) : (
                      <>
                        <Send className="w-3 h-3" />
                        Disparar Alerta
                      </>
                    )}
                  </button>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${
                      isExpanded ? "transform rotate-180 text-accent" : ""
                    }`}
                  />
                </div>
              </div>

              {/* Corpo da Recomendação */}
              {isExpanded && (
                <div className="px-4 pb-4.5 pt-1 border-t border-border/60 text-[11px] space-y-3">
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-black block">
                    Checklist de Implantação do Modelo TO BE:
                  </span>
                  <div className="space-y-2.5">
                    {rec.steps.map((step, idx) => {
                      const stepKey = `${rec.id}-step-${idx}`;
                      const isStepCompleted = completedSteps[stepKey] ?? false;

                      return (
                        <div
                          key={idx}
                          onClick={() => toggleStep(stepKey)}
                          className="flex items-center gap-3 cursor-pointer select-none group"
                        >
                          <div
                            className={`w-4.5 h-4.5 rounded border flex items-center justify-center shrink-0 transition-all ${
                              isStepCompleted
                                ? "bg-emerald-500 border-emerald-600 text-white"
                                : "border-border bg-background group-hover:border-accent"
                            }`}
                          >
                            {isStepCompleted && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span
                            className={`font-semibold leading-relaxed ${
                              isStepCompleted ? "text-muted-foreground line-through" : "text-primary"
                            }`}
                          >
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
