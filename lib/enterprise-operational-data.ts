export type EnterpriseDepartment =
  | "Connectivity Implementation"
  | "SaaS Implementation"
  | "Customer Success"
  | "Support"
  | "NOC"
  | "Operations"
  | "Commercial"
  | "Development"
  | "Logistics"
  | "Finance"
  | "Executive Management";

export type ProcessStatus = "ACTIVE" | "OPTIMIZING" | "DRAFT" | "PAUSED";
export type ProcessType = "AS_IS" | "TO_BE";
export type SlaStatus = "STABLE" | "DELAYED" | "CRITICAL";
export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type Severity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface EnterpriseProcess {
  id: string;
  name: string;
  department: EnterpriseDepartment;
  owner: string;
  description: string;
  maturityLevel: 1 | 2 | 3 | 4 | 5;
  sla: string;
  slaStatus: SlaStatus;
  status: ProcessStatus;
  risks: string[];
  dependencies: string[];
  bottlenecks: string[];
  customerImpact: string;
  kpis: string[];
  type: ProcessType;
  lastUpdate: string;
}

export interface EnterpriseBottleneck {
  id: string;
  title: string;
  affectedDepartment: EnterpriseDepartment;
  severity: Severity;
  riskLevel: RiskLevel;
  averageDelayHours: number;
  impact: string;
  customerImpact: string;
  suggestedAction: string;
  relatedProcesses: string[];
}

export interface EnterpriseKpi {
  id: string;
  name: string;
  process: string;
  owner: EnterpriseDepartment;
  target: number;
  current: number;
  unit: string;
  status: "OK" | "WARNING" | "VIOLATED";
  trend: string;
  isPositive: boolean;
  threshold: string;
  history: number[];
}

export interface ExecutiveAlertData {
  id: string;
  severity: "critical" | "warning" | "info";
  title: string;
  description: string;
  owner: string;
  createdAt: string;
  suggestedAction: string;
}

export interface CustomerOperationalHealth {
  id: string;
  name: string;
  segment: "Enterprise" | "Strategic" | "Corporate" | "Mid-Market";
  stage: string;
  healthScore: number;
  churnRisk: number;
  adoptionRisk: number;
  escalationCount: number;
  slaImpact: string;
  sentiment: "excellent" | "stable" | "watch" | "churn_risk";
  operationalImpact: string;
  nextAction: string;
}

export interface OrganizationNode {
  id: string;
  department: EnterpriseDepartment;
  leader: string;
  responsibilities: string[];
  reportsTo: string;
  workload: number;
  capacity: number;
  dependencyRisk: RiskLevel;
  governanceGap: string;
}

export interface BpmnWorkflowExample {
  id: string;
  name: string;
  owner: EnterpriseDepartment;
  type: ProcessType;
  steps: {
    title: string;
    lane: EnterpriseDepartment | "Customer";
    sla: string;
    risk: string;
    checkpoint: string;
  }[];
}

export interface AiOperationalInsight {
  id: string;
  category: "risk_prediction" | "bottleneck" | "maturity_gap" | "customer_risk" | "optimization";
  title: string;
  confidence: number;
  evidence: string;
  businessImpact: string;
  recommendation: string;
}

export interface TransformationInitiative {
  id: string;
  phase: "Immediate" | "Short-term" | "Mid-term" | "Long-term";
  timeline: string;
  title: string;
  owner: EnterpriseDepartment;
  priority: "P0" | "P1" | "P2";
  expectedGain: string;
  dependencies: string[];
}

const owners = {
  connectivity: "Amanda Lima",
  saas: "Rafael Teixeira",
  cs: "Juliana Mendes",
  support: "Bruno Ribeiro",
  noc: "Carlos Ramos",
  ops: "William Lima",
  commercial: "Mariana Costa",
  development: "Felipe Andrade",
  logistics: "Marcos Souza",
  finance: "Beatriz Mello",
  executive: "William Lima",
};

export const enterpriseProcesses: EnterpriseProcess[] = [
  {
    id: "PRC-001",
    name: "Enterprise Connectivity Kickoff & Commercial Handoff",
    department: "Commercial",
    owner: owners.commercial,
    description: "Transição da oportunidade ganha para o projeto de implantação com validação de escopo, anexos técnicos e dados de contrato.",
    maturityLevel: 3,
    sla: "24h",
    slaStatus: "DELAYED",
    status: "OPTIMIZING",
    risks: ["Perda de anexos técnicos", "Divergência entre contrato e ordem de serviço"],
    dependencies: ["Salesforce", "OneDrive", "Connectivity Implementation"],
    bottlenecks: ["Checklist comercial ainda depende de upload manual"],
    customerImpact: "Cliente precisa reconfirmar informações já negociadas, reduzindo confiança no início do projeto.",
    kpis: ["Commercial handoff lead time", "Checklist completeness", "Rework rate"],
    type: "AS_IS",
    lastUpdate: "Há 3h",
  },
  {
    id: "PRC-002",
    name: "Link Activation - Fiber Feasibility Validation",
    department: "Connectivity Implementation",
    owner: owners.connectivity,
    description: "Validação de viabilidade geográfica de fibra, postes, caixa de atendimento e restrições de campo.",
    maturityLevel: 2,
    sla: "48h",
    slaStatus: "CRITICAL",
    status: "ACTIVE",
    risks: ["Base geográfica desatualizada", "Falsa viabilidade positiva", "Fila concentrada em especialistas"],
    dependencies: ["Google Earth", "Engineering backlog", "Field Operations"],
    bottlenecks: ["Consulta manual de postes", "Aprovação técnica sem prioridade executiva"],
    customerImpact: "Atraso de go-live em contas multi-site e risco de desgaste antes da ativação.",
    kpis: ["Feasibility lead time", "Technical rejection rate", "Aging > 48h"],
    type: "AS_IS",
    lastUpdate: "Há 32min",
  },
  {
    id: "PRC-003",
    name: "Hardware Logistics & Switch Dispatch",
    department: "Logistics",
    owner: owners.logistics,
    description: "Separação, embalagem, expedição e atualização de status de roteadores, ONTs e switches para implantação.",
    maturityLevel: 3,
    sla: "72h",
    slaStatus: "DELAYED",
    status: "ACTIVE",
    risks: ["Extravio de hardware", "Visita técnica agendada sem equipamento entregue"],
    dependencies: ["Warehouse inventory", "Transportadora", "Customer Success"],
    bottlenecks: ["Rastreio físico não integrado", "Atualização por WhatsApp com transportadora"],
    customerImpact: "Técnicos de campo podem perder visita e cliente percebe desorganização operacional.",
    kpis: ["Dispatch aging", "Delivery accuracy", "Lost visit rate"],
    type: "AS_IS",
    lastUpdate: "Há 1h",
  },
  {
    id: "PRC-004",
    name: "NOC Circuit Provisioning & CLI Configuration",
    department: "NOC",
    owner: owners.noc,
    description: "Provisionamento de VLAN, IP, portas, rotas e templates de configuração em equipamentos de rede.",
    maturityLevel: 3,
    sla: "24h",
    slaStatus: "DELAYED",
    status: "OPTIMIZING",
    risks: ["Erro humano em CLI", "Rollback sem documentação", "Fila NOC em horários de pico"],
    dependencies: ["Engineering design", "Device inventory", "Customer maintenance window"],
    bottlenecks: ["Configuração manual linha a linha", "Janela com cliente depende de e-mail"],
    customerImpact: "Instabilidade pós-ativação e necessidade de hypercare técnico prolongado.",
    kpis: ["Provisioning lead time", "Configuration error rate", "First-time activation success"],
    type: "AS_IS",
    lastUpdate: "Há 45min",
  },
  {
    id: "PRC-005",
    name: "SAP Billing Reconciliation for Enterprise Contracts",
    department: "Finance",
    owner: owners.finance,
    description: "Conciliação de contratos, chaves de faturamento e início de cobrança recorrente no SAP R/3.",
    maturityLevel: 2,
    sla: "72h",
    slaStatus: "CRITICAL",
    status: "ACTIVE",
    risks: ["Atraso de MRR", "Erro de chave fiscal", "Baixa rastreabilidade de alteração"],
    dependencies: ["SAP R/3", "OneDrive billing sheet", "Commercial contract"],
    bottlenecks: ["Cruzamento manual de planilhas", "Aprovação financeira em lote semanal"],
    customerImpact: "Risco de cobrança duplicada ou início tardio de faturamento em contas VIP.",
    kpis: ["Billing reconciliation latency", "Invoice defect rate", "MRR activation delay"],
    type: "AS_IS",
    lastUpdate: "Há 18min",
  },
  {
    id: "PRC-006",
    name: "Customer Go-Live Approval & Acceptance Term",
    department: "Customer Success",
    owner: owners.cs,
    description: "Validação final com cliente, coleta de aceite e transição formal da implantação para operação assistida.",
    maturityLevel: 3,
    sla: "12h",
    slaStatus: "STABLE",
    status: "ACTIVE",
    risks: ["Aceite físico perdido", "Cliente sem responsável disponível"],
    dependencies: ["NOC activation", "Customer sponsor", "Digital signature"],
    bottlenecks: ["Aceite ainda depende de agenda do cliente"],
    customerImpact: "Atraso no encerramento do projeto e sensação de indefinição operacional.",
    kpis: ["Acceptance cycle time", "Pending acceptance count", "Go-live satisfaction"],
    type: "TO_BE",
    lastUpdate: "Ontem",
  },
  {
    id: "PRC-007",
    name: "Hypercare Monitoring for Strategic Accounts",
    department: "Customer Success",
    owner: owners.cs,
    description: "Acompanhamento pós-go-live com sinais de estabilidade, incidentes, sentimento e risco de churn.",
    maturityLevel: 4,
    sla: "7d",
    slaStatus: "STABLE",
    status: "ACTIVE",
    risks: ["Problemas tratados informalmente", "Escalação tardia ao NOC"],
    dependencies: ["Support", "NOC telemetry", "Customer contacts"],
    bottlenecks: ["Dados de incidentes e sentimento não ficam no mesmo cockpit"],
    customerImpact: "Melhora a retenção quando executado com alertas preventivos.",
    kpis: ["Hypercare incident rate", "CSAT after go-live", "Churn risk score"],
    type: "TO_BE",
    lastUpdate: "Há 2h",
  },
  {
    id: "PRC-008",
    name: "SaaS Tenant Provisioning & Workspace Setup",
    department: "SaaS Implementation",
    owner: owners.saas,
    description: "Criação de tenant, domínios, usuários administradores, permissões e ambientes iniciais para clientes SaaS.",
    maturityLevel: 4,
    sla: "16h",
    slaStatus: "STABLE",
    status: "ACTIVE",
    risks: ["Domínio DNS pendente", "Permissão inicial incorreta"],
    dependencies: ["Development", "Customer IT", "Identity provider"],
    bottlenecks: ["Dependência de resposta do cliente para DNS"],
    customerImpact: "Atrasos no primeiro acesso prejudicam adoção inicial.",
    kpis: ["Tenant setup lead time", "Access defect rate", "Activation success"],
    type: "TO_BE",
    lastUpdate: "Hoje, 09:20",
  },
  {
    id: "PRC-009",
    name: "SaaS Data Migration Readiness",
    department: "SaaS Implementation",
    owner: owners.saas,
    description: "Mapeamento de fontes, validação de arquivos, saneamento e carga inicial de dados de clientes SaaS.",
    maturityLevel: 3,
    sla: "5d",
    slaStatus: "DELAYED",
    status: "ACTIVE",
    risks: ["Arquivo fora de padrão", "Dados duplicados", "Janela de corte indisponível"],
    dependencies: ["Customer data owner", "Development scripts", "Support"],
    bottlenecks: ["Validação manual de layout de CSV"],
    customerImpact: "Atraso no onboarding e necessidade de treinamento em ambiente incompleto.",
    kpis: ["Migration readiness score", "Rejected file rate", "Data load duration"],
    type: "AS_IS",
    lastUpdate: "Há 6h",
  },
  {
    id: "PRC-010",
    name: "Firewall Rule Change for Enterprise Links",
    department: "NOC",
    owner: owners.noc,
    description: "Avaliação, aprovação, execução e validação de mudanças em regras de firewall para links corporativos.",
    maturityLevel: 3,
    sla: "8h",
    slaStatus: "STABLE",
    status: "ACTIVE",
    risks: ["Regra ampla demais", "Mudança sem rollback", "Aprovação de segurança ausente"],
    dependencies: ["Support ticket", "Security approval", "Customer maintenance window"],
    bottlenecks: ["Aprovação de janela com cliente"],
    customerImpact: "Mudanças lentas podem bloquear integrações críticas do cliente.",
    kpis: ["Change lead time", "Rollback rate", "Security exception count"],
    type: "TO_BE",
    lastUpdate: "Hoje, 11:05",
  },
  {
    id: "PRC-011",
    name: "Major Incident Escalation - P1 Connectivity",
    department: "Support",
    owner: owners.support,
    description: "Triagem, escalonamento, war room, comunicação executiva e resolução de incidentes P1.",
    maturityLevel: 4,
    sla: "30min resposta / 4h resolução",
    slaStatus: "STABLE",
    status: "ACTIVE",
    risks: ["Comunicação fragmentada", "NOC acionado tarde", "Cliente sem ETA"],
    dependencies: ["NOC", "Customer Success", "Executive Management"],
    bottlenecks: ["Status update manual em múltiplos canais"],
    customerImpact: "Comunicação clara reduz churn mesmo quando o incidente é crítico.",
    kpis: ["MTTA", "MTTR", "Executive update compliance"],
    type: "TO_BE",
    lastUpdate: "Há 28min",
  },
  {
    id: "PRC-012",
    name: "Customer Escalation Review Board",
    department: "Executive Management",
    owner: owners.executive,
    description: "Ritual semanal para revisar contas críticas, risco de churn, aging de SLA e plano de mitigação.",
    maturityLevel: 4,
    sla: "Semanal",
    slaStatus: "STABLE",
    status: "ACTIVE",
    risks: ["Decisão sem follow-up", "Plano de ação não auditável"],
    dependencies: ["Customer Success", "Finance", "Operations"],
    bottlenecks: ["Consolidação manual de status para diretoria"],
    customerImpact: "Acelera decisões em contas estratégicas antes da erosão de confiança.",
    kpis: ["Action closure rate", "VIP churn risk", "Escalation aging"],
    type: "TO_BE",
    lastUpdate: "Ontem, 17:45",
  },
  {
    id: "PRC-013",
    name: "Operational Daily SLA Control Tower",
    department: "Operations",
    owner: owners.ops,
    description: "Ritual diário de controle de SLAs, backlog, aging e priorização de filas críticas.",
    maturityLevel: 4,
    sla: "Diário 09:00",
    slaStatus: "STABLE",
    status: "ACTIVE",
    risks: ["Fila crítica sem dono", "Prioridade conflitante entre áreas"],
    dependencies: ["All operational teams", "Dashboard data", "Executive alerts"],
    bottlenecks: ["Dados ainda chegam de fontes heterogêneas"],
    customerImpact: "Reduz surpresas e melhora previsibilidade para clientes em implantação.",
    kpis: ["Aging > SLA", "Backlog burn-down", "Owner assignment time"],
    type: "TO_BE",
    lastUpdate: "Hoje, 09:05",
  },
  {
    id: "PRC-014",
    name: "API Integration Release Governance",
    department: "Development",
    owner: owners.development,
    description: "Controle de releases de APIs de integração, versionamento, rollback e comunicação para operações.",
    maturityLevel: 4,
    sla: "2d mudança padrão",
    slaStatus: "STABLE",
    status: "ACTIVE",
    risks: ["Breaking change sem aviso", "Rollback não testado"],
    dependencies: ["Operations", "SaaS Implementation", "NOC"],
    bottlenecks: ["Validação operacional manual antes do deploy"],
    customerImpact: "Reduz falhas durante integrações críticas de clientes enterprise.",
    kpis: ["Deployment success rate", "Change failure rate", "Rollback readiness"],
    type: "TO_BE",
    lastUpdate: "Hoje, 10:10",
  },
  {
    id: "PRC-015",
    name: "Commercial Contract Amendment Approval",
    department: "Commercial",
    owner: owners.commercial,
    description: "Aprovação de aditivos comerciais, alteração de escopo e impacto em cronograma operacional.",
    maturityLevel: 2,
    sla: "3d",
    slaStatus: "DELAYED",
    status: "ACTIVE",
    risks: ["Mudança vendida sem impacto operacional", "Escopo sem aceite técnico"],
    dependencies: ["Finance", "Connectivity Implementation", "Executive Management"],
    bottlenecks: ["Aprovação executiva em e-mail sem registro de decisão"],
    customerImpact: "Expectativas podem divergir da capacidade real de entrega.",
    kpis: ["Amendment cycle time", "Scope rework", "Margin approval aging"],
    type: "AS_IS",
    lastUpdate: "Há 1d",
  },
  {
    id: "PRC-016",
    name: "Field Service Scheduling & Visit Confirmation",
    department: "Operations",
    owner: owners.ops,
    description: "Agenda de técnicos de campo, confirmação com cliente, dependência logística e checklist de visita.",
    maturityLevel: 3,
    sla: "48h antes da visita",
    slaStatus: "DELAYED",
    status: "ACTIVE",
    risks: ["No-show do cliente", "Equipamento não entregue", "Técnico sem escopo final"],
    dependencies: ["Logistics", "Customer Success", "NOC"],
    bottlenecks: ["Confirmação por e-mail e WhatsApp sem status central"],
    customerImpact: "Visitas improdutivas geram desgaste e atraso de go-live.",
    kpis: ["Visit success rate", "No-show rate", "Schedule confirmation lead time"],
    type: "AS_IS",
    lastUpdate: "Há 5h",
  },
  {
    id: "PRC-017",
    name: "Customer Technical Validation Call",
    department: "Connectivity Implementation",
    owner: owners.connectivity,
    description: "Sessão técnica com cliente para validar IPs, firewall, janela de mudança e critérios de aceite.",
    maturityLevel: 3,
    sla: "24h após viabilidade",
    slaStatus: "STABLE",
    status: "ACTIVE",
    risks: ["Contato técnico indisponível", "Critérios de aceite não formalizados"],
    dependencies: ["Customer IT", "NOC", "Commercial scope"],
    bottlenecks: ["Agenda do cliente trava sequência técnica"],
    customerImpact: "Boa validação reduz retrabalho e incidentes de ativação.",
    kpis: ["Validation completion rate", "Technical rework", "Customer response aging"],
    type: "TO_BE",
    lastUpdate: "Há 4h",
  },
  {
    id: "PRC-018",
    name: "Support N2 to NOC Escalation",
    department: "Support",
    owner: owners.support,
    description: "Classificação de incidentes N2 e escalonamento para NOC com evidências técnicas mínimas.",
    maturityLevel: 3,
    sla: "45min",
    slaStatus: "DELAYED",
    status: "OPTIMIZING",
    risks: ["Chamado sem evidência", "Escalonamento duplicado", "Cliente sem atualização"],
    dependencies: ["NOC queue", "Monitoring logs", "Customer Success"],
    bottlenecks: ["Evidências coletadas manualmente em múltiplas ferramentas"],
    customerImpact: "Atraso aumenta sensação de ineficiência do suporte.",
    kpis: ["Escalation rate", "Evidence completeness", "Time to NOC assignment"],
    type: "AS_IS",
    lastUpdate: "Há 50min",
  },
  {
    id: "PRC-019",
    name: "Customer Adoption Health Review",
    department: "Customer Success",
    owner: owners.cs,
    description: "Revisão mensal de adoção, satisfação, valor percebido e risco de expansão ou churn.",
    maturityLevel: 4,
    sla: "Mensal",
    slaStatus: "STABLE",
    status: "ACTIVE",
    risks: ["Sinal de churn não identificado", "Baixa adoção de funcionalidades"],
    dependencies: ["Usage analytics", "Support history", "Executive sponsor"],
    bottlenecks: ["Uso e incidentes ainda não estão totalmente correlacionados"],
    customerImpact: "Aumenta retenção e gera plano proativo de valor.",
    kpis: ["NPS", "Adoption score", "Expansion readiness"],
    type: "TO_BE",
    lastUpdate: "Ontem, 14:15",
  },
  {
    id: "PRC-020",
    name: "SaaS Training & Enablement Plan",
    department: "SaaS Implementation",
    owner: owners.saas,
    description: "Planejamento de treinamento, agenda, turmas, documentação e validação de usuários-chave.",
    maturityLevel: 4,
    sla: "5d antes go-live",
    slaStatus: "STABLE",
    status: "ACTIVE",
    risks: ["Baixa presença", "Usuários-chave não habilitados"],
    dependencies: ["Customer sponsor", "Documentation", "Customer Success"],
    bottlenecks: ["Agenda de turmas depende de múltiplos departamentos do cliente"],
    customerImpact: "Treinamento adequado acelera adoção e reduz chamados pós-go-live.",
    kpis: ["Training attendance", "Readiness score", "Post go-live tickets"],
    type: "TO_BE",
    lastUpdate: "Há 8h",
  },
  {
    id: "PRC-021",
    name: "Operations Capacity Planning",
    department: "Operations",
    owner: owners.ops,
    description: "Planejamento de capacidade por time, previsão de demanda e alocação de especialistas críticos.",
    maturityLevel: 3,
    sla: "Quinzenal",
    slaStatus: "DELAYED",
    status: "OPTIMIZING",
    risks: ["Sobrecarga de especialistas", "Fila invisível em Engenharia e NOC"],
    dependencies: ["Commercial forecast", "Process backlog", "Resource planning"],
    bottlenecks: ["Forecast comercial chega tarde para operações"],
    customerImpact: "Picos de demanda aumentam aging e atrasam projetos enterprise.",
    kpis: ["Workload vs capacity", "Critical skill concentration", "Forecast accuracy"],
    type: "AS_IS",
    lastUpdate: "Há 2d",
  },
  {
    id: "PRC-022",
    name: "Executive KPI Pack Publication",
    department: "Executive Management",
    owner: owners.executive,
    description: "Consolidação de métricas executivas, narrativa de maturidade e recomendações de decisão.",
    maturityLevel: 4,
    sla: "Sexta 12:00",
    slaStatus: "STABLE",
    status: "ACTIVE",
    risks: ["Dados divergentes entre áreas", "Narrativa desatualizada"],
    dependencies: ["Operations", "Finance", "Customer Success"],
    bottlenecks: ["Consolidação final ainda exige curadoria humana"],
    customerImpact: "Melhora governança e priorização que afetam diretamente contas críticas.",
    kpis: ["Report freshness", "Decision closure rate", "Metric coverage"],
    type: "TO_BE",
    lastUpdate: "Hoje, 08:45",
  },
  {
    id: "PRC-023",
    name: "Network Monitoring Alarm Triage",
    department: "NOC",
    owner: owners.noc,
    description: "Triagem de alarmes de rede, correlação de impacto e abertura preventiva de incidentes.",
    maturityLevel: 4,
    sla: "15min",
    slaStatus: "STABLE",
    status: "ACTIVE",
    risks: ["Falso positivo", "Alarme correlacionado tratado isoladamente"],
    dependencies: ["Monitoring stack", "Support", "Customer Success"],
    bottlenecks: ["Correlação ainda semi-manual em contas multi-site"],
    customerImpact: "Atuação preventiva evita escalonamento pelo cliente.",
    kpis: ["Alarm triage time", "False positive rate", "Prevented incidents"],
    type: "TO_BE",
    lastUpdate: "Há 12min",
  },
  {
    id: "PRC-024",
    name: "Inventory Replenishment for Connectivity Projects",
    department: "Logistics",
    owner: owners.logistics,
    description: "Previsão de demanda, reposição de estoque e reserva de hardware para projetos futuros.",
    maturityLevel: 3,
    sla: "Semanal",
    slaStatus: "STABLE",
    status: "ACTIVE",
    risks: ["Ruptura de estoque", "Compra emergencial com custo alto"],
    dependencies: ["Commercial forecast", "Finance approval", "Warehouse"],
    bottlenecks: ["Forecast operacional e comercial não sincronizados"],
    customerImpact: "Estoque correto reduz atrasos de implantação e visitas improdutivas.",
    kpis: ["Stockout risk", "Forecast variance", "Reserved hardware coverage"],
    type: "TO_BE",
    lastUpdate: "Ontem, 10:30",
  },
  {
    id: "PRC-025",
    name: "Finance Credit Approval for Strategic Customers",
    department: "Finance",
    owner: owners.finance,
    description: "Análise de crédito, limite, exposição financeira e liberação para início de implantação.",
    maturityLevel: 2,
    sla: "48h",
    slaStatus: "DELAYED",
    status: "ACTIVE",
    risks: ["Aprovação tardia", "Exposição sem validação", "Bloqueio após kickoff"],
    dependencies: ["Commercial contract", "Customer documents", "Executive approval"],
    bottlenecks: ["Documentos financeiros chegam incompletos"],
    customerImpact: "Cliente pode iniciar jornada e ser bloqueado por pendência financeira.",
    kpis: ["Credit approval lead time", "Incomplete document rate", "Blocked kickoff count"],
    type: "AS_IS",
    lastUpdate: "Há 7h",
  },
  {
    id: "PRC-026",
    name: "Customer Data Privacy Review",
    department: "Development",
    owner: owners.development,
    description: "Revisão de privacidade, retenção, acesso e segurança de dados em integrações SaaS e conectividade.",
    maturityLevel: 4,
    sla: "3d",
    slaStatus: "STABLE",
    status: "ACTIVE",
    risks: ["Escopo LGPD mal definido", "Acesso excessivo por perfil"],
    dependencies: ["Legal", "Customer security", "Architecture review"],
    bottlenecks: ["Validação jurídica pode atrasar contratos específicos"],
    customerImpact: "Confiança aumenta quando segurança é clara e auditável.",
    kpis: ["Privacy review lead time", "Access exception count", "Audit finding rate"],
    type: "TO_BE",
    lastUpdate: "Há 1d",
  },
  {
    id: "PRC-027",
    name: "Go-Live Readiness Gate",
    department: "Operations",
    owner: owners.ops,
    description: "Gate executivo de prontidão para go-live com checklist técnico, CS, billing e riscos abertos.",
    maturityLevel: 4,
    sla: "24h antes go-live",
    slaStatus: "STABLE",
    status: "ACTIVE",
    risks: ["Go-live aprovado com pendência oculta", "Billing não preparado"],
    dependencies: ["NOC", "Finance", "Customer Success", "Support"],
    bottlenecks: ["Alguns sinais de prontidão ainda são declarativos"],
    customerImpact: "Reduz falhas no primeiro dia de operação e aumenta confiança do cliente.",
    kpis: ["Readiness score", "Open risk count", "Go-live defect rate"],
    type: "TO_BE",
    lastUpdate: "Hoje, 13:10",
  },
  {
    id: "PRC-028",
    name: "Support Knowledge Base Article Lifecycle",
    department: "Support",
    owner: owners.support,
    description: "Criação, revisão, publicação e obsolescência de artigos de suporte para reduzir dependência de especialistas.",
    maturityLevel: 3,
    sla: "10d",
    slaStatus: "DELAYED",
    status: "OPTIMIZING",
    risks: ["Conhecimento tribal", "Artigo desatualizado", "Escalação evitável"],
    dependencies: ["NOC", "Development", "Customer Success"],
    bottlenecks: ["Especialistas não têm janela dedicada para documentar"],
    customerImpact: "Base forte reduz tempo de resolução e variação na qualidade do suporte.",
    kpis: ["Article freshness", "Self-service rate", "Avoidable escalation rate"],
    type: "AS_IS",
    lastUpdate: "Há 3d",
  },
  {
    id: "PRC-029",
    name: "SaaS Integration Webhook Certification",
    department: "Development",
    owner: owners.development,
    description: "Certificação de webhooks, autenticação, idempotência e observabilidade para integrações enterprise.",
    maturityLevel: 4,
    sla: "4d",
    slaStatus: "STABLE",
    status: "ACTIVE",
    risks: ["Webhook sem retry", "Duplicidade de eventos", "Falha silenciosa"],
    dependencies: ["Customer IT", "SaaS Implementation", "Monitoring"],
    bottlenecks: ["Ambiente do cliente nem sempre replica produção"],
    customerImpact: "Integrações confiáveis aumentam valor percebido e reduzem incidentes.",
    kpis: ["Certification pass rate", "Webhook error rate", "Integration uptime"],
    type: "TO_BE",
    lastUpdate: "Hoje, 15:40",
  },
  {
    id: "PRC-030",
    name: "Customer Renewal Risk Governance",
    department: "Customer Success",
    owner: owners.cs,
    description: "Ritual de risco de renovação com sinais de adoção, incidentes, SLA, sponsor e valor entregue.",
    maturityLevel: 4,
    sla: "Mensal D-90",
    slaStatus: "STABLE",
    status: "ACTIVE",
    risks: ["Risco identificado tarde", "Plano de retenção sem dono"],
    dependencies: ["Executive sponsor", "Support history", "Finance exposure"],
    bottlenecks: ["Sinais qualitativos dependem de input manual de CSM"],
    customerImpact: "Reduz churn por transformar risco em plano de ação antes da renovação.",
    kpis: ["Renewal risk score", "Retention action closure", "Sponsor engagement"],
    type: "TO_BE",
    lastUpdate: "Ontem, 16:05",
  },
  {
    id: "PRC-031",
    name: "Commercial Forecast to Delivery Capacity Sync",
    department: "Commercial",
    owner: owners.commercial,
    description: "Sincronização de pipeline comercial com capacidade de implantação, NOC, logística e CS.",
    maturityLevel: 2,
    sla: "Semanal",
    slaStatus: "DELAYED",
    status: "OPTIMIZING",
    risks: ["Venda acima da capacidade", "Promessa de prazo irrealista"],
    dependencies: ["Operations capacity", "Finance approval", "Executive Management"],
    bottlenecks: ["Pipeline não informa complexidade operacional suficiente"],
    customerImpact: "Promessas desalinhadas geram risco de insatisfação logo no kickoff.",
    kpis: ["Forecast accuracy", "Capacity conflict count", "Promised vs actual go-live"],
    type: "AS_IS",
    lastUpdate: "Há 2d",
  },
  {
    id: "PRC-032",
    name: "Executive Change Approval for High-Risk Accounts",
    department: "Executive Management",
    owner: owners.executive,
    description: "Aprovação executiva de mudanças críticas em contas com impacto financeiro, regulatório ou reputacional.",
    maturityLevel: 3,
    sla: "24h",
    slaStatus: "STABLE",
    status: "ACTIVE",
    risks: ["Decisão tardia", "Sem registro de trade-off"],
    dependencies: ["Finance", "Customer Success", "Operations"],
    bottlenecks: ["Contexto precisa ser consolidado manualmente antes da decisão"],
    customerImpact: "Decisão rápida protege relacionamento em situações sensíveis.",
    kpis: ["Decision lead time", "Approval aging", "Post-change incident rate"],
    type: "TO_BE",
    lastUpdate: "Hoje, 12:20",
  },
  {
    id: "PRC-033",
    name: "Support SLA Breach Communication",
    department: "Support",
    owner: owners.support,
    description: "Comunicação formal de risco ou violação de SLA para cliente, CS e liderança.",
    maturityLevel: 3,
    sla: "15min após risco",
    slaStatus: "DELAYED",
    status: "ACTIVE",
    risks: ["Cliente descobre primeiro", "Mensagem inconsistente entre áreas"],
    dependencies: ["Incident status", "Customer Success", "NOC ETA"],
    bottlenecks: ["ETA técnico nem sempre disponível para comunicação"],
    customerImpact: "Transparência reduz frustração mesmo em incidentes complexos.",
    kpis: ["Communication lead time", "Customer update compliance", "Escalation sentiment"],
    type: "AS_IS",
    lastUpdate: "Há 1h",
  },
  {
    id: "PRC-034",
    name: "Implementation Lessons Learned Review",
    department: "Operations",
    owner: owners.ops,
    description: "Revisão pós-implantação para capturar falhas, ganhos e ações de melhoria para o playbook operacional.",
    maturityLevel: 3,
    sla: "5d após go-live",
    slaStatus: "STABLE",
    status: "ACTIVE",
    risks: ["Aprendizado não vira mudança", "Ata dispersa sem dono"],
    dependencies: ["Customer Success", "NOC", "Commercial"],
    bottlenecks: ["Planos de ação não são integrados aos KPIs"],
    customerImpact: "Melhoria contínua reduz repetição de problemas em clientes similares.",
    kpis: ["Action capture rate", "Repeat defect rate", "Playbook update time"],
    type: "TO_BE",
    lastUpdate: "Há 4d",
  },
  {
    id: "PRC-035",
    name: "Development Defect Triage for Customer-Blocking Bugs",
    department: "Development",
    owner: owners.development,
    description: "Triagem e priorização de bugs que bloqueiam implantação, integração ou adoção do cliente.",
    maturityLevel: 4,
    sla: "4h triagem",
    slaStatus: "STABLE",
    status: "ACTIVE",
    risks: ["Bug sem severidade correta", "Cliente sem workaround"],
    dependencies: ["Support evidence", "SaaS Implementation", "Product owner"],
    bottlenecks: ["Reprodução depende de dados do cliente"],
    customerImpact: "Triagem rápida reduz paralisação de onboarding e evita escalonamento executivo.",
    kpis: ["Bug triage time", "Customer-blocking aging", "Workaround availability"],
    type: "TO_BE",
    lastUpdate: "Hoje, 14:50",
  },
  {
    id: "PRC-036",
    name: "Logistics Return Merchandise Authorization",
    department: "Logistics",
    owner: owners.logistics,
    description: "Controle de troca, retorno e reaproveitamento de equipamentos em falhas de ativação ou cancelamentos.",
    maturityLevel: 2,
    sla: "7d",
    slaStatus: "DELAYED",
    status: "ACTIVE",
    risks: ["Ativo sem rastreio", "Custo de reposição", "Inventário incorreto"],
    dependencies: ["Customer Success", "Warehouse", "Finance"],
    bottlenecks: ["Retorno depende de confirmação manual do cliente"],
    customerImpact: "Troca lenta prolonga indisponibilidade ou frustração com a implantação.",
    kpis: ["RMA cycle time", "Untracked asset count", "Replacement cost"],
    type: "AS_IS",
    lastUpdate: "Há 2d",
  },
  {
    id: "PRC-037",
    name: "Finance Revenue Assurance Review",
    department: "Finance",
    owner: owners.finance,
    description: "Revisão de receita, contratos ativos, MRR, descontos, créditos e divergências de faturamento.",
    maturityLevel: 3,
    sla: "Mensal D+3",
    slaStatus: "DELAYED",
    status: "ACTIVE",
    risks: ["MRR não ativado", "Desconto sem aprovação", "Crédito indevido"],
    dependencies: ["SAP R/3", "Commercial", "Customer Success"],
    bottlenecks: ["Cruzamento manual entre contrato e faturamento"],
    customerImpact: "Evita erros de cobrança e ruído comercial em contas estratégicas.",
    kpis: ["Revenue leakage", "Billing exception count", "MRR activation compliance"],
    type: "AS_IS",
    lastUpdate: "Há 1d",
  },
  {
    id: "PRC-038",
    name: "NOC Maintenance Window Governance",
    department: "NOC",
    owner: owners.noc,
    description: "Planejamento, aprovação, comunicação e execução de janelas de manutenção em clientes corporativos.",
    maturityLevel: 4,
    sla: "D-5 comunicação",
    slaStatus: "STABLE",
    status: "ACTIVE",
    risks: ["Cliente sem aviso", "Mudança conflita com operação crítica"],
    dependencies: ["Customer Success", "Support", "Customer IT"],
    bottlenecks: ["Aprovação do cliente pode atrasar janela"],
    customerImpact: "Comunicação estruturada reduz impacto percebido de indisponibilidade programada.",
    kpis: ["Maintenance notice compliance", "Window success rate", "Customer conflict count"],
    type: "TO_BE",
    lastUpdate: "Hoje, 07:30",
  },
  {
    id: "PRC-039",
    name: "SaaS Go-Live Command Center",
    department: "SaaS Implementation",
    owner: owners.saas,
    description: "War room de go-live SaaS com readiness, suporte, dados, integrações, treinamento e CS.",
    maturityLevel: 4,
    sla: "D-1 a D+2",
    slaStatus: "STABLE",
    status: "ACTIVE",
    risks: ["Usuários sem acesso", "Integração final instável", "Dados incompletos"],
    dependencies: ["Development", "Support", "Customer Success", "Customer IT"],
    bottlenecks: ["Validação final depende de múltiplos owners"],
    customerImpact: "Go-live coordenado aumenta confiança e reduz chamados iniciais.",
    kpis: ["Go-live defects", "User access success", "Hypercare ticket volume"],
    type: "TO_BE",
    lastUpdate: "Hoje, 16:00",
  },
  {
    id: "PRC-040",
    name: "Enterprise Governance Data Quality Control",
    department: "Operations",
    owner: owners.ops,
    description: "Controle de qualidade dos dados operacionais que alimentam dashboards, alertas e relatórios executivos.",
    maturityLevel: 3,
    sla: "Diário",
    slaStatus: "STABLE",
    status: "OPTIMIZING",
    risks: ["Indicador incoerente", "Decisão com dado antigo", "Fonte sem dono"],
    dependencies: ["All departments", "Data pipelines", "Executive dashboards"],
    bottlenecks: ["Ainda existem fontes manuais em Finance e Logistics"],
    customerImpact: "Dados confiáveis aceleram decisões que protegem contas em risco.",
    kpis: ["Data freshness", "Metric reconciliation error", "Source ownership coverage"],
    type: "TO_BE",
    lastUpdate: "Há 20min",
  },
];

export const enterpriseBottlenecks: EnterpriseBottleneck[] = [
  {
    id: "BOT-001",
    title: "Validação geográfica de fibra concentrada em especialistas",
    affectedDepartment: "Connectivity Implementation",
    severity: "CRITICAL",
    riskLevel: "CRITICAL",
    averageDelayHours: 72,
    impact: "Bloqueia go-live multi-site e cria filas invisíveis para liderança.",
    customerImpact: "Bradesco Centro-Oeste e varejo multi-loja ficam sem previsão confiável de ativação.",
    suggestedAction: "Priorizar base geográfica centralizada e fila executiva para contas VIP.",
    relatedProcesses: ["PRC-002", "PRC-017"],
  },
  {
    id: "BOT-002",
    title: "Conciliação SAP e ativação de MRR em planilha",
    affectedDepartment: "Finance",
    severity: "CRITICAL",
    riskLevel: "CRITICAL",
    averageDelayHours: 72,
    impact: "Atraso financeiro, divergência fiscal e risco de cobrança duplicada.",
    customerImpact: "Ambev e contas estratégicas percebem falta de controle pós-go-live.",
    suggestedAction: "Implementar webhook SAP e trilha auditável de exceções de billing.",
    relatedProcesses: ["PRC-005", "PRC-037"],
  },
  {
    id: "BOT-003",
    title: "Rastreio físico de hardware sem integração operacional",
    affectedDepartment: "Logistics",
    severity: "HIGH",
    riskLevel: "HIGH",
    averageDelayHours: 36,
    impact: "Visitas técnicas podem ser marcadas sem equipamento entregue.",
    customerImpact: "GPA Matriz teve visita reagendada por status de frete incompleto.",
    suggestedAction: "Integrar transportadora, inventário e agenda de campo em um status único.",
    relatedProcesses: ["PRC-003", "PRC-016", "PRC-024"],
  },
  {
    id: "BOT-004",
    title: "Configuração NOC manual em CLI",
    affectedDepartment: "NOC",
    severity: "HIGH",
    riskLevel: "HIGH",
    averageDelayHours: 24,
    impact: "Aumenta erro humano e reduz throughput em picos de implantação.",
    customerImpact: "Instabilidade inicial em links enterprise aumenta volume de hypercare.",
    suggestedAction: "Migrar provisionamento para templates governados e validação automática.",
    relatedProcesses: ["PRC-004", "PRC-010", "PRC-038"],
  },
  {
    id: "BOT-005",
    title: "Forecast comercial sem complexidade operacional",
    affectedDepartment: "Commercial",
    severity: "HIGH",
    riskLevel: "HIGH",
    averageDelayHours: 48,
    impact: "Capacidade é planejada tarde e times críticos ficam sobrecarregados.",
    customerImpact: "Prazos prometidos podem divergir da capacidade real de entrega.",
    suggestedAction: "Adicionar score operacional ao pipeline e sincronizar forecast semanal com Ops.",
    relatedProcesses: ["PRC-021", "PRC-031"],
  },
  {
    id: "BOT-006",
    title: "Evidências de suporte coletadas manualmente",
    affectedDepartment: "Support",
    severity: "MEDIUM",
    riskLevel: "HIGH",
    averageDelayHours: 6,
    impact: "Escalação para NOC demora e chega incompleta.",
    customerImpact: "Cliente espera atualização enquanto times internos buscam logs.",
    suggestedAction: "Automatizar pacote mínimo de evidências para incidentes N2/N3.",
    relatedProcesses: ["PRC-011", "PRC-018", "PRC-033"],
  },
  {
    id: "BOT-007",
    title: "Validação de migração SaaS por layout manual",
    affectedDepartment: "SaaS Implementation",
    severity: "MEDIUM",
    riskLevel: "MEDIUM",
    averageDelayHours: 18,
    impact: "Arquivos rejeitados atrasam treinamento e go-live.",
    customerImpact: "Usuários entram em treinamento com ambiente incompleto.",
    suggestedAction: "Criar validador automático de arquivos e readiness score de migração.",
    relatedProcesses: ["PRC-009", "PRC-039"],
  },
  {
    id: "BOT-008",
    title: "Contexto executivo consolidado manualmente",
    affectedDepartment: "Executive Management",
    severity: "MEDIUM",
    riskLevel: "MEDIUM",
    averageDelayHours: 12,
    impact: "Decisões de alto impacto dependem de coleta manual entre áreas.",
    customerImpact: "Ações de retenção podem perder timing em contas críticas.",
    suggestedAction: "Automatizar executive pack com riscos, aging e recomendações de IA.",
    relatedProcesses: ["PRC-012", "PRC-022", "PRC-032"],
  },
];

export const enterpriseKpis: EnterpriseKpi[] = [
  { id: "KPI-001", name: "SLA Compliance Global", process: "Operational Daily SLA Control Tower", owner: "Operations", target: 98.5, current: 96.4, unit: "%", status: "WARNING", trend: "+0.9%", isPositive: true, threshold: "Crítico <95%", history: [93.8, 94.5, 94.9, 95.2, 95.8, 96.0, 96.4] },
  { id: "KPI-002", name: "Lead Time de Implantação Connectivity", process: "Link Activation - Fiber Feasibility Validation", owner: "Connectivity Implementation", target: 72, current: 96, unit: "h", status: "VIOLATED", trend: "+18.0%", isPositive: false, threshold: "Violado >72h", history: [118, 111, 108, 103, 99, 94, 96] },
  { id: "KPI-003", name: "Latência de Conciliação SAP", process: "SAP Billing Reconciliation for Enterprise Contracts", owner: "Finance", target: 24, current: 72, unit: "h", status: "VIOLATED", trend: "+34.0%", isPositive: false, threshold: "Violado >48h", history: [80, 76, 74, 70, 68, 71, 72] },
  { id: "KPI-004", name: "Throughput de Projetos Ativos", process: "Operational Daily SLA Control Tower", owner: "Operations", target: 80, current: 86, unit: "proj.", status: "OK", trend: "+12.4%", isPositive: true, threshold: "Alerta <65", history: [72, 75, 78, 80, 82, 84, 86] },
  { id: "KPI-005", name: "Backlog Aging > SLA", process: "Operations Capacity Planning", owner: "Operations", target: 12, current: 19, unit: "itens", status: "WARNING", trend: "-9.5%", isPositive: true, threshold: "Crítico >25", history: [31, 28, 25, 24, 22, 20, 19] },
  { id: "KPI-006", name: "Retrabalho Técnico de Ativação", process: "NOC Circuit Provisioning & CLI Configuration", owner: "NOC", target: 4, current: 6.8, unit: "%", status: "WARNING", trend: "-2.1%", isPositive: true, threshold: "Alerta >6%", history: [10.2, 9.4, 8.8, 8.1, 7.5, 7.1, 6.8] },
  { id: "KPI-007", name: "Escalation Rate em Contas VIP", process: "Customer Escalation Review Board", owner: "Customer Success", target: 8, current: 11.6, unit: "%", status: "WARNING", trend: "-1.4%", isPositive: true, threshold: "Crítico >15%", history: [16.8, 15.2, 14.5, 13.9, 12.8, 12.0, 11.6] },
  { id: "KPI-008", name: "Tempo de Onboarding SaaS", process: "SaaS Tenant Provisioning & Workspace Setup", owner: "SaaS Implementation", target: 48, current: 42, unit: "h", status: "OK", trend: "-14.0%", isPositive: true, threshold: "Violado >72h", history: [68, 61, 56, 51, 48, 45, 42] },
  { id: "KPI-009", name: "NPS de Implantação Enterprise", process: "Customer Go-Live Approval & Acceptance Term", owner: "Customer Success", target: 60, current: 54, unit: "pts", status: "WARNING", trend: "+6 pts", isPositive: true, threshold: "Alerta <50", history: [41, 43, 46, 48, 50, 52, 54] },
  { id: "KPI-010", name: "CSAT Pós-Go-Live", process: "Hypercare Monitoring for Strategic Accounts", owner: "Customer Success", target: 92, current: 89, unit: "%", status: "WARNING", trend: "+3.5%", isPositive: true, threshold: "Crítico <85%", history: [81, 83, 84, 86, 87, 88, 89] },
  { id: "KPI-011", name: "Churn Risk Agregado", process: "Customer Renewal Risk Governance", owner: "Customer Success", target: 10, current: 12.4, unit: "%", status: "WARNING", trend: "-12.8%", isPositive: true, threshold: "Crítico >18%", history: [18.5, 17.2, 16.0, 15.1, 14.2, 13.0, 12.4] },
  { id: "KPI-012", name: "MTTR Incidentes P1", process: "Major Incident Escalation - P1 Connectivity", owner: "Support", target: 4, current: 3.6, unit: "h", status: "OK", trend: "-8.3%", isPositive: true, threshold: "Violado >4h", history: [5.4, 4.9, 4.6, 4.2, 3.9, 3.8, 3.6] },
];

export const executiveAlerts: ExecutiveAlertData[] = [
  {
    id: "ALT-001",
    severity: "critical",
    title: "Bradesco Centro-Oeste bloqueado por validação geográfica",
    description: "Fila técnica atingiu 72h e ameaça go-live de 18 agências satélite.",
    owner: "Connectivity Implementation",
    createdAt: "Há 18min",
    suggestedAction: "Alocar Amanda Lima e Carlos Ramos em war room de viabilidade até 17h.",
  },
  {
    id: "ALT-002",
    severity: "critical",
    title: "Ambev com risco de billing e churn por conciliação SAP",
    description: "Conciliação manual permanece em 112h acumuladas e impede fechamento limpo de MRR.",
    owner: "Finance",
    createdAt: "Há 42min",
    suggestedAction: "Ativar exceção executiva de billing e timeline de webhook SAP.",
  },
  {
    id: "ALT-003",
    severity: "warning",
    title: "Capacidade NOC acima de 84% com janela de mudança concentrada",
    description: "Três ativações enterprise competem pela mesma janela técnica nesta semana.",
    owner: "NOC",
    createdAt: "Há 1h",
    suggestedAction: "Rebalancear janelas e priorizar contas com SLA contratual crítico.",
  },
  {
    id: "ALT-004",
    severity: "warning",
    title: "GPA Matriz com visita de campo em risco por rastreio físico",
    description: "Switch core está em trânsito sem confirmação integrada de entrega.",
    owner: "Logistics",
    createdAt: "Há 2h",
    suggestedAction: "Acionar transportadora e confirmar entrega antes de manter agenda técnica.",
  },
];

export const customerHealthData: CustomerOperationalHealth[] = [
  { id: "CUS-AMB", name: "Ambev SA - Matriz & Centros de Distribuição", segment: "Enterprise", stage: "Hypercare crítico", healthScore: 68, churnRisk: 31, adoptionRisk: 24, escalationCount: 3, slaImpact: "Billing SAP em 112h/120h e duas janelas NOC reprogramadas.", sentiment: "churn_risk", operationalImpact: "Risco de perda de confiança do sponsor por cobrança e instabilidade inicial.", nextAction: "Reunião executiva com CS, Finance e NOC ainda hoje." },
  { id: "CUS-BBD", name: "Bradesco - Agências Centro-Oeste", segment: "Strategic", stage: "Homologação técnica", healthScore: 74, churnRisk: 22, adoptionRisk: 18, escalationCount: 2, slaImpact: "Validação geográfica excedeu 72h para sites satélite.", sentiment: "watch", operationalImpact: "Go-live regional pode escapar da janela acordada.", nextAction: "Priorizar georreferenciamento e plano de ativação por ondas." },
  { id: "CUS-GPA", name: "Grupo Pão de Açúcar - Matriz Operações", segment: "Corporate", stage: "Operação assistida", healthScore: 79, churnRisk: 16, adoptionRisk: 21, escalationCount: 1, slaImpact: "Entrega de switch atrasada em 36h e visita técnica replanejada.", sentiment: "watch", operationalImpact: "Cliente percebe falta de sincronismo entre logística e campo.", nextAction: "Confirmar entrega e oferecer janela técnica prioritária." },
  { id: "CUS-PET", name: "Petrobras Hub Nordeste", segment: "Enterprise", stage: "Go-live validado", healthScore: 94, churnRisk: 4, adoptionRisk: 8, escalationCount: 0, slaImpact: "100% dos SLAs respeitados nas primeiras rotas.", sentiment: "excellent", operationalImpact: "Conta pronta para expansão e case de sucesso.", nextAction: "Propor expansão Sul e coletar depoimento executivo." },
  { id: "CUS-SUL", name: "SulAmérica Seguros - Core Network", segment: "Strategic", stage: "Provisionamento NOC", healthScore: 82, churnRisk: 12, adoptionRisk: 15, escalationCount: 1, slaImpact: "Homologação de roteador core em limite de SLA.", sentiment: "stable", operationalImpact: "Boa relação, mas exige comunicação técnica precisa.", nextAction: "Atualização proativa de ETA a cada 4h." },
  { id: "CUS-VIV", name: "Vivo B2B Partner Operations", segment: "Enterprise", stage: "SaaS onboarding", healthScore: 88, churnRisk: 9, adoptionRisk: 17, escalationCount: 0, slaImpact: "Tenant criado em 42h e treinamento em andamento.", sentiment: "stable", operationalImpact: "Adoção depende de migração de dados de filiais.", nextAction: "Validar arquivo de migração com checklist automático." },
];

export const organizationData: OrganizationNode[] = [
  { id: "ORG-001", department: "Executive Management", leader: "William Lima", responsibilities: ["Prioridade executiva", "Governança de transformação", "Decisão de trade-offs"], reportsTo: "Board HIT", workload: 76, capacity: 88, dependencyRisk: "MEDIUM", governanceGap: "Pack executivo ainda exige curadoria de múltiplas fontes." },
  { id: "ORG-002", department: "Operations", leader: "William Lima", responsibilities: ["Control tower", "Capacidade", "Roadmap operacional"], reportsTo: "Executive Management", workload: 82, capacity: 86, dependencyRisk: "HIGH", governanceGap: "Forecast comercial e dados financeiros ainda entram tarde." },
  { id: "ORG-003", department: "Connectivity Implementation", leader: "Amanda Lima", responsibilities: ["Viabilidade", "Ativação", "Validação técnica"], reportsTo: "Operations", workload: 91, capacity: 74, dependencyRisk: "CRITICAL", governanceGap: "Validação geográfica concentrada em poucos especialistas." },
  { id: "ORG-004", department: "NOC", leader: "Carlos Ramos", responsibilities: ["Provisionamento", "Mudanças", "Monitoramento"], reportsTo: "Operations", workload: 84, capacity: 79, dependencyRisk: "HIGH", governanceGap: "Configuração CLI e janelas técnicas competem por especialistas." },
  { id: "ORG-005", department: "Customer Success", leader: "Juliana Mendes", responsibilities: ["Health score", "Hypercare", "Retenção"], reportsTo: "Executive Management", workload: 72, capacity: 86, dependencyRisk: "MEDIUM", governanceGap: "Sentimento e incidentes ainda parcialmente desconectados." },
  { id: "ORG-006", department: "Finance", leader: "Beatriz Mello", responsibilities: ["Billing SAP", "Revenue assurance", "Crédito"], reportsTo: "Executive Management", workload: 68, capacity: 81, dependencyRisk: "HIGH", governanceGap: "Conciliação SAP depende de planilhas OneDrive." },
  { id: "ORG-007", department: "Logistics", leader: "Marcos Souza", responsibilities: ["Inventário", "Expedição", "RMA"], reportsTo: "Operations", workload: 77, capacity: 73, dependencyRisk: "HIGH", governanceGap: "Transportadora não integrada à agenda de campo." },
  { id: "ORG-008", department: "Development", leader: "Felipe Andrade", responsibilities: ["APIs", "Automação", "Defeitos bloqueantes"], reportsTo: "Operations", workload: 70, capacity: 82, dependencyRisk: "MEDIUM", governanceGap: "Integrações de cliente nem sempre têm ambiente espelho." },
];

export const bpmnWorkflowExamples: BpmnWorkflowExample[] = [
  {
    id: "BPMN-CONNECT-001",
    name: "Connectivity Implementation - Enterprise Link Activation",
    owner: "Connectivity Implementation",
    type: "AS_IS",
    steps: [
      { title: "Commercial handoff", lane: "Commercial", sla: "24h", risk: "Contrato sem anexo técnico", checkpoint: "Checklist completo" },
      { title: "Feasibility validation", lane: "Connectivity Implementation", sla: "48h", risk: "Base geográfica defasada", checkpoint: "Viabilidade aprovada" },
      { title: "Hardware dispatch", lane: "Logistics", sla: "72h", risk: "Equipamento sem rastreio", checkpoint: "Entrega confirmada" },
      { title: "NOC provisioning", lane: "NOC", sla: "24h", risk: "Erro de CLI", checkpoint: "Config validada" },
      { title: "Customer acceptance", lane: "Customer", sla: "12h", risk: "Aceite pendente", checkpoint: "Termo assinado" },
    ],
  },
  {
    id: "BPMN-SAAS-001",
    name: "SaaS Onboarding - Tenant, Data and Enablement",
    owner: "SaaS Implementation",
    type: "TO_BE",
    steps: [
      { title: "Tenant provisioning", lane: "SaaS Implementation", sla: "16h", risk: "DNS pendente", checkpoint: "Admin ativo" },
      { title: "Data readiness", lane: "Customer", sla: "5d", risk: "Arquivo fora do padrão", checkpoint: "Validador aprovado" },
      { title: "Integration certification", lane: "Development", sla: "4d", risk: "Webhook sem retry", checkpoint: "Certificação concluída" },
      { title: "Training plan", lane: "Customer Success", sla: "5d antes go-live", risk: "Baixa presença", checkpoint: "Usuários-chave treinados" },
    ],
  },
  {
    id: "BPMN-ESC-001",
    name: "Customer Escalation - P1 Incident to Executive Update",
    owner: "Support",
    type: "TO_BE",
    steps: [
      { title: "P1 classification", lane: "Support", sla: "15min", risk: "Severidade errada", checkpoint: "P1 confirmado" },
      { title: "NOC war room", lane: "NOC", sla: "30min", risk: "Logs incompletos", checkpoint: "ETA técnico" },
      { title: "CS customer update", lane: "Customer Success", sla: "30min", risk: "Mensagem divergente", checkpoint: "Cliente comunicado" },
      { title: "Executive review", lane: "Executive Management", sla: "2h", risk: "Decisão tardia", checkpoint: "Plano aprovado" },
    ],
  },
  {
    id: "BPMN-GOLIVE-001",
    name: "Go-Live Readiness Gate",
    owner: "Operations",
    type: "TO_BE",
    steps: [
      { title: "Readiness checklist", lane: "Operations", sla: "D-1", risk: "Pendência oculta", checkpoint: "Score >90" },
      { title: "Billing readiness", lane: "Finance", sla: "D-1", risk: "MRR não preparado", checkpoint: "SAP ready" },
      { title: "Support readiness", lane: "Support", sla: "D-1", risk: "KB incompleta", checkpoint: "Playbook ativo" },
      { title: "Final approval", lane: "Executive Management", sla: "4h", risk: "Trade-off não registrado", checkpoint: "Go-live aprovado" },
    ],
  },
  {
    id: "BPMN-HYPER-001",
    name: "Hypercare Monitoring and Retention Protection",
    owner: "Customer Success",
    type: "TO_BE",
    steps: [
      { title: "Daily health scan", lane: "Customer Success", sla: "24h", risk: "Sinal ignorado", checkpoint: "Health atualizado" },
      { title: "Telemetry review", lane: "NOC", sla: "24h", risk: "Alarme não correlacionado", checkpoint: "Sem perda crítica" },
      { title: "Support trend review", lane: "Support", sla: "48h", risk: "Ticket repetido", checkpoint: "Causa raiz mapeada" },
      { title: "Retention action", lane: "Executive Management", sla: "72h", risk: "Plano sem dono", checkpoint: "Ação executiva" },
    ],
  },
];

export const aiOperationalInsights: AiOperationalInsight[] = [
  {
    id: "AI-001",
    category: "risk_prediction",
    title: "Probabilidade de quebra de SLA no Bradesco em 24h",
    confidence: 91,
    evidence: "Viabilidade técnica em 72h, backlog de Engenharia em 91% e ausência de owner secundário.",
    businessImpact: "Risco de atraso em 18 agências e erosão do patrocinador regional.",
    recommendation: "Criar fila executiva de georreferenciamento e liberar capacidade NOC para janela paralela.",
  },
  {
    id: "AI-002",
    category: "customer_risk",
    title: "Ambev entrou em zona de churn operacional",
    confidence: 87,
    evidence: "Billing SAP em 112h, três interações de CS negativas e duas remarcações técnicas.",
    businessImpact: "R$ 480k de atrito contratual potencial e risco reputacional em conta enterprise.",
    recommendation: "Executar plano integrado CS + Finance + NOC com atualização executiva diária.",
  },
  {
    id: "AI-003",
    category: "bottleneck",
    title: "Rastreio físico explica 31% das visitas replanejadas",
    confidence: 82,
    evidence: "Correlação entre atrasos logísticos, status manual e visitas improdutivas nos últimos 45 dias.",
    businessImpact: "Aumento de custo de campo e queda de CSAT pós-go-live.",
    recommendation: "Integrar transportadora e agenda de campo antes do próximo lote enterprise.",
  },
  {
    id: "AI-004",
    category: "maturity_gap",
    title: "Finance e Commercial impedem maturidade operacional nível 5",
    confidence: 79,
    evidence: "Processos críticos permanecem AS IS, com aprovações por e-mail e planilhas sem trilha auditável.",
    businessImpact: "Risco de decisão executiva com dados atrasados e baixa escalabilidade.",
    recommendation: "Priorizar webhook SAP, score operacional no pipeline e owner por exceção.",
  },
  {
    id: "AI-005",
    category: "optimization",
    title: "Templates de provisionamento reduzem 38% do retrabalho NOC",
    confidence: 84,
    evidence: "Erros CLI e rollback estão concentrados em cinco configurações repetitivas.",
    businessImpact: "Menor MTTR, maior throughput de implantação e menos hypercare técnico.",
    recommendation: "Criar biblioteca de templates governados com validação automática antes do deploy.",
  },
];

export const transformationRoadmap: TransformationInitiative[] = [
  { id: "TR-001", phase: "Immediate", timeline: "0-15 dias", title: "War rooms para Bradesco, Ambev e GPA", owner: "Executive Management", priority: "P0", expectedGain: "Reduzir risco executivo nas três contas críticas", dependencies: ["CS", "Finance", "NOC", "Logistics"] },
  { id: "TR-002", phase: "Immediate", timeline: "0-15 dias", title: "Daily SLA Control Tower com owners obrigatórios", owner: "Operations", priority: "P0", expectedGain: "Reduzir aging > SLA em 25%", dependencies: ["All departments"] },
  { id: "TR-003", phase: "Short-term", timeline: "30-60 dias", title: "Wizard de kickoff e handoff comercial auditável", owner: "Commercial", priority: "P1", expectedGain: "Reduzir retrabalho de kickoff em 40%", dependencies: ["Development", "Operations"] },
  { id: "TR-004", phase: "Short-term", timeline: "30-60 dias", title: "Integração de rastreio logístico com agenda de campo", owner: "Logistics", priority: "P1", expectedGain: "Reduzir visitas improdutivas em 35%", dependencies: ["Operations", "Customer Success"] },
  { id: "TR-005", phase: "Mid-term", timeline: "90-120 dias", title: "Webhook SAP para ativação de MRR e exceções de billing", owner: "Finance", priority: "P0", expectedGain: "Reduzir latência SAP de 72h para 8h", dependencies: ["Development", "Commercial"] },
  { id: "TR-006", phase: "Mid-term", timeline: "90-120 dias", title: "Provisionamento NOC por templates governados", owner: "NOC", priority: "P1", expectedGain: "Reduzir retrabalho técnico em 38%", dependencies: ["Development", "Connectivity Implementation"] },
  { id: "TR-007", phase: "Long-term", timeline: "180 dias", title: "AI Operational Advisor com process mining contínuo", owner: "Operations", priority: "P2", expectedGain: "Maturidade média >4.3 e risco preditivo em tempo real", dependencies: ["Data quality", "Executive dashboards"] },
  { id: "TR-008", phase: "Long-term", timeline: "180 dias", title: "Governance operating model nível 5", owner: "Executive Management", priority: "P2", expectedGain: "Operação escalável com accountability ponta a ponta", dependencies: ["All transformation initiatives"] },
];

export const executiveStorytelling = {
  thesis: "A HIT está migrando de uma operação reativa baseada em handoffs manuais para um modelo de inteligência operacional governado, com visibilidade executiva e proteção ativa de clientes estratégicos.",
  currentState: [
    "Processos críticos ainda dependem de planilhas, e-mails e aprovações não auditáveis.",
    "Gargalos em Engenharia, Finance, Logística e NOC aparecem tarde demais para ação preventiva.",
    "Customer Success absorve o impacto da fragmentação quando o cliente já sente o atraso.",
  ],
  futureState: [
    "Handoffs viram eventos governados com owner, SLA e evidência desde o kickoff.",
    "Dashboards executivos antecipam aging, churn risk, overload e maturidade operacional.",
    "A operação passa a escalar com dados confiáveis, automação e rituais de decisão claros.",
  ],
  executiveMessage: "A transformação não é apenas digitalizar processos. É criar o sistema operacional de governança que permite à HIT crescer sem perder controle, confiança do cliente e previsibilidade executiva.",
};
