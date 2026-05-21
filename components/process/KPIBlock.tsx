"use client";

import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight, CheckCircle2, Flame, Sliders } from "lucide-react";
import React from "react";

export type KPIMetricType = "LEAD_TIME" | "THROUGHPUT" | "BACKLOG" | "SLA_COMPLIANCE" | "AGING";

interface KPIBlockProps {
  type: KPIMetricType;
  title: string;
  value: string;
  unit?: string;
  change: string;
  isPositive: boolean;
  sparklineData?: number[];
  className?: string;
}

const METRIC_METADATA = {
  LEAD_TIME: {
    icon: Sliders,
    color: "text-indigo-600 dark:text-indigo-400 bg-indigo-500/5 border-indigo-200/50",
  },
  THROUGHPUT: {
    icon: CheckCircle2,
    color: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 border-emerald-200/50",
  },
  BACKLOG: {
    icon: Flame,
    color: "text-destructive bg-destructive/5 border-destructive/20",
  },
  SLA_COMPLIANCE: {
    icon: Sliders,
    color: "text-accent bg-accent/5 border-accent/20",
  },
  AGING: {
    icon: Flame,
    color: "text-amber-600 dark:text-amber-400 bg-amber-500/5 border-amber-200/50",
  },
};

export default function KPIBlock({
  type,
  title,
  value,
  unit = "",
  change,
  isPositive,
  sparklineData = [],
  className,
}: KPIBlockProps) {
  const meta = METRIC_METADATA[type] || METRIC_METADATA.LEAD_TIME;
  const Icon = meta.icon;

  // Renderiza a Sparkline SVG baseada nos dados do vetor
  const renderSparkline = () => {
    if (sparklineData.length < 2) return null;

    const width = 100;
    const height = 30;
    const padding = 2;

    const min = Math.min(...sparklineData);
    const max = Math.max(...sparklineData);
    const range = max - min === 0 ? 1 : max - min;

    const points = sparklineData
      .map((val, idx) => {
        const x = (idx / (sparklineData.length - 1)) * (width - padding * 2) + padding;
        const y = height - ((val - min) / range) * (height - padding * 2) - padding;
        return `${x},${y}`;
      })
      .join(" ");

    return (
      <svg className="w-24 h-8 text-accent select-none overflow-visible" viewBox={`0 0 ${width} ${height}`}>
        {/* Gradiente sutil linear */}
        <defs>
          <linearGradient id={`grad-${type}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.15} />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* Área sombreada sob o gráfico */}
        <path
          d={`M ${padding},${height} L ${points} L ${width - padding},${height} Z`}
          fill={`url(#grad-${type})`}
          className="transition-all duration-300"
        />

        {/* Linha principal */}
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
          className={cn(
            "transition-all duration-300",
            isPositive ? "text-emerald-500" : "text-destructive"
          )}
        />
      </svg>
    );
  };

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-background p-5 select-none shadow-sm flex items-center justify-between gap-4 transition-all hover:shadow-md hover:border-accent/20",
        className
      )}
    >
      <div className="space-y-3 flex-1 min-w-0">
        {/* Dono / Título do Bloco */}
        <div className="flex items-center gap-2">
          <div className={cn("p-1.5 rounded-lg border", meta.color)}>
            <Icon className="w-3.5 h-3.5 flex-shrink-0" />
          </div>
          <span className="text-[10px] uppercase text-muted-foreground font-black tracking-wider truncate block">
            {title}
          </span>
        </div>

        {/* Valor da Métrica */}
        <div className="flex items-baseline gap-1 select-none">
          <span className="text-2xl font-black text-primary tracking-tight leading-none">
            {value}
          </span>
          {unit && (
            <span className="text-xs font-black text-muted-foreground">
              {unit}
            </span>
          )}
        </div>

        {/* Variação em porcentagem */}
        <div className="flex items-center gap-1 text-[10px] font-black uppercase">
          {isPositive ? (
            <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" />
              {change}
            </span>
          ) : (
            <span className="text-destructive flex items-center gap-0.5">
              <ArrowDownRight className="w-3.5 h-3.5" />
              {change}
            </span>
          )}
          <span className="text-muted-foreground font-medium lowercase">vs. mês ant.</span>
        </div>
      </div>

      {/* Sparkline à direita */}
      <div className="flex flex-col items-end gap-2 flex-shrink-0 select-none">
        {renderSparkline()}
      </div>
    </div>
  );
}
