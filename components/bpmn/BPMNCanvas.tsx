"use client";

import React, { useRef, useState } from "react";
import { Info } from "lucide-react";
import { BPMNNode as BPMNNodeType, BPMNConnection as BPMNConnectionType, SwimlaneType } from "./types";
import Swimlane from "./Swimlane";
import BPMNNode from "./BPMNNode";
import BPMNConnection from "./BPMNConnection";

interface BPMNCanvasProps {
  swimlanes: SwimlaneType[];
  nodes: BPMNNodeType[];
  connections: BPMNConnectionType[];
  selectedNodeId: string | null;
  onSelectNode: (id: string | null) => void;
  isAnalyticsMode: boolean;
  workflowMode: "AS_IS" | "TO_BE";
  zoom: number;
  onPositionChange: (id: string, x: number, y: number) => void;
}

export default function BPMNCanvas({
  swimlanes,
  nodes,
  connections,
  selectedNodeId,
  onSelectNode,
  isAnalyticsMode,
  workflowMode,
  zoom,
  onPositionChange
}: BPMNCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // Calcular largura máxima com base nas coordenadas X dos nós + margem
  const maxNodeX = nodes.reduce((max, node) => (node.x > max ? node.x : max), 0);
  const canvasWidth = Math.max(maxNodeX + 300, 1800);

  // Altura total somando as alturas das raias
  const canvasHeight = swimlanes.reduce((sum, lane) => sum + lane.height, 0);

  return (
    <div
      ref={canvasRef}
      onClick={() => onSelectNode(null)}
      className="relative flex-1 bg-background overflow-auto custom-scrollbar border border-border rounded-2xl shadow-inner select-none h-[580px] w-full"
    >
      {/* Blueprint Grid HSL Backplane */}
      <div
        className="absolute inset-0 bg-secondary/15 transition-colors pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(hsl(var(--border)) 1px, transparent 0px)",
          backgroundSize: "20px 20px"
        }}
      />

      {/* Dica Flutuante de Governança */}
      <div className="absolute top-4 left-4 z-10 p-3 bg-background/95 border border-border rounded-xl text-[10px] font-semibold text-muted-foreground flex items-center gap-2 shadow-sm max-w-sm pointer-events-none">
        <Info className="w-3.5 h-3.5 text-accent shrink-0" />
        <span>
          HIT Process Canvas: Arraste nós operacionais para reajustar layout e clique para auditar metadados.
        </span>
      </div>

      {/* Canvas Escalável (Zoom Engine) */}
      <div
        className="relative origin-top-left transition-transform duration-200"
        style={{
          transform: `scale(${zoom / 100})`,
          width: `${canvasWidth}px`,
          height: `${canvasHeight}px`
        }}
      >
        {/* Camada 1: Raias Operacionais (Swimlanes) */}
        <div className="absolute inset-0 flex flex-col pointer-events-none">
          {swimlanes.map((lane) => (
            <Swimlane key={lane.id} lane={lane} width={canvasWidth} />
          ))}
        </div>

        {/* Camada 2: Conexões Direcionais SVG Reativas */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          style={{ width: `${canvasWidth}px`, height: `${canvasHeight}px` }}
        >
          {connections.map((conn) => {
            const fromNode = nodes.find((n) => n.id === conn.from);
            const toNode = nodes.find((n) => n.id === conn.to);
            if (!fromNode || !toNode) return null;

            return (
              <BPMNConnection
                key={conn.id}
                connection={conn}
                fromNode={fromNode}
                toNode={toNode}
              />
            );
          })}
        </svg>

        {/* Camada 3: Nós Operacionais Interativos (Framer Motion) */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {nodes.map((node) => (
            <div key={node.id} className="pointer-events-auto">
              <BPMNNode
                node={node}
                isSelected={node.id === selectedNodeId}
                isAnalyticsMode={isAnalyticsMode}
                workflowMode={workflowMode}
                onClick={() => onSelectNode(node.id)}
                onPositionChange={onPositionChange}
                canvasBoundsRef={canvasRef}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
