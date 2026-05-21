"use client";

import { cn } from "@/lib/utils";
import { Brain, Calendar, CheckCircle2, History, MessageSquare, UserCheck } from "lucide-react";
import React from "react";

export interface TimelineItem {
  id: string;
  action: string;
  author: string;
  role: string;
  date: string;
  details: string;
  type: "HUMAN" | "AI" | "SYSTEM";
}

interface ProcessTimelineProps {
  items?: TimelineItem[];
  className?: string;
}

export default function ProcessTimeline({
  items = [],
  className,
}: ProcessTimelineProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-background p-6 space-y-6 select-none shadow-sm",
        className
      )}
    >
      {/* 1. Header do Histórico */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-accent" />
          <h4 className="font-black text-sm uppercase tracking-wider text-primary">Histórico de Alterações & Auditoria</h4>
        </div>
        <span className="text-[9px] font-black bg-secondary border border-border px-2 py-0.5 rounded-full text-muted-foreground select-none">
          {items.length} Eventos Mapeados
        </span>
      </div>

      {/* 2. Lista Conectada Verticamente */}
      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border select-none">
        
        {items.map((item) => {
          const isAI = item.type === "AI";
          const isHuman = item.type === "HUMAN";

          return (
            <div key={item.id} className="relative space-y-2 group transition-all duration-300">
              
              {/* Círculo do Conector com ícones específicos */}
              <div
                className={cn(
                  "absolute -left-[22px] top-0.5 w-5 h-5 rounded-full border bg-background flex items-center justify-center transition-all duration-200 group-hover:scale-110",
                  isAI
                    ? "border-accent text-accent shadow-sm shadow-accent/20 animate-pulse"
                    : isHuman
                    ? "border-primary text-primary"
                    : "border-muted text-muted-foreground"
                )}
              >
                {isAI ? (
                  <Brain className="w-2.5 h-2.5 animate-pulse" />
                ) : isHuman ? (
                  <UserCheck className="w-2.5 h-2.5" />
                ) : (
                  <CheckCircle2 className="w-2.5 h-2.5" />
                )}
              </div>

              {/* Box de Informações */}
              <div className="rounded-lg border border-border bg-secondary/20 p-4 space-y-2 hover:border-accent/20 hover:bg-secondary/40 transition-colors">
                
                {/* Meta de Cabeçalho */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 select-none">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-primary leading-none">
                      {item.action}
                    </span>
                    <span
                      className={cn(
                        "px-2 py-0.5 text-[8px] font-black uppercase rounded-full border select-none",
                        isAI
                          ? "bg-accent/15 text-accent border-accent/30 animate-pulse"
                          : "bg-secondary text-primary border-border"
                      )}
                    >
                      {isAI ? "HIT IA" : "Governança"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[9px] text-[#7A7268] font-bold">
                    <Calendar className="w-3 h-3 text-accent" />
                    <span>{item.date}</span>
                  </div>
                </div>

                {/* Descrição Detalhada */}
                <p className="text-xs text-muted-foreground font-semibold leading-relaxed">
                  {item.details}
                </p>

                {/* Autor / Dono da ação */}
                <div className="flex items-center gap-1.5 text-[9px] font-black uppercase text-[#7A7268] tracking-wider select-none border-t border-border/50 pt-2 mt-1">
                  <MessageSquare className="w-3 h-3 text-accent" />
                  <span>Por: {item.author}</span>
                  <span className="text-muted-foreground/60">•</span>
                  <span>Setor: {item.role}</span>
                </div>

              </div>

            </div>
          );
        })}

        {items.length === 0 && (
          <div className="text-center py-6 text-xs text-muted-foreground select-none">
            Nenhuma modificação registrada neste fluxo operacional.
          </div>
        )}

      </div>
    </div>
  );
}
