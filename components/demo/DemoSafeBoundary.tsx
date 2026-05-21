"use client";

import { DEMO_SAFE_DEFAULTS } from "@/lib/demo-mode";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import React from "react";

interface DemoSafeBoundaryProps {
  children: React.ReactNode;
  fallbackTitle?: string;
}

interface DemoSafeBoundaryState {
  hasError: boolean;
}

export default class DemoSafeBoundary extends React.Component<
  DemoSafeBoundaryProps,
  DemoSafeBoundaryState
> {
  constructor(props: DemoSafeBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): DemoSafeBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-border bg-background p-8 text-center">
          <AlertTriangle className="h-10 w-10 text-accent" />
          <h2 className="mt-4 text-lg font-black text-primary">
            {this.props.fallbackTitle || "Módulo em recuperação demo-safe"}
          </h2>
          <p className="mt-2 max-w-md text-xs font-semibold leading-5 text-muted-foreground">
            {DEMO_SAFE_DEFAULTS.loadingLabel} O ambiente manteve a navegação estável
            para continuidade da apresentação executiva.
          </p>
          <Link
            href="/admin/dashboard"
            className="mt-6 inline-flex h-10 items-center rounded-full bg-accent px-5 text-xs font-black uppercase tracking-wider text-white"
          >
            Voltar ao dashboard
          </Link>
        </div>
      );
    }

    return this.props.children;
  }
}
