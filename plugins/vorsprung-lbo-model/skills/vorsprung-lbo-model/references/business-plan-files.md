# Vorsprung Business Plan & Deal Reference Files

These are real Vorsprung deal files that can be used for:
- Understanding what input data looks like (revenue breakdown, EBITDA build, balance sheet structure)
- Pre-populating the LBO model when the user references one of these deals
- Cross-checking assumptions against prior deal methodologies

Use Python (openpyxl or pandas) to read these files when building or updating a model.

---

## LBO Model Template

**The canonical template — always load this as the base for new models:**

```
/sessions/wizardly-awesome-cori/mnt/VDI/Direct Investments/2000 Templates/300 Models/002 LBO Model/2024-06-10_LBO-Model_Template.xlsx
```

Sheets: Cockpit, Cockpit Scenarios, Model, Historicals Input (3), Historicals Analysis, Historicals Input, Cover, Formats

---

## Previous LBO Models (completed deals — use for methodology reference)

### Project Window (Gebr. Müller Holzbearbeitung — window & door manufacturer)

Most recent model:
```
/sessions/wizardly-awesome-cori/mnt/VDI/Direct Investments/1000 Deals/002 Live Deals/01 Project Window/05 Financials, Valuation & Financial Model/03 Valuation & Model/01 LBO/2024-06-17_Project-Window_LBO-Model.xlsx
```

Archive versions (earlier iterations — use only for historical reference):
```
/sessions/wizardly-awesome-cori/mnt/VDI/Direct Investments/1000 Deals/002 Live Deals/01 Project Window/05 Financials, Valuation & Financial Model/03 Valuation & Model/01 LBO/Archive/
```

Planning & controlling data:
```
/sessions/wizardly-awesome-cori/mnt/VDI/Direct Investments/1000 Deals/002 Live Deals/01 Project Window/05 Financials, Valuation & Financial Model/02 Planning & Controlling/230516_Müller Holzbearbeitung_Bilanz GuV Planung_für extern.xlsx
```

---

## Business Plans (by deal/company)

### Project Barcelona / ZSB-SBS

Most recent business plan:
```
/sessions/wizardly-awesome-cori/mnt/VDI/General/Deals/003 Beteiligungen/05 ZSB/03 Portfolio Management/Finanzen/Business Plan 2025/Von Vorsprung/2025-05-14 Entwurf ZSB-SBS Business Plan.xlsx
```

Archive:
```
/sessions/wizardly-awesome-cori/mnt/VDI/General/Deals/003 Beteiligungen/05 ZSB/03 Portfolio Management/Finanzen/Business Plan 2025/Von Vorsprung/Archive/2025-05-13 Entwurf ZSB-SBS Business Plan.xlsx
```

### Schrader Gruppe / Forest 2.0

Business plan draft (investor version):
```
/sessions/wizardly-awesome-cori/mnt/VDI/General/Deals/003 Beteiligungen/02 Schrader Gruppe/04 Forest 2.0/02 Investor Documents/Financial Model/Archive/New Model/Investor Version/Cibus/2025-04-30_Schrader_Business Plan Draft.xlsx
```

Management BP vs. FY Results overview (most recent):
```
/sessions/wizardly-awesome-cori/mnt/VDI/General/Deals/003 Beteiligungen/02 Schrader Gruppe/04 Forest 2.0/02 Investor Documents/Blue Earth/Sendout Package/2025-08-07_Forest-2.0_Overview-Mgmt-Business-Plan vs. FY Results.xlsx
```

Archive:
```
/sessions/wizardly-awesome-cori/mnt/VDI/General/Deals/003 Beteiligungen/02 Schrader Gruppe/04 Forest 2.0/02 Investor Documents/Blue Earth/Sendout Package/Archive/2025-08-07_Forest-2.0_Overview-Mgmt-Business-Plan vs. FY Results.xlsx
```

### Schrader Gruppe / LIECO (Exit — VDR Q&A)

Business plan (Saatgutfirma acquisition context):
```
/sessions/wizardly-awesome-cori/mnt/VDI/Direct Investments/1000 Deals/003 Portfolio Companies/02 Schrader Gruppe/5. Exit/LIECO/LIECO VDR/6 Q&A/6.9 Betriebsuebernahme Saatgutfirma/6.9.7 Business-Plan.xlsx
```

Duplicate copies in VDR folders:
```
/sessions/wizardly-awesome-cori/mnt/VDI/Direct Investments/1000 Deals/003 Portfolio Companies/02 Schrader Gruppe/5. Exit/VDR/VDR LIECO/VDR/Project Forest LIECO VDR Download/6 Q&A/6.9 Betriebsuebernahme Saatgutfirma/6.9.7 Business-Plan.xlsx

/sessions/wizardly-awesome-cori/mnt/VDI/Direct Investments/1000 Deals/003 Portfolio Companies/02 Schrader Gruppe/5. Exit/VDR/VDR LIECO/VDR/6 Q&A/6.9 Betriebsuebernahme Saatgutfirma/6.9.7 Business-Plan.xlsx
```

### Schrader Gruppe / Sonic VDR (Exit)

Business plan:
```
/sessions/wizardly-awesome-cori/mnt/VDI/Direct Investments/1000 Deals/003 Portfolio Companies/02 Schrader Gruppe/5. Exit/VDR/Sonic VDR/5 Q&A/5.8 Betriebsuebernahme Saatgutfirma/5.8.5 6.9.7 Business-Plan.xlsx

/sessions/wizardly-awesome-cori/mnt/VDI/Direct Investments/1000 Deals/003 Portfolio Companies/02 Schrader Gruppe/5. Exit/VDR/Sonic VDR/Documents/5 Q&A/5.8 Betriebsuebernahme Saatgutfirma/5.8.5 6.9.7 Business-Plan.xlsx
```

### Project Lorry (Passed opportunity)

Business plan (sent to counterparty):
```
/sessions/wizardly-awesome-cori/mnt/VDI/General/Deals/998 Passed Opportunities/53 Project Lorry/Project Lorry_Business Plan_16 06 2025_vSENT.xlsx
```

---

## How to read these files in Python

```python
import openpyxl
import pandas as pd

# Read a business plan
wb = openpyxl.load_workbook('/path/to/file.xlsx', data_only=True)
print("Sheets:", wb.sheetnames)

# Get all data from a sheet as DataFrame
ws = wb['Sheet1']
data = ws.values
cols = next(data)
df = pd.DataFrame(data, columns=cols)

# Quick scan of all sheets
for sheet in wb.sheetnames:
    ws = wb[sheet]
    print(f"\n=== {sheet} ===")
    for i, row in enumerate(ws.iter_rows(values_only=True)):
        if any(c for c in row if c is not None):
            print(row)
        if i > 20:
            break
```

---

## Notes on file selection

- When the user says "the current ZSB model" or "Barcelona" → use the **ZSB-SBS Business Plan** (2025-05-14)
- When the user says "Forest" or "Schrader Forest" → use the **Forest 2.0** files
- When the user says "Window" or "Müller" → use the **Project Window** LBO model
- When referencing a passed deal → use **Project Lorry** files
- For format/methodology reference only → use the **LBO Model Template**
