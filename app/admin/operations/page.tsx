import {
  Activity,
  CheckCircle2,
  Compass,
  Database,
  Flame,
  Globe,
  RefreshCw,
  Server,
  TrendingUp,
} from "lucide-react";
import React from "react";

export default function OperationsPage() {
  return (
    <div className="space-y-8 select-none animate-page-in">
      {/* Cabeçalho */}
      <div className="space-y-1">
        <h1 className="text-3xl md:text-4xl font-black text-primary tracking-tight">
          Operações Globais (Operations)
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Monitoramento do estado físico de barramentos de API, vazão operacional, integridade SAP e tempo de processamento.
        </p>
      </div>

      {/* Grid de status em tempo real */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Status I: Integração SAP */}
        <div className="rounded-xl border border-border p-6 bg-background space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <span className="text-xs font-bold text-primary uppercase tracking-wider block">Integração SAP ERP</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-3 h-3" /> Online
            </span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between font-semibold">
              <span className="text-muted-foreground">Última Sincronização:</span>
              <span className="text-primary">Há 4 min</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span className="text-muted-foreground">Fila de Transações:</span>
              <span className="text-primary">0 pendentes</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span className="text-muted-foreground">Latência de barramento:</span>
              <span className="text-emerald-500 font-bold">14ms (Excelente)</span>
            </div>
          </div>
        </div>

        {/* Status II: Barramento de API KYC */}
        <div className="rounded-xl border border-border p-6 bg-background space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <span className="text-xs font-bold text-primary uppercase tracking-wider block">API de KYC & Onboarding</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-3 h-3" /> Online
            </span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between font-semibold">
              <span className="text-muted-foreground">Taxa de Sucesso (24h):</span>
              <span className="text-primary">99.85%</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span className="text-muted-foreground">Consultas Efetuadas:</span>
              <span className="text-primary">1,240 checks</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span className="text-muted-foreground">Timeout Médio:</span>
              <span className="text-emerald-500 font-bold">120ms</span>
            </div>
          </div>
        </div>

        {/* Status III: Infraestrutura Supabase */}
        <div className="rounded-xl border border-border p-6 bg-background space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <span className="text-xs font-bold text-primary uppercase tracking-wider block">Infraestrutura PostgreSQL</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-3 h-3" /> Saudável
            </span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between font-semibold">
              <span className="text-muted-foreground">Pool de Conexões pg:</span>
              <span className="text-primary">12 / 100 ativas</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span className="text-muted-foreground">Uso de CPU do Servidor:</span>
              <span className="text-primary">4.2%</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span className="text-muted-foreground">Uso de Memória:</span>
              <span className="text-primary">14.8%</span>
            </div>
          </div>
        </div>

      </div>

      {/* Seção Principal de Métricas Operacionais */}
      <div className="rounded-xl border border-border p-6 bg-background space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h3 className="font-black text-sm uppercase tracking-wider text-primary">Volume de Vazão e Desempenho</h3>
            <p className="text-xs text-muted-foreground mt-1">Evolução do tempo de ciclo médio de faturamento corporativo mensal.</p>
          </div>
          <Activity className="w-5 h-5 text-accent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs font-semibold">
          <div className="space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-muted-foreground block">Métricas de Latência</span>
            <div className="p-4 rounded-lg bg-secondary/40 border border-border space-y-3">
              <div className="flex justify-between items-center border-b border-border/60 pb-2">
                <span className="text-[#7A7268]">Faturamento AS IS (OneDrive):</span>
                <span className="text-destructive font-black">72.0 horas</span>
              </div>
              <div className="flex justify-between items-center border-b border-border/60 pb-2">
                <span className="text-[#7A7268]">Faturamento TO BE (Automático):</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-black">1.2 horas</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-primary font-bold">Redução de Latência por IA:</span>
                <span className="text-accent font-black">-98.3% de Tempo</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-muted-foreground block">Meta de Excelência Operacional</span>
            <div className="p-4 rounded-lg bg-secondary/40 border border-border space-y-3">
              <div className="flex justify-between items-center border-b border-border/60 pb-2">
                <span className="text-[#7A7268]">Taxa de Erro Cadastro KYC:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-black">0.15% (Meta &lt; 2%)</span>
              </div>
              <div className="flex justify-between items-center border-b border-border/60 pb-2">
                <span className="text-[#7A7268]">Velocidade de Onboarding:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-black">2.4 horas (Meta &lt; 48h)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-primary font-bold">Status Geral do Módulo:</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase">Altamente Maduro</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Operações Globais - HIT Governance",
  description: "Monitoramento de barramentos de API e integridade operacional da HIT.",
};
