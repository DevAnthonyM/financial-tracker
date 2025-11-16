-- STATUS: Successfully run on Supabase
-- PURPOSE: Core tables required for PersonalMe (users, budgets, transactions, alerts)

create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- Optional helper enum for clarity
do $$
begin
  if not exists (select 1 from pg_type where typname = 'transaction_entry_type') then
    create type transaction_entry_type as enum ('expense', 'income');
  end if;
end$$;

create table if not exists public.users (
  id uuid primary key default uuid_generate_v4(),
  auth_user_id uuid references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  currency char(3) default 'KES',
  monthly_budget numeric(12,2),
  preferences jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc', now())
);

create table if not exists public.categories (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,
  name text not null,
  tier text not null check (tier in ('Fixed','Essential','Controlled','Emergency')),
  monthly_limit numeric(12,2) not null,
  color text default '#16a34a',
  sort_order integer default 0,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc', now())
);

create table if not exists public.budget_periods (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,
  month char(7) not null, -- YYYY-MM
  total_budget numeric(12,2) not null,
  total_spent numeric(12,2) default 0,
  total_income numeric(12,2) default 0,
  status text default 'on-track',
  start_date date not null,
  end_date date not null,
  created_at timestamp with time zone default timezone('utc', now()),
  unique(user_id, month)
);

create table if not exists public.transactions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,
  budget_period_id uuid references public.budget_periods(id) on delete set null,
  category_id uuid references public.categories(id),
  amount numeric(12,2) not null,
  mpesa_fee numeric(12,2) default 0,
  vendor text,
  description text,
  payment_method text default 'm-pesa',
  type transaction_entry_type not null default 'expense',
  transaction_date date not null,
  is_recurring boolean default false,
  created_at timestamp with time zone default timezone('utc', now())
);

create table if not exists public.recurring_payments (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,
  name text not null,
  amount numeric(12,2) not null,
  category_id uuid references public.categories(id),
  frequency text not null check (frequency in ('monthly','quarterly','yearly','weekly','custom')),
  day_of_month integer,
  next_due_date date not null,
  is_active boolean default true,
  reminder_days_before integer default 1,
  created_at timestamp with time zone default timezone('utc', now())
);

create table if not exists public.alerts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,
  type text not null,
  severity text not null check (severity in ('info','warning','critical')),
  message text not null,
  category_id uuid references public.categories(id),
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc', now())
);

create table if not exists public.emergency_fund_transactions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,
  amount numeric(12,2) not null,
  transaction_type text not null check (transaction_type in ('deposit','withdrawal')),
  reason text,
  transaction_date date not null,
  created_at timestamp with time zone default timezone('utc', now())
);

-- Helpful indexes
create index if not exists idx_transactions_user_date
  on public.transactions(user_id, transaction_date desc);

create index if not exists idx_transactions_category
  on public.transactions(category_id);

create index if not exists idx_budget_periods_user_month
  on public.budget_periods(user_id, month);

create index if not exists idx_alerts_user_unread
  on public.alerts(user_id, is_read)
  where is_read = false;

create index if not exists idx_emergency_fund_user_date
  on public.emergency_fund_transactions(user_id, transaction_date desc);
