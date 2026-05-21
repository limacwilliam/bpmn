import { executiveRecommendations } from "@/lib/dashboard-data";
import { ArrowUpRight, ShieldAlert } from "lucide-react";

export default function ExecutiveRecommendations() {
  return (
    <div className="rounded-2xl border border-[#E5E0DB]/20 bg-[#1C1208] text-white p-6 md:p-8 space-y-7">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-accent">Executive Recommendations</span>
          <h2 className="mt-2 text-2xl md:text-3xl font-black text-white tracking-tight">
            The leadership agenda for operational excellence
          </h2>
        </div>
        <ShieldAlert className="hidden md:block h-9 w-9 text-accent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {executiveRecommendations.map((recommendation) => (
          <div key={recommendation.id} className="rounded-xl border border-white/10 bg-white/[0.07] p-6 space-y-5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-accent">{recommendation.id}</span>
              <span className="rounded-full bg-accent text-white px-2.5 py-1 text-[9px] font-black uppercase">
                {recommendation.priority}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-black text-white leading-tight">{recommendation.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/68">{recommendation.impact}</p>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 pt-4 text-[10px] font-black uppercase text-white/60">
              <span>{recommendation.owner}</span>
              <span>{recommendation.due}</span>
            </div>
            <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white text-primary px-4 py-3 text-xs font-black hover:bg-accent hover:text-white transition-colors">
              Add to executive action plan
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
