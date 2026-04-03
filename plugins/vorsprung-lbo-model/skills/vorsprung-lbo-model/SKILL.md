---
name: vorsprung-lbo-model
description: >
  Build a complete LBO financial model as an Excel file (.xlsx) for a single-target acquisition
  by Vorsprung Partners. Use this skill whenever the user asks to create an LBO model, financial
  model, business plan model, acquisition model, or leveraged buyout analysis — especially when
  they upload a CIM, Factbook, Information Memorandum, financial statements, or company data
  (PDF or Excel). Also trigger when the user says things like 'build me a model for this deal',
  'run the numbers on this target', 'create a financing model', 'model this acquisition', 'put
  together the financials for Project X', or 'update the LBO with new figures'. The output is a
  formula-driven .xlsx file matching Vorsprung Partners' methodology for German SME succession
  targets.
---

# Vorsprung LBO Model Builder

Build investment-grade LBO models for Vorsprung Partners' German SME succession deal flow.
Every model must follow the Vorsprung template structure exactly — both in sheet layout and
methodology — so that outputs are immediately usable by the investment team and co-investors.

## Before you start: read the reference files

This skill comes with two key reference files. Read them at the start of every session:

- **`references/lbo-model-structure.md`** — Describes every sheet in the Vorsprung template,
  the input fields, formula logic, and methodology. This is your primary guide.
- **`references/business-plan-files.md`** — Index of real Vorsprung business plan and deal
  files (with file paths). Use these to understand input data formats and to pre-populate
  the model with real numbers when the user provides them.

## Workflow

### 1. Gather inputs

Ask the user for (or read from uploaded files):
- Target company name and deal name (e.g. "Project Barcelona")
- Transaction close date and fiscal year end
- Historical financials (P&L, balance sheet, cash flow) — at least 3 years, ideally 5+
- Management's business plan / forecast (revenue growth, EBITDA margins)
- Deal structure: enterprise value, equity / debt split, debt instruments and rates
- Exit assumptions: target year and EV/EBITDA exit multiple
- Any special items: earn-outs, management rollover, vendor loans, real estate, CAPEX plans

If the user uploads a file, use Python (openpyxl, pdfplumber, or pandas) to extract the
numbers directly. Reference `references/business-plan-files.md` for real examples of what
Vorsprung input files look like.

### 2. Build the model using the Vorsprung template

**Always base the output on the template at:**
```
/sessions/wizardly-awesome-cori/mnt/VDI/Direct Investments/2000 Templates/300 Models/002 LBO Model/2024-06-10_LBO-Model_Template.xlsx
```

Load this template with openpyxl and populate it rather than building from scratch.
This preserves all formulas, color coding, and formatting that the team depends on.

The template has these sheets (see `references/lbo-model-structure.md` for full details):

| Sheet | Purpose |
|-------|---------|
| **Cover** | Model metadata (date, analyst, status, open points) |
| **Cockpit** | All key assumptions: transaction, exit, debt, tax, checks |
| **Cockpit Scenarios** | Scenario toggles for income statement sensitivity |
| **Historicals Input** | Raw historical P&L data entry (up to 9 years) |
| **Historicals Analysis** | Auto-calculated historical ratios and trends |
| **Model** | Full integrated model: P&L → EBITDA → FCF → debt → returns |
| **Formats** | Color legend (do not modify) |

### 3. Populate in this order

1. **Cover** — fill in model info, analyst initials, today's date
2. **Cockpit** — enter all global parameters (company name, close date, EV, debt structure,
   exit year/multiple, tax rate, minimum cash, transaction costs)
3. **Historicals Input** — enter historical P&L line by line; mirror the revenue stream
   breakdown from the company's actual reporting
4. **Cockpit Scenarios** — wire up forecast growth rates and margin assumptions per scenario
5. Verify the CHECKS section in Cockpit shows green (Sources = Uses, TA = TL + EQ, Cash > 0)

### 4. Key methodology points (Vorsprung-specific)

- **Valuation basis**: Vorsprung uses 3-year average EBITDA as the primary purchase price
  anchor, with FY last-year EBITDA as a cross-check. Always show both.
- **Debt structure**: German SME deals typically use senior bank debt + potentially a vendor
  loan. Model the revolver separately from term loans if relevant.
- **EBITDA definition**: Use "adjusted EBITDA" — strip out owner salary normalization,
  one-off items, and any D&A add-backs explicitly. Show the bridge.
- **Working capital**: Include a normalized working capital assumption; reference
  prior Vorsprung deal files for typical WC as % of revenue for German Mittelstand.
- **Returns**: The Cockpit auto-calculates IRR and MoM for the equity tranche. Make sure
  the equity plug is correctly wired before reporting returns.
- **Currency**: All values in EUR (thousands) unless stated otherwise.
- **Tax**: Default to 30% effective German corporate tax rate unless company-specific data
  is available.

### 5. Deliver the model

Save the populated model to the user's folder (VDI) using a consistent naming convention:
```
YYYY-MM-DD_[ProjectName]_LBO-Model.xlsx
```

Example: `2025-02-23_Project-Barcelona_LBO-Model.xlsx`

After saving, present the file link to the user and briefly summarize:
- Enterprise value and implied EV/EBITDA multiple
- Equity / debt split (sources & uses)
- Exit year and assumed exit multiple
- Projected IRR and MoM at base case

## Common pitfalls to avoid

- **Don't build from scratch** — always load and populate the template; building from scratch
  loses all the formula logic
- **Check the CHECKS section** before delivering — a model with broken checks is unusable
- **Don't round inputs** — enter exact figures from source documents; let the model round
  for display
- **Label scenarios clearly** — if you populate multiple scenarios (base/bull/bear), name
  them clearly in Cockpit Scenarios
