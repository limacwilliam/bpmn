import { AITranscript, AIAnalysisReport, ChatMessage } from "./types";

export const sampleTranscriptText = `
William Lima (Diretor de Operações): Pessoal, chamei todos vocês aqui porque o nosso tempo de ativação de conectividade corporativa está crítico. O nosso SLA global de Go-Live está estourando as 120 horas na maioria dos casos e os clientes estão reclamando bastante. Precisamos mapear o fluxo atual e entender onde estão as perdas operacionais para estruturar uma transformação TO BE.

Mariana Costa (Comercial): Do lado comercial, o problema começa logo após a assinatura do contrato. O handoff para a equipe de implantação é feito via e-mail manual com arquivos anexos. A planilha no OneDrive muitas vezes não sincroniza a tempo, ou as mensagens de WhatsApp se perdem, o que faz com que o agendamento de Kickoff atrase até 48 horas só para começar a tramitar internamente.

Carlos Ramos (Engenharia / TI): Quando recebemos os dados, precisamos fazer a validação de viabilidade técnica. Consultamos a posição física de postes da distribuidora e a distância da caixa de emenda. Mas fazemos isso de forma 100% manual, cruzando dados geográficos locais no Google Earth com planilhas de terceiros. A Engenharia fica com uma fila de chamados, demorando até 72 horas para emitir o parecer técnico de viabilidade.

Marcos Souza (Logística): Na logística de hardware, nós separamos o roteador no almoxarifado e enviamos por Correios ou portador local. O problema é que a nossa plataforma não tem rastreamento direto do frete. Nós ficamos ligando para a transportadora ou mandando WhatsApp para saber o status do envio. CS fica nos cobrando o rastreio toda hora para poder agendar o técnico, e essa falta de sincronia gera um estresse enorme e reagendamentos constantes por atraso de entrega de hardware.

Amanda Lima (NOC - Redes): No NOC, nós fazemos a ativação das VLANs e portas lógicas do switch corporativo via terminal CLI, digitando os comandos linha a linha. Quando há qualquer erro de digitação nos IPs ou tags de circuito, a porta bloqueia e o link cai. A equipe é pequena e fica sobrecarregada digitando scripts manuais. Isso consome mais de 24 horas e é responsável por quase 35% dos nossos estouros de prazos de ativação.

Juliana Mendes (CS - Customer Success): Agendar a instalação com o cliente via e-mail ou ligação é um parto. O cliente demora a responder, e por falta de confirmações automáticas, o técnico às vezes vai a campo e não encontra ninguém, gerando viagem perdida de parceiros. Para piorar, o período de Hypercare de 7 dias pós-ativação é caótico. Como a documentação técnica de topologia de rede não é integrada de forma automatizada com o Zendesk do Suporte N1, o cliente nos aciona direto no WhatsApp pessoal e CS acaba atuando como suporte de primeiro nível por dias!

William Lima (Diretor de Operações): Certo, isso é o verdadeiro caos de processos. Temos handoffs manuais críticos de Comercial para Engenharia, dependência de frete cego, NOC com digitação manual e CS atuando como suporte informal. Precisamos automatizar a viabilidade com IA no Geoportal, integrar rastreamento de hardware via webhooks de logística, provisionamento automático SDN e agendamento self-service. Vamos processar isso.
`;

export const sampleTranscript: AITranscript = {
  id: "transcript-hit-conn",
  fileName: "HIT_Connectivity_Implementation_Ata.txt",
  fileSize: "4.8 KB",
  meetingTitle: "Alinhamento e Dores de Implantação de Conectividade HIT",
  department: "Operações & CS",
  processTag: "Connectivity Provisioning",
  uploadedAt: "2026-05-20 22:30",
  content: sampleTranscriptText
};

export const sampleAnalysisReport: AIAnalysisReport = {
  id: "analysis-hit-conn",
  transcriptId: "transcript-hit-conn",
  healthScore: 34, // Crítico (Vermelho)
  maturityLevel: "Nível 1 (Caótico)",
  summary: "Ata de reunião operacional detalhando sérias ineficiências no provisionamento de conectividade corporativa da HIT. Foram detectados Handoffs manuais complexos de até 48h entre o Comercial e a Engenharia, falta de rastreabilidade de hardware logístico, provisionamento CLI manual sobrecarregando o NOC e desvio de função na equipe de CS no período de pós-venda (Hypercare).",
  verdict: "O fluxo atual (AS IS) consome mais de 120 horas e opera com elevados custos e riscos fiscais e operacionais. É altamente recomendado iniciar a transição para o modelo TO BE otimizado com provisionamento automatizado via APIs de SDN, rastreio webhook integrado, e consulta Geoespacial centralizada por IA no Geoportal.",
  
  bottlenecks: [
    {
      id: "b1",
      step: "Handoff Comercial & Abertura de Projeto",
      lane: "Comercial",
      delay: "48 horas",
      impact: "Planilhas de ativação descentralizadas no OneDrive e mensagens manuais de WhatsApp causam atrasos iniciais graves de 2 dias.",
      mitigation: "Integração automática por API entre o fechamento da oportunidade no Salesforce e a HIT Platform."
    },
    {
      id: "b2",
      step: "Validação de Viabilidade Técnica",
      lane: "Engenharia / TI",
      delay: "72 horas",
      impact: "Análise manual de postes no Google Earth e tabelas avulsas criam filas excessivas e demoras técnicas.",
      mitigation: "Substituir validação manual por IA Geoespacial e banco de viabilidade HIT centralizado."
    },
    {
      id: "b3",
      step: "Rastreio e Entrega de Hardware",
      lane: "Logística",
      delay: "96 horas",
      impact: "Falta de código de rastreio integrado impede o agendamento assertivo com o cliente, gerando técnicos batendo na porta de empresas fechadas.",
      mitigation: "Integração do ERP via API da transportadora com webhooks e disparo de rastreio automático."
    },
    {
      id: "b4",
      step: "Configuração de Circuito & Portas",
      lane: "NOC (Redes)",
      delay: "24 horas",
      impact: "Configuração CLI linha a linha provoca 35% de falhas humanas (erro de IPs e VLANs) que derrubam o link.",
      mitigation: "Implementar provisionamento de rede definido por software (SDN) com templates padronizados via APIs."
    },
    {
      id: "b5",
      step: "Período de Hypercare (Atendimento)",
      lane: "Customer Success",
      delay: "168 horas",
      impact: "Sem documentação integrada com o Suporte N1, CS atua informalmente como suporte técnico via WhatsApp pessoal, gerando desgaste excessivo.",
      mitigation: "Sincronização automática de dados técnicos de topologia com Zendesk API logo no Go-Live."
    }
  ],

  risks: [
    {
      id: "r1",
      risk: "Perda de Receita Recorrente (MRR Delay)",
      severity: "EXTREME",
      mitigation: "Assinatura digital de termos com ativação imediata no financeiro.",
      checked: false
    },
    {
      id: "r2",
      risk: "Multas Contratuais por Atraso (SLA Breach)",
      severity: "HIGH",
      mitigation: "Boundary Events de 1h no modelador para disparar alertas automáticos.",
      checked: false
    },
    {
      id: "r3",
      risk: "Burnout e Sobrecarga de CS/Atendimento",
      severity: "HIGH",
      mitigation: "Transição integrada e self-service de suporte N1 com Zendesk.",
      checked: false
    },
    {
      id: "r4",
      risk: "Extravio de Roteadores de Alto Custo",
      severity: "MEDIUM",
      mitigation: "Seguro obrigatório e rastreamento constante via frete conectado.",
      checked: false
    }
  ],

  processSteps: [
    { id: "s1", title: "Handoff Comercial", lane: "Comercial", mode: "AS_IS", type: "START" },
    { id: "s2", title: "Kickoff OneDrive", lane: "Comercial", mode: "AS_IS", type: "USER_TASK" },
    { id: "s3", title: "Consulta Manual Google Earth", lane: "Engenharia", mode: "AS_IS", type: "USER_TASK" },
    { id: "s4", title: "Despacho Offline", lane: "Logística", mode: "AS_IS", type: "USER_TASK" },
    { id: "s5", title: "Console CLI NOC", lane: "NOC", mode: "AS_IS", type: "SYSTEM_TASK" },
    { id: "s6", title: "Termo Assinado Físico", lane: "Cliente", mode: "AS_IS", type: "CUSTOMER_ACTION" },
    { id: "s7", title: "Suporte pelo WhatsApp CS", lane: "CS", mode: "AS_IS", type: "ESCALATION" },
    
    { id: "s10", title: "Disparo Salesforce API", lane: "Comercial", mode: "TO_BE", type: "START" },
    { id: "s11", title: "HIT Geo-AI Geoportal", lane: "Engenharia", mode: "TO_BE", type: "SYSTEM_TASK" },
    { id: "s12", title: "Envio Conectado Webhook", lane: "Logística", mode: "TO_BE", type: "SYSTEM_TASK" },
    { id: "s13", title: "Provisionamento SDN API", lane: "NOC", mode: "TO_BE", type: "SYSTEM_TASK" },
    { id: "s14", title: "Confirmação WhatsApp Bot", lane: "CS", mode: "TO_BE", type: "CUSTOMER_TOUCHPOINT" },
    { id: "s15", title: "Assinatura Digital Docusign", lane: "Cliente", mode: "TO_BE", type: "CUSTOMER_ACTION" },
    { id: "s16", title: "Sync Autotático Zendesk & ERP", lane: "Suporte", mode: "TO_BE", type: "END" }
  ],

  recommendations: [
    {
      id: "rec1",
      title: "Eliminação da CLI manual do NOC",
      owner: "Amanda Lima (NOC Lead)",
      steps: [
        "Homologar templates SDN no iMaster NCE.",
        "Desenvolver endpoint de provisionamento na HIT Platform.",
        "Desabilitar o acesso direto CLI para comandos de rotas repetitivos."
      ]
    },
    {
      id: "rec2",
      title: "Automação do Handoff Comercial-Engenharia",
      owner: "William Lima (Lead Ops)",
      steps: [
        "Configurar webhook de oportunidade ganha no Salesforce.",
        "Disparar pré-viabilidade automática de geolocalização no Geoportal via IA.",
        "Reduzir o tempo de análise de 72h para 5 minutos."
      ]
    },
    {
      id: "rec3",
      title: "Estruturação da Transição N1 e Topologia",
      owner: "Juliana Mendes (CS Manager)",
      steps: [
        "Criar template de documentação técnica do circuito na HIT Platform.",
        "Configurar script de envio de topologia física via API para o Zendesk.",
        "Treinar a equipe N1 sobre o repositório de governança da HIT."
      ]
    }
  ]
};

export const libraryTranscripts: AITranscript[] = [
  {
    id: "transcript-hit-conn",
    fileName: "HIT_Connectivity_Implementation_Ata.txt",
    fileSize: "4.8 KB",
    meetingTitle: "Alinhamento e Dores de Implantação de Conectividade HIT",
    department: "Operações & CS",
    processTag: "Connectivity Provisioning",
    uploadedAt: "2026-05-20 22:30",
    content: sampleTranscriptText
  },
  {
    id: "transcript-financial-reconciliation",
    fileName: "Ata_Conciliacao_Faturamento_Q2.docx",
    fileSize: "6.2 KB",
    meetingTitle: "Mapeamento de Atritos e Fechamento de Notas SAP-ERP",
    department: "Financeiro & Faturamento",
    processTag: "Billing Reconciliation",
    uploadedAt: "2026-05-18 10:14",
    content: "Mariana Costa: A emissão de notas fiscais atrasa devido à falta de confirmação manual de ativação do link de conectividade pelo NOC. William Lima: Vamos criar automações no faturamento..."
  },
  {
    id: "transcript-cs-onboarding",
    fileName: "Minutes_CS_Enterprise_Onboarding.pdf",
    fileSize: "8.5 KB",
    meetingTitle: "Entrevistas de CSAT e Onboarding de Contas Grandes",
    department: "Customer Success",
    processTag: "Onboarding Experience",
    uploadedAt: "2026-05-15 15:45",
    content: "Juliana Mendes: Clientes reclamam que no primeiro dia de ativados o sinal oscila e o CS fica sabendo por ligação furiosa. Queremos monitoramento preditivo..."
  }
];

export const quickPrompts = [
  {
    title: "Diagnóstico de Gargalos",
    prompt: "Identifique gargalos no provisionamento do NOC e Engenharia de Rede e proponha correções."
  },
  {
    title: "Plano de Mitigação de Riscos",
    prompt: "Gere a matriz de riscos e penalidades contratuais a partir das dores de Hypercare discutidas."
  },
  {
    title: "Workflow Recomendado TO BE",
    prompt: "Com base nos Handoffs da reunião, desenhe o fluxo de tarefas e APIs idealizado para a Logística."
  },
  {
    title: "KPIs e Metas de SLA",
    prompt: "Sugira indicadores chave baseados nas ineficiências comerciais relatadas pela Mariana Costa."
  }
];

export const initialChatMessages: ChatMessage[] = [
  {
    id: "msg-1",
    sender: "ai",
    text: "Olá, William! Sou o seu analista de inteligência operacional de IA. Carregue uma ata de reunião ou selecione um dos relatórios do nosso repositório corporativo de conhecimento para iniciarmos a extração de dores, KPIs, riscos e estruturas de fluxos BPMN.",
    timestamp: "22:30"
  }
];
