export const SESSION_COOKIE = "hit_session";

export const AUTH_ROUTES = {
  login: "/login",
  defaultRedirect: "/admin/dashboard",
} as const;

export const DEMO_ADMIN = {
  email: "admin@hit.demo",
  password: "HIT-Demo2026!",
  name: "William Lima",
  role: "Lead Ops",
  initials: "WL",
} as const;

export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
