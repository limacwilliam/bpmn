import { customerJourney } from "@/lib/presentation-data";
import { AlertTriangle, HeartPulse } from "lucide-react";

export default function CustomerJourneyMap() {
  return (
    <div className="rounded-2xl border border-border bg-background p-6 md:p-8 space-y-7">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-border pb-5">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-accent">Customer Impact Visualization</span>
          <h2 className="mt-2 text-2xl md:text-3xl font-black text-primary tracking-tight">
            Customer pain accumulates across invisible internal delays
          </h2>
        </div>
        <div className="rounded-xl border border-destructive/25 bg-destructive/10 px-4 py-3 text-destructive">
          <div className="text-[10px] uppercase font-black tracking-widest">Churn risk</div>
          <div className="text-2xl font-black">12.4%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {customerJourney.map((step, index) => (
          <div key={step.stage} className="rounded-xl border border-border bg-secondary/15 p-5 space-y-5">
            <div className="flex items-center justify-between">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white text-xs font-black">
                {index + 1}
              </span>
              <HeartPulse className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h3 className="text-base font-black text-primary">{step.stage}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{step.pain}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-black uppercase text-muted-foreground">
                <span>Experience score</span>
                <span>{step.score}/100</span>
              </div>
              <div className="h-2 rounded-full bg-border overflow-hidden">
                <div className="h-full rounded-full bg-accent" style={{ width: `${step.score}%` }} />
              </div>
            </div>
            <div className="flex items-start gap-2 rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-[11px] font-bold text-destructive">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              {step.risk}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
