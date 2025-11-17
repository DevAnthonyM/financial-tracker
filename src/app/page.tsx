import Link from "next/link";
import { ArrowRight, Shield, Wallet, BellRing, Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

const featureHighlights = [
  {
    icon: <Wallet className="h-5 w-5 text-emerald-300" />,
    title: "15s Expense Entry",
    description: "Category chips, keypad input, M-Pesa fee helper, offline queue.",
  },
  {
    icon: <Shield className="h-5 w-5 text-emerald-300" />,
    title: "Budget Guardrails",
    description: "Tiered limits, live remaining budget, instant category edits.",
  },
  {
    icon: <BellRing className="h-5 w-5 text-emerald-300" />,
    title: "Smart Alerts",
    description: "Auto alerts for overspend and upcoming payments, manual notes.",
  },
  {
    icon: <Calendar className="h-5 w-5 text-emerald-300" />,
    title: "Payment Calendar",
    description: "Mark paid, snooze, or edit recurring obligations in one view.",
  },
];

const testimonials = [
  {
    quote:
      "I went from losing track of family money to seeing every deposit and release in seconds.",
    author: "Kimenju",
    role: "Founder of PersonalMe",
  },
  {
    quote:
      "Quick entry + alerts means I know exactly how much I can spend before heading out.",
    author: "Precious",
    role: "Pilot user",
  },
];

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.4em] text-white/60">PersonalMe</p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            A personal finance cockpit that feels like a real app—not a spreadsheet.
          </h1>
          <p className="text-lg text-white/70">
            Log expenses in under 15 seconds, stay obedient to tiered budgets, and separate
            personal, business, and family money. Supabase stores every transaction while
            the dashboard keeps you honest.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/dashboard">
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/sign-in">Sign in / Create account</Link>
            </Button>
            <Button variant="ghost" className="border border-white/10" asChild>
              <Link href="https://github.com/DevAnthonyM/financial-tracker" target="_blank">
                View Source
              </Link>
            </Button>
          </div>
          <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:grid-cols-2">
            <MetricCard label="Current Budget" value={formatCurrency(21841)} />
            <MetricCard label="Budget Remaining" value={formatCurrency(21841)} />
            <MetricCard label="Emergency Fund Target" value="KES 35,000" />
            <MetricCard label="Next Payment" value="Wifi - Nov 15" />
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-black p-6 shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Quick Glance
          </p>
          <div className="mt-4 space-y-3 text-sm text-white/80">
            <Highlight label="Expenses" value="15s entry, M-Pesa aware" />
            <Highlight label="Categories" value="Tiered budgets, instant edits" />
            <Highlight label="Alerts" value="Auto overspend + manual notes" />
            <Highlight label="Payments" value="Mark paid, snooze, or edit due dates" />
            <Highlight label="Family & Savings" value="Ledger views for every pocket" />
          </div>
        </div>
      </section>

      <section>
        <p className="section-title">Designed for Daily Use</p>
        <div className="grid gap-6 md:grid-cols-2">
          {featureHighlights.map((feature) => (
            <div key={feature.title} className="card flex items-start gap-4">
              <div className="rounded-full bg-emerald-500/10 p-3">{feature.icon}</div>
              <div>
                <p className="text-lg font-semibold">{feature.title}</p>
                <p className="text-sm text-white/70">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <p className="section-title">What You Get</p>
        <div className="grid gap-6 lg:grid-cols-3">
          <ValueCard title="Real dashboards">
            Live Supabase data feeds hero metrics, category progress, alerts, payment calendar,
            and category management right inside the app.
          </ValueCard>
          <ValueCard title="Powered by Supabase + Vercel">
            Supabase handles auth, Postgres, RLS, and storage. Vercel deploys the Next.js app with
            edge-ready APIs for tracking, alerts, and payments.
          </ValueCard>
          <ValueCard title="Daily accountability">
            With MPesa fees auto-calculated, family money tracked separately, and quick entry, you
            always know the truth about your cash.
          </ValueCard>
        </div>
      </section>

      <section>
        <p className="section-title">Voices from the cockpit</p>
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <blockquote key={testimonial.author} className="card space-y-3">
              <p className="text-lg italic text-white/80">“{testimonial.quote}”</p>
              <p className="text-sm text-white/60">
                {testimonial.author} — {testimonial.role}
              </p>
            </blockquote>
          ))}
        </div>
      </section>
    </div>
  );
}

const MetricCard = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs uppercase tracking-widest text-white/60">{label}</p>
    <p className="text-2xl font-semibold">{value}</p>
  </div>
);

const Highlight = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl border border-white/5 bg-white/5 p-3">
    <p className="text-xs uppercase tracking-[0.3em] text-white/60">{label}</p>
    <p className="text-sm text-white/80">{value}</p>
  </div>
);

const ValueCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="card space-y-2">
    <p className="text-lg font-semibold">{title}</p>
    <p className="text-sm text-white/70">{children}</p>
  </div>
);
