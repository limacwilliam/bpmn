"use client";

import React from "react";
import {
  X,
  User,
  Clock,
  Laptop,
  AlertTriangle,
  Flame,
  Sparkles,
  Database,
  ArrowRight
} from "lucide-react";
import { BPMNNode, BPMNNodeMetadata } from "./types";

interface BPMNInspectorProps {
  node: BPMNNode | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateNode: (node: BPMNNode) => void;
  workflowMode: "AS_IS" | "TO_BE";
}

export default function BPMNInspector({
  node,
  isOpen,
  onClose,
  onUpdateNode,
  workflowMode
}: BPMNInspectorProps) {
  if (!isOpen || !node) return null;

  const isAsIs = workflowMode === "AS_IS";

  // Controlar mudanças locais para atualizar o nó
  const handleChange = <K extends keyof BPMNNode>(field: K, value: BPMNNode[K]) => {
    onUpdateNode({
      ...node,
      [field]: value
    });
  };

  const handleMetadataChange = <K extends keyof BPMNNodeMetadata>(
    field: K,
    value: BPMNNodeMetadata[K]
  ) => {
    onUpdateNode({
      ...node,
      metadata: {
        ...node.metadata,
        [field]: value
      }
    });
  };

  return (
    <div className="absolute top-0 right-0 bottom-0 w-80 bg-background/98 border-l border-border shadow-2xl z-30 flex flex-col select-none backdrop-blur-md animate-[slide-in-right_0.2s_ease-out] text-left">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-accent" />
          <div>
            <h3 className="font-black text-xs uppercase tracking-wider text-primary">Inspector de Propriedades</h3>
            <p className="text-[9px] text-muted-foreground">Configuração de metadados do nó.</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-secondary text-muted-foreground hover:text-primary transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Formulário de Configurações */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 custom-scrollbar text-xs font-semibold text-primary">
        {/* ID Monospaced */}
        <div className="space-y-1">
          <label className="text-[9px] uppercase text-[#7A7268] tracking-wider block">ID do Elemento</label>
          <input
            type="text"
            readOnly
            value={node.id}
            className="w-full h-9 px-3 bg-secondary/50 border border-border rounded-lg text-muted-foreground font-mono text-[10px] focus:outline-none"
          />
        </div>

        {/* Nome do Nó */}
        <div className="space-y-1">
          <label className="text-[9px] uppercase text-[#7A7268] tracking-wider block">Nome do Nó</label>
          <input
            type="text"
            value={node.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full h-9 px-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent text-primary font-bold transition-colors"
          />
        </div>

        {/* Responsável (Owner) */}
        <div className="space-y-1">
          <label className="text-[9px] uppercase text-[#7A7268] tracking-wider block">Responsável (Owner)</label>
          <div className="relative">
            <User className="absolute left-3 top-2.5 w-3.5 h-3.5 text-muted-foreground" />
            <input
              type="text"
              value={node.metadata.owner}
              onChange={(e) => handleMetadataChange("owner", e.target.value)}
              className="w-full h-9 pl-9 pr-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent text-primary transition-colors font-bold"
            />
          </div>
        </div>

        {/* Tolerância de SLA */}
        <div className="space-y-1">
          <label className="text-[9px] uppercase text-[#7A7268] tracking-wider block">Tolerância SLA</label>
          <div className="relative">
            <Clock className="absolute left-3 top-2.5 w-3.5 h-3.5 text-muted-foreground" />
            <input
              type="text"
              value={node.metadata.sla}
              onChange={(e) => handleMetadataChange("sla", e.target.value)}
              className="w-full h-9 pl-9 pr-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent text-primary transition-colors font-bold"
            />
          </div>
        </div>

        {/* Descrição Operacional */}
        <div className="space-y-1">
          <label className="text-[9px] uppercase text-[#7A7268] tracking-wider block">Descrição do Nó</label>
          <textarea
            rows={3}
            value={node.metadata.description}
            onChange={(e) => handleMetadataChange("description", e.target.value)}
            className="w-full p-2.5 bg-background border border-border rounded-lg focus:outline-none focus:border-accent text-primary transition-colors font-medium leading-relaxed text-[11px] resize-none"
          />
        </div>

        {/* Sistemas Envolvidos */}
        <div className="space-y-1">
          <label className="text-[9px] uppercase text-[#7A7268] tracking-wider block">Sistemas Envolvidos</label>
          <div className="relative">
            <Laptop className="absolute left-3 top-2.5 w-3.5 h-3.5 text-muted-foreground" />
            <input
              type="text"
              value={node.metadata.systems.join(", ")}
              onChange={(e) =>
                handleMetadataChange(
                  "systems",
                  e.target.value.split(",").map((s) => s.trim())
                )
              }
              className="w-full h-9 pl-9 pr-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent text-primary transition-colors font-mono text-[10px]"
            />
          </div>
        </div>

        {/* Seção Dinâmica de Governança e Risco (AS IS) */}
        {isAsIs && node.metadata.bottlenecks && (
          <div className="p-3 bg-destructive/5 border border-destructive/15 rounded-xl space-y-2">
            <span className="text-[8px] font-black uppercase text-destructive tracking-widest flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-current" />
              Gargalo Físico Mapeado
            </span>
            <p className="text-[10px] text-muted-foreground leading-relaxed font-medium">
              {node.metadata.bottlenecks}
            </p>
            {node.metadata.risks && (
              <div className="pt-2 border-t border-destructive/10 text-[9px] text-destructive flex items-start gap-1">
                <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5" />
                <span>Risco: {node.metadata.risks}</span>
              </div>
            )}
          </div>
        )}

        {/* AI Insights & Automação Recomendada (TO BE) */}
        {!isAsIs && node.metadata.aiInsights && (
          <div className="p-3.5 bg-accent/5 border border-accent/20 rounded-xl space-y-2">
            <span className="text-[8px] font-black uppercase text-accent tracking-widest flex items-center gap-1.5 animate-pulse">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              Recomendação de IA
            </span>
            <p className="text-[10px] text-[#7A7268] leading-relaxed font-medium">
              {node.metadata.aiInsights}
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 bg-secondary/30 border-t border-border/80 text-[10px] text-muted-foreground leading-normal flex items-start gap-2">
        <ArrowRight className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
        <span>
          As alterações feitas neste inspetor atualizam a modelagem local no canvas, permitindo simulações ricas de melhoria operacional.
        </span>
      </div>

      <style jsx global>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
