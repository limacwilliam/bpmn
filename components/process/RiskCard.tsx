"use client";

import { cn } from "@/lib/utils";
import { AlertCircle, AlertOctagon, ShieldAlert, ShieldCheck } from "lucide-react";
import React from "react";

export type RiskSeverityType = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type RiskCategoryType = "OPERATIONAL" | "CUSTOMER_SUCCESS" | "SLA_COMPLIANCE" | "CHURN_RISK";

interface RiskCardProps {
  title: string;
  category: RiskCategoryType;
  severity: RiskSeverityType;
  description: string;
  mitigation: string;
  className?: string;
}

const CATEGORY_LABELS = {
  OPERATIONAL: "Risco Operacional",
  CUSTOMER_SUCCESS: "Risco de CS",
  SLA_COMPLIANCE: "Risco de SLA",
  CHURN_RISK: "Risco de Churn",
};

const SEVERITY_METADATA = {
  LOW: {
    label: "Baixo",
    color: "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/40",
    Icon: ShieldCheck,
  },
  MEDIUM: {
    label: "Médio",
    color: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/40",
    Icon: AlertCircle,
  },
  HIGH: {
    label: "Alto",
    color: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/40",
    Icon: ShieldAlert,
  },
  CRITICAL: {
    label: "Crítico",
    color: "bg-destructive/10 text-destructive border-destructive/20 animate-pulse",
    Icon: AlertOctagon,
  },
};

export default function RiskCard({
  title,
  category,
  severity,
  description,
  mitigation,
  className,
}: RiskCardProps) {
  const meta = SEVERITY_METADATA[severity] || SEVERITY_METADATA.MEDIUM;
  const Icon = meta.Icon;

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-background p-5 space-y-4 select-none shadow-sm transition-all hover:shadow-md hover:border-accent/20",
        className
      )}
    >
      {/* 1. Header do Risco */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="space-y-0.5">
          <span className="text-[9px] font-black uppercase text-[#7A7268] tracking-widest block">
            {CATEGORY_LABELS[category] || "Risco Corporativo"}
          </span>
          <h4 className="font-bold text-xs text-primary truncate max-w-[200px] sm:max-w-xs">{title}</h4>
        </div>

        <span className={cn("inline-flex items-center gap-1 text-[9px] font-black uppercase px-2 py-0.5 rounded-full border select-none", meta.color)}>
          <Icon className="w-2.5 h-2.5 flex-shrink-0" />
          {meta.label}
        </span>
      </div>

      {/* 2. Descrição do Risco */}
      <p className="text-xs text-muted-foreground font-semibold leading-relaxed">
        {description}
      </p>

      {/* 3. Ações de Mitigação */}
      <div className="p-3 bg-secondary/60 border border-border rounded-lg text-xs space-y-1 font-semibold">
        <span className="text-[9px] uppercase text-accent font-black block">Plano de Mitigação Cadastrado</span>
        <p className="text-primary font-medium leading-normal">{mitigation}</p>
      </div>
    </div>
  );
}
