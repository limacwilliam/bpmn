"use client";

import React from "react";
import {
  Sparkles,
  Download,
  History,
  Activity,
  Plus,
  Play,
  User,
  Settings,
  HelpCircle,
  FileText,
  Workflow,
  Eye,
  EyeOff
} from "lucide-react";
import { BPMNNodeType } from "./types";
import { cn } from "@/lib/utils";

interface BPMNToolbarProps {
  workflowMode: "AS_IS" | "TO_BE" | "COMPARISON";
  onChangeWorkflowMode: (mode: "AS_IS" | "TO_BE" | "COMPARISON") => void;
  isAnalyticsMode: boolean;
  onToggleAnalyticsMode: () => void;
  onOpenHistory: () => void;
  onAddElement: (type: BPMNNodeType) => void;
  onExport: (format: "PNG" | "PDF" | "SVG") => void;
  activeVersion: string;
}

export default function BPMNToolbar({
  workflowMode,
  onChangeWorkflowMode,
  isAnalyticsMode,
  onToggleAnalyticsMode,
  onOpenHistory,
  onAddElement,
  onExport,
  activeVersion
}: BPMNToolbarProps) {
  return (
    <div className="rounded-2xl border border-border bg-background p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 select-none shadow-sm text-left">
      {/* 1. Seleção de Processo e Modos de Auditoria */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Dropdown/Info de Processo */}
        <div className="h-9 px-3.5 rounded-lg bg-secondary border border-border/80 flex items-center gap-2">
          <Workflow className="w-3.5 h-3.5 text-accent animate-pulse" />
          <span className="text-[10px] font-black uppercase text-primary tracking-wider">
            HIT Connectivity Implementation
          </span>
        </div>

        <span className="text-muted-foreground/35 font-bold hidden md:inline">|</span>

        {/* Versão Ativa & Histórico */}
        <button
          onClick={onOpenHistory}
          className="h-9 px-3 rounded-lg hover:bg-secondary text-primary text-[10px] font-black transition-colors flex items-center gap-1.5 cursor-pointer border border-transparent hover:border-border"
          title="Histórico de Versões"
        >
          <History className="w-3.5 h-3.5 text-muted-foreground" />
          Versão: <strong className="text-accent">{activeVersion}</strong>
        </button>

        <span className="text-muted-foreground/35 font-bold hidden md:inline">|</span>

        {/* Botão Analytics Overlay */}
        <button
          onClick={onToggleAnalyticsMode}
          className={cn(
            "h-9 px-3.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 border cursor-pointer",
            isAnalyticsMode
              ? "bg-accent/10 border-accent/30 text-accent"
              : "bg-background border-border hover:bg-secondary text-primary"
          )}
        >
          {isAnalyticsMode ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5 text-muted-foreground" />}
          Calor de Gargalos
        </button>
      </div>

      {/* 2. Modos Operacionais (AS IS / TO BE / COMPARISON) */}
      <div className="flex bg-secondary/80 p-1 rounded-xl border border-border/50 self-start lg:self-center">
        <button
          onClick={() => onChangeWorkflowMode("AS_IS")}
          className={cn(
            "h-8 px-4 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer",
            workflowMode === "AS_IS"
              ? "bg-background text-destructive border border-border/40 shadow-sm"
              : "text-muted-foreground hover:text-primary"
          )}
        >
          AS IS (Corrente)
        </button>
        <button
          onClick={() => onChangeWorkflowMode("TO_BE")}
          className={cn(
            "h-8 px-4 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer",
            workflowMode === "TO_BE"
              ? "bg-background text-emerald-600 border border-border/40 shadow-sm"
              : "text-muted-foreground hover:text-primary"
          )}
        >
          TO BE (IA & Auto)
        </button>
        <button
          onClick={() => onChangeWorkflowMode("COMPARISON")}
          className={cn(
            "h-8 px-4 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer",
            workflowMode === "COMPARISON"
              ? "bg-background text-accent border border-border/40 shadow-sm"
              : "text-muted-foreground hover:text-primary"
          )}
        >
          Comparar ROI
        </button>
      </div>

      {/* 3. Exportações e Ferramentas Adicionais */}
      {workflowMode !== "COMPARISON" && (
        <div className="flex items-center gap-2">
          {/* Caixa de Ferramentas de Inserção Rápida */}
          <div className="hidden xl:flex items-center border border-border rounded-lg bg-secondary/35 p-0.5">
            <button
              onClick={() => onAddElement("START")}
              className="p-2 hover:bg-background rounded text-emerald-600 transition-colors cursor-pointer"
              title="Adicionar Início"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
            </button>
            <button
              onClick={() => onAddElement("USER_TASK")}
              className="p-2 hover:bg-background rounded text-[#7A7268] transition-colors cursor-pointer"
              title="Adicionar Tarefa Manual"
            >
              <User className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onAddElement("SYSTEM_TASK")}
              className="p-2 hover:bg-background rounded text-accent transition-colors cursor-pointer"
              title="Adicionar Tarefa de Sistema / API"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onAddElement("DECISION_GATEWAY")}
              className="p-2 hover:bg-background rounded text-primary transition-colors cursor-pointer"
              title="Adicionar Gateway Decisão"
            >
              <Plus className="w-3.5 h-3.5 rotate-45 font-bold" />
            </button>
          </div>

          <span className="text-muted-foreground/35 font-bold hidden xl:inline">|</span>

          {/* Botões de Exportação */}
          <div className="flex items-center border border-border rounded-lg bg-background p-0.5">
            <button
              onClick={() => onExport("PNG")}
              className="h-8 px-2.5 rounded text-primary hover:bg-secondary text-[9px] font-black uppercase tracking-wider transition-colors cursor-pointer"
              title="Exportar Imagem PNG"
            >
              PNG
            </button>
            <button
              onClick={() => onExport("SVG")}
              className="h-8 px-2.5 rounded text-primary hover:bg-secondary text-[9px] font-black uppercase tracking-wider transition-colors cursor-pointer"
              title="Exportar Vetor SVG"
            >
              SVG
            </button>
            <button
              onClick={() => onExport("PDF")}
              className="h-8 px-2.5 rounded text-primary hover:bg-secondary text-[9px] font-black uppercase tracking-wider transition-colors cursor-pointer"
              title="Exportar Relatório PDF"
            >
              PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
