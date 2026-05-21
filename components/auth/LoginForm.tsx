"use client";

import { DEMO_ADMIN } from "@/lib/auth/constants";
import { cn } from "@/lib/utils";
import { Loader2, Lock, Mail, ShieldCheck } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string>(DEMO_ADMIN.email);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectTo = searchParams.get("redirect") || "/admin/dashboard";

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(data.error || "Não foi possível autenticar.");
        return;
      }

      router.push(redirectTo);
      router.refresh();
    } catch {
      setError("Falha de conexão. Tente novamente em instantes.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function fillDemoCredentials() {
    setEmail(DEMO_ADMIN.email);
    setPassword(DEMO_ADMIN.password);
    setError(null);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
          E-mail corporativo
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            id="email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-4 text-sm font-semibold text-primary focus:border-accent focus:outline-none"
            placeholder="admin@hit.demo"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
          Senha
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-4 text-sm font-semibold text-primary focus:border-accent focus:outline-none"
            placeholder="••••••••••••"
            required
          />
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-xs font-semibold text-destructive">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-accent text-xs font-black uppercase tracking-wider text-white transition hover:bg-accent-hover",
          isSubmitting && "opacity-70"
        )}
      >
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
        Entrar na plataforma
      </button>

      <button
        type="button"
        onClick={fillDemoCredentials}
        className="w-full rounded-xl border border-border bg-secondary/30 px-4 py-3 text-left transition hover:border-accent/40 hover:bg-accent/5"
      >
        <p className="text-[10px] font-black uppercase tracking-widest text-accent">Acesso demo executivo</p>
        <p className="mt-1 text-xs font-semibold text-muted-foreground">
          {DEMO_ADMIN.email} · senha pré-configurada para apresentação
        </p>
      </button>
    </form>
  );
}
