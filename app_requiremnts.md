# **FINANCIAL TRACKING WEB APP - TECHNICAL REQUIREMENTS**
## **For Personal Finance Management (Kimenju's Financial Plan)**

---

## **🎯 PROJECT VISION**

**What**: A personal finance tracking web app that helps monitor daily expenses, enforce budget limits, track payment schedules, and maintain financial discipline.

**Why**: To transform from manual/reactive money management to automated/proactive financial planning with real-time visibility and alerts.

**Who**: Solo user (yourself) with potential for family member access later.

**Success Metrics**:
- Daily expense entry takes <30 seconds
- Budget status visible at a glance
- Alerts prevent overspending
- Zero manual calculations needed

---

## **📋 CORE FEATURES (Must Have)**

### **Feature 1: Quick Expense Entry**
**User Story**: "I just paid KES 60 for food. I need to log it in 15 seconds while on the matatu."

**Requirements**:
- One-screen entry form
- Fields:
  - Amount (number input, autofocus)
  - Category (quick-select buttons, not dropdown)
  - Vendor/Description (optional, text input)
  - Date (defaults to today, can change)
  - M-Pesa Fee (auto-calculated or manual override)
- Save with one tap
- Confirmation message: "KES 60 logged. Budget remaining: KES 12,450"
- Works offline, syncs when online

### **Feature 2: Income Tracking**
**User Story**: "I got paid KES 18,500 mid-month. I need to log it and see how to allocate it."

**Requirements**:
- Income entry form (similar to expense)
- Fields:
  - Amount
  - Source (Freelance, Wifi Sharing, Business Partner, Family Gift)
  - Payment type (Mid-month, Start-of-month, One-time)
  - Date
- Auto-allocation suggestion:
  - "KES 18,500 received. Suggested allocation:
    - Emergency Fund: KES 5,000
    - Operating Cash: KES 10,000
    - Business: KES 2,000
    - Savings: KES 1,500"
- Can accept or customize allocation

### **Feature 3: Budget Dashboard**
**User Story**: "I want to open the app and immediately know if I'm on track this month."

**Requirements**:
- Hero metrics at top:
  - Current Month Budget: KES 21,841
  - Spent So Far: KES 12,450 (57%)
  - Days Remaining: 18
  - Daily Budget Available: KES 522
- Visual indicators:
  - Green: Below 70% of budget
  - Yellow: 70-90% of budget
  - Red: Above 90% of budget
- Category breakdown (horizontal progress bars):
  - Fixed (KES 11,676): KES 11,000 used (94%) ✅
  - Food (KES 2,039): KES 1,200 used (59%) ✅
  - Family (KES 2,033): KES 2,500 used (123%) 🚨
  - Shopping (KES 1,356): KES 800 used (59%) ✅
- Quick stats:
  - Last expense: "KES 60 - Food - 2 hours ago"
  - Next payment due: "Wifi KES 1,523 - Nov 15"
  - Emergency Fund: "KES 20,000 / KES 35,000 (57%)"

### **Feature 4: Category Budget Management**
**User Story**: "I need to know if I can spend KES 500 on street food without breaking my budget."

**Requirements**:
- Pre-configured categories with limits:
  
**TIER 1 - Fixed (KES 11,676/month):**
  - Rent: KES 3,560
  - AI Tool 1: KES 3,046
  - Work Tool 2: KES 507
  - Work Tool 3: KES 507
  - New AI Tool: KES 1,013 (starts Dec)
  - Wifi: KES 1,523
  - Family Emergency Savings: KES 1,013
  - Website: KES 532

**TIER 2 - Essential (KES 3,515/month):**
  - Food: KES 2,039
  - Airtime: KES 810
  - Transport: KES 666

**TIER 3 - Controlled (KES 5,650/month):**
  - Family Support: KES 2,033
  - Shopping: KES 1,356
  - Nairobi Trips: KES 1,013
  - Business: KES 1,013
  - Street Food: KES 235

**TIER 4 - Emergency (KES 1,000/month):**
  - Medical: KES 1,000

- Each category shows:
  - Budget limit
  - Spent amount
  - Remaining
  - Percentage used
  - Status indicator

### **Feature 5: Payment Calendar**
**User Story**: "I need to know what's due this week so I can prepare the money."

**Requirements**:
- Calendar view showing:
  - Recurring payments with dates
  - One-time upcoming expenses
  - Color coded by amount:
    - Large (>KES 2,500): Red
    - Medium (KES 500-2,500): Yellow
    - Small (<KES 500): Green
- Upcoming 7 days highlighted
- Monthly view option
- Recurring payments:
  - 3rd-7th: Rent (KES 3,560)
  - 13th: New AI Tool (KES 1,013)
  - 14th: AI Tool 1 (KES 3,046)
  - 15th: Wifi (KES 1,523)
  - 22nd: Work Tool 3 (KES 507)
  - 29th: Work Tool 2 (KES 507)
- Push notifications 1 day before payment due

### **Feature 6: Budget Alerts**
**User Story**: "Warn me when I'm about to overspend so I can stop myself."

**Alerts needed**:
- 70% of category budget: "⚠️ You've used 70% of your Food budget (KES 1,427 of KES 2,039)"
- 90% of category budget: "🚨 ALERT: 90% of Family Support used (KES 1,830 of KES 2,033). Only KES 203 left!"
- 100% of category budget: "🛑 LIMIT REACHED: Family Support budget exhausted. No more spending in this category!"
- Trying to exceed: "❌ Cannot log. This would exceed your Family Support limit by KES 500."
- Daily overspending: "📊 You spent KES 1,200 today. Daily target is KES 728."
- Monthly projection: "📈 At current rate, you'll spend KES 28,500 this month (target: KES 21,841)"

### **Feature 7: Emergency Fund Tracker**
**User Story**: "I want to see my emergency fund growing separately from daily money."

**Requirements**:
- Dedicated emergency fund section
- Shows:
  - Current amount: KES 20,000
  - Target: KES 35,000
  - Percentage: 57%
  - Visual progress bar
  - Projected completion date (based on monthly additions)
- Separate from main balance
- Transaction history for emergency fund
- Can set target and monthly contribution

### **Feature 8: Weekly Review Report**
**User Story**: "Every Sunday evening, I need to review the week and plan for next week."

**Requirements**:
- Auto-generated weekly report (every Sunday 6pm)
- Shows:
  - Week's total spending: KES 3,450
  - Budget used: 15.8% of monthly
  - Top 3 categories:
    1. Food: KES 1,200
    2. Transport: KES 800
    3. Family: KES 650
  - M-Pesa fees paid: KES 145
  - Savings this week: KES 1,200
  - Status: ✅ On track / ⚠️ Over budget / 🚨 Danger zone
- Comparison to previous week
- Actionable insights:
  - "You spent 30% less on food this week! 👏"
  - "Family support is 150% of budget. Consider reducing."

### **Feature 9: Monthly Summary**
**User Story**: "At month-end, I need a complete financial picture for planning next month."

**Requirements**:
- Generated automatically on 1st of new month
- Comprehensive breakdown:
  - Total income vs expenses
  - Net cash flow
  - Savings rate
  - Category-by-category comparison to budget
  - Spending trends (up/down from previous month)
  - M-Pesa fees total
  - Budget adherence score (0-100%)
- Visual charts:
  - Income sources (pie chart)
  - Expense categories (pie chart)
  - Daily spending trend (line chart)
  - Budget vs actual (bar chart)

### **Feature 10: M-Pesa Fee Calculator**
**User Story**: "When I enter an expense, I want the M-Pesa fee auto-calculated."

**Requirements**:
- Built-in M-Pesa fee calculator:
  - Up to KES 100: Free
  - KES 101-500: KES 7
  - KES 501-1,000: KES 13
  - KES 1,001-1,500: KES 23
  - KES 1,501-2,500: KES 33
  - KES 2,501-3,000: KES 53
  - Above KES 3,000: Higher (user can input)
- Auto-applies when amount entered
- Can be overridden manually
- Tracks total M-Pesa fees separately
- Shows monthly M-Pesa fee total on dashboard

---

## **📊 DATA MODEL**

### **1. User Profile**
```javascript
{
  id: string,
  name: string,
  email: string,
  currentCash: number,
  emergencyFund: number,
  familyMoneyHeld: number,
  budgetTier: 'survival' | 'sustainable' | 'growth',
  createdAt: timestamp,
  settings: {
    currency: 'KES',
    monthStartDay: 1,
    alertsEnabled: boolean,
    weeklyReportDay: 'Sunday',
    weeklyReportTime: '18:00'
  }
}
```

### **2. Budget Categories**
```javascript
{
  id: string,
  name: string,
  tier: 1 | 2 | 3 | 4,
  monthlyLimit: number,
  isFixed: boolean,
  icon: string,
  color: string,
  description: string
}
```

### **3. Transactions**
```javascript
{
  id: string,
  userId: string,
  type: 'income' | 'expense',
  amount: number,
  mpesaFee: number,
  totalCost: number, // amount + mpesaFee
  categoryId: string,
  vendor: string,
  description: string,
  date: timestamp,
  paymentMethod: 'mpesa' | 'cash' | 'bank',
  isRecurring: boolean,
  tags: string[],
  createdAt: timestamp
}
```

### **4. Recurring Payments**
```javascript
{
  id: string,
  userId: string,
  name: string,
  amount: number,
  categoryId: string,
  frequency: 'monthly' | 'quarterly' | 'yearly',
  dayOfMonth: number,
  nextDueDate: timestamp,
  isActive: boolean,
  reminderDaysBefore: 1
}
```

### **5. Budget Period**
```javascript
{
  id: string,
  userId: string,
  month: string, // 'YYYY-MM'
  totalBudget: number,
  totalSpent: number,
  totalIncome: number,
  categoryBudgets: {
    [categoryId]: {
      limit: number,
      spent: number,
      transactions: number
    }
  },
  status: 'on-track' | 'warning' | 'exceeded',
  startDate: timestamp,
  endDate: timestamp
}
```

### **6. Emergency Fund**
```javascript
{
  id: string,
  userId: string,
  currentAmount: number,
  targetAmount: number,
  monthlyContribution: number,
  transactions: [{
    amount: number,
    type: 'deposit' | 'withdrawal',
    reason: string,
    date: timestamp
  }],
  projectedCompletionDate: timestamp
}
```

### **7. Alerts**
```javascript
{
  id: string,
  userId: string,
  type: 'budget_70' | 'budget_90' | 'limit_exceeded' | 'payment_due',
  severity: 'info' | 'warning' | 'critical',
  message: string,
  categoryId: string,
  isRead: boolean,
  createdAt: timestamp
}
```

---

## **🎨 USER INTERFACE MOCKUP**

### **Page 1: Dashboard (Home)**
```
┌─────────────────────────────────────┐
│ 💰 Financial Dashboard      [☰ Menu]│
├─────────────────────────────────────┤
│                                      │
│  November 2025 - Day 14 of 30       │
│                                      │
│  ╔════════════════════════════════╗ │
│  ║  Monthly Budget                ║ │
│  ║  KES 12,450 / KES 21,841      ║ │
│  ║  [████████░░░░░] 57%          ║ │
│  ║  ✅ ON TRACK                   ║ │
│  ╚════════════════════════════════╝ │
│                                      │
│  Daily Budget Available              │
│  KES 522/day (16 days left)         │
│                                      │
│  ┌─────────────────────────────┐   │
│  │ 🏠 Fixed       94% ████████░│   │
│  │ KES 11,000 / KES 11,676     │   │
│  └─────────────────────────────┘   │
│                                      │
│  ┌─────────────────────────────┐   │
│  │ 🍽️ Food        59% █████░░░│   │
│  │ KES 1,200 / KES 2,039       │   │
│  └─────────────────────────────┘   │
│                                      │
│  ┌─────────────────────────────┐   │
│  │ 👨‍👩‍👧 Family    123% ████████│   │
│  │ KES 2,500 / KES 2,033  🚨   │   │
│  └─────────────────────────────┘   │
│                                      │
│  [View All Categories →]            │
│                                      │
│  ┌────────────────────────────────┐│
│  │ Emergency Fund Progress        ││
│  │ KES 20,000 / KES 35,000        ││
│  │ [███████░░░░░] 57%             ││
│  │ Target: Feb 2026               ││
│  └────────────────────────────────┘│
│                                      │
│  ┌────────────────────────────────┐│
│  │ 💳 Upcoming Payments (7 days)  ││
│  │ Nov 15 - Wifi - KES 1,523      ││
│  │ Nov 22 - Work Tool 3 - KES 507 ││
│  │ [View All →]                   ││
│  └────────────────────────────────┘│
│                                      │
├─────────────────────────────────────┤
│ [➕ Add Expense] [💵 Add Income]    │
└─────────────────────────────────────┘
```

### **Page 2: Quick Expense Entry**
```
┌─────────────────────────────────────┐
│ ← Back          Add Expense          │
├─────────────────────────────────────┤
│                                      │
│  Amount (KES) *                      │
│  ┌────────────────────────────────┐ │
│  │ [        60        ]           │ │
│  └────────────────────────────────┘ │
│                                      │
│  Category *                          │
│  ┌──────┐ ┌──────┐ ┌──────┐        │
│  │ 🍽️   │ │ 🚌   │ │ 👨‍👩‍👧 │        │
│  │ Food │ │Trans │ │Family│        │
│  └──────┘ └──────┘ └──────┘        │
│  ┌──────┐ ┌──────┐ ┌──────┐        │
│  │ 🛒   │ │ 💼   │ │ 📱   │        │
│  │ Shop │ │ Biz  │ │Airtm │        │
│  └──────┘ └──────┘ └──────┘        │
│  [More Categories ▼]                │
│                                      │
│  Vendor/Description                  │
│  ┌────────────────────────────────┐ │
│  │ Martin Wambui                  │ │
│  └────────────────────────────────┘ │
│                                      │
│  Date                                │
│  ┌────────────────────────────────┐ │
│  │ Nov 14, 2025      [📅]         │ │
│  └────────────────────────────────┘ │
│                                      │
│  M-Pesa Fee                          │
│  ┌────────────────────────────────┐ │
│  │ KES 7 (auto-calculated)   [✏️] │ │
│  └────────────────────────────────┘ │
│                                      │
│  Total Cost: KES 67                  │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ Food Budget After:              │ │
│  │ KES 1,972 / KES 2,039 (97%)    │ │
│  │ ✅ Within budget                │ │
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │      [SAVE EXPENSE]             │ │
│  └────────────────────────────────┘ │
│                                      │
└─────────────────────────────────────┘
```

### **Page 3: Budget Overview**
```
┌─────────────────────────────────────┐
│ ← Back         Budget Status         │
├─────────────────────────────────────┤
│  November 2025                       │
│                                      │
│  📊 Total Budget: KES 21,841        │
│  💸 Spent: KES 12,450 (57%)         │
│  💰 Remaining: KES 9,391            │
│                                      │
│  ═══ TIER 1: FIXED ═══              │
│  KES 11,000 / KES 11,676 (94%)     │
│                                      │
│  ┌─────────────────────────────┐   │
│  │ Rent          KES 3,500      │   │
│  │ [████████████] 100% ✅       │   │
│  └─────────────────────────────┘   │
│                                      │
│  ┌─────────────────────────────┐   │
│  │ AI Tool 1     KES 3,046      │   │
│  │ [████████████] 100% ✅       │   │
│  └─────────────────────────────┘   │
│                                      │
│  [Show All Fixed →]                 │
│                                      │
│  ═══ TIER 2: ESSENTIAL ═══          │
│  KES 1,200 / KES 3,515 (34%)       │
│                                      │
│  ┌─────────────────────────────┐   │
│  │ Food          KES 1,200      │   │
│  │ [████░░░░░░░] 59% ✅         │   │
│  │ KES 839 remaining            │   │
│  └─────────────────────────────┘   │
│                                      │
│  ┌─────────────────────────────┐   │
│  │ Airtime       KES 0          │   │
│  │ [░░░░░░░░░░░] 0% ✅          │   │
│  │ KES 810 remaining            │   │
│  └─────────────────────────────┘   │
│                                      │
│  ═══ TIER 3: CONTROLLED ═══         │
│  KES 3,300 / KES 5,650 (58%)       │
│                                      │
│  ┌─────────────────────────────┐   │
│  │ Family        KES 2,500      │   │
│  │ [█████████████] 123% 🚨      │   │
│  │ OVER by KES 467!             │   │
│  └─────────────────────────────┘   │
│                                      │
│  [Show All Controlled →]            │
│                                      │
└─────────────────────────────────────┘
```

### **Page 4: Alert Center**
```
┌─────────────────────────────────────┐
│ ← Back           Alerts       [Mark]│
├─────────────────────────────────────┤
│                                      │
│  🚨 CRITICAL (1)                    │
│  ┌────────────────────────────────┐│
│  │ Family Support Budget Exceeded ││
│  │ Used: KES 2,500 / KES 2,033   ││
│  │ You're KES 467 over limit!    ││
│  │ 2 hours ago                    ││
│  └────────────────────────────────┘│
│                                      │
│  ⚠️ WARNING (2)                     │
│  ┌────────────────────────────────┐│
│  │ Food Budget: 90% Used          ││
│  │ Only KES 204 left for 16 days ││
│  │ Daily limit: KES 13/day        ││
│  │ 5 hours ago                    ││
│  └────────────────────────────────┘│
│                                      │
│  ┌────────────────────────────────┐│
│  │ Payment Due Tomorrow           ││
│  │ Wifi - KES 1,523 due Nov 15   ││
│  │ 1 day ago                      ││
│  └────────────────────────────────┘│
│                                      │
│  ℹ️ INFO (1)                        │
│  ┌────────────────────────────────┐│
│  │ Mid-Month Payment Expected     ││
│  │ Freelance payment window open ││
│  │ Nov 15-17 (today is Nov 14)  ││
│  │ 3 hours ago                    ││
│  └────────────────────────────────┘│
│                                      │
│  ─────────────────────────────      │
│                                      │
│  PAST ALERTS (Mark all as read)    │
│  [View History →]                   │
│                                      │
└─────────────────────────────────────┘
```

---

## **⚙️ TECHNICAL STACK RECOMMENDATIONS**

### **Frontend:**
- **Framework**: Next.js 14 (React)
  - Server-side rendering for fast load
  - Built-in API routes
  - Good mobile experience
- **Styling**: Tailwind CSS
  - Fast development
  - Mobile-first responsive
  - Custom color scheme for budget tiers
- **State Management**: Zustand or React Context
  - Simple, not over-engineered
  - Good for small apps
- **Charts**: Recharts or Chart.js
  - Simple, responsive charts
  - Good for financial data visualization
- **Date Handling**: date-fns
  - Lightweight, better than moment
- **Forms**: React Hook Form
  - Fast validation
  - Good UX

### **Backend:**
- **Database**: Supabase (PostgreSQL)
  - Free tier generous
  - Built-in auth
  - Real-time subscriptions
  - Row-level security
- **Authentication**: Supabase Auth
  - Email/password
  - Google OAuth (future)
- **Storage**: Supabase Storage
  - For receipts/documents (future)
- **API**: Next.js API routes
  - No separate backend needed
  - TypeScript support

### **Deployment:**
- **Hosting**: Vercel
  - Free tier
  - Auto-deploy from GitHub
  - Great Next.js support
  - Fast global CDN
- **Domain**: Register on Namecheap or Cloudflare
  - financetracker.yourdomain.com

### **Monitoring:**
- **Analytics**: Vercel Analytics (free)
- **Error Tracking**: Sentry (free tier)
- **Uptime**: UptimeRobot (free)

---

## **🔐 SECURITY REQUIREMENTS**

1. **Authentication:**
   - Email/password login
   - Password reset flow
   - Session management (7-day sessions)

2. **Data Protection:**
   - All financial data encrypted at rest
   - HTTPS only
   - Row-level security in database
   - No financial data in logs

3. **Privacy:**
   - No third-party tracking
   - No data sharing
   - Export data feature (JSON/CSV)
   - Delete account feature

---

## **📱 MOBILE CONSIDERATIONS**

**Must work well on mobile because:**
- 95% of entries will be on phone (after M-Pesa transactions)
- Quick entry is critical
- Push notifications needed

**Mobile-first features:**
- Large touch targets (min 44px)
- Bottom navigation for thumb access
- Swipe gestures (swipe to delete transaction)
- PWA installable on home screen
- Offline mode with sync
- Camera for receipt scanning (future)

---

## **🚀 DEVELOPMENT PHASES**

### **Phase 1: MVP (Week 1-2) - Core Tracking**
**Goal**: Can track expenses and see budget status

✅ Features:
- User registration/login
- Add expense (amount, category, date)
- Dashboard with budget overview
- Basic categories pre-configured
- Transaction list
- M-Pesa fee calculator

❌ Not included:
- Recurring payments
- Alerts
- Reports
- Charts

**Definition of Done**: Can log expenses and see if over/under budget

---

### **Phase 2: Budget Management (Week 3)**
**Goal**: Enforce budget limits and alert user

✅ Features:
- Budget alerts (70%, 90%, 100%)
- Category budget limits
- Budget tier switching (survival/sustainable/growth)
- Alert center
- Budget exceeded warnings before saving

**Definition of Done**: App prevents overspending with alerts

---

### **Phase 3: Planning & Scheduling (Week 4)**
**Goal**: Proactive financial planning

✅ Features:
- Recurring payments
- Payment calendar
- Payment reminders (push notifications)
- Income tracking and allocation
- Emergency fund tracker

**Definition of Done**: Know what's due and when, plan ahead

---

### **Phase 4: Insights & Optimization (Week 5)**
**Goal**: Learn from spending patterns

✅ Features:
- Weekly review report (auto-generated)
- Monthly summary report
- Charts and visualizations
- Spending trends
- Budget vs actual comparisons
- M-Pesa fee tracking/optimization tips

**Definition of Done**: Actionable insights to improve finances

---

### **Phase 5: Polish & Advanced (Week 6+)**
**Goal**: Production-ready, delightful experience

✅ Features:
- PWA installation
- Offline mode
- Data export
- Receipt attachments
- Family member support (view-only)
- Bulk transaction import (CSV)
- Custom categories
- Dark mode

---

## **📊 KEY METRICS TO TRACK (Analytics)**

1. **Engagement:**
   - Daily active users (you!)
   - Transactions per day
   - Time to log expense
   - Days with zero entries (bad!)

2. **Financial Health:**
   - Budget adherence rate
   - Days over budget per month
   - Emergency fund growth rate
   - M-Pesa fees paid

3. **Feature Usage:**
   - Most used categories
   - Alert response rate
   - Report views
   - Budget adjustments made

---

## **🎯 SUCCESS CRITERIA**

**After 1 month of use:**
- [ ] 100% of expenses tracked
- [ ] Budget adherence >80%
- [ ] Emergency fund growing
- [ ] Family support within limit
- [ ] Zero surprises at month-end

**After 3 months of use:**
- [ ] Emergency fund at KES 30,000+
- [ ] Budget adherence >90%
- [ ] Spending patterns identified
- [ ] M-Pesa fees reduced by 30%
- [ ] Net worth increasing monthly

---

## **📋 API ENDPOINTS NEEDED**

### **Authentication**
```
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/reset-password
```

### **Transactions**
```
POST   /api/transactions          # Create transaction
GET    /api/transactions          # List transactions (with filters)
GET    /api/transactions/:id      # Get single transaction
PUT    /api/transactions/:id      # Update transaction
DELETE /api/transactions/:id      # Delete transaction
GET    /api/transactions/summary  # Monthly summary stats
```

### **Budget**
```
GET    /api/budget/current        # Current month budget
POST   /api/budget/tier           # Change budget tier
GET    /api/budget/categories     # All categories with limits
PUT    /api/budget/category/:id   # Update category limit
GET    /api/budget/alerts         # Get active alerts
```

### **Payments**
```
GET    /api/payments/upcoming     # Next 30 days
POST   /api/payments/recurring    # Create recurring payment
GET    /api/payments/recurring    # List recurring payments
PUT    /api/payments/recurring/:id
DELETE /api/payments/recurring/:id
```

### **Reports**
```
GET    /api/reports/weekly        # Weekly summary
GET    /api/reports/monthly       # Monthly summary
GET    /api/reports/custom        # Custom date range
```

### **Emergency Fund**
```
GET    /api/emergency-fund        # Current status
POST   /api/emergency-fund/transaction  # Add/withdraw
```

### **User**
```
GET    /api/user/profile
PUT    /api/user/profile
GET    /api/user/settings
PUT    /api/user/settings
POST   /api/user/export          # Export all data
```

---

## **🎨 COLOR SCHEME**

**Budget Status Colors:**
- Green (#10B981): On track, under 70%
- Yellow (#F59E0B): Warning, 70-90%
- Red (#EF4444): Danger, over 90%
- Purple (#8B5CF6): Emergency fund
- Blue (#3B82F6): Income

**Tier Colors:**
- Tier 1 (Fixed): Gray (#6B7280)
- Tier 2 (Essential): Blue (#3B82F6)
- Tier 3 (Controlled): Orange (#F59E0B)
- Tier 4 (Emergency): Red (#EF4444)

---

## **📝 SAMPLE DATABASE SCHEMA (PostgreSQL)**

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  current_cash DECIMAL(10,2) DEFAULT 0,
  emergency_fund DECIMAL(10,2) DEFAULT 0,
  family_money_held DECIMAL(10,2) DEFAULT 0,
  budget_tier VARCHAR(20) DEFAULT 'sustainable',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  name VARCHAR(100) NOT NULL,
  tier INTEGER NOT NULL, -- 1, 2, 3, or 4
  monthly_limit DECIMAL(10,2) NOT NULL,
  is_fixed BOOLEAN DEFAULT FALSE,
  icon VARCHAR(50),
  color VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Transactions table
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  type VARCHAR(20) NOT NULL, -- 'income' or 'expense'
  amount DECIMAL(10,2) NOT NULL,
  mpesa_fee DECIMAL(10,2) DEFAULT 0,
  total_cost DECIMAL(10,2) GENERATED ALWAYS AS (amount + mpesa_fee) STORED,
  category_id UUID REFERENCES categories(id),
  vendor VARCHAR(255),
  description TEXT,
  transaction_date DATE NOT NULL,
  payment_method VARCHAR(50) DEFAULT 'mpesa',
  is_recurring BOOLEAN DEFAULT FALSE,
  tags TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

-- Recurring payments table
CREATE TABLE recurring_payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  category_id UUID REFERENCES categories(id),
  frequency VARCHAR(20) NOT NULL, -- 'monthly', 'quarterly', 'yearly'
  day_of_month INTEGER,
  next_due_date DATE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  reminder_days_before INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Budget periods table
CREATE TABLE budget_periods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  month VARCHAR(7) NOT NULL, -- 'YYYY-MM'
  total_budget DECIMAL(10,2) NOT NULL,
  total_spent DECIMAL(10,2) DEFAULT 0,
  total_income DECIMAL(10,2) DEFAULT 0,
  status VARCHAR(20) DEFAULT 'on-track',
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, month)
);

-- Alerts table
CREATE TABLE alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  type VARCHAR(50) NOT NULL,
  severity VARCHAR(20) NOT NULL,
  message TEXT NOT NULL,
  category_id UUID REFERENCES categories(id),
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Emergency fund transactions
CREATE TABLE emergency_fund_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  amount DECIMAL(10,2) NOT NULL,
  type VARCHAR(20) NOT NULL, -- 'deposit' or 'withdrawal'
  reason TEXT,
  transaction_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_transactions_user_date ON transactions(user_id, transaction_date DESC);
CREATE INDEX idx_transactions_category ON transactions(category_id);
CREATE INDEX idx_budget_periods_user_month ON budget_periods(user_id, month);
CREATE INDEX idx_alerts_user_unread ON alerts(user_id, is_read) WHERE is_read = FALSE;
```

---

## **✅ DEFINITION OF DONE CHECKLIST**

### **For Each Feature:**
- [ ] Works on mobile (test on real phone)
- [ ] Works on desktop
- [ ] Loads in <2 seconds
- [ ] Error handling implemented
- [ ] Loading states shown
- [ ] Success/error messages clear
- [ ] Keyboard accessible
- [ ] Works offline (if applicable)
- [ ] Data validated on frontend and backend
- [ ] Tested with real data

### **Before Launch:**
- [ ] All Phase 1 features complete
- [ ] Test with 1 week of real transactions
- [ ] Budget alerts working correctly
- [ ] M-Pesa fee calculator accurate
- [ ] Mobile PWA installable
- [ ] Backup/export working
- [ ] Security review done
- [ ] Performance optimized (<2s load)

---

## **🎯 START HERE - First 3 Things to Build**

**Day 1: Setup & Auth**
1. Create Next.js project
2. Set up Supabase
3. Build login/signup pages
4. Test authentication flow

**Day 2: Add Expense Form**
1. Create expense entry form
2. Connect to database
3. Implement M-Pesa fee calculator
4. Test saving transactions

**Day 3: Dashboard**
1. Build budget overview dashboard
2. Show total spent vs budget
3. List recent transactions
4. Add category progress bars

**After these 3 days, you'll have a working prototype to use daily!**


**FINAL NOTE**: 

This is everything you need to build a practical, no-fluff expense tracker that will actually help you stick to your financial plan. 

**Start with Phase 1 (MVP) - get it working in 2 weeks, then iterate.**

Focus on these 3 core things:
1. **Easy entry** (log expense in 15 seconds)
2. **Clear status** (am I on track?)
3. **Firm limits** (stop me from overspending)

Everything else is nice-to-have. Get the basics right first.

