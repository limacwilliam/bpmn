import { AUTH_ROUTES, DEMO_ADMIN, SESSION_COOKIE, SESSION_MAX_AGE_SECONDS } from "@/lib/auth/constants";
import { isSupabaseConfigured, validateDemoCredentials } from "@/lib/auth/demo-auth";
import { createSessionToken } from "@/lib/auth/session";
import type { AuthUser } from "@/lib/auth/types";
import { createSupabaseServer } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

async function trySupabaseLogin(email: string, password: string): Promise<AuthUser | null> {
  if (!isSupabaseConfigured()) return null;

  try {
    const supabase = await createSupabaseServer();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !data.user) return null;

    const metadata = data.user.user_metadata ?? {};
    const name =
      (metadata.full_name as string | undefined) ||
      (metadata.name as string | undefined) ||
      email.split("@")[0];

    return {
      id: data.user.id,
      email: data.user.email || email,
      name,
      role: (metadata.role as string | undefined) || "Operações",
      initials: name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
    };
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string; password?: string };
  const email = body.email?.trim() ?? "";
  const password = body.password ?? "";

  if (!email || !password) {
    return NextResponse.json(
      { error: "Informe e-mail e senha para continuar." },
      { status: 400 }
    );
  }

  let user =
    (await trySupabaseLogin(email, password)) || validateDemoCredentials(email, password);

  if (!user) {
    return NextResponse.json(
      { error: "Credenciais inválidas. Use o acesso demo configurado." },
      { status: 401 }
    );
  }

  const provider =
    email.toLowerCase() === DEMO_ADMIN.email.toLowerCase() ? "demo" : "supabase";
  const token = await createSessionToken(user, provider);
  const response = NextResponse.json({
    user,
    redirectTo: AUTH_ROUTES.defaultRedirect,
  });

  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  return response;
}
