import { Flame, ShieldAlert } from "lucide-react";

const bottlenecks = [
  { area: "Engenharia", issue: "Viabilidade de postes", hours: 72, severity: "Critical", impact: "Go-live Bradesco" },
  { area: "SAP Billing", issue: "Conciliação OneDrive", hours: 72, severity: "Critical", impact: "MRR e churn Ambev" },
  { area: "Logística", issue: "Rastreio de switches", hours: 36, severity: "High", impact: "Visita perdida GPA" },
  { area: "NOC", issue: "CLI manual", hours: 24, severity: "Medium", impact: "Erro humano" },
  { area: "Comercial", issue: "Upload checklist", hours: 48, severity: "High", impact: "Kickoff atrasado" },
  { area: "CS", issue: "Escalação tardia", hours: 18, severity: "Medium", impact: "Hypercare reativo" },
];

export default function BottleneckHeatmap() {
  return (
    <div className="rounded-2xl border border-border bg-background p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between gap-6 border-b border-border pb-5">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-accent">Bottleneck Center</span>
          <h2 className="mt-2 text-2xl font-black text-primary tracking-tight">Where operational energy is trapped</h2>
        </div>
        <ShieldAlert className="hidden md:block h-9 w-9 text-accent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {bottlenecks.map((item) => {
          const critical = item.severity === "Critical";
          const high = item.severity === "High";
          return (
            <div
              key={`${item.area}-${item.issue}`}
              className={`rounded-xl border p-5 min-h-44 ${
                critical
                  ? "border-destructive/35 bg-destructive/10"
                  : high
                    ? "border-accent/35 bg-accent/10"
                    : "border-border bg-secondary/15"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    {item.area}
                  </span>
                  <h3 className="mt-2 text-sm font-black text-primary leading-tight">{item.issue}</h3>
                </div>
                <Flame className={`h-5 w-5 ${critical ? "text-destructive" : "text-accent"}`} />
              </div>
              <div className="mt-6 flex items-end justify-between gap-4">
                <div>
                  <div className="text-4xl font-black text-primary tracking-tight">{item.hours}h</div>
                  <div className="text-[10px] font-black uppercase text-muted-foreground">average latency</div>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[9px] font-black uppercase ${critical ? "bg-destructive text-white" : "bg-accent text-white"}`}>
                  {item.severity}
                </span>
              </div>
              <p className="mt-4 border-t border-border/70 pt-3 text-[11px] font-semibold text-muted-foreground">
                Impact: {item.impact}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
