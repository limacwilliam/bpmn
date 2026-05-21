"use client";

import React, { useState, useEffect } from "react";
import {
  Boxes,
  Code,
  Download,
  History,
  Info,
  Maximize2,
  Minimize2,
  Play,
  RotateCcw,
  Save,
  Sparkles,
  Upload,
  Zap,
  CheckCircle,
  FileCode,
  Flame
} from "lucide-react";
import { asIsDiagram, toBeDiagram, versionHistory } from "@/components/bpmn/mockData";
import { BPMNNode, BPMNDiagramData, BPMNNodeType } from "@/components/bpmn/types";
import BPMNCanvas from "@/components/bpmn/BPMNCanvas";
import BPMNToolbar from "@/components/bpmn/BPMNToolbar";
import BPMNInspector from "@/components/bpmn/BPMNInspector";
import BPMNMinimap from "@/components/bpmn/BPMNMinimap";
import BPMNVersionHistory from "@/components/bpmn/BPMNVersionHistory";
import BPMNAnalyticsOverlay from "@/components/bpmn/BPMNAnalyticsOverlay";
import BPMNComparisonView from "@/components/bpmn/BPMNComparisonView";

export default function BPMNClient() {
  // Estados Principais do Modelador
  const [workflowMode, setWorkflowMode] = useState<"AS_IS" | "TO_BE" | "COMPARISON">("TO_BE");
  const [activeVersion, setActiveVersion] = useState<string>("v2.1");
  const [diagramData, setDiagramData] = useState<BPMNDiagramData>(toBeDiagram);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isAnalyticsMode, setIsAnalyticsMode] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(100);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "info" | "warning" } | null>(null);

  const handleWorkflowModeChange = (mode: "AS_IS" | "TO_BE" | "COMPARISON") => {
    setWorkflowMode(mode);

    if (mode === "AS_IS") {
      setDiagramData(asIsDiagram);
      setActiveVersion("v1.0");
      return;
    }

    if (mode === "TO_BE") {
      setDiagramData(toBeDiagram);
      setActiveVersion("v2.1");
    }
  };

  // Alert/Toast Auto-close
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // 1. Atualizar coordenadas de nós arrastados
  const handlePositionChange = (id: string, x: number, y: number) => {
    setDiagramData((prev) => {
      const updatedNodes = prev.nodes.map((node) => {
        if (node.id === id) {
          return { ...node, x, y };
        }
        return node;
      });
      return { ...prev, nodes: updatedNodes };
    });
  };

  // 2. Atualizar metadados de nós via Inspector
  const handleUpdateNode = (updatedNode: BPMNNode) => {
    setDiagramData((prev) => {
      const updatedNodes = prev.nodes.map((node) => {
        if (node.id === updatedNode.id) {
          return updatedNode;
        }
        return node;
      });
      return { ...prev, nodes: updatedNodes };
    });
  };

  // 3. Adicionar elemento interativo ao canvas
  const handleAddElement = (type: BPMNNodeType) => {
    const randomId = `node-custom-${Math.floor(Math.random() * 1000)}`;
    const newNode: BPMNNode = {
      id: randomId,
      type,
      title: `Novo(a) ${type.toLowerCase().replace("_", " ")}`,
      laneId: "lane-com",
      x: 150 + Math.random() * 50,
      y: 65,
      metadata: {
        owner: "Colaborador HIT",
        description: "Nova etapa operacional adicionada interativamente.",
        sla: "24 horas",
        systems: ["HIT Platform"],
        input: "Entrada Padrão",
        output: "Saída Padrão"
      }
    };

    setDiagramData((prev) => ({
      ...prev,
      nodes: [...prev.nodes, newNode]
    }));

    setSelectedNodeId(randomId);
    setNotification({
      message: `Elemento ${type} adicionado com sucesso!`,
      type: "success"
    });
  };

  // 4. Ações de Exportação Executiva
  const handleExport = (format: "PNG" | "PDF" | "SVG") => {
    setNotification({
      message: `Exportando diagrama do fluxo no formato ${format}...`,
      type: "info"
    });

    setTimeout(() => {
      setNotification({
        message: `Diagrama ${diagramData.version} exportado com sucesso no formato ${format}! Check seu diretório de Downloads.`,
        type: "success"
      });
    }, 1500);
  };

  // 5. Salvar Modificações no Banco (Simulado)
  const handleSave = () => {
    setNotification({
      message: "Persistindo alterações do layout no banco de dados Supabase...",
      type: "info"
    });

    setTimeout(() => {
      setNotification({
        message: `Workflow de implantação salvo no banco Prisma! Versão ${activeVersion} atualizada.`,
        type: "success"
      });
    }, 1800);
  };

  // 6. Selecionar Versão Histórica
  const handleSelectVersion = (version: string) => {
    setActiveVersion(version);
    setIsHistoryOpen(false);

    if (version === "v1.0") {
      setWorkflowMode("AS_IS");
      setDiagramData(asIsDiagram);
      setNotification({
        message: `Carregada Versão Histórica v1.0 (Fluxo Legado AS IS).`,
        type: "info"
      });
    } else {
      setWorkflowMode("TO_BE");
      setDiagramData(toBeDiagram);
      setNotification({
        message: `Carregada Versão Otimizada ${version} (Jornada TO BE).`,
        type: "success"
      });
    }
  };

  // 7. Simular Validação Inteligente da IA de Process Mining
  const handleIaValidate = () => {
    setNotification({
      message: "HIT Geo-AI Agent analisando fluxos de handoff e latências...",
      type: "info"
    });

    setTimeout(() => {
      if (workflowMode === "AS_IS") {
        setNotification({
          message: "IA HIT: Detectados 5 gargalos severos de Handoff manual. Sugerido transição urgente para o modelo TO BE.",
          type: "warning"
        });
      } else {
        setNotification({
          message: "IA HIT: Fluxo validado com sucesso! Redução média de 115 horas projetada e conformidade global de 99.8%.",
          type: "success"
        });
      }
    }, 2000);
  };

  // Zoom Helpers
  const handleZoomIn = () => setZoom((z) => Math.min(z + 10, 150));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 10, 50));
  const handleResetZoom = () => setZoom(100);

  const selectedNode = diagramData.nodes.find((n) => n.id === selectedNodeId) || null;

  return (
    <div className="space-y-8 select-none relative h-full">
      {/* Toast de Notificação Premium */}
      {notification && (
        <div
          className={`fixed bottom-4 right-4 z-50 p-4 rounded-xl border shadow-2xl flex items-center gap-3 animate-[slide-in-right_0.25s_ease-out] max-w-sm text-left ${
            notification.type === "success"
              ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-800 dark:text-emerald-400"
              : notification.type === "warning"
              ? "bg-amber-500/15 border-amber-500/30 text-amber-800 dark:text-amber-400"
              : "bg-primary/10 border-border text-primary"
          }`}
        >
          <Zap className="w-5 h-5 shrink-0 animate-pulse" />
          <span className="text-[11px] font-bold leading-normal">{notification.message}</span>
        </div>
      )}

      {/* 1. Header do Módulo */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-left">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl md:text-4xl font-black text-primary tracking-tight">
              Mapeamento Visual BPMN 2.0
            </h1>
            <span className="text-[10px] font-black uppercase text-[#F15A22] bg-[#F15A22]/10 border border-[#F15A22]/20 px-2.5 py-0.5 rounded-full tracking-wider animate-pulse">
              Cockpit Executivo
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
            Análise e modelagem dinâmica da jornada de implantação de conectividade corporativa da HIT. Visualize atritos operacionais, SLAs e automação por inteligência artificial.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setNotification({ message: "Carregando XML BPMN externo de integração...", type: "info" });
            }}
            className="inline-flex items-center gap-2 bg-secondary text-primary hover:bg-muted border border-border px-5 py-2.5 rounded-full font-bold text-xs transition-colors cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-accent" />
            Importar XML
          </button>

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 bg-accent text-white hover:bg-accent-hover px-5 py-2.5 rounded-full font-bold text-xs transition-colors shadow-md shadow-accent/25 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            Salvar Alterações
          </button>
        </div>
      </div>

      {/* 2. Barra de Ferramentas / Utilidades */}
      <BPMNToolbar
        workflowMode={workflowMode}
        onChangeWorkflowMode={handleWorkflowModeChange}
        isAnalyticsMode={isAnalyticsMode}
        onToggleAnalyticsMode={() => setIsAnalyticsMode(!isAnalyticsMode)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onAddElement={handleAddElement}
        onExport={handleExport}
        activeVersion={activeVersion}
      />

      {/* 3. Área de Trabalho Principal */}
      {workflowMode === "COMPARISON" ? (
        <BPMNComparisonView />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 relative">
          {/* Caixa de Ferramentas de Inserção Flutuante Lateral */}
          <div className="xl:col-span-2 rounded-2xl border border-border bg-background p-4 flex flex-row xl:flex-col gap-4 items-stretch justify-start h-auto xl:h-[580px] text-left">
            <div>
              <h3 className="text-[10px] font-black uppercase text-[#7A7268] tracking-widest border-b border-border pb-2 mb-3">
                Elementos BPMN
              </h3>
              <div className="grid grid-cols-5 xl:grid-cols-2 gap-2 w-full">
                <button
                  onClick={() => handleAddElement("START")}
                  className="h-12 border border-border hover:border-emerald-500 rounded-xl bg-secondary/35 hover:bg-emerald-500/5 flex flex-col items-center justify-center text-primary hover:text-emerald-600 transition-all cursor-pointer"
                >
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-emerald-600 fill-emerald-600" />
                  <span className="text-[7.5px] font-black uppercase tracking-wider mt-1.5">Início</span>
                </button>
                <button
                  onClick={() => handleAddElement("USER_TASK")}
                  className="h-12 border border-border hover:border-accent rounded-xl bg-secondary/35 hover:bg-accent/5 flex flex-col items-center justify-center text-primary hover:text-accent transition-all cursor-pointer"
                >
                  <div className="w-4.5 h-3 border-2 border-current rounded-xs" />
                  <span className="text-[7.5px] font-black uppercase tracking-wider mt-1.5">Tarefa</span>
                </button>
                <button
                  onClick={() => handleAddElement("DECISION_GATEWAY")}
                  className="h-12 border border-border hover:border-accent rounded-xl bg-secondary/35 hover:bg-accent/5 flex flex-col items-center justify-center text-primary hover:text-accent transition-all cursor-pointer"
                >
                  <div className="w-3 h-3 border-2 border-current rotate-45 flex items-center justify-center text-[7px]">+</div>
                  <span className="text-[7.5px] font-black uppercase tracking-wider mt-1.5">Gateway</span>
                </button>
                <button
                  onClick={() => handleAddElement("END")}
                  className="h-12 border border-border hover:border-destructive rounded-xl bg-secondary/35 hover:bg-destructive/5 flex flex-col items-center justify-center text-primary hover:text-destructive transition-all cursor-pointer"
                >
                  <div className="w-3.5 h-3.5 rounded-full border-4 border-double border-destructive" />
                  <span className="text-[7.5px] font-black uppercase tracking-wider mt-1.5">Fim</span>
                </button>
                <button
                  onClick={() => handleAddElement("CUSTOMER_TOUCHPOINT")}
                  className="h-12 border border-border hover:border-accent rounded-xl bg-secondary/35 hover:bg-accent/5 flex flex-col items-center justify-center text-primary hover:text-accent transition-all cursor-pointer col-span-1 xl:col-span-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="text-[7.5px] font-black uppercase tracking-wider mt-1.5">CS Node</span>
                </button>
              </div>
            </div>

            <div className="border-t border-border pt-4 mt-auto space-y-3.5 hidden xl:block">
              <div>
                <h4 className="text-[9px] font-black uppercase text-[#7A7268] tracking-widest mb-1.5">
                  Auditoria Inteligente
                </h4>
                <button
                  onClick={handleIaValidate}
                  className="w-full h-9 rounded-xl border border-border bg-background hover:bg-muted text-[10px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
                  Validar com IA
                </button>
              </div>

              <div>
                <h4 className="text-[9px] font-black uppercase text-[#7A7268] tracking-widest mb-1.5">
                  Exportação
                </h4>
                <button
                  onClick={() => handleExport("PDF")}
                  className="w-full h-9 rounded-xl border border-border bg-background hover:bg-muted text-[10px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <FileCode className="w-3.5 h-3.5 text-muted-foreground" />
                  Visualizar XML
                </button>
              </div>
            </div>
          </div>

          {/* Canvas Principal */}
          <div className="xl:col-span-10 relative flex flex-col xl:flex-row gap-6">
            {/* Canvas Container */}
            <BPMNCanvas
              swimlanes={diagramData.swimlanes}
              nodes={diagramData.nodes}
              connections={diagramData.connections}
              selectedNodeId={selectedNodeId}
              onSelectNode={setSelectedNodeId}
              isAnalyticsMode={isAnalyticsMode}
              workflowMode={diagramData.mode}
              zoom={zoom}
              onPositionChange={handlePositionChange}
            />

            {/* Minimapa e Controles Físicos de Zoom */}
            <BPMNMinimap
              nodes={diagramData.nodes}
              zoom={zoom}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onResetZoom={handleResetZoom}
            />

            {/* Barra Inteligente de Analytics */}
            <BPMNAnalyticsOverlay workflowMode={diagramData.mode} isOpen={isAnalyticsMode} />

            {/* Painel Histórico de Versões */}
            <BPMNVersionHistory
              isOpen={isHistoryOpen}
              onClose={() => setIsHistoryOpen(false)}
              selectedVersion={activeVersion}
              onSelectVersion={handleSelectVersion}
            />

            {/* Inspector Lateral de Nós */}
            <BPMNInspector
              node={selectedNode}
              isOpen={selectedNode !== null}
              onClose={() => setSelectedNodeId(null)}
              onUpdateNode={handleUpdateNode}
              workflowMode={diagramData.mode}
            />
          </div>
        </div>
      )}
    </div>
  );
}
