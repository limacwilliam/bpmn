"use client";

import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import React, { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-secondary/30 transition-colors duration-200 overflow-x-hidden custom-scrollbar">
      {/* 1. Sidebar Retrátil Lateral */}
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      {/* 2. Container de Conteúdo Principal */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Header superior */}
        <Header />

        {/* Área de Visualização das Páginas dos Módulos */}
        <main className="flex-1 bg-background text-foreground dashboard-padding custom-scrollbar overflow-x-hidden overflow-y-auto animate-page-in">
          <div className="max-w-7xl mx-auto space-y-8 pb-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
