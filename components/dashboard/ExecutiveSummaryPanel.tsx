import { cn } from "@/lib/utils";
import { Award, Brain, Download, HelpCircle, ShieldAlert, Sparkles, TrendingUp } from "lucide-react";
import React from "react";

export default function ExecutiveSummaryPanel() {
  const healthIndex = 88.0;

  return (
    <div className="rounded-2xl border border-border bg-[#1C1208] text-white p-6 space-y-6 select-none relative overflow-hidden shadow-xl shadow-[#1C1208]/15">
      {/* Background radial highlight */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
        {/* Score de Saúde Operacional (Left) */}
        <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left space-y-3 pb-4 lg:pb-0 lg:border-r lg:border-white/10 lg:pr-6">
          <span className="text-[10px] font-black uppercase text-accent tracking-widest block">
            Índice de Saúde Operacional
          </span>

          <div className="flex items-baseline gap-1.5 justify-center lg:justify-start">
            <span className="text-5xl font-black tracking-tight font-sans text-white">
              {healthIndex.toFixed(1)}%
            </span>
          </div>

          <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full text-[9px] font-black uppercase text-white/90">
            <TrendingUp className="w-3.5 h-3.5 text-accent animate-bounce" />
            <span>Operação Saudável (+4.8%)</span>
          </div>
        </div>

        {/* Resumo da IA / Decisões Estratégicas (Center) */}
        <div className="lg:col-span-6 space-y-3.5">
          <div className="flex items-center gap-1.5">
            <Brain className="w-4.5 h-4.5 text-accent" />
            <h3 className="font-black text-sm uppercase tracking-wider text-white">
              Veredito Executivo do HIT Lead Ops Advisor
            </h3>
          </div>

          <p className="text-white/80 leading-relaxed text-xs">
            {"A operação global da HIT segue estável com alta conformidade de SLA (96.4%). Contudo, identificamos riscos moderados no Hypercare da conta VIP da "}
            <span className="text-accent font-bold">Ambev</span> 
            {", em decorrência de latências de conciliação SAP Billing, e na validação técnica de postes do "}
            <span className="text-accent font-bold">Bradesco</span> 
            {". Recomendamos a ativação do fluxo de automação TO BE nestes eixos para mitigar R$ 480.000 em atrito contratual."}
          </p>
        </div>

        {/* Ações Rápidas Executivas (Right) */}
        <div className="lg:col-span-3 flex flex-col gap-2.5 sm:flex-row lg:flex-col items-stretch justify-center w-full">
          <button className="flex-1 inline-flex items-center justify-center gap-2 bg-accent text-white hover:bg-accent-hover px-5 py-3 rounded-full font-black text-xs transition-colors shadow-md shadow-accent/25 cursor-pointer select-none">
            <Sparkles className="w-4 h-4 text-white" />
            Iniciar Auditoria de Processo IA
          </button>
          
          <button className="flex-1 inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 border border-white/10 text-white px-5 py-3 rounded-full font-black text-xs transition-colors cursor-pointer select-none">
            <Download className="w-4 h-4" />
            Exportar Relatório Governança
          </button>
        </div>
      </div>
    </div>
  );
}
