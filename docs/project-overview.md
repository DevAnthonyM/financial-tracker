# Financial Tracker - Technical Overview

## Vision & Success Criteria
- Move from manual, reactive budgeting to a proactive financial cockpit for a single primary user (Kimenju) who often handles money for family and business partners.
- **Success metrics:** log any expense in under 30 seconds, see the current budget status at a glance, and rely on alerts (not memory) to block overspending or missed bills.
- Mobile-first, offline-friendly PWA that scales to desktop and later family access without re-architecting.

## Phase 1 MVP (Week 1-2)
1. **Quick Expense Entry** - autofocus amount input, tap-friendly category chips, optional vendor/notes, editable date (defaults to today), auto M-Pesa fee with manual override, offline queue, and "KES X logged. Budget remaining: ..." confirmation.
2. **Income Tracking** - mirror the expense form, capture source + payment type, and suggest allocations (Emergency Fund, Operating Cash, Business, Savings) with override control.
3. **Budget Dashboard** - hero metrics (current budget, spent %, days remaining, daily allowance), signal colors (green/yellow/red), horizontal progress bars per category tier, "last expense" + "next payment" callouts, and emergency fund progress.
4. **Category Budget Management** - tiered limits:
   - **Tier 1 - Fixed** (Rent, AI tool 1, Wifi, Website, etc.)
   - **Tier 2 - Essential** (Food, Airtime, Transport)
   - **Tier 3 - Controlled** (Family Support, Shopping, Business, Street Food, Trips)
   - **Tier 4 - Emergency** (Medical)
   Each category shows limit, spent, remaining, % used, and status color.
5. **Payment Calendar & Alerts** - calendar/timeline for recurring + one-off payments, amount-based color coding, mark-as-paid, snooze, autopay indicator, and alert center for >70%/>90% spend, bills due, unusual daily burn, low balance.
6. **Emergency Fund Tracker** - deposits/withdrawals with reasons, tie withdrawals back to original transaction, visualize progress toward KES 35,000 target.
7. **Weekly + Monthly Reviews** - in-app digest plus exportable PDF/email: wins, leaks, top categories, reminders, comparison vs previous month.
8. **M-Pesa Fee Calculator** - up-to-date table embedded inside the expense form and as a standalone reference module.

## Extended Features (Weeks 3-6+)
11. **Family Money Management** - track money you are holding for relatives: deposits, releases, notes, warnings that it is not your cash, and full ledger history.
12. **Business Finance Tracking** - mark income/expenses as business related, monitor ROI timelines (e.g., DecisionPulse), highlight upcoming invoices and profits vs costs.
13. **Savings Hub** - multiple accounts (emergency, general, family, business) with targets, interest, monthly contribution goals, locked vs accessible balances.
14. **Receipt Uploads** - camera capture or gallery pick, Supabase Storage bucket (`receipts`), offline queue, swipeable gallery, signed URL sharing, attach one receipt to multiple transactions.
15. **Exports & Backups** - CSV/PDF exports, zipped backups (transactions + budgets + receipts + settings via JSZip/FileSaver), export history table, re-download links, and optional email delivery.

## Target Stack
- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS v4, shadcn/Radix primitives, Zustand or Jotai for state, React Query for Supabase data, Next-PWA for offline install, Tremor/Recharts for charts, React Hook Form + Zod, date-fns, Lucide icons.
- **Backend:** Supabase for Auth, Postgres, RLS, Storage, and Edge Functions (cron alerts, auto fee updates, export jobs).
- **Infra:** GitHub repo, Vercel deployment, Supabase project, storage buckets (`receipts`, `exports`, `camera-drafts`), Supabase + Vercel monitoring.

## Data Model Summary
### Core Tables
- `users` - profile, preferences, budget settings.
- `categories` - tier, limit, color, ordering.
- `transactions` - income/expense entries with category, vendor, mpesa fee, method, attachments, offline flags.
- `recurring_payments` - schedules, next due date, reminder window.
- `budget_periods` - per-month totals (budget, spent, income, status, date range).
- `alerts` - type, severity, message, read flag.
- `emergency_fund_transactions` - deposit/withdrawal history with reasons.

### Extended Tables
- `family_money` + `family_money_transactions` - balances held for each relative.
- `savings_accounts` + `savings_transactions` - multiple savings destinations with contribution targets and withdrawal reasons.
- `business_expenses` - ROI metadata for transactions flagged as business.
- `receipts` - Supabase Storage metadata (file URL, size, mime, uploaded_at).
- `exports` - log of CSV/PDF/ZIP jobs with date range and download link.

## Key Screens
- **Dashboard:** hero metrics, quick stats, category tiers, emergency fund, alerts, family money widget, business snapshot.
- **Expense/Income Entry:** keypad-first, mpesa helper, receipt upload, offline indicator.
- **Budget Overview:** inline editing of category caps, filters by tier, upcoming recurring charges.
- **Alert Center:** severity filters, quick actions (adjust budget, snooze payment).
- **Payment Calendar:** calendar/timeline toggles, autopay badges, mark-as-paid.
- **Savings & Family Money:** dedicated ledgers, progress bars, transaction history.
- **Reports:** weekly + monthly summaries with export buttons.
- **Settings:** profile, security, integrational toggles, export/backup controls, MPesa fee table maintenance.

## Supabase Integration
- Enforce RLS on every table (rows scoped to `user_id`).
- Supabase Auth for email/password + OTP; sessions stored via Next server components.
- Edge functions:
  - Budget and category alerts via cron.
  - Automatic MPesa fee refresh (e.g., quarterly).
  - Export builder (CSV/PDF/ZIP) that writes to `exports` and storage.
- Storage buckets:
  - `receipts` (active attachments).
  - `receipts-archive` (optional cold storage).
  - `camera-drafts` (temporary offline captures, auto-cleaned).

## Deployment Flow
1. Develop in this repo (`DevAnthonyM/financial-tracker`).
2. Vercel pulls from `main`, environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, plus future MPesa fee version flags.
3. Supabase CLI handles schema migrations and seed data (categories, fee table).
4. Preview deploys via PRs; `main` auto-deploys to production + Vercel monitors.

## Roadmap Snapshot
- **Phase 1 (Weeks 1-2):** Setup, Supabase auth, quick expense/income, dashboard baseline, emergency fund widget.
- **Phase 2 (Week 3):** Budget editing flow, alert automation, payment calendar.
- **Phase 3 (Week 4):** Family money + savings hub.
- **Phase 4 (Week 5):** Reports, CSV/PDF exports, receipt uploads.
- **Phase 5 (Week 6+):** Polish, offline queue hardening, QA, performance.

## Immediate Next Steps
1. Finish Supabase schema migration files + sample seed data.
2. Wire `createExpenseAction` to the real database and hydrate the dashboard with live queries.
3. Implement Supabase Auth session context + route protection for `/dashboard`.
4. Add category management UI and MPesa fee table maintenance screen.
