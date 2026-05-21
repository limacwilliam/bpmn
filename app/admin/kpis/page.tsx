import {
  ArrowDown,
  ArrowUp,
  SlidersHorizontal,
  Plus,
  Search,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import React from "react";

// Mock de dados de KPIs operacionais e SLAs associados
const KPI_REGISTRY = [
  {
    id: "KPI-001",
    name: "Tempo de Onboarding de Clientes",
    process: "Onboarding de Clientes",
    target: 24, // horas
    current: 20.8, // horas
    unit: "h",
    slaThreshold: 24, // acima disso estoura SLA
    status: "OK",
    trend: "-12.5%", // queda de tempo é bom
    isPositive: true,
  },
  {
    id: "KPI-002",
    name: "Latência de Conciliação SAP",
    process: "Faturamento Automatizado",
    target: 1, // hora
    current: 2.2, // horas
    unit: "h",
    slaThreshold: 1,
    status: "VIOLATED",
    trend: "+120.0%", // aumento de tempo é ruim
    isPositive: false,
  },
  {
    id: "KPI-003",
    name: "Tempo de Resposta de Suporte N3",
    process: "Suporte e Provisionamento Cloud",
    target: 4, // horas
    current: 3.1, // horas
    unit: "h",
    slaThreshold: 4,
    status: "OK",
    trend: "-8.3%",
    isPositive: true,
  },
  {
    id: "KPI-004",
    name: "Taxa de Sucesso de Deploy",
    process: "Suporte e Provisionamento Cloud",
    target: 98.0, // %
    current: 96.5, // %
    unit: "%",
    slaThreshold: 97.0, // abaixo disso é alerta
    status: "WARNING",
    trend: "-1.5%",
    isPositive: false,
  },
];

export default function KpisPage() {
  return (
    <div className="space-y-8 select-none">
      {/* 1. Header do Módulo */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-black text-primary tracking-tight">
            Gestão de KPIs e SLAs
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Monitoramento de tempos de resposta, cumprimento de metas operacionais e alarmes de estouros de SLAs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 bg-accent text-white hover:bg-accent-hover px-5 py-2.5 rounded-full font-semibold text-xs transition-colors shadow-md shadow-accent/25 cursor-pointer">
            <Plus className="w-3.5 h-3.5" />
            Configurar Alarme SLA
          </button>
        </div>
      </div>

      {/* 2. Grid de Resumo dos SLAs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-semibold">
        {/* Card 1: Total Protegido */}
        <div className="rounded-xl border border-border bg-background p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">SLAs Saudáveis</span>
            <span className="text-2xl font-black text-primary leading-none mt-1 block">75% (3/4)</span>
          </div>
        </div>

        {/* Card 2: Críticos */}
        <div className="rounded-xl border border-border bg-background p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">Estouros Ativos</span>
            <span className="text-2xl font-black text-destructive leading-none mt-1 block">1 Processo</span>
          </div>
        </div>

        {/* Card 3: Eficiência Total */}
        <div className="rounded-xl border border-border bg-background p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">Meta Geral Corporativa</span>
            <span className="text-2xl font-black text-primary leading-none mt-1 block">95.0%</span>
          </div>
        </div>
      </div>

      {/* 3. Tabela de Monitoramento de SLAs */}
      <div className="rounded-xl border border-border bg-background overflow-hidden shadow-sm">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse text-xs font-semibold text-primary">
            <thead className="bg-secondary text-[10px] font-black uppercase tracking-wider text-muted-foreground border-b border-border">
              <tr>
                <th className="py-4 px-6">ID / Indicador</th>
                <th className="py-4 px-6">Processo Vinculado</th>
                <th className="py-4 px-6">Progresso / Status</th>
                <th className="py-4 px-6">Meta vs. Atual</th>
                <th className="py-4 px-6">Tendência</th>
                <th className="py-4 px-6 text-right">Configurações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-medium">
              {KPI_REGISTRY.map((kpi, idx) => {
                // Calcula a porcentagem do progresso para a barra visual
                const percentage = Math.min((kpi.current / kpi.target) * 100, 100);
                
                return (
                  <tr key={idx} className="hover:bg-muted/40 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-bold text-primary text-sm hover:text-accent transition-colors cursor-pointer">
                          {kpi.name}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-mono">
                          {kpi.id}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-muted-foreground">{kpi.process}</td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-2 w-48 font-semibold">
                        {/* Barra de Progresso Visível Baseada HSL da HIT */}
                        <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                          <div
                            className={
                              kpi.status === "VIOLATED"
                                ? "h-full bg-destructive rounded-full"
                                : kpi.status === "WARNING"
                                ? "h-full bg-amber-500 rounded-full"
                                : "h-full bg-accent rounded-full"
                            }
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-[10px]">
                          <span
                            className={
                              kpi.status === "VIOLATED"
                                ? "text-destructive font-black"
                                : kpi.status === "WARNING"
                                ? "text-amber-600 font-black"
                                : "text-emerald-600 font-black"
                            }
                          >
                            {kpi.status === "VIOLATED"
                              ? "Estourado"
                              : kpi.status === "WARNING"
                              ? "Aviso Próximo"
                              : "Operando OK"}
                          </span>
                          <span className="text-muted-foreground">{percentage.toFixed(0)}%</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-bold text-primary">
                      {kpi.current} {kpi.unit} <span className="text-muted-foreground font-medium">/ {kpi.target} {kpi.unit}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div
                        className={
                          kpi.isPositive ? "text-emerald-600 font-bold flex items-center" : "text-destructive font-bold flex items-center"
                        }
                      >
                        {kpi.isPositive ? (
                          <ArrowDown className="w-3.5 h-3.5 mr-0.5" />
                        ) : (
                          <ArrowUp className="w-3.5 h-3.5 mr-0.5" />
                        )}
                        <span>{kpi.trend}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="h-8 px-3 rounded-lg border border-border bg-secondary hover:bg-muted text-primary text-[11px] font-bold transition-all cursor-pointer">
                        Editar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export const metadata = {
  title: "Gestão de KPIs e SLAs - HIT Governance",
  description: "Monitoramento de indicadores chaves e compliance de acordos de nível de serviço.",
};
