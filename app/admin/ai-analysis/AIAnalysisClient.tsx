"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, Sparkles, AlertCircle, FileText, Bot, Send, Trash2, ArrowUpRight } from "lucide-react";
import { AITranscript, AIAnalysisReport, ChatMessage } from "@/components/ai/types";
import { sampleAnalysisReport, sampleTranscript, initialChatMessages } from "@/components/ai/mockData";

// Importar os 10 componentes especializados
import TranscriptUploader from "@/components/ai/TranscriptUploader";
import AIAnalysisPanel from "@/components/ai/AIAnalysisPanel";
import OperationalHealthScore from "@/components/ai/OperationalHealthScore";
import ExecutiveSummaryCard from "@/components/ai/ExecutiveSummaryCard";
import BottleneckAnalysis from "@/components/ai/BottleneckAnalysis";
import RiskMatrix from "@/components/ai/RiskMatrix";
import ProcessDiscovery from "@/components/ai/ProcessDiscovery";
import AIRecommendations from "@/components/ai/AIRecommendations";
import BPMNGenerator from "@/components/ai/BPMNGenerator";
import AIInsightsWidget from "@/components/ai/AIInsightsWidget";

export default function AIAnalysisClient() {
  const [activeTranscript, setActiveTranscript] = useState<AITranscript | null>(null);
  const [activeReport, setActiveReport] = useState<AIAnalysisReport | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressVal, setProgressVal] = useState(0);

  // Manipular início de upload
  const handleUploadStart = () => {
    setIsProcessing(true);
    setProgressVal(0);
    setActiveReport(null);
  };

  // Manipular progresso
  const handleUploadProgress = (val: number) => {
    setProgressVal(val);
  };

  // Manipular conclusão de upload
  const handleUploadComplete = (transcript: AITranscript) => {
    setActiveTranscript(transcript);
    setIsProcessing(false);
    
    // Auto popular o relatório correspondente (aqui usamos a ata real e dados estruturados da HIT)
    setActiveReport(sampleAnalysisReport);

    // Adicionar mensagem especial de sucesso no chat
    const alertMsg: ChatMessage = {
      id: `ai-msg-success-${Date.now()}`,
      sender: "ai",
      text: `Carregamento de "${transcript.meetingTitle}" concluído! Identifiquei um Score de Saúde Operacional de 34/100 (Maturidade Nível 1 - Caótico). 

Foram identificados 5 gargalos em handoffs manuais críticos, além de riscos elevados de estouros de SLA nas equipes de NOC, Engenharia, Logística e CS. Já extraí os diagramas AS IS e TO BE correspondentes, prontos para exportação BPMN. Como você gostaria de atuar agora?`,
      timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    };

    setChatMessages((prev) => [...prev, alertMsg]);
  };

  // Selecionar documento do histórico
  const handleSelectHistorical = (transcript: AITranscript) => {
    setActiveTranscript(transcript);
    setActiveReport(sampleAnalysisReport);

    const alertMsg: ChatMessage = {
      id: `ai-msg-hist-${Date.now()}`,
      sender: "ai",
      text: `Carreguei o arquivo histórico "${transcript.meetingTitle}". O Score de Saúde Operacional consolidado é 34/100. Todos os diagnósticos de maturidade, riscos e gargalos já estão ativos na tela de controle.`,
      timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    };

    setChatMessages((prev) => [...prev, alertMsg]);
  };

  // Enviar mensagem no chat
  const handleSendMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: `user-msg-${Date.now()}`,
      sender: "user",
      text: text,
      timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    };

    setChatMessages((prev) => [...prev, userMsg]);

    // Resposta simulada da IA com base nas palavras chave
    setTimeout(() => {
      let aiResponseText = `Entendi a sua dúvida sobre "${text}". O copiloto inteligente de governança da HIT está mapeando as dependências. Para mitigar isso, recomendamos substituir processos manuais por Service Tasks automatizados e integrar webhooks nas transportadoras corporativas.`;

      if (text.toLowerCase().includes("gargalo") || text.toLowerCase().includes("atraso")) {
        aiResponseText = `Analisando a ata, os maiores gargalos estão concentrados na Engenharia (72h para emitir viabilidade via Google Earth manual) e no NOC (24h de configuração CLI linha a linha, com 35% de falhas humanas). 

Para corrigir isso, elaborei um plano de ação para Amanda Lima (NOC Lead) migrar para provisionamento automático SDN e integrar a Engenharia com o Geoportal Geo-AI. O fluxo conceitual TO BE já está mapeado.`;
      } else if (text.toLowerCase().includes("risco") || text.toLowerCase().includes("multa")) {
        aiResponseText = `A matriz de riscos identificou penalidades críticas de SLA (Multas por atraso estourando as 120h contratuais) e desgaste extremo no time de CS no período de pós-venda (Hypercare informal via WhatsApp). 

A mitigação ativa no modelador exige incluir Boundary Events com timers de 1h para escalação direta de incidentes.`;
      } else if (text.toLowerCase().includes("bpmn") || text.toLowerCase().includes("desenhe")) {
        aiResponseText = `A estrutura lógica XML de BPMN 2.0 foi gerada com sucesso pela IA! Ela inclui raias para Comercial, Engenharia, Logística, NOC e CS, com as novas tarefas de provisionamento automático API. Você pode clicar em "Exportar XML para Canvas BPMN" na seção do modelador ao lado.`;
      }

      const aiMsg: ChatMessage = {
        id: `ai-msg-${Date.now()}`,
        sender: "ai",
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      };

      setChatMessages((prev) => [...prev, aiMsg]);
    }, 800);
  };

  const handleClear = () => {
    setActiveTranscript(null);
    setActiveReport(null);
    setChatMessages(initialChatMessages);
  };

  return (
    <div className="space-y-8 select-none">
      {/* 1. Header do Módulo */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-black text-primary tracking-tight">
            Analista IA Operacional
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Co-piloto inteligente de governança corporativa, modelagem preditiva e automação de processos.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {activeTranscript && (
            <button
              onClick={handleClear}
              className="px-3.5 py-1.5 border border-border hover:border-destructive/30 text-muted-foreground hover:text-destructive bg-background text-[10px] font-black uppercase rounded-lg transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Limpar Análise
            </button>
          )}
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 border border-accent/30 text-accent font-black text-[10px] uppercase rounded-full animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            IA Conectada
          </span>
        </div>
      </div>

      {/* 2. Área Principal de Trabalho (Split Screen) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Painel da Esquerda (Chat, Uploader e Biblioteca de atas) - Colunas 1 a 5 */}
        <div className="xl:col-span-5 space-y-6">
          {/* Uploader / Carregamento */}
          <div className="rounded-xl border border-border bg-background p-6 shadow-sm space-y-4">
            <div className="border-b border-border pb-3 flex items-center gap-2">
              <BrainCircuit className="w-4.5 h-4.5 text-accent animate-pulse" />
              <h3 className="font-black text-sm uppercase tracking-wider text-primary">
                Upload de Transcrição
              </h3>
            </div>

            <TranscriptUploader
              onUploadStart={handleUploadStart}
              onUploadProgress={handleUploadProgress}
              onUploadComplete={handleUploadComplete}
              onSelectHistorical={handleSelectHistorical}
              currentTranscriptId={activeTranscript?.id}
            />
          </div>

          {/* Chat de IA Operacional */}
          <AIAnalysisPanel
            messages={chatMessages}
            onSendMessage={handleSendMessage}
            report={activeReport}
            onTriggerAction={(actionKey) => {
              if (actionKey === "focus-bpmn") {
                const section = document.getElementById("bpmn-section");
                section?.scrollIntoView({ behavior: "smooth" });
              }
            }}
          />
        </div>

        {/* Painel da Direita (Cockpit de Diagnóstico da IA) - Colunas 6 a 12 */}
        <div className="xl:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            {isProcessing ? (
              <motion.div
                key="processing-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="rounded-xl border border-border bg-background p-16 text-center space-y-4 shadow-sm"
              >
                <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/25 flex items-center justify-center mx-auto animate-spin">
                  <BrainCircuit className="w-8 h-8 text-accent" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-black text-lg text-primary uppercase tracking-wider">
                    Extraindo Modelos &amp; Riscos...
                  </h3>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
                    Nossos algoritmos generativos de NLP estão processando as falas corporativas para descobrir silos e desenhar fluxogramas.
                  </p>
                </div>
              </motion.div>
            ) : activeReport ? (
              <motion.div
                key="analysis-dashboard"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* 1. Sumário Executivo & Scorecard de Saúde */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <ExecutiveSummaryCard
                      meetingTitle={activeTranscript?.meetingTitle || "Mapeamento HIT"}
                      department={activeTranscript?.department || "Operações"}
                      uploadedAt={activeTranscript?.uploadedAt || "Tempo Real"}
                      summary={activeReport.summary}
                      verdict={activeReport.verdict}
                    />
                  </div>
                  <div>
                    <OperationalHealthScore
                      score={activeReport.healthScore}
                      maturityLevel={activeReport.maturityLevel}
                    />
                  </div>
                </div>

                {/* 2. Diagnóstico de Gargalos & KPIs Rápidos */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-8">
                    <BottleneckAnalysis bottlenecks={activeReport.bottlenecks} />
                  </div>
                  <div className="lg:col-span-4">
                    <AIInsightsWidget healthScore={activeReport.healthScore} />
                  </div>
                </div>

                {/* 3. Descoberta de Processos AS IS vs TO BE */}
                <ProcessDiscovery steps={activeReport.processSteps} />

                {/* 4. Matriz de Riscos Operacionais */}
                <RiskMatrix risks={activeReport.risks} />

                {/* 5. Planos de Ação e Donos dos Processos */}
                <AIRecommendations recommendations={activeReport.recommendations} />

                {/* 6. Gerador BPMN XML Conceitual */}
                <div id="bpmn-section">
                  <BPMNGenerator steps={activeReport.processSteps} />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="idle-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-xl border border-border bg-background p-16 text-center space-y-6 shadow-sm flex flex-col items-center justify-center min-h-[500px]"
              >
                <div className="w-16 h-16 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground shadow-sm">
                  <Bot className="w-8 h-8 text-muted-foreground" />
                </div>
                <div className="space-y-2.5 max-w-sm">
                  <h3 className="font-black text-sm uppercase tracking-wider text-primary">
                    Nenhum Diagnóstico Ativo
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Carregue uma ata de reunião operacional ou selecione um documento do repositório corporativo ao lado para processar o Cockpit de IA completo.
                  </p>
                </div>
                
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 border border-accent/30 text-accent font-black text-[10px] uppercase rounded-full animate-bounce">
                  Aguardando Ação do Diretor WL
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
