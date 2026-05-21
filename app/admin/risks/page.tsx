import React from "react";
import { ShieldAlert, Plus, ShieldCheck, AlertTriangle } from "lucide-react";

export default function RisksPage() {
  return (
    <div className="space-y-8 select-none">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-black text-primary tracking-tight">Matriz de Riscos</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Identificação de falhas, riscos de conformidade corporativa e planos integrados de mitigação e contenção.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 bg-accent text-white hover:bg-accent-hover px-5 py-2.5 rounded-full font-semibold text-xs transition-colors cursor-pointer select-none">
          <Plus className="w-3.5 h-3.5" /> Cadastrar Risco
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 font-semibold">
        <div className="xl:col-span-2 rounded-xl border border-border bg-background p-6 space-y-6">
          <div className="border-b border-border pb-4 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-accent animate-pulse" />
            <h3 className="font-black text-sm uppercase tracking-wider text-primary">Matriz de Riscos Ativos</h3>
          </div>

          <div className="space-y-4">
            <div className="p-4 border border-border rounded-lg bg-secondary/35 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-primary">Vazamento de Credenciais de API</span>
                <span className="px-2.5 py-1 text-[9px] font-black uppercase bg-destructive text-white rounded-full">Crítico</span>
              </div>
              <p className="text-xs text-muted-foreground leading-normal">
                Uso inadequado de tokens estáticos em scripts locais pelos analistas operacionais.
              </p>
              <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-2">
                <span>Mitigação: Integração total com Supabase Auth e cofre de senhas.</span>
                <strong className="text-destructive font-black">Severidade: 9.2</strong>
              </div>
            </div>

            <div className="p-4 border border-border rounded-lg bg-secondary/35 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-primary">Inconsistência de Backup de Bancos</span>
                <span className="px-2.5 py-1 text-[9px] font-black uppercase bg-amber-500 text-white rounded-full">Alto</span>
              </div>
              <p className="text-xs text-muted-foreground leading-normal">
                Backups incrementais diários falhando por cota de armazenamento atingida.
              </p>
              <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-2">
                <span>Mitigação: Expansão de disco dinâmico na infraestrutura da nuvem.</span>
                <strong className="text-amber-600 font-black">Severidade: 7.5</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-background p-6 space-y-6">
          <div className="border-b border-border pb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="font-black text-sm uppercase tracking-wider text-primary">Estatísticas Gerais</h3>
          </div>

          <div className="space-y-4 text-xs font-semibold">
            <div className="p-4 rounded-lg bg-secondary/50 border border-border flex items-center justify-between">
              <span className="text-muted-foreground">Total de Riscos Ativos</span>
              <span className="text-xl font-black text-primary">8 Riscos</span>
            </div>

            <div className="p-4 rounded-lg bg-secondary/50 border border-border flex items-center justify-between">
              <span className="text-muted-foreground">Severidade Média Geral</span>
              <span className="text-xl font-black text-amber-500">5.4 (Médio)</span>
            </div>

            <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/50 flex items-center justify-between text-emerald-800 dark:text-emerald-300">
              <span>Ações de Mitigação Homologadas</span>
              <span className="text-xl font-black">82%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export const metadata = { title: "Matriz de Riscos - HIT Governance" };
