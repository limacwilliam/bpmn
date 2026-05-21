import { CheckCircle2, Sparkles } from "lucide-react";

const outcomes = [
  "Executive visibility before escalation",
  "Customer success aligned with operational reality",
  "Governance embedded into every handoff",
  "Scalable delivery model for enterprise growth",
];

export default function FinalVisionStatement() {
  return (
    <section className="min-h-[calc(100vh-7rem)] rounded-2xl border border-[#E5E0DB]/20 bg-[#1C1208] text-white overflow-hidden relative p-8 md:p-12 flex flex-col justify-center shadow-2xl shadow-[#1C1208]/20">
      <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(241,90,34,0.22),transparent_42%,rgba(255,255,255,0.08))]" />
      <div className="relative z-10 max-w-6xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-accent/15 border border-accent/25 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-accent mb-8">
          <Sparkles className="h-4 w-4" />
          Final executive summary
        </div>
        <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95] text-white">
          HIT can turn operational complexity into a governed advantage.
        </h2>
        <p className="mt-8 max-w-3xl text-base md:text-lg leading-relaxed text-white/72 font-medium">
          The transformation opportunity is not only faster implementation. It is a new operating system for leadership visibility, customer trust, governance maturity and scalable execution.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          {outcomes.map((outcome) => (
            <div key={outcome} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.07] p-5">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
              <span className="text-sm font-black text-white">{outcome}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
