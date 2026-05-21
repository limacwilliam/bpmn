import { cn } from "@/lib/utils";
import { AlertCircle, AlertTriangle, Bell, CheckCircle2, Clock, ShieldAlert, X } from "lucide-react";
import React, { useState } from "react";

interface OperationalAlert {
  id: string;
  severity: "critical" | "warning";
  title: string;
  description: string;
  timeAgo: string;
  owner: string;
  link: string;
}

const INITIAL_ALERTS: OperationalAlert[] = [
  {
    id: "ALT-001",
    severity: "critical",
    title: "Estouro de SLA iminente - Ambev Enterprise",
    description: "Faturamento SAP travado em conciliação manual por planilha no OneDrive há mais de 112 horas.",
    timeAgo: "Há 12 minutos",
    owner: "William Lima",
    link: "/admin/processes/VIP-AMB",
  },
  {
    id: "ALT-002",
    severity: "critical",
    title: "Atraso Crítico na Validação Geográfica de Postes",
    description: "Bradesco Centro-Oeste com 72h em fila técnica do Google Earth. Engenharia sem equipe alocada.",
    timeAgo: "Há 42 minutos",
    owner: "Carlos Ramos",
    link: "/admin/processes/VIP-BBD",
  },
  {
    id: "ALT-003",
    severity: "warning",
    title: "Alerta de KYC Cadastral Pendente",
    description: "GPA Matriz em operação assistida com certidão negativa bloqueada por KYC Comercial.",
    timeAgo: "Há 2 horas",
    owner: "Mariana Costa",
    link: "/admin/processes/VIP-GPA",
  },
];

export default function ExecutiveAlert() {
  const [alerts, setAlerts] = useState<OperationalAlert[]>(INITIAL_ALERTS);

  const removeAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="rounded-2xl border border-border bg-background p-6 space-y-6 select-none flex flex-col justify-between h-full">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-accent animate-swing" />
          <h3 className="font-black text-sm uppercase tracking-wider text-primary">
            Central de Incidentes & Alertas Críticos
          </h3>
        </div>
        <span className="text-[9px] font-black bg-destructive/10 text-destructive px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
          Feed Realtime
        </span>
      </div>

      {/* Lista de Alertas */}
      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
        {alerts.length > 0 ? (
          alerts.map((alert) => {
            let containerStyle = "";
            let iconComponent = <AlertCircle className="w-4.5 h-4.5" />;

            if (alert.severity === "critical") {
              containerStyle = "border-destructive/30 bg-destructive/5 text-destructive";
              iconComponent = <ShieldAlert className="w-4.5 h-4.5 text-destructive" />;
            } else {
              containerStyle = "border-amber-500/30 bg-amber-500/5 text-amber-600";
              iconComponent = <AlertTriangle className="w-4.5 h-4.5 text-amber-500" />;
            }

            return (
              <div 
                key={alert.id}
                className={cn(
                  "p-4 rounded-xl border flex items-start gap-3 relative transition-all hover:scale-[1.01] group",
                  containerStyle
                )}
              >
                {/* Ícone */}
                <div className="flex-shrink-0 mt-0.5">
                  {iconComponent}
                </div>

                {/* Conteúdo */}
                <div className="space-y-1 flex-1 pr-6 text-xs">
                  <span className="font-bold text-primary block leading-tight">
                    {alert.title}
                  </span>
                  <p className="text-muted-foreground leading-normal text-[11px]">
                    {alert.description}
                  </p>
                  
                  <div className="flex items-center gap-2 pt-1 text-[9px] font-bold text-[#7A7268] uppercase tracking-wider">
                    <span>{alert.timeAgo}</span>
                    <span>•</span>
                    <span>Dono: {alert.owner}</span>
                  </div>
                </div>

                {/* Botão de Fechar */}
                <button
                  onClick={() => removeAlert(alert.id)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-primary transition-colors cursor-pointer select-none"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })
        ) : (
          <div className="h-48 flex flex-col items-center justify-center text-center text-xs text-muted-foreground space-y-2 border border-dashed border-border rounded-xl">
            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            <span className="font-bold text-primary">Nenhum incidente crítico ativo</span>
            <span>A operação da HIT está correndo em conformidade com as regras BPMN.</span>
          </div>
        )}
      </div>
    </div>
  );
}
