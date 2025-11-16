-- STATUS: Successfully run on Supabase
-- PURPOSE: Seed baseline data (categories, budget period, savings accounts, M-Pesa fee tables)
-- HOW TO USE: Replace {{AUTH_USER_ID}} with the Supabase Auth user ID, then run in SQL editor.

create unique index if not exists idx_categories_user_name on public.categories(user_id, name);
create unique index if not exists idx_users_auth_id on public.users(auth_user_id);
create unique index if not exists idx_savings_user_type on public.savings_accounts(user_id, account_type);

with target_user as (
  insert into public.users (auth_user_id, full_name, currency)
  values ('{{AUTH_USER_ID}}'::uuid, 'PersonalMe Owner', 'KES')
  on conflict (auth_user_id)
  do update set currency = excluded.currency
  returning id
),
category_seed as (
  insert into public.categories (user_id, name, tier, monthly_limit, color, sort_order)
  select tu.id, name, tier, monthly_limit, color, position
  from target_user tu
  cross join (
    values
      ('Rent','Fixed', 3560.00,'#F87171',1),
      ('AI Tool 1','Fixed', 3046.00,'#FB923C',2),
      ('Work Tool 2','Fixed', 507.00,'#FBBF24',3),
      ('Work Tool 3','Fixed', 507.00,'#FACC15',4),
      ('New AI Tool','Fixed', 1013.00,'#A3E635',5),
      ('Wifi','Fixed', 1523.00,'#4ADE80',6),
      ('Family Emergency Savings','Fixed', 1013.00,'#34D399',7),
      ('Website','Fixed', 532.00,'#2DD4BF',8),
      ('Food','Essential', 2039.00,'#22D3EE',9),
      ('Airtime','Essential', 810.00,'#38BDF8',10),
      ('Transport','Essential', 666.00,'#60A5FA',11),
      ('Family Support','Controlled', 2033.00,'#818CF8',12),
      ('Shopping','Controlled', 1356.00,'#A78BFA',13),
      ('Nairobi Trips','Controlled', 1013.00,'#C084FC',14),
      ('Business','Controlled', 1013.00,'#D946EF',15),
      ('Street Food','Controlled', 235.00,'#EC4899',16),
      ('Medical','Emergency', 1000.00,'#F43F5E',17)
  ) as seed(name, tier, monthly_limit, color, position)
  on conflict (user_id, name)
  do update set
    tier = excluded.tier,
    monthly_limit = excluded.monthly_limit,
    color = excluded.color,
    sort_order = excluded.sort_order
  returning *
),
budget_seed as (
  insert into public.budget_periods (
    user_id,
    month,
    total_budget,
    total_spent,
    total_income,
    status,
    start_date,
    end_date
  )
  select
    tu.id,
    to_char(date_trunc('month', current_date), 'YYYY-MM'),
    coalesce(sum(cs.monthly_limit), 0),
    0,
    0,
    'on-track',
    date_trunc('month', current_date)::date,
    (date_trunc('month', current_date) + interval '1 month - 1 day')::date
  from target_user tu
  left join category_seed cs on cs.user_id = tu.id
  group by tu.id
  on conflict (user_id, month)
  do update set total_budget = excluded.total_budget
  returning id
),
savings_seed as (
  insert into public.savings_accounts (
    user_id,
    account_type,
    account_name,
    current_balance,
    target_amount,
    monthly_contribution,
    institution,
    interest_rate,
    is_locked
  )
  select tu.id, account_type, account_name, 0, target_amount, monthly_contribution, institution, interest_rate, is_locked
  from target_user tu
  cross join (
    values
      ('emergency','Emergency Fund',35000,5000,'Zimele MMF',5.5,true),
      ('general','Operating Cash',0,0,'M-Pesa',0,false),
      ('business','Business Growth',15000,3000,'ABSA',4.2,false),
      ('family','Family Support',10000,2000,'M-Pesa',0,false)
  ) as s(account_type, account_name, target_amount, monthly_contribution, institution, interest_rate, is_locked)
  on conflict (user_id, account_type)
  do update set
    account_name = excluded.account_name,
    target_amount = excluded.target_amount,
    monthly_contribution = excluded.monthly_contribution
  returning *
)
select 'Seed complete' as status;

-- Seed M-Pesa transaction types
insert into public.mpesa_transaction_types (id, label, icon, color, has_fee)
values
  ('send_money','Send Money (Person to Person)','send','#3B82F6',true),
  ('withdraw_agent','Withdraw from Agent','banknote','#10B981',true),
  ('till_number','Buy Goods (Till Number)','shopping-cart','#8B5CF6',false),
  ('paybill','Pay Bill (PayBill)','credit-card','#F59E0B',false),
  ('atm_withdrawal','ATM Withdrawal','landmark','#EF4444',true),
  ('airtime_purchase','Buy Airtime','phone','#06B6D4',false),
  ('bank_transfer','M-Pesa to Bank','building-2','#EC4899',true)
on conflict (id)
do update set
  label = excluded.label,
  icon = excluded.icon,
  color = excluded.color,
  has_fee = excluded.has_fee;

-- Wipe older fee rules for the version being inserted
delete from public.mpesa_fee_rules where version = '2025.1';

insert into public.mpesa_fee_rules (
  transaction_type,
  version,
  min_amount,
  max_amount,
  fee,
  note,
  last_updated
)
values
  -- send money
  ('send_money','2025.1',1,100,0,'Free transfers below 100', '2025-11-16'),
  ('send_money','2025.1',101,500,7,null,'2025-11-16'),
  ('send_money','2025.1',501,1000,13,null,'2025-11-16'),
  ('send_money','2025.1',1001,1500,23,null,'2025-11-16'),
  ('send_money','2025.1',1501,2500,33,null,'2025-11-16'),
  ('send_money','2025.1',2501,3500,52,null,'2025-11-16'),
  ('send_money','2025.1',3501,5000,58,null,'2025-11-16'),
  ('send_money','2025.1',5001,7500,78,null,'2025-11-16'),
  ('send_money','2025.1',7501,10000,90,null,'2025-11-16'),
  ('send_money','2025.1',10001,15000,100,null,'2025-11-16'),
  ('send_money','2025.1',15001,20000,105,null,'2025-11-16'),
  ('send_money','2025.1',20001,35000,108,null,'2025-11-16'),
  ('send_money','2025.1',35001,50000,110,null,'2025-11-16'),
  ('send_money','2025.1',50001,70000,113,null,'2025-11-16'),
  ('send_money','2025.1',70001,150000,115,null,'2025-11-16'),
  ('send_money','2025.1',150001,250000,117,null,'2025-11-16'),
  ('send_money','2025.1',250001,500000,120,null,'2025-11-16'),
  -- withdraw agent
  ('withdraw_agent','2025.1',50,100,11,null,'2025-11-16'),
  ('withdraw_agent','2025.1',101,500,29,null,'2025-11-16'),
  ('withdraw_agent','2025.1',501,1000,29,null,'2025-11-16'),
  ('withdraw_agent','2025.1',1001,1500,29,null,'2025-11-16'),
  ('withdraw_agent','2025.1',1501,2500,52,null,'2025-11-16'),
  ('withdraw_agent','2025.1',2501,3500,69,null,'2025-11-16'),
  ('withdraw_agent','2025.1',3501,5000,87,null,'2025-11-16'),
  ('withdraw_agent','2025.1',5001,7500,115,null,'2025-11-16'),
  ('withdraw_agent','2025.1',7501,10000,167,null,'2025-11-16'),
  ('withdraw_agent','2025.1',10001,15000,185,null,'2025-11-16'),
  ('withdraw_agent','2025.1',15001,20000,197,null,'2025-11-16'),
  ('withdraw_agent','2025.1',20001,35000,278,null,'2025-11-16'),
  ('withdraw_agent','2025.1',35001,50000,309,null,'2025-11-16'),
  ('withdraw_agent','2025.1',50001,70000,325,null,'2025-11-16'),
  ('withdraw_agent','2025.1',70001,150000,330,null,'2025-11-16'),
  ('withdraw_agent','2025.1',150001,250000,335,null,'2025-11-16'),
  -- till / paybill
  ('till_number','2025.1',1,500000,0,'Free for customer, merchant pays','2025-11-16'),
  ('paybill','2025.1',1,500000,0,'Free for customer, merchant pays','2025-11-16'),
  -- atm withdrawal
  ('atm_withdrawal','2025.1',500,1000,33,null,'2025-11-16'),
  ('atm_withdrawal','2025.1',1001,1500,33,null,'2025-11-16'),
  ('atm_withdrawal','2025.1',1501,2500,55,null,'2025-11-16'),
  ('atm_withdrawal','2025.1',2501,3500,77,null,'2025-11-16'),
  ('atm_withdrawal','2025.1',3501,5000,121,null,'2025-11-16'),
  ('atm_withdrawal','2025.1',5001,7500,143,null,'2025-11-16'),
  ('atm_withdrawal','2025.1',7501,10000,165,null,'2025-11-16'),
  ('atm_withdrawal','2025.1',10001,20000,209,null,'2025-11-16'),
  ('atm_withdrawal','2025.1',20001,40000,253,null,'2025-11-16'),
  -- airtime / bank transfer
  ('airtime_purchase','2025.1',10,10000,0,'Buying airtime is free','2025-11-16'),
  ('bank_transfer','2025.1',100,500,55,null,'2025-11-16'),
  ('bank_transfer','2025.1',501,1000,55,null,'2025-11-16'),
  ('bank_transfer','2025.1',1001,1500,55,null,'2025-11-16'),
  ('bank_transfer','2025.1',1501,2500,55,null,'2025-11-16'),
  ('bank_transfer','2025.1',2501,5000,88,null,'2025-11-16'),
  ('bank_transfer','2025.1',5001,10000,110,null,'2025-11-16'),
  ('bank_transfer','2025.1',10001,20000,110,null,'2025-11-16'),
  ('bank_transfer','2025.1',20001,150000,110,null,'2025-11-16');
