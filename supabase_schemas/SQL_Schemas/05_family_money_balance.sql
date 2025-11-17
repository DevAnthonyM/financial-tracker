-- STATUS: Successfully run on Supabase
-- PURPOSE: helper function to adjust family_money balances after transactions

create or replace function update_family_money_balance(
  p_family_money_id uuid,
  p_delta numeric,
  p_type text
)
returns void as $$
begin
  update family_money
  set
    current_balance = current_balance + p_delta,
    total_deposited = case when p_type = 'deposit' then total_deposited + p_delta else total_deposited end,
    total_released = case when p_type = 'release' then total_released + abs(p_delta) else total_released end,
    last_activity = timezone('utc', now())
  where id = p_family_money_id;
end;
$$ language plpgsql;
