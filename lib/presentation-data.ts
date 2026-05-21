import {
  executiveKPIs,
  executiveRecommendations,
  organizationalHealthSignals,
  processMaturityScores,
} from "@/lib/dashboard-data";

export type SlideId =
  | "overview"
  | "diagnosis"
  | "asis"
  | "bottlenecks"
  | "customer-impact"
  | "organization"
  | "tobe"
  | "governance"
  | "dashboard-vision"
  | "roadmap"
  | "recommendations"
  | "final";

export interface PresentationSlide {
  id: SlideId;
  eyebrow: string;
  title: string;
  narrative: string;
}

export interface FlowStep {
  id: string;
  department: string;
  title: string;
  metric: string;
  status: "critical" | "warning" | "stable" | "future";
  detail: string;
}

export interface CustomerJourneyStep {
  stage: string;
  pain: string;
  risk: string;
  score: number;
}

export interface RoadmapPhase {
  phase: string;
  horizon: string;
  focus: string;
  milestones: string[];
  gain: string;
}

export const presentationSlides: PresentationSlide[] = [
  {
    id: "overview",
    eyebrow: "Executive Overview",
    title: "HIT Operational Transformation",
    narrative: "Da operação fragmentada para governança escalável, com visibilidade executiva e controle de risco ponta a ponta.",
  },
  {
    id: "diagnosis",
    eyebrow: "Current Operational Diagnosis",
    title: "A operação cresceu mais rápido que seus mecanismos de controle",
    narrative: "Planilhas, e-mails, WhatsApp e decisões locais criaram pontos cegos que afetam SLA, experiência do cliente e previsibilidade executiva.",
  },
  {
    id: "asis",
    eyebrow: "AS IS Operational Flows",
    title: "O fluxo atual concentra risco nos handoffs manuais",
    narrative: "Cada transição entre Comercial, Engenharia, Logística, NOC, CS e SAP Billing adiciona latência, retrabalho e perda de accountability.",
  },
  {
    id: "bottlenecks",
    eyebrow: "Operational Bottlenecks",
    title: "Três gargalos explicam a maior parte do atrito operacional",
    narrative: "Validação geográfica, rastreabilidade física e conciliação SAP acumulam filas que aparecem tarde demais para liderança.",
  },
  {
    id: "customer-impact",
    eyebrow: "Customer Impact",
    title: "O cliente sente a fragmentação antes da empresa enxergar o risco",
    narrative: "Atrasos de implantação, múltiplos contatos e escalonamentos tardios aumentam churn risk em contas estratégicas.",
  },
  {
    id: "organization",
    eyebrow: "Organizational Challenges",
    title: "Sobrecarga e dependência de especialistas limitam escala",
    narrative: "A operação depende de poucos donos de conhecimento, com capacidade crítica em Engenharia e NOC.",
  },
  {
    id: "tobe",
    eyebrow: "Future-State TO BE Model",
    title: "O modelo futuro transforma handoffs em eventos governados",
    narrative: "Integrações, SLAs visíveis, automações e ownership claro reduzem caos e criam experiência previsível para clientes.",
  },
  {
    id: "governance",
    eyebrow: "Governance Transformation",
    title: "Governança deixa de ser auditoria posterior e vira controle em tempo real",
    narrative: "Executivos passam a enxergar maturidade, risco, dependências e customer health antes que virem crise.",
  },
  {
    id: "dashboard-vision",
    eyebrow: "KPI & Dashboard Vision",
    title: "A plataforma vira o centro de inteligência operacional da HIT",
    narrative: "SLA, gargalos, maturidade, clientes críticos e recomendações de IA passam a coexistir em uma visão executiva única.",
  },
  {
    id: "roadmap",
    eyebrow: "Transformation Roadmap",
    title: "A transformação acontece por ondas de controle, automação e escala",
    narrative: "A jornada prioriza riscos imediatos, estabiliza governança e evolui para hiperautomação sustentável.",
  },
  {
    id: "recommendations",
    eyebrow: "Executive Recommendations",
    title: "As decisões críticas já estão claras",
    narrative: "A liderança deve remover filas críticas, automatizar SAP Billing e consolidar handoffs auditáveis.",
  },
  {
    id: "final",
    eyebrow: "Final Executive Summary",
    title: "A HIT ganha controle executivo sobre crescimento operacional",
    narrative: "Com governança ativa, inteligência operacional e foco em customer success, a empresa se move para excelência escalável.",
  },
];

export const asIsFlow: FlowStep[] = [
  {
    id: "asis-1",
    department: "Comercial",
    title: "Handoff por e-mail e planilha",
    metric: "48h",
    status: "warning",
    detail: "Dados críticos se perdem em threads e pastas OneDrive.",
  },
  {
    id: "asis-2",
    department: "Engenharia",
    title: "Viabilidade geográfica manual",
    metric: "72h",
    status: "critical",
    detail: "Consulta Google Earth concentra fila em especialistas.",
  },
  {
    id: "asis-3",
    department: "Logística",
    title: "Rastreio físico sem integração",
    metric: "36h",
    status: "critical",
    detail: "CS não enxerga status de hardware em tempo real.",
  },
  {
    id: "asis-4",
    department: "NOC",
    title: "Configuração CLI manual",
    metric: "24h",
    status: "warning",
    detail: "Provisionamento depende de comandos linha a linha.",
  },
  {
    id: "asis-5",
    department: "SAP Billing",
    title: "Conciliação manual de cobrança",
    metric: "72h",
    status: "critical",
    detail: "Risco financeiro e atraso no start de MRR.",
  },
];

export const toBeFlow: FlowStep[] = [
  {
    id: "tobe-1",
    department: "CRM",
    title: "Evento automático de oportunidade ganha",
    metric: "0h",
    status: "future",
    detail: "Projeto nasce com dados pré-validados e trilha de auditoria.",
  },
  {
    id: "tobe-2",
    department: "Governança",
    title: "Orquestração de implantação",
    metric: "2h",
    status: "future",
    detail: "Owners, SLAs e dependências são atribuídos no início.",
  },
  {
    id: "tobe-3",
    department: "Integrações",
    title: "Viabilidade e logística integradas",
    metric: "8h",
    status: "future",
    detail: "APIs atualizam status técnico e físico em tempo real.",
  },
  {
    id: "tobe-4",
    department: "NOC",
    title: "Provisionamento por template",
    metric: "4h",
    status: "future",
    detail: "Scripts padronizados reduzem erro e retrabalho.",
  },
  {
    id: "tobe-5",
    department: "CS",
    title: "Hypercare preditivo e customer health",
    metric: "7d",
    status: "future",
    detail: "Alertas chegam antes do cliente abrir escalonamento.",
  },
];

export const customerJourney: CustomerJourneyStep[] = [
  {
    stage: "Kickoff",
    pain: "Cliente repete informações já vendidas no contrato.",
    risk: "Baixa confiança inicial",
    score: 74,
  },
  {
    stage: "Viabilidade",
    pain: "Prazo técnico incerto e pouca visibilidade de decisão.",
    risk: "Atraso percebido",
    score: 61,
  },
  {
    stage: "Ativação",
    pain: "Agendamento sofre com status físico de equipamento.",
    risk: "Frustração operacional",
    score: 58,
  },
  {
    stage: "Hypercare",
    pain: "Escalação acontece depois do desgaste da conta.",
    risk: "Churn risk",
    score: 68,
  },
];

export const roadmapPhases: RoadmapPhase[] = [
  {
    phase: "Immediate Actions",
    horizon: "0-15 dias",
    focus: "Remover filas críticas e proteger contas VIP",
    milestones: ["Escalar Bradesco", "War room Ambev", "Daily SLA board"],
    gain: "Redução imediata de risco executivo",
  },
  {
    phase: "Short-Term Transformation",
    horizon: "30-60 dias",
    focus: "Padronizar handoffs e trilhas auditáveis",
    milestones: ["Wizard de kickoff", "Owners por etapa", "Alertas de aging"],
    gain: "Menos retrabalho e mais previsibilidade",
  },
  {
    phase: "Mid-Term Maturity",
    horizon: "90-120 dias",
    focus: "Integrar SAP, logística e viabilidade técnica",
    milestones: ["Webhook SAP", "API de rastreio", "Base geográfica"],
    gain: "Ciclo AS IS 120h -> TO BE 24h",
  },
  {
    phase: "Long-Term Scalability",
    horizon: "180 dias",
    focus: "Operação preditiva com IA e governança contínua",
    milestones: ["AI advisor", "Process mining", "Maturity governance"],
    gain: "Excelência operacional escalável",
  },
];

export const presentationData = {
  executiveKPIs,
  executiveRecommendations,
  organizationalHealthSignals,
  processMaturityScores,
  asIsFlow,
  toBeFlow,
  customerJourney,
  roadmapPhases,
};
