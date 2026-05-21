"use client";

import React from "react";
import { SwimlaneType } from "./types";

interface SwimlaneProps {
  lane: SwimlaneType;
  width: number;
}

export default function Swimlane({ lane, width }: SwimlaneProps) {
  return (
    <div
      className="relative border-b border-border flex items-stretch select-none"
      style={{
        height: `${lane.height}px`,
        width: `${width}px`,
        backgroundColor: lane.color
      }}
    >
      {/* Setor Header (Rótulo vertical no lado esquerdo) */}
      <div className="w-14 border-r border-border bg-secondary/80 flex items-center justify-center relative shrink-0 select-none">
        <span className="rotate-270 whitespace-nowrap text-[10px] font-black uppercase text-[#7A7268] tracking-widest block transform -rotate-90">
          {lane.name}
        </span>
      </div>

      {/* Área da Raia em si */}
      <div className="flex-1 relative overflow-hidden" />
    </div>
  );
}
