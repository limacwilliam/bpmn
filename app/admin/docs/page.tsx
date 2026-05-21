import React from "react";
import { BookOpen, FolderOpen, Plus, FileText, Search } from "lucide-react";

export default function DocsPage() {
  return (
    <div className="space-y-8 select-none">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-black text-primary tracking-tight">Repositório de Documentação</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Centralizador de Procedimentos Operacionais Padrão (POPs), diagramas de fluxos, regimentos e manuais.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 bg-accent text-white hover:bg-accent-hover px-5 py-2.5 rounded-full font-semibold text-xs transition-colors cursor-pointer select-none">
          <Plus className="w-3.5 h-3.5" /> Adicionar Documento
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-semibold">
        <div className="rounded-xl border border-border bg-background p-6 space-y-6">
          <div className="border-b border-border pb-4 flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-accent animate-pulse" />
            <h3 className="font-black text-sm uppercase tracking-wider text-primary">Pastas de Documentos</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
            <div className="p-4 rounded-xl border border-border bg-secondary/35 hover:border-accent transition-all cursor-pointer space-y-1">
              <span className="text-primary font-bold text-sm block">Procedimentos de SLAs</span>
              <span className="text-[10px] text-muted-foreground font-medium block">14 Arquivos Mapeados</span>
            </div>

            <div className="p-4 rounded-xl border border-border bg-secondary/35 hover:border-accent transition-all cursor-pointer space-y-1">
              <span className="text-primary font-bold text-sm block">BPMN XML Schemas</span>
              <span className="text-[10px] text-muted-foreground font-medium block">32 Modelos Armazenados</span>
            </div>

            <div className="p-4 rounded-xl border border-border bg-secondary/35 hover:border-accent transition-all cursor-pointer space-y-1">
              <span className="text-primary font-bold text-sm block">Atas e Transcrições</span>
              <span className="text-[10px] text-muted-foreground font-medium block">8 Relatórios em PDF</span>
            </div>

            <div className="p-4 rounded-xl border border-border bg-secondary/35 hover:border-accent transition-all cursor-pointer space-y-1">
              <span className="text-primary font-bold text-sm block">Manuais e Treinamento</span>
              <span className="text-[10px] text-muted-foreground font-medium block">5 Manuais Práticos</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-background p-6 space-y-6">
          <div className="border-b border-border pb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-accent" />
            <h3 className="font-black text-sm uppercase tracking-wider text-primary">Arquivos Recentes Modificados</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-4 border border-border rounded-lg bg-background hover:border-accent transition-all flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-accent" />
                <div className="space-y-0.5">
                  <span className="font-bold text-primary block">SOP_Conciliacao_Financeira_v2.pdf</span>
                  <span className="text-[10px] text-muted-foreground font-medium">Modificado por William Lima • Ontem, 16:45</span>
                </div>
              </div>
            </div>

            <div className="p-4 border border-border rounded-lg bg-background hover:border-accent transition-all flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-accent" />
                <div className="space-y-0.5">
                  <span className="font-bold text-primary block">Manual_BPMN20_HIT_Normas.pdf</span>
                  <span className="text-[10px] text-muted-foreground font-medium">Modificado por Diretoria Ops • 15 de Maio</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export const metadata = { title: "Documentação - HIT Governance" };
