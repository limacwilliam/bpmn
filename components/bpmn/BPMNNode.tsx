"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  Play,
  User,
  Settings,
  Clock,
  Bell,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  Flame,
  CheckCircle2,
  TrendingUp,
  Cpu
} from "lucide-react";
import { BPMNNode as BPMNNodeType } from "./types";
import { cn } from "@/lib/utils";

interface BPMNNodeProps {
  node: BPMNNodeType;
  isSelected: boolean;
  isAnalyticsMode: boolean;
  workflowMode: "AS_IS" | "TO_BE";
  onClick: () => void;
  onPositionChange: (id: string, x: number, y: number) => void;
  canvasBoundsRef: React.RefObject<HTMLDivElement | null>;
}

export default function BPMNNode({
  node,
  isSelected,
  isAnalyticsMode,
  workflowMode,
  onClick,
  onPositionChange,
  canvasBoundsRef
}: BPMNNodeProps) {
  const nodeRef = useRef<HTMLDivElement>(null);

  // Determinar ícone e estilo com base no tipo de nó
  const renderNodeShape = () => {
    const isAsIs = workflowMode === "AS_IS";
    const hasBottleneck = isAsIs && node.metadata.bottlenecks;
    const hasAiInsight = !isAsIs && node.metadata.aiInsights;

    // Efeito heatmap de analytics (Overlay de calor)
    const analyticsClass = cn(
      isAnalyticsMode && hasBottleneck && "animate-pulse ring-4 ring-destructive/40 shadow-lg shadow-destructive/20 bg-destructive/10 border-destructive",
      isAnalyticsMode && !hasBottleneck && "opacity-60 grayscale-[30%]"
    );

    switch (node.type) {
      case "START":
        return (
          <div
            className={cn(
              "w-12 h-12 rounded-full border-2 border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 shadow shadow-emerald-500/10 hover:scale-105 transition-transform",
              isSelected && "ring-2 ring-accent ring-offset-2",
              analyticsClass
            )}
          >
            <Play className="w-4 h-4 fill-current ml-0.5" />
          </div>
        );

      case "END":
        return (
          <div
            className={cn(
              "w-12 h-12 rounded-full border-4 border-double border-destructive bg-destructive/5 flex items-center justify-center text-destructive hover:scale-105 transition-transform",
              isSelected && "ring-2 ring-accent ring-offset-2",
              analyticsClass
            )}
          />
        );

      case "DECISION_GATEWAY":
        return (
          <div
            className={cn(
              "w-12 h-12 border-2 border-primary bg-background dark:bg-secondary rotate-45 flex items-center justify-center text-primary shadow hover:scale-105 transition-transform",
              isSelected && "ring-2 ring-accent ring-offset-2",
              analyticsClass
            )}
          >
            <span className="-rotate-45 font-black text-xs">X</span>
          </div>
        );

      case "PARALLEL_GATEWAY":
        return (
          <div
            className={cn(
              "w-12 h-12 border-2 border-primary bg-background dark:bg-secondary rotate-45 flex items-center justify-center text-primary shadow hover:scale-105 transition-transform",
              isSelected && "ring-2 ring-accent ring-offset-2",
              analyticsClass
            )}
          >
            <span className="-rotate-45 font-black text-base leading-none">+</span>
          </div>
        );

      case "TIMER":
        return (
          <div
            className={cn(
              "w-12 h-12 rounded-full border-2 border-amber-600 bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center text-amber-600 shadow hover:scale-105 transition-transform",
              isSelected && "ring-2 ring-accent ring-offset-2",
              analyticsClass
            )}
          >
            <Clock className="w-4 h-4" />
          </div>
        );

      case "NOTIFICATION":
        return (
          <div
            className={cn(
              "w-12 h-12 rounded-full border-2 border-blue-600 bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center text-blue-600 shadow hover:scale-105 transition-transform",
              isSelected && "ring-2 ring-accent ring-offset-2",
              analyticsClass
            )}
          >
            <Bell className="w-4 h-4" />
          </div>
        );

      case "ESCALATION":
        return (
          <div
            className={cn(
              "w-12 h-12 rounded-full border-2 border-destructive bg-destructive/10 flex items-center justify-center text-destructive shadow hover:scale-105 transition-transform",
              isSelected && "ring-2 ring-accent ring-offset-2",
              analyticsClass
            )}
          >
            <AlertTriangle className="w-4 h-4" />
          </div>
        );

      case "CUSTOMER_ACTION":
        return (
          <div
            className={cn(
              "w-44 min-h-[72px] px-3.5 py-2.5 rounded-xl border border-indigo-200 bg-indigo-50/40 dark:border-indigo-900/60 dark:bg-indigo-950/20 text-left flex flex-col justify-between shadow-sm hover:shadow hover:border-indigo-400 transition-all",
              isSelected && "ring-2 ring-accent border-transparent",
              analyticsClass
            )}
          >
            <div className="flex items-start justify-between gap-1.5">
              <span className="text-[8px] font-black uppercase text-indigo-600 tracking-widest leading-none">
                Ação do Cliente
              </span>
              <User className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            </div>
            <span className="text-[11px] font-bold text-primary leading-tight mt-1 line-clamp-2">
              {node.title}
            </span>
            <div className="text-[9px] text-indigo-600 font-semibold mt-1">
              SLA: {node.metadata.sla}
            </div>
          </div>
        );

      case "CUSTOMER_TOUCHPOINT":
        return (
          <div
            className={cn(
              "w-44 min-h-[72px] px-3.5 py-2.5 rounded-xl border border-accent/40 bg-accent/5 text-left flex flex-col justify-between shadow-sm hover:shadow hover:border-accent transition-all",
              isSelected && "ring-2 ring-accent border-transparent",
              analyticsClass
            )}
          >
            <div className="flex items-start justify-between gap-1.5">
              <span className="text-[8px] font-black uppercase text-accent tracking-widest leading-none">
                Touchpoint CS
              </span>
              <Sparkles className="w-3.5 h-3.5 text-accent shrink-0 animate-pulse" />
            </div>
            <span className="text-[11px] font-bold text-primary leading-tight mt-1 line-clamp-2">
              {node.title}
            </span>
            <div className="text-[9px] text-accent font-semibold mt-1">
              SLA: {node.metadata.sla}
            </div>
          </div>
        );

      case "SYSTEM_TASK":
        return (
          <div
            className={cn(
              "w-44 min-h-[72px] px-3.5 py-2.5 rounded-xl border border-border bg-background hover:border-accent hover:shadow-sm text-left flex flex-col justify-between transition-all",
              isSelected && "ring-2 ring-accent border-transparent",
              analyticsClass
            )}
          >
            <div className="flex items-start justify-between gap-1.5">
              <span className="text-[8px] font-black uppercase text-primary/60 tracking-widest leading-none">
                Integração / Sistema
              </span>
              {hasAiInsight ? (
                <Cpu className="w-3.5 h-3.5 text-accent shrink-0 animate-pulse" />
              ) : (
                <Settings className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              )}
            </div>
            <span className="text-[11px] font-bold text-primary leading-tight mt-1 line-clamp-2">
              {node.title}
            </span>
            <div className="flex items-center justify-between text-[9px] mt-1 text-muted-foreground">
              <span className="font-semibold">SLA: {node.metadata.sla}</span>
              <span className="truncate max-w-[80px] font-mono text-[8px] bg-secondary px-1 py-0.5 rounded border border-border">
                {node.metadata.systems[0] || "API"}
              </span>
            </div>
          </div>
        );

      case "USER_TASK":
      case "TASK":
      default:
        return (
          <div
            className={cn(
              "w-44 min-h-[72px] px-3.5 py-2.5 rounded-xl border border-border bg-background hover:border-accent hover:shadow-sm text-left flex flex-col justify-between transition-all",
              isSelected && "ring-2 ring-accent border-transparent",
              analyticsClass
            )}
          >
            <div className="flex items-start justify-between gap-1.5">
              <span className="text-[8px] font-black uppercase text-primary/60 tracking-widest leading-none">
                Tarefa Manual
              </span>
              <User className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            </div>
            <span className="text-[11px] font-bold text-primary leading-tight mt-1 line-clamp-2">
              {node.title}
            </span>
            <div className="flex items-center justify-between text-[9px] mt-1 text-muted-foreground">
              <span className="font-semibold">SLA: {node.metadata.sla}</span>
              <span className="truncate max-w-[90px] text-[8px]">
                {node.metadata.owner}
              </span>
            </div>
          </div>
        );
    }
  };

  // Largura/Altura física para os offsets de conexões
  const getDimensions = () => {
    switch (node.type) {
      case "START":
      case "END":
      case "TIMER":
      case "NOTIFICATION":
      case "ESCALATION":
        return { width: 48, height: 48 };
      case "DECISION_GATEWAY":
      case "PARALLEL_GATEWAY":
        return { width: 48, height: 48 }; // Embora gire 45°, o container é quadrado
      default:
        return { width: 176, height: 72 }; // w-44 é 176px, min-h-[72px]
    }
  };

  const { width, height } = getDimensions();

  // Badges informativos no topo do nó
  const renderTopBadges = () => {
    const isAsIs = workflowMode === "AS_IS";
    const hasBottleneck = isAsIs && node.metadata.bottlenecks;
    const hasAiInsight = !isAsIs && node.metadata.aiInsights;

    return (
      <div className="absolute -top-3 left-2 z-10 flex gap-1 select-none pointer-events-none">
        {hasBottleneck && (
          <div className="h-5 px-1.5 bg-destructive text-white rounded-full flex items-center gap-0.5 text-[8px] font-black uppercase tracking-widest shadow shadow-destructive/30 border border-destructive-foreground/10 animate-bounce">
            <Flame className="w-2.5 h-2.5 fill-current" />
            Gargalo
          </div>
        )}
        {hasAiInsight && (
          <div className="h-5 px-1.5 bg-accent text-white rounded-full flex items-center gap-0.5 text-[8px] font-black uppercase tracking-widest shadow shadow-accent/30 border border-accent-foreground/10 animate-pulse">
            <Sparkles className="w-2.5 h-2.5 fill-current" />
            Otimizado por IA
          </div>
        )}
        {!isAsIs && node.type === "SYSTEM_TASK" && (
          <div className="h-5 px-1.5 bg-[#1C1208] text-[#F15A22] rounded-full flex items-center gap-0.5 text-[8px] font-black uppercase tracking-widest border border-accent/20">
            <TrendingUp className="w-2.5 h-2.5" />
            Auto
          </div>
        )}
      </div>
    );
  };

  return (
    <motion.div
      ref={nodeRef}
      drag
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={canvasBoundsRef}
      onDragEnd={(_, info) => {
        // Obter nova coordenada relativa ao pai
        if (canvasBoundsRef.current) {
          const canvasRect = canvasBoundsRef.current.getBoundingClientRect();
          // Ajustar coordenada para o zoom (o pai faz o scaling)
          const newX = Math.round(node.x + info.delta.x);
          const newY = Math.round(node.y + info.delta.y);
          onPositionChange(node.id, newX, newY);
        }
      }}
      className="absolute cursor-move select-none"
      style={{ x: node.x, y: node.y }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98, cursor: "grabbing" }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {renderTopBadges()}
      {renderNodeShape()}

      {/* Rótulo inferior para nós circulares / gateways */}
      {(node.type === "START" ||
        node.type === "END" ||
        node.type === "DECISION_GATEWAY" ||
        node.type === "PARALLEL_GATEWAY" ||
        node.type === "TIMER" ||
        node.type === "NOTIFICATION" ||
        node.type === "ESCALATION") && (
        <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-[9px] font-black uppercase text-[#7A7268] tracking-widest whitespace-nowrap text-center max-w-[120px] truncate">
          {node.title}
        </span>
      )}
    </motion.div>
  );
}
