import { cn } from "@/lib/utils";
import { GitCommit, Info, HelpCircle, Network, User } from "lucide-react";
import React, { useState } from "react";

interface GraphNode {
  id: string;
  label: string;
  owner: string;
  activeStaff: number;
  role: string;
  x: number;
  y: number;
}

interface GraphEdge {
  from: string;
  to: string;
  latencyHours: number;
  status: "healthy" | "atfriction" | "congested";
}

const NODES: GraphNode[] = [
  { id: "COM", label: "Comercial", owner: "Mariana Costa", activeStaff: 8, role: "Kickoff e KYC Inicial", x: 40, y: 110 },
  { id: "ENG", label: "Engenharia", owner: "Carlos Ramos", activeStaff: 5, role: "Validação Geográfica", x: 190, y: 50 },
  { id: "LOG", label: "Logística", owner: "Marcos Souza", activeStaff: 12, role: "Frete e Envio Hardware", x: 190, y: 170 },
  { id: "NOC", label: "NOC Técnico", owner: "Amanda Lima", activeStaff: 15, role: "Configuração CLI Switch", x: 340, y: 110 },
  { id: "CS", label: "CS / NOC N1", owner: "Juliana Mendes", activeStaff: 10, role: "Hypercare e Suporte", x: 480, y: 110 },
];

const EDGES: GraphEdge[] = [
  { from: "COM", to: "ENG", latencyHours: 48, status: "atfriction" },
  { from: "COM", to: "LOG", latencyHours: 12, status: "healthy" },
  { from: "ENG", to: "NOC", latencyHours: 72, status: "congested" },
  { from: "LOG", to: "NOC", latencyHours: 36, status: "atfriction" },
  { from: "NOC", to: "CS", latencyHours: 24, status: "healthy" },
];

export default function OperationalGraph() {
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);

  // Encontra as coordenadas de início e fim para desenhar as setas do SVG
  const getCoordinates = (id: string) => {
    const node = NODES.find((n) => n.id === id);
    return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
  };

  return (
    <div className="rounded-2xl border border-border bg-background p-6 space-y-6 select-none flex flex-col justify-between h-full">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4 gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-accent" />
            <h3 className="font-black text-sm uppercase tracking-wider text-primary">
              Malha de Handoffs & Dependências (SVG)
            </h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Representação visual das transferências operacionais e latência entre setores.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Grafo SVG (Left) */}
        <div className="lg:col-span-8 flex flex-col items-center justify-center bg-secondary/5 border border-border/80 rounded-2xl p-4 overflow-x-auto">
          <svg className="w-full min-w-[520px] h-[220px]" viewBox="0 0 540 220">
            {/* Definições de Marcador de Seta */}
            <defs>
              <marker id="arrow-healthy" viewBox="0 0 10 10" refX="18" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#10B981" />
              </marker>
              <marker id="arrow-atfriction" viewBox="0 0 10 10" refX="18" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#F15A22" />
              </marker>
              <marker id="arrow-congested" viewBox="0 0 10 10" refX="18" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#EF4444" />
              </marker>
            </defs>

            {/* Linhas de Conexão (Edges) */}
            {EDGES.map((edge, idx) => {
              const start = getCoordinates(edge.from);
              const end = getCoordinates(edge.to);

              let strokeColor = "#E5E0DB";
              let markerId = "arrow-healthy";
              let animationClass = "";

              if (edge.status === "healthy") {
                strokeColor = "#10B981";
                markerId = "arrow-healthy";
                animationClass = "animate-dash-slow";
              } else if (edge.status === "atfriction") {
                strokeColor = "#F15A22";
                markerId = "arrow-atfriction";
                animationClass = "animate-dash-medium";
              } else if (edge.status === "congested") {
                strokeColor = "#EF4444";
                markerId = "arrow-congested";
                animationClass = "animate-dash-fast";
              }

              return (
                <g key={idx}>
                  <path
                    d={`M ${start.x} ${start.y} L ${end.x} ${end.y}`}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth="2.5"
                    strokeDasharray="6, 4"
                    markerEnd={`url(#${markerId})`}
                    className={cn("opacity-80 transition-all", animationClass)}
                  />
                  {/* Badge de Horas no meio da linha */}
                  <rect
                    x={(start.x + end.x) / 2 - 14}
                    y={(start.y + end.y) / 2 - 9}
                    width="28"
                    height="18"
                    rx="4"
                    fill="white"
                    stroke={strokeColor}
                    strokeWidth="1"
                  />
                  <text
                    x={(start.x + end.x) / 2}
                    y={(start.y + end.y) / 2 + 3}
                    textAnchor="middle"
                    fill="#1C1208"
                    fontSize="8.5"
                    fontWeight="black"
                    fontFamily="monospace"
                  >
                    {edge.latencyHours}h
                  </text>
                </g>
              );
            })}

            {/* Nós Operacionais (Nodes) */}
            {NODES.map((node) => {
              const isHovered = hoveredNode?.id === node.id;
              return (
                <g 
                  key={node.id}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="15"
                    fill={isHovered ? "hsl(var(--accent))" : "hsl(var(--primary))"}
                    stroke="white"
                    strokeWidth="2.5"
                    className="transition-colors duration-200"
                  />
                  <text
                    x={node.x}
                    y={node.y + 4}
                    textAnchor="middle"
                    fill="white"
                    fontSize="9.5"
                    fontWeight="black"
                    fontFamily="sans-serif"
                  >
                    {node.id}
                  </text>
                  <text
                    x={node.x}
                    y={node.y + 28}
                    textAnchor="middle"
                    fill="#1C1208"
                    fontSize="9"
                    fontWeight="black"
                    className="uppercase tracking-wide"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Detalhes do Nó Hovered (Right) */}
        <div className="lg:col-span-4 border border-border rounded-2xl bg-secondary/15 p-5 space-y-4 h-full flex flex-col justify-center">
          {hoveredNode ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-border pb-2.5">
                <span className="text-[10px] font-black uppercase bg-[#1C1208]/10 text-primary px-2 py-0.5 rounded font-mono">
                  Setor: {hoveredNode.id}
                </span>
                <span className="text-[9px] font-bold text-muted-foreground uppercase">
                  Staff: {hoveredNode.activeStaff} Ativos
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="text-xs font-black text-primary uppercase tracking-wide leading-none">
                  {hoveredNode.label}
                </h4>
                <span className="text-[9px] font-bold text-[#7A7268] block">
                  Responsável: {hoveredNode.owner}
                </span>
              </div>

              <div className="p-3 bg-white dark:bg-background border border-border/80 rounded-xl space-y-1 text-xs">
                <span className="font-bold text-primary flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-accent" />
                  <span>Atribuição Operacional:</span>
                </span>
                <p className="text-muted-foreground leading-normal text-[10.5px]">
                  {hoveredNode.role}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3.5 text-center py-4">
              <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center text-accent mx-auto animate-pulse">
                <Network className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-black text-primary uppercase block">Grafo de Handoffs</span>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Passe o mouse (hover) sobre as bolhas dos departamentos para auditar atribuições, equipes e líderes técnicos.
                </p>
              </div>
            </div>
          )}

          {/* Legenda rápida */}
          <div className="pt-3 border-t border-border/60 flex items-center justify-around text-[9px] font-bold text-muted-foreground select-none">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Saudável</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span>Atrito</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-destructive" />
              <span>Gargalo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
