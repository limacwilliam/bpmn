import { SESSION_COOKIE } from "@/lib/auth/constants";
import { parseSessionToken } from "@/lib/auth/session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  const session = await parseSessionToken(token);

  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user: session.user, provider: session.provider });
}
