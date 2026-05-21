import { cn } from "@/lib/utils";
import { AlertOctagon, ArrowRight, Info, ShieldAlert, Sparkles } from "lucide-react";
import React, { useState } from "react";

interface Bottleneck {
  id: string;
  department: string;
  taskName: string;
  latencyHours: number;
  severity: "low" | "medium" | "high" | "critical";
  impact: string;
  mitigation: string;
}

const BOTTLENECKS_DATA: Bottleneck[] = [
  {
    id: "BTN-01",
    department: "Comercial",
    taskName: "Handoff e Envio de Planilhas",
    latencyHours: 48,
    severity: "high",
    impact: "Kickoffs de ativação atrasam em até 48h devido a mensagens de WhatsApp perdidas e planilhas no OneDrive.",
    mitigation: "Implementar o Wizard de Criação Guiada com disparo automático de e-mails e anexos via API.",
  },
  {
    id: "BTN-02",
    department: "Engenharia",
    taskName: "Validação Geográfica de Postes",
    latencyHours: 72,
    severity: "critical",
    impact: "Desenho e validação geográfica manual de viabilidade técnica no Google Earth gera filas acumuladas.",
    mitigation: "Integrar API Geográfica de Conectividade com consulta automatizada no cadastro de postes.",
  },
  {
    id: "BTN-03",
    department: "Logística",
    taskName: "Almoxarifado e Rastreio Física",
    latencyHours: 36,
    severity: "high",
    impact: "Falta de status de frete dos roteadores e switches corporativos cria atritos no agendamento com o cliente.",
    mitigation: "Conectar sistema de expedição com rastreador integrado dos Correios/Transportadora na API.",
  },
  {
    id: "BTN-04",
    department: "NOC Técnico",
    taskName: "Configuração CLI no Switch",
    latencyHours: 24,
    severity: "medium",
    impact: "Configuração de IPs e portas via terminal CLI manual gera risco de refugo humano e quebra operacional.",
    mitigation: "Configurar Service Task automática para geração automática da CLI via script template.",
  },
  {
    id: "BTN-05",
    department: "SAP Billing",
    taskName: "Faturamento e KYC Manual",
    latencyHours: 18,
    severity: "medium",
    impact: "Digitação duplicada de dados cadastrais no portal de billing causa atrasos no start da cobrança mensal.",
    mitigation: "Configuração de RPA/Integração Direta SAP via Webhook para auto-provisionamento.",
  },
  {
    id: "BTN-06",
    department: "CS / Hypercare",
    taskName: "Agendamento de Ativação",
    latencyHours: 15,
    severity: "low",
    impact: "E-mails trocados com contatos técnicos do cliente para confirmar visitas provocam perda de viagens físicas.",
    mitigation: "Notificações via WhatsApp integradas com confirmação ativa e calendário dinâmico.",
  },
];

export default function BottleneckHeatmap() {
  const [selectedBtn, setSelectedBtn] = useState<Bottleneck | null>(BOTTLENECKS_DATA[1]); // Engenharia default

  return (
    <div className="rounded-2xl border border-border bg-background p-6 space-y-6 select-none flex flex-col justify-between h-full">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 text-accent" />
            <h3 className="font-black text-sm uppercase tracking-wider text-primary">
              Mapa térmico de atritos e gargalos
            </h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Visualização de latências médias de handoff por departamento na jornada de conectividade.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Heatmap Grid (Left) */}
        <div className="lg:col-span-7 space-y-4">
          <span className="text-[10px] font-black uppercase text-[#7A7268] tracking-widest block">
            Impacto Operacional de Handoffs
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {BOTTLENECKS_DATA.map((btn) => {
              let bgStyle = "";
              let borderStyle = "";
              let indicatorColor = "";

              if (btn.severity === "low") {
                bgStyle = "bg-emerald-500/5 hover:bg-emerald-500/10";
                borderStyle = "border-emerald-500/20";
                indicatorColor = "bg-emerald-500";
              } else if (btn.severity === "medium") {
                bgStyle = "bg-amber-500/10 hover:bg-amber-500/15";
                borderStyle = "border-amber-500/30";
                indicatorColor = "bg-amber-500";
              } else if (btn.severity === "high") {
                bgStyle = "bg-accent/10 hover:bg-accent/15";
                borderStyle = "border-accent/30";
                indicatorColor = "bg-accent";
              } else if (btn.severity === "critical") {
                bgStyle = "bg-destructive/10 hover:bg-destructive/15";
                borderStyle = "border-destructive/30";
                indicatorColor = "bg-destructive";
              }

              const isSelected = selectedBtn?.id === btn.id;

              return (
                <div
                  key={btn.id}
                  onClick={() => setSelectedBtn(btn)}
                  className={cn(
                    "p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between h-28 relative overflow-hidden",
                    bgStyle,
                    borderStyle,
                    isSelected ? "ring-2 ring-accent scale-[1.02] shadow-sm" : "hover:scale-[1.01]"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-[9px] font-black uppercase text-muted-foreground">{btn.department}</span>
                    <span className="text-[10px] font-black text-primary font-mono">{btn.latencyHours}h</span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xs font-black text-primary line-clamp-1">{btn.taskName}</h4>
                    <div className="flex items-center gap-1.5">
                      <div className={cn("w-2 h-2 rounded-full", indicatorColor)} />
                      <span className="text-[9px] font-bold uppercase text-muted-foreground">
                        {btn.severity === "critical" ? "Crítico" : btn.severity === "high" ? "Alto" : btn.severity === "medium" ? "Médio" : "Baixo"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detalhes do Gargalo Selecionado (Right) */}
        <div className="lg:col-span-5 border border-border rounded-2xl bg-secondary/15 p-5 space-y-4 h-full flex flex-col justify-between">
          {selectedBtn ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-[10px] font-black uppercase bg-accent/10 text-accent px-2 py-0.5 rounded">
                  {selectedBtn.department}
                </span>
                <span className="text-[9px] font-bold text-muted-foreground font-mono">{selectedBtn.id}</span>
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-black text-primary">{selectedBtn.taskName}</h4>
                <p className="text-[10px] font-bold text-destructive">
                  Tempo acumulado em fila: {selectedBtn.latencyHours} horas
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <span className="font-bold text-primary block">Impacto na Jornada:</span>
                <p className="text-muted-foreground leading-relaxed text-[11px]">{selectedBtn.impact}</p>
              </div>

              <div className="p-3 bg-white dark:bg-background rounded-xl border border-border space-y-2">
                <span className="font-bold text-primary flex items-center gap-1.5 text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                  <span>Recomendação de Otimização (TO BE):</span>
                </span>
                <p className="text-muted-foreground leading-normal text-[11px]">{selectedBtn.mitigation}</p>
              </div>
            </div>
          ) : (
            <div className="h-48 flex items-center justify-center text-center text-xs text-muted-foreground">
              Selecione um gargalo técnico no mapa para visualizar a análise detalhada e plano de mitigação.
            </div>
          )}

          {selectedBtn && (
            <button className="w-full inline-flex items-center justify-center gap-1.5 bg-primary text-white hover:bg-primary/90 px-4 py-2.5 rounded-full font-semibold text-xs transition-colors cursor-pointer select-none mt-4">
              <span>Propor automação de fluxo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
