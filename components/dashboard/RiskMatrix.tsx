import { cn } from "@/lib/utils";
import { AlertTriangle, ShieldCheck, User, Zap, DollarSign } from "lucide-react";
import React, { useState } from "react";

interface RiskItem {
  id: string;
  title: string;
  probability: "low" | "medium" | "high";
  impact: "low" | "medium" | "high";
  department: string;
  owner: string;
  description: string;
  mitigationPlan: string;
  financialImpact: string;
  status: "mitigated" | "monitoring" | "active";
}

const SAMPLE_RISKS: RiskItem[] = [
  {
    id: "RISK-01",
    title: "Vazamento de Dados Cadastrais no WhatsApp",
    probability: "high",
    impact: "medium",
    department: "Comercial / Vendas",
    owner: "Mariana Costa",
    description: "Uso de chats pessoais do WhatsApp para coleta de documentos KYC sem controle ou auditoria centralizada.",
    mitigationPlan: "Migrar fluxos de coleta para o portal seguro da HIT com links criptografados e expiração de dados.",
    financialImpact: "R$ 150.000 (Possíveis multas LGPD e penalidades)",
    status: "monitoring",
  },
  {
    id: "RISK-02",
    title: "Faturamento SAP Duplicado ou Ausente",
    probability: "high",
    impact: "high",
    department: "SAP Billing / Fin",
    owner: "William Lima",
    description: "Digitação manual dos campos de contrato no SAP Billing causando cobrança indevida ou atrasos maiores que 30 dias.",
    mitigationPlan: "Provisionamento integrado via Webhook SAP que valida e gera fatura automaticamente.",
    financialImpact: "R$ 480.000 (Atrito de recebíveis e atraso fiscal)",
    status: "active",
  },
  {
    id: "RISK-03",
    title: "Perda de Switches no Almoxarifado",
    probability: "medium",
    impact: "high",
    department: "Logística",
    owner: "Marcos Souza",
    description: "Desvio ou falta de registro de entrada/saída de roteadores de core no galpão, impossibilitando provisionamento.",
    mitigationPlan: "RFID integrado com painel HIT e auditoria de insumos quinzenal com contagem automatizada.",
    financialImpact: "R$ 95.000 (Custo de reposição de hardware premium)",
    status: "monitoring",
  },
  {
    id: "RISK-04",
    title: "Queda de Porta IP na Configuração de NOC",
    probability: "medium",
    impact: "medium",
    department: "NOC Técnico",
    owner: "Amanda Lima",
    description: "Comandos CLI inseridos manualmente no switch de borda geram conflitos de IP e derrubam portas de outros clientes.",
    mitigationPlan: "Substituir terminal por scripts auto-validados e controle de rollback via API de gerência.",
    financialImpact: "R$ 220.000 (SLA de uptime quebrado com penalidade contratual)",
    status: "mitigated",
  },
];

export default function RiskMatrix() {
  const [selectedRisk, setSelectedRisk] = useState<RiskItem | null>(SAMPLE_RISKS[1]); // SAP default

  // Retorna os riscos posicionados nas coordenadas da matriz
  const getRisksInCell = (prob: "low" | "medium" | "high", imp: "low" | "medium" | "high") => {
    return SAMPLE_RISKS.filter((r) => r.probability === prob && r.impact === imp);
  };

  return (
    <div className="rounded-2xl border border-border bg-background p-6 space-y-6 select-none flex flex-col justify-between h-full">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-accent" />
            <h3 className="font-black text-sm uppercase tracking-wider text-primary">
              Matriz de Governança de Riscos
            </h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Monitoramento de riscos regulatórios, operacionais e de segurança de dados na jornada.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Matrix 3x3 (Left) */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="grid grid-cols-4 gap-2.5 w-full max-w-sm">
            {/* Eixo Y: Probabilidade */}
            <div className="flex flex-col justify-between text-[10px] font-black text-[#7A7268] uppercase text-right pr-2 py-4">
              <span>Alta</span>
              <span>Média</span>
              <span>Baixa</span>
            </div>

            <div className="col-span-3 grid grid-cols-3 gap-2.5">
              {/* Linha Alta (Y) */}
              {/* Celula Alta x Baixo (X) - Amarelo Médio */}
              <Cell 
                risks={getRisksInCell("high", "low")} 
                severityColor="bg-amber-500/10 border-amber-500/25 text-amber-700" 
                selectedRisk={selectedRisk}
                onSelectRisk={setSelectedRisk}
              />
              {/* Celula Alta x Médio (X) - Laranja Crítico */}
              <Cell 
                risks={getRisksInCell("high", "medium")} 
                severityColor="bg-accent/20 border-accent/40 text-accent" 
                selectedRisk={selectedRisk}
                onSelectRisk={setSelectedRisk}
                isCritical
              />
              {/* Celula Alta x Alto (X) - Vermelho Catastrófico */}
              <Cell 
                risks={getRisksInCell("high", "high")} 
                severityColor="bg-destructive/30 border-destructive/50 text-destructive" 
                selectedRisk={selectedRisk}
                onSelectRisk={setSelectedRisk}
                isCritical
              />

              {/* Linha Média (Y) */}
              {/* Celula Média x Baixo - Verde Baixo */}
              <Cell 
                risks={getRisksInCell("medium", "low")} 
                severityColor="bg-emerald-500/5 border-emerald-500/20 text-emerald-700" 
                selectedRisk={selectedRisk}
                onSelectRisk={setSelectedRisk}
              />
              {/* Celula Média x Médio - Amarelo Médio */}
              <Cell 
                risks={getRisksInCell("medium", "medium")} 
                severityColor="bg-amber-500/15 border-amber-500/30 text-amber-700" 
                selectedRisk={selectedRisk}
                onSelectRisk={setSelectedRisk}
              />
              {/* Celula Média x Alto - Laranja Crítico */}
              <Cell 
                risks={getRisksInCell("medium", "high")} 
                severityColor="bg-accent/20 border-accent/40 text-accent" 
                selectedRisk={selectedRisk}
                onSelectRisk={setSelectedRisk}
              />

              {/* Linha Baixa (Y) */}
              {/* Celula Baixa x Baixo - Verde Baixo */}
              <Cell 
                risks={getRisksInCell("low", "low")} 
                severityColor="bg-emerald-500/5 border-emerald-500/20 text-emerald-700" 
                selectedRisk={selectedRisk}
                onSelectRisk={setSelectedRisk}
              />
              {/* Celula Baixa x Médio - Verde Baixo */}
              <Cell 
                risks={getRisksInCell("low", "medium")} 
                severityColor="bg-emerald-500/5 border-emerald-500/20 text-emerald-700" 
                selectedRisk={selectedRisk}
                onSelectRisk={setSelectedRisk}
              />
              {/* Celula Baixa x Alto - Amarelo Médio */}
              <Cell 
                risks={getRisksInCell("low", "high")} 
                severityColor="bg-amber-500/10 border-amber-500/25 text-amber-700" 
                selectedRisk={selectedRisk}
                onSelectRisk={setSelectedRisk}
              />
            </div>
          </div>

          {/* Eixo X: Impacto */}
          <div className="grid grid-cols-4 gap-2.5 w-full max-w-sm mt-3.5">
            <div />
            <div className="col-span-3 grid grid-cols-3 text-center text-[10px] font-black text-[#7A7268] uppercase tracking-widest">
              <span>Baixo</span>
              <span>Médio</span>
              <span>Alto</span>
            </div>
          </div>

          <span className="text-[9px] font-semibold text-muted-foreground block text-center mt-4 uppercase tracking-wider">
            Eixo X: Impacto Operacional / Eixo Y: Probabilidade de Ocorrência
          </span>
        </div>

        {/* Detalhes do Risco Selecionado (Right) */}
        <div className="lg:col-span-6 border border-border rounded-2xl bg-secondary/10 p-5 space-y-4 h-full flex flex-col justify-between">
          {selectedRisk ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-1.5">
                  <span className={cn(
                    "text-[9px] font-black uppercase px-2 py-0.5 rounded",
                    selectedRisk.status === "active" ? "text-destructive bg-destructive/10" : selectedRisk.status === "monitoring" ? "text-accent bg-accent/10" : "text-emerald-700 bg-emerald-50"
                  )}>
                    {selectedRisk.status === "active" ? "Ativo" : selectedRisk.status === "monitoring" ? "Monitorando" : "Mitigado"}
                  </span>
                  <span className="text-[10px] font-bold text-[#7A7268] font-mono">{selectedRisk.id}</span>
                </div>
                <div className="flex items-center gap-1 text-[9px] font-bold text-muted-foreground">
                  <User className="w-3 h-3" />
                  <span>Dono: {selectedRisk.owner}</span>
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-black text-primary group-hover:text-accent leading-tight">
                  {selectedRisk.title}
                </h4>
                <div className="flex items-center gap-1 text-[10px] font-semibold text-muted-foreground">
                  <span>Setor: {selectedRisk.department}</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                {selectedRisk.description}
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs pt-1">
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase text-[#7A7268] block">Impacto Financeiro</span>
                  <span className="font-bold text-destructive flex items-center gap-0.5">
                    <DollarSign className="w-3.5 h-3.5" />
                    {selectedRisk.financialImpact}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase text-[#7A7268] block">Estatísticas</span>
                  <span className="font-bold text-primary">
                    Prob: {selectedRisk.probability.toUpperCase()} | Imp: {selectedRisk.impact.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-background rounded-xl border border-border space-y-1 text-xs">
                <span className="font-bold text-[#1C1208] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Plano de Mitigação:</span>
                </span>
                <p className="text-muted-foreground leading-normal text-[11px]">
                  {selectedRisk.mitigationPlan}
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center text-xs text-muted-foreground">
              Selecione um risco operacional da matriz térmica para ver a estratégia de conformidade.
            </div>
          )}

          {selectedRisk && selectedRisk.status !== "mitigated" && (
            <button className="w-full inline-flex items-center justify-center gap-1.5 bg-accent text-white hover:bg-accent-hover px-4 py-2.5 rounded-full font-semibold text-xs transition-colors cursor-pointer select-none mt-4 shadow-sm shadow-accent/25">
              <Zap className="w-3.5 h-3.5" />
              <span>Executar Plano de Mitigação</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Célula interna auxiliar
interface CellProps {
  risks: RiskItem[];
  severityColor: string;
  selectedRisk: RiskItem | null;
  onSelectRisk: (risk: RiskItem) => void;
  isCritical?: boolean;
}

function Cell({ risks, severityColor, selectedRisk, onSelectRisk, isCritical = false }: CellProps) {
  return (
    <div className={cn(
      "h-16 rounded-xl border flex flex-wrap items-center justify-center gap-1 p-1 transition-all select-none relative",
      severityColor,
      isCritical && risks.length > 0 && "animate-pulse-slow"
    )}>
      {risks.length > 0 ? (
        risks.map((risk) => {
          const isSelected = selectedRisk?.id === risk.id;
          return (
            <button
              key={risk.id}
              onClick={() => onSelectRisk(risk)}
              title={risk.title}
              className={cn(
                "w-7 h-7 rounded-lg text-[9px] font-black flex items-center justify-center transition-all cursor-pointer font-mono select-none shadow-sm",
                isSelected
                  ? "bg-primary text-white scale-110 ring-2 ring-accent"
                  : "bg-background/90 text-primary border border-border/80 hover:bg-primary hover:text-white"
              )}
            >
              {risk.id.split("-")[1]}
            </button>
          );
        })
      ) : (
        <span className="text-[8px] font-bold text-muted-foreground opacity-30 select-none">-</span>
      )}
    </div>
  );
}
