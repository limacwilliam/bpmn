import type { MaturityLevelType } from "@/components/process/MaturityScore";
import type { DependencyItem } from "@/components/process/ProcessDependencies";
import type { ProcessStatusType, ProcessType } from "@/components/process/ProcessStatusBadge";
import type { TimelineItem } from "@/components/process/ProcessTimeline";
import type { RiskCategoryType, RiskSeverityType } from "@/components/process/RiskCard";
import {
  enterpriseBottlenecks,
  enterpriseProcesses,
  type EnterpriseProcess,
} from "@/lib/enterprise-operational-data";

export interface ProcessDetailsViewModel {
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

const DETAILED_REGISTRY: Record<string, ProcessDetailsViewModel> = {
  "PRC-001": {
    id: "PRC-001",
    title: "Onboarding de Clientes Enterprise",
    department: "Customer Success",
    status: "ACTIVE",
    type: "TO_BE",
    owner: "Mariana Souza",
    description:
      "Orquestração completa de entrada de novas contas B2B corporativas, desde a assinatura contratual até o provisionamento de servidores dedicados.",
    objective:
      "Reduzir a fricção de entrada do cliente, automatizando integrações e agilizando handoffs entre o comercial, CS e infraestrutura de TI.",
    priority: "HIGH",
    maturityLevel: 4,
    lastUpdate: "Ontem, às 16:30",
    stakeholders: [
      "Mariana Souza (CS Lead)",
      "William Lima (Lead Ops)",
      "Carlos Ramos (Infrastructure)",
    ],
    missingRequirements: [
      "Integração nativa de webhooks com o CRM Salesforce.",
      "Auditoria automática de SLAs em tempo real na criação de contas no Azure.",
    ],
    recommendations: [
      "Vincular chaves automáticas do SAP de faturamento direto na lane de CS.",
      "Substituir planilhas Excel remanescentes por campos estruturados no banco de dados.",
    ],
    dependencies: [
      {
        id: "dep1",
        name: "Validação de Crédito KYC",
        department: "Compliance",
        type: "UPSTREAM",
        handoffStatus: "STABLE",
        system: "Compliance API",
      },
      {
        id: "dep2",
        name: "Faturamento e Cobrança",
        department: "Faturamento",
        type: "DOWNSTREAM",
        handoffStatus: "DELAYED",
        system: "SAP",
      },
    ],
    timeline: [
      {
        id: "t1",
        action: "Publicação do Fluxo TO BE v2.1",
        author: "William Lima",
        role: "Operações",
        date: "Há 2 dias",
        details: "Migração concluída de tarefas manuais para Service Tasks automáticas.",
        type: "HUMAN",
      },
      {
        id: "t2",
        action: "Insight de Process Mining",
        author: "HIT AI Analyst",
        role: "Inteligência Operacional",
        date: "Há 3 dias",
        details:
          "Detectada economia latente de 24h na etapa de provisionamento de cloud do CS.",
        type: "AI",
      },
    ],
    asIsDescription:
      "Coleta descentralizada de documentos cadastrais por e-mail, preenchimento de formulários manuais do OneDrive e provisionamento manual de servidores por TI.",
    toBeDescription:
      "Portal unificado de integração que valida documentos via KYC por API de compliance, cria cadastros de faturamento e roda scripts Terraform automaticamente.",
    inefficiencies: [
      "Fila de espera manual por assinaturas físicas de contratos (latência de até 5 dias).",
      "Duplicidade na digitação de chaves cadastrais entre os times de CS e TI.",
    ],
    improvements: [
      "Integração da API DocuSign para assinaturas de contratos 100% eletrônicas.",
      "Provisionamento automático via scripts Terraform interconectados às Service Tasks.",
    ],
    gains: [
      {
        label: "Tempo de Provisionamento",
        asIsValue: "120 horas",
        toBeValue: "4 horas",
        gain: "96% de Ganho",
        isPositive: true,
      },
      {
        label: "Compliance Cadastral",
        asIsValue: "88.2%",
        toBeValue: "99.9%",
        gain: "+11.7% SLA",
        isPositive: true,
      },
    ],
    bottlenecks: [
      {
        id: "bot1",
        title: "Fila de Provisionamento de TI",
        severity: "HIGH",
        rootCause: "Falta de automação nas requisições do Azure",
        latency: "48 horas",
        impact: "Atrito no onboarding inicial de clientes Enterprise",
        suggestedAction: "Implementar scripts Terraform automáticos na lane de TI",
      },
    ],
    risks: [
      {
        title: "Risco Cadastral por Documentação",
        category: "CUSTOMER_SUCCESS",
        severity: "MEDIUM",
        description: "Envio de certidões corporativas incompletas ou vencidas",
        mitigation:
          "Validação automática por OCR de datas de validade nas certidões do portal",
      },
    ],
  },
  "PRC-002": {
    id: "PRC-002",
    title: "Faturamento e Cobrança Automatizada",
    department: "Faturamento",
    status: "OPTIMIZING",
    type: "AS_IS",
    owner: "William Lima",
    description:
      "Fluxo financeiro corporativo encarregado da conciliação bancária mensal de faturas emitidas para contas Enterprise baseadas no OneDrive.",
    objective:
      "Reduzir o estouro de prazos de conciliação mensal, mitigando multas contratuais e atritos de cobrança duplicada.",
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
      "Habilitar alertas realtime para estouros de SLAs de cobrança superior a 48h.",
    ],
    dependencies: [
      {
        id: "dep3",
        name: "Provisionamento Ativo CS",
        department: "Customer Success",
        type: "UPSTREAM",
        handoffStatus: "STABLE",
        system: "Portal CS",
      },
      {
        id: "dep4",
        name: "Auditoria Contábil",
        department: "Compliance",
        type: "DOWNSTREAM",
        handoffStatus: "CRITICAL",
        system: "ERP SAP",
      },
    ],
    timeline: [
      {
        id: "t3",
        action: "Detecção de Estouro de SLA",
        author: "HIT Monitor",
        role: "Sistema",
        date: "Há 12 min",
        details:
          "Conciliação do lote SAP pendente excedeu o limite de 72h contratuais.",
        type: "SYSTEM",
      },
      {
        id: "t4",
        action: "Proposta de Mitigação",
        author: "HIT AI Analyst",
        role: "Inteligência Operacional",
        date: "Há 2 horas",
        details:
          "A IA propõe mapear o fluxo TO BE substituindo a conciliação manual por leitura de PDFs por OCR.",
        type: "AI",
      },
    ],
    asIsDescription:
      "Download de arquivos extratos em pastas do OneDrive, digitação manual dos valores no Excel e preenchimento manual de notas fiscais no sistema do ERP SAP.",
    toBeDescription:
      "Conciliação de faturas automática por inteligência de leitura de PDFs por IA e disparo direto no barramento de integração do ERP SAP.",
    inefficiencies: [
      "Latência de 72h para a conciliação completa de notas fiscais de fechamento.",
      "Risco eminente de erros de digitação de chaves cadastrais com perdas de faturamento.",
    ],
    improvements: [
      "Automação de conciliação por barramento de API direta com bancos parceiros.",
      "Leitura automática de arquivos de remessa por IA integradas na lane de finanças.",
    ],
    gains: [
      {
        label: "Tempo de Conciliação",
        asIsValue: "72 horas",
        toBeValue: "15 min",
        gain: "99.6% de Ganho",
        isPositive: true,
      },
      {
        label: "Perda Financeira Evitada",
        asIsValue: "R$ 45.000",
        toBeValue: "R$ 0",
        gain: "100% Mitigado",
        isPositive: true,
      },
    ],
    bottlenecks: [
      {
        id: "bot2",
        title: "Digitação Manual no SAP",
        severity: "CRITICAL",
        rootCause: "Exportação manual de planilhas do OneDrive para SAP",
        latency: "72 horas",
        impact:
          "Atraso no fechamento do faturamento fiscal Enterprise de fim de mês",
        suggestedAction: "Migrar para barramento de integração automatizado via API direta",
      },
    ],
    risks: [
      {
        title: "Estouro Crítico de SLA Contratual",
        category: "SLA_COMPLIANCE",
        severity: "CRITICAL",
        description: "Perda do prazo de faturamento em multas por atraso nas notas",
        mitigation:
          "Alerta em tempo real no dashboard da governança quando o lote SAP passar de 24h pendente",
      },
    ],
  },
};

function mapStatus(status: EnterpriseProcess["status"]): ProcessStatusType {
  if (status === "PAUSED") return "DEPRECATED";
  return status;
}

function buildFromEnterprise(process: EnterpriseProcess): ProcessDetailsViewModel {
  const relatedBottlenecks = enterpriseBottlenecks.filter((item) =>
    item.relatedProcesses.includes(process.id)
  );

  return {
    id: process.id,
    title: process.name,
    department: process.department,
    status: mapStatus(process.status),
    type: process.type,
    owner: process.owner,
    description: process.description,
    objective: `Elevar maturidade operacional do processo ${process.name} com governança de handoffs e SLAs.`,
    priority: process.slaStatus === "CRITICAL" ? "HIGH" : "MEDIUM",
    maturityLevel: process.maturityLevel,
    lastUpdate: process.lastUpdate,
    stakeholders: [process.owner, "William Lima (Lead Ops)", "HIT AI Analyst"],
    missingRequirements: process.bottlenecks.slice(0, 2),
    recommendations: [
      "Publicar versão TO BE no modelador BPMN com ownership explícito.",
      "Conectar KPIs do processo ao dashboard executivo para leitura em tempo real.",
    ],
    dependencies: process.dependencies.map((dependency, index) => ({
      id: `${process.id}-dep-${index}`,
      name: dependency,
      department: process.department,
      type: index % 2 === 0 ? "UPSTREAM" : "DOWNSTREAM",
      handoffStatus:
        process.slaStatus === "CRITICAL"
          ? "CRITICAL"
          : process.slaStatus === "DELAYED"
            ? "DELAYED"
            : "STABLE",
      system: dependency,
    })),
    timeline: [
      {
        id: `${process.id}-timeline-1`,
        action: "Atualização de governança operacional",
        author: process.owner,
        role: process.department,
        date: process.lastUpdate,
        details: process.customerImpact,
        type: "HUMAN",
      },
      {
        id: `${process.id}-timeline-2`,
        action: "Insight operacional da IA",
        author: "HIT AI Analyst",
        role: "Inteligência Operacional",
        date: "Há 1 dia",
        details: `Monitoramento ativo de SLA ${process.sla} com status ${process.slaStatus}.`,
        type: "AI",
      },
    ],
    asIsDescription: process.description,
    toBeDescription: `Versão TO BE com automação de handoffs, integração de sistemas (${process.dependencies.join(", ")}) e redução de filas manuais.`,
    inefficiencies: process.bottlenecks,
    improvements: [
      "Padronizar entrada de dados no portal de governança.",
      "Automatizar validações críticas antes do handoff entre áreas.",
    ],
    gains: [
      {
        label: "Lead time operacional",
        asIsValue: process.sla,
        toBeValue: "Meta -35%",
        gain: "Ganho projetado TO BE",
        isPositive: true,
      },
    ],
    bottlenecks:
      relatedBottlenecks.length > 0
        ? relatedBottlenecks.map((bottleneck) => ({
            id: bottleneck.id,
            title: bottleneck.title,
            severity: bottleneck.severity,
            rootCause: bottleneck.impact,
            latency: `${bottleneck.averageDelayHours}h`,
            impact: bottleneck.customerImpact,
            suggestedAction: bottleneck.suggestedAction,
          }))
        : process.bottlenecks.map((title, index) => ({
            id: `${process.id}-bn-${index}`,
            title,
            severity:
              process.slaStatus === "CRITICAL"
                ? "CRITICAL"
                : process.slaStatus === "DELAYED"
                  ? "HIGH"
                  : "MEDIUM",
            rootCause: title,
            latency: process.sla,
            impact: process.customerImpact,
            suggestedAction: "Priorizar automação no próximo ciclo TO BE.",
          })),
    risks: process.risks.map((risk) => ({
      title: risk,
      category: "OPERATIONAL",
      severity:
        process.slaStatus === "CRITICAL"
          ? "CRITICAL"
          : process.slaStatus === "DELAYED"
            ? "HIGH"
            : "MEDIUM",
      description: risk,
      mitigation: "Plano de mitigação registrado no cockpit de governança HIT.",
    })),
  };
}

export function resolveProcessDetails(processId: string): ProcessDetailsViewModel | null {
  if (DETAILED_REGISTRY[processId]) {
    return DETAILED_REGISTRY[processId];
  }

  const enterpriseProcess = enterpriseProcesses.find((process) => process.id === processId);
  if (!enterpriseProcess) return null;

  return buildFromEnterprise(enterpriseProcess);
}
