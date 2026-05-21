import { toBeFlow } from "@/lib/presentation-data";
import { ArrowRight, CheckCircle2, Network, Zap } from "lucide-react";

export default function TOBEFlowPresentation() {
  return (
    <div className="rounded-2xl border border-[#E5E0DB]/20 bg-[#1C1208] text-white p-6 md:p-8 space-y-8 overflow-hidden relative">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(241,90,34,0.16),transparent_44%,rgba(255,255,255,0.06))]" />
      <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-accent">TO BE Future-State Model</span>
          <h2 className="mt-2 text-2xl md:text-3xl font-black text-white tracking-tight">
            Governed events replace manual operational handoffs
          </h2>
        </div>
        <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-emerald-300">
          <div className="text-[10px] uppercase font-black tracking-widest">Target cycle time</div>
          <div className="text-2xl font-black">24h TO BE</div>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 xl:grid-cols-5 gap-4">
        {toBeFlow.map((step, index) => (
          <div key={step.id} className="relative">
            <div className="h-full rounded-xl border border-white/10 bg-white/[0.07] p-5 space-y-5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/55">
                  {step.department}
                </span>
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-sm font-black text-white leading-tight">{step.title}</h3>
                <p className="mt-2 text-[11px] leading-relaxed text-white/65">{step.detail}</p>
              </div>
              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <div className="flex items-center gap-2 text-accent">
                  {index === 0 ? <Zap className="h-4 w-4" /> : <Network className="h-4 w-4" />}
                  <span className="text-[10px] font-black uppercase">Governed</span>
                </div>
                <div className="text-xl font-black text-white">{step.metric}</div>
              </div>
            </div>
            {index < toBeFlow.length - 1 && (
              <ArrowRight className="hidden xl:block absolute -right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-accent z-10" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
