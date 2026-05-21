"use client";

import React, { useState } from "react";
import { AlertCircle, ShieldAlert, CheckSquare, Square, CheckCircle2 } from "lucide-react";
import { RiskDetail } from "./types";

interface RiskMatrixProps {
  risks: RiskDetail[];
}

export default function RiskMatrix({ risks: initialRisks }: RiskMatrixProps) {
  const [risks, setRisks] = useState<RiskDetail[]>(initialRisks);

  const toggleCheck = (id: string) => {
    setRisks((prev) =>
      prev.map((r) => (r.id === id ? { ...r, checked: !r.checked } : r))
    );
  };

  const getSeverityStyles = (severity: "EXTREME" | "HIGH" | "MEDIUM") => {
    switch (severity) {
      case "EXTREME":
        return {
          bg: "bg-destructive/15 border-destructive/35",
          text: "text-destructive",
          label: "Crítico / Extremo",
        };
      case "HIGH":
        return {
          bg: "bg-accent/15 border-accent/35",
          text: "text-accent",
          label: "Alto Impacto",
        };
      default:
        return {
          bg: "bg-amber-500/15 border-amber-500/35",
          text: "text-amber-600 dark:text-amber-400",
          label: "Médio Risco",
        };
    }
  };

  return (
    <div className="rounded-xl border border-border bg-background p-6 shadow-sm space-y-5">
      <div className="border-b border-border pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4.5 h-4.5 text-accent" />
          <h3 className="font-black text-sm uppercase tracking-wider text-primary">
            Matriz de Riscos &amp; Penalidades Contratuais
          </h3>
        </div>
        <span className="text-[10px] text-muted-foreground font-black uppercase tracking-wider">
          Auditoria de Contrato
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {risks.map((r) => {
          const styles = getSeverityStyles(r.severity);
          const isChecked = r.checked ?? false;

          return (
            <div
              key={r.id}
              onClick={() => toggleCheck(r.id)}
              className={`p-4 rounded-lg border text-left cursor-pointer transition-all duration-300 flex items-start gap-3 select-none ${
                isChecked
                  ? "border-emerald-500/40 bg-emerald-500/[0.03] opacity-80"
                  : "border-border bg-secondary/10 hover:bg-secondary/40"
              }`}
            >
              <div className="mt-0.5 flex-shrink-0">
                {isChecked ? (
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500" />
                ) : (
                  <Square className="w-4.5 h-4.5 text-muted-foreground hover:text-accent" />
                )}
              </div>

              <div className="space-y-2 flex-1 overflow-hidden">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-[11px] font-black uppercase ${
                      isChecked ? "text-emerald-600 dark:text-emerald-400 line-through" : "text-primary"
                    }`}
                  >
                    {r.risk}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded border text-[8px] uppercase tracking-wide font-black ${styles.bg} ${styles.text}`}
                  >
                    {styles.label}
                  </span>
                </div>

                <div className="text-[10.5px] leading-relaxed text-muted-foreground">
                  <strong className="text-primary font-bold block">Mitigação do Processo:</strong>
                  {r.mitigation}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
