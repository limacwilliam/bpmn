"use client";

import React from "react";
import { Compass, Maximize2, Minimize2, Move } from "lucide-react";
import { BPMNNode } from "./types";

interface BPMNMinimapProps {
  nodes: BPMNNode[];
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}

export default function BPMNMinimap({
  nodes,
  zoom,
  onZoomIn,
  onZoomOut,
  onResetZoom
}: BPMNMinimapProps) {
  // Encontrar limites geográficos dos nós para encaixar no minimapa
  const getBounds = () => {
    if (nodes.length === 0) return { minX: 0, maxX: 100, minY: 0, maxY: 100 };
    const xs = nodes.map(n => n.x);
    const ys = nodes.map(n => n.y);
    return {
      minX: Math.min(...xs) - 50,
      maxX: Math.max(...xs) + 200,
      minY: Math.min(...ys) - 50,
      maxY: Math.max(...ys) + 100
    };
  };

  const bounds = getBounds();
  const scaleX = 140 / (bounds.maxX - bounds.minX || 1);
  const scaleY = 80 / (bounds.maxY - bounds.minY || 1);
  const scale = Math.min(scaleX, scaleY, 0.1);

  return (
    <div className="absolute bottom-4 left-4 z-20 bg-background/95 border border-border rounded-xl shadow-lg p-3 w-48 hidden md:block select-none backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-border pb-2 mb-2">
        <div className="flex items-center gap-1.5 text-primary text-[10px] font-black uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5 text-accent" />
          Minimapa / Zoom
        </div>
        <span className="text-[10px] font-bold text-accent bg-accent/10 px-1.5 py-0.5 rounded-full font-mono">
          {zoom}%
        </span>
      </div>

      {/* Caixa de visualização em miniatura */}
      <div className="relative h-20 bg-secondary/40 border border-border/60 rounded-lg overflow-hidden flex items-center justify-center">
        {/* Nós miniaturas */}
        <div className="absolute inset-0">
          {nodes.map(node => {
            const relX = (node.x - bounds.minX) * scale + 15;
            const relY = (node.y - bounds.minY) * scale + 10;
            const isStartEnd = node.type === "START" || node.type === "END";
            
            return (
              <div
                key={node.id}
                className={`absolute rounded-sm ${
                  node.type === "START"
                    ? "bg-emerald-500 w-2.5 h-2.5 rounded-full"
                    : node.type === "END"
                    ? "bg-destructive w-2.5 h-2.5 rounded-full"
                    : node.type === "DECISION_GATEWAY"
                    ? "bg-amber-500 w-2 h-2 rotate-45"
                    : node.type === "CUSTOMER_TOUCHPOINT"
                    ? "bg-accent w-4 h-2"
                    : "bg-primary/50 w-4.5 h-2.5"
                }`}
                style={{
                  left: `${relX}px`,
                  top: `${relY}px`
                }}
              />
            );
          })}
        </div>

        {/* Quadro indicador de cursor */}
        <div className="absolute w-28 h-12 border border-accent/40 bg-accent/5 rounded pointer-events-none flex items-center justify-center">
          <Move className="w-3 h-3 text-accent/30" />
        </div>
      </div>

      {/* Barra de Controles de Zoom */}
      <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-border/60 gap-1.5">
        <button
          onClick={onZoomOut}
          className="flex-1 py-1 rounded bg-secondary hover:bg-muted text-primary hover:text-accent font-black text-xs transition-colors flex items-center justify-center cursor-pointer"
          title="Zoom Out"
        >
          <Minimize2 className="w-3 h-3" />
        </button>
        <button
          onClick={onResetZoom}
          className="px-2 py-1 rounded bg-secondary hover:bg-muted text-primary font-bold text-[9px] transition-colors cursor-pointer"
          title="Reset Zoom"
        >
          100%
        </button>
        <button
          onClick={onZoomIn}
          className="flex-1 py-1 rounded bg-secondary hover:bg-muted text-primary hover:text-accent font-black text-xs transition-colors flex items-center justify-center cursor-pointer"
          title="Zoom In"
        >
          <Maximize2 className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
