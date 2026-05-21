"use client";

import React from "react";
import { BPMNConnection as BPMNConnectionType, BPMNNode } from "./types";
import { cn } from "@/lib/utils";

interface BPMNConnectionProps {
  connection: BPMNConnectionType;
  fromNode: BPMNNode;
  toNode: BPMNNode;
}

export default function BPMNConnection({
  connection,
  fromNode,
  toNode
}: BPMNConnectionProps) {
  // Obter dimensões do nó de origem
  const getDimensions = (node: BPMNNode) => {
    switch (node.type) {
      case "START":
      case "END":
      case "TIMER":
      case "NOTIFICATION":
      case "ESCALATION":
      case "DECISION_GATEWAY":
      case "PARALLEL_GATEWAY":
        return { width: 48, height: 48 };
      default:
        return { width: 176, height: 72 };
    }
  };

  const fromDim = getDimensions(fromNode);
  const toDim = getDimensions(toNode);

  // Calcular pontos de conexão (Saída da direita -> Entrada da esquerda)
  const x1 = fromNode.x + fromDim.width;
  const y1 = fromNode.y + fromDim.height / 2;

  const x2 = toNode.x;
  const y2 = toNode.y + toDim.height / 2;

  // Gerar caminho ortogonal elegante em 90° (Estilo Lucidchart)
  // X intermediário para a dobra
  const midX = x1 + (x2 - x1) / 2;
  const pathData = `M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2} ${y2}`;

  // Coordenadas para o texto da conexão no meio do caminho
  const labelX = midX;
  const labelY = y1 + (y2 - y1) / 2 - 8;

  // Estilos reativos a SLA
  const isStable = connection.slaStatus === "STABLE";
  const isWarning = connection.slaStatus === "WARNING";
  const isCritical = connection.slaStatus === "CRITICAL";

  // Identificação do marker de seta dinâmico por cor
  const getMarkerId = () => {
    if (isCritical) return "arrowhead-critical";
    if (isWarning) return "arrowhead-warning";
    if (isStable) return "arrowhead-stable";
    return "arrowhead-default";
  };

  return (
    <g className="select-none pointer-events-none">
      {/* Definições de pontas de seta reutilizáveis */}
      <defs>
        <marker
          id="arrowhead-default"
          markerWidth="8"
          markerHeight="6"
          refX="7"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 8 3, 0 6" className="fill-muted-foreground" />
        </marker>
        <marker
          id="arrowhead-stable"
          markerWidth="8"
          markerHeight="6"
          refX="7"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 8 3, 0 6" className="fill-emerald-500" />
        </marker>
        <marker
          id="arrowhead-warning"
          markerWidth="8"
          markerHeight="6"
          refX="7"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 8 3, 0 6" className="fill-amber-500" />
        </marker>
        <marker
          id="arrowhead-critical"
          markerWidth="8"
          markerHeight="6"
          refX="7"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 8 3, 0 6" className="fill-destructive" />
        </marker>
      </defs>

      {/* Linha de sombra / glow por trás de conexões problemáticas */}
      {isCritical && (
        <path
          d={pathData}
          fill="none"
          stroke="hsl(var(--destructive)/0.25)"
          strokeWidth="6"
          className="blur-sm"
        />
      )}
      {isWarning && (
        <path
          d={pathData}
          fill="none"
          stroke="hsl(var(--ring)/0.15)"
          strokeWidth="5"
          className="blur-xs"
        />
      )}

      {/* Linha principal de conexão */}
      <path
        d={pathData}
        fill="none"
        stroke={
          isCritical
            ? "hsl(var(--destructive))"
            : isWarning
            ? "hsl(var(--ring))"
            : isStable
            ? "hsl(var(--border))"
            : "hsl(var(--border))"
        }
        strokeWidth={isCritical || isWarning ? "2" : "1.5"}
        markerEnd={`url(#${getMarkerId()})`}
        className={cn(
          "transition-all duration-300",
          isCritical && "animate-[dash_2s_linear_infinite]",
          isWarning && "animate-[dash_4s_linear_infinite]"
        )}
        style={{
          strokeDasharray: isCritical ? "4, 4" : isWarning ? "6, 4" : "none"
        }}
      />

      {/* Rótulo da conexão (ex: "Sim" ou "Não" em gateways) */}
      {connection.label && (
        <g transform={`translate(${labelX}, ${labelY})`}>
          <rect
            x="-16"
            y="-8"
            width="32"
            height="16"
            rx="4"
            className="fill-background stroke-border"
            strokeWidth="0.5"
          />
          <text
            textAnchor="middle"
            alignmentBaseline="middle"
            className="fill-primary font-black text-[8px] uppercase tracking-wider"
          >
            {connection.label}
          </text>
        </g>
      )}

      {/* CSS para animação de fluxo das setas de SLA estourado */}
      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -20;
          }
        }
      `}</style>
    </g>
  );
}
