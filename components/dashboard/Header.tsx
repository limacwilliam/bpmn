"use client";

import { useTheme } from "@/app/providers";
import { getRouteName } from "@/config/navigation";
import { cn } from "@/lib/utils";
import {
  Bell,
  Calendar,
  HelpCircle,
  Moon,
  Sun,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [currentDate, setCurrentDate] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Formata a data atual em português corporativo
  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    
    // Capitaliza a primeira letra do dia da semana
    const rawDate = formatter.format(new Date());
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentDate(rawDate.charAt(0).toUpperCase() + rawDate.slice(1));
  }, []);

  // Resolve os caminhos das breadcrumbs
  const breadcrumbs = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    return segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`;
      return {
        name: getRouteName(segment),
        href: href === pathname ? "#" : href,
      };
    });
  }, [pathname]);

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between h-20 px-8 border-b border-border bg-background/80 backdrop-blur-md transition-colors duration-200 select-none">
      {/* 1. Breadcrumbs / Indicador de Localização */}
      <div className="flex items-center gap-2 text-xs font-semibold select-none">
        <Link href="/admin/dashboard" className="text-muted-foreground hover:text-accent transition-colors">
          HIT Governance
        </Link>
        {breadcrumbs.map((crumb, idx) => {
          if (idx === 0 && crumb.name === "HIT Governance") return null;
          return (
            <React.Fragment key={idx}>
              <span className="text-muted-foreground/60">/</span>
              <span
                className={cn(
                  "font-bold",
                  idx === breadcrumbs.length - 1
                    ? "text-primary"
                    : "text-muted-foreground hover:text-accent transition-colors"
                )}
              >
                {crumb.name}
              </span>
            </React.Fragment>
          );
        })}
      </div>

      {/* 2. Painel de Controle de Utilidades */}
      <div className="flex items-center gap-4">
        {/* Relógio / Calendário Executivo */}
        <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-muted-foreground border-r border-border pr-4 h-6">
          <Calendar className="w-3.5 h-3.5 text-accent" />
          <span>{currentDate}</span>
        </div>

        {/* Switch de Tema Light / Dark com variáveis HSL */}
        <button
          onClick={toggleTheme}
          title={theme === "light" ? "Mudar para Modo Escuro" : "Mudar para Modo Claro"}
          className="p-2 h-10 w-10 flex items-center justify-center rounded-lg border border-border bg-background hover:bg-muted text-foreground transition-all hover:scale-105 cursor-pointer"
        >
          {theme === "light" ? (
            <Moon className="w-4.5 h-4.5 text-primary animate-pulse" />
          ) : (
            <Sun className="w-4.5 h-4.5 text-accent animate-spin-slow" />
          )}
        </button>

        {/* Central de Notificações / Alertas SLAs */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 h-10 w-10 flex items-center justify-center rounded-lg border border-border bg-background hover:bg-muted text-foreground transition-all relative hover:scale-105 cursor-pointer"
          >
            <Bell className="w-4.5 h-4.5 text-foreground" />
            {/* Ponto vermelho animado sinalizando pendências críticas */}
            <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-destructive border border-background animate-pulse" />
          </button>

          {/* Dropdown de Alertas do Dashboard */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-background border border-border rounded-xl shadow-xl z-50 overflow-hidden animate-page-in">
              <div className="p-4 border-b border-border flex items-center justify-between bg-secondary">
                <span className="text-xs font-black uppercase tracking-wider text-primary">Notificações Críticas</span>
                <span className="px-2 py-0.5 text-[9px] font-black uppercase bg-destructive text-destructive-foreground rounded-full">3 Pendentes</span>
              </div>
              <div className="divide-y divide-border text-xs max-h-72 overflow-y-auto custom-scrollbar">
                <div className="p-4 hover:bg-muted/40 transition-colors">
                  <span className="font-bold text-primary block">Estouro de SLA Detectado</span>
                  <p className="text-muted-foreground mt-1 leading-relaxed">{"O processo \"Faturamento Automático\" excedeu a tolerância de 2h na etapa SAP."}</p>
                  <span className="text-[9px] font-semibold text-accent block mt-2">Gargalos / Há 10 min</span>
                </div>
                <div className="p-4 hover:bg-muted/40 transition-colors">
                  <span className="font-bold text-primary block">Risco Alto Mapeado</span>
                  <p className="text-muted-foreground mt-1 leading-relaxed">{"Novo risco \"Segurança da Informação\" reportado pelo time de Governança."}</p>
                  <span className="text-[9px] font-semibold text-accent block mt-2">Riscos / Há 1 hora</span>
                </div>
                <div className="p-4 hover:bg-muted/40 transition-colors">
                  <span className="font-bold text-primary block">BPMN Atualizado</span>
                  <p className="text-muted-foreground mt-1 leading-relaxed">{"Nova versão \"TO BE v3\" do fluxo de Onboarding homologada por Diretoria."}</p>
                  <span className="text-[9px] font-semibold text-accent block mt-2">Modelos / Há 3 horas</span>
                </div>
              </div>
              <div className="p-3 bg-secondary text-center border-t border-border">
                <Link
                  href="/admin/dashboard"
                  onClick={() => setNotificationsOpen(false)}
                  className="text-xs font-bold text-accent hover:text-accent-hover transition-colors"
                >
                  Ver todos os incidentes
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Informações Auxiliares */}
        <button
          title="Ajuda & Documentação"
          className="p-2 h-10 w-10 flex items-center justify-center rounded-lg border border-border bg-background hover:bg-muted text-foreground transition-all hover:scale-105 cursor-pointer"
        >
          <HelpCircle className="w-4.5 h-4.5 text-foreground" />
        </button>
      </div>
    </header>
  );
}
