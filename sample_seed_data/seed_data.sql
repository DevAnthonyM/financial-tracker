-- ============================================
-- FINANCIAL TRACKER APP - SEED DATA
-- Date: November 2025
-- ============================================

-- ============================================
-- 1. TIER 1 - FIXED EXPENSES (KES 11,676/month)
-- ============================================
INSERT INTO categories (name, tier, monthly_limit, is_fixed, icon, color, description) VALUES
('Rent', 1, 3560.00, true, 'home', '#6B7280', 'Monthly rent payment'),
('AI Tool 1', 1, 3046.00, true, 'cpu', '#6B7280', 'Primary AI subscription'),
('Work Tool 2', 1, 507.00, true, 'briefcase', '#6B7280', 'Work tool subscription'),
('Work Tool 3', 1, 507.00, true, 'briefcase', '#6B7280', 'Work tool subscription'),
('New AI Tool', 1, 1013.00, true, 'cpu', '#6B7280', 'New AI tool (starts Dec)'),
('Wifi', 1, 1523.00, true, 'wifi', '#6B7280', 'Internet connection'),
('Family Emergency Savings', 1, 1013.00, true, 'shield', '#6B7280', 'Monthly family emergency contribution'),
('Website', 1, 532.00, true, 'globe', '#6B7280', 'Website hosting and domain');

-- ============================================
-- 2. TIER 2 - ESSENTIAL EXPENSES (KES 3,515/month)
-- ============================================
INSERT INTO categories (name, tier, monthly_limit, is_fixed, icon, color, description) VALUES
('Food', 2, 2039.00, false, 'utensils', '#3B82F6', 'Groceries and meals'),
('Airtime', 2, 810.00, false, 'phone', '#3B82F6', 'Mobile airtime and data'),
('Transport', 2, 666.00, false, 'car', '#3B82F6', 'Matatu, boda, transport costs');

-- ============================================
-- 3. TIER 3 - CONTROLLED EXPENSES (KES 5,650/month)
-- ============================================
INSERT INTO categories (name, tier, monthly_limit, is_fixed, icon, color, description) VALUES
('Family Support', 3, 2033.00, false, 'users', '#F59E0B', 'Help for family members'),
('Shopping', 3, 1356.00, false, 'shopping-bag', '#F59E0B', 'Personal shopping and items'),
('Nairobi Trips', 3, 1013.00, false, 'map-pin', '#F59E0B', 'Travel to Nairobi'),
('Business', 3, 1013.00, false, 'trending-up', '#F59E0B', 'DecisionPulse business expenses'),
('Street Food', 3, 235.00, false, 'coffee', '#F59E0B', 'Snacks and street food');

-- ============================================
-- 4. TIER 4 - EMERGENCY (KES 1,000/month)
-- ============================================
INSERT INTO categories (name, tier, monthly_limit, is_fixed, icon, color, description) VALUES
('Medical', 4, 1000.00, false, 'heart', '#EF4444', 'Medical emergencies and health');

-- ============================================
-- 5. BUDGET PERIOD FOR NOVEMBER 2025
-- ============================================
INSERT INTO budget_periods (month, start_date, end_date, total_budget, tier_1_budget, tier_2_budget, tier_3_budget, tier_4_budget) VALUES
('2025-11', '2025-11-01', '2025-11-30', 21841.00, 11676.00, 3515.00, 5650.00, 1000.00);

-- ============================================
-- 6. RECURRING PAYMENTS SCHEDULE
-- ============================================
INSERT INTO recurring_payments (category_name, amount, due_date_of_month, frequency, notification_days_before, is_active) VALUES
('Rent', 3560.00, 3, 'monthly', 1, true),
('Rent', 3560.00, 7, 'monthly', 1, true),  -- Split payment
('New AI Tool', 1013.00, 13, 'monthly', 1, true),
('AI Tool 1', 3046.00, 14, 'monthly', 1, true),
('Wifi', 1523.00, 15, 'monthly', 1, true),
('Work Tool 3', 507.00, 22, 'monthly', 1, true),
('Work Tool 2', 507.00, 29, 'monthly', 1, true);

-- ============================================
-- 7. EMERGENCY FUND INITIAL STATE
-- ============================================
-- Current emergency fund: KES 20,000
-- Target: KES 35,000
INSERT INTO emergency_fund_config (current_amount, target_amount, monthly_contribution) VALUES
(20000.00, 35000.00, 1013.00);

-- ============================================
-- 8. USER DEFAULT SETTINGS
-- ============================================
INSERT INTO user_settings (setting_key, setting_value, description) VALUES
('budget_tier', 'sustainable', 'Current budget mode: survival/sustainable/growth'),
('current_cash', '0', 'Current cash in hand (to be updated)'),
('family_money_held', '6019', 'Money held for family members'),
('emergency_fund', '20000', 'Emergency fund amount'),
('daily_spending_target', '728', 'Target daily spending (21,841 / 30 days)'),
('alert_threshold_warning', '70', 'Warning alert at 70% of budget'),
('alert_threshold_danger', '90', 'Danger alert at 90% of budget'),
('notification_enabled', 'true', 'Push notifications enabled'),
('weekly_report_day', 'Sunday', 'Day for weekly report'),
('weekly_report_time', '18:00', 'Time for weekly report');
