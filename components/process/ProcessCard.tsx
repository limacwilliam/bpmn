"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, Compass, Layers, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import ProcessStatusBadge, { ProcessStatusType, ProcessType } from "./ProcessStatusBadge";

interface ProcessCardProps {
  id: string;
  title: string;
  department: string;
  status: ProcessStatusType;
  owner: string;
  maturity: number;
  type: ProcessType;
  lastUpdate: string;
  className?: string;
}

export default function ProcessCard({
  id,
  title,
  department,
  status,
  owner,
  maturity,
  type,
  lastUpdate,
  className,
}: ProcessCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-background p-5 space-y-4 select-none shadow-sm flex flex-col justify-between transition-all hover:shadow-md hover:border-accent/30",
        className
      )}
    >
      {/* 1. Header do Card com badges de tipo e status */}
      <div className="space-y-2 select-none">
        <div className="flex items-center justify-between gap-2 border-b border-border/50 pb-2">
          <ProcessStatusBadge type={type} />
          <ProcessStatusBadge status={status} />
        </div>

        <div className="space-y-1">
          <span className="text-[9px] font-mono text-muted-foreground block">{id}</span>
          <Link
            href={`/admin/processes/${id}`}
            className="font-black text-sm text-primary hover:text-accent transition-colors block leading-snug truncate"
          >
            {title}
          </Link>
          <span className="text-[10px] font-black uppercase text-[#7A7268] tracking-wider block">
            {department}
          </span>
        </div>
      </div>

      {/* 2. Barra de Maturidade Simplificada */}
      <div className="space-y-1 select-none">
        <div className="flex items-center justify-between text-[9px] font-black uppercase text-muted-foreground tracking-wider">
          <span className="flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-accent animate-pulse" />
            Maturidade
          </span>
          <span className="text-primary font-bold">{maturity} / 5</span>
        </div>
        <div className="w-full h-2 bg-secondary border border-border rounded-full overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-300"
            style={{ width: `${maturity * 20}%` }}
          />
        </div>
      </div>

      {/* 3. Rodapé do Card com Dono e Data */}
      <div className="flex items-center justify-between pt-3 border-t border-border select-none gap-2">
        <div className="flex items-center gap-1.5 min-w-0 text-[10px] font-semibold text-primary">
          <User className="w-3.5 h-3.5 text-accent flex-shrink-0" />
          <span className="truncate">{owner}</span>
        </div>
        
        <Link
          href={`/admin/processes/${id}`}
          className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-secondary border border-border hover:bg-accent hover:text-white hover:border-accent text-primary transition-all flex-shrink-0"
        >
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
