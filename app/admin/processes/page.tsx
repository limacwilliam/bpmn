"use client";

import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Compass,
  Filter,
  GitBranch,
  Grid,
  Layers,
  List,
  Plus,
  Search,
} from "lucide-react";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import ProcessCard from "@/components/process/ProcessCard";
import ProcessTable, { ProcessTableItem } from "@/components/process/ProcessTable";
import { cn } from "@/lib/utils";

// Massa de dados realistas e alinhada com as informações operacionais da HIT
const PROCESS_REGISTRY_DATA: ProcessTableItem[] = [
  {
    id: "PRC-001",
    title: "Onboarding de Clientes Enterprise",
    department: "Customer Success",
    owner: "Mariana Souza",
    status: "ACTIVE",
    maturity: 4,
    slaStatus: "STABLE",
    riskLevel: "LOW",
    lastUpdate: "Ontem, às 16:30",
    type: "TO_BE",
  },
  {
    id: "PRC-002",
    title: "Faturamento e Cobrança Automatizada",
    department: "Faturamento",
    owner: "William Lima",
    status: "OPTIMIZING",
    maturity: 2,
    slaStatus: "CRITICAL",
    riskLevel: "CRITICAL",
    lastUpdate: "Há 4 horas",
    type: "AS_IS",
  },
  {
    id: "PRC-003",
    title: "Suporte e Provisionamento Cloud",
    department: "Tecnologia / TI",
    owner: "Carlos Ramos",
    status: "ACTIVE",
    maturity: 4,
    slaStatus: "STABLE",
    riskLevel: "LOW",
    lastUpdate: "Há 3 dias",
    type: "TO_BE",
  },
  {
    id: "PRC-004",
    title: "Aprovação de Orçamentos SAP",
    department: "Financeiro",
    owner: "Beatriz Mello",
    status: "DRAFT",
    maturity: 1,
    slaStatus: "DELAYED",
    riskLevel: "HIGH",
    lastUpdate: "Há 5 dias",
    type: "AS_IS",
  },
  {
    id: "PRC-005",
    title: "Auditoria de Compliance KYC",
    department: "Compliance",
    owner: "Mariana Souza",
    status: "ACTIVE",
    maturity: 5,
    slaStatus: "STABLE",
    riskLevel: "LOW",
    lastUpdate: "Há 2 horas",
    type: "TO_BE",
  },
];

// Departamentos únicos para filtro
const DEPARTMENTS = [
  "ALL",
  "Customer Success",
  "Faturamento",
  "Tecnologia / TI",
  "Financeiro",
  "Compliance",
];

export default function ProcessesPage() {
  const [viewMode, setViewMode] = useState<"TABLE" | "GRID">("TABLE");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [selectedType, setSelectedType] = useState("ALL");
  const [showFilters, setShowFilters] = useState(false);

  // Filtragem centralizada para alimentar estatísticas e views de forma integrada
  const filteredItems = useMemo(() => {
    return PROCESS_REGISTRY_DATA.filter((item) => {
      // 1. Busca por texto (título, ID, dono)
      const matchesSearch =
        !searchTerm.trim() ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.owner.toLowerCase().includes(searchTerm.toLowerCase());

      // 2. Filtro por Departamento
      const matchesDept = selectedDept === "ALL" || item.department === selectedDept;

      // 3. Filtro por Status
      const matchesStatus = selectedStatus === "ALL" || item.status === selectedStatus;

      // 4. Filtro por Tipo (AS IS / TO BE)
      const matchesType = selectedType === "ALL" || item.type === selectedType;

      return matchesSearch && matchesDept && matchesStatus && matchesType;
    });
  }, [searchTerm, selectedDept, selectedStatus, selectedType]);

  // Estatísticas dinâmicas com base nos itens filtrados (ou da base completa)
  const stats = useMemo(() => {
    const total = PROCESS_REGISTRY_DATA.length;
    const active = PROCESS_REGISTRY_DATA.filter((p) => p.status === "ACTIVE").length;
    const toBe = PROCESS_REGISTRY_DATA.filter((p) => p.type === "TO_BE").length;
    const criticalSla = PROCESS_REGISTRY_DATA.filter((p) => p.slaStatus === "CRITICAL").length;
    
    const sumMaturity = PROCESS_REGISTRY_DATA.reduce((acc, curr) => acc + curr.maturity, 0);
    const avgMaturity = total > 0 ? (sumMaturity / total).toFixed(1) : "0.0";

    return {
      total,
      active,
      toBe,
      criticalSla,
      avgMaturity,
    };
  }, []);

  return (
    <div className="space-y-8 select-none animate-page-in">
      {/* 1. Header do Módulo com Identidade HIT */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] font-black uppercase text-[#7A7268] tracking-widest">
              Gargalos & Modelagem BPMN 2.0
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-primary tracking-tight">
            Mapeamento de Processos
          </h1>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
            Central de controle corporativa para modelagem, monitoramento de SLAs e transição side-by-side de jornadas operacionais <span className="text-accent font-bold">AS IS</span> para <span className="text-accent font-bold">TO BE</span>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/bpmn"
            className="inline-flex items-center gap-2 bg-secondary text-primary hover:bg-muted border border-border px-5 py-2.5 rounded-full font-semibold text-xs transition-colors cursor-pointer select-none"
          >
            <GitBranch className="w-3.5 h-3.5 text-accent" />
            Canvas de Modelagem
          </Link>
          
          <Link
            href="/admin/processes/create"
            className="inline-flex items-center gap-2 bg-accent text-white hover:bg-accent-hover px-5 py-2.5 rounded-full font-semibold text-xs transition-colors shadow-md shadow-accent/25 cursor-pointer select-none"
          >
            <Plus className="w-3.5 h-3.5" />
            Novo Fluxo
          </Link>
        </div>
      </div>

      {/* 2. Cockpit de Estatísticas Super Premium (KPI Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
        
        {/* Card 1: Total Mapeados */}
        <div className="rounded-xl border border-border bg-background p-5 shadow-sm space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between border-b border-border/50 pb-2">
            <span className="text-[10px] font-black uppercase text-muted-foreground tracking-wider">
              Total de Processos
            </span>
            <div className="p-1.5 rounded-lg bg-accent/15 text-accent">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-3xl font-black text-primary block tracking-tight">
              {stats.total} Mapeamentos
            </span>
            <span className="text-[10px] font-semibold text-emerald-600 block">
              +1 novo rascunho esta semana
            </span>
          </div>
        </div>

        {/* Card 2: Maturidade Ponderada */}
        <div className="rounded-xl border border-border bg-background p-5 shadow-sm space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between border-b border-border/50 pb-2">
            <span className="text-[10px] font-black uppercase text-muted-foreground tracking-wider">
              Maturidade Ponderada
            </span>
            <div className="p-1.5 rounded-lg bg-accent/15 text-accent">
              <Compass className="w-4 h-4 animate-spin-slow" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-primary tracking-tight">
                {stats.avgMaturity}
              </span>
              <span className="text-xs font-bold text-muted-foreground">/ 5.0</span>
            </div>
            <div className="space-y-1">
              <div className="w-full h-1.5 bg-secondary border border-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent transition-all duration-300"
                  style={{ width: `${parseFloat(stats.avgMaturity) * 20}%` }}
                />
              </div>
              <span className="text-[9px] font-black uppercase text-[#7A7268] block">
                Nível 3: Sistematizado (HIT IA)
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Conformidade de SLAs */}
        <div className="rounded-xl border border-border bg-background p-5 shadow-sm space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between border-b border-border/50 pb-2">
            <span className="text-[10px] font-black uppercase text-muted-foreground tracking-wider">
              Eficiência e SLAs
            </span>
            <div className={cn(
              "p-1.5 rounded-lg",
              stats.criticalSla > 0 ? "bg-destructive/15 text-destructive animate-pulse" : "bg-emerald-100 text-emerald-800"
            )}>
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-3xl font-black text-primary block tracking-tight">
              {stats.criticalSla > 0 ? `${stats.criticalSla} Crítico` : "100% Estável"}
            </span>
            <span className={cn(
              "text-[10px] font-semibold block",
              stats.criticalSla > 0 ? "text-destructive font-bold" : "text-emerald-600"
            )}>
              {stats.criticalSla > 0
                ? "Faturamento pendente no SAP excedeu prazo"
                : "Todos os handoffs dentro do lead-time previsto"}
            </span>
          </div>
        </div>

        {/* Card 4: Jornadas Otimizadas (TO BE) */}
        <div className="rounded-xl border border-border bg-background p-5 shadow-sm space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between border-b border-border/50 pb-2">
            <span className="text-[10px] font-black uppercase text-muted-foreground tracking-wider">
              Transformação TO BE
            </span>
            <div className="p-1.5 rounded-lg bg-accent/15 text-accent">
              <GitBranch className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-3xl font-black text-primary block tracking-tight">
              {((stats.toBe / stats.total) * 100).toFixed(0)}% Eficiente
            </span>
            <span className="text-[10px] font-semibold text-muted-foreground block">
              {stats.toBe} jornadas otimizadas ativas
            </span>
          </div>
        </div>

      </div>

      {/* 3. Filtros Complexos e Controles de Visualização */}
      <div className="space-y-4">
        <div className="rounded-xl border border-border bg-background p-4 flex flex-col md:flex-row items-center justify-between gap-4 select-none">
          {/* Busca por texto */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Pesquisar por ID, título ou dono..."
              className="w-full h-10 pl-9 pr-4 text-xs bg-secondary/50 border border-border rounded-lg placeholder-muted-foreground focus:outline-none focus:border-accent focus:bg-background transition-all font-semibold text-primary"
            />
          </div>

          {/* Grupo de Ações / Controles */}
          <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "inline-flex items-center gap-2 border px-4 h-10 rounded-lg text-xs font-semibold cursor-pointer transition-all select-none",
                showFilters || selectedDept !== "ALL" || selectedStatus !== "ALL" || selectedType !== "ALL"
                  ? "bg-accent/10 border-accent text-accent"
                  : "border-border bg-background hover:bg-muted text-foreground"
              )}
            >
              <Filter className="w-3.5 h-3.5" />
              Filtros Avançados
            </button>

            {/* Alternador Tabela / Grid */}
            <div className="h-10 border border-border bg-secondary/40 rounded-lg p-1 flex items-center gap-1 select-none">
              <button
                onClick={() => setViewMode("TABLE")}
                className={cn(
                  "p-1.5 rounded-md transition-all cursor-pointer",
                  viewMode === "TABLE" ? "bg-background text-accent shadow-sm" : "text-muted-foreground hover:text-primary"
                )}
                title="Visualização em Tabela"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("GRID")}
                className={cn(
                  "p-1.5 rounded-md transition-all cursor-pointer",
                  viewMode === "GRID" ? "bg-background text-accent shadow-sm" : "text-muted-foreground hover:text-primary"
                )}
                title="Visualização em Grilha"
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Painel Expansível de Filtros Avançados */}
        {showFilters && (
          <div className="rounded-xl border border-border bg-secondary/30 p-5 grid grid-cols-1 sm:grid-cols-3 gap-5 select-none animate-page-in">
            {/* Filtro 1: Departamento */}
            <div className="space-y-1.5 text-xs font-semibold">
              <span className="text-[10px] font-black uppercase text-muted-foreground">Departamento</span>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full h-10 px-3 bg-background border border-border rounded-lg text-xs font-semibold focus:outline-none focus:border-accent text-primary"
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept === "ALL" ? "Todos os Departamentos" : dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro 2: Tipo de Jornada */}
            <div className="space-y-1.5 text-xs font-semibold">
              <span className="text-[10px] font-black uppercase text-muted-foreground">Modelo de Jornada</span>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full h-10 px-3 bg-background border border-border rounded-lg text-xs font-semibold focus:outline-none focus:border-accent text-primary"
              >
                <option value="ALL">Todas as Jornadas</option>
                <option value="AS_IS">AS IS (Modelagem Inicial / Gargalos)</option>
                <option value="TO_BE">TO BE (Automatizado / HIT IA)</option>
              </select>
            </div>

            {/* Filtro 3: Status de Governança */}
            <div className="space-y-1.5 text-xs font-semibold">
              <span className="text-[10px] font-black uppercase text-muted-foreground">Status do Processo</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full h-10 px-3 bg-background border border-border rounded-lg text-xs font-semibold focus:outline-none focus:border-accent text-primary"
              >
                <option value="ALL">Todos os Status</option>
                <option value="ACTIVE">Ativo em Produção</option>
                <option value="OPTIMIZING">Em Otimização</option>
                <option value="DRAFT">Rascunho de Modelagem</option>
                <option value="DEPRECATED">Obsoleto / Deprecado</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* 4. Renderização Condicional de Exibição (Tabela / Grid) */}
      <div className="select-none">
        {viewMode === "TABLE" ? (
          <ProcessTable
            items={filteredItems}
            searchTerm="" // Passado vazio porque filtramos de forma centralizada no page.tsx
            selectedDept="ALL"
            selectedStatus="ALL"
            selectedType="ALL"
          />
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <ProcessCard key={item.id} {...item} />
              ))}
            </div>
            {filteredItems.length === 0 && (
              <div className="rounded-xl border border-dashed border-border bg-background p-12 text-center text-xs text-muted-foreground font-semibold">
                Nenhum processo operacional atende aos critérios dos filtros ativos.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

