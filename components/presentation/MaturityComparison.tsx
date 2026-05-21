import { processMaturityScores } from "@/lib/dashboard-data";
import { ArrowRight, Compass } from "lucide-react";

const labels = ["Chaotic", "Reactive", "Structured", "Managed", "Scalable"];

export default function MaturityComparison() {
  return (
    <div className="rounded-2xl border border-border bg-background p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between gap-5 border-b border-border pb-5">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-accent">Maturity Scoring</span>
          <h2 className="mt-2 text-2xl font-black text-primary tracking-tight">From reactive departments to scalable governance</h2>
        </div>
        <Compass className="hidden md:block h-9 w-9 text-accent" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_auto_1fr] gap-6 items-stretch">
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6">
          <span className="text-[10px] font-black uppercase tracking-widest text-destructive">Current state</span>
          <div className="mt-5 space-y-3">
            {processMaturityScores.map((score) => (
              <div key={score.department} className="flex items-center justify-between gap-4">
                <span className="text-xs font-black text-primary">{score.department}</span>
                <span className="rounded-full bg-background border border-border px-2.5 py-1 text-[10px] font-black text-primary">
                  L{score.level} {labels[score.level - 1]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden xl:flex items-center justify-center">
          <ArrowRight className="h-8 w-8 text-accent" />
        </div>

        <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-6">
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Target state</span>
          <div className="mt-5 space-y-3">
            {processMaturityScores.map((score) => (
              <div key={score.department} className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-black text-primary">{score.department}</span>
                  <span className="rounded-full bg-emerald-600 px-2.5 py-1 text-[10px] font-black text-white">
                    L5 Scalable
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-border overflow-hidden">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${Math.min(score.score + 18, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
