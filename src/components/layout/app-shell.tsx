import Link from "next/link";
import { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";

type Props = {
  children: ReactNode;
};

export const AppShell = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/5 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/20 text-lg font-semibold text-emerald-300">
              ₭
            </div>
            <div>
              <p className="text-sm uppercase tracking-widest text-white/70">
                {siteConfig.shortName}
              </p>
              <p className="font-semibold">{siteConfig.name}</p>
            </div>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-white/70 md:flex">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 text-sm">
            <Button variant="ghost" className="px-4" asChild>
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button
              variant="ghost"
              className="hidden border border-white/10 px-4 md:inline-flex"
              asChild
            >
              <Link href={siteConfig.links.supabase} target="_blank">
                Supabase
              </Link>
            </Button>
            <Button asChild className="px-4">
              <Link href={siteConfig.links.repo} target="_blank">
                Open Repository
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 pb-20 pt-16 sm:px-8">
        {children}
      </main>
      <footer className="border-t border-white/5 bg-slate-950/80">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} PersonalMe. Built for disciplined finances.</p>
          <div className="flex gap-4">
            <Link href={siteConfig.links.repo} className="hover:text-white" target="_blank">
              GitHub
            </Link>
            <Link href={siteConfig.links.vercel} className="hover:text-white" target="_blank">
              Vercel
            </Link>
            <Link href={siteConfig.links.supabase} className="hover:text-white" target="_blank">
              Supabase
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
