# MVP_SCOPE - Escopo do MVP e Estratégia de Entrega

> **Contexto de Escopo para Desenvolvimento Assistido por IA**
> Este documento especifica as barreiras do MVP (*Minimum Viable Product*), definindo o que está no escopo, o que é de alta fidelidade e o que está fora para a entrega estratégica. IAs e desenvolvedores devem focar na consolidação destas rotas prioritárias de demonstração executiva.

---

## 1. Visão Geral da Entrega do MVP
O objetivo estratégico do MVP é fornecer um **cockpit executivo de alto impacto visual (Alta Fidelidade)**, permitindo à diretoria de operações da HIT demonstrar a capacidade de governança da plataforma em reuniões estratégicas. 

A entrega foca em fornecer protótipos de dados e interações funcionais de alto nível em português para todos os **12 Módulos Operacionais**, com persistência no banco de dados Supabase/PostgreSQL via Prisma e tratamento robusto do design corporativo premium.

---

## 2. Os 12 Módulos do MVP (Cobertura Completa)

A plataforma administrativa em `/admin` implementa e disponibiliza em alta fidelidade a navegação unificada e visualização de todos os 12 pilares operacionais da HIT:

1.  **Dashboard Executivo (`/admin/dashboard`)**:
    *   *Prioridade*: Máxima.
    *   *Conteúdo*: Cards de KPIs integrando Sparklines SVG geradas no servidor em tempo real (SLA, cycle time, faturamento, incidentes) e gráficos dinâmicos de faturamento da biblioteca Recharts.
2.  **Mapeamento de Processos (`/admin/processes`)**:
    *   *Prioridade*: Alta.
    *   *Conteúdo*: Tabela interativa monitorando processos ativos com indicativos claros sobre o ciclo de transição **AS IS** (Estático/Manual) para **TO BE** (Automatizado).
3.  **Modelador BPMN 2.0 (`/admin/bpmn`)**:
    *   *Prioridade*: Alta.
    *   *Conteúdo*: Canvas visual interativo com painel de controle flutuante, permitindo arrastar elementos e selecionar raias integradas com setores organizacionais.
4.  **Agente de IA Integrado (`/admin/ai-analysis`)**:
    *   *Prioridade*: Alta.
    *   *Conteúdo*: Janela de chat ativa permitindo ao executivo dialogar em português com um analista de IA inteligente sobre a saúde e gargalos operacionais da empresa.
5.  **Indicadores de Nível de Serviço (`/admin/kpis`)**:
    *   *Prioridade*: Média.
    *   *Conteúdo*: Cartões de acompanhamento de SLAs com barras de progresso coloridas dinamicamente em HSL.
6.  **Análise de Gargalos (`/admin/bottlenecks`)**:
    *   *Prioridade*: Média.
    *   *Conteúdo*: Análise de caminhos críticos e tempos de latência em tarefas de processos de backoffice.
7.  **Atas e Reuniões de IA (`/admin/meetings`)**:
    *   *Prioridade*: Média.
    *   *Conteúdo*: Área de upload de arquivos de reuniões operacionais, gerando transcrições e planos de ação automatizados por IA.
8.  **Matriz de Riscos (`/admin/riscos`)**:
    *   *Prioridade*: Média.
    *   *Conteúdo*: Matriz de severidade e probabilidade acoplada a mitigações e responsáveis do organograma.
9.  **Estrutura Organizacional (`/admin/org-structure`)**:
    *   *Prioridade*: Média.
    *   *Conteúdo*: Organograma dinâmico ligando os departamentos, líderes de área e cargos da HIT.
10. **Roadmaps de Maturidade (`/admin/roadmaps`)**:
    *   *Prioridade*: Baixa.
    *   *Conteúdo*: Linha do tempo visual (estilo diagrama de Gantt) mapeando a jornada de governança e prazos de faturamento.
11. **Central de Documentos (`/admin/docs`)**:
    *   *Prioridade*: Baixa.
    *   *Conteúdo*: Repositório de Procedimentos Operacionais Padrão (POPs) e relatórios formatados em PDF.
12. **Customer Success Visibility (`/admin/customer-success`)**:
    *   *Prioridade*: Média.
    *   *Conteúdo*: Saúde cadastral das grandes contas Enterprise atendidas, integridade de fluxos de dados e monitoramento de alertas ativos de atritos cadastrais.

---

## 3. Estratégia de Implementação Rápida (*Fastest Implementation*)
Para entregar com velocidade e estabilidade máxima, a arquitetura de dados segue as seguintes diretrizes:

*   **Mocking Inteligente no Servidor (Pre-seeded Data)**: Os 12 módulos operam com dados mockados super detalhados, consistentes entre si e focados nas volumetrias da HIT (SAP Billing, KYC Onboarding), semeados no lado do servidor. Isso garante que a demonstração executiva nunca pare por instabilidades em sistemas legados corporativos de terceiros.
*   **Aceleração de UI com TailwindCSS e Lucide**: Construção baseada em padrões modulares flexíveis reutilizando os tokens do arquivo de estilo global e ícones funcionais do Lucide React, acelerando o tempo de design para código.
*   **Singleton de Conexão Postgres**: O esquema de tabelas Prisma está estruturado e espelhado na nuvem. A persistência foca inicialmente no salvamento dinâmico de novos dados como notas e registros inseridos em tempo real na tela.

---

## 4. Prioridades para Demonstração Executiva (*Executive Demo Priorities*)
Ao conduzir a apresentação executiva para a diretoria da HIT, o fluxo de demonstração ideal deve seguir esta sequência de impacto:

1.  **Abertura e Dashboard Principal (`/admin/dashboard`)**:
    *   *Foco*: Wow-effect visual imediato. Mostrar a transição de Light/Dark Mode fluida, o menu retrátil e a renderização instantânea das Sparklines SVG geradas no servidor.
2.  **Transição de Processos (`/admin/processes` & `/admin/bpmn`)**:
    *   *Foco*: Demonstrar a passagem do AS IS para o TO BE. Exibir a tabela de faturamento e migrar para o Canvas BPMN interativo, destacando a amarração das raias ao organograma corporativo.
3.  **Painel de Co-Piloto de IA (`/admin/ai-analysis`)**:
    *   *Foco*: Mostrar inovação e automação cognitiva. Realizar perguntas à IA em português sobre "Qual o principal gargalo do Onboarding?" e destacar o diagnóstico inteligente gerado de forma estruturada.
4.  **Matriz de Riscos e Incidentes (`/admin/riscos`)**:
    *   *Foco*: Governança operacional estrita. Exibir a matriz de severidade térmica e como os riscos são atrelados a donos de processos da HIT.
