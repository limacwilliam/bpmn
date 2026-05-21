import { roadmapPhases } from "@/lib/presentation-data";
import { CalendarDays } from "lucide-react";

export default function TransformationTimeline() {
  return (
    <div className="rounded-2xl border border-border bg-background p-6 md:p-8 space-y-7">
      <div className="border-b border-border pb-5">
        <span className="text-[10px] font-black uppercase tracking-widest text-accent">Strategic Timeline</span>
        <h2 className="mt-2 text-2xl font-black text-primary tracking-tight">
          Transformation sequenced by risk removal, control and scale
        </h2>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
        {roadmapPhases.map((phase, index) => (
          <div key={phase.phase} className="rounded-xl border border-border bg-secondary/15 p-5 space-y-4 relative overflow-hidden">
            <div className="absolute right-4 top-4 text-6xl font-black text-primary/[0.04]">{index + 1}</div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-accent">
                <CalendarDays className="h-4 w-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">{phase.horizon}</span>
              </div>
              <h3 className="mt-3 text-base font-black text-primary leading-tight">{phase.phase}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{phase.focus}</p>
            </div>
            <div className="relative z-10 space-y-2">
              {phase.milestones.map((milestone) => (
                <div key={milestone} className="rounded-lg border border-border bg-background px-3 py-2 text-[11px] font-bold text-primary">
                  {milestone}
                </div>
              ))}
            </div>
            <p className="relative z-10 border-t border-border pt-3 text-[11px] font-black uppercase text-accent">
              {phase.gain}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
