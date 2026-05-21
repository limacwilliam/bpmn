import React from "react";

export default function AdminLoading() {
  return (
    <div className="space-y-8 select-none animate-pulse">
      {/* 1. Cabeçalho Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          {/* Título principal */}
          <div className="h-9 w-64 bg-muted rounded-lg" />
          {/* Descrição */}
          <div className="h-4 w-96 bg-muted/65 rounded" />
        </div>
        
        {/* Botões do header */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-36 bg-muted rounded-full" />
          <div className="h-10 w-36 bg-muted rounded-full" />
        </div>
      </div>

      {/* 2. Grid de Métricas Widgets Skeleton (4 colunas) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-xl border border-border p-6 bg-background space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                {/* Título do KPI */}
                <div className="h-3.5 w-24 bg-muted rounded" />
                {/* Valor */}
                <div className="h-8 w-16 bg-muted rounded-md" />
              </div>
              {/* Ícone */}
              <div className="h-12 w-12 bg-muted/85 rounded-lg" />
            </div>
            {/* Sparkline & Trend */}
            <div className="flex items-center justify-between pt-4 border-t border-border/30">
              <div className="h-3 w-16 bg-muted rounded" />
              <div className="h-6 w-24 bg-muted/60 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* 3. Área de Conteúdo Grid Duplo Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Painel Esquerdo */}
        <div className="rounded-xl border border-border bg-background p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="h-5 w-40 bg-muted rounded" />
            <div className="h-5 w-16 bg-muted rounded-full" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 rounded-lg bg-secondary/35 border border-border/60 flex items-center justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="h-4.5 w-48 bg-muted rounded" />
                  <div className="h-3.5 w-72 bg-muted/60 rounded" />
                </div>
                <div className="h-7 w-7 bg-muted rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Painel Direito */}
        <div className="rounded-xl border border-border bg-background p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="h-5 w-40 bg-muted rounded" />
            <div className="h-5 w-16 bg-muted rounded-full" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-3 border-b border-border/50 pb-4 last:border-b-0 last:pb-0">
                <div className="h-4 w-4 bg-muted rounded-full mt-1 flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-full bg-muted rounded" />
                  <div className="h-3 w-24 bg-muted/50 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
