"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, BrainCircuit, Sparkles, Terminal, FileText, ChevronRight } from "lucide-react";
import { ChatMessage, AIAnalysisReport } from "./types";
import { quickPrompts, sampleAnalysisReport } from "./mockData";

interface AIAnalysisPanelProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  report?: AIAnalysisReport | null;
  onTriggerAction?: (actionKey: string) => void;
}

export default function AIAnalysisPanel({
  messages,
  onSendMessage,
  report,
  onTriggerAction,
}: AIAnalysisPanelProps) {
  const [inputText, setInputText] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText("");
  };

  const handleQuickPromptClick = (promptText: string) => {
    onSendMessage(promptText);
  };

  return (
    <div className="rounded-xl border border-border bg-background flex flex-col h-[560px] shadow-sm overflow-hidden">
      {/* Header do Chat */}
      <div className="p-4 border-b border-border bg-secondary/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white shadow-md">
            <BrainCircuit className="w-5.5 h-5.5" />
          </div>
          <div>
            <span className="font-bold text-sm text-primary block leading-none">Operational AI Agent</span>
            <span className="text-[10px] text-muted-foreground font-semibold mt-1 block">
              Especializado em Modelagem BPMN e Otimizações de SLAs
            </span>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-accent/15 border border-accent/20 text-accent font-black text-[9px] uppercase rounded-full">
          <Sparkles className="w-3 h-3" />
          Co-Piloto Ativo
        </span>
      </div>

      {/* Janela de Mensagens */}
      <div className="flex-1 p-5 overflow-y-auto space-y-5 custom-scrollbar text-xs font-semibold">
        {messages.map((msg) => {
          const isAI = msg.sender === "ai";
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-[85%] ${isAI ? "" : "ml-auto justify-end"}`}
            >
              {isAI && (
                <div className="w-8 h-8 rounded-full bg-accent flex-shrink-0 flex items-center justify-center text-white font-black text-[10px] shadow">
                  IA
                </div>
              )}
              <div
                className={`p-4 rounded-2xl border text-primary leading-relaxed space-y-3 ${
                  isAI
                    ? "rounded-tl-none bg-secondary/60 border-border"
                    : "rounded-tr-none bg-primary text-primary-foreground border-primary"
                }`}
              >
                {/* Texto da Mensagem */}
                <div className="whitespace-pre-line text-[11px] font-semibold">{msg.text}</div>

                {/* Exibição Especial se a mensagem da IA referenciar gargalos/riscos */}
                {isAI && report && msg.text.includes("mitigar") && (
                  <div className="mt-2 bg-background border border-border rounded-lg p-3 space-y-2 text-[11px] text-primary">
                    <span className="text-[9px] uppercase text-accent font-black tracking-wider flex items-center gap-1">
                      <Terminal className="w-3.5 h-3.5" />
                      Extraído dos Destaques de Viabilidade & NOC:
                    </span>
                    <ul className="list-disc pl-4 space-y-1 text-[10.5px]">
                      <li>
                        <strong>Engenharia / TI:</strong> Reduzir fila de 72h manual no Google Earth migrando para Geoportal Geo-AI.
                      </li>
                      <li>
                        <strong>NOC (Switch Port CLI):</strong> Desativar scripting CLI manual que gera 35% de falhas, provisionando via API de SDN.
                      </li>
                      <li>
                        <strong>CS & Suporte N1:</strong> Eliminar atendimentos em WhatsApp pessoal integrando topologia direto no Zendesk.
                      </li>
                    </ul>
                    {onTriggerAction && (
                      <button
                        onClick={() => onTriggerAction("focus-bpmn")}
                        className="mt-2 w-full px-2.5 py-1.5 bg-accent text-white hover:bg-accent-hover text-[10px] uppercase font-black rounded transition-all cursor-pointer flex items-center justify-center gap-1 shadow-sm"
                      >
                        Modelar Fluxo TO BE Proposto
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}
              </div>
              {!isAI && (
                <div className="w-8 h-8 rounded-full bg-secondary border border-border flex-shrink-0 flex items-center justify-center text-primary font-bold text-[10px] shadow">
                  WL
                </div>
              )}
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      {/* Prompts Rápidos (Quick Prompts) */}
      <div className="px-4 py-2 bg-secondary/30 border-t border-border flex items-center gap-2 overflow-x-auto custom-scrollbar whitespace-nowrap">
        <span className="text-[9px] font-black uppercase text-muted-foreground mr-1">Sugestões:</span>
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleQuickPromptClick(qp.prompt)}
            className="px-2.5 py-1 bg-background hover:bg-secondary border border-border rounded text-[10px] font-bold text-primary hover:border-accent/40 transition-all cursor-pointer flex-shrink-0"
          >
            {qp.title}
          </button>
        ))}
      </div>

      {/* Input de Envio */}
      <form onSubmit={handleSend} className="p-4 border-t border-border bg-background">
        <div className="relative flex items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Pergunte ao analista operacional sobre a ata ou melhorias..."
            className="w-full h-11 pl-4 pr-12 text-xs bg-secondary/40 border border-border rounded-lg placeholder-muted-foreground focus:outline-none focus:border-accent focus:bg-background transition-all font-semibold text-primary"
          />
          <button
            type="submit"
            className="absolute right-2 p-2 rounded-lg bg-accent text-white hover:bg-accent-hover transition-colors shadow shadow-accent/20 cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
