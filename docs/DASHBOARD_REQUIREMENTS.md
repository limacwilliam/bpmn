# DASHBOARD_REQUIREMENTS - Requisitos dos Painéis Executivos e KPIs

> **Contexto de Requisitos de Interface e KPIs para Desenvolvimento Assistido por IA**
> Este documento especifica o comportamento, as regras visuais, a modelagem de dados e as metas de negócios por trás do cockpit executivo da HIT Operations Platform. Alterações em gráficos Recharts, widgets de KPIs ou tabelas de métricas devem obedecer rigorosamente a este guia.

---

## 1. Visão Geral dos Dashboards
A central de inteligência da **HIT Governance Platform** é alimentada por um cockpit executivo projetado para consolidar dados operacionais de múltiplos sistemas legados (como faturamento SAP e processos de Onboarding/KYC). A interface visa conceder aos líderes de operações (**Lead Ops**) e diretores seniores uma visão imediata sobre a saúde operacional, conformidade de contratos e gargalos operacionais em tempo real.

O dashboard é estruturado para suportar decisões rápidas e estratégicas, seguindo a hierarquia de visualização clássica: **Métricas Gerais de Negócio $\rightarrow$ Desempenho Operacional por Setor $\rightarrow$ Análise Detalhada de Incidentes e SLAs**.

---

## 2. Visão Executiva e Controle de Acesso (Perfis de Visualização)
Os painéis exibem visualizações segmentadas com base no nível de governança do usuário:

*   **WL Lead Ops (Operações Globais)**: Acesso completo a todas as métricas operacionais, volume financeiro de faturamento SAP mapeado, taxas de estouro de SLA agregadas, atritos entre lanes de departamentos e recomendações estratégicas sugeridas por IA.
*   **Coordenador de Área**: Visão restrita aos SLAs de suas respectivas lanes de processos e organograma setorial direto, com foco em métricas de produtividade, filas de gargalo e reuniões de alinhamento com atas de IA.
*   **Analista de Processos / Auditor**: Foco em logs de incidentes, matrizes de risco, versionamento de diagramas BPMN (AS IS vs TO BE) e acompanhamento técnico das integrações.

---

## 3. Catálogo de Widgets de Alta Performance

### A. Metric Cards de Servidor com Sparklines SVG Dinâmicas
Para maximizar a velocidade de carregamento e eliminar gargalos de renderização no browser (hydration lags), as miniaturas de tendências temporais (**Sparklines**) são geradas programaticamente no servidor em formato SVG leve e limpo, sem carregar bibliotecas gráficas pesadas de terceiros.

*   **Estrutura de Código do Widget**: O componente recebe um array de números representando a série temporal de histórico (`[35, 42, 38, 55, 60, 48, 58]`) e calcula os pontos cartesianos em um container fixo `<svg viewBox="0 0 100 30">`.
*   **Mapeamento de Cores de Acordo com Design System**:
    *   Tendência de Alta/Estável: Linha em HSL Energetic Orange `hsl(16 88% 54%)` com preenchimento gradiente suave.
    *   Alerta de Declínio Crítico: Linha em Vermelho Alerta HSL `hsl(0 84% 60%)`.

### B. KPIs Operacionais Críticos (Metas e Fórmulas)

| Nome da Métrica | Fórmula de Cálculo | Meta Corporativa | Comportamento no Dashboard |
| :--- | :--- | :--- | :--- |
| **Conformidade de SLA** | $\frac{\text{Processos Concluídos no Prazo}}{\text{Total de Processos Finalizados}} \times 100$ | $\ge 98.5\%$ | Gauge Circular Dinâmico em HSL com alertas de cores nos patamares $< 95\%$ (Vermelho) e $< 98\%$ (Laranja). |
| **Tempo de Ciclo (Cycle Time)** | $\text{Data/Hora de Conclusão} - \text{Data/Hora de Abertura}$ | Varia por Tipo de SLA | Gráfico de Área Recharts mostrando a evolução semanal em dias/horas com linha média móvel. |
| **Custo de Faturamento AS IS** | $\text{Horas Manuais Gastas} \times \text{Custo da Hora do Recurso}$ | Redução de $75\%$ (TO BE) | Gráfico de Barra Comparativo acumulando o desperdício financeiro em dólares e reais devido ao fluxo manual. |
| **Taxa de Erro (KYC/Onboarding)** | $\frac{\text{Processos Rejeitados / Reprocessados}}{\text{Volume Total de Entrada}} \times 100$ | $< 2.0\%$ | Sparkline SVG dinâmico destacando picos associados a falhas em sistemas parceiros de dados. |

---

## 4. Gráficos Interativos Dinâmicos (Camada de Cliente)
Para as interações interativas avançadas, a plataforma adota componentes otimizados da biblioteca **Recharts**, encapsulados sob isolamento estrito com `"use client"`.

### A. Gráfico de Faturamento Comparativo SAP (AS IS vs TO BE)
Demonstração visual do impacto financeiro decorrente da transição de processos, projetando o ROI (*Return on Investment*) da governança corporativa da HIT:
*   **Eixo X**: Meses do ano fiscal corrente.
*   **Eixo Y (Esquerdo)**: Volume de transações integradas faturadas (Milhares de Reais).
*   **Eixo Y (Direito)**: Tempo de processamento médio (Minutos).
*   **Componente Visual**: Gráfico de Linha Múltipla com gradientes HSL de preenchimento (`hsl(16 88% 54%)` e `hsl(30 56% 7%)`).

### B. Matriz de Distribuição e Funil de Gargalos
Mapeamento gráfico das tarefas de processos que passam mais tempo aguardando ação de um tomador de decisão (User Tasks) ou tempo de fila (Queue Time):
*   **Funil Dinâmico**: Ilustra a perda de velocidade de execução em cada fase do funil de Onboarding, identificando a fase exata de validação cadastral manual no OneDrive como ponto de estrangulamento crítico.

---

## 5. Tabela de Logs e Realtime Alerts
Para auditoria imediata de problemas operacionais, o dashboard integra um painel de monitoramento contínuo:
*   **Filtros Dinâmicos**: Permite filtrar incidentes por nível de severidade (Crítico, Alto, Médio, Baixo), setor de impacto (Faturamento, CS, Jurídico) ou dono do processo.
*   **Integração Realtime via Supabase**: O componente de logs subscreve-se ao canal de eventos `public:AuditLogs` via Supabase Realtime client, inserindo novas entradas no topo do grid com micro-animações de pulso HSL (Framer Motion) sem requerer recarregamento completo da tela.
*   **Cards de Ação Rápida**: Cada linha estourada de SLA permite ao Lead Ops clicar para disparar um e-mail automático com ata de incidente formatada ou acionar a IA para sugestão imediata de mitigação do gargalo.

---

## 6. Estrutura de Dados e Esquema de Banco de Dados (*Data Structure*)
Abaixo está o modelo de representação em JSON e o mapeamento relacional que alimenta os widgets do dashboard, servindo de especificação para as queries do Prisma:

```json
{
  "dashboard_summary": {
    "overall_sla_compliance": 98.7,
    "active_incidents_count": 3,
    "processed_volume_brl": 4500000.00,
    "manual_cost_waste_brl": 12450.00
  },
  "charts": {
    "faturamento_sap_trend": [
      { "month": "Jan", "transacoes": 320, "tempo_medio_minutos": 120 },
      { "month": "Fev", "transacoes": 380, "tempo_medio_minutos": 115 },
      { "month": "Mar", "transacoes": 410, "tempo_medio_minutos": 98 }
    ],
    "gargalo_funnel": [
      { "fase": "Triagem", "leads": 120, "tempo_medio_horas": 4 },
      { "fase": "Validação KYC", "leads": 85, "tempo_medio_horas": 48 },
      { "fase": "Faturamento SAP", "leads": 70, "tempo_medio_horas": 72 }
    ]
  }
}
```
As chamadas SQL consultam as seguintes tabelas relacionais em tempo real:
*   `Metric`: Registra leituras periódicas agregadas de faturamento e volumes operacionais por setor.
*   `Incident`: Logs detalhados de estouros de SLAs para popular o feed em realtime.
*   `ProcessVersion`: Controla o avanço das métricas dos fluxos marcados como AS IS vs TO BE para a computação de ROI financeiro.
