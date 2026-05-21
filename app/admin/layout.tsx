"use client";

import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();
  const isPresentationMode = pathname === "/admin/presentation";

  return (
    <div className="flex min-h-screen bg-secondary/30 transition-colors duration-200 overflow-x-hidden custom-scrollbar">
      {/* 1. Sidebar Retrátil Lateral */}
      {!isPresentationMode && (
        <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      )}

      {/* 2. Container de Conteúdo Principal */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Header superior */}
        {!isPresentationMode && <Header />}

        {/* Área de Visualização das Páginas dos Módulos */}
        <main className={cn(
          "flex-1 bg-background text-foreground custom-scrollbar overflow-x-hidden overflow-y-auto animate-page-in",
          isPresentationMode ? "p-0" : "dashboard-padding"
        )}>
          <div className={cn(
            "mx-auto space-y-8",
            isPresentationMode ? "max-w-none p-0 pb-0" : "max-w-7xl pb-12"
          )}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
