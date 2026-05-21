# MASTER_CONTEXT - Central de Governança Operacional da HIT

> **Contexto Persistente para Desenvolvimento Assistido por Inteligência Artificial (AI-Readable Context)**
> Este documento é o núcleo de contexto persistente da HIT Governance Platform. Ele descreve a missão, objetivos, metas operacionais e a base estratégica que guiam o design, arquitetura e desenvolvimento deste ecossistema. Qualquer agente ou sistema de IA que atue neste projeto deve referenciar este arquivo para garantir total conformidade com a visão executiva e técnica da HIT.

---

## 1. Missão da Plataforma
A **HIT Operations Platform** tem a missão de atuar como o **cérebro operacional unificado** da companhia, integrando de forma contínua e em tempo real os processos corporativos, a infraestrutura tecnológica, as lideranças departamentais e os indicadores de nível de serviço (SLAs). 

A plataforma transforma dados de backoffice dispersos em inteligência executiva acionável, capacitando a liderança corporativa (**WL Lead Ops**) a identificar gargalos, prever riscos e coordenar a transformação contínua dos fluxos de trabalho do estado atual (**AS IS**) para o estado otimizado (**TO BE**).

---

## 2. Objetivos Principais (*Main Objectives*)
*   **Mapeamento Ativo e Executável**: Permitir a modelagem visual direta e interativa de diagramas baseados na especificação global **BPMN 2.0**, conectando tarefas às lanes correspondentes aos setores reais do organograma.
*   **Monitoramento e Resolução de SLAs**: Centralizar a visualização em tempo real de Acordos de Nível de Serviço de grandes contas (Enterprise), alertando preventivamente sobre riscos de estouro.
*   **Governança e Mitigação de Riscos**: Acoplar uma matriz de riscos ativa e visual a cada nó e etapa dos processos modelados, forçando planos de ação com responsáveis diretos.
*   **Inteligência Cognitiva Assistida**: Integrar modelos de linguagem e agentes inteligentes para analisar transcrições de reuniões, sugerir mitigações e auditar fluxos em busca de redundâncias e desperdício de eficiência.

---

## 3. Metas de Transformação Operacional (*Operational Transformation Goals*)
*   **Eliminação de Latência Manual**: Reduzir em até **75%** o tempo de processamento manual no faturamento corporativo e no fluxo de Onboarding/KYC através da migração sistemática do modelo informal para rotinas automatizadas no TO BE.
*   **Zero Vazamento de SLAs**: Garantir índice de conformidade de SLAs superior a **98.5%** em contas estratégicas.
*   **Sincronização Organizacional**: Garantir que 100% dos processos mapeados possuam amarração explícita com os departamentos e líderes operacionais definidos no organograma da HIT, quebrando silos departamentais.
*   **Auditorias Ativas de Processos**: Manter histórico versionado e rastreabilidade total de modificações de fluxos, permitindo auditorias céleres e conformidade regulatória.

---

## 4. Propósito Estratégico & Posicionamento Corporativo (*Enterprise Positioning*)
A excelência operacional e a confiabilidade na entrega de serviços complexos B2B para contas *Enterprise* são os maiores diferenciais de posicionamento da **HIT** no mercado corporativo regional. 

Neste contexto, a HIT Operations Platform não é apenas uma ferramenta interna de produtividade, mas sim o principal ativo estratégico de governança da empresa, demonstrando a clientes e auditores externos que as operações da HIT rodam sob controles de classe mundial, com redundância de dados, análise de riscos ativa e tomadas de decisão baseadas em IA de ponta.

---

## 5. Diretrizes da Identidade Visual Oficial da HIT (*Visual Identity & Branding Guidelines*)
O desenvolvimento e as interfaces da plataforma devem seguir rigorosamente as regras estéticas estabelecidas no manual de design corporativo localizado em `/BPMN/hit_design_system.txt`:

*   **Filosofia Estética (Warm Corporate)**: Evitar tons frios de azul-claro ou cinzas genéricos de sistemas legados. A interface adota um tom neutro acolhedor e executivo (Warm Neutrals).
*   **Paleta de Cores HSL**:
    *   **Background Suave (Warm Neutral)**: `hsl(30 20% 96%)` - Base quente off-white para o corpo do site.
    *   **Contraste Principal (Charcoal Brown)**: `hsl(30 56% 7%)` (Hex `#1C1208`) - Cor de texto principal, cabeçalhos robustos e fundo de painéis de alta ênfase no modo escuro.
    *   **Destaque Ativo (Energetic Orange)**: `hsl(16 88% 54%)` (Hex `#F15A22`) - Ação primária, botões em foco, status ativos de processos e badges de SLAs em dia.
    *   **Destaque Ativo Hover**: `hsl(16 88% 47%)` - Resposta de transição CSS para hover em elementos interativos.
*   **Tipografia**:
    *   Família oficial: **Anek Latin** (carregada globalmente).
    *   Títulos estruturados em negrito denso (`font-black` - 900) e espaçamento horizontal ligeiramente compacto (`tracking-tight`) para uma assinatura executiva imponente.
*   **Padrões de Layout**:
    *   **Chrome de Administração**: Estruturado com uma Sidebar retrátil e um Header com efeito glassmórfico de vidro fosco (`backdrop-blur-md bg-background/80`).
    *   **Arredondamento Dinâmico**: Bordas do tipo pílula (`rounded-full`) na área pública/branding e bordas moderadas (`rounded-md` ou `rounded-lg`) nos formulários e editores administrativos para maximizar a área de dados útil.
