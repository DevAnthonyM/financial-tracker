-- STATUS: Successfully run on Supabase
-- PURPOSE: Extended tables (family money, savings, receipts, exports, business tracking)

create table if not exists public.family_money (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,
  family_member_name text not null,
  current_balance numeric(12,2) default 0,
  total_deposited numeric(12,2) default 0,
  total_released numeric(12,2) default 0,
  created_at timestamp with time zone default timezone('utc', now()),
  last_activity timestamp with time zone default timezone('utc', now())
);

create table if not exists public.family_money_transactions (
  id uuid primary key default uuid_generate_v4(),
  family_money_id uuid references public.family_money(id) on delete cascade,
  type text not null check (type in ('deposit','release')),
  amount numeric(12,2) not null,
  note text,
  receipt_url text,
  transaction_date date not null,
  created_at timestamp with time zone default timezone('utc', now())
);

create table if not exists public.savings_accounts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,
  account_type text not null check (account_type in ('emergency','general','family','business')),
  account_name text not null,
  current_balance numeric(12,2) default 0,
  target_amount numeric(12,2),
  monthly_contribution numeric(12,2),
  institution text,
  interest_rate numeric(5,2),
  is_locked boolean default false,
  created_at timestamp with time zone default timezone('utc', now())
);

create table if not exists public.savings_transactions (
  id uuid primary key default uuid_generate_v4(),
  savings_account_id uuid references public.savings_accounts(id) on delete cascade,
  type text not null check (type in ('deposit','withdrawal')),
  amount numeric(12,2) not null,
  reason text,
  withdrawal_type text,
  transaction_date date not null,
  created_at timestamp with time zone default timezone('utc', now())
);

create table if not exists public.receipts (
  id uuid primary key default uuid_generate_v4(),
  transaction_id uuid references public.transactions(id) on delete cascade,
  file_url text not null,
  file_name text,
  file_size integer,
  mime_type text,
  uploaded_at timestamp with time zone default timezone('utc', now())
);

create table if not exists public.exports (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,
  export_type text not null check (export_type in ('csv','pdf','backup')),
  date_range_start date,
  date_range_end date,
  file_url text,
  file_size integer,
  created_at timestamp with time zone default timezone('utc', now())
);

create table if not exists public.business_expenses (
  id uuid primary key default uuid_generate_v4(),
  transaction_id uuid references public.transactions(id) on delete cascade,
  project_name text default 'DecisionPulse',
  expense_type text,
  is_recurring boolean default false,
  expected_roi_date date,
  notes text
);

-- Helpful indexes
create index if not exists idx_family_money_user
  on public.family_money(user_id);

create index if not exists idx_savings_accounts_user
  on public.savings_accounts(user_id);

create index if not exists idx_receipts_transaction
  on public.receipts(transaction_id);

create index if not exists idx_exports_user
  on public.exports(user_id, created_at desc);
