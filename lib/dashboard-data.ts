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
    value: String(enterpriseProcesses.length),
    change: "+18.2%",
    isPositive: true,
    icon: "processes",
    description: "vs. mês anterior",
    sparklineData: [24, 27, 31, 34, 36, 39, enterpriseProcesses.length],
    href: "/admin/processes",
  },
  {
    id: "active-projects",
    title: "Projetos Ativos",
    value: String(enterpriseProcesses.filter((process) => process.status === "ACTIVE").length),
    change: "+14.8%",
    isPositive: true,
    icon: "projects",
    description: "implantações B2B",
    sparklineData: [21, 23, 25, 27, 28, 29, enterpriseProcesses.filter((process) => process.status === "ACTIVE").length],
    href: "/admin/roadmaps",
  },
  {
    id: "critical-bottlenecks",
    title: "Gargalos Críticos",
    value: String(enterpriseBottlenecks.filter((bottleneck) => bottleneck.severity === "CRITICAL").length),
    change: "-40.0%",
    isPositive: true,
    icon: "bottlenecks",
    description: "gargalos mitigados",
    sparklineData: [8, 7, 6, 5, 4, 3, 3],
    href: "/admin/bottlenecks",
    isAlert: true,
    alertText: "Finance + Engenharia",
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
    sparklineData: enterpriseKpis[0].history,
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
    sparklineData: enterpriseKpis.find((kpi) => kpi.id === "KPI-011")?.history || [18.5, 17.2, 16.0, 15.1, 14.2, 13.0, 12.4],
    href: "/admin/customer-success",
  },
  {
    id: "maturity-score",
    title: "Maturidade de Processo",
    value: "76.5",
    unit: "%",
    change: "+5.2%",
    isPositive: true,
    icon: "maturity",
    description: "evolução do TO BE",
    sparklineData: [61, 64, 67, 70, 72, 74, 76.5],
    href: "/admin/bpmn",
  },
  {
    id: "churn-risk",
    title: "Clientes em Risco",
    value: String(customerHealthData.filter((customer) => customer.sentiment === "churn_risk").length),
    change: "-33.0%",
    isPositive: true,
    icon: "customers",
    description: "contas em Hypercare",
    sparklineData: [4, 4, 3, 3, 2, 2, customerHealthData.filter((customer) => customer.sentiment === "churn_risk").length],
    href: "/admin/customer-success",
    isAlert: true,
    alertText: "Ambev em Risco",
  },
  {
    id: "open-risks",
    title: "Riscos Mapeados",
    value: String(enterpriseProcesses.filter((process) => process.risks.length > 1).length),
    change: "+22.0%",
    isPositive: true,
    icon: "openRisks",
    description: "riscos operacionais",
    sparklineData: [18, 20, 23, 26, 29, 31, enterpriseProcesses.filter((process) => process.risks.length > 1).length],
    href: "/admin/risks",
  },
  {
    id: "transformation-progress",
    title: "Adoção TO BE",
    value: "62.5",
    unit: "%",
    change: "+8.4%",
    isPositive: true,
    icon: "transformation",
    description: "rollout nos setores",
    sparklineData: [38, 42, 46, 51, 56, 60, 62.5],
    href: "/admin/roadmaps",
  },
  {
    id: "executive-health",
    title: "Saúde da Operação",
    value: "84.0",
    unit: "%",
    change: "+4.8%",
    isPositive: true,
    icon: "health",
    description: "score agregado",
    sparklineData: [72, 75, 78, 80, 81, 83, 84.0],
    href: "/admin/operations",
  },
];

export const organizationalHealthSignals: OrganizationalHealthSignal[] = [
  ...organizationData.slice(2, 7).map((node) => ({
    department: node.department,
    workload: node.workload,
    capacity: node.capacity,
    ownershipRisk: node.dependencyRisk === "CRITICAL" || node.dependencyRisk === "HIGH" ? "Alto" as const : node.dependencyRisk === "MEDIUM" ? "Médio" as const : "Baixo" as const,
    dependency: node.governanceGap,
  })),
];

export const processMaturityScores: ProcessMaturityScore[] = [
  { department: "Commercial", level: 3, score: 68, evidence: "Handoff comercial ainda em transição para wizard auditável." },
  { department: "Connectivity", level: 2, score: 54, evidence: "Validação geográfica é o maior gap de governança atual." },
  { department: "NOC", level: 3, score: 72, evidence: "Templates de provisionamento ainda não cobrem todos os cenários." },
  { department: "Finance SAP", level: 2, score: 49, evidence: "Conciliação manual impede maturidade nível 5." },
  { department: "Customer Success", level: 4, score: 84, evidence: "Hypercare e renewal risk já operam com sinais estruturados." },
];

export const executiveRecommendations: ExecutiveRecommendation[] = [
  ...transformationRoadmap.slice(0, 3).map((initiative) => ({
    id: initiative.id.replace("TR", "REC"),
    priority: initiative.priority === "P0" ? "Imediata" as const : initiative.priority === "P1" ? "Alta" as const : "Estratégica" as const,
    title: initiative.title,
    impact: initiative.expectedGain,
    owner: initiative.owner,
    due: initiative.timeline,
  })),
];
import {
  customerHealthData,
  enterpriseBottlenecks,
  enterpriseKpis,
  enterpriseProcesses,
  organizationData,
  transformationRoadmap,
} from "@/lib/enterprise-operational-data";
