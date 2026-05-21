import { AUTH_ROUTES } from "@/lib/auth/constants";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(AUTH_ROUTES.login);
}
