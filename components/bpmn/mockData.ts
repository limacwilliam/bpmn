import { BPMNDiagramData, VersionHistoryItem } from "./types";

export const defaultSwimlanes = [
  { id: "lane-com", name: "Comercial", color: "hsl(var(--accent)/10)", height: 130 },
  { id: "lane-eng", name: "Engenharia / TI", color: "hsl(var(--secondary))", height: 130 },
  { id: "lane-log", name: "Logística", color: "hsl(var(--muted)/60)", height: 130 },
  { id: "lane-noc", name: "NOC (Redes)", color: "hsl(var(--secondary))", height: 130 },
  { id: "lane-cli", name: "Cliente (Parceiro)", color: "hsl(var(--accent)/5)", height: 130 },
  { id: "lane-cs", name: "Customer Success", color: "hsl(var(--secondary))", height: 130 },
  { id: "lane-sup", name: "Suporte / Operações", color: "hsl(var(--muted)/60)", height: 130 }
];

export const asIsDiagram: BPMNDiagramData = {
  diagramId: "connectivity-hit-asis",
  version: "v1.0",
  mode: "AS_IS",
  swimlanes: defaultSwimlanes,
  nodes: [
    {
      id: "node-start",
      type: "START",
      title: "Handoff Comercial",
      laneId: "lane-com",
      x: 80,
      y: 65,
      metadata: {
        owner: "William Lima",
        description: "Envio manual do contrato assinado via e-mail e planilhas avulsas.",
        sla: "Imediato",
        systems: ["E-mail", "Excel"],
        risks: "Informações perdidas em threads de e-mail e falta de centralização.",
        bottlenecks: "Nenhum controle automático de recebimento.",
        input: "Contrato Assinado",
        output: "E-mail de Notificação"
      }
    },
    {
      id: "node-kickoff",
      type: "USER_TASK",
      title: "Kickoff de Contrato",
      laneId: "lane-com",
      x: 230,
      y: 65,
      metadata: {
        owner: "Mariana Costa",
        description: "Abertura manual do projeto de implantação e preenchimento de formulários de provisionamento.",
        sla: "48 horas",
        systems: ["OneDrive", "WhatsApp"],
        risks: "Erros de digitação, duplicidade de chamados e falta de visibilidade do cronograma.",
        bottlenecks: "Latência de 48 horas devido a checagem manual de dados do contrato.",
        aiInsights: "Esse nó pode ser 100% automatizado por meio de integração via API de CRM para criar a pasta de projeto imediatamente.",
        input: "E-mail de Notificação",
        output: "Pasta no OneDrive criada"
      }
    },
    {
      id: "node-viability",
      type: "SYSTEM_TASK",
      title: "Validação de Viabilidade Técnica",
      laneId: "lane-eng",
      x: 400,
      y: 195,
      metadata: {
        owner: "Carlos Ramos",
        description: "Consulta de viabilidade de fibra ótica nos postes e distância de caixa de atendimento.",
        sla: "72 horas",
        systems: ["Planilhas Locais", "Google Earth"],
        risks: "Dados defasados de postes, gerando falsas viabilidades positivas que estouram o projeto futuramente.",
        bottlenecks: "Fila manual de análise técnica da Engenharia de Rede, gerando espera excessiva.",
        aiInsights: "Utilizar IA Geoespacial e banco centralizado de viabilidades HIT para triagem instantânea.",
        input: "Coordenadas do Cliente",
        output: "Relatório de Viabilidade (PDF)"
      }
    },
    {
      id: "node-logistics",
      type: "USER_TASK",
      title: "Envio de Equipamentos e Roteador",
      laneId: "lane-log",
      x: 580,
      y: 325,
      metadata: {
        owner: "Marcos Souza",
        description: "Separação física do roteador no almoxarifado e postagem na transportadora parceira.",
        sla: "96 horas",
        systems: ["Planilha Correios", "WhatsApp"],
        risks: "Falta de rastreabilidade do frete e risco de extravio de hardware de alto valor.",
        bottlenecks: "Dependência de ligações e mensagens de WhatsApp com a transportadora para saber a posição do frete.",
        aiInsights: "Integrar ERP com API da transportadora para gerar código de rastreamento e atualizar o status em tempo real.",
        input: "Solicitação de Hardware",
        output: "Código de Rastreamento Manual"
      }
    },
    {
      id: "node-noc",
      type: "SYSTEM_TASK",
      title: "Configuração de Circuito & Portas",
      laneId: "lane-noc",
      x: 750,
      y: 455,
      metadata: {
        owner: "Amanda Lima",
        description: "Configuração manual das portas do switch e IPs no roteador do cliente via terminal CLI.",
        sla: "24 horas",
        systems: ["Console CLI", "Bloco de Notas"],
        risks: "Erros humanos de digitação de IPs, rotas e tags de VLAN causados por falta de padronização.",
        bottlenecks: "NOC sobrecarregado digitando comandos linha a linha. SLA estourado em 35% dos casos.",
        aiInsights: "Substituir a CLI manual por provisionamento de rede definido por software (SDN) automatizado por templates.",
        input: "Ficha Técnica",
        output: "Circuito Ativado e Provisionado"
      }
    },
    {
      id: "node-touchpoint",
      type: "CUSTOMER_TOUCHPOINT",
      title: "Alinhamento CS & Agendamento",
      laneId: "lane-cs",
      x: 920,
      y: 715,
      metadata: {
        owner: "Juliana Mendes",
        description: "Agendamento telefônico ou via e-mail com o cliente para a instalação presencial.",
        sla: "24 horas",
        systems: ["Google Calendar", "E-mail"],
        risks: "Não comparecimento do técnico ou indisponibilidade da equipe do cliente por falta de confirmações automatizadas.",
        bottlenecks: "Múltiplas trocas de e-mails para concordar com data e horário de ativação.",
        aiInsights: "Implementar portal de agendamento self-service com lembretes automáticos via WhatsApp.",
        input: "Circuito Ativo",
        output: "Data de Instalação Confirmada"
      }
    },
    {
      id: "node-client-act",
      type: "CUSTOMER_ACTION",
      title: "Homologação Final do Cliente",
      laneId: "lane-cli",
      x: 1080,
      y: 585,
      metadata: {
        owner: "Representante do Cliente",
        description: "Cliente testa a banda contratada, latência e assina o Termo de Ativação físico.",
        sla: "12 horas",
        systems: ["Papel Físico", "Speedtest"],
        risks: "Perda ou rasura do termo físico de ativação, atrasando o início do faturamento oficial.",
        bottlenecks: "Digitalização manual do termo físico assinado e envio por e-mail.",
        aiInsights: "Utilizar assinatura digital integrada (DocuSign/Clicksign) com disparo automático após teste de ping bem-sucedido.",
        input: "Link Ativo",
        output: "Termo de Ativação Assinado"
      }
    },
    {
      id: "node-gateway",
      type: "DECISION_GATEWAY",
      title: "Ativação & Go-Live com Sucesso?",
      laneId: "lane-cs",
      x: 1220,
      y: 715,
      metadata: {
        owner: "Juliana Mendes",
        description: "Validação se todos os testes foram superados e o cliente está operando normalmente.",
        sla: "Imediato",
        systems: ["Salesforce"],
        input: "Termo Assinado",
        output: "Status de Ativação"
      }
    },
    {
      id: "node-hypercare",
      type: "ESCALATION",
      title: "Período de Hypercare (Instável)",
      laneId: "lane-cs",
      x: 1360,
      y: 715,
      metadata: {
        owner: "Juliana Mendes",
        description: "Acompanhamento prioritário de 7 dias pós-ativação em busca de instabilidades de rede.",
        sla: "168 horas",
        systems: ["WhatsApp pessoal", "Zendesk"],
        risks: "Problemas resolvidos de maneira informal sem registro de chamados, ocultando falhas crônicas.",
        bottlenecks: "Desgaste da equipe de CS fazendo papel de suporte técnico N1.",
        aiInsights: "Habilitar assistente de monitoração de ping e perda de pacotes e alarmes no bot do CS.",
        input: "Ativação",
        output: "Cliente Estável"
      }
    },
    {
      id: "node-end",
      type: "END",
      title: "Transição Suporte & Faturamento",
      laneId: "lane-sup",
      x: 1510,
      y: 845,
      metadata: {
        owner: "Supervisor do Suporte",
        description: "Encerramento do projeto de implantação, início do faturamento recorrente (MRR) e transferência da conta para o suporte N1.",
        sla: "Imediato",
        systems: ["ERP Financeiro", "Zendesk"],
        risks: "Demora no início do faturamento devido ao Handoff manual com o financeiro.",
        bottlenecks: "Falta de documentação técnica do circuito no Zendesk dificulta o suporte no primeiro chamado.",
        input: "Cliente Estável",
        output: "MRR Ativo no ERP"
      }
    }
  ],
  connections: [
    { id: "c1", from: "node-start", to: "node-kickoff", slaStatus: "WARNING" },
    { id: "c2", from: "node-kickoff", to: "node-viability", slaStatus: "CRITICAL" },
    { id: "c3", from: "node-viability", to: "node-logistics", slaStatus: "CRITICAL" },
    { id: "c4", from: "node-logistics", to: "node-noc", slaStatus: "CRITICAL" },
    { id: "c5", from: "node-noc", to: "node-touchpoint", slaStatus: "WARNING" },
    { id: "c6", from: "node-touchpoint", to: "node-client-act", slaStatus: "STABLE" },
    { id: "c7", from: "node-client-act", to: "node-gateway", slaStatus: "STABLE" },
    { id: "c8", from: "node-gateway", to: "node-hypercare", label: "Sim", slaStatus: "STABLE" },
    { id: "c9", from: "node-hypercare", to: "node-end", slaStatus: "WARNING" }
  ]
};

export const toBeDiagram: BPMNDiagramData = {
  diagramId: "connectivity-hit-tobe",
  version: "v2.1",
  mode: "TO_BE",
  swimlanes: defaultSwimlanes,
  nodes: [
    {
      id: "node-start",
      type: "START",
      title: "Handoff Comercial (Automático)",
      laneId: "lane-com",
      x: 80,
      y: 65,
      metadata: {
        owner: "HIT Integration Engine",
        description: "Disparo automático a partir do fechamento da oportunidade ganha no Salesforce.",
        sla: "Instantâneo",
        systems: ["Salesforce API", "Supabase Integration"],
        aiInsights: "Integração Salesforce-Supabase reduz o tempo de handoff comercial de 24h para 0 segundos.",
        input: "Oportunidade Ganhada",
        output: "Evento de Implantação Criado"
      }
    },
    {
      id: "node-kickoff",
      type: "USER_TASK",
      title: "Kickoff de Contrato (Validado)",
      laneId: "lane-com",
      x: 230,
      y: 65,
      metadata: {
        owner: "Mariana Costa",
        description: "Reunião de alinhamento com dados já pré-populados pelo sistema.",
        sla: "2 horas",
        systems: ["HIT Platform", "Microsoft Teams"],
        aiInsights: "O pré-preenchimento inteligente de 90% das informações poupa 46h de trabalho administrativo manual.",
        input: "Evento de Implantação",
        output: "Projeto Inicializado"
      }
    },
    {
      id: "node-viability",
      type: "SYSTEM_TASK",
      title: "Validação por IA & Geoportal",
      laneId: "lane-eng",
      x: 400,
      y: 195,
      metadata: {
        owner: "HIT Geo-AI Agent",
        description: "Análise preditiva instantânea de relevo, postes da distribuidora e cálculo automático de rota de fibra.",
        sla: "5 minutos",
        systems: ["HIT Geoportal v2", "Google Cloud Maps", "Azure Cognitive Services"],
        aiInsights: "A validação por IA eliminou 100% da fila da Engenharia, entregando o resultado em 5 minutos com 98% de precisão geográfica.",
        input: "Endereço do Cliente",
        output: "Projeto Executivo e Rota Aprovada"
      }
    },
    {
      id: "node-logistics",
      type: "USER_TASK",
      title: "Logística Conectada com Transportadora",
      laneId: "lane-log",
      x: 580,
      y: 325,
      metadata: {
        owner: "Almoxarifado HIT",
        description: "Despacho automatizado do roteador inteligente com rastreamento via webhook na plataforma.",
        sla: "24 horas",
        systems: ["ERP Intelipost", "FedEx API"],
        aiInsights: "Alertas via SMS/WhatsApp mantêm o cliente e a equipe HIT atualizados, mitigando em 87% as falhas de agendamento técnico.",
        input: "Projeto Aprovado",
        output: "Rastreio e Envio Confirmados"
      }
    },
    {
      id: "node-noc",
      type: "SYSTEM_TASK",
      title: "Provisionamento SDN Automático",
      laneId: "lane-noc",
      x: 750,
      y: 455,
      metadata: {
        owner: "HIT Automations",
        description: "Provisionamento automático de circuitos, rotas BGP e alocação de IPs através de SDN Controller API.",
        sla: "10 minutos",
        systems: ["Huawei iMaster NCE", "Cisco DNA", "HIT SDN Engine"],
        aiInsights: "Substituir a configuração CLI manual por templates SDN padronizados reduziu erros de configuração a ZERO e a latência de 24h para 10 minutos.",
        input: "Roteador Despachado",
        output: "Circuito Operacional Configurado"
      }
    },
    {
      id: "node-touchpoint",
      type: "CUSTOMER_TOUCHPOINT",
      title: "Agendamento e CS Self-Service",
      laneId: "lane-cs",
      x: 920,
      y: 715,
      metadata: {
        owner: "Juliana Mendes",
        description: "Cliente escolhe a data de instalação pelo painel do cliente integrado, sem ligações.",
        sla: "2 horas",
        systems: ["HIT Customer Portal", "WhatsApp Bot"],
        aiInsights: "Permitir agendamento self-service e confirmação via WhatsApp aumentou o CSAT de agendamento de 3.2 para 4.8 estrelas.",
        input: "Circuito Configurado",
        output: "Técnico Agendado e Confirmado"
      }
    },
    {
      id: "node-client-act",
      type: "CUSTOMER_ACTION",
      title: "Homologação & Assinatura Digital",
      laneId: "lane-cli",
      x: 1080,
      y: 585,
      metadata: {
        owner: "Assinatura Digital",
        description: "Testes automatizados na última milha com assinatura imediata do Termo de Instalação via Docusign API.",
        sla: "30 minutos",
        systems: ["Docusign API", "HIT Speedtest Service"],
        aiInsights: "A assinatura digital agiliza o faturamento em 5 dias, reduzindo a inadimplência e o atrito legal.",
        input: "Instalação Física",
        output: "Termo Assinado Digitalmente"
      }
    },
    {
      id: "node-gateway",
      type: "DECISION_GATEWAY",
      title: "Go-Live Confirmado?",
      laneId: "lane-cs",
      x: 1220,
      y: 715,
      metadata: {
        owner: "Juliana Mendes",
        description: "O sistema confirma o recebimento do termo digital e ativa a conta no faturamento automaticamente.",
        sla: "Instantâneo",
        systems: ["HIT Engine Core"],
        input: "Termo Assinado",
        output: "Go-Live Concluído"
      }
    },
    {
      id: "node-hypercare",
      type: "ESCALATION",
      title: "Hypercare Preditivo com IA",
      laneId: "lane-cs",
      x: 1360,
      y: 715,
      metadata: {
        owner: "HIT Predictive Monitor",
        description: "Monitoramento ativo por IA de perda de pacotes, jitter e quedas na porta do roteador do cliente nos primeiros 7 dias.",
        sla: "10 minutos",
        systems: ["Zabbix API", "HIT AI Watchdog"],
        aiInsights: "Se houver variação > 5% no sinal de luz, o robô abre um chamado de forma proativa, antes mesmo do cliente notar instabilidades.",
        input: "Go-Live",
        output: "Cliente Consolidado"
      }
    },
    {
      id: "node-end",
      type: "END",
      title: "Transição Suporte & Faturamento (API)",
      laneId: "lane-sup",
      x: 1510,
      y: 845,
      metadata: {
        owner: "HIT System Sync",
        description: "Sincronização de todos os metadados técnicos do circuito com o Zendesk e ativação automática do faturamento (MRR) no ERP.",
        sla: "Imediato",
        systems: ["ERP Omie API", "Zendesk API"],
        aiInsights: "O faturamento começa a rodar imediatamente após a assinatura, e o suporte N1 tem acesso instantâneo ao mapa do circuito.",
        input: "Cliente Consolidado",
        output: "MRR Faturando e Suporte N1 Munido"
      }
    }
  ],
  connections: [
    { id: "c1", from: "node-start", to: "node-kickoff", slaStatus: "STABLE" },
    { id: "c2", from: "node-kickoff", to: "node-viability", slaStatus: "STABLE" },
    { id: "c3", from: "node-viability", to: "node-logistics", slaStatus: "STABLE" },
    { id: "c4", from: "node-logistics", to: "node-noc", slaStatus: "STABLE" },
    { id: "c5", from: "node-noc", to: "node-touchpoint", slaStatus: "STABLE" },
    { id: "c6", from: "node-touchpoint", to: "node-client-act", slaStatus: "STABLE" },
    { id: "c7", from: "node-client-act", to: "node-gateway", slaStatus: "STABLE" },
    { id: "c8", from: "node-gateway", to: "node-hypercare", label: "Sim", slaStatus: "STABLE" },
    { id: "c9", from: "node-hypercare", to: "node-end", slaStatus: "STABLE" }
  ]
};

export const versionHistory: VersionHistoryItem[] = [
  {
    version: "v1.0",
    date: "2025-10-12 14:32",
    author: "Carlos Ramos",
    changeLog: "Mapeamento inicial da jornada legada 'AS IS' com validação física, logística offline e NOC via linha de comando.",
    status: "PUBLISHED"
  },
  {
    version: "v2.0",
    date: "2026-02-18 10:15",
    author: "Mariana Costa",
    changeLog: "Rascunho inicial do fluxo otimizado 'TO BE', integrando pré-viabilidade automática baseada em postes no Geoportal.",
    status: "PUBLISHED"
  },
  {
    version: "v2.1",
    date: "2026-05-20 22:11",
    author: "William Lima",
    changeLog: "Inserção do provisionamento SDN automático para portas e circuitos do NOC, webhooks logísticos integrados e auditoria preditiva por IA no Hypercare.",
    status: "PUBLISHED"
  },
  {
    version: "v3.0 (Rascunho)",
    date: "2026-05-20 23:18",
    author: "William Lima",
    changeLog: "Planejamento de auto-cura de circuito por inteligência generativa na última milha e auto-escalação para NOC N3.",
    status: "DRAFT"
  }
];

export const processStats = {
  AS_IS: {
    totalDuration: "120 horas",
    averageHandoffs: "8 Handoffs Manuais",
    slaCompliance: "62.4%",
    automatedTasks: "0%",
    criticalRisksCount: 7,
    criticalBottlenecksCount: 5,
    operationalCost: "Alto (Mão de obra intensa)",
  },
  TO_BE: {
    totalDuration: "4.5 horas",
    averageHandoffs: "2 Handoffs Híbridos",
    slaCompliance: "99.8%",
    automatedTasks: "70.0%",
    criticalRisksCount: 0,
    criticalBottlenecksCount: 0,
    operationalCost: "Baixo (Escalável / API)",
  }
};
