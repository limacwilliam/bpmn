"use client";

import ASISFlowPresentation from "@/components/presentation/ASISFlowPresentation";
import BottleneckHeatmap from "@/components/presentation/BottleneckHeatmap";
import CustomerJourneyMap from "@/components/presentation/CustomerJourneyMap";
import ExecutiveHero from "@/components/presentation/ExecutiveHero";
import ExecutiveRecommendations from "@/components/presentation/ExecutiveRecommendations";
import FinalVisionStatement from "@/components/presentation/FinalVisionStatement";
import GovernanceComparison from "@/components/presentation/GovernanceComparison";
import MaturityComparison from "@/components/presentation/MaturityComparison";
import OperationalRiskMap from "@/components/presentation/OperationalRiskMap";
import TOBEFlowPresentation from "@/components/presentation/TOBEFlowPresentation";
import TransformationRoadmap from "@/components/presentation/TransformationRoadmap";
import { executiveKPIs } from "@/lib/dashboard-data";
import { presentationSlides } from "@/lib/presentation-data";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Eye,
  EyeOff,
  Gauge,
  Layers,
  Maximize2,
  Pause,
  Play,
  Presentation,
  Sparkles,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const slideComponents = [
  <ExecutiveHero key="overview" />,
  <DiagnosisSlide key="diagnosis" />,
  <ASISFlowPresentation key="asis" />,
  <BottleneckHeatmap key="bottlenecks" />,
  <CustomerJourneyMap key="customer-impact" />,
  <OperationalRiskMap key="organization" />,
  <TOBEFlowPresentation key="tobe" />,
  <GovernanceComparison key="governance" />,
  <DashboardVisionSlide key="dashboard-vision" />,
  <TransformationRoadmap key="roadmap" />,
  <ExecutiveRecommendations key="recommendations" />,
  <FinalVisionStatement key="final" />,
];

export default function PresentationClient() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [chromeHidden, setChromeHidden] = useState(false);
  const [screenshotMode, setScreenshotMode] = useState(false);
  const [summaryMode, setSummaryMode] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);

  const progress = useMemo(
    () => ((activeSlide + 1) / presentationSlides.length) * 100,
    [activeSlide]
  );

  const goToSlide = useCallback((index: number) => {
    const nextIndex = Math.max(0, Math.min(index, presentationSlides.length - 1));
    setActiveSlide(nextIndex);
    document.getElementById(`presentation-slide-${nextIndex}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "PageDown") goToSlide(activeSlide + 1);
      if (event.key === "ArrowLeft" || event.key === "PageUp") goToSlide(activeSlide - 1);
      if (event.key.toLowerCase() === "f") viewportRef.current?.requestFullscreen();
      if (event.key.toLowerCase() === "h") setChromeHidden((current) => !current);
      if (event.key.toLowerCase() === "s") setScreenshotMode((current) => !current);
      if (event.key.toLowerCase() === "e") setSummaryMode((current) => !current);
      if (event.key === " ") {
        event.preventDefault();
        setAutoPlay((current) => !current);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeSlide, goToSlide]);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = window.setInterval(() => {
      setActiveSlide((current) => {
        const next = current === presentationSlides.length - 1 ? 0 : current + 1;
        document.getElementById(`presentation-slide-${next}`)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        return next;
      });
    }, 9000);

    return () => window.clearInterval(timer);
  }, [autoPlay]);

  return (
    <div
      ref={viewportRef}
      className={cn(
        "relative min-h-screen bg-secondary/30 text-foreground",
        screenshotMode && "demo-screenshot-mode",
        summaryMode && "bg-background"
      )}
    >
      <div className={cn(
        "demo-chrome sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md transition-transform duration-300",
        chromeHidden && "-translate-y-full"
      )}>
        <div className="flex flex-col gap-3 px-4 py-3 md:px-6">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                <Presentation className="h-5 w-5 text-accent" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-accent">
                    Executive Presentation Mode
                  </span>
                  <span className="hidden md:inline-flex rounded-full bg-accent/10 px-2 py-0.5 text-[9px] font-black uppercase text-accent">
                    Leadership-ready
                  </span>
                </div>
                <h1 className="truncate text-sm md:text-base font-black text-primary">
                  {presentationSlides[activeSlide].title}
                </h1>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => goToSlide(activeSlide - 1)}
                className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-background px-4 text-xs font-black text-primary hover:border-accent hover:text-accent transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </button>
              <button
                onClick={() => setAutoPlay((current) => !current)}
                className={cn(
                  "inline-flex h-10 items-center gap-2 rounded-full px-4 text-xs font-black transition-colors",
                  autoPlay ? "bg-primary text-white" : "bg-accent text-white hover:bg-accent-hover"
                )}
              >
                {autoPlay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {autoPlay ? "Pause" : "Auto-story"}
              </button>
              <button
                onClick={() => viewportRef.current?.requestFullscreen()}
                className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-background px-4 text-xs font-black text-primary hover:border-accent hover:text-accent transition-colors"
              >
                <Maximize2 className="h-4 w-4" />
                Fullscreen
              </button>
              <button
                onClick={() => goToSlide(activeSlide + 1)}
                className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-4 text-xs font-black text-white hover:bg-primary/90 transition-colors"
              >
                Next
                <ArrowRight className="h-4 w-4 text-accent" />
              </button>
              <button
                onClick={() => setChromeHidden((current) => !current)}
                className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-background px-4 text-xs font-black text-primary hover:border-accent hover:text-accent transition-colors"
                title="H: hide presentation controls"
              >
                {chromeHidden ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                UI
              </button>
              <button
                onClick={() => setScreenshotMode((current) => !current)}
                className={cn(
                  "inline-flex h-10 items-center gap-2 rounded-full px-4 text-xs font-black transition-colors",
                  screenshotMode ? "bg-primary text-white" : "border border-border bg-background text-primary hover:border-accent hover:text-accent"
                )}
                title="S: screenshot-ready mode"
              >
                <Camera className="h-4 w-4" />
                Shot
              </button>
              <button
                onClick={() => setSummaryMode((current) => !current)}
                className={cn(
                  "inline-flex h-10 items-center gap-2 rounded-full px-4 text-xs font-black transition-colors",
                  summaryMode ? "bg-primary text-white" : "border border-border bg-background text-primary hover:border-accent hover:text-accent"
                )}
                title="E: executive summary mode"
              >
                <Layers className="h-4 w-4" />
                Summary
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-1.5 flex-1 rounded-full bg-border overflow-hidden">
              <div className="h-full rounded-full bg-accent transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-[10px] font-black uppercase text-muted-foreground">
              {activeSlide + 1}/{presentationSlides.length}
            </span>
          </div>
        </div>
      </div>

      <div className={cn("grid grid-cols-1", !summaryMode && "xl:grid-cols-[16rem_1fr]")}>
        {!summaryMode && (
          <aside className="demo-chrome hidden xl:block sticky top-[89px] h-[calc(100vh-89px)] border-r border-border bg-background/70 backdrop-blur-md p-4 overflow-y-auto custom-scrollbar">
          <div className="space-y-2">
            {presentationSlides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={cn(
                  "w-full rounded-xl px-3 py-3 text-left transition-colors border",
                  activeSlide === index
                    ? "border-accent bg-accent/10 text-primary"
                    : "border-transparent text-muted-foreground hover:bg-secondary hover:text-primary"
                )}
              >
                <span className="block text-[9px] font-black uppercase tracking-widest text-accent">
                  {String(index + 1).padStart(2, "0")} / {slide.eyebrow}
                </span>
                <span className="mt-1 block text-xs font-black leading-tight">{slide.title}</span>
              </button>
            ))}
          </div>
          </aside>
        )}

        <main className={cn("space-y-8 p-4 md:p-6 xl:p-8", summaryMode && "mx-auto max-w-7xl")}>
          {(summaryMode ? [0, 1, 3, 4, 6, 9, 10, 11] : presentationSlides.map((_, index) => index)).map((index) => {
            const slide = presentationSlides[index];
            return (
              <section
                key={slide.id}
                id={`presentation-slide-${index}`}
                className="demo-slide scroll-mt-32 space-y-5 presentation-reveal"
              >
                {index !== 0 && index !== presentationSlides.length - 1 && (
                  <div className="mx-auto max-w-6xl text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-accent">
                      <Sparkles className="h-3.5 w-3.5" />
                      {slide.eyebrow}
                    </div>
                    <h2 className="mt-5 text-3xl md:text-5xl font-black text-primary tracking-tight leading-tight">
                      {slide.title}
                    </h2>
                    <p className="mx-auto mt-4 max-w-3xl text-sm md:text-base leading-relaxed text-muted-foreground font-medium">
                      {slide.narrative}
                    </p>
                  </div>
                )}
                {slideComponents[index]}
              </section>
            );
          })}
        </main>
      </div>

      <button
        onClick={() => setChromeHidden(false)}
        className={cn(
          "fixed right-4 top-4 z-50 rounded-full bg-primary px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white shadow-xl transition-all",
          chromeHidden && !screenshotMode ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-2"
        )}
      >
        Show controls
      </button>
    </div>
  );
}

function DiagnosisSlide() {
  const diagnosis = [
    { label: "Manual systems", value: "6", detail: "E-mail, WhatsApp, Excel, OneDrive, Google Earth, SAP" },
    { label: "Critical handoffs", value: "5", detail: "Every team transition creates queue and accountability risk" },
    { label: "VIP accounts exposed", value: "3", detail: "Ambev, Bradesco and GPA carry visible operational friction" },
    { label: "Maturity gap", value: "2.4", detail: "Average maturity distance to scalable level 5 governance" },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {diagnosis.map((item) => (
          <div key={item.label} className="rounded-2xl border border-border bg-background p-6 min-h-56">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{item.label}</span>
              <Gauge className="h-4 w-4 text-accent" />
            </div>
            <div className="mt-8 text-5xl font-black text-primary tracking-tight">{item.value}</div>
            <p className="mt-5 text-xs leading-relaxed text-muted-foreground font-semibold">{item.detail}</p>
          </div>
        ))}
      </div>
      <MaturityComparison />
    </div>
  );
}

function DashboardVisionSlide() {
  return (
    <div className="rounded-2xl border border-border bg-background p-6 md:p-8 space-y-7">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {executiveKPIs.slice(0, 10).map((kpi) => (
          <div key={kpi.id} className="rounded-xl border border-border bg-secondary/15 p-5">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{kpi.title}</span>
            <div className="mt-5 flex items-end gap-1">
              <span className="text-4xl font-black text-primary tracking-tight">{kpi.value}</span>
              {kpi.unit && <span className="pb-1 text-sm font-black text-muted-foreground">{kpi.unit}</span>}
            </div>
            <p className="mt-4 text-[10px] font-black uppercase text-accent">{kpi.change} {kpi.description}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-accent/25 bg-accent/10 p-6 text-center">
        <p className="text-sm md:text-base font-black text-primary">
          Future vision: one executive cockpit for SLA visibility, bottleneck monitoring, customer health, maturity evolution and AI-led operational recommendations.
        </p>
      </div>
    </div>
  );
}
