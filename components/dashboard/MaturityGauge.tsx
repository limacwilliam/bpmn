import { cn } from "@/lib/utils";
import { Award, Compass, HelpCircle, ArrowRight, ShieldCheck } from "lucide-react";
import React from "react";

interface MaturityStage {
  level: number;
  label: string;
  description: string;
}

const MATURITY_STAGES: MaturityStage[] = [
  { level: 1, label: "Caótico", description: "Processos manuais em planilhas sem rastreabilidade." },
  { level: 2, label: "Reativo", description: "Problemas resolvidos à medida que ocorrem sem governança." },
  { level: 3, label: "Estruturado", description: "Processos desenhados e fluxos BPMN mapeados." },
  { level: 4, label: "Gerenciado", description: "SLA ativamente monitorado com métricas integradas." },
  { level: 5, label: "Escalável", description: "Hiperautomação, APIs SAP core e otimizações contínuas de IA." },
];

export default function MaturityGauge() {
  const currentLevel = 4; // Gerenciado
  const currentPercentage = 84.5; // Do nível 4 para o 5

  // SVG Gauge calculations
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  // Fazemos um arco de 270 graus (3/4 de círculo)
  const angleRange = 270;
  const arcLength = (angleRange / 360) * circumference;
  const strokeDashoffset = arcLength - (currentPercentage / 100) * arcLength;

  return (
    <div className="rounded-2xl border border-border bg-background p-6 space-y-6 select-none flex flex-col justify-between h-full">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-accent" />
          <h3 className="font-black text-sm uppercase tracking-wider text-primary">
            Nível de Maturidade Operacional
          </h3>
        </div>
        <span className="text-[9px] font-black bg-emerald-50 border border-emerald-500/20 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wider">
          Auditoria HIT
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
        {/* Velocímetro SVG (Left) */}
        <div className="sm:col-span-5 flex flex-col items-center justify-center relative">
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* SVG radial gauge */}
            <svg className="w-full h-full transform -rotate-[225deg]" viewBox="0 0 120 120">
              {/* Back track */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth={strokeWidth}
                strokeDasharray={`${arcLength} ${circumference}`}
                strokeLinecap="round"
              />
              {/* Progress track */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke="hsl(var(--accent))"
                strokeWidth={strokeWidth}
                strokeDasharray={`${arcLength} ${circumference}`}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Texto central */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pt-2">
              <span className="text-3xl font-black text-primary tracking-tight">
                {currentPercentage.toFixed(1)}%
              </span>
              <span className="text-[9px] font-black uppercase text-accent tracking-widest mt-0.5">
                Nível {currentLevel}
              </span>
            </div>
          </div>

          <span className="text-[10px] font-black text-primary uppercase text-center mt-3 tracking-wider block">
            {MATURITY_STAGES[currentLevel - 1].label}
          </span>
        </div>

        {/* Evolução dos Níveis (Right) */}
        <div className="sm:col-span-7 space-y-4">
          <div className="space-y-3">
            <span className="text-[9px] font-black uppercase text-[#7A7268] tracking-widest block">
              Marcos de Governança
            </span>

            {/* Requisitos para Nível 5 */}
            <div className="p-3 bg-secondary/15 rounded-xl border border-border space-y-2.5">
              <span className="text-[10px] font-black text-primary uppercase flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-accent" />
                <span>Requisitos p/ Nível 5 (Escalável):</span>
              </span>

              <div className="space-y-2 text-[10px] font-semibold text-primary pl-1">
                <div className="flex items-start gap-2">
                  <input type="checkbox" defaultChecked disabled className="mt-0.5 h-3.5 w-3.5 rounded text-accent bg-background border-border" />
                  <span className="line-through text-muted-foreground">Mapeamento total BPMN 2.0 dos fluxos</span>
                </div>
                <div className="flex items-start gap-2">
                  <input type="checkbox" defaultChecked disabled className="mt-0.5 h-3.5 w-3.5 rounded text-accent bg-background border-border" />
                  <span className="line-through text-muted-foreground">Monitoramento ativo de KPIs com IA</span>
                </div>
                <div className="flex items-start gap-2">
                  <input type="checkbox" disabled className="mt-0.5 h-3.5 w-3.5 rounded text-accent bg-background border-border" />
                  <span>Migrar 100% de handoffs de planilhas no OneDrive</span>
                </div>
                <div className="flex items-start gap-2">
                  <input type="checkbox" disabled className="mt-0.5 h-3.5 w-3.5 rounded text-accent bg-background border-border" />
                  <span className="text-accent">Integração final SAP ERP com validação automática</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
