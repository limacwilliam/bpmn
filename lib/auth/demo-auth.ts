import { DEMO_ADMIN } from "./constants";
import type { AuthUser } from "./types";

export function validateDemoCredentials(email: string, password: string): AuthUser | null {
  const normalizedEmail = email.trim().toLowerCase();

  if (
    normalizedEmail !== DEMO_ADMIN.email.toLowerCase() ||
    password !== DEMO_ADMIN.password
  ) {
    return null;
  }

  return {
    id: "demo-admin",
    email: DEMO_ADMIN.email,
    name: DEMO_ADMIN.name,
    role: DEMO_ADMIN.role,
    initials: DEMO_ADMIN.initials,
  };
}

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return Boolean(
    url &&
      key &&
      !url.includes("placeholder") &&
      !key.includes("placeholder")
  );
}
