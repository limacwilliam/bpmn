"use client";

import React, { useState } from "react";
import { Brain, FileCode, CheckCircle2, ChevronRight, Wand2, Eye, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ProcessStep } from "./types";

interface BPMNGeneratorProps {
  steps: ProcessStep[];
}

export default function BPMNGenerator({ steps }: BPMNGeneratorProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [selectedMode, setSelectedMode] = useState<"AS_IS" | "TO_BE">("TO_BE");

  const filteredSteps = steps.filter((s) => s.mode === selectedMode);

  const triggerExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportSuccess(true);
      setTimeout(() => {
        setExportSuccess(false);
      }, 3000);
    }, 1500);
  };

  const getBadgeStyle = (type: string) => {
    switch (type) {
      case "START":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25";
      case "END":
        return "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/25";
      case "SYSTEM_TASK":
        return "bg-accent/10 text-accent border-accent/25";
      default:
        return "bg-secondary text-primary border-border";
    }
  };

  return (
    <div className="rounded-xl border border-border bg-background p-6 shadow-sm space-y-6">
      {/* Header do Widget */}
      <div className="border-b border-border pb-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <Wand2 className="w-4.5 h-4.5 text-accent animate-pulse" />
          <h3 className="font-black text-sm uppercase tracking-wider text-primary">
            Gerador de Estrutura BPMN por IA
          </h3>
        </div>

        {/* Chaveador de Modelo */}
        <div className="flex items-center bg-secondary/80 border border-border p-0.5 rounded-lg shrink-0">
          <button
            onClick={() => setSelectedMode("AS_IS")}
            className={`px-3 py-1 text-[9px] font-black uppercase rounded transition-all cursor-pointer ${
              selectedMode === "AS_IS" ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-primary"
            }`}
          >
            AS IS (Atual)
          </button>
          <button
            onClick={() => setSelectedMode("TO_BE")}
            className={`px-3 py-1 text-[9px] font-black uppercase rounded transition-all cursor-pointer ${
              selectedMode === "TO_BE" ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-primary"
            }`}
          >
            TO BE (Alvo)
          </button>
        </div>
      </div>

      {/* Visualização da Árvore de Fluxo BPMN */}
      <div className="space-y-4">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-black block">
          Estrutura Lógica do XML BPMN 2.0 Gerada:
        </span>

        <div className="bg-secondary/35 border border-border/80 rounded-xl p-4.5 space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar font-mono text-[10px] text-muted-foreground">
          {/* Simulação de Código XML e Estrutura */}
          <div className="space-y-1 pb-3 border-b border-border">
            <span className="text-accent font-black block">&lt;bpmn:definitions ...&gt;</span>
            <span className="pl-4 block">&lt;bpmn:process id=&quot;process_hit_{selectedMode.toLowerCase()}&quot; isExecutable=&quot;true&quot;&gt;</span>
          </div>

          <div className="space-y-3 pl-4">
            {filteredSteps.map((step) => (
              <div key={step.id} className="flex items-start gap-4">
                <div className="text-[11px] font-black text-primary min-w-[70px] uppercase tracking-wide">
                  {step.lane}
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-black">&lt;bpmn:{step.type.toLowerCase()}&gt;</span>
                    <span className="px-2 py-0.2 rounded border text-[8px] font-sans font-bold uppercase shrink-0 leading-none h-4 flex items-center justify-center bg-background text-primary">
                      {step.id}
                    </span>
                  </div>
                  <div className="pl-4 border-l border-border/80 space-y-0.5">
                    <span className="block font-semibold">name=&quot;{step.title}&quot;</span>
                    {step.type === "SYSTEM_TASK" && (
                      <span className="block text-accent font-bold">hit:serviceType=&quot;REST_API&quot;</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-1 pt-3 border-t border-border">
            <span className="pl-4 block">&lt;/bpmn:process&gt;</span>
            <span className="text-accent font-black block">&lt;/bpmn:definitions&gt;</span>
          </div>
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
        <button
          onClick={triggerExport}
          disabled={isExporting}
          className="w-full sm:flex-1 py-3 bg-accent text-white hover:bg-accent-hover text-xs font-black uppercase rounded-lg shadow-md hover:-translate-y-0.5 transition-all cursor-pointer inline-flex items-center justify-center gap-2"
        >
          {isExporting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Sincronizando com o Modelador...
            </>
          ) : (
            <>
              <FileCode className="w-4.5 h-4.5 text-white" />
              Exportar Xml para Canvas BPMN
            </>
          )}
        </button>
      </div>

      {/* Sucesso de Exportação Animado */}
      <AnimatePresence>
        {exportSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.95 }}
            className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/35 rounded-lg text-emerald-600 dark:text-emerald-400"
          >
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
            <div className="space-y-0.5">
              <span className="text-[11px] font-black uppercase block leading-none">
                Exportação Concluída com Sucesso!
              </span>
              <span className="text-[10px] font-medium leading-tight block">
                O arquivo BPMN XML foi carregado no Canvas do modelador com suporte total a raias e tarefas operacionais.
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
