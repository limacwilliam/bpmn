import { CheckCircle2, XCircle } from "lucide-react";

const before = [
  "Decisões locais sem trilha auditável",
  "SLA percebido apenas no fechamento do ciclo",
  "Handoffs por e-mail, WhatsApp e planilhas",
  "Customer Success reage depois do desgaste",
];

const after = [
  "Owners e SLAs definidos desde o kickoff",
  "Alertas preditivos de aging e risco de quebra",
  "Eventos integrados com histórico executivo",
  "CS atua antes do cliente escalar o problema",
];

export default function GovernanceComparison() {
  return (
    <div className="rounded-2xl border border-border bg-background p-6 md:p-8 space-y-6">
      <div className="border-b border-border pb-5">
        <span className="text-[10px] font-black uppercase tracking-widest text-accent">Governance Transformation</span>
        <h2 className="mt-2 text-2xl font-black text-primary tracking-tight">Before vs after: the operating model changes its control plane</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="rounded-xl border border-destructive/25 bg-destructive/5 p-6 space-y-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-destructive">Before: fragmented control</span>
          {before.map((item) => (
            <div key={item} className="flex items-start gap-3 text-sm font-semibold text-primary">
              <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
              {item}
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-6 space-y-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">After: governed execution</span>
          {after.map((item) => (
            <div key={item} className="flex items-start gap-3 text-sm font-semibold text-primary">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
