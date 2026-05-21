import React from "react";
import { Network, Plus, Users, GitMerge } from "lucide-react";

export default function OrgStructurePage() {
  return (
    <div className="space-y-8 select-none">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-black text-primary tracking-tight">Estrutura Organizacional</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Mapeamento de organogramas, responsabilidades por setores e amarração de líderes corporativos aos fluxos BPMN.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 bg-accent text-white hover:bg-accent-hover px-5 py-2.5 rounded-full font-semibold text-xs transition-colors cursor-pointer select-none">
          <Plus className="w-3.5 h-3.5" /> Adicionar Setor
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 font-semibold">
        <div className="lg:col-span-2 rounded-xl border border-border bg-background p-6 space-y-6">
          <div className="border-b border-border pb-4 flex items-center gap-2">
            <Network className="w-5 h-5 text-accent animate-pulse" />
            <h3 className="font-black text-sm uppercase tracking-wider text-primary">Hierarquia de Departamentos</h3>
          </div>

          <div className="space-y-6">
            <div className="p-4 rounded-xl border border-border bg-secondary/35 text-center max-w-sm mx-auto">
              <span className="text-[10px] text-accent uppercase tracking-widest block font-black mb-1">Presidência / Board</span>
              <span className="font-black text-sm text-primary">Diretoria Executiva da HIT</span>
            </div>

            <div className="flex items-center justify-center w-full h-8 relative">
              <div className="w-0.5 h-full bg-border" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-border bg-background hover:border-accent transition-all text-center space-y-1">
                <span className="text-[9px] text-[#7A7268] uppercase tracking-widest block font-black">Operações e Infra</span>
                <span className="font-bold text-xs text-primary block">Diretoria de Ops</span>
                <span className="text-[10px] text-muted-foreground block font-medium mt-1">Líder: William Lima</span>
              </div>

              <div className="p-4 rounded-xl border border-border bg-background hover:border-accent transition-all text-center space-y-1">
                <span className="text-[9px] text-[#7A7268] uppercase tracking-widest block font-black">Sucesso e Vendas</span>
                <span className="font-bold text-xs text-primary block">Diretoria Comercial & CS</span>
                <span className="text-[10px] text-muted-foreground block font-medium mt-1">Líder: Mariana Souza</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-background p-6 space-y-6">
          <div className="border-b border-border pb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-accent" />
            <h3 className="font-black text-sm uppercase tracking-wider text-primary">Resumo das Equipes</h3>
          </div>

          <div className="space-y-4 text-xs font-semibold">
            <div className="p-4 rounded-lg bg-secondary/50 border border-border flex items-center justify-between">
              <span className="text-muted-foreground">Total de Colaboradores</span>
              <span className="text-xl font-black text-primary">342 Integrantes</span>
            </div>

            <div className="p-4 rounded-lg bg-secondary/50 border border-border flex items-center justify-between">
              <span className="text-muted-foreground">Departamentos Ativos</span>
              <span className="text-xl font-black text-primary">12 Setores</span>
            </div>

            <div className="p-4 rounded-lg bg-secondary/50 border border-border flex items-center justify-between">
              <span className="text-muted-foreground">Processos Vinculados</span>
              <span className="text-xl font-black text-accent">100% Cobertos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export const metadata = { title: "Estrutura Organizacional - HIT Governance" };
