export const siteConfig = {
  name: "PersonalMe Financial Tracker",
  shortName: "PersonalMe",
  description:
    "An opinionated personal finance cockpit for logging expenses in seconds, watching budgets, and keeping family/business money honest.",
  navLinks: [
    { label: "Overview", href: "#hero" },
    { label: "Core", href: "#features" },
    { label: "Advanced", href: "#advanced" },
    { label: "Data Model", href: "#data-model" },
    { label: "Roadmap", href: "#roadmap" },
  ],
  heroStats: [
    { label: "Expense Entry Target", value: "< 30 sec" },
    { label: "Budget Visibility", value: "Real-time" },
    { label: "Alerts", value: "Overspend + Bills" },
  ],
  coreFeatures: [
    {
      title: "Quick Expense Entry",
      description:
        "Matatu-friendly keypad form with autofocus, category chips, and offline queueing so every KES is captured instantly.",
      result: "15-second logging, auto MPesa fees, confirmations.",
    },
    {
      title: "Income & Allocation",
      description:
        "Mirrored income form that suggests allocations across Emergency, Operating Cash, Business, and Savings.",
      result: "Zero-guess envelopes with override controls.",
    },
    {
      title: "Budget Dashboard",
      description:
        "Hero metrics, traffic-light bars, category tiers, next payment cards, and emergency fund progress.",
      result: "Know if you’re on track the moment the app opens.",
    },
    {
      title: "Payment Calendar & Alerts",
      description:
        "Calendar + alert center for recurring bills, snoozes, autopay, and 70/90% spend warnings.",
      result: "No more surprise WiFi or AI tool charges.",
    },
    {
      title: "Emergency Fund Tracker",
      description:
        "Target progress, deposits/withdrawals, and links to the triggering transactions.",
      result: "Stay disciplined with ‘why’ on every withdrawal.",
    },
    {
      title: "Weekly & Monthly Reviews",
      description:
        "Auto-generated digests summarizing leaks, wins, and suggestions plus PDF/CSV exports.",
      result: "Fast retrospectives to adjust budgets.",
    },
  ],
  advancedFeatures: [
    {
      title: "Family Money Management",
      description:
        "Dedicated ledger for funds you’re safeguarding for relatives with deposit/release workflows, notes, and alerts.",
    },
    {
      title: "Business & Side Hustle Tracking",
      description:
        "Tag business income/expenses, watch ROI timelines, and keep DecisionPulse separate without new tools.",
    },
    {
      title: "Savings Hub",
      description:
        "Multiple savings accounts (emergency, family, business) with targets, interest, and planned withdrawals.",
    },
    {
      title: "Receipts & Proof",
      description:
        "Camera uploads, Supabase storage buckets, swipeable galleries, signed sharing URLs, and backups.",
    },
    {
      title: "Export & Backup Engine",
      description:
        "One-click CSV/PDF bundles with zipped receipts powered by JSZip + FileSaver.",
    },
  ],
  dataModel: [
    {
      group: "Core Tracking",
      tables: [
        "users",
        "categories",
        "transactions",
        "recurring_payments",
        "budget_periods",
        "alerts",
        "emergency_fund_transactions",
      ],
    },
    {
      group: "Extended Storage",
      tables: [
        "family_money",
        "family_money_transactions",
        "savings_accounts",
        "savings_transactions",
        "business_expenses",
        "receipts",
        "exports",
      ],
    },
  ],
  roadmap: [
    {
      phase: "Phase 1 - Weeks 1-2",
      focus: "Setup, Auth, Quick entry, Dashboard baseline, Emergency Fund",
    },
    {
      phase: "Phase 2 - Week 3",
      focus: "Budget editing, alert automation, payment calendar",
    },
    {
      phase: "Phase 3 - Week 4",
      focus: "Family money + savings hub, refinements",
    },
    {
      phase: "Phase 4 - Week 5",
      focus: "Reports, exports, receipt ingestion",
    },
    {
      phase: "Phase 5 - Week 6+",
      focus: "Polish, offline cache, QA, performance",
    },
  ],
  links: {
    repo: "https://github.com/DevAnthonyM/financial-tracker",
    supabase: "https://supabase.com/dashboard",
    vercel: "https://vercel.com",
    overview: "https://github.com/DevAnthonyM/financial-tracker/blob/main/docs/project-overview.md",
  },
};

export type SiteConfig = typeof siteConfig;
