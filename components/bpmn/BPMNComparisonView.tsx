"use client";

import React from "react";
import {
  ArrowRight,
  TrendingDown,
  Zap,
  Flame,
  CheckCircle,
  HelpCircle,
  Percent,
  Clock,
  Briefcase,
  AlertTriangle
} from "lucide-react";
import { processStats } from "./mockData";

export default function BPMNComparisonView() {
  const asIs = processStats.AS_IS;
  const toBe = processStats.TO_BE;

  const comparisonRows = [
    {
      metric: "Tempo de Ciclo (E2E)",
      asIsVal: asIs.totalDuration,
      toBeVal: toBe.totalDuration,
      gain: "Redução de ~96%",
      isPositive: true
    },
    {
      metric: "Conformidade de SLA",
      asIsVal: asIs.slaCompliance,
      toBeVal: toBe.slaCompliance,
      gain: "Aumento de +37.4%",
      isPositive: true
    },
    {
      metric: "Handoffs Interdepartamentais",
      asIsVal: asIs.averageHandoffs,
      toBeVal: toBe.averageHandoffs,
      gain: "Redução de 75%",
      isPositive: true
    },
    {
      metric: "Taxa de Automação",
      asIsVal: asIs.automatedTasks,
      toBeVal: toBe.automatedTasks,
      gain: "Salto de 0% para 70%",
      isPositive: true
    },
    {
      metric: "Riscos Críticos de Operação",
      asIsVal: `${asIs.criticalRisksCount} ativos`,
      toBeVal: `${toBe.criticalRisksCount} ativos`,
      gain: "Eliminados por IA",
      isPositive: true
    },
    {
      metric: "Gargalos de Processo Mapeados",
      asIsVal: `${asIs.criticalBottlenecksCount} graves`,
      toBeVal: `${toBe.criticalBottlenecksCount} graves`,
      gain: "Zerado",
      isPositive: true
    }
  ];

  return (
    <div className="space-y-6 select-none animate-[fade-in_0.3s_ease-out]">
      {/* Cards Executivos Comparativos Rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Status AS IS */}
        <div className="p-5 rounded-2xl border border-destructive/20 bg-destructive/5 text-left flex flex-col justify-between">
          <div className="flex items-center justify-between text-destructive">
            <span className="text-[10px] font-black uppercase tracking-widest">Jornada AS IS</span>
            <Flame className="w-5 h-5 fill-current" />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-primary block leading-none">120 horas</span>
            <span className="text-[10px] text-[#7A7268] font-bold block mt-1.5 uppercase tracking-wider">
              Fluxo Lento, Manual e Vulnerável
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-3 leading-relaxed">
            Provisionamento dependente de ligações, planilhas descentralizadas e ações manuais lentas. Alto índice de refugo técnico.
          </p>
        </div>

        {/* Efeito de Transição */}
        <div className="p-5 rounded-2xl border border-accent/20 bg-accent/5 text-left flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between text-accent">
            <span className="text-[10px] font-black uppercase tracking-widest text-accent">Impacto Operacional</span>
            <Zap className="w-5 h-5 fill-current animate-bounce" />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-[#F15A22] block leading-none">-115.5h</span>
            <span className="text-[10px] text-[#7A7268] font-bold block mt-1.5 uppercase tracking-wider">
              Diferencial de Eficiência
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-3 leading-relaxed">
            Eliminação total de redundâncias manuais através de inteligência geoespacial e automações de provisionamento via API.
          </p>
        </div>

        {/* Status TO BE */}
        <div className="p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 text-left flex flex-col justify-between">
          <div className="flex items-center justify-between text-emerald-600">
            <span className="text-[10px] font-black uppercase tracking-widest">Jornada TO BE</span>
            <CheckCircle className="w-5 h-5 fill-current" />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-emerald-600 block leading-none">4.5 horas</span>
            <span className="text-[10px] text-[#7A7268] font-bold block mt-1.5 uppercase tracking-wider">
              Fluxo Inteligente e Automatizado
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-3 leading-relaxed">
            Faturamento automatizado, provisionamento SDN imediato e análise proativa de perdas de pacote garantem altíssimo CSAT.
          </p>
        </div>
      </div>

      {/* Tabela de Comparação de Métricas */}
      <div className="rounded-2xl border border-border bg-background overflow-hidden shadow-sm text-left">
        <div className="p-4 border-b border-border bg-secondary/35">
          <h3 className="font-black text-xs uppercase tracking-wider text-primary">Matriz Comparativa de Transformação</h3>
          <p className="text-[10px] text-muted-foreground">Visão auditável do ROI de melhoria operacional da HIT.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-secondary/40 border-b border-border text-[9px] font-black uppercase text-[#7A7268] tracking-widest select-none">
                <th className="p-4">Dimensão / KPI</th>
                <th className="p-4">Processo Atual (AS IS)</th>
                <th className="p-4">Processo Idealizado (TO BE)</th>
                <th className="p-4 text-right">Ganho Percentual / ROI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {comparisonRows.map((row, index) => (
                <tr key={index} className="hover:bg-secondary/25 transition-colors">
                  <td className="p-4 font-bold text-primary">{row.metric}</td>
                  <td className="p-4 text-destructive font-semibold">{row.asIsVal}</td>
                  <td className="p-4 text-emerald-600 font-bold">{row.toBeVal}</td>
                  <td className="p-4 text-right">
                    <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-700 px-2 py-0.5 rounded-full font-black text-[9px] uppercase tracking-wide">
                      <TrendingDown className="w-2.5 h-2.5" />
                      {row.gain}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Caixa Informativa Analítica dos Handoffs Otimizados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
        <div className="p-5 rounded-2xl border border-border bg-background space-y-4">
          <h4 className="font-black text-xs uppercase tracking-wider text-primary border-b border-border pb-2 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            Principais Gargalos Eliminados (AS IS)
          </h4>
          <ul className="space-y-3 text-[11px] text-muted-foreground">
            <li className="flex gap-2 items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-destructive shrink-0 mt-1.5" />
              <div>
                <strong className="text-primary font-bold">Validação Geográfica Manual (Engenharia):</strong> Demora de 72h em fila devido a levantamento manual de postes e mapas locais.
              </div>
            </li>
            <li className="flex gap-2 items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-destructive shrink-0 mt-1.5" />
              <div>
                <strong className="text-primary font-bold">Falta de Rastreamento de Hardware (Logística):</strong> Perda de equipamentos de alto custo e atraso no agendamento com cliente.
              </div>
            </li>
            <li className="flex gap-2 items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-destructive shrink-0 mt-1.5" />
              <div>
                <strong className="text-primary font-bold">Configuração de Switch CLI (NOC):</strong> Digitação manual de centenas de linhas de comandos para roteamento, gerando refugo.
              </div>
            </li>
          </ul>
        </div>

        <div className="p-5 rounded-2xl border border-border bg-background space-y-4">
          <h4 className="font-black text-xs uppercase tracking-wider text-primary border-b border-border pb-2 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            Ganhos e Otimizações de Automação (TO BE)
          </h4>
          <ul className="space-y-3 text-[11px] text-muted-foreground">
            <li className="flex gap-2 items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
              <div>
                <strong className="text-primary font-bold">Consulta Automatizada via Geo-AI Agent:</strong> Resultado imediato (5 minutos) com cálculo automático de rota de fibra sem erros.
              </div>
            </li>
            <li className="flex gap-2 items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
              <div>
                <strong className="text-primary font-bold">Despacho Conectado por Webhooks:</strong> Atualizações em tempo real do rastreamento geram CSAT de 4.8 e agendamento proativo.
              </div>
            </li>
            <li className="flex gap-2 items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
              <div>
                <strong className="text-primary font-bold">Provisionamento SDN Centralizado:</strong> Configuração instantânea do circuito por roteador inteligente com erro de cadastro zero.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
