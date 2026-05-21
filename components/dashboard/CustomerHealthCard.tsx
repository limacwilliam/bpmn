import { cn } from "@/lib/utils";
import { AlertTriangle, Award, CheckCircle2, ChevronRight, MessageSquare, ShieldAlert, Sparkles, UserCheck } from "lucide-react";
import React, { useState } from "react";

interface CustomerAccount {
  id: string;
  name: string;
  segment: "Enterprise B2B" | "Corporate" | "Mid-Market";
  onboardingStage: string;
  healthScore: number; // 0-100
  escalationCount: number;
  sentiment: "excellent" | "neutral" | "churn_risk";
  slaBreachImpact: string;
  criticalIssue: string;
  mitigationSuggestion: string;
}

const VIP_ACCOUNTS: CustomerAccount[] = [
  {
    id: "VIP-AMB",
    name: "Ambev SA Matriz",
    segment: "Enterprise B2B",
    onboardingStage: "Hypercare (Go-Live recente)",
    healthScore: 68,
    escalationCount: 2,
    sentiment: "churn_risk",
    slaBreachImpact: "Estouro de SLA de 112h/120h em NOC Técnico causa indisposição do cliente.",
    criticalIssue: "Instabilidade no provisionamento automático SAP Billing e risco de cobrança duplicada.",
    mitigationSuggestion: "Enviar Diretor William Lima para reunião executiva presencial de alinhamento com CSO e fechar cronograma de correção.",
  },
  {
    id: "VIP-BBD",
    name: "Bradesco Agências Centro",
    segment: "Enterprise B2B",
    onboardingStage: "Homologação Técnica",
    healthScore: 82,
    escalationCount: 1,
    sentiment: "neutral",
    slaBreachImpact: "Atraso na validação geográfica de postes pela Engenharia (72h na fila técnica).",
    criticalIssue: "Atraso no go-live global das agências satélites na Região Centro-Oeste.",
    mitigationSuggestion: "Disparar script automatizado via API de postes para aprovar as viabilidades pendentes.",
  },
  {
    id: "VIP-PET",
    name: "Petrobras Hub Nordeste",
    segment: "Enterprise B2B",
    onboardingStage: "Kickoff e Alinhamento",
    healthScore: 95,
    escalationCount: 0,
    sentiment: "excellent",
    slaBreachImpact: "Conformidade absoluta com 100% de SLAs de entrega respeitados nas primeiras rotas.",
    criticalIssue: "Nenhum atrito técnico mapeado. Processo de validação estável.",
    mitigationSuggestion: "Solicitar depoimento (Case de Sucesso B2B) para marketing e iniciar venda consultiva para expansão de rotas Sul.",
  },
  {
    id: "VIP-GPA",
    name: "Grupo Pão de Açúcar Matriz",
    segment: "Corporate",
    onboardingStage: "Operação Assistida",
    healthScore: 74,
    escalationCount: 1,
    sentiment: "neutral",
    slaBreachImpact: "Atraso de 36h no rastreio físico dos switches no almoxarifado Logística.",
    criticalIssue: "Técnicos de campo perderam visita agendada devido a erro de status de frete.",
    mitigationSuggestion: "Entrar em contato ativo com diretor regional, providenciar nova visita com frete expresso.",
  },
];

export default function CustomerHealthCard() {
  const [selectedAcc, setSelectedAcc] = useState<CustomerAccount | null>(VIP_ACCOUNTS[0]); // Ambev default

  return (
    <div className="rounded-2xl border border-border bg-background p-6 space-y-6 select-none flex flex-col justify-between h-full">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4 gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-accent" />
            <h3 className="font-black text-sm uppercase tracking-wider text-primary">
              Visibilidade de Contas VIP e CS Health
            </h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Monitore a experiência, atritos de SLA e riscos de churn de contas estratégicas.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Lista de Contas (Left) */}
        <div className="lg:col-span-7 space-y-3 max-h-[320px] overflow-y-auto pr-1">
          {VIP_ACCOUNTS.map((acc) => {
            let badgeColor = "";
            let progressColor = "bg-emerald-500";
            let fontColor = "text-emerald-700 bg-emerald-50";

            if (acc.sentiment === "churn_risk") {
              badgeColor = "text-destructive bg-destructive/10";
              progressColor = "bg-destructive";
              fontColor = "text-destructive bg-destructive/10";
            } else if (acc.sentiment === "neutral") {
              badgeColor = "text-accent bg-accent/10";
              progressColor = "bg-accent";
              fontColor = "text-accent bg-accent/10";
            } else {
              badgeColor = "text-emerald-600 bg-emerald-50";
            }

            const isSelected = selectedAcc?.id === acc.id;

            return (
              <div
                key={acc.id}
                onClick={() => setSelectedAcc(acc)}
                className={cn(
                  "p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between group",
                  isSelected 
                    ? "border-accent bg-accent/5 ring-1 ring-accent/20 shadow-sm" 
                    : "border-border bg-secondary/10 hover:border-accent/40"
                )}
              >
                <div className="space-y-1 flex-1 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-primary font-mono">{acc.id}</span>
                    <h4 className="text-xs font-black text-primary group-hover:text-accent transition-colors leading-tight">
                      {acc.name}
                    </h4>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[9px] text-muted-foreground font-semibold">
                    <span className="text-[#1D1208]">{acc.segment}</span>
                    <span>•</span>
                    <span>Fase: {acc.onboardingStage}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0">
                  {/* Health Score */}
                  <div className="text-right hidden sm:block">
                    <span className="text-[8px] font-black uppercase text-[#7A7268] block">Health Score</span>
                    <span className={cn("text-xs font-black", 
                      acc.healthScore > 80 ? "text-emerald-600" : acc.healthScore > 70 ? "text-accent" : "text-destructive"
                    )}>
                      {acc.healthScore}/100
                    </span>
                  </div>

                  <span className={cn("text-[9px] font-black uppercase px-2 py-0.5 rounded-full text-center min-w-[70px]", fontColor)}>
                    {acc.sentiment === "churn_risk" ? "Churn Risk" : acc.sentiment === "neutral" ? "Estável" : "Excelente"}
                  </span>
                  
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Detalhes de Retenção CS (Right) */}
        <div className="lg:col-span-5 border border-border rounded-2xl bg-secondary/15 p-5 space-y-4 h-full flex flex-col justify-between">
          {selectedAcc ? (
            <div className="space-y-3.5">
              <div className="flex items-center justify-between border-b border-border pb-2.5">
                <span className="text-[10px] font-black uppercase bg-[#1C1208]/10 text-primary px-2 py-0.5 rounded font-mono">
                  {selectedAcc.segment}
                </span>
                <div className="flex items-center gap-1 text-[9px] font-bold text-destructive">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>{selectedAcc.escalationCount} Chamados</span>
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-black text-primary leading-snug">{selectedAcc.name}</h4>
                <div className="flex items-center gap-1.5 text-[9px] font-bold text-[#7A7268] uppercase">
                  <span>Score Geral de Adoção:</span>
                  <span className={cn(
                    "font-mono font-black",
                    selectedAcc.healthScore > 80 ? "text-emerald-600" : selectedAcc.healthScore > 70 ? "text-accent" : "text-destructive"
                  )}>
                    {selectedAcc.healthScore}%
                  </span>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <span className="font-bold text-primary block">Impacto de SLA na Conta:</span>
                <p className="text-muted-foreground leading-normal text-[10.5px]">{selectedAcc.slaBreachImpact}</p>
              </div>

              {selectedAcc.sentiment === "churn_risk" && (
                <div className="p-3 bg-destructive/5 rounded-xl border border-destructive/20 text-xs space-y-1">
                  <span className="font-bold text-destructive flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Dor Crítica Mapeada:</span>
                  </span>
                  <p className="text-muted-foreground leading-normal text-[10.5px]">{selectedAcc.criticalIssue}</p>
                </div>
              )}

              <div className="p-3 bg-white dark:bg-background rounded-xl border border-border space-y-1.5 text-xs">
                <span className="font-bold text-primary flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                  <span>Ação Corretiva Recomendada (CS):</span>
                </span>
                <p className="text-muted-foreground leading-normal text-[10.5px]">
                  {selectedAcc.mitigationSuggestion}
                </p>
              </div>
            </div>
          ) : (
            <div className="h-48 flex items-center justify-center text-center text-xs text-muted-foreground">
              Selecione uma conta VIP no painel lateral para visualizar os indicadores de saúde de CS.
            </div>
          )}

          {selectedAcc && selectedAcc.sentiment === "churn_risk" && (
            <button className="w-full inline-flex items-center justify-center gap-1.5 bg-destructive text-white hover:bg-destructive/90 px-4 py-2.5 rounded-full font-semibold text-xs transition-colors cursor-pointer select-none mt-3">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Acionar Plano de Mitigação</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
