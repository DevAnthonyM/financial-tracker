## **🎯  FEATURES BASED ON YOUR ANSWERS**

### **Feature 11: Family Money Management**
**User Story**: "I'm holding KES 6,019 for family members. I need to track who owns what and when they withdraw."

**Requirements**:

**Dashboard Widget:**
```
┌────────────────────────────────┐
│ 👨‍👩‍👧‍👦 Family Money Held        │
│ Total: KES 6,019               │
│ [View Details →]               │
└────────────────────────────────┘
```

**Family Money Detail Page:**
```
┌─────────────────────────────────────┐
│ ← Back    Family Money Management   │
├─────────────────────────────────────┤
│                                      │
│  Total Held: KES 6,019              │
│  This is NOT your money!            │
│                                      │
│  ═══ BY FAMILY MEMBER ═══           │
│                                      │
│  ┌─────────────────────────────┐   │
│  │ Nyakundi Sophia              │   │
│  │ KES 3,000                    │   │
│  │ Deposited: Oct 15, 2025     │   │
│  │ [💰 Release] [📝 Add Note]  │   │
│  └─────────────────────────────┘   │
│                                      │
│  ┌─────────────────────────────┐   │
│  │ Ombonga Brandon              │   │
│  │ KES 2,019                    │   │
│  │ Deposited: Nov 1, 2025      │   │
│  │ [💰 Release] [📝 Add Note]  │   │
│  └─────────────────────────────┘   │
│                                      │
│  ┌─────────────────────────────┐   │
│  │ LoveThings                   │   │
│  │ KES 1,000                    │   │
│  │ Deposited: Nov 10, 2025     │   │
│  │ [💰 Release] [📝 Add Note]  │   │
│  └─────────────────────────────┘   │
│                                      │
│  [+ Add New Deposit]                │
│                                      │
│  ─────────────────────────────      │
│                                      │
│  📊 Transaction History             │
│  Nov 10 - LoveThings deposited KES 1,000 │
│  Nov 5  - Released KES 500 to Sophia│
│  Oct 15 - Sophia deposited KES 3,500│
│                                      │
└─────────────────────────────────────┘
```

**Key Features:**
- Track money held per family member
- Deposit transactions (when they give you money to hold)
- Release transactions (when they withdraw)
- Notes/reason for each transaction
- Transaction history per person
- Visual distinction: This money doesn't count toward YOUR balance
- Alert when someone hasn't withdrawn in 90+ days

**Data Model Addition:**
```javascript
{
  id: string,
  userId: string,
  familyMemberName: string,
  currentBalance: number,
  totalDeposited: number,
  totalReleased: number,
  transactions: [{
    type: 'deposit' | 'release',
    amount: number,
    date: timestamp,
    note: string,
    receiptUrl: string
  }],
  createdAt: timestamp,
  lastActivity: timestamp
}
```

---

### **Feature 12: Integrated Business Finance Tracking**
**User Story**: "DecisionPulse expenses are part of my budget. I need to see business spending within my overall financial picture, but clearly labeled."

**Implementation:**

**Business Category with Sub-tracking:**
```
Business (Category)
├── DecisionPulse Development
│   ├── Hosting: KES 500
│   ├── Tools: KES 800
│   └── Services: KES 700
└── General Business: KES 13
```

**Business Dashboard Card:**
```
┌────────────────────────────────┐
│ 💼 Business Investment         │
│ KES 2,013 / KES 2,000          │
│ [██████████░] 100.6% ⚠️        │
│                                 │
│ DecisionPulse: KES 1,950       │
│ • Hosting: KES 500             │
│ • Development Tools: KES 800   │
│ • Online Services: KES 650     │
│                                 │
│ Total Invested (All Time):     │
│ KES 15,807                     │
│ Revenue: KES 0                 │
│ ROI: -100% 🔴                  │
│                                 │
│ [View Full Business Report →]  │
└────────────────────────────────┘
```

**Business Report Page:**
```
┌─────────────────────────────────────┐
│ ← Back    Business Financial Report │
├─────────────────────────────────────┤
│                                      │
│  💼 DecisionPulse Finances          │
│                                      │
│  ═══ INVESTMENT SUMMARY ═══         │
│                                      │
│  Period: June - November 2025       │
│  Total Invested: KES 15,807         │
│  Monthly Average: KES 3,513         │
│                                      │
│  ═══ BREAKDOWN BY TYPE ═══          │
│                                      │
│  🖥️ Development Tools: KES 8,500    │
│  ☁️ Hosting/Cloud: KES 3,200        │
│  📱 Online Services: KES 2,107      │
│  📊 Other: KES 2,000                │
│                                      │
│  ═══ REVENUE ═══                    │
│                                      │
│  Total Revenue: KES 0               │
│  Customers: 0                       │
│  Status: Pre-revenue 🔴             │
│                                      │
│  ═══ MONTHLY SPENDING TREND ═══     │
│  [Bar chart showing monthly spend]  │
│                                      │
│  ═══ BUDGET STATUS ═══              │
│                                      │
│  Current Month: KES 2,013 / 2,000  │
│  ⚠️ Over budget by KES 13           │
│                                      │
│  Recommendation:                    │
│  ⚠️ 6 months with no revenue.       │
│  Consider pausing non-essential     │
│  spending until first customer.     │
│                                      │
│  [Export Business Report (PDF)]     │
│                                      │
└─────────────────────────────────────┘
```

**Key Features:**
- Business expenses tagged with project name
- Running total of business investment
- ROI calculation (when revenue comes)
- Monthly spending trends
- Alerts when over business budget
- Can toggle "show/hide business" in main budget view
- Separate report but same database

---

### **Feature 13: Separate Savings Views**
**User Story**: "I have different savings goals: emergency fund (short-term security), and general savings (long-term wealth). I need to see them separately."

**Savings Dashboard:**
```
┌─────────────────────────────────────┐
│ ← Back         My Savings            │
├─────────────────────────────────────┤
│                                      │
│  💰 Total Savings: KES 45,000       │
│                                      │
│  ═══ EMERGENCY FUND ═══             │
│  Purpose: Financial Security         │
│  Goal: 3-6 months expenses          │
│                                      │
│  ┌────────────────────────────────┐│
│  │ Current: KES 20,000             ││
│  │ Target: KES 35,000              ││
│  │ [███████░░░░░] 57%              ││
│  │ Remaining: KES 15,000           ││
│  │                                 ││
│  │ Monthly Contribution: KES 3,000 ││
│  │ Projected Complete: Feb 2026    ││
│  │                                 ││
│  │ Account: ABSA Digital Savings   ││
│  │ Interest Rate: 9% p.a.          ││
│  │ Growth This Month: +KES 150     ││
│  └────────────────────────────────┘│
│                                      │
│  [💵 Add Deposit] [📊 View History] │
│                                      │
│  ⚠️ EMERGENCY ONLY                  │
│  Withdraw only for:                 │
│  • Medical emergency                │
│  • Job loss                         │
│  • Urgent family crisis             │
│  • Major home/car repair            │
│                                      │
│  ═══ GENERAL SAVINGS ═══            │
│  Purpose: Wealth Building            │
│  Goal: Investment opportunities      │
│                                      │
│  ┌────────────────────────────────┐│
│  │ Current: KES 25,000             ││
│  │ Target: KES 100,000             ││
│  │ [████░░░░░░░░] 25%              ││
│  │                                 ││
│  │ Monthly Contribution: Variable  ││
│  │ Average: KES 5,000/month        ││
│  │                                 ││
│  │ Account: Zimele MMF             ││
│  │ Interest Rate: 10.75% p.a.      ││
│  │ Growth This Month: +KES 225     ││
│  └────────────────────────────────┘│
│                                      │
│  [💵 Add Deposit] [📊 View History] │
│                                      │
│  ✅ FLEXIBLE                        │
│  Can use for:                       │
│  • Investment opportunities         │
│  • Business expansion               │
│  • Major purchases                  │
│  • Travel/experiences               │
│                                      │
│  ═══ FAMILY EMERGENCY FUND ═══      │
│  Purpose: Family Safety Net         │
│  Goal: KES 12,000 (1 year savings)  │
│                                      │
│  ┌────────────────────────────────┐│
│  │ Current: KES 6,000              ││
│  │ Target: KES 12,000              ││
│  │ [██████░░░░░░] 50%              ││
│  │                                 ││
│  │ Contribution: KES 1,000/month   ││
│  │ Started: Sept 2025              ││
│  │ Complete By: Aug 2026           ││
│  │                                 ││
│  │ Account: M-Shwari Lock Savings  ││
│  └────────────────────────────────┘│
│                                      │
│  [View Family Emergency Policy →]   │
│                                      │
└─────────────────────────────────────┘
```

**Key Differences:**

| **Feature** | **Emergency Fund** | **General Savings** | **Family Fund** |
|------------|-------------------|-------------------|----------------|
| **Purpose** | Your security | Your wealth | Family safety |
| **Withdrawal** | Emergency only | Flexible | Family emergency |
| **Target** | Fixed (KES 35K) | Growing (KES 100K+) | Fixed (KES 12K) |
| **Priority** | HIGHEST | Medium | High |
| **Account** | ABSA (liquid) | Zimele MMF (growth) | M-Shwari (locked) |
| **Contribution** | Fixed KES 3K | Variable surplus | Fixed KES 1K |

**Withdrawal Rules:**
- **Emergency Fund**: Requires reason selection + approval confirmation
- **General Savings**: No restrictions, but tracks purpose
- **Family Fund**: Requires family member name + emergency type

---

### **Feature 14: Receipt Photo Uploads**
**User Story**: "I bought supplies for KES 3,500. I want to attach the receipt so I remember what I bought."

**Implementation:**

**Add Receipt to Transaction:**
```
┌─────────────────────────────────────┐
│ Transaction Details                  │
├─────────────────────────────────────┤
│                                      │
│  Shopping - Naivas Nakuru           │
│  KES 3,500                          │
│  Nov 14, 2025                       │
│                                      │
│  📸 Receipt                          │
│  ┌────────────────────────────────┐│
│  │ [Receipt Image Preview]         ││
│  │                                 ││
│  │ [View Full Size] [Download]    ││
│  └────────────────────────────────┘│
│                                      │
│  Items Purchased:                   │
│  • Sugar 2kg - KES 450              │
│  • Flour 5kg - KES 800              │
│  • Cooking Oil 3L - KES 1,200       │
│  • Rice 5kg - KES 850               │
│  • Misc - KES 200                   │
│                                      │
│  [Edit Items] [Delete Receipt]      │
│                                      │
└─────────────────────────────────────┘
```

**Upload Flow:**
```
When adding expense:
1. Click [📷 Add Receipt]
2. Options:
   - Take Photo (mobile camera)
   - Choose from Gallery
   - Drag & Drop (desktop)
3. Image preview shown
4. Optional: OCR extract amount (future)
5. Save with transaction
```

**Technical Details:**
- **File Types**: JPEG, PNG, PDF
- **Max Size**: 5MB per receipt
- **Storage**: Supabase Storage
- **Compression**: Auto-compress on upload (reduce size)
- **Security**: Only user can access their receipts
- **Backup**: Included in data export

**Mobile Camera Integration:**
```javascript
// React component
<input 
  type="file" 
  accept="image/*,application/pdf" 
  capture="environment" // Opens camera on mobile
  onChange={handleReceiptUpload}
/>
```

**Receipt Gallery View:**
```
┌─────────────────────────────────────┐
│ ← Back         All Receipts          │
├─────────────────────────────────────┤
│                                      │
│  Filter: [All] [This Month] [Search]│
│                                      │
│  ┌────────┬────────┬────────┐       │
│  │ Nov 14 │ Nov 12 │ Nov 10 │       │
│  │ KES    │ KES    │ KES    │       │
│  │ 3,500  │ 850    │ 4,200  │       │
│  │ [IMG]  │ [IMG]  │ [IMG]  │       │
│  └────────┴────────┴────────┘       │
│                                      │
│  ┌────────┬────────┬────────┐       │
│  │ Nov 8  │ Nov 5  │ Nov 3  │       │
│  │ KES    │ KES    │ KES    │       │
│  │ 1,200  │ 600    │ 3,500  │       │
│  │ [IMG]  │ [IMG]  │ [IMG]  │       │
│  └────────┴────────┴────────┘       │
│                                      │
│  [Load More...]                     │
│                                      │
└─────────────────────────────────────┘
```

---

### **Feature 15: Export Functionality (CSV & PDF)**
**User Story**: "I need to export my financial data for tax purposes, accountant review, or backup."

**Export Options Page:**
```
┌─────────────────────────────────────┐
│ ← Back         Export Data           │
├─────────────────────────────────────┤
│                                      │
│  📊 Export Your Financial Data      │
│                                      │
│  ═══ QUICK EXPORTS ═══              │
│                                      │
│  ┌────────────────────────────────┐│
│  │ 📄 This Month (November 2025)   ││
│  │ 156 transactions                ││
│  │ [CSV] [PDF]                     ││
│  └────────────────────────────────┘│
│                                      │
│  ┌────────────────────────────────┐│
│  │ 📊 Full Year (2025)             ││
│  │ 489 transactions                ││
│  │ [CSV] [PDF]                     ││
│  └────────────────────────────────┘│
│                                      │
│  ┌────────────────────────────────┐│
│  │ 💾 Complete Backup              ││
│  │ All data + receipts + settings  ││
│  │ [ZIP Archive]                   ││
│  └────────────────────────────────┘│
│                                      │
│  ═══ CUSTOM EXPORT ═══              │
│                                      │
│  Date Range:                        │
│  From: [Nov 1, 2025]  To: [Nov 30]  │
│                                      │
│  What to Include:                   │
│  ☑ All Transactions                 │
│  ☑ Budget Summary                   │
│  ☑ Category Breakdown               │
│  ☑ Savings History                  │
│  ☑ Business Report                  │
│  ☑ Family Money Records             │
│  ☐ Receipt Images                   │
│                                      │
│  Format:                            │
│  ⚪ CSV (Excel compatible)          │
│  ⚪ PDF (Formatted report)          │
│                                      │
│  [Generate Export]                  │
│                                      │
└─────────────────────────────────────┘
```

**CSV Export Format:**
```csv
Date,Type,Category,Vendor,Amount,M-Pesa Fee,Total,Notes
2025-11-14,Expense,Food,Martin Wambui,60,7,67,Daily groceries
2025-11-14,Expense,Transport,Matatu,100,0,100,To town
2025-11-13,Income,Freelance,Client A,18500,0,18500,Mid-month payment
```

**CSV Structure:**
- **transactions.csv**: All transactions
- **budget_summary.csv**: Monthly budget vs actual
- **categories.csv**: Category-wise spending
- **savings.csv**: Savings account history
- **business.csv**: Business expenses only
- **family_money.csv**: Family money tracking

**PDF Export Example:**

```
╔═══════════════════════════════════════╗
║   FINANCIAL REPORT - NOVEMBER 2025    ║
║   Generated: Nov 14, 2025             ║
╚═══════════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EXECUTIVE SUMMARY

Total Income:        KES 35,500
Total Expenses:      KES 22,680
Net Cash Flow:       KES 12,820
Savings Rate:        36.1%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BUDGET PERFORMANCE

Category          Budget    Actual   Status
────────────────────────────────────────
Fixed            11,676    11,500    ✓
Food              2,039     1,850    ✓
Transport           666       580    ✓
Family Support    2,033     2,500    ⚠
Shopping          1,356       800    ✓
Business          1,013     1,200    ⚠

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TOP TRANSACTIONS

Date        Vendor              Amount
────────────────────────────────────────
Nov 14      AI Tool 1          3,046
Nov 8       Rent Payment       3,500
Nov 5       Family Support     2,000
Nov 15      Wifi Payment       1,523

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SAVINGS PROGRESS

Emergency Fund:    20,000 / 35,000 (57%)
General Savings:   25,000 / 100,000 (25%)
Family Fund:       6,000 / 12,000 (50%)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Detailed transaction list continues...]
```

**PDF Features:**
- Professional formatting
- Charts and graphs
- Color-coded budget status
- Page numbers and table of contents
- Print-friendly
- Downloadable/shareable

**Technical Implementation:**

**CSV Export:**
```javascript
// Using papaparse library
import Papa from 'papaparse';

const exportToCSV = (data, filename) => {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}_${Date.now()}.csv`;
  a.click();
};
```

**PDF Export:**
```javascript
// Using jsPDF or react-pdf
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const exportToPDF = (data) => {
  const doc = new jsPDF();
  
  // Add header
  doc.setFontSize(20);
  doc.text('Financial Report', 20, 20);
  
  // Add summary table
  doc.autoTable({
    head: [['Category', 'Budget', 'Actual', 'Status']],
    body: data.categories,
    startY: 40
  });
  
  // Save
  doc.save(`financial_report_${Date.now()}.pdf`);
};
```

**Backup ZIP Archive:**
```javascript
// Using JSZip
import JSZip from 'jszip';

const createBackup = async () => {
  const zip = new JSZip();
  
  // Add CSV files
  zip.file('transactions.csv', transactionsCSV);
  zip.file('budget.csv', budgetCSV);
  
  // Add receipts folder
  const receiptsFolder = zip.folder('receipts');
  receipts.forEach(receipt => {
    receiptsFolder.file(receipt.filename, receipt.blob);
  });
  
  // Add settings JSON
  zip.file('settings.json', JSON.stringify(settings));
  
  // Generate and download
  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, `backup_${Date.now()}.zip`);
};
```

---

## **📊 UPDATED DATA MODEL**

### **New Tables:**

```sql
-- Family money tracking
CREATE TABLE family_money (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  family_member_name VARCHAR(255) NOT NULL,
  current_balance DECIMAL(10,2) DEFAULT 0,
  total_deposited DECIMAL(10,2) DEFAULT 0,
  total_released DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  last_activity TIMESTAMP DEFAULT NOW()
);

CREATE TABLE family_money_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  family_money_id UUID REFERENCES family_money(id),
  type VARCHAR(20) NOT NULL, -- 'deposit' or 'release'
  amount DECIMAL(10,2) NOT NULL,
  note TEXT,
  receipt_url TEXT,
  transaction_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Savings accounts (multiple types)
CREATE TABLE savings_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  account_type VARCHAR(50) NOT NULL, -- 'emergency', 'general', 'family'
  account_name VARCHAR(255) NOT NULL,
  current_balance DECIMAL(10,2) DEFAULT 0,
  target_amount DECIMAL(10,2),
  monthly_contribution DECIMAL(10,2),
  institution VARCHAR(255), -- 'ABSA', 'Zimele MMF', etc.
  interest_rate DECIMAL(5,2),
  is_locked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE savings_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  savings_account_id UUID REFERENCES savings_accounts(id),
  type VARCHAR(20) NOT NULL, -- 'deposit' or 'withdrawal'
  amount DECIMAL(10,2) NOT NULL,
  reason TEXT,
  withdrawal_type VARCHAR(50), -- 'emergency', 'planned', etc.
  transaction_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Receipt storage
CREATE TABLE receipts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transaction_id UUID REFERENCES transactions(id),
  file_url TEXT NOT NULL,
  file_name VARCHAR(255),
  file_size INTEGER,
  mime_type VARCHAR(100),
  uploaded_at TIMESTAMP DEFAULT NOW()
);

-- Export history
CREATE TABLE exports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  export_type VARCHAR(50) NOT NULL, -- 'csv', 'pdf', 'backup'
  date_range_start DATE,
  date_range_end DATE,
  file_url TEXT,
  file_size INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Business tracking (sub-category of expenses)
CREATE TABLE business_expenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transaction_id UUID REFERENCES transactions(id),
  project_name VARCHAR(255) DEFAULT 'DecisionPulse',
  expense_type VARCHAR(100), -- 'hosting', 'tools', 'services'
  is_recurring BOOLEAN DEFAULT FALSE,
  expected_roi_date DATE,
  notes TEXT
);
```

---

## **🎨 UPDATED UI COMPONENTS**

### **Enhanced Dashboard with New Features:**

```
┌─────────────────────────────────────┐
│ 💰 Financial Dashboard      [☰ Menu]│
├─────────────────────────────────────┤
│                                      │
│  [Profile] [Notifications: 3]       │
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
│  ┌─────────────┬─────────────────┐  │
│  │ 💾 Savings  │ 👨‍👩‍👧 Family    │  │
│  │ KES 51,000  │ KES 6,019       │  │
│  │ [View →]    │ [Manage →]      │  │
│  └─────────────┴─────────────────┘  │
│                                      │
│  📊 Categories (Swipe to see all)   │
│  [< Prev] [Next >]                  │
│                                      │
│  💼 Business: KES 2,013 / 2,000 ⚠️  │
│  [███████████] 100.6%               │
│  DecisionPulse - View Report →      │
│                                      │
│  Recent Transactions                 │
│  ┌────────────────────────────────┐│
│  │ 📸 KES 60 - Food - Martin      ││
│  │    2 hrs ago [View Receipt]    ││
│  └────────────────────────────────┘│
│  ┌────────────────────────────────┐│
│  │ 💳 KES 3,046 - AI Tool 1       ││
│  │    Today at 9:00 AM            ││
│  └────────────────────────────────┘│
│                                      │
│  [View All Transactions →]          │
│                                      │
├─────────────────────────────────────┤
│ [🏠 Home] [💰 Budget] [📊 Reports]  │
│ [➕ Add] [⚙️ Settings]               │
└─────────────────────────────────────┘
```

### **Navigation Menu:**

```
☰ Menu
────────────────────────
🏠 Dashboard
💰 Budget Overview
📊 Reports
💾 Savings
  └ Emergency Fund
  └ General Savings
  └ Family Emergency Fund
👨‍👩‍👧 Family Money
💼 Business Finances
📸 Receipts
📤 Export Data
⚙️ Settings
❓ Help
🚪 Logout
```

---

## **⚙️ UPDATED TECHNICAL STACK**

### **Additional Libraries Needed:**

```json
{
  "dependencies": {
    // Existing...
    "next": "^14.0.0",
    "react": "^18.0.0",
    "zustand": "^4.0.0",
    
    // NEW - File handling
    "react-dropzone": "^14.2.3",        // Drag & drop uploads
    "compressorjs": "^1.2.1",           // Image compression
    
    // NEW - Export functionality
    "papaparse": "^5.4.1",              // CSV generation
    "jspdf": "^2.5.1",                  // PDF generation
    "jspdf-autotable": "^3.8.0",        // PDF tables
    "jszip": "^3.10.1",                 // ZIP archives
    "file-saver": "^2.0.5",             // File downloads
    
    // NEW - Charts (enhanced)
    "recharts": "^2.10.0",              // Existing
    "react-chartjs-2": "^5.2.0",        // Additional chart types
    "chart.js": "^4.4.0",
    
    // NEW - OCR (future phase)
    "tesseract.js": "^5.0.0"            // Receipt text extraction
  }
}
```

### **Supabase Storage Buckets:**

```javascript
// Create these buckets in Supabase dashboard
Buckets:
1. receipts/
   - Public: No
   - File size limit: 5MB
   - Allowed types: image/*, application/pdf
   
2. exports/
   - Public: No
   - File size limit: 50MB
   - Auto-delete after: 7 days
   - Allowed types: text/csv, application/pdf, application/zip
```

### **Supabase Storage Policies:**

```sql
-- Users can only upload to their own folder
CREATE POLICY "Users can upload receipts"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'receipts' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Users can only read their own receipts
CREATE POLICY "Users can read own receipts"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'receipts' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

---

## **📱 MOBILE-SPECIFIC FEATURES**

### **Camera Integration:**

```jsx
// ReceiptUpload.jsx
import { useState } from 'react';
import Compressor from 'compressorjs';

function ReceiptUpload({ transactionId, onUploadComplete }) {
  const [uploading, setUploading] = useState(false);
  
  const handleCapture = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploading(true);
    
    // Compress image
    new Compressor(file, {
      quality: 0.6,
      maxWidth: 1920,
      success: async (compressedFile) => {
        // Upload to Supabase
        const { data, error } = await supabase.storage
          .from('receipts')
          .upload(`${userId}/${transactionId}/${Date.now()}.jpg`, compressedFile);
        
        if (!error) {
          // Save receipt record in database
          await saveReceiptRecord(transactionId, data.path);
          onUploadComplete();
        }
        setUploading(false);
      },
    });
  };
  
  return (
    <div>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleCapture}
        style={{ display: 'none' }}
        id="camera-input"
      />
      <label htmlFor="camera-input">
        <button disabled={uploading}>
          📷 {uploading ? 'Uploading...' : 'Take Photo'}
        </button>
      </label>
    </div>
  );
}
```

### **Receipt Gallery (Mobile Swipe):**

```jsx
// Mobile-optimized receipt gallery with swipe
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function ReceiptGallery({ receipts }) {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={2.2}
      freeMode={true}
    >
      {receipts.map(receipt => (
        <SwiperSlide key={receipt.id}>
          <div className="receipt-card">
            <img src={receipt.url} alt="Receipt" />
            <p>KES {receipt.amount}</p>
            <p>{receipt.date}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
```

---

## **🚀 UPDATED DEVELOPMENT PHASES**

### **Phase 1: MVP (Week 1-2)**
✅ Core tracking (as before)
✅ Basic dashboard
✅ Expense/income entry
**NEW:** 
✅ Basic receipt upload (camera + gallery)
✅ Family money tracking (simple)

### **Phase 2: Budget Management (Week 3)**
✅ Budget alerts (as before)
✅ Category limits
**NEW:**
✅ Savings accounts setup (3 types)
✅ Business expense tagging

### **Phase 3: Planning & Advanced (Week 4)**
✅ Recurring payments (as before)
✅ Payment calendar
**NEW:**
✅ CSV export
✅ Basic PDF export
✅ Receipt gallery view

### **Phase 4: Reports & Export (Week 5)**
✅ Weekly/monthly reports (as before)
**NEW:**
✅ Advanced PDF reports with charts
✅ Full backup ZIP export
✅ Business financial report

### **Phase 5: Polish (Week 6+)**
✅ PWA features (as before)
**NEW:**
✅ OCR receipt scanning
✅ Receipt item breakdown
✅ Multi-currency support (future)
✅ Family member accounts (view-only)

---

## **📋 UPDATED API ENDPOINTS**

### **New Endpoints:**

```
Family Money:
POST   /api/family-money                # Create family member account
GET    /api/family-money                # List all family accounts
POST   /api/family-money/:id/deposit    # Record deposit
POST   /api/family-money/:id/release    # Record release
GET    /api/family-money/:id/history    # Transaction history

Savings:
GET    /api/savings                     # All savings accounts
GET    /api/savings/emergency           # Emergency fund details
GET    /api/savings/general             # General savings details
GET    /api/savings/family              # Family fund details
POST   /api/savings/:id/deposit         # Add to savings
POST   /api/savings/:id/withdraw        # Withdraw from savings

Receipts:
POST   /api/receipts/upload             # Upload receipt image
GET    /api/receipts/:id                # Get receipt details
DELETE /api/receipts/:id                # Delete receipt
GET    /api/receipts/transaction/:id    # Get receipts for transaction
GET    /api/receipts/gallery            # All receipts with pagination

Business:
GET    /api/business/summary            # Business financial summary
GET    /api/business/transactions       # Business transactions only
GET    /api/business/roi                # ROI calculations
PUT    /api/business/budget             # Update business budget

Export:
POST   /api/export/csv                  # Generate CSV export
POST   /api/export/pdf                  # Generate PDF report
POST   /api/export/backup               # Create full backup ZIP
GET    /api/export/history              # Past exports
GET    /api/export/download/:id         # Download exported file
```

---

## **✅ UPDATED DEFINITION OF DONE**

### **For Phase 1 (MVP with your requirements):**
- [ ] Can log expenses with receipt photos
- [ ] Can track family money separately
- [ ] Emergency fund visible separately from general savings
- [ ] Business expenses tagged appropriately
- [ ] Can export last 30 days to CSV
- [ ] All data backed up in Supabase
- [ ] Mobile camera works for receipt capture
- [ ] Receipt images compressed and optimized
- [ ] Dashboard shows all 3 savings accounts

---

## **🎯 YOUR FIRST BUILD CHECKLIST**

### **Day 1-2: Setup + Auth + Receipt Upload**
- [ ] Create Next.js project
- [ ] Setup Supabase (database + storage)
- [ ] Create storage buckets for receipts
- [ ] Build login/signup
- [ ] Test receipt photo upload from mobile

### **Day 3-4: Expense Entry + Family Money**
- [ ] Expense entry form with camera
- [ ] Receipt attachment to transactions
- [ ] Family money tracking tables
- [ ] Basic family money UI

### **Day 5-6: Dashboard + Savings**
- [ ] Create 3 savings account types in DB
- [ ] Dashboard with emergency fund widget
- [ ] Dashboard with general savings widget
- [ ] Dashboard with family fund widget
- [ ] Business expenses section

### **Day 7: Export + Testing**
- [ ] CSV export functionality
- [ ] Test with real data
- [ ] Mobile testing (camera, upload)
- [ ] Export test data

**After Day 7: You have a working app with all 5 requirements!**

---

## **💰 COST ESTIMATE**

### **Free Tier (Start Here):**
- **Vercel**: Free hosting (hobby plan)
- **Supabase**: 
  - Database: 500MB free
  - Storage: 1GB free (good for ~200 receipt photos)
  - Auth: Unlimited users (free)
- **Domain**: ~$12/year
- **Total**: **~$1/month**

### **When You Scale (1000+ receipts):**
- **Supabase Pro**: $25/month
  - 8GB database
  - 100GB storage
  - Better performance
- **Total**: **~$27/month**

**For your personal use, FREE TIER is more than enough!**

---

## **🎉 FINAL SUMMARY - WHAT YOU'RE BUILDING**

### **A personal finance app that:**

1. ✅ **Tracks expenses** with M-Pesa fees auto-calculated
2. ✅ **Enforces budget limits** with real-time alerts
3. ✅ **Manages 3 types of savings** (emergency, general, family)
4. ✅ **Tracks family money** you're holding for others
5. ✅ **Integrates business expenses** (DecisionPulse) in budget
6. ✅ **Captures receipt photos** via mobile camera
7. ✅ **Exports to CSV and PDF** for records/accounting
8. ✅ **Works on mobile** as a PWA (installable app)
9. ✅ **Sends payment reminders** so you never miss a bill
10. ✅ **Generates reports** (weekly, monthly) automatically

### **Technical Stack:**
- **Frontend**: Next.js + React + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Storage + Auth)
- **Hosting**: Vercel (free)
- **Mobile**: PWA with camera integration
- **Cost**: $1/month (free tier) or $27/month (pro tier later)

### **Build Time:**
- **MVP**: 1-2 weeks (working nights/weekends)
- **Full features**: 4-6 weeks
- **Polish**: Ongoing as you use it

---

## **🚀 READY TO START?**

Your **VERY FIRST TASK** (tonight):

1. Create GitHub repository: `financial-tracker`
2. Initialize Next.js project: `npx create-next-app@latest financial-tracker`
3. Create Supabase account: supabase.com
4. Create new Supabase project: `financial-tracker-prod`
5. Install dependencies: `npm install @supabase/supabase-js`
6. Push to GitHub
7. Deploy to Vercel (connects to GitHub automatically)

**Tomorrow**: Build the login page and test authentication.

**This weekend**: Have a working expense entry with receipt upload!

You've got all the specs. Time to build! 💪
