import {
  CheckCircle2,
  Database,
  Sliders,
  Sparkles,
  ToggleLeft,
  UserCheck,
} from "lucide-react";
import React from "react";

export default function SettingsPage() {
  return (
    <div className="space-y-8 select-none animate-page-in">
      {/* Cabeçalho */}
      <div className="space-y-1">
        <h1 className="text-3xl md:text-4xl font-black text-primary tracking-tight">
          Configurações (Settings)
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Definições de intervalos de pooling SAP, preferências de alertas de SLAs, modelo cognitivo de IA e chaves de segurança.
        </p>
      </div>

      {/* Grid de Configurações */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs font-semibold">
        
        {/* Bloco 1: Governança & IA */}
        <div className="rounded-xl border border-border p-6 bg-background space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent" />
              <h3 className="font-black text-sm uppercase tracking-wider text-primary">Preferências de Inteligência</h3>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-primary block font-bold text-sm">Modelo Cognitivo Ativo</span>
                <span className="text-muted-foreground text-[10px]">Utilizado na transcrição e análises de gargalos.</span>
              </div>
              <span className="px-3 py-1.5 rounded-lg border border-border bg-secondary font-black text-primary">GPT-4o Ops-Tuned</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-primary block font-bold text-sm">Auditoria Automática por IA</span>
                <span className="text-muted-foreground text-[10px]">Dispara varreduras preventivas em diagramas de fluxo novos.</span>
              </div>
              <span className="text-emerald-500 font-black flex items-center gap-1">Ativo</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-primary block font-bold text-sm">Geração de TODOs</span>
                <span className="text-muted-foreground text-[10px]">Cria tarefas automaticamente no estouro de SLAs.</span>
              </div>
              <span className="text-emerald-500 font-black flex items-center gap-1">Ativo</span>
            </div>
          </div>
        </div>

        {/* Bloco 2: Integrações & APIs */}
        <div className="rounded-xl border border-border p-6 bg-background space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-accent" />
              <h3 className="font-black text-sm uppercase tracking-wider text-primary">Integrações de Infraestrutura</h3>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-primary block font-bold text-sm">Intervalo de Pooling SAP</span>
                <span className="text-muted-foreground text-[10px]">Tempo de verificação de transações pendentes no OneDrive.</span>
              </div>
              <span className="px-3 py-1.5 rounded-lg border border-border bg-secondary font-black text-primary">A cada 5 minutos</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-primary block font-bold text-sm">Persistência Realtime Supabase</span>
                <span className="text-muted-foreground text-[10px]">Envia alertas imediatos ao painel superior via WebSocket.</span>
              </div>
              <span className="text-emerald-500 font-black flex items-center gap-1">Ativo</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-primary block font-bold text-sm">Chave Criptográfica SAP</span>
                <span className="text-muted-foreground text-[10px]">Assinatura digital corporativa homologada para faturamento.</span>
              </div>
              <span className="text-muted-foreground tracking-widest font-black">••••••••••••••••</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export const metadata = {
  title: "Configurações - HIT Governance",
  description: "Preferências de sistema e integrações operacionais da HIT.",
};
