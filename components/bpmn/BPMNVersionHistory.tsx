"use client";

import React from "react";
import { History, X, Check, Clock, User, ArrowRight } from "lucide-react";
import { VersionHistoryItem } from "./types";
import { versionHistory } from "./mockData";

interface BPMNVersionHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  selectedVersion: string;
  onSelectVersion: (version: string) => void;
}

export default function BPMNVersionHistory({
  isOpen,
  onClose,
  selectedVersion,
  onSelectVersion
}: BPMNVersionHistoryProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-0 left-0 bottom-0 w-80 bg-background/98 border-r border-border shadow-2xl z-30 flex flex-col select-none backdrop-blur-md animate-[slide-in_0.2s_ease-out]">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-accent" />
          <div>
            <h3 className="font-black text-xs uppercase tracking-wider text-primary">Histórico de Versões</h3>
            <p className="text-[10px] text-muted-foreground">Auditoria de evolução do fluxo.</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-secondary text-muted-foreground hover:text-primary transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Lista de Versões */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {versionHistory.map((item: VersionHistoryItem) => {
          const isCurrent = item.version === selectedVersion;
          const isDraft = item.status === "DRAFT";

          return (
            <div
              key={item.version}
              onClick={() => onSelectVersion(item.version)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left flex flex-col gap-2 ${
                isCurrent
                  ? "border-accent bg-accent/5 ring-1 ring-accent"
                  : "border-border bg-secondary/50 hover:bg-secondary hover:border-accent/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-primary flex items-center gap-1.5">
                  Versão {item.version}
                  {isCurrent && (
                    <span className="text-[8px] bg-accent text-white px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      Ativa
                    </span>
                  )}
                </span>
                <span
                  className={`text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded ${
                    isDraft
                      ? "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400"
                      : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400"
                  }`}
                >
                  {isDraft ? "Rascunho" : "Publicado"}
                </span>
              </div>

              {/* Detalhes de Log */}
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                {item.changeLog}
              </p>

              {/* Metadados do Autor */}
              <div className="flex items-center justify-between text-[9px] text-[#7A7268] pt-2 border-t border-border/40 mt-1 font-semibold">
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3 text-accent" />
                  {item.author}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  {item.date.split(" ")[0]}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Informativo */}
      <div className="p-4 bg-secondary/30 border-t border-border/80 text-[10px] text-muted-foreground leading-normal flex items-start gap-2">
        <ArrowRight className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
        <span>
          A governança do BPMN requer assinatura digital de diretores operacionais para alteração do status da versão publicada.
        </span>
      </div>

      <style jsx global>{`
        @keyframes slide-in {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
