-- STATUS: Successfully run on Supabase
-- PURPOSE: Storage for M-Pesa transaction types and fee rules

create table if not exists public.mpesa_transaction_types (
  id text primary key,
  label text not null,
  icon text,
  color text default '#16a34a',
  has_fee boolean default true,
  created_at timestamp with time zone default timezone('utc', now())
);

create table if not exists public.mpesa_fee_rules (
  id uuid primary key default uuid_generate_v4(),
  transaction_type text references public.mpesa_transaction_types(id) on delete cascade,
  version text not null default '2025.1',
  min_amount numeric(12,2) not null,
  max_amount numeric(12,2) not null,
  fee numeric(12,2) not null,
  note text,
  last_updated date default current_date
);

create index if not exists idx_mpesa_fee_rules_type_amount
  on public.mpesa_fee_rules(transaction_type, min_amount, max_amount);
