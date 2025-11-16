-- ============================================
-- SAMPLE TRANSACTION DATA FOR TESTING
-- November 2025 - Realistic expense examples
-- ============================================

-- This data simulates a realistic month of expenses
-- Use this to test your app's features:
-- - Budget tracking
-- - Category limits
-- - M-Pesa fee calculation
-- - Alert systems
-- - Reports and analytics

-- ============================================
-- WEEK 1: November 1-7, 2025
-- ============================================

-- Friday, Nov 1 (Payday!)
INSERT INTO transactions (transaction_date, category_name, vendor, amount, type, mpesa_type, mpesa_fee, notes) VALUES
('2025-11-01', 'Income', 'Freelance Client', 30000.00, 'income', NULL, 0, 'Freelance payment received'),
('2025-11-01', 'Food', 'Tuskys Supermarket', 1200.00, 'expense', 'till_number', 0, 'Weekly groceries'),
('2025-11-01', 'Transport', 'Matatu to Town', 80.00, 'expense', 'send_money', 0, 'Transport');

-- Saturday, Nov 2
INSERT INTO transactions (transaction_date, category_name, vendor, amount, type, mpesa_type, mpesa_fee, notes) VALUES
('2025-11-02', 'Street Food', 'Mama Oliech', 150.00, 'expense', 'send_money', 7, 'Lunch'),
('2025-11-02', 'Shopping', 'Clothing Shop', 800.00, 'expense', 'till_number', 0, 'New shirt'),
('2025-11-02', 'Airtime', 'Safaricom', 200.00, 'expense', 'airtime_purchase', 0, 'Airtime bundle');

-- Sunday, Nov 3 (Rent Day - Split Payment)
INSERT INTO transactions (transaction_date, category_name, vendor, amount, type, mpesa_type, mpesa_fee, notes) VALUES
('2025-11-03', 'Rent', 'Landlord - Part 1', 3560.00, 'expense', 'send_money', 52, 'Rent payment 1st half');

-- Monday, Nov 4
INSERT INTO transactions (transaction_date, category_name, vendor, amount, type, mpesa_type, mpesa_fee, notes) VALUES
('2025-11-04', 'Food', 'Naivas', 450.00, 'expense', 'till_number', 0, 'Top-up groceries'),
('2025-11-04', 'Transport', 'Boda to Office', 100.00, 'expense', 'send_money', 0, 'Morning transport'),
('2025-11-04', 'Street Food', 'Cafe', 120.00, 'expense', 'send_money', 7, 'Breakfast');

-- Tuesday, Nov 5
INSERT INTO transactions (transaction_date, category_name, vendor, amount, type, mpesa_type, mpesa_fee, notes) VALUES
('2025-11-05', 'Family Support', 'Mom', 500.00, 'expense', 'send_money', 13, 'Help for mom'),
('2025-11-05', 'Transport', 'Matatu', 80.00, 'expense', 'send_money', 0, 'Transport'),
('2025-11-05', 'Airtime', 'Safaricom', 100.00, 'expense', 'airtime_purchase', 0, 'Airtime');

-- Wednesday, Nov 6
INSERT INTO transactions (transaction_date, category_name, vendor, amount, type, mpesa_type, mpesa_fee, notes) VALUES
('2025-11-06', 'Business', 'Domain Renewal', 800.00, 'expense', 'paybill', 0, 'DecisionPulse domain'),
('2025-11-06', 'Food', 'Quick Mart', 300.00, 'expense', 'till_number', 0, 'Lunch items');

-- Thursday, Nov 7 (Rent Day - 2nd Split)
INSERT INTO transactions (transaction_date, category_name, vendor, amount, type, mpesa_type, mpesa_fee, notes) VALUES
('2025-11-07', 'Rent', 'Landlord - Part 2', 3560.00, 'expense', 'send_money', 52, 'Rent payment 2nd half'),
('2025-11-07', 'Transport', 'Matatu', 80.00, 'expense', 'send_money', 0, 'Transport');

-- ============================================
-- WEEK 2: November 8-14, 2025
-- ============================================

-- Friday, Nov 8
INSERT INTO transactions (transaction_date, category_name, vendor, amount, type, mpesa_type, mpesa_fee, notes) VALUES
('2025-11-08', 'Nairobi Trips', 'Nairobi Transport', 400.00, 'expense', 'send_money', 13, 'Trip to Nairobi'),
('2025-11-08', 'Food', 'Restaurant', 650.00, 'expense', 'till_number', 0, 'Dinner in Nairobi'),
('2025-11-08', 'Shopping', 'Electronics Shop', 1200.00, 'expense', 'till_number', 0, 'Phone accessories');

-- Saturday, Nov 9
INSERT INTO transactions (transaction_date, category_name, vendor, amount, type, mpesa_type, mpesa_fee, notes) VALUES
('2025-11-09', 'Family Support', 'Sister', 1000.00, 'expense', 'send_money', 13, 'School fees help'),
('2025-11-09', 'Transport', 'Matatu Back', 400.00, 'expense', 'send_money', 13, 'Back from Nairobi');

-- Sunday, Nov 10
INSERT INTO transactions (transaction_date, category_name, vendor, amount, type, mpesa_type, mpesa_fee, notes) VALUES
('2025-11-10', 'Food', 'Tuskys', 800.00, 'expense', 'till_number', 0, 'Weekly groceries'),
('2025-11-10', 'Street Food', 'Nyama Choma', 350.00, 'expense', 'send_money', 13, 'Sunday treat');

-- Monday, Nov 11
INSERT INTO transactions (transaction_date, category_name, vendor, amount, type, mpesa_type, mpesa_fee, notes) VALUES
('2025-11-11', 'Transport', 'Matatu', 80.00, 'expense', 'send_money', 0, 'Transport'),
('2025-11-11', 'Airtime', 'Safaricom', 150.00, 'expense', 'airtime_purchase', 0, 'Data bundle');

-- Tuesday, Nov 12
INSERT INTO transactions (transaction_date, category_name, vendor, amount, type, mpesa_type, mpesa_fee, notes) VALUES
('2025-11-12', 'Food', 'Lunch', 200.00, 'expense', 'send_money', 7, 'Quick lunch'),
('2025-11-12', 'Medical', 'Chemist', 450.00, 'expense', 'till_number', 0, 'Emergency medication');

-- Wednesday, Nov 13 (New AI Tool Payment)
INSERT INTO transactions (transaction_date, category_name, vendor, amount, type, mpesa_type, mpesa_fee, notes) VALUES
('2025-11-13', 'New AI Tool', 'AI Subscription', 1013.00, 'expense', 'paybill', 0, 'New AI tool subscription'),
('2025-11-13', 'Transport', 'Boda', 120.00, 'expense', 'send_money', 7, 'Quick transport');

-- Thursday, Nov 14 (AI Tool 1 Payment)
INSERT INTO transactions (transaction_date, category_name, vendor, amount, type, mpesa_type, mpesa_fee, notes) VALUES
('2025-11-14', 'AI Tool 1', 'ChatGPT Plus', 3046.00, 'expense', 'paybill', 0, 'AI tool subscription'),
('2025-11-14', 'Food', 'Naivas', 400.00, 'expense', 'till_number', 0, 'Groceries top-up');

-- ============================================
-- WEEK 3: November 15-21, 2025
-- ============================================

-- Friday, Nov 15 (Wifi Payment & Freelance Income)
INSERT INTO transactions (transaction_date, category_name, vendor, amount, type, mpesa_type, mpesa_fee, notes) VALUES
('2025-11-15', 'Wifi', 'Safaricom Home Fiber', 1523.00, 'expense', 'paybill', 0, 'Internet payment'),
('2025-11-15', 'Income', 'Freelance Project 2', 35000.00, 'income', NULL, 0, 'Project payment received');

-- Saturday, Nov 16
INSERT INTO transactions (transaction_date, category_name, vendor, amount, type, mpesa_type, mpesa_fee, notes) VALUES
('2025-11-16', 'Family Emergency Savings', 'Emergency Fund', 1013.00, 'expense', 'bank_transfer', 55, 'Monthly emergency contribution'),
('2025-11-16', 'Food', 'Tuskys', 900.00, 'expense', 'till_number', 0, 'Weekly groceries'),
('2025-11-16', 'Shopping', 'Home Items', 600.00, 'expense', 'till_number', 0, 'Household supplies');

-- Sunday, Nov 17
INSERT INTO transactions (transaction_date, category_name, vendor, amount, type, mpesa_type, mpesa_fee, notes) VALUES
('2025-11-17', 'Family Support', 'Brother', 500.00, 'expense', 'send_money', 13, 'Help for brother'),
('2025-11-17', 'Street Food', 'Chicken Inn', 280.00, 'expense', 'till_number', 0, 'Sunday dinner');

-- Monday, Nov 18
INSERT INTO transactions (transaction_date, category_name, vendor, amount, type, mpesa_type, mpesa_fee, notes) VALUES
('2025-11-18', 'Transport', 'Matatu', 80.00, 'expense', 'send_money', 0, 'Transport'),
('2025-11-18', 'Airtime', 'Safaricom', 200.00, 'expense', 'airtime_purchase', 0, 'Airtime bundle');

-- Tuesday, Nov 19
INSERT INTO transactions (transaction_date, category_name, vendor, amount, type, mpesa_type, mpesa_fee, notes) VALUES
('2025-11-19', 'Food', 'Quick lunch', 180.00, 'expense', 'send_money', 7, 'Lunch'),
('2025-11-19', 'Business', 'Hosting', 213.00, 'expense', 'paybill', 0, 'DecisionPulse hosting');

-- Wednesday, Nov 20
INSERT INTO transactions (transaction_date, category_name, vendor, amount, type, mpesa_type, mpesa_fee, notes) VALUES
('2025-11-20', 'Food', 'Naivas', 350.00, 'expense', 'till_number', 0, 'Groceries'),
('2025-11-20', 'Transport', 'Boda', 100.00, 'expense', 'send_money', 0, 'Quick transport');

-- Thursday, Nov 21
INSERT INTO transactions (transaction_date, category_name, vendor, amount, type, mpesa_type, mpesa_fee, notes) VALUES
('2025-11-21', 'Nairobi Trips', 'Transport + Meals', 613.00, 'expense', 'send_money', 13, 'Business meeting in Nairobi');

-- ============================================
-- WEEK 4: November 22-28, 2025
-- ============================================

-- Friday, Nov 22 (Work Tool 3 Payment)
INSERT INTO transactions (transaction_date, category_name, vendor, amount, type, mpesa_type, mpesa_fee, notes) VALUES
('2025-11-22', 'Work Tool 3', 'Tool Subscription', 507.00, 'expense', 'paybill', 0, 'Work tool payment'),
('2025-11-22', 'Food', 'Restaurant', 450.00, 'expense', 'till_number', 0, 'Friday lunch');

-- Saturday, Nov 23
INSERT INTO transactions (transaction_date, category_name, vendor, amount, type, mpesa_type, mpesa_fee, notes) VALUES
('2025-11-23', 'Food', 'Tuskys', 1100.00, 'expense', 'till_number', 0, 'Weekly groceries'),
('2025-11-23', 'Street Food', 'Cafe', 150.00, 'expense', 'send_money', 7, 'Coffee and snacks');

-- Sunday, Nov 24
INSERT INTO transactions (transaction_date, category_name, vendor, amount, type, mpesa_type, mpesa_fee, notes) VALUES
('2025-11-24', 'Family Support', 'Cousin', 300.00, 'expense', 'send_money', 13, 'Help for cousin'),
('2025-11-24', 'Transport', 'Matatu', 80.00, 'expense', 'send_money', 0, 'Transport');

-- Monday, Nov 25
INSERT INTO transactions (transaction_date, category_name, vendor, amount, type, mpesa_type, mpesa_fee, notes) VALUES
('2025-11-25', 'Airtime', 'Safaricom', 150.00, 'expense', 'airtime_purchase', 0, 'Airtime'),
('2025-11-25', 'Food', 'Lunch', 200.00, 'expense', 'send_money', 7, 'Lunch');

-- Tuesday, Nov 26
INSERT INTO transactions (transaction_date, category_name, vendor, amount, type, mpesa_type, mpesa_fee, notes) VALUES
('2025-11-26', 'Shopping', 'Personal Items', 450.00, 'expense', 'till_number', 0, 'Personal care'),
('2025-11-26', 'Transport', 'Boda', 120.00, 'expense', 'send_money', 7, 'Transport');

-- Wednesday, Nov 27
INSERT INTO transactions (transaction_date, category_name, vendor, amount, type, mpesa_type, mpesa_fee, notes) VALUES
('2025-11-27', 'Food', 'Naivas', 400.00, 'expense', 'till_number', 0, 'Groceries'),
('2025-11-27', 'Medical', 'Doctor Visit', 550.00, 'expense', 'till_number', 0, 'Medical checkup - OVER BUDGET!');

-- Thursday, Nov 28
INSERT INTO transactions (transaction_date, category_name, vendor, amount, type, mpesa_type, mpesa_fee, notes) VALUES
('2025-11-28', 'Transport', 'Matatu', 80.00, 'expense', 'send_money', 0, 'Transport');

-- ============================================
-- WEEK 5: November 29-30, 2025
-- ============================================

-- Friday, Nov 29 (Work Tool 2 Payment & Website)
INSERT INTO transactions (transaction_date, category_name, vendor, amount, type, mpesa_type, mpesa_fee, notes) VALUES
('2025-11-29', 'Work Tool 2', 'Tool Subscription', 507.00, 'expense', 'paybill', 0, 'Work tool payment'),
('2025-11-29', 'Website', 'Domain + Hosting', 532.00, 'expense', 'paybill', 0, 'Website costs'),
('2025-11-29', 'Food', 'End of month groceries', 800.00, 'expense', 'till_number', 0, 'Last groceries');

-- Saturday, Nov 30 (Month End)
INSERT INTO transactions (transaction_date, category_name, vendor, amount, type, mpesa_type, mpesa_fee, notes) VALUES
('2025-11-30', 'Income', 'Freelance Final', 5000.00, 'income', NULL, 0, 'Small project payment'),
('2025-11-30', 'Transport', 'Transport', 80.00, 'expense', 'send_money', 0, 'Transport'),
('2025-11-30', 'Street Food', 'Celebration meal', 350.00, 'expense', 'send_money', 13, 'Month-end treat');

-- ============================================
-- SUMMARY STATS FOR NOVEMBER 2025
-- ============================================

-- Total Income: KES 70,000
-- Total Expenses: ~KES 28,500
-- Total M-Pesa Fees: ~KES 400
-- Net Savings: ~KES 41,100

-- Budget Status:
-- ✅ Tier 1 (Fixed): KES 11,676 / KES 11,676 (100% - All paid)
-- ⚠️ Tier 2 (Essential): KES 4,200 / KES 3,515 (119% - OVER by 19%)
-- ✅ Tier 3 (Controlled): KES 4,913 / KES 5,650 (87% - Under budget)
-- 🚨 Tier 4 (Medical): KES 1,000 / KES 1,000 (100% - At limit)

-- Categories OVER Budget:
-- - Airtime: 148% (KES 800 spent vs KES 810 budget)
-- - Medical: 100% (KES 1,000 spent - at limit)
-- - Transport: 130% (spent more due to Nairobi trips)

-- Categories UNDER Budget:
-- - Family Support: 72% (KES 1,300 vs KES 2,033)
-- - Shopping: 85% (KES 1,050 vs KES 1,356)
-- - Business: 95% (KES 1,013 vs KES 1,013)

-- NOTES:
-- - This is SAMPLE data for testing your app
-- - Adjust amounts and dates as needed for your testing
-- - Some categories intentionally go over budget to test alerts
-- - M-Pesa fees are calculated based on transaction types
