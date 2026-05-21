import React from "react";
import { AudioLines, Play, Upload, Calendar, Clock, ArrowRight } from "lucide-react";

export default function MeetingsPage() {
  return (
    <div className="space-y-8 select-none">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-black text-primary tracking-tight">Transcrição de Reuniões</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Upload de áudio, transcrição automatizada e extração de atas e planos de ação operacionais via inteligência artificial.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 bg-accent text-white hover:bg-accent-hover px-5 py-2.5 rounded-full font-semibold text-xs transition-colors cursor-pointer select-none">
          <Upload className="w-3.5 h-3.5" /> Upload de Gravação
        </button>
      </div>

      <div className="rounded-xl border border-border bg-background p-6 space-y-6 font-semibold">
        <div className="border-b border-border pb-4 flex items-center gap-2">
          <AudioLines className="w-5 h-5 text-accent animate-pulse" />
          <h3 className="font-black text-sm uppercase tracking-wider text-primary">Reuniões Recentes Transcritas</h3>
        </div>

        <div className="space-y-4">
          <div className="p-4 border border-border rounded-lg bg-secondary/30 hover:border-accent transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1 flex-1">
              <span className="font-bold text-sm text-primary hover:text-accent cursor-pointer transition-colors block">Reunião de Alinhamento SLA - Faturamento</span>
              <p className="text-xs text-muted-foreground leading-relaxed">Pauta: Atrasos críticos na conciliação SAP e planos para automação do fluxo financeiro.</p>
              <div className="flex flex-wrap items-center gap-4 text-[10px] text-muted-foreground pt-2">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-accent" /> Ontem, 16:30</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Duração: 45 min</span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 rounded-full text-[9px] font-black uppercase">Analisada por IA</span>
              </div>
            </div>
            <button className="inline-flex items-center gap-1 bg-secondary text-primary hover:bg-accent hover:text-white border border-border hover:border-accent px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer">
              Atas e Transcrição <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 border border-border rounded-lg bg-secondary/30 hover:border-accent transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1 flex-1">
              <span className="font-bold text-sm text-primary hover:text-accent cursor-pointer transition-colors block">Sync Quinzenal - Integração CS e TI</span>
              <p className="text-xs text-muted-foreground leading-relaxed">Pauta: Novo fluxo de Onboarding automatizado para clientes enterprise e SLAs de infraestrutura.</p>
              <div className="flex flex-wrap items-center gap-4 text-[10px] text-muted-foreground pt-2">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-accent" /> 18 de Maio, 10:00</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Duração: 1h 05m</span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 rounded-full text-[9px] font-black uppercase">Analisada por IA</span>
              </div>
            </div>
            <button className="inline-flex items-center gap-1 bg-secondary text-primary hover:bg-accent hover:text-white border border-border hover:border-accent px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer">
              Atas e Transcrição <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export const metadata = { title: "Transcrição de Reuniões - HIT Governance" };
