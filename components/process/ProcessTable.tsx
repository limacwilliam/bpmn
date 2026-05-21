"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, ArrowUpDown, ChevronLeft, ChevronRight, Eye, GitBranch, Sliders } from "lucide-react";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import ProcessStatusBadge, { ProcessStatusType, ProcessType } from "./ProcessStatusBadge";

export interface ProcessTableItem {
  id: string;
  title: string;
  department: string;
  status: ProcessStatusType;
  owner: string;
  maturity: number;
  slaStatus: "STABLE" | "DELAYED" | "CRITICAL";
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  lastUpdate: string;
  type: ProcessType;
}

interface ProcessTableProps {
  items?: ProcessTableItem[];
  searchTerm?: string;
  selectedDept?: string;
  selectedStatus?: string;
  selectedType?: string;
  className?: string;
}

export default function ProcessTable({
  items = [],
  searchTerm = "",
  selectedDept = "ALL",
  selectedStatus = "ALL",
  selectedType = "ALL",
  className,
}: ProcessTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof ProcessTableItem>("title");
  const [sortAsc, setSortAsc] = useState(true);
  
  const itemsPerPage = 5;

  // Filtra e ordena a massa de dados
  const processedItems = useMemo(() => {
    let filtered = [...items];

    // 1. Busca por texto (título, ID, dono)
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.id.toLowerCase().includes(q) ||
          item.owner.toLowerCase().includes(q)
      );
    }

    // 2. Filtro por Departamento
    if (selectedDept !== "ALL") {
      filtered = filtered.filter((item) => item.department === selectedDept);
    }

    // 3. Filtro por Status
    if (selectedStatus !== "ALL") {
      filtered = filtered.filter((item) => item.status === selectedStatus);
    }

    // 4. Filtro por Tipo (AS IS / TO BE)
    if (selectedType !== "ALL") {
      filtered = filtered.filter((item) => item.type === selectedType);
    }

    // 5. Ordenação
    filtered.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortAsc ? aVal - bVal : bVal - aVal;
      }
      return sortAsc
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

    return filtered;
  }, [items, searchTerm, selectedDept, selectedStatus, selectedType, sortField, sortAsc]);

  // Paginação
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return processedItems.slice(start, start + itemsPerPage);
  }, [processedItems, currentPage]);

  const totalPages = Math.ceil(processedItems.length / itemsPerPage) || 1;

  const handleSort = (field: keyof ProcessTableItem) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
    setCurrentPage(1);
  };

  return (
    <div className={cn("space-y-4 select-none", className)}>
      <div className="rounded-xl border border-border bg-background overflow-hidden shadow-sm">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse text-xs font-semibold text-primary">
            <thead className="bg-secondary text-[10px] font-black uppercase tracking-wider text-muted-foreground border-b border-border select-none">
              <tr>
                {/* Colunas Claves com suporte a Ordenação */}
                <th className="py-4 px-6 cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => handleSort("title")}>
                  <div className="flex items-center gap-1">
                    ID / Processo
                    <ArrowUpDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th className="py-4 px-6 cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => handleSort("department")}>
                  <div className="flex items-center gap-1">
                    Departamento
                    <ArrowUpDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th className="py-4 px-6 cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => handleSort("owner")}>
                  <div className="flex items-center gap-1">
                    Dono
                    <ArrowUpDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th className="py-4 px-6 cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => handleSort("maturity")}>
                  <div className="flex items-center gap-1">
                    Maturidade
                    <ArrowUpDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th className="py-4 px-6">Tipo</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-medium">
              {paginatedItems.map((process, idx) => (
                <tr key={idx} className="hover:bg-muted/40 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-0.5">
                      <Link
                        href={`/admin/processes/${process.id}`}
                        className="font-bold text-primary text-sm hover:text-accent transition-colors"
                      >
                        {process.title}
                      </Link>
                      <span className="text-[10px] text-muted-foreground font-mono">
                        {process.id} • Ref: {process.lastUpdate}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-muted-foreground">{process.department}</td>
                  <td className="py-4 px-6 text-primary font-bold">{process.owner}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1.5 font-black">
                      <div className="w-8 h-2 bg-secondary border border-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent"
                          style={{ width: `${process.maturity * 20}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-primary">{process.maturity} / 5</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <ProcessStatusBadge type={process.type} />
                  </td>
                  <td className="py-4 px-6">
                    <ProcessStatusBadge status={process.status} />
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      href={`/admin/processes/${process.id}`}
                      className="inline-flex items-center gap-1.5 bg-secondary text-primary hover:bg-accent hover:text-white px-3 py-1.5 rounded-lg border border-border hover:border-accent text-[11px] font-bold transition-all"
                    >
                      Auditar
                      <Eye className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
              {paginatedItems.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-xs text-muted-foreground">
                    Nenhum processo operacional atende aos critérios dos filtros ativos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-xs select-none">
          <span className="text-muted-foreground font-semibold">
            Página {currentPage} de {totalPages} • Total de {processedItems.length} registros
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-border bg-background hover:bg-muted text-foreground transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-border bg-background hover:bg-muted text-foreground transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
