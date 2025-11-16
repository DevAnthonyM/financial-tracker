# PersonalMe Financial Tracker

A full-stack personal finance cockpit that logs expenses in seconds, enforces category budgets, tracks emergency funds, and keeps family/business money separate. This repo contains the Next.js 14 + Supabase setup plus a living blueprint derived from `docs/app_requiremnts.md` and `docs/Technical_requirements.md`.

## Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS v4, React Query, Zustand, React Hook Form, Zod, Lucide icons, Sonner toasts.
- **Backend:** Supabase (Auth, Postgres, Edge Functions, Storage) with RLS enforced tables listed in `docs/project-overview.md`.
- **Infrastructure:** Vercel for hosting, Supabase dashboard for DB + cron, JSZip/FileSaver for export bundles.

## Requirements Recap

1. **Quick expense + income entry** with keypad UX, M-Pesa fee helper, offline queue, and confirmations that display remaining budget.
2. **Budget dashboard** showing hero metrics, tiered categories, emergency fund progress, and next payments.
3. **Alerting + calendar** for recurring bills, 70/90% spend warnings, and snoozes.
4. **Emergency fund, weekly/monthly reviews, MPesa fee matrix** as first-week deliverables.
5. **Phase 2+** adds family money tracking, business finance split, savings hub, receipt uploads, CSV/PDF/ZIP exports.

Read `docs/project-overview.md` for a condensed version of the two requirement files.

## Getting Started

```bash
git clone https://github.com/DevAnthonyM/financial-tracker.git
cd financial-tracker
cp .env.example .env.local   # fill with Supabase values
npm install
npm run dev
```

### Required environment variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY= # optional, for edge functions
```

### Available scripts

| Command        | Purpose                            |
| -------------- | ---------------------------------- |
| `npm run dev`  | Start local Next.js dev server     |
| `npm run build`| Production build                   |
| `npm run start`| Run built app with Node            |
| `npm run lint` | ESLint validation                  |

## Project Structure

```
docs/                     # Requirement sources + project overview
src/app/                  # Next.js App Router routes
src/components/           # UI primitives, providers, layout shell
src/config/site.ts        # Navigation + feature metadata
src/lib/                  # Env parsing, fonts, Supabase helpers, utils
public/                   # Static assets
```

## Roadmap Snapshot

| Phase | Focus |
| ----- | ----- |
| **Week 1-2** | Setup, Supabase auth, quick expense/income, dashboard skeleton, emergency fund |
| **Week 3** | Budget editing, alerts, payment calendar |
| **Week 4** | Family money ledger + savings hub |
| **Week 5** | Reports, CSV/PDF exports, receipt uploads |
| **Week 6+** | Polish: offline queue, performance, QA |

Supabase database schemas, storage buckets, and export logic live in `docs/Technical_requirements.md`. Implement migrations using the Supabase CLI once the schema is finalized.
