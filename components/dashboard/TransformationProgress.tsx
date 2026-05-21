import { cn } from "@/lib/utils";
import { ArrowDown, CheckCircle2, ChevronRight, SlidersHorizontal, Sparkles, TrendingUp } from "lucide-react";
import React from "react";

interface DeptAdoption {
  department: string;
  adoptionRate: number; // 0-100%
  status: "completed" | "in_progress" | "planned";
  gainDescription: string;
}

const DEPT_ADOPTIONS: DeptAdoption[] = [
  {
    department: "Comercial / Vendas",
    adoptionRate: 90,
    status: "in_progress",
    gainDescription: "Substituição das planilhas locais pelo Wizard centralizado.",
  },
  {
    department: "NOC Técnico",
    adoptionRate: 80,
    status: "in_progress",
    gainDescription: "Automatização de scripts CLI de provisionamento via API.",
  },
  {
    department: "Logística / Almoxarifado",
    adoptionRate: 60,
    status: "in_progress",
    gainDescription: "Conexão ativa de rastreabilidade física de switches.",
  },
  {
    department: "SAP Billing / Financeiro",
    adoptionRate: 45,
    status: "in_progress",
    gainDescription: "Webhook integrado SAP para start automatizado de cobrança.",
  },
];

export default function TransformationProgress() {
  return (
    <div className="rounded-2xl border border-border bg-background p-6 space-y-6 select-none flex flex-col justify-between h-full">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4 gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-accent" />
            <h3 className="font-black text-sm uppercase tracking-wider text-primary">
              Indicador de Evolução e Ganhos (TO BE)
            </h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Acompanhe a redução de latências globais e a migração de fluxos para o modelo digital.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Painel Comparativo de Tempo (Left) */}
        <div className="md:col-span-5 border border-border bg-secondary/15 rounded-2xl p-5 space-y-4 flex flex-col justify-center">
          <span className="text-[10px] font-black uppercase text-[#7A7268] tracking-widest text-center block">
            Tempo Médio de Ciclo Global
          </span>

          <div className="flex items-center justify-around py-3">
            {/* AS IS */}
            <div className="text-center space-y-1">
              <span className="text-[10px] font-black text-muted-foreground uppercase bg-secondary px-2.5 py-0.5 rounded-full border border-border">
                Legado AS IS
              </span>
              <div className="text-2xl font-black text-[#1C1208] tracking-tight">120h</div>
              <span className="text-[9px] text-[#7A7268] font-bold">Processamento Manual</span>
            </div>

            {/* Setinha */}
            <div className="flex flex-col items-center text-accent animate-pulse">
              <ChevronRight className="w-6 h-6 rotate-90 md:rotate-0" />
              <span className="text-[8px] font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md mt-1">
                -80% Tempo
              </span>
            </div>

            {/* TO BE */}
            <div className="text-center space-y-1">
              <span className="text-[10px] font-black text-accent uppercase bg-accent/10 px-2.5 py-0.5 rounded-full">
                Modelo TO BE
              </span>
              <div className="text-2xl font-black text-accent tracking-tight">24h</div>
              <span className="text-[9px] text-accent font-bold">Integração Total API</span>
            </div>
          </div>

          <div className="p-3.5 bg-white dark:bg-background rounded-xl border border-border space-y-1 text-xs">
            <span className="font-bold text-primary flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>Eficiência Operacional Alcançada:</span>
            </span>
            <p className="text-muted-foreground leading-normal text-[10.5px]">
              Economia estimada de R$ 34.000 por semana em atritos operacionais evitados e melhoria substancial no Hypercare.
            </p>
          </div>
        </div>

        {/* Progresso de Adoção por Setor (Right) */}
        <div className="md:col-span-7 space-y-3.5">
          <span className="text-[10px] font-black uppercase text-[#7A7268] tracking-widest block">
            Taxa de Adoção por Departamento
          </span>

          <div className="space-y-3">
            {DEPT_ADOPTIONS.map((dept, idx) => {
              const isCompleted = dept.adoptionRate === 100;
              return (
                <div key={idx} className="space-y-1.5 p-3 border border-border/80 bg-secondary/5 rounded-xl hover:bg-secondary/15 transition-colors">
                  <div className="flex justify-between items-center text-[11px] font-bold">
                    <span className="text-primary leading-none">{dept.department}</span>
                    <span className="text-accent leading-none">{dept.adoptionRate}%</span>
                  </div>

                  {/* Barra HSL */}
                  <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent rounded-full transition-all duration-300"
                      style={{ width: `${dept.adoptionRate}%` }}
                    />
                  </div>

                  <p className="text-[9px] text-[#7A7268] leading-tight font-semibold mt-1">
                    {dept.gainDescription}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
