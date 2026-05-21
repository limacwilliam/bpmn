import {
  Activity,
  AudioLines,
  BookOpen,
  BrainCircuit,
  Flame,
  GitBranch,
  LayoutDashboard,
  Layers,
  Map,
  Network,
  Presentation,
  Route,
  Settings,
  ShieldAlert,
  SlidersHorizontal,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  badgeColor?: string;
}

export interface NavigationGroup {
  category: string;
  items: NavigationItem[];
}

export const ROUTE_NAMES: Record<string, string> = {
  admin: "HIT Governance",
  dashboard: "Dashboard Executivo",
  demo: "Demo Executivo",
  processes: "Mapeamento de Processos",
  bpmn: "Modelador BPMN",
  kpis: "Gestão de KPIs e SLAs",
  bottlenecks: "Análise de Gargalos",
  "customer-success": "Sucesso do Cliente",
  risks: "Matriz de Riscos",
  roadmaps: "Transformation Roadmaps",
  "org-structure": "Estrutura Organizacional",
  operations: "Operations Center",
  meetings: "Transcrição de Reuniões",
  "ai-analysis": "Analista IA Operacional",
  docs: "Repositório de Docs",
  presentation: "Presentation Mode",
  settings: "Configurações",
};

export const NAVIGATION_GROUPS: NavigationGroup[] = [
  {
    category: "Operações & Dashboards",
    items: [
      {
        name: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
        badge: "Novo",
      },
      {
        name: "Presentation",
        href: "/admin/presentation",
        icon: Presentation,
        badge: "Friday",
        badgeColor: "bg-accent/20 text-accent border border-accent/40 font-bold",
      },
      {
        name: "Leadership Demo",
        href: "/admin/demo",
        icon: Route,
        badge: "Final",
        badgeColor: "bg-white/10 text-white border border-white/20 font-bold",
      },
      {
        name: "Operations",
        href: "/admin/operations",
        icon: Activity,
      },
      {
        name: "Processes",
        href: "/admin/processes",
        icon: GitBranch,
      },
      {
        name: "BPMN",
        href: "/admin/bpmn",
        icon: Layers,
      },
    ],
  },
  {
    category: "Gargalos & Desempenho",
    items: [
      {
        name: "Meetings",
        href: "/admin/meetings",
        icon: AudioLines,
      },
      {
        name: "AI Analysis",
        href: "/admin/ai-analysis",
        icon: BrainCircuit,
        badge: "AI",
        badgeColor: "bg-accent/20 text-accent border border-accent/40 font-bold",
      },
      {
        name: "KPIs",
        href: "/admin/kpis",
        icon: SlidersHorizontal,
      },
      {
        name: "Bottlenecks",
        href: "/admin/bottlenecks",
        icon: Flame,
        badge: "3 Alertas",
        badgeColor: "bg-destructive text-destructive-foreground animate-pulse",
      },
      {
        name: "Customer Success",
        href: "/admin/customer-success",
        icon: Users,
      },
    ],
  },
  {
    category: "Estratégia & Risco",
    items: [
      {
        name: "Risks",
        href: "/admin/risks",
        icon: ShieldAlert,
      },
      {
        name: "Roadmaps",
        href: "/admin/roadmaps",
        icon: Map,
      },
      {
        name: "Organization",
        href: "/admin/org-structure",
        icon: Network,
      },
      {
        name: "Documentation",
        href: "/admin/docs",
        icon: BookOpen,
      },
      {
        name: "Settings",
        href: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];

export const CHROMELESS_ADMIN_ROUTES = ["/admin/presentation"];

export function getRouteName(segment: string) {
  return ROUTE_NAMES[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
}
