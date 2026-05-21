import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight, LucideIcon } from "lucide-react";
import React, { useMemo } from "react";

interface MetricCardProps {
  title: string;
  value: string;
  unit?: string;
  change: string;
  isPositive: boolean;
  icon: LucideIcon;
  description: string;
  sparklineData: number[]; // Lista de números para desenhar a linha do mini-gráfico SVG
}

export default function MetricCard({
  title,
  value,
  unit,
  change,
  isPositive,
  icon: IconComponent,
  description,
  sparklineData,
}: MetricCardProps) {
  // Gera o caminho do path SVG do mini-gráfico linear de forma simplificada e ultra-leve
  const sparklinePath = useMemo(() => {
    if (!sparklineData || sparklineData.length < 2) return "";
    
    const width = 120;
    const height = 30;
    const maxVal = Math.max(...sparklineData);
    const minVal = Math.min(...sparklineData);
    const range = maxVal - minVal || 1;

    const points = sparklineData.map((val, idx) => {
      const x = (idx / (sparklineData.length - 1)) * width;
      // Inverte o eixo Y pois 0 é no topo
      const y = height - ((val - minVal) / range) * height;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });

    return `M ${points.join(" L ")}`;
  }, [sparklineData]);

  return (
    <div className="group relative rounded-xl border border-border p-6 bg-background hover:border-accent hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 ease-in-out select-none">
      {/* Indicador de Hover no topo */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-xl" />

      <div className="flex items-start justify-between">
        {/* Infos do KPI */}
        <div className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block select-none">
            {title}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl md:text-4xl font-black text-primary tracking-tight">
              {value}
            </span>
            {unit && (
              <span className="text-sm font-bold text-muted-foreground">{unit}</span>
            )}
          </div>
        </div>

        {/* Icone com fundo HSL suave correspondente */}
        <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
          <IconComponent className="w-5 h-5 transition-transform group-hover:scale-110" />
        </div>
      </div>

      {/* Mini-Gráfico (Sparkline) e Variação */}
      <div className="flex items-center justify-between mt-6">
        {/* Tendência */}
        <div className="flex flex-col gap-0.5">
          <div
            className={cn(
              "flex items-center text-xs font-black select-none",
              isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"
            )}
          >
            {isPositive ? (
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
            )}
            <span>{change}</span>
          </div>
          <span className="text-[10px] text-muted-foreground font-semibold">
            {description}
          </span>
        </div>

        {/* Sparkline SVG */}
        {sparklinePath && (
          <div className="w-[120px] h-[30px] overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="w-full h-full">
              <path
                d={sparklinePath}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn(
                  isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"
                )}
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}


