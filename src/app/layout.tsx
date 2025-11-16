import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

import { AppShell } from "@/components/layout/app-shell";
import { QueryProvider } from "@/components/providers/query-provider";
import { SessionProvider } from "@/components/providers/session-provider";
import { siteConfig } from "@/config/site";
import { fontMono, fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  metadataBase: new URL("https://financial-tracker.dev"),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: "https://financial-tracker.dev",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-slate-950 text-slate-100 antialiased",
          fontSans.variable,
          fontMono.variable,
        )}
      >
        <SessionProvider session={session}>
          <QueryProvider>
            <AppShell user={session?.user}>{children}</AppShell>
          </QueryProvider>
        </SessionProvider>
        <Toaster theme="dark" richColors />
      </body>
    </html>
  );
}
