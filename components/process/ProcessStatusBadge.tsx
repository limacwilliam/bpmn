"use client";

import { cn } from "@/lib/utils";
import { Activity, Clock, Flame, ShieldAlert } from "lucide-react";
import React from "react";

export type ProcessStatusType = "DRAFT" | "ACTIVE" | "OPTIMIZING" | "DEPRECATED";
export type ProcessType = "AS_IS" | "TO_BE";

interface ProcessStatusBadgeProps {
  status?: ProcessStatusType;
  type?: ProcessType;
  className?: string;
}

export default function ProcessStatusBadge({
  status,
  type,
  className,
}: ProcessStatusBadgeProps) {
  // Renderiza o badge de tipo (AS IS / TO BE)
  if (type) {
    const isToBe = type === "TO_BE";
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase border select-none transition-all duration-200",
          isToBe
            ? "bg-accent/10 text-accent border-accent/30 shadow-sm shadow-accent/5 animate-pulse"
            : "bg-[#7A7268]/10 text-[#7A7268] border-[#7A7268]/30",
          className
        )}
      >
        {isToBe ? (
          <>
            <Activity className="w-3 h-3 text-accent animate-pulse" />
            Jornada TO BE
          </>
        ) : (
          <>
            <Clock className="w-3 h-3 text-[#7A7268]" />
            Mapeamento AS IS
          </>
        )}
      </span>
    );
  }

  // Renderiza o badge de status (DRAFT, ACTIVE, OPTIMIZING, DEPRECATED)
  if (status) {
    let colorClasses = "";
    let label = "";
    let IconComponent: React.ComponentType<{ className?: string }> | null = null;

    switch (status) {
      case "ACTIVE":
        colorClasses = "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/40";
        label = "Ativo em Produção";
        break;
      case "OPTIMIZING":
        colorClasses = "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/40 animate-pulse";
        label = "Em Otimização";
        IconComponent = Flame;
        break;
      case "DEPRECATED":
        colorClasses = "bg-destructive/10 text-destructive border-destructive/20";
        label = "Obsoleto / Substituído";
        IconComponent = ShieldAlert;
        break;
      case "DRAFT":
      default:
        colorClasses = "bg-secondary text-primary border-border dark:bg-secondary/40 dark:text-foreground";
        label = "Rascunho de Modelagem";
        break;
    }

    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold border select-none transition-all duration-200",
          colorClasses,
          className
        )}
      >
        {IconComponent && <IconComponent className="w-3 h-3 flex-shrink-0" />}
        {label}
      </span>
    );
  }

  return null;
}
