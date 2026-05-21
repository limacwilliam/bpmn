import type { AuthSession, AuthUser } from "./types";
import { SESSION_MAX_AGE_SECONDS } from "./constants";

const SESSION_SECRET =
  process.env.DEMO_AUTH_SECRET || "hit-governance-demo-secret-change-in-production";

const textEncoder = new TextEncoder();

async function getSigningKey() {
  return crypto.subtle.importKey(
    "raw",
    textEncoder.encode(SESSION_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function bufferToBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlToBuffer(value: string): ArrayBuffer {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes.buffer;
}

async function signPayload(payload: string): Promise<string> {
  const key = await getSigningKey();
  const signature = await crypto.subtle.sign("HMAC", key, textEncoder.encode(payload));
  return bufferToBase64Url(signature);
}

async function verifyPayload(payload: string, signature: string): Promise<boolean> {
  const key = await getSigningKey();
  return crypto.subtle.verify(
    "HMAC",
    key,
    base64UrlToBuffer(signature),
    textEncoder.encode(payload)
  );
}

export async function createSessionToken(
  user: AuthUser,
  provider: AuthSession["provider"] = "demo"
): Promise<string> {
  const session: AuthSession = {
    user,
    expiresAt: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
    provider,
  };
  const payload = bufferToBase64Url(textEncoder.encode(JSON.stringify(session)).buffer);
  const signature = await signPayload(payload);
  return `${payload}.${signature}`;
}

export async function parseSessionToken(
  token: string | undefined | null
): Promise<AuthSession | null> {
  if (!token) return null;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const isValid = await verifyPayload(payload, signature);
  if (!isValid) return null;

  try {
    const decoded = new TextDecoder().decode(base64UrlToBuffer(payload));
    const session = JSON.parse(decoded) as AuthSession;

    if (!session?.user?.email || !session.expiresAt) return null;
    if (Date.now() > session.expiresAt) return null;

    return session;
  } catch {
    return null;
  }
}

export function sessionFromUser(user: AuthUser): AuthSession {
  return {
    user,
    expiresAt: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
    provider: "demo",
  };
}
