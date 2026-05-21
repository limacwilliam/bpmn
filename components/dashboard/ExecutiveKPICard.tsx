import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight, AlertTriangle, LucideIcon } from "lucide-react";
import React, { useMemo } from "react";

interface ExecutiveKPICardProps {
  title: string;
  value: string;
  unit?: string;
  change: string;
  isPositive: boolean;
  icon: LucideIcon;
  description: string;
  sparklineData: number[];
  isAlert?: boolean;
  alertText?: string;
  onClick?: () => void;
  isActive?: boolean;
}

export default function ExecutiveKPICard({
  title,
  value,
  unit,
  change,
  isPositive,
  icon: IconComponent,
  description,
  sparklineData,
  isAlert = false,
  alertText,
  onClick,
  isActive = false,
}: ExecutiveKPICardProps) {
  // Gera o caminho do path SVG do mini-gráfico linear de forma simplificada e ultra-leve
  const sparklinePath = useMemo(() => {
    if (!sparklineData || sparklineData.length < 2) return "";
    
    const width = 140;
    const height = 40;
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
    <div
      onClick={onClick}
      className={cn(
        "group relative h-full rounded-2xl border p-6 bg-background transition-all duration-300 ease-in-out select-none cursor-pointer flex flex-col justify-between",
        isActive 
          ? "border-accent ring-2 ring-accent/20 shadow-lg shadow-accent/5 -translate-y-1" 
          : "border-border hover:border-accent hover:shadow-md hover:-translate-y-0.5",
        isAlert && "border-destructive/50 ring-1 ring-destructive/10 animate-border-glow"
      )}
    >
      {/* Indicador de Hover no topo */}
      <div 
        className={cn(
          "absolute top-0 left-0 right-0 h-1 transition-transform duration-300 rounded-t-2xl",
          isActive ? "scale-x-100 bg-accent" : "scale-x-0 group-hover:scale-x-100 bg-accent",
          isAlert && "bg-destructive scale-x-100"
        )} 
      />

      <div>
        <div className="flex items-start justify-between gap-4">
          {/* Infos do KPI */}
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block">
              {title}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl md:text-4xl font-black text-primary tracking-tight font-sans">
                {value}
              </span>
              {unit && (
                <span className="text-sm font-bold text-muted-foreground">{unit}</span>
              )}
            </div>
          </div>

          {/* Icone com fundo HSL suave correspondente */}
          <div 
            className={cn(
              "w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300",
              isActive 
                ? "bg-accent text-white" 
                : "bg-secondary text-primary group-hover:bg-accent group-hover:text-white",
              isAlert && "bg-destructive/10 text-destructive group-hover:bg-destructive group-hover:text-white"
            )}
          >
            <IconComponent className="w-5 h-5 transition-transform group-hover:scale-110" />
          </div>
        </div>

        {/* Badge de Alerta se crítico */}
        {isAlert && alertText && (
          <div className="mt-3 flex items-center gap-1.5 text-[10px] font-bold text-destructive bg-destructive/10 px-2.5 py-1 rounded-full w-max select-none">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{alertText}</span>
          </div>
        )}
      </div>

      {/* Mini-Gráfico (Sparkline) e Variação */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50">
        {/* Tendência */}
        <div className="flex flex-col gap-0.5">
          <div
            className={cn(
              "flex items-center text-xs font-black",
              isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"
            )}
          >
            {isPositive ? (
              <ArrowUpRight className="w-4 h-4 mr-0.5" />
            ) : (
              <ArrowDownRight className="w-4 h-4 mr-0.5" />
            )}
            <span>{change}</span>
          </div>
          <span className="text-[9px] text-[#7A7268] font-bold uppercase tracking-wider">
            {description}
          </span>
        </div>

        {/* Sparkline SVG */}
        {sparklinePath && (
          <div className="w-[120px] h-[32px] overflow-hidden opacity-75 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="w-full h-full" viewBox="0 0 140 40">
              {/* Sombra de preenchimento suave sob o gráfico */}
              <defs>
                <linearGradient id={`grad-${title.replace(/\s+/g, "")}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={isPositive ? "#10B981" : "#EF4444"} stopOpacity="0.2" />
                  <stop offset="100%" stopColor={isPositive ? "#10B981" : "#EF4444"} stopOpacity="0.0" />
                </linearGradient>
              </defs>
              
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
