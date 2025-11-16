// ============================================
// M-PESA FEE CALCULATOR UTILITY
// Usage: import { calculateMpesaFee } from '@/utils/mpesaFees'
// ============================================

import mpesaFeesConfig from './mpesa_fees_config.json';

/**
 * Calculate M-Pesa transaction fee based on amount and transaction type
 * @param {number} amount - Transaction amount in KES
 * @param {string} transactionType - Type of transaction (send_money, withdraw_agent, etc.)
 * @returns {number} - Fee amount in KES
 */
export function calculateMpesaFee(amount, transactionType) {
  if (!amount || amount <= 0) return 0;
  
  const feeTable = mpesaFeesConfig.mpesa_fees[transactionType];
  
  if (!feeTable) {
    console.warn(`Unknown transaction type: ${transactionType}`);
    return 0;
  }
  
  // Find the fee bracket that matches the amount
  const bracket = feeTable.find(
    (tier) => amount >= tier.min && amount <= tier.max
  );
  
  return bracket ? bracket.fee : 0;
}

/**
 * Get total cost including M-Pesa fee
 * @param {number} amount - Transaction amount in KES
 * @param {string} transactionType - Type of transaction
 * @returns {object} - { amount, fee, total }
 */
export function getTotalWithFee(amount, transactionType) {
  const fee = calculateMpesaFee(amount, transactionType);
  return {
    amount: amount,
    fee: fee,
    total: amount + fee
  };
}

/**
 * Check if a transaction type has fees
 * @param {string} transactionType - Type of transaction
 * @returns {boolean}
 */
export function hasFee(transactionType) {
  const transactionInfo = mpesaFeesConfig.transaction_types.find(
    (t) => t.id === transactionType
  );
  return transactionInfo ? transactionInfo.has_fee : false;
}

/**
 * Get all available transaction types
 * @returns {array} - Array of transaction type objects
 */
export function getTransactionTypes() {
  return mpesaFeesConfig.transaction_types;
}

/**
 * Get fee optimization tips for a transaction type
 * @param {string} transactionType - Type of transaction
 * @returns {array} - Array of tips
 */
export function getOptimizationTips(transactionType) {
  return mpesaFeesConfig.fee_optimization_tips[transactionType] || [];
}

/**
 * Estimate monthly M-Pesa fees based on transaction history
 * @param {array} transactions - Array of transaction objects with {amount, type}
 * @returns {object} - Breakdown of fees by transaction type
 */
export function estimateMonthlyFees(transactions) {
  const feeBreakdown = {};
  let totalFees = 0;
  
  transactions.forEach((tx) => {
    const fee = calculateMpesaFee(tx.amount, tx.type);
    
    if (!feeBreakdown[tx.type]) {
      feeBreakdown[tx.type] = {
        count: 0,
        totalAmount: 0,
        totalFees: 0
      };
    }
    
    feeBreakdown[tx.type].count += 1;
    feeBreakdown[tx.type].totalAmount += tx.amount;
    feeBreakdown[tx.type].totalFees += fee;
    totalFees += fee;
  });
  
  return {
    totalFees,
    breakdown: feeBreakdown,
    transactionCount: transactions.length
  };
}

/**
 * Suggest better transaction method to minimize fees
 * @param {number} amount - Transaction amount
 * @param {string} currentType - Current transaction type
 * @returns {object} - Suggestion with potential savings
 */
export function suggestBetterOption(amount, currentType) {
  const currentFee = calculateMpesaFee(amount, currentType);
  
  // Check alternative methods
  const alternatives = {
    till_number: calculateMpesaFee(amount, 'till_number'),
    paybill: calculateMpesaFee(amount, 'paybill'),
    bank_transfer: calculateMpesaFee(amount, 'bank_transfer')
  };
  
  // Find cheapest alternative
  let bestOption = null;
  let maxSavings = 0;
  
  Object.entries(alternatives).forEach(([type, fee]) => {
    const savings = currentFee - fee;
    if (savings > maxSavings) {
      maxSavings = savings;
      bestOption = type;
    }
  });
  
  if (bestOption && maxSavings > 0) {
    return {
      suggested: true,
      alternativeMethod: bestOption,
      currentFee,
      alternativeFee: alternatives[bestOption],
      savings: maxSavings,
      message: `Save KES ${maxSavings} by using ${bestOption.replace('_', ' ')} instead`
    };
  }
  
  return {
    suggested: false,
    message: 'Current method is optimal'
  };
}

/**
 * Format fee breakdown for display
 * @param {number} amount - Transaction amount
 * @param {string} transactionType - Type of transaction
 * @returns {string} - Formatted string for UI display
 */
export function formatFeeBreakdown(amount, transactionType) {
  const fee = calculateMpesaFee(amount, transactionType);
  const total = amount + fee;
  
  if (fee === 0) {
    return `Amount: KES ${amount.toFixed(2)} (No fee!)`;
  }
  
  return `Amount: KES ${amount.toFixed(2)} + Fee: KES ${fee.toFixed(2)} = Total: KES ${total.toFixed(2)}`;
}

// Export configuration for direct access if needed
export const MPESA_CONFIG = mpesaFeesConfig;

// ============================================
// USAGE EXAMPLES:
// ============================================
/*
// Example 1: Calculate fee for sending money
const fee = calculateMpesaFee(1500, 'send_money');
console.log(fee); // 23

// Example 2: Get total with fee
const total = getTotalWithFee(1500, 'send_money');
console.log(total); // { amount: 1500, fee: 23, total: 1523 }

// Example 3: Check if transaction type has fees
const hasAirtimeFee = hasFee('airtime_purchase');
console.log(hasAirtimeFee); // false

// Example 4: Get optimization suggestions
const suggestion = suggestBetterOption(5000, 'send_money');
console.log(suggestion);

// Example 5: Estimate monthly fees from transactions
const transactions = [
  { amount: 1500, type: 'send_money' },
  { amount: 2000, type: 'withdraw_agent' },
  { amount: 500, type: 'till_number' }
];
const monthlyEstimate = estimateMonthlyFees(transactions);
console.log(monthlyEstimate);
*/
