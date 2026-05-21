import { asIsFlow } from "@/lib/presentation-data";
import { AlertTriangle, ArrowRight, Clock, Flame } from "lucide-react";

const statusClass = {
  critical: "border-destructive/40 bg-destructive/10 text-destructive",
  warning: "border-accent/40 bg-accent/10 text-accent",
  stable: "border-emerald-500/40 bg-emerald-500/10 text-emerald-600",
  future: "border-accent/40 bg-accent/10 text-accent",
};

export default function ASISFlowPresentation() {
  return (
    <div className="rounded-2xl border border-border bg-background p-6 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-border pb-5">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-accent">AS IS Operational Flow</span>
          <h2 className="mt-2 text-2xl md:text-3xl font-black text-primary tracking-tight">
            Current implementation journey creates latency at every handoff
          </h2>
        </div>
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-destructive">
          <div className="text-[10px] uppercase font-black tracking-widest">Cycle time risk</div>
          <div className="text-2xl font-black">120h AS IS</div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        {asIsFlow.map((step, index) => (
          <div key={step.id} className="relative">
            <div className="h-full rounded-xl border border-border bg-secondary/15 p-5 space-y-5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  {step.department}
                </span>
                <span className={`rounded-full border px-2 py-0.5 text-[9px] font-black uppercase ${statusClass[step.status]}`}>
                  {step.status === "critical" ? "Critical" : "Warning"}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-black text-primary leading-tight">{step.title}</h3>
                <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">{step.detail}</p>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-4">
                <div className="flex items-center gap-2 text-destructive">
                  {step.status === "critical" ? <Flame className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                  <span className="text-[10px] font-black uppercase">Latency</span>
                </div>
                <div className="flex items-center gap-1 text-xl font-black text-primary">
                  <Clock className="h-4 w-4 text-accent" />
                  {step.metric}
                </div>
              </div>
            </div>
            {index < asIsFlow.length - 1 && (
              <ArrowRight className="hidden xl:block absolute -right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-accent z-10" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
