import LoginForm from "@/components/auth/LoginForm";
import { DEMO_ADMIN } from "@/lib/auth/constants";
import { ShieldCheck } from "lucide-react";
import { Suspense } from "react";

export const metadata = {
  title: "Login — HIT Governance",
  description: "Acesso executivo à plataforma de governança operacional HIT.",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#1C1208] px-4 py-10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-white shadow-2xl backdrop-blur-md">
        <div className="mb-8 space-y-3 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-xl font-black">
            HIT
          </div>
          <h1 className="text-2xl font-black tracking-tight">Governance Portal</h1>
          <p className="text-xs font-semibold leading-5 text-white/65">
            Ambiente demo-safe para liderança. Autenticação estável para apresentações executivas.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="flex h-40 items-center justify-center">
              <ShieldCheck className="h-6 w-6 animate-pulse text-accent" />
            </div>
          }
        >
          <LoginForm />
        </Suspense>

        <p className="mt-6 text-center text-[10px] font-semibold text-white/45">
          Demo: {DEMO_ADMIN.email}
        </p>
      </div>
    </main>
  );
}
