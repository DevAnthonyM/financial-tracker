import Link from "next/link";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { formatCurrency } from "@/lib/utils";

const heroMetrics = [
  { label: "Month Budget", value: formatCurrency(21841) },
  { label: "Spent So Far", value: `${formatCurrency(12450)} - 57%` },
  { label: "Days Remaining", value: "18 days" },
  { label: "Daily Budget", value: formatCurrency(522) },
];

const startupChecklist = [
  {
    title: "Day 1 - Setup & Auth",
    items: [
      "Init Next.js, Tailwind, Supabase SDK, lint rules",
      "Hook Supabase project + env vars",
      "Build sign in / sign up flow",
      "Verify session persistence across reloads",
    ],
  },
  {
    title: "Day 2 - Expense Form",
    items: [
      "Quick-entry layout with keypad and category chips",
      "M-Pesa fee helper (auto + override)",
      "Optimistic saves + offline queue",
      "Wire to `transactions` table",
    ],
  },
  {
    title: "Day 3 - Dashboard",
    items: [
      "Hero metrics + status colors",
      "Recent transactions stream",
      "Category tier bars",
      "Emergency fund + next payment cards",
    ],
  },
];

export default function Home() {
  return (
    <div className="space-y-16">
      <section id="hero" className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.4em] text-white/60">PersonalMe</p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Build the financial tracker that thinks faster than your matatu rides.
          </h1>
          <p className="text-lg text-white/70">
            Log expenses in 15 seconds, stay under KES 21,841, and make sure family/business
            money never mixes with yours. This scaffold is wired for Supabase, Vercel, and
            the ambitious roadmap captured in{" "}
            <Link
              href={siteConfig.links.overview}
              target="_blank"
              className="underline underline-offset-2"
            >
              Technical_requirements
            </Link>
            .
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="https://vercel.com/new" target="_blank">
                Deploy to Vercel
              </Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href={siteConfig.links.repo} target="_blank">
                View GitHub Plan
              </Link>
            </Button>
            <Button variant="ghost" className="border border-white/10" asChild>
              <Link href="/dashboard">
                Preview Dashboard
              </Link>
            </Button>
          </div>
          <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:grid-cols-2">
            {heroMetrics.map((metric) => (
              <div key={metric.label}>
                <p className="text-xs uppercase tracking-widest text-white/60">
                  {metric.label}
                </p>
                <p className="text-2xl font-semibold">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="card space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Success Checklist
          </p>
          {startupChecklist.map((section) => (
            <div key={section.title}>
              <p className="font-semibold text-white">{section.title}</p>
              <ul className="mt-2 space-y-1 text-sm text-white/70">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="features">
        <p className="section-title">Phase 1 - Core Experience</p>
        <div className="grid gap-6 md:grid-cols-2">
          {siteConfig.coreFeatures.map((feature) => (
            <div key={feature.title} className="card space-y-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-lg font-semibold">{feature.title}</p>
                <span className="text-xs uppercase tracking-[0.2em] text-emerald-300">
                  MVP
                </span>
              </div>
              <p className="text-sm text-white/70">{feature.description}</p>
              <p className="text-sm font-semibold text-white">{feature.result}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="advanced">
        <p className="section-title">Phase 2+ - Advanced Systems</p>
        <div className="grid gap-6 md:grid-cols-2">
          {siteConfig.advancedFeatures.map((feature) => (
            <div key={feature.title} className="card">
              <p className="text-base font-semibold">{feature.title}</p>
              <p className="mt-2 text-sm text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="data-model">
        <p className="section-title">Data Model & Supabase Tables</p>
        <div className="grid gap-6 md:grid-cols-2">
          {siteConfig.dataModel.map((group) => (
            <div key={group.group} className="card space-y-3">
              <p className="text-base font-semibold text-emerald-300">{group.group}</p>
              <ul className="space-y-2 text-sm text-white/70">
                {group.tables.map((table) => (
                  <li key={table} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
                    {table}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-white/60">
          All tables enforce Supabase RLS (row level security). Storage buckets: `receipts`,
          `exports`, and `camera-drafts`. Edge functions handle alerts, cron reminders, and
          export bundling via JSZip.
        </p>
      </section>

      <section id="roadmap">
        <p className="section-title">Roadmap</p>
        <div className="grid gap-4">
          {siteConfig.roadmap.map((item) => (
            <div
              key={item.phase}
              className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <p className="font-semibold">{item.phase}</p>
              <p className="text-sm text-white/70">{item.focus}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
