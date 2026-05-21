import {
  beforeAfterStory,
  demoSafeChecklist,
  executiveSummaryMode,
  executiveWowMoments,
  finalDemoScript,
  finalExecutiveRecommendations,
  leadershipDemoFlow,
} from "@/lib/demo-flow-data";
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  Clock3,
  Compass,
  Eye,
  Gauge,
  Layers,
  Maximize2,
  Play,
  Presentation,
  ShieldCheck,
  Sparkles,
  Target,
  WandSparkles,
} from "lucide-react";
import Link from "next/link";

const shortcutChips = [
  { key: "F", label: "Fullscreen" },
  { key: "H", label: "Hide UI" },
  { key: "S", label: "Screenshot" },
  { key: "E", label: "Summary" },
  { key: "Space", label: "Auto-story" },
];

export default function LeadershipDemoPage() {
  return (
    <main className="space-y-8">
      <section className="relative overflow-hidden rounded-2xl bg-[#1C1208] text-white shadow-2xl">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
        <div className="relative grid gap-8 p-6 md:p-8 xl:grid-cols-[1.15fr_0.85fr] xl:p-10">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-accent">
              <Presentation className="h-3.5 w-3.5" />
              Final Leadership Demo Environment
            </div>

            <div className="max-w-4xl space-y-4">
              <h1 className="text-3xl font-black leading-tight tracking-tight text-white md:text-5xl 2xl:text-6xl">
                Demo executivo para posicionar a HIT como operação governada, inteligente e escalável.
              </h1>
              <p className="max-w-3xl text-sm font-semibold leading-7 text-white/70 md:text-base">
                Este command center organiza roteiro, talking points, momentos de impacto,
                fallback de apresentação e links diretos para conduzir a reunião como uma
                narrativa de transformação operacional, não como uma demonstração de telas.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin/presentation"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-accent/20 transition hover:bg-accent-hover"
              >
                <Play className="h-4 w-4" />
                Abrir Presentation Mode
              </Link>
              <Link
                href="/admin/dashboard"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 text-xs font-black uppercase tracking-wider text-white transition hover:bg-white/15"
              >
                <Gauge className="h-4 w-4 text-accent" />
                Dashboard Executivo
              </Link>
              <Link
                href="/admin/bpmn"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 text-xs font-black uppercase tracking-wider text-white transition hover:bg-white/15"
              >
                <Layers className="h-4 w-4 text-accent" />
                BPMN Reveal
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-md">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-accent">
                  Executive Summary Mode
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight">
                  Leitura em menos de 2 minutos
                </h2>
              </div>
              <ShieldCheck className="h-6 w-6 text-accent" />
            </div>
            <p className="mt-5 text-sm font-semibold leading-6 text-white/70">
              {executiveSummaryMode.headline}
            </p>
            <div className="mt-6 space-y-3">
              {executiveSummaryMode.twoMinuteReadout.map((item) => (
                <div key={item} className="flex gap-3 rounded-xl border border-white/10 bg-black/10 p-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span className="text-xs font-bold leading-5 text-white/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Demo flow", value: "15", detail: "etapas guiadas", icon: Compass },
          { label: "Pacing", value: "12-16", detail: "minutos executivos", icon: Clock3 },
          { label: "Wow moments", value: String(executiveWowMoments.length), detail: "reveals planejados", icon: Sparkles },
          { label: "Demo safe", value: "100", detail: "% dados carregados", icon: ShieldCheck },
        ].map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="premium-surface rounded-2xl border border-border bg-background p-5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  {metric.label}
                </span>
                <Icon className="h-4 w-4 text-accent" />
              </div>
              <div className="mt-5 flex items-end gap-2">
                <span className="text-4xl font-black tracking-tight text-primary">{metric.value}</span>
                <span className="pb-1 text-xs font-black uppercase text-muted-foreground">{metric.detail}</span>
              </div>
            </div>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-2xl border border-border bg-background p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-accent">Demo Safe Mode</p>
              <h2 className="text-2xl font-black tracking-tight text-primary">Ambiente estável para liderança</h2>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {demoSafeChecklist.map((item) => (
              <div key={item.label} className="flex gap-3 rounded-xl border border-border bg-secondary/15 p-4">
                <div className={item.status === "ready" ? "text-emerald-600" : "text-accent"}>
                  <CheckCircle2 className="mt-0.5 h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-primary">{item.label}</h3>
                  <p className="mt-1 text-xs font-semibold leading-5 text-muted-foreground">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-accent/20 bg-accent/10 p-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-accent">Presentation shortcuts</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {shortcutChips.map((shortcut) => (
                <span
                  key={shortcut.key}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-[10px] font-black uppercase text-primary"
                >
                  <kbd className="rounded bg-primary px-2 py-0.5 text-white">{shortcut.key}</kbd>
                  {shortcut.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-background p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-accent">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-accent">Leadership Perception</p>
              <h2 className="text-2xl font-black tracking-tight text-primary">Mensagem que deve ficar na sala</h2>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-[#1C1208] p-6 text-white">
            <p className="text-xl font-black leading-8 tracking-tight">
              “Este é o início de uma disciplina de transformação operacional dentro da HIT:
              visível para liderança, útil para a operação e orientada ao cliente.”
            </p>
            <p className="mt-5 text-sm font-semibold leading-6 text-white/70">
              {executiveSummaryMode.leadershipMessage}
            </p>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              { icon: Eye, label: "Visibilidade executiva", detail: "Risco, SLA, maturidade e cliente no mesmo cockpit." },
              { icon: WandSparkles, label: "IA operacional", detail: "Insights preditivos para reduzir tempo de decisão." },
              { icon: Maximize2, label: "Reunião pronta", detail: "Fullscreen, summary e screenshot mode para apresentação." },
              { icon: Camera, label: "Compartilhável", detail: "Telas preparadas para captura, PDF e follow-up executivo." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-xl border border-border bg-secondary/15 p-4">
                  <Icon className="h-4 w-4 text-accent" />
                  <h3 className="mt-3 text-sm font-black text-primary">{item.label}</h3>
                  <p className="mt-1 text-xs font-semibold leading-5 text-muted-foreground">{item.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-background p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-accent">Guided Demo Flow</p>
            <h2 className="text-3xl font-black tracking-tight text-primary">Roteiro navegável para a apresentação</h2>
          </div>
          <p className="max-w-xl text-sm font-semibold leading-6 text-muted-foreground">
            Use esta sequência como trilha principal. Cada etapa tem objetivo, fala estratégica,
            ênfase executiva e link direto para o ponto certo da plataforma.
          </p>
        </div>

        <div className="mt-7 grid gap-4 lg:grid-cols-3">
          {leadershipDemoFlow.map((step) => (
            <Link
              key={step.order}
              href={step.route}
              className="group rounded-2xl border border-border bg-secondary/10 p-5 transition hover:-translate-y-0.5 hover:border-accent/50 hover:bg-accent/5 hover:shadow-xl"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-sm font-black text-white">
                  {String(step.order).padStart(2, "0")}
                </div>
                <span className="rounded-full bg-background px-3 py-1 text-[10px] font-black uppercase text-muted-foreground">
                  {step.pacing}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-black leading-tight text-primary">{step.title}</h3>
              <p className="mt-3 text-xs font-semibold leading-5 text-muted-foreground">{step.objective}</p>
              <div className="mt-4 rounded-xl border border-border bg-background p-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-accent">Emphasis</p>
                <p className="mt-2 text-xs font-bold leading-5 text-primary">{step.executiveEmphasis}</p>
              </div>
              <div className="mt-4 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-accent">
                Abrir etapa
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <div className="rounded-2xl border border-border bg-background p-6">
          <p className="text-[10px] font-black uppercase tracking-widest text-accent">Talking Points</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-primary">Falas estratégicas por seção</h2>
          <div className="mt-7 space-y-4">
            {leadershipDemoFlow.slice(0, 8).map((step) => (
              <div key={step.order} className="rounded-xl border border-border bg-secondary/10 p-4">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-sm font-black text-primary">
                    {String(step.order).padStart(2, "0")} / {step.title}
                  </h3>
                  <span className="text-[10px] font-black uppercase text-accent">{step.pacing}</span>
                </div>
                <ul className="mt-3 space-y-2">
                  {step.talkingPoints.map((point) => (
                    <li key={point} className="flex gap-2 text-xs font-semibold leading-5 text-muted-foreground">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-[#1C1208] p-6 text-white">
          <p className="text-[10px] font-black uppercase tracking-widest text-accent">Wow Moments</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight">Momentos de impacto planejados</h2>
          <div className="mt-7 space-y-4">
            {executiveWowMoments.map((moment) => (
              <Link
                key={moment.title}
                href={moment.route}
                className="block rounded-xl border border-white/10 bg-white/[0.06] p-4 transition hover:border-accent/50 hover:bg-white/[0.09]"
              >
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-1 h-4 w-4 shrink-0 text-accent" />
                  <div>
                    <h3 className="text-sm font-black">{moment.title}</h3>
                    <p className="mt-2 text-xs font-semibold leading-5 text-white/65">{moment.setup}</p>
                    <p className="mt-3 text-xs font-black leading-5 text-accent">{moment.leadershipImpact}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-background p-6">
        <p className="text-[10px] font-black uppercase tracking-widest text-accent">Before vs After</p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-primary">História de transformação operacional</h2>
        <div className="mt-7 grid gap-4 xl:grid-cols-5">
          {beforeAfterStory.map((item) => (
            <div key={item.before} className="rounded-2xl border border-border bg-secondary/10 p-4">
              <div className="rounded-xl border border-destructive/15 bg-destructive/5 p-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-destructive">Before</p>
                <p className="mt-2 text-xs font-bold leading-5 text-primary">{item.before}</p>
              </div>
              <div className="my-3 flex justify-center">
                <ArrowRight className="h-4 w-4 text-accent" />
              </div>
              <div className="rounded-xl border border-accent/20 bg-accent/10 p-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-accent">After</p>
                <p className="mt-2 text-xs font-bold leading-5 text-primary">{item.after}</p>
              </div>
              <p className="mt-3 text-xs font-semibold leading-5 text-muted-foreground">{item.impact}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-2xl border border-border bg-background p-6">
          <p className="text-[10px] font-black uppercase tracking-widest text-accent">Demo Script</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-primary">Ritmo recomendado</h2>
          <div className="mt-7 space-y-4">
            {finalDemoScript.map((segment, index) => (
              <div key={segment.segment} className="relative rounded-xl border border-border bg-secondary/10 p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-xs font-black text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-black text-primary">{segment.segment}</h3>
                    <p className="text-[10px] font-black uppercase text-accent">{segment.duration}</p>
                  </div>
                </div>
                <p className="mt-3 text-xs font-semibold leading-5 text-muted-foreground">{segment.objective}</p>
                <p className="mt-3 text-xs font-bold leading-5 text-primary">{segment.speakerNotes}</p>
                <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  Transition: {segment.transition}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-background p-6">
          <p className="text-[10px] font-black uppercase tracking-widest text-accent">Final Executive Recommendations</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-primary">Decisões que a liderança deve levar</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {finalExecutiveRecommendations.map((recommendation) => (
              <div key={recommendation.title} className="rounded-2xl border border-border bg-secondary/10 p-5">
                <span className="rounded-full bg-accent/10 px-3 py-1 text-[10px] font-black uppercase text-accent">
                  {recommendation.priority}
                </span>
                <h3 className="mt-4 text-lg font-black leading-tight text-primary">{recommendation.title}</h3>
                <p className="mt-3 text-xs font-semibold leading-5 text-muted-foreground">{recommendation.decision}</p>
                <div className="mt-4 rounded-xl border border-accent/20 bg-accent/10 p-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-accent">Expected gain</p>
                  <p className="mt-2 text-xs font-bold leading-5 text-primary">{recommendation.expectedGain}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
