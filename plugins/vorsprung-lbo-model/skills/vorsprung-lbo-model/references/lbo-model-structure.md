# Vorsprung LBO Model — Sheet-by-Sheet Reference

Based on: `2024-06-10_LBO-Model_Template.xlsx`
Template path: `/sessions/wizardly-awesome-cori/mnt/VDI/Direct Investments/2000 Templates/300 Models/002 LBO Model/2024-06-10_LBO-Model_Template.xlsx`

---

## Sheet: Cover

Model metadata sheet. Fill in at the start.

| Field | Notes |
|-------|-------|
| Contact / Analyst initials | e.g. "FL" for Florian |
| Last Modified | Auto-update to today |
| Model Complete | "No" until final |
| Open Points | List unresolved items |
| Final Version | "No" until signed off |

**Color coding legend** (also in Formats sheet):
- `CALC_*` cells = formula cells — never overwrite manually
- `Heading 1/2/3` = section labels
- Entry fields = input cells (yellow/blue tinted in template)

---

## Sheet: Cockpit

The central assumptions hub. Everything else in the model feeds from here.

### Section I: Global Parameters

**Transaction Assumptions:**
- LBO Target Name (company legal name)
- Transaction Close Date (exact date, e.g. 2025-03-31)
- Earliest Year of Financial Data (e.g. 2017)
- Year Forecast Starts (typically close year + 1)
- Fiscal Year End Month (usually 12 for December)
- Fiscal Year End Day (usually 31)
- Days in Year (365)

**Roll-Over:**
- Management Rollover % (if management co-invests)
- Management Rollover EUR amount

**Manual Case-Specific Adjustments:**
- Table for one-off model adjustments with sheet references and reasons

### Section II: Purchase Price & Purchase Accounting

**Purchase Price Determination:**
- 3-year average EBITDA (T-3 to T-1) → primary anchor
- 3-year avg EV/EBITDA multiple (implied)
- FY last-year projected EBITDA → cross-check
- FY last-year EV/EBITDA multiple (implied)
- **Enterprise Value** (hard input — the agreed/target EV)
- (+) Cash on balance sheet
- (+) Interest-bearing receivables
- (+) Lease liabilities
- (–) Non-current liabilities
- (–) Current liabilities
- (–) Liabilities to shareholders
- = **Equity Value** (bridge from EV to equity)

**Purchase Accounting:**
- Total Equity Value less Earnout
- (–) Total Assets (excl. goodwill)
- (+) Total Liabilities
- = PF Goodwill (purchase accounting plug)

**Transaction Costs:**
- Net sum of transaction costs
- VAT (default 19%)
- Total Transaction Costs

**Total Seller's Proceeds:**
- Cash Out Day One
- Roll-Over (reinvested equity)
- Vendor Loan
- Total Cash Out

**Current Ownership Structure:**
- Names + % ownership (for seller proceeds allocation)

### Section III: Sources & Uses / Capital Structure

- **Sources:** Equity (Vorsprung + co-investors), Senior Debt, Revolver (if any), Vendor Loan
- **Uses:** Enterprise Value, Transaction Costs, Opening Cash Reserve
- Sources must equal Uses (CHECKS flag)

### Section IV: Debt Assumptions

For each debt tranche (senior, revolver, vendor loan):
- Principal amount
- Interest rate (cash pay or PIK)
- Amortization schedule / bullet
- Maturity / tenor

**Exit Assumptions:**
- Exit Year (absolute year, e.g. 2030)
- Exit Multiple (EV/EBITDA)
- Multiple Steps for Sensitivity (e.g. 0.3x increments in sensitivity table)

**Other Assumptions:**
- Minimum Cash Balance (EUR, e.g. 250k)
- Minimum Debt Increment (EUR, e.g. 250k)
- Cash Interest Rate (on excess cash)
- Projected Effective Tax Rate (default 30%)

### CHECKS Section (must all pass before delivery)

- Sources & Uses = 0 (balanced)
- Equity = 100% (equity slice = 100% of equity)
- Equity = Equity Plug (no rounding error)
- TA = TL + EQ (balance sheet balances)
- Cash > 0 (no negative cash in any period)

---

## Sheet: Cockpit Scenarios

Drives the income statement forecast. Each column = one scenario (Base, Bull, Bear).

**Income Statement Items (per scenario):**
- Revenue growth rates by year / revenue stream
- Gross margin assumptions
- Personnel cost % of revenue (or absolute)
- Other OpEx items
- CAPEX as % of revenue (or absolute)
- Working capital days (DSO, DPO, inventory days)

Tip: Label scenarios clearly. The model auto-selects the active scenario via a toggle in Cockpit.

---

## Sheet: Historicals Input

Raw data entry for historical income statement. Up to 9 years (T-9 to T-1).

**Income Statement structure:**
- Revenue Stream 1 / 2 / 3 (rename to match company's actual segments)
- Changes in WiP
- Overall Performance (= Gesamtleistung in German P&L)
- Material Costs
- Gross Profit (auto-calculated)
- Personnel Costs
- Other Operating Income
- Other Operating Expenses
- EBITDA (auto-calculated)
- D&A
- EBIT
- Interest Income / Expense
- EBT
- Taxes
- Net Income

**Balance Sheet (abbreviated):**
- Key working capital items for WC normalization
- Net debt at each historical year-end

Enter raw reported figures. Normalizations (one-offs, owner salary) are applied separately.

---

## Sheet: Historicals Analysis

Auto-calculated from Historicals Input. Do not enter data here.

Shows:
- All P&L line items as % of Overall Performance
- Year-over-year growth rates
- EBITDA margin trend
- Working capital ratios (DSO, DPO, inventory days)
- Net debt / EBITDA

Use this sheet to sanity-check historical margins before building the forecast.

---

## Sheet: Model

The integrated financial model. Feeds from Cockpit + Historicals + Scenarios.

**Section I: Income Statement**
- Revenues (by stream, from Scenarios)
- COGS / Gross Profit
- Personnel, Other OpEx
- EBITDA → EBIT → EBT → Net Income
- All shown as % of revenue for quick margin check

**Section II: Balance Sheet**
- Assets: Fixed assets (incl. PF goodwill), Working capital, Cash
- Liabilities: Debt tranches, Trade payables, Other liabilities
- Equity: Opening equity + net income – distributions

**Section III: Cash Flow Statement**
- Operating CF: EBITDA → WC changes → taxes → interest paid
- Investing CF: CAPEX
- Financing CF: Debt drawdowns / repayments, equity injections
- Net change in cash → Closing cash balance

**Section IV: Debt Schedule**
- Per tranche: opening balance, drawdown, cash interest, amortization, closing balance
- Revolver: auto-sweeps excess cash; drawn when cash < minimum

**Section V: Returns**
- Entry: EV, equity invested, date
- Exit: EV (at exit multiple × exit EBITDA), net debt at exit, equity proceeds
- **IRR** (equity IRR, annualized)
- **MoM** (money-on-money multiple)
- Sensitivity table: IRR / MoM at various exit multiples × exit EBITDA scenarios

---

## Formats Sheet

Do not modify. Reference only.

Color scheme:
| Style | Meaning |
|-------|---------|
| CALC_1_NORM | Formula cell — calculated number |
| CALC_2_PERC | Formula cell — percentage |
| CALC_7_EURIBOR | Variable rate reference |
| Heading 1 | Top-level section header |
| Heading 2 | Sub-section header |
| Heading 3 | Line item label |
| Entry field | Manual input |
| Red | Error / check failed |
