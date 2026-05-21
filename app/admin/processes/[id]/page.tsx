"use client";

import { use } from "react";
import ASISTOBEComparison from "@/components/process/ASISTOBEComparison";
import BottleneckCard from "@/components/process/BottleneckCard";
import KPIBlock from "@/components/process/KPIBlock";
import MaturityScore, { MaturityLevelType } from "@/components/process/MaturityScore";
import ProcessDependencies, { DependencyItem } from "@/components/process/ProcessDependencies";
import ProcessStatusBadge, { ProcessStatusType, ProcessType } from "@/components/process/ProcessStatusBadge";
import ProcessTimeline, { TimelineItem } from "@/components/process/ProcessTimeline";
import RiskCard, { RiskCategoryType, RiskSeverityType } from "@/components/process/RiskCard";
import { cn } from "@/lib/utils";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Brain,
  Calendar,
  CheckCircle2,
  FileDown,
  FileText,
  Flame,
  GitBranch,
  History,
  Layers,
  Network,
  ShieldAlert,
  Sparkles,
  User,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

// ========================================================
// 1. MASSA DE DADOS DE SIMULAÇÃO (HIT OPERATIONS DATA)
// ========================================================

interface MockProcessDetails {
  id: string;
  title: string;
  department: string;
  status: ProcessStatusType;
  type: ProcessType;
  owner: string;
  description: string;
  objective: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  maturityLevel: MaturityLevelType;
  lastUpdate: string;
  stakeholders: string[];
  missingRequirements: string[];
  recommendations: string[];
  dependencies: DependencyItem[];
  timeline: TimelineItem[];
  asIsDescription: string;
  toBeDescription: string;
  inefficiencies: string[];
  improvements: string[];
  gains: {
    label: string;
    asIsValue: string;
    toBeValue: string;
    gain: string;
    isPositive: boolean;
  }[];
  bottlenecks: {
    id: string;
    title: string;
    severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    rootCause: string;
    latency: string;
    impact: string;
    suggestedAction: string;
  }[];
  risks: {
    title: string;
    category: RiskCategoryType;
    severity: RiskSeverityType;
    description: string;
    mitigation: string;
  }[];
}

const PROCESSES_DETAILS_REGISTRY: Record<string, MockProcessDetails> = {
  "PRC-001": {
    id: "PRC-001",
    title: "Onboarding de Clientes Enterprise",
    department: "Customer Success",
    status: "ACTIVE",
    type: "TO_BE",
    owner: "Mariana Souza",
    description: "Orquestração completa de entrada de novas contas B2B corporativas, desde a assinatura contratual até o provisionamento de servidores dedicados.",
    objective: "Reduzir a fricção de entrada do cliente, automatizando integrações e agilizando handoffs entre o comercial, CS e infraestrutura de TI.",
    priority: "HIGH",
    maturityLevel: 4,
    lastUpdate: "Ontem, às 16:30",
    stakeholders: ["Mariana Souza (CS Lead)", "William Lima (Lead Ops)", "Carlos Ramos (Infrastructure)"],
    missingRequirements: [
      "Integração nativa de webhooks com o CRM Salesforce.",
      "Auditoria automática de SLAs em tempo real na criação de contas no Azure.",
    ],
    recommendations: [
      "Vincular chaves automáticas do SAP de faturamento direto na lane de CS.",
      "Substituir planilhas Excel remanescentes por campos estruturados no banco de dados.",
    ],
    dependencies: [
      { id: "dep1", name: "Validação de Crédito KYC", department: "Compliance", type: "UPSTREAM", handoffStatus: "STABLE", system: "Compliance API" },
      { id: "dep2", name: "Faturamento e Cobrança", department: "Faturamento", type: "DOWNSTREAM", handoffStatus: "DELAYED", system: "SAP" },
    ],
    timeline: [
      { id: "t1", action: "Publicação do Fluxo TO BE v2.1", author: "William Lima", role: "Operações", date: "Há 2 dias", details: "Migração concluída de tarefas manuais para Service Tasks automáticas.", type: "HUMAN" },
      { id: "t2", action: "Insight de Process Mining", author: "HIT AI Analyst", role: "Inteligência Operacional", date: "Há 3 dias", details: "Detectada economia latente de 24h na etapa de provisionamento de cloud do CS.", type: "AI" },
    ],
    asIsDescription: "Coleta descentralizada de documentos cadastrais por e-mail, preenchimento de formulários manuais do OneDrive e provisionamento manual de servidores por TI.",
    toBeDescription: "Portal unificado de integração que valida documentos via KYC por API de compliance, cria cadastros de faturamento e roda scripts Terraform automaticamente.",
    inefficiencies: [
      "Fila de espera manual por assinaturas físicas de contratos (latência de até 5 dias).",
      "Duplicidade na digitação de chaves cadastrais entre os times de CS e TI.",
    ],
    improvements: [
      "Integração da API DocuSign para assinaturas de contratos 100% eletrônicas.",
      "Provisionamento automático via scripts Terraform interconectados às Service Tasks.",
    ],
    gains: [
      { label: "Tempo de Provisionamento", asIsValue: "120 horas", toBeValue: "4 horas", gain: "96% de Ganho", isPositive: true },
      { label: "Compliance Cadastral", asIsValue: "88.2%", toBeValue: "99.9%", gain: "+11.7% SLA", isPositive: true },
    ],
    bottlenecks: [
      { id: "bot1", title: "Fila de Provisionamento de TI", severity: "HIGH", rootCause: "Falta de automação nas requisições do Azure", latency: "48 horas", impact: "Atrito no onboarding inicial de clientes Enterprise", suggestedAction: "Implementar scripts Terraform automáticos na lane de TI" },
    ],
    risks: [
      { title: "Risco Cadastral por Documentação", category: "CUSTOMER_SUCCESS", severity: "MEDIUM", description: "Envio de certidões corporativas incompletas ou vencidas", mitigation: "Validação automática por OCR de datas de validade nas certidões do portal" },
    ],
  },
  "PRC-002": {
    id: "PRC-002",
    title: "Faturamento e Cobrança Automatizada",
    department: "Faturamento",
    status: "OPTIMIZING",
    type: "AS_IS",
    owner: "William Lima",
    description: "Fluxo financeiro corporativo encarregado da conciliação bancária mensal de faturas emitidas para contas Enterprise baseadas no OneDrive.",
    objective: "Reduzir o estouro de prazos de conciliação mensal, mitigando multas contratuais e atritos de cobrança duplicada.",
    priority: "HIGH",
    maturityLevel: 2,
    lastUpdate: "Há 4 horas",
    stakeholders: ["William Lima (Lead Ops)", "Beatriz Mello (Finance Lead)"],
    missingRequirements: [
      "Mapeamento oficial do fluxo TO BE na ferramenta BPMN.",
      "Vínculo de APIs bancárias para conciliação direta no SAP ERP.",
    ],
    recommendations: [
      "Substituir totalmente a exportação manual de planilhas do OneDrive por consultas integradas à API.",
      "Habilitar alertas realtime via Supabase para estouros de SLAs de cobrança superior a 48h.",
    ],
    dependencies: [
      { id: "dep3", name: "Provisionamento Ativo CS", department: "Customer Success", type: "UPSTREAM", handoffStatus: "STABLE", system: "Portal CS" },
      { id: "dep4", name: "Auditoria Contábil", department: "Compliance", type: "DOWNSTREAM", handoffStatus: "CRITICAL", system: "ERP SAP" },
    ],
    timeline: [
      { id: "t3", action: "Detecção de Estouro de SLA", author: "HIT Monitor", role: "Sistema", date: "Há 12 min", details: "Conciliação do lote SAP pendente excedeu o limite de 72h contratuais.", type: "SYSTEM" },
      { id: "t4", action: "Proposta de Mitigação", author: "HIT AI Analyst", role: "Inteligência Operacional", date: "Há 2 horas", details: "A IA propõe mapear o fluxo TO BE substituindo a conciliação manual por leitura de PDFs por OCR.", type: "AI" },
    ],
    asIsDescription: "Download de arquivos extratos em pastas do OneDrive, digitação manual dos valores no Excel e preenchimento manual de notas fiscais no sistema do ERP SAP.",
    toBeDescription: "Conciliação de faturas automática por inteligência de leitura de PDFs por IA e disparo direto no barramento de integração do ERP SAP.",
    inefficiencies: [
      "Latência de 72h para a conciliação completa de notas fiscais de fechamento.",
      "Risco eminente de erros de digitação de chaves cadastrais com perdas de faturamento.",
    ],
    improvements: [
      "Automação de conciliação por barramento de API direta com bancos parceiros.",
      "Leitura automática de arquivos de remessa por IA integradas na lane de finanças.",
    ],
    gains: [
      { label: "Tempo de Conciliação", asIsValue: "72 horas", toBeValue: "15 min", gain: "99.6% de Ganho", isPositive: true },
      { label: "Perda Financeira Evitada", asIsValue: "R$ 45.000", toBeValue: "R$ 0", gain: "100% Mitigado", isPositive: true },
    ],
    bottlenecks: [
      { id: "bot2", title: "Digitação Manual no SAP", severity: "CRITICAL", rootCause: "Exportação manual de planilhas do OneDrive para SAP", latency: "72 horas", impact: "Atraso no fechamento do faturamento fiscal Enterprise de fim de mês", suggestedAction: "Migrar para barramento de integração automatizado via API direta" },
    ],
    risks: [
      { title: "Estouro Crítico de SLA Contratual", category: "SLA_COMPLIANCE", severity: "CRITICAL", description: "Perda do prazo de faturamento em multas por atraso nas notas", mitigation: "Alerta em tempo real no dashboard da governança quando o lote SAP passar de 24h pendente" },
    ],
  },
};

export default function ProcessDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const processId = resolvedParams.id;
  const [activeTab, setActiveTab] = useState<"general" | "flow" | "bottlenecks" | "kpis" | "comparison" | "docs">("general");

  const process = PROCESSES_DETAILS_REGISTRY[processId];

  // Caso o processo não seja localizado (Fallback seguro de UX)
  if (!process) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4 select-none">
        <ShieldAlert className="w-12 h-12 text-destructive animate-pulse" />
        <h3 className="text-lg font-black text-primary">Processo Não Localizado</h3>
        <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
          O registro com identificador <span className="font-mono text-primary font-bold">{processId}</span> não existe no cockpit ou foi deprecado de governança.
        </p>
        <Link
          href="/admin/processes"
          className="inline-flex items-center gap-2 bg-accent text-white hover:bg-accent-hover px-5 py-2.5 rounded-full font-semibold text-xs transition-colors shadow-md shadow-accent/25"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Voltar para Mapeamentos
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 select-none">
      
      {/* 1. Header de Governança e Navegação */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border pb-6 select-none">
        <div className="space-y-2">
          {/* Link para voltar */}
          <Link
            href="/admin/processes"
            className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-accent hover:text-accent-hover transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Mapeamento de Processos
          </Link>
          
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-black text-primary tracking-tight">
              {process.title}
            </h1>
            <ProcessStatusBadge type={process.type} />
            <ProcessStatusBadge status={process.status} />
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
            {process.description}
          </p>
        </div>

        {/* Grupo de Ações Rápidas */}
        <div className="flex flex-wrap items-center gap-3 self-start md:self-center">
          <button className="inline-flex items-center gap-2 bg-secondary text-primary hover:bg-muted border border-border px-5 py-2.5 rounded-full font-semibold text-xs transition-colors cursor-pointer select-none">
            <FileDown className="w-3.5 h-3.5 text-accent" />
            Exportar BPMN 2.0
          </button>
          
          <button className="inline-flex items-center gap-2 bg-accent text-white hover:bg-accent-hover px-5 py-2.5 rounded-full font-semibold text-xs transition-colors shadow-md shadow-accent/25 cursor-pointer select-none">
            <Brain className="w-3.5 h-3.5 animate-pulse" />
            Auditoria IA
          </button>
        </div>
      </div>

      {/* ========================================================
          2. COCKPIT DE ABAS DO PROCESSO (PROMPT 4)
         ======================================================== */}
      <div className="rounded-xl border border-border bg-background p-6">
        <div className="border-b border-border pb-3 flex flex-wrap gap-2 select-none overflow-x-auto custom-scrollbar">
          <button
            onClick={() => setActiveTab("general")}
            className={cn(
              "px-4 py-2 text-xs font-black uppercase rounded-lg transition-colors cursor-pointer whitespace-nowrap",
              activeTab === "general" ? "bg-accent text-white" : "text-muted-foreground hover:text-primary hover:bg-secondary/40"
            )}
          >
            Visão Geral
          </button>
          <button
            onClick={() => setActiveTab("flow")}
            className={cn(
              "px-4 py-2 text-xs font-black uppercase rounded-lg transition-colors cursor-pointer whitespace-nowrap",
              activeTab === "flow" ? "bg-accent text-white" : "text-muted-foreground hover:text-primary hover:bg-secondary/40"
            )}
          >
            Fluxo & Handoffs
          </button>
          <button
            onClick={() => setActiveTab("bottlenecks")}
            className={cn(
              "px-4 py-2 text-xs font-black uppercase rounded-lg transition-colors cursor-pointer whitespace-nowrap",
              activeTab === "bottlenecks" ? "bg-accent text-white" : "text-muted-foreground hover:text-primary hover:bg-secondary/40"
            )}
          >
            Gargalos & Riscos
          </button>
          <button
            onClick={() => setActiveTab("kpis")}
            className={cn(
              "px-4 py-2 text-xs font-black uppercase rounded-lg transition-colors cursor-pointer whitespace-nowrap",
              activeTab === "kpis" ? "bg-accent text-white" : "text-muted-foreground hover:text-primary hover:bg-secondary/40"
            )}
          >
            KPIs & SLAs
          </button>
          <button
            onClick={() => setActiveTab("comparison")}
            className={cn(
              "px-4 py-2 text-xs font-black uppercase rounded-lg transition-colors cursor-pointer whitespace-nowrap",
              activeTab === "comparison" ? "bg-accent text-white animate-pulse" : "text-accent hover:text-white hover:bg-accent/10"
            )}
          >
            Comparador AS IS / TO BE
          </button>
          <button
            onClick={() => setActiveTab("docs")}
            className={cn(
              "px-4 py-2 text-xs font-black uppercase rounded-lg transition-colors cursor-pointer whitespace-nowrap",
              activeTab === "docs" ? "bg-accent text-white" : "text-muted-foreground hover:text-primary hover:bg-secondary/40"
            )}
          >
            Arquivos & Logs
          </button>
        </div>

        {/* 3. Renderização Condicional de Abas do Cockpit */}
        <div className="mt-6">
          
          {/* ABA 1: Visão Geral */}
          {activeTab === "general" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Coluna 1 & 2: Infos Gerais */}
              <div className="lg:col-span-2 space-y-6">
                
                <div className="rounded-xl border border-border p-5 space-y-4 bg-secondary/10">
                  <h3 className="font-black text-sm uppercase tracking-wider text-primary border-b border-border pb-2">Objetivo Estratégico</h3>
                  <p className="text-xs text-muted-foreground font-semibold leading-relaxed">
                    {process.objective}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-semibold">
                  <div className="p-4 rounded-xl border border-border space-y-1">
                    <span className="text-[10px] uppercase text-muted-foreground font-black">Líder e Dono do Processo</span>
                    <div className="flex items-center gap-2 pt-1">
                      <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-black">
                        {process.owner.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-primary font-bold block">{process.owner}</span>
                        <span className="text-[9px] text-[#7A7268] block">Gestor Ativo</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-border space-y-1 select-none">
                    <span className="text-[10px] uppercase text-muted-foreground font-black">Stakeholders / Donos Envolvidos</span>
                    <ul className="space-y-1 text-primary font-bold pt-1.5 list-disc list-inside">
                      {process.stakeholders.map((s, idx) => (
                        <li key={idx} className="truncate">{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>

              {/* Coluna 3: Scorecard de Maturidade Operacional */}
              <div className="space-y-6">
                <MaturityScore
                  level={process.maturityLevel}
                  missingRequirements={process.missingRequirements}
                  recommendations={process.recommendations}
                />
              </div>
            </div>
          )}

          {/* ABA 2: Fluxo & Dependências */}
          {activeTab === "flow" && (
            <div className="space-y-6">
              <ProcessDependencies dependencies={process.dependencies} />
              
              <div className="rounded-xl border border-border p-5 bg-secondary/15 space-y-4">
                <h3 className="font-black text-xs uppercase tracking-wider text-primary">Cadeia de Handoffs & Transições</h3>
                <p className="text-xs text-muted-foreground font-semibold leading-relaxed">
                  As transições entre setores exigem conformidade estrita de dados. O estouro de SLAs em Lanes precedentes atinge diretamente a conciliação do lote SAP e a satisfação do cliente corporativo final.
                </p>
              </div>
            </div>
          )}

          {/* ABA 3: Gargalos & Riscos */}
          {activeTab === "bottlenecks" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Gargalos Ativos */}
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase text-accent tracking-widest block border-b border-border pb-1.5">
                  Gargalos Mapeados (Process Mining)
                </span>
                <div className="space-y-4">
                  {process.bottlenecks.map((bot) => (
                    <BottleneckCard key={bot.id} {...bot} />
                  ))}
                  {process.bottlenecks.length === 0 && (
                    <div className="text-center py-8 text-xs text-muted-foreground bg-secondary/5 border border-dashed border-border rounded-xl">
                      Nenhum gargalo de latência ativo neste processo.
                    </div>
                  )}
                </div>
              </div>

              {/* Riscos Corporativos */}
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase text-indigo-600 tracking-widest block border-b border-border pb-1.5">
                  Matriz de Severidade & Riscos
                </span>
                <div className="space-y-4">
                  {process.risks.map((risk, idx) => (
                    <RiskCard key={idx} {...risk} />
                  ))}
                  {process.risks.length === 0 && (
                    <div className="text-center py-8 text-xs text-muted-foreground bg-secondary/5 border border-dashed border-border rounded-xl">
                      Nenhum risco estratégico mapeado no processo.
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* ABA 4: KPIs & SLAs */}
          {activeTab === "kpis" && (
            <div className="space-y-8">
              
              {/* Grilha de blocos de KPI com Sparklines */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <KPIBlock
                  type="LEAD_TIME"
                  title="Lead Time Médio (Ciclo)"
                  value="48.5"
                  unit="horas"
                  change="-12.4%"
                  isPositive={true}
                  sparklineData={[72, 68, 62, 55, 50, 48.5]}
                />
                
                <KPIBlock
                  type="THROUGHPUT"
                  title="Volume de Transações"
                  value="12.4"
                  unit="mil"
                  change="+8.2%"
                  isPositive={true}
                  sparklineData={[9.2, 9.8, 10.4, 11.2, 11.8, 12.4]}
                />

                <KPIBlock
                  type="SLA_COMPLIANCE"
                  title="Conformidade de SLA"
                  value={process.id === "PRC-002" ? "91.5" : "98.2"}
                  unit="%"
                  change={process.id === "PRC-002" ? "-2.1%" : "+0.9%"}
                  isPositive={process.id !== "PRC-002"}
                  sparklineData={process.id === "PRC-002" ? [94.5, 93.8, 93.0, 92.4, 91.5] : [97.2, 97.5, 97.8, 98.0, 98.2]}
                />
              </div>

              <div className="rounded-xl border border-border p-5 bg-secondary/15 space-y-4">
                <h3 className="font-black text-xs uppercase tracking-wider text-primary">Previsão e Monitoramento IA</h3>
                <div className="p-4 rounded-lg bg-background border border-border flex items-start gap-3 text-xs">
                  <Brain className="w-5 h-5 text-accent animate-pulse flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-bold text-primary flex items-center gap-1.5">
                      Alerta Inteligente de SLA
                    </span>
                    <p className="text-muted-foreground leading-relaxed">
                      De acordo com o histórico de envelhecimento de tarefas do faturamento contábil, há um risco de 84% de novo estouro de SLA contratual nos próximos 7 dias se a etapa manual de digitação SAP continuar pendente.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ABA 5: Comparador AS IS / TO BE */}
          {activeTab === "comparison" && (
            <ASISTOBEComparison
              processName={process.title}
              asIsDescription={process.asIsDescription}
              toBeDescription={process.toBeDescription}
              inefficiencies={process.inefficiencies}
              improvements={process.improvements}
              gains={process.gains}
            />
          )}

          {/* ABA 6: Arquivos & Logs */}
          {activeTab === "docs" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Timeline de Logs e Auditoria */}
              <div className="lg:col-span-2">
                <ProcessTimeline items={process.timeline} />
              </div>

              {/* Anexos de Arquivos e BPMN */}
              <div className="space-y-6">
                <div className="rounded-xl border border-border bg-background p-6 space-y-4">
                  <h4 className="font-black text-sm uppercase tracking-wider text-primary border-b border-border pb-2">Repositório de Anexos</h4>
                  
                  <div className="space-y-3">
                    {/* Anexo 1 */}
                    <div className="p-3.5 rounded-lg border border-border bg-secondary/10 flex items-center justify-between text-xs font-semibold gap-4">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <FileText className="w-5 h-5 text-accent flex-shrink-0" />
                        <div className="space-y-0.5 min-w-0">
                          <span className="text-primary truncate block font-bold">Diagrama_BPMN_v2_TOBE.xml</span>
                          <span className="text-[9px] text-[#7A7268] block">XML Oficial • 140 KB</span>
                        </div>
                      </div>
                      <button className="text-xs text-accent font-black hover:text-accent-hover transition-colors cursor-pointer select-none">Baixar</button>
                    </div>

                    {/* Anexo 2 */}
                    <div className="p-3.5 rounded-lg border border-border bg-secondary/10 flex items-center justify-between text-xs font-semibold gap-4">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <FileText className="w-5 h-5 text-accent flex-shrink-0" />
                        <div className="space-y-0.5 min-w-0">
                          <span className="text-primary truncate block font-bold">Procedimento_Padrao_onboarding.pdf</span>
                          <span className="text-[9px] text-[#7A7268] block">PDF POP • 1.2 MB</span>
                        </div>
                      </div>
                      <button className="text-xs text-accent font-black hover:text-accent-hover transition-colors cursor-pointer select-none">Baixar</button>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}

        </div>
      </div>

    </div>
  );
}
