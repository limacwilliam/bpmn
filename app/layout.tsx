import type { Metadata } from "next";
import { Anek_Latin } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

// Carrega a fonte oficial da marca HIT com suporte de latim e swap amigável
const anekLatin = Anek_Latin({
  subsets: ["latin"],
  variable: "--font-anek-latin",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HIT - Central de Governança Operacional",
  description: "Plataforma Central de Inteligência, Governança e Mapeamento de Processos Corporativos da HIT.",
  icons: {
    icon: "/logo-hit.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${anekLatin.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col custom-scrollbar bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
