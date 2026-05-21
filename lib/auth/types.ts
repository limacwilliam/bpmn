export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
  initials: string;
}

export interface AuthSession {
  user: AuthUser;
  expiresAt: number;
  provider: "demo" | "supabase";
}
