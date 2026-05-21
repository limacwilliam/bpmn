"use client";

import React from "react";
import { Sparkles, CheckCircle2, ChevronRight, FileText, Scale } from "lucide-react";

interface ExecutiveSummaryCardProps {
  meetingTitle: string;
  department: string;
  uploadedAt: string;
  summary: string;
  verdict: string;
}

export default function ExecutiveSummaryCard({
  meetingTitle,
  department,
  uploadedAt,
  summary,
  verdict,
}: ExecutiveSummaryCardProps) {
  return (
    <div className="rounded-xl border border-border bg-background p-6 shadow-sm space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-border pb-4 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-accent/10 border border-accent/25 rounded-lg text-accent">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-sm uppercase tracking-wide text-primary leading-tight">
              {meetingTitle}
            </h3>
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-semibold mt-1">
              <span className="bg-secondary px-2 py-0.5 rounded border border-border text-[9px] uppercase">
                {department}
              </span>
              <span>•</span>
              <span>Carregado em {uploadedAt}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/35 text-emerald-600 dark:text-emerald-400 font-bold text-[9px] uppercase rounded-full">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Análise Concluída
        </div>
      </div>

      {/* Conteúdo do Sumário */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sumário IA */}
        <div className="space-y-3">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-black flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            Sumário de Atritos Operacionais
          </span>
          <p className="text-[11px] text-primary leading-relaxed font-semibold">
            {summary}
          </p>
        </div>

        {/* Veredito da IA */}
        <div className="space-y-3 bg-secondary/35 rounded-xl border border-border/80 p-4">
          <span className="text-[10px] uppercase tracking-wider text-accent font-black flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-accent" />
            Parecer de Governança e Veredito IA
          </span>
          <p className="text-[10.5px] text-muted-foreground leading-relaxed font-semibold">
            {verdict}
          </p>
        </div>
      </div>
    </div>
  );
}
