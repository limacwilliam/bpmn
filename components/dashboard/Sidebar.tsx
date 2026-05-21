"use client";

import { NAVIGATION_GROUPS } from "@/config/navigation";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  Search,
  UserCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo, useState } from "react";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");

  // Filtra itens de navegação em tempo real com base no input de busca
  const filteredGroups = useMemo(() => {
    if (!searchTerm.trim()) return NAVIGATION_GROUPS;

    return NAVIGATION_GROUPS.map((group) => {
      const items = group.items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return { ...group, items };
    }).filter((group) => group.items.length > 0);
  }, [searchTerm]);

  return (
    <aside
      className={cn(
        "relative z-30 flex flex-col min-h-screen bg-[#1C1208] text-white border-r border-[#E5E0DB]/10 transition-all duration-300 ease-in-out shadow-xl custom-scrollbar overflow-y-auto select-none",
        collapsed ? "w-20" : "w-72"
      )}
    >
      {/* 1. Logo & Cabeçalho da Marca HIT */}
      <div className="flex items-center justify-between h-20 px-6 border-b border-[#E5E0DB]/10">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="relative flex-shrink-0 w-8 h-8 overflow-hidden rounded-lg bg-white/10 p-0.5">
            <Image
              src="/logo-hit.png"
              alt="HIT Logo"
              fill
              className="object-contain p-1"
              priority
            />
          </div>
          {!collapsed && (
            <div className="flex flex-col select-none">
              <span className="font-black text-lg tracking-wider leading-none text-white">
                HIT
              </span>
              <span className="text-[10px] font-semibold text-accent uppercase tracking-widest leading-none mt-1">
                Governance
              </span>
            </div>
          )}
        </div>

        {/* Botão de colapso retrátil */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-7 flex items-center justify-center w-6 h-6 rounded-full border border-border bg-background dark:bg-secondary text-foreground hover:text-accent hover:border-accent shadow-sm transition-all hover:scale-105 cursor-pointer z-40"
        >
          {collapsed ? (
            <ChevronRight className="w-3.5 h-3.5" />
          ) : (
            <ChevronLeft className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* 2. Barra de Busca Executiva Rápida */}
      {!collapsed && (
        <div className="px-4 py-3">
          <div className="relative flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Filtrar módulos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-9 pl-9 pr-4 text-xs bg-white/5 border border-white/10 rounded-lg text-white placeholder-muted-foreground focus:outline-none focus:border-accent focus:bg-white/10 transition-all font-medium"
            />
          </div>
        </div>
      )}

      {/* 3. Navegação por Grupos */}
      <nav className="flex-1 px-3 py-4 space-y-6 overflow-x-hidden custom-scrollbar">
        {filteredGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-2">
            {/* Categoria */}
            {!collapsed && (
              <h3 className="px-3 text-[10px] font-black uppercase text-[#7A7268] tracking-widest">
                {group.category}
              </h3>
            )}
            
            {/* Links da categoria */}
            <div className="space-y-1">
              {group.items.map((item, itemIdx) => {
                const IconComponent = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={itemIdx}
                    href={item.href}
                    title={collapsed ? item.name : undefined}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 font-semibold text-sm group select-none relative",
                      isActive
                        ? "bg-accent text-white shadow-md shadow-accent/20"
                        : "text-muted-foreground hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {/* Indicador de barra ativa na lateral esquerda */}
                    {isActive && (
                      <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-white rounded-r-md" />
                    )}

                    <IconComponent
                      className={cn(
                        "w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-105",
                        isActive ? "text-white" : "text-muted-foreground group-hover:text-accent"
                      )}
                    />

                    {!collapsed && (
                      <span className="truncate flex-1 font-semibold">
                        {item.name}
                      </span>
                    )}

                    {/* Emblemas de Notificação / Badges */}
                    {!collapsed && item.badge && (
                      <span
                        className={cn(
                          "px-2 py-0.5 text-[9px] font-black uppercase rounded-full",
                          item.badgeColor || "bg-white/15 text-white"
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
        {filteredGroups.length === 0 && (
          <div className="px-3 text-center py-6">
            <span className="text-xs text-[#7A7268] block">Nenhum módulo encontrado.</span>
          </div>
        )}
      </nav>

      {/* 4. Painel de Usuário & Rodapé */}
      <div className="p-4 border-t border-[#E5E0DB]/10 bg-black/20 select-none">
        <div
          className={cn(
            "flex items-center gap-3",
            collapsed ? "justify-center" : "justify-between"
          )}
        >
          {/* Avatar e Infos */}
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="relative flex-shrink-0 w-9 h-9 rounded-full bg-accent flex items-center justify-center text-white font-black text-sm shadow-md border-2 border-white/15">
              WL
            </div>
            {!collapsed && (
              <div className="flex flex-col min-w-0 select-none">
                <span className="text-xs font-bold text-white truncate">
                  William Lima
                </span>
                <span className="text-[10px] text-accent font-semibold truncate uppercase tracking-wider flex items-center gap-1 mt-0.5">
                  <UserCheck className="w-2.5 h-2.5" /> Lead Ops
                </span>
              </div>
            )}
          </div>

          {/* Botão de Logout */}
          {!collapsed && (
            <button
              title="Sair do Portal"
              className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-white/5 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
