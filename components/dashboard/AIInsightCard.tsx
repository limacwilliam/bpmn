import { cn } from "@/lib/utils";
import { aiOperationalInsights } from "@/lib/enterprise-operational-data";
import { Brain, CheckCircle2, AlertTriangle, Zap } from "lucide-react";
import React, { useState } from "react";

interface AIInsight {
  id: string;
  type: "anomaly" | "optimization" | "prediction";
  title: string;
  source: string;
  description: string;
  impactMetric: string;
  buttonText: string;
  actionTaken: boolean;
}

const INITIAL_INSIGHTS: AIInsight[] = aiOperationalInsights.slice(0, 4).map((insight) => ({
  id: insight.id,
  type:
    insight.category === "risk_prediction" || insight.category === "customer_risk"
      ? "prediction"
      : insight.category === "bottleneck"
        ? "anomaly"
        : "optimization",
  title: insight.title,
  source: `${insight.category.replace("_", " ")} • ${insight.confidence}% confidence`,
  description: insight.evidence,
  impactMetric: insight.businessImpact,
  buttonText: insight.recommendation,
  actionTaken: false,
}));

export default function AIInsightCard() {
  const [insights, setInsights] = useState<AIInsight[]>(INITIAL_INSIGHTS);

  const handleAction = (id: string) => {
    setInsights((prev) =>
      prev.map((insight) =>
        insight.id === id ? { ...insight, actionTaken: true } : insight
      )
    );
  };

  return (
    <div className="rounded-2xl border border-border bg-background p-6 space-y-6 select-none flex flex-col justify-between h-full">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-accent" />
          <h3 className="font-black text-sm uppercase tracking-wider text-primary">
            Recomendações & Insights Operacionais (IA)
          </h3>
        </div>
        <span className="text-[9px] font-black bg-accent/15 text-accent px-2 py-0.5 rounded-full uppercase tracking-wider">
          Análise Preditiva
        </span>
      </div>

      {/* Lista de Insights */}
      <div className="space-y-4">
        {insights.map((insight) => {
          let typeColor = "text-accent bg-accent/10 border-accent/20";
          let typeLabel = "Otimização";
          let typeIcon = <Zap className="w-3.5 h-3.5" />;

          if (insight.type === "anomaly" || insight.type === "prediction") {
            typeColor = "text-destructive bg-destructive/10 border-destructive/20";
            typeLabel = insight.type === "prediction" ? "Predição de Risco" : "Anomalia Operacional";
            typeIcon = <AlertTriangle className="w-3.5 h-3.5" />;
          }

          return (
            <div 
              key={insight.id}
              className={cn(
                "p-4 rounded-xl border bg-secondary/10 hover:bg-secondary/20 transition-all duration-300 space-y-3.5",
                insight.actionTaken ? "border-emerald-500/30 bg-emerald-500/5" : "border-border/80"
              )}
            >
              {/* Top Banner */}
              <div className="flex items-center justify-between">
                <div className={cn("flex items-center gap-1.5 text-[9px] font-black uppercase px-2 py-0.5 rounded border", typeColor)}>
                  {typeIcon}
                  <span>{typeLabel}</span>
                </div>
                <span className="text-[9px] font-bold text-muted-foreground font-mono">{insight.id}</span>
              </div>

              {/* Title & Desc */}
              <div className="space-y-1">
                <h4 className="text-xs font-black text-primary leading-tight">{insight.title}</h4>
                <span className="text-[9px] text-[#7A7268] font-bold block uppercase tracking-wider">
                  Fonte: {insight.source}
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                  {insight.description}
                </p>
              </div>

              {/* Metric Impact */}
              <div className="p-2.5 bg-white dark:bg-background border border-border/80 rounded-lg text-[10px] font-semibold text-primary flex items-center justify-between">
                <span className="text-[#7A7268]">Impacto Projetado:</span>
                <span className={cn("font-bold", insight.type === "anomaly" ? "text-destructive" : "text-emerald-600")}>
                  {insight.impactMetric}
                </span>
              </div>

              {/* Action Button */}
              {insight.actionTaken ? (
                <div className="w-full flex items-center justify-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 border border-emerald-500/20 py-2.5 rounded-full">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mitigação Aplicada</span>
                </div>
              ) : (
                <button 
                  onClick={() => handleAction(insight.id)}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-primary text-white hover:bg-primary/90 px-4 py-2.5 rounded-full font-semibold text-xs transition-colors cursor-pointer select-none"
                >
                  <Zap className="w-3.5 h-3.5 text-accent" />
                  <span>{insight.buttonText}</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
