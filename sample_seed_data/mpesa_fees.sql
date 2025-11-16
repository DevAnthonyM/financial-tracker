-- ============================================
-- M-PESA TRANSACTION FEES TABLE
-- Based on Safaricom M-Pesa Kenya fee structure (2025)
-- ============================================

-- ============================================
-- M-PESA SEND MONEY FEES (Person to Person)
-- ============================================
CREATE TABLE mpesa_send_money_fees (
  id SERIAL PRIMARY KEY,
  min_amount DECIMAL(10,2) NOT NULL,
  max_amount DECIMAL(10,2) NOT NULL,
  fee DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO mpesa_send_money_fees (min_amount, max_amount, fee) VALUES
(1.00, 100.00, 0.00),          -- Free for small amounts
(101.00, 500.00, 7.00),
(501.00, 1000.00, 13.00),
(1001.00, 1500.00, 23.00),
(1501.00, 2500.00, 33.00),
(2501.00, 3500.00, 52.00),
(3501.00, 5000.00, 58.00),
(5001.00, 7500.00, 78.00),
(7501.00, 10000.00, 90.00),
(10001.00, 15000.00, 100.00),
(15001.00, 20000.00, 105.00),
(20001.00, 35000.00, 108.00),
(35001.00, 50000.00, 110.00),
(50001.00, 70000.00, 113.00),
(70001.00, 150000.00, 115.00),
(150001.00, 250000.00, 117.00),
(250001.00, 500000.00, 120.00);

-- ============================================
-- M-PESA WITHDRAW FROM AGENT FEES
-- ============================================
CREATE TABLE mpesa_withdraw_fees (
  id SERIAL PRIMARY KEY,
  min_amount DECIMAL(10,2) NOT NULL,
  max_amount DECIMAL(10,2) NOT NULL,
  fee DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO mpesa_withdraw_fees (min_amount, max_amount, fee) VALUES
(50.00, 100.00, 11.00),
(101.00, 500.00, 29.00),
(501.00, 1000.00, 29.00),
(1001.00, 1500.00, 29.00),
(1501.00, 2500.00, 52.00),
(2501.00, 3500.00, 69.00),
(3501.00, 5000.00, 87.00),
(5001.00, 7500.00, 115.00),
(7501.00, 10000.00, 167.00),
(10001.00, 15000.00, 185.00),
(15001.00, 20000.00, 197.00),
(20001.00, 35000.00, 278.00),
(35001.00, 50000.00, 309.00),
(50001.00, 70000.00, 325.00),
(70001.00, 150000.00, 330.00),
(150001.00, 250000.00, 335.00);

-- ============================================
-- M-PESA BUY GOODS & SERVICES (TILL/PAYBILL) FEES
-- ============================================
CREATE TABLE mpesa_till_paybill_fees (
  id SERIAL PRIMARY KEY,
  min_amount DECIMAL(10,2) NOT NULL,
  max_amount DECIMAL(10,2) NOT NULL,
  fee DECIMAL(10,2) NOT NULL,
  transaction_type VARCHAR(20) NOT NULL, -- 'till' or 'paybill'
  created_at TIMESTAMP DEFAULT NOW()
);

-- Buy Goods (Till Number) - Usually FREE for customer
INSERT INTO mpesa_till_paybill_fees (min_amount, max_amount, fee, transaction_type) VALUES
(1.00, 500000.00, 0.00, 'till');

-- PayBill - Usually FREE for customer (merchant pays)
INSERT INTO mpesa_till_paybill_fees (min_amount, max_amount, fee, transaction_type) VALUES
(1.00, 500000.00, 0.00, 'paybill');

-- ============================================
-- M-PESA ATM WITHDRAWAL FEES
-- ============================================
CREATE TABLE mpesa_atm_fees (
  id SERIAL PRIMARY KEY,
  min_amount DECIMAL(10,2) NOT NULL,
  max_amount DECIMAL(10,2) NOT NULL,
  fee DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO mpesa_atm_fees (min_amount, max_amount, fee) VALUES
(500.00, 1000.00, 33.00),
(1001.00, 1500.00, 33.00),
(1501.00, 2500.00, 55.00),
(2501.00, 3500.00, 77.00),
(3501.00, 5000.00, 121.00),
(5001.00, 7500.00, 143.00),
(7501.00, 10000.00, 165.00),
(10001.00, 20000.00, 209.00),
(20001.00, 40000.00, 253.00);

-- ============================================
-- M-PESA AIRTIME PURCHASE FEES
-- ============================================
-- Note: Buying airtime via M-Pesa is FREE
CREATE TABLE mpesa_airtime_fees (
  id SERIAL PRIMARY KEY,
  min_amount DECIMAL(10,2) NOT NULL,
  max_amount DECIMAL(10,2) NOT NULL,
  fee DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO mpesa_airtime_fees (min_amount, max_amount, fee) VALUES
(10.00, 10000.00, 0.00);  -- Airtime purchase is FREE

-- ============================================
-- M-PESA BANK TRANSFER (M-PESA TO BANK) FEES
-- ============================================
CREATE TABLE mpesa_bank_transfer_fees (
  id SERIAL PRIMARY KEY,
  min_amount DECIMAL(10,2) NOT NULL,
  max_amount DECIMAL(10,2) NOT NULL,
  fee DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO mpesa_bank_transfer_fees (min_amount, max_amount, fee) VALUES
(100.00, 500.00, 55.00),
(501.00, 1000.00, 55.00),
(1001.00, 1500.00, 55.00),
(1501.00, 2500.00, 55.00),
(2501.00, 5000.00, 88.00),
(5001.00, 10000.00, 110.00),
(10001.00, 20000.00, 110.00),
(20001.00, 150000.00, 110.00);

-- ============================================
-- HELPER FUNCTION: Calculate M-Pesa Fee
-- ============================================
-- This function can be called from your app to calculate fees
CREATE OR REPLACE FUNCTION calculate_mpesa_fee(
  transaction_amount DECIMAL(10,2),
  transaction_type VARCHAR(50)
) RETURNS DECIMAL(10,2) AS $$
DECLARE
  calculated_fee DECIMAL(10,2);
BEGIN
  CASE transaction_type
    WHEN 'send_money' THEN
      SELECT fee INTO calculated_fee
      FROM mpesa_send_money_fees
      WHERE transaction_amount >= min_amount 
        AND transaction_amount <= max_amount
      LIMIT 1;
    
    WHEN 'withdraw' THEN
      SELECT fee INTO calculated_fee
      FROM mpesa_withdraw_fees
      WHERE transaction_amount >= min_amount 
        AND transaction_amount <= max_amount
      LIMIT 1;
    
    WHEN 'till' THEN
      SELECT fee INTO calculated_fee
      FROM mpesa_till_paybill_fees
      WHERE transaction_amount >= min_amount 
        AND transaction_amount <= max_amount
        AND transaction_type = 'till'
      LIMIT 1;
    
    WHEN 'paybill' THEN
      SELECT fee INTO calculated_fee
      FROM mpesa_till_paybill_fees
      WHERE transaction_amount >= min_amount 
        AND transaction_amount <= max_amount
        AND transaction_type = 'paybill'
      LIMIT 1;
    
    WHEN 'atm' THEN
      SELECT fee INTO calculated_fee
      FROM mpesa_atm_fees
      WHERE transaction_amount >= min_amount 
        AND transaction_amount <= max_amount
      LIMIT 1;
    
    WHEN 'airtime' THEN
      SELECT fee INTO calculated_fee
      FROM mpesa_airtime_fees
      WHERE transaction_amount >= min_amount 
        AND transaction_amount <= max_amount
      LIMIT 1;
    
    WHEN 'bank_transfer' THEN
      SELECT fee INTO calculated_fee
      FROM mpesa_bank_transfer_fees
      WHERE transaction_amount >= min_amount 
        AND transaction_amount <= max_amount
      LIMIT 1;
    
    ELSE
      calculated_fee := 0.00;
  END CASE;
  
  RETURN COALESCE(calculated_fee, 0.00);
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- USAGE EXAMPLES:
-- ============================================
-- SELECT calculate_mpesa_fee(1500.00, 'send_money');      -- Returns: 23.00
-- SELECT calculate_mpesa_fee(5000.00, 'withdraw');        -- Returns: 87.00
-- SELECT calculate_mpesa_fee(2000.00, 'till');            -- Returns: 0.00 (free)
-- SELECT calculate_mpesa_fee(100.00, 'airtime');          -- Returns: 0.00 (free)
