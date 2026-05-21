export type KPIIconKey =
  | "processes"
  | "projects"
  | "bottlenecks"
  | "sla"
  | "risk"
  | "maturity"
  | "customers"
  | "openRisks"
  | "transformation"
  | "health";

export interface ExecutiveKPI {
  id: string;
  title: string;
  value: string;
  unit?: string;
  change: string;
  isPositive: boolean;
  icon: KPIIconKey;
  description: string;
  sparklineData: number[];
  href: string;
  isAlert?: boolean;
  alertText?: string;
}

export interface OrganizationalHealthSignal {
  department: string;
  workload: number;
  capacity: number;
  ownershipRisk: "Baixo" | "Médio" | "Alto";
  dependency: string;
}

export interface ExecutiveRecommendation {
  id: string;
  priority: "Imediata" | "Alta" | "Estratégica";
  title: string;
  impact: string;
  owner: string;
  due: string;
}

export interface ProcessMaturityScore {
  department: string;
  level: 1 | 2 | 3 | 4 | 5;
  score: number;
  evidence: string;
}

export const executiveKPIs: ExecutiveKPI[] = [
  {
    id: "total-processes",
    title: "Processos Totais",
    value: "148",
    change: "+4.8%",
    isPositive: true,
    icon: "processes",
    description: "vs. mês anterior",
    sparklineData: [132, 134, 138, 140, 142, 145, 148],
    href: "/admin/processes",
  },
  {
    id: "active-projects",
    title: "Projetos Ativos",
    value: "86",
    change: "+12.4%",
    isPositive: true,
    icon: "projects",
    description: "implantações B2B",
    sparklineData: [72, 75, 78, 80, 82, 84, 86],
    href: "/admin/roadmaps",
  },
  {
    id: "critical-bottlenecks",
    title: "Gargalos Críticos",
    value: "3",
    change: "-40.0%",
    isPositive: true,
    icon: "bottlenecks",
    description: "gargalos mitigados",
    sparklineData: [8, 7, 6, 5, 4, 3, 3],
    href: "/admin/bottlenecks",
    isAlert: true,
    alertText: "3 Pontos de Latência",
  },
  {
    id: "sla-compliance",
    title: "Conformidade de SLA",
    value: "96.4",
    unit: "%",
    change: "+0.9%",
    isPositive: true,
    icon: "sla",
    description: "meta global de 95.0%",
    sparklineData: [94.2, 94.8, 95.1, 95.7, 95.5, 96.0, 96.4],
    href: "/admin/kpis",
  },
  {
    id: "customer-risk-score",
    title: "Risco Geral de Churn",
    value: "12.4",
    unit: "%",
    change: "-12.8%",
    isPositive: true,
    icon: "risk",
    description: "risco geral em CS",
    sparklineData: [18.5, 17.2, 16.0, 15.1, 14.2, 13.0, 12.4],
    href: "/admin/customer-success",
  },
  {
    id: "maturity-score",
    title: "Maturidade de Processo",
    value: "84.5",
    unit: "%",
    change: "+5.2%",
    isPositive: true,
    icon: "maturity",
    description: "evolução do TO BE",
    sparklineData: [68, 71, 74, 78, 80, 82, 84.5],
    href: "/admin/bpmn",
  },
  {
    id: "churn-risk",
    title: "Clientes em Risco",
    value: "1",
    change: "-50.0%",
    isPositive: true,
    icon: "customers",
    description: "contas em Hypercare",
    sparklineData: [3, 3, 2, 2, 2, 1, 1],
    href: "/admin/customer-success",
    isAlert: true,
    alertText: "Ambev em Risco",
  },
  {
    id: "open-risks",
    title: "Riscos Mapeados",
    value: "4",
    change: "0.0%",
    isPositive: true,
    icon: "openRisks",
    description: "riscos operacionais",
    sparklineData: [5, 4, 4, 4, 4, 4, 4],
    href: "/admin/risks",
  },
  {
    id: "transformation-progress",
    title: "Adoção TO BE",
    value: "63.0",
    unit: "%",
    change: "+8.4%",
    isPositive: true,
    icon: "transformation",
    description: "rollout nos setores",
    sparklineData: [42, 45, 48, 52, 55, 59, 63.0],
    href: "/admin/roadmaps",
  },
  {
    id: "executive-health",
    title: "Saúde da Operação",
    value: "88.0",
    unit: "%",
    change: "+4.8%",
    isPositive: true,
    icon: "health",
    description: "score agregado",
    sparklineData: [80, 81, 83, 84, 85, 86, 88.0],
    href: "/admin/operations",
  },
];

export const organizationalHealthSignals: OrganizationalHealthSignal[] = [
  {
    department: "Engenharia TI",
    workload: 91,
    capacity: 74,
    ownershipRisk: "Alto",
    dependency: "Validação geográfica concentrada em 2 especialistas",
  },
  {
    department: "NOC Técnico",
    workload: 84,
    capacity: 79,
    ownershipRisk: "Médio",
    dependency: "Provisionamento CLI e homologação de roteador core",
  },
  {
    department: "CS / Hypercare",
    workload: 72,
    capacity: 86,
    ownershipRisk: "Médio",
    dependency: "Escalações de contas VIP dependem de handoff manual",
  },
  {
    department: "SAP Billing",
    workload: 68,
    capacity: 81,
    ownershipRisk: "Baixo",
    dependency: "Conciliação OneDrive em transição para webhook",
  },
];

export const processMaturityScores: ProcessMaturityScore[] = [
  {
    department: "Comercial",
    level: 4,
    score: 90,
    evidence: "Wizard de kickoff e criação de projeto já em rollout.",
  },
  {
    department: "Engenharia",
    level: 3,
    score: 76,
    evidence: "BPMN mapeado, mas consulta geográfica ainda manual.",
  },
  {
    department: "Logística",
    level: 3,
    score: 69,
    evidence: "Rastreio de hardware parcialmente integrado.",
  },
  {
    department: "Financeiro SAP",
    level: 2,
    score: 58,
    evidence: "Alta dependência de planilhas e conciliação humana.",
  },
];

export const executiveRecommendations: ExecutiveRecommendation[] = [
  {
    id: "REC-001",
    priority: "Imediata",
    title: "Escalar validação geográfica do Bradesco Centro-Oeste",
    impact: "Remove 72h de fila crítica e protege go-live de agências satélite.",
    owner: "Engenharia TI",
    due: "24h",
  },
  {
    id: "REC-002",
    priority: "Alta",
    title: "Ativar automação de conciliação SAP para Ambev",
    impact: "Mitiga R$ 480k em atrito contratual e reduz risco de churn VIP.",
    owner: "SAP Billing",
    due: "48h",
  },
  {
    id: "REC-003",
    priority: "Estratégica",
    title: "Fechar migração de handoffs OneDrive para eventos auditáveis",
    impact: "Eleva maturidade operacional para nível 5 e reduz dependência informal.",
    owner: "Governança",
    due: "14 dias",
  },
];
