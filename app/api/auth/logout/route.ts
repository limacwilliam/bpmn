import { AUTH_ROUTES, SESSION_COOKIE } from "@/lib/auth/constants";
import { isSupabaseConfigured } from "@/lib/auth/demo-auth";
import { createSupabaseServer } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServer();
      await supabase.auth.signOut();
    } catch {
      // Demo session still clears below.
    }
  }

  const response = NextResponse.json({ redirectTo: AUTH_ROUTES.login });
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}
