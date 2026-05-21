export interface LeadershipDemoStep {
  order: number;
  title: string;
  route: string;
  objective: string;
  talkingPoints: string[];
  executiveEmphasis: string;
  pacing: string;
  wowMoment?: string;
}

export interface DemoSafeItem {
  label: string;
  status: "ready" | "attention";
  detail: string;
}

export interface WowMoment {
  title: string;
  route: string;
  setup: string;
  leadershipImpact: string;
}

export interface BeforeAfterPoint {
  before: string;
  after: string;
  impact: string;
}

export interface DemoScriptSegment {
  segment: string;
  duration: string;
  objective: string;
  speakerNotes: string;
  transition: string;
}

export interface FinalExecutiveRecommendation {
  priority: string;
  title: string;
  decision: string;
  expectedGain: string;
}

export const leadershipDemoFlow: LeadershipDemoStep[] = [
  {
    order: 1,
    title: "Executive Overview",
    route: "/admin/presentation#presentation-slide-0",
    objective: "Abrir com a tese de transformação: controle executivo, maturidade operacional e governança escalável.",
    talkingPoints: [
      "A plataforma não é apenas um sistema; é a nova camada de inteligência operacional da HIT.",
      "A liderança passa a enxergar maturidade, SLA, risco de cliente e avanço da transformação em uma única narrativa.",
      "O ponto central é sair de gestão reativa para governança operacional contínua.",
    ],
    executiveEmphasis: "Começar pela ambição: crescimento com previsibilidade, não crescimento com esforço manual.",
    pacing: "60s",
    wowMoment: "Hero executivo em fullscreen com KPIs de maturidade e risco.",
  },
  {
    order: 2,
    title: "Current Operational Diagnosis",
    route: "/admin/presentation#presentation-slide-1",
    objective: "Mostrar por que a operação atual sente atrito: ferramentas dispersas, handoffs manuais e ownership parcial.",
    talkingPoints: [
      "A operação cresceu mais rápido que seus mecanismos de controle.",
      "Hoje o risco aparece tarde, normalmente quando SLA ou cliente já foram impactados.",
      "O diagnóstico organiza o problema para liderança decidir com clareza.",
    ],
    executiveEmphasis: "Não vender caos: evidenciar oportunidade de maturidade.",
    pacing: "90s",
  },
  {
    order: 3,
    title: "Current Operational Chaos",
    route: "/admin/presentation#presentation-slide-2",
    objective: "Evidenciar os pontos AS IS onde filas, retrabalho e comunicação fragmentada se acumulam.",
    talkingPoints: [
      "Cada passagem entre Comercial, Engenharia, Logística, NOC, CS e Financeiro adiciona risco.",
      "A dependência de e-mail, planilha e validação manual reduz previsibilidade.",
      "O custo real não é apenas atraso; é perda de confiança operacional.",
    ],
    executiveEmphasis: "O problema está nos handoffs, não na dedicação dos times.",
    pacing: "90s",
    wowMoment: "Fluxo AS IS com concentração visual de gargalos.",
  },
  {
    order: 4,
    title: "Customer Impact",
    route: "/admin/presentation#presentation-slide-4",
    objective: "Conectar gargalos internos a experiência do cliente, churn risk e escalonamentos.",
    talkingPoints: [
      "O cliente sente fragmentação antes da empresa enxergar o risco agregado.",
      "Onboarding lento e múltiplos contatos aumentam fricção em contas estratégicas.",
      "Customer Success precisa operar com sinais antecipados, não apenas pós-incidente.",
    ],
    executiveEmphasis: "Governança operacional é alavanca direta de retenção.",
    pacing: "90s",
    wowMoment: "Mapa de jornada do cliente com dor, risco e health score.",
  },
  {
    order: 5,
    title: "SLA & Governance Gaps",
    route: "/admin/dashboard",
    objective: "Mostrar como o dashboard transforma SLA em gestão executiva e não apenas métrica operacional.",
    talkingPoints: [
      "SLA compliance precisa ser visto com tendência, causa e impacto em cliente.",
      "Alertas executivos reduzem surpresa e criam cadência de governança.",
      "A plataforma combina desempenho, risco e maturidade em uma mesma leitura.",
    ],
    executiveEmphasis: "SLA deixa de ser relatório e vira sistema de controle.",
    pacing: "75s",
  },
  {
    order: 6,
    title: "Process Fragmentation",
    route: "/admin/processes",
    objective: "Provar que a base de processos está organizada por dono, maturidade, risco, dependência e tipo AS IS/TO BE.",
    talkingPoints: [
      "A HIT passa a ter inventário vivo de processos críticos.",
      "Cada processo nasce com owner, SLA, riscos e impacto no cliente.",
      "Essa estrutura prepara automação, auditoria e evolução contínua.",
    ],
    executiveEmphasis: "Sem inventário confiável, transformação vira esforço isolado.",
    pacing: "60s",
  },
  {
    order: 7,
    title: "BPMN Visualization",
    route: "/admin/bpmn",
    objective: "Usar BPMN como linguagem comum entre operação, liderança e tecnologia.",
    talkingPoints: [
      "BPMN torna visível o que antes ficava disperso em reuniões e mensagens.",
      "Gargalos, SLAs, aprovações e touchpoints de cliente ficam auditáveis.",
      "A liderança consegue comparar o AS IS com o modelo TO BE sem perder detalhe operacional.",
    ],
    executiveEmphasis: "Processo deixa de ser documentação estática e vira instrumento de decisão.",
    pacing: "90s",
    wowMoment: "Reveal do BPMN com pontos de gargalo e SLA.",
  },
  {
    order: 8,
    title: "Operational Bottlenecks",
    route: "/admin/bottlenecks",
    objective: "Priorizar os gargalos que mais explicam atraso, retrabalho e risco de cliente.",
    talkingPoints: [
      "Os gargalos críticos não têm o mesmo peso; precisamos gerir por impacto e urgência.",
      "A plataforma aponta severidade, departamento afetado, impacto em cliente e ação sugerida.",
      "Isso cria foco executivo para remover restrições reais de escala.",
    ],
    executiveEmphasis: "Prioridade operacional deve ser orientada por restrição, não por volume de ruído.",
    pacing: "75s",
  },
  {
    order: 9,
    title: "AI Operational Intelligence",
    route: "/admin/ai-analysis",
    objective: "Mostrar a camada preditiva: anomalias, riscos emergentes, recomendações e governança assistida.",
    talkingPoints: [
      "A IA organiza sinais que hoje ficariam distribuídos entre times.",
      "A recomendação executiva traz causa provável, impacto e ação.",
      "A meta é antecipar falhas de SLA e risco de churn antes da escalada.",
    ],
    executiveEmphasis: "IA aqui é copiloto de governança, não decoração tecnológica.",
    pacing: "75s",
    wowMoment: "Insights executivos com risco previsto e recomendação objetiva.",
  },
  {
    order: 10,
    title: "Executive Dashboards",
    route: "/admin/dashboard",
    objective: "Reposicionar o dashboard como cockpit de governança: KPIs, customer health, risco, maturidade e roadmap.",
    talkingPoints: [
      "A liderança ganha uma visão única da operação, dos clientes e da transformação.",
      "Os KPIs contam uma história: onde estamos, para onde vamos e o que exige decisão.",
      "Essa visão sustenta reuniões executivas recorrentes com dados consistentes.",
    ],
    executiveEmphasis: "A plataforma cria cadência de gestão, não apenas visualização.",
    pacing: "90s",
  },
  {
    order: 11,
    title: "TO BE Future-State Model",
    route: "/admin/presentation#presentation-slide-6",
    objective: "Mostrar o futuro operacional com eventos governados, owners claros e handoffs padronizados.",
    talkingPoints: [
      "O modelo TO BE reduz esforço manual e transforma fila em workflow rastreável.",
      "A governança começa no kickoff, não no pós-problema.",
      "O cliente passa a ter jornada mais previsível e menos dependente de escalonamento.",
    ],
    executiveEmphasis: "Escala vem de padrão operacional, automação e accountability.",
    pacing: "90s",
    wowMoment: "Comparação visual do fluxo futuro, com handoffs governados.",
  },
  {
    order: 12,
    title: "Governance Evolution",
    route: "/admin/presentation#presentation-slide-7",
    objective: "Evidenciar antes vs depois: auditoria posterior versus controle em tempo real.",
    talkingPoints: [
      "Governança madura combina visibilidade, rotina de decisão e capacidade de intervenção.",
      "O futuro traz owners, SLAs e dependências explícitas por processo.",
      "Isso muda o papel da liderança: de cobrança reativa para direção estratégica.",
    ],
    executiveEmphasis: "Governança é o sistema operacional da escala.",
    pacing: "75s",
  },
  {
    order: 13,
    title: "Operational Scalability",
    route: "/admin/presentation#presentation-slide-8",
    objective: "Apresentar a visão de plataforma: inteligência operacional, métricas vivas e recomendações integradas.",
    talkingPoints: [
      "A escalabilidade aparece quando todos os times trabalham sobre a mesma verdade operacional.",
      "Maturidade, SLA, risco e customer health deixam de ser análises separadas.",
      "A HIT ganha um modelo replicável para novas operações, clientes e ofertas.",
    ],
    executiveEmphasis: "A plataforma vira infraestrutura de crescimento.",
    pacing: "75s",
  },
  {
    order: 14,
    title: "Transformation Roadmap",
    route: "/admin/presentation#presentation-slide-9",
    objective: "Conectar visão a execução: ações imediatas, curto prazo, maturidade média e escala longa.",
    talkingPoints: [
      "A transformação está organizada em ondas, com prioridade, ownership e ganho esperado.",
      "Primeiro removemos gargalos críticos; depois padronizamos e automatizamos.",
      "O roadmap protege a operação enquanto constrói maturidade.",
    ],
    executiveEmphasis: "A transformação é governável porque tem sequência, donos e métricas.",
    pacing: "90s",
    wowMoment: "Roadmap executivo com ondas de maturidade e ganhos esperados.",
  },
  {
    order: 15,
    title: "Final Strategic Vision",
    route: "/admin/presentation#presentation-slide-11",
    objective: "Fechar com a percepção correta: início de uma transformação operacional, não fim de um projeto de software.",
    talkingPoints: [
      "A HIT passa a operar com maior controle, previsibilidade e inteligência.",
      "A liderança ganha visibilidade para direcionar capacidade, risco e experiência do cliente.",
      "Este é o começo de uma disciplina de excelência operacional escalável.",
    ],
    executiveEmphasis: "A mensagem final: HIT está assumindo controle executivo da própria operação.",
    pacing: "60s",
  },
];

export const demoSafeChecklist: DemoSafeItem[] = [
  {
    label: "Dataset executivo carregado",
    status: "ready",
    detail: "40 processos, gargalos, KPIs, clientes, roadmap, BPMNs e insights de IA conectados.",
  },
  {
    label: "Presentation Mode pronto",
    status: "ready",
    detail: "Fullscreen, auto-story, summary mode, hide UI e screenshot mode disponíveis.",
  },
  {
    label: "Fluxo de navegação guiado",
    status: "ready",
    detail: "15 etapas conectadas aos módulos certos para conduzir a narrativa de liderança.",
  },
  {
    label: "Estados sem vazio",
    status: "ready",
    detail: "Dashboards, matrizes, timelines e cards operam com dados realistas da transformação HIT.",
  },
  {
    label: "Roteiro recomendado",
    status: "ready",
    detail: "Pacing executivo de 12 a 16 minutos com momentos de impacto planejados.",
  },
  {
    label: "Fallback de apresentação",
    status: "attention",
    detail: "Manter `/admin/demo`, `/admin/presentation` e `/admin/dashboard` abertos antes da reunião.",
  },
];

export const executiveWowMoments: WowMoment[] = [
  {
    title: "BPMN reveal de governança",
    route: "/admin/bpmn",
    setup: "Abrir o fluxo e destacar onde SLA, owner e gargalo aparecem no mesmo mapa.",
    leadershipImpact: "Mostra que a operação finalmente pode ser debatida visualmente, sem depender de memória ou reunião.",
  },
  {
    title: "AS IS vs TO BE transformation",
    route: "/admin/presentation#presentation-slide-6",
    setup: "Depois de mostrar o caos atual, avançar para o modelo futuro e deixar a diferença respirar.",
    leadershipImpact: "Cria percepção de evolução concreta: menos ruído, mais controle, melhor experiência do cliente.",
  },
  {
    title: "Executive dashboard cockpit",
    route: "/admin/dashboard",
    setup: "Mostrar os KPIs de saúde, SLA, maturidade, churn e transformação como uma única leitura.",
    leadershipImpact: "Reposiciona liderança de cobradora de status para governadora de performance.",
  },
  {
    title: "AI operational recommendation",
    route: "/admin/ai-analysis",
    setup: "Selecionar uma recomendação crítica e explicar causa, impacto e ação sugerida.",
    leadershipImpact: "Demonstra que a plataforma antecipa risco e reduz tempo entre sinal e decisão.",
  },
  {
    title: "Roadmap de maturidade",
    route: "/admin/presentation#presentation-slide-9",
    setup: "Fechar a história com ondas de transformação, donos e ganhos esperados.",
    leadershipImpact: "Transforma a demo em programa de mudança com sequência executiva clara.",
  },
];

export const beforeAfterStory: BeforeAfterPoint[] = [
  {
    before: "Times operando por e-mail, planilha e comunicação dispersa.",
    after: "Workflows governados com owner, SLA, dependências e status executivo.",
    impact: "Menos retrabalho, menos ruído e maior previsibilidade de entrega.",
  },
  {
    before: "Gargalos aparecem quando o cliente já abriu escalonamento.",
    after: "Alertas de risco e gargalos críticos visíveis antes da quebra de SLA.",
    impact: "Intervenção antecipada e redução de impacto em contas estratégicas.",
  },
  {
    before: "BPMN usado como documentação pontual.",
    after: "BPMN como mapa vivo de governança, risco, SLA e transformação.",
    impact: "Processos deixam de ser abstratos e viram pauta objetiva de decisão.",
  },
  {
    before: "Customer Success reage a sintomas de atraso e frustração.",
    after: "Customer health integra onboarding, hypercare, adoção e risco de churn.",
    impact: "Operação passa a proteger retenção e experiência do cliente.",
  },
  {
    before: "Liderança depende de status report manual e percepção local.",
    after: "Cockpit executivo com saúde operacional, maturidade, risco e recomendações.",
    impact: "Decisões ficam mais rápidas, consistentes e governadas.",
  },
];

export const finalDemoScript: DemoScriptSegment[] = [
  {
    segment: "Abertura e tese",
    duration: "2 min",
    objective: "Criar o enquadramento de transformação operacional.",
    speakerNotes: "Comece dizendo que a proposta é demonstrar como a HIT pode passar de operação reativa para governança operacional assistida por dados e IA.",
    transition: "Ir do hero para o diagnóstico atual.",
  },
  {
    segment: "Diagnóstico e impacto",
    duration: "4 min",
    objective: "Explicar a origem dos atritos atuais e conectar com cliente.",
    speakerNotes: "Mostre que o problema central é fragmentação de handoffs, não falta de esforço. Conecte atraso interno com experiência do cliente e risco de churn.",
    transition: "Avançar para BPMN e gargalos para provar onde o atrito nasce.",
  },
  {
    segment: "Visibilidade e controle",
    duration: "4 min",
    objective: "Mostrar como dashboards, BPMN e IA criam uma nova rotina de governança.",
    speakerNotes: "Mostre dashboard, gargalos e insights de IA como um sistema de decisão integrado. Reforce que a liderança passa a enxergar causa, risco e ação.",
    transition: "Contrastar o AS IS com o TO BE.",
  },
  {
    segment: "Futuro operacional",
    duration: "3 min",
    objective: "Apresentar o modelo TO BE, governança e escalabilidade.",
    speakerNotes: "Destaque owners claros, eventos governados, SLA visível, menos dependência manual e customer success mais preditivo.",
    transition: "Entrar no roadmap de transformação.",
  },
  {
    segment: "Roadmap e decisão executiva",
    duration: "3 min",
    objective: "Converter a demonstração em agenda de liderança.",
    speakerNotes: "Feche com ondas de transformação, prioridades e recomendações. A mensagem final é que este é o início de uma disciplina operacional nova dentro da HIT.",
    transition: "Finalizar no slide de visão estratégica.",
  },
];

export const finalExecutiveRecommendations: FinalExecutiveRecommendation[] = [
  {
    priority: "Imediata",
    title: "Criar rito semanal de governança operacional",
    decision: "Usar dashboard executivo como pauta fixa para SLA, gargalos, customer risk e maturidade.",
    expectedGain: "Redução de surpresa operacional e maior velocidade de decisão.",
  },
  {
    priority: "Imediata",
    title: "Remover gargalos críticos de Connectivity Implementation",
    decision: "Priorizar validação geográfica, rastreabilidade logística e conciliação SAP.",
    expectedGain: "Menor lead time de implantação e redução de escalonamentos em contas estratégicas.",
  },
  {
    priority: "Alta",
    title: "Padronizar handoffs AS IS -> TO BE",
    decision: "Transformar passagens críticas em eventos governados com owner, SLA e evidência.",
    expectedGain: "Mais accountability e menos retrabalho entre Comercial, Engenharia, NOC, CS e Financeiro.",
  },
  {
    priority: "Alta",
    title: "Ativar customer health como indicador executivo",
    decision: "Conectar onboarding, hypercare, sentimento, incidentes e risco de churn ao cockpit executivo.",
    expectedGain: "Retenção mais proativa e melhor experiência em clientes críticos.",
  },
  {
    priority: "Estratégica",
    title: "Evoluir IA como copiloto de governança",
    decision: "Usar insights de anomalia, risco previsto e recomendação como entrada do comitê operacional.",
    expectedGain: "Antecipação de falhas de SLA e amadurecimento da operação assistida por dados.",
  },
];

export const executiveSummaryMode = {
  headline: "HIT Operational Transformation: de operação fragmentada para inteligência operacional governada.",
  twoMinuteReadout: [
    "40 processos críticos estruturados com owners, SLAs, riscos e maturidade.",
    "96.4% de conformidade de SLA com tendência positiva e alertas executivos.",
    "62.5% de adoção TO BE já representada no roadmap de transformação.",
    "Customer risk integrado à visão operacional para proteger retenção e experiência.",
    "Presentation Mode preparado para fullscreen, summary mode, screenshot mode e navegação guiada.",
  ],
  leadershipMessage:
    "A plataforma demonstra que a HIT está criando uma disciplina de governança operacional: visível para liderança, útil para times e orientada à experiência do cliente.",
};
