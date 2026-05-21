import { organizationalHealthSignals } from "@/lib/dashboard-data";
import { Network, Users } from "lucide-react";

export default function OperationalRiskMap() {
  return (
    <div className="rounded-2xl border border-border bg-background p-6 md:p-8 space-y-6">
      <div className="border-b border-border pb-5">
        <span className="text-[10px] font-black uppercase tracking-widest text-accent">Operational Risk Map</span>
        <h2 className="mt-2 text-2xl font-black text-primary tracking-tight">
          Capacity and ownership concentration expose execution risk
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {organizationalHealthSignals.map((signal) => {
          const overload = Math.max(signal.workload - signal.capacity, 0);
          return (
            <div key={signal.department} className="rounded-xl border border-border bg-secondary/15 p-5 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
                    <Users className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-primary">{signal.department}</h3>
                    <p className="text-[10px] font-bold uppercase text-muted-foreground">Ownership risk {signal.ownershipRisk}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-primary">{signal.workload}%</div>
                  <div className="text-[9px] font-black uppercase text-muted-foreground">workload</div>
                </div>
              </div>
              <div className="grid grid-cols-[1fr_auto] gap-4 items-center">
                <div className="space-y-2">
                  <div className="h-2 rounded-full bg-border overflow-hidden">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${signal.workload}%` }} />
                  </div>
                  <div className="h-2 rounded-full bg-border overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${signal.capacity}%` }} />
                  </div>
                </div>
                <Network className="h-5 w-5 text-accent" />
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {signal.dependency}
                {overload > 0 && <span className="font-black text-destructive"> Overload: {overload} pts.</span>}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
