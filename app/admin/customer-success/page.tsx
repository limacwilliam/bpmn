import React from "react";
import { TrendingUp, Users, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";

export default function CustomerSuccessPage() {
  return (
    <div className="space-y-8 select-none">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-black text-primary tracking-tight">Sucesso do Cliente & SLAs</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Painel de visibilidade de conformidade de SLAs operacionais e saúde de contas dos clientes da HIT.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-semibold">
        <div className="rounded-xl border border-border bg-background p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">Health Score Médio</span>
            <span className="text-2xl font-black text-primary leading-none mt-1 block">94 / 100</span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-background p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">SLA Global Compliant</span>
            <span className="text-2xl font-black text-emerald-600 leading-none mt-1 block">98.2%</span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-background p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">Clientes Protegidos</span>
            <span className="text-2xl font-black text-primary leading-none mt-1 block">42 Contas Enterprise</span>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-background p-6 space-y-6 font-semibold">
        <div className="border-b border-border pb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-accent animate-pulse" />
          <h3 className="font-black text-sm uppercase tracking-wider text-primary">Saúde de Contas Enterprise</h3>
        </div>

        <div className="space-y-4">
          <div className="p-4 border border-border rounded-lg bg-secondary/35 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="font-bold text-sm text-primary block">Telecom Américas - Enterprise</span>
              <span className="text-[10px] text-muted-foreground block font-medium">Onboarding em progresso • Mapeamento TO BE v2</span>
            </div>
            <div className="flex items-center gap-6 text-xs">
              <span className="text-muted-foreground">SLA Onboarding: <strong className="text-emerald-600 font-bold">100% OK</strong></span>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 rounded-full font-black text-[9px] uppercase">Saudável</span>
            </div>
          </div>

          <div className="p-4 border border-border rounded-lg bg-secondary/35 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="font-bold text-sm text-primary block">Banco Global S.A. - Strategic</span>
              <span className="text-[10px] text-muted-foreground block font-medium">Faturamento integrado • SAP Conciliação Lenta</span>
            </div>
            <div className="flex items-center gap-6 text-xs">
              <span className="text-muted-foreground">SLA Faturamento: <strong className="text-destructive font-black">91.5% Violado</strong></span>
              <span className="px-3 py-1 bg-destructive/10 text-destructive rounded-full font-black text-[9px] uppercase">Risco de Churn</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export const metadata = { title: "Customer Success SLAs - HIT Governance" };
