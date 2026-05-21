"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";

// Importação dos Componentes Customizados Premium da HIT
import OperationalGraph from "@/components/dashboard/OperationalGraph";
import MaturityGauge from "@/components/dashboard/MaturityGauge";
import SLAWidget from "@/components/dashboard/SLAWidget";
import BottleneckHeatmap from "@/components/dashboard/BottleneckHeatmap";
import RiskMatrix from "@/components/dashboard/RiskMatrix";
import CustomerHealthCard from "@/components/dashboard/CustomerHealthCard";
import TransformationProgress from "@/components/dashboard/TransformationProgress";
import OperationalTimeline from "@/components/dashboard/OperationalTimeline";
import AIInsightCard from "@/components/dashboard/AIInsightCard";
import ExecutiveAlert from "@/components/dashboard/ExecutiveAlert";

export default function DashboardClient() {
  const [activeTab, setActiveTab] = useState<"performance" | "risks" | "transformation">("performance");

  return (
    <div className="space-y-8 select-none">
      
      {/* =======================================================
          1. LINHA DE GRAFOS OPERACIONAIS & VELOCÍMETRO DE MATURIDADE
         ======================================================= */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch">
        {/* Grafo de Handoffs e Dependências SVG */}
        <div className="h-full">
          <OperationalGraph />
        </div>
        
        {/* Velocímetro de Maturidade Operacional e checklists */}
        <div className="h-full">
          <MaturityGauge />
        </div>
      </div>

      {/* =======================================================
          2. CENTRAL DE COCKPIT COM ABAS EXECUTIVAS (TABBED PORTAL)
         ======================================================= */}
      <div className="rounded-2xl border border-border bg-background p-6 space-y-6">
        {/* Barra de Seleção de Abas */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4 gap-4">
          <div className="space-y-1">
            <h3 className="font-black text-sm uppercase tracking-wider text-primary">
              Cockpit Analítico & Governança Setorial
            </h3>
            <p className="text-xs text-muted-foreground">
              Monitore os SLAs contratuais, atritos setoriais, dores de CS e cronogramas de transição digital da HIT.
            </p>
          </div>

          {/* Seletor Executivo de Abas */}
          <div className="flex items-center bg-secondary p-1 rounded-full border border-border max-w-fit self-start sm:self-auto">
            <button
              onClick={() => setActiveTab("performance")}
              className={cn(
                "px-5 py-2 text-xs font-black uppercase rounded-full transition-all cursor-pointer select-none",
                activeTab === "performance" 
                  ? "bg-accent text-white shadow-sm shadow-accent/25" 
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              Performance & SLAs
            </button>
            
            <button
              onClick={() => setActiveTab("risks")}
              className={cn(
                "px-5 py-2 text-xs font-black uppercase rounded-full transition-all cursor-pointer select-none",
                activeTab === "risks" 
                  ? "bg-accent text-white shadow-sm shadow-accent/25" 
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              Riscos & CS VIP
            </button>

            <button
              onClick={() => setActiveTab("transformation")}
              className={cn(
                "px-5 py-2 text-xs font-black uppercase rounded-full transition-all cursor-pointer select-none",
                activeTab === "transformation" 
                  ? "bg-accent text-white shadow-sm shadow-accent/25" 
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              Transformação TO BE
            </button>
          </div>
        </div>

        {/* Conteúdo Dinâmico com Split de Gráficos de Alta Fidelidade */}
        <div className="mt-4">
          {activeTab === "performance" && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch">
              {/* Central de Monitoramento de SLAs e Contagens */}
              <div className="h-full">
                <SLAWidget />
              </div>
              
              {/* Mapa Térmico de Latência por Handoff e Otimizações */}
              <div className="h-full">
                <BottleneckHeatmap />
              </div>
            </div>
          )}

          {activeTab === "risks" && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch">
              {/* Matriz Térmica 3x3 de Riscos Regulatórios e Financeiros */}
              <div className="h-full">
                <RiskMatrix />
              </div>
              
              {/* Saúde CS de Contas VIP e Planos Rápidos de Retenção */}
              <div className="h-full">
                <CustomerHealthCard />
              </div>
            </div>
          )}

          {activeTab === "transformation" && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch">
              {/* Comparador de Ganho AS IS vs TO BE e Adocão por Setor */}
              <div className="h-full">
                <TransformationProgress />
              </div>
              
              {/* Roadmap Executivo de Marcos Estratégicos */}
              <div className="h-full">
                <OperationalTimeline />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =======================================================
          3. LINHA LATERAL DE INSIGHTS PREDITIVOS & ALERTAS CRÍTICOS
         ======================================================= */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch">
        {/* Feed Inteligente da IA de Otimizações Operacionais */}
        <div className="h-full">
          <AIInsightCard />
        </div>
        
        {/* Central Pulsante de Incidentes e Estouro de SLAs contratuais */}
        <div className="h-full">
          <ExecutiveAlert />
        </div>
      </div>

    </div>
  );
}
