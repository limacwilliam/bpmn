"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, AlertTriangle, XOctagon } from "lucide-react";

interface OperationalHealthScoreProps {
  score: number;
  maturityLevel: string;
}

export default function OperationalHealthScore({ score, maturityLevel }: OperationalHealthScoreProps) {
  // Configurações de cores térmicas HSL
  let strokeColor = "hsl(16, 88%, 54%)"; // Laranja padrão
  let bgColor = "rgba(241, 90, 34, 0.1)";
  let textColor = "text-accent";
  let statusText = "Atenção";
  let StatusIcon = AlertTriangle;

  if (score >= 75) {
    strokeColor = "hsl(142, 70%, 49%)"; // Verde WhatsApp/Sucesso
    bgColor = "rgba(37, 211, 102, 0.1)";
    textColor = "text-[#25D366]";
    statusText = "Excelente";
    StatusIcon = ShieldCheck;
  } else if (score < 40) {
    strokeColor = "hsl(0, 84%, 60%)"; // Vermelho Destrutivo
    bgColor = "rgba(239, 68, 68, 0.1)";
    textColor = "text-destructive";
    statusText = "Crítico";
    StatusIcon = XOctagon;
  }

  // Raio do círculo do SVG
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="rounded-xl border border-border bg-background p-6 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
      <div className="w-full border-b border-border pb-3 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-black">
          Integridade Operacional
        </span>
        <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase text-muted-foreground">
          Diagnóstico de Governança
        </span>
      </div>

      <div className="relative w-36 h-36 flex items-center justify-center">
        {/* SVG Circular Progress */}
        <svg className="w-full h-full transform -rotate-90">
          {/* Círculo de Fundo */}
          <circle
            cx="72"
            cy="72"
            r={radius}
            className="stroke-secondary"
            strokeWidth="10"
            fill="transparent"
          />
          {/* Círculo de Progresso Animado */}
          <motion.circle
            cx="72"
            cy="72"
            r={radius}
            stroke={strokeColor}
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>

        {/* Informações Centrais do Gauge */}
        <div className="absolute flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-4xl font-black text-primary tracking-tighter"
          >
            {score}
          </motion.span>
          <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-bold leading-none mt-0.5">
            de 100
          </span>
        </div>
      </div>

      <div className="w-full space-y-2.5">
        <div className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-secondary/50 max-w-[200px] mx-auto">
          <StatusIcon className={`w-4.5 h-4.5 ${textColor}`} />
          <span className={`text-[11px] font-black uppercase ${textColor}`}>
            Status: {statusText}
          </span>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] text-muted-foreground font-bold block uppercase tracking-wide">
            Maturidade do Processo
          </span>
          <span className="text-sm font-black text-primary block leading-none">
            {maturityLevel}
          </span>
        </div>

        <div className="text-[10px] text-muted-foreground leading-normal max-w-xs mx-auto font-medium pt-1 border-t border-border">
          {score < 40
            ? "Muitas tarefas dependem de handoffs manuais e ferramentas informais. Alto risco de estouro de SLA."
            : score < 75
            ? "Algumas automações ativas, mas há silos operacionais latentes. Recomenda-se ajustes."
            : "Fluxos totalmente integrados por APIs de rede, webhooks e painéis inteligentes."}
        </div>
      </div>
    </div>
  );
}
