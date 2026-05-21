import { AUTH_ROUTES, SESSION_COOKIE } from "@/lib/auth/constants";
import { parseSessionToken } from "@/lib/auth/session";
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_PATHS = [AUTH_ROUTES.login, "/api/auth"];

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
}

function isProtectedPath(pathname: string) {
  return pathname === "/" || pathname.startsWith("/admin");
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get(SESSION_COOKIE)?.value;
  const session = await parseSessionToken(sessionToken);
  const isAuthenticated = Boolean(session);

  if (pathname === "/") {
    const target = isAuthenticated
      ? AUTH_ROUTES.defaultRedirect
      : AUTH_ROUTES.login;
    return NextResponse.redirect(new URL(target, request.url));
  }

  if (pathname === AUTH_ROUTES.login && isAuthenticated) {
    const redirectTo =
      request.nextUrl.searchParams.get("redirect") || AUTH_ROUTES.defaultRedirect;
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  if (isProtectedPath(pathname) && !isPublicPath(pathname) && !isAuthenticated) {
    const loginUrl = new URL(AUTH_ROUTES.login, request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/admin/:path*"],
};
