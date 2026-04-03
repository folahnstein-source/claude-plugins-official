---
name: spa-red-flag-dd
description: "Screen and redline Share Purchase Agreement (SPA) drafts from the buyer's perspective — works with German and English SPAs. Trigger whenever the user uploads an SPA, Anteilskaufvertrag, Aktienkaufvertrag, Geschäftsanteilskaufvertrag, or asks to 'check an SPA', 'red-flag a purchase agreement', 'review the seller's draft', 'screen this SPA', 'redline the contract', or any buy-side due diligence on a share purchase agreement in European M&A. Also trigger on 'SPA review', 'Garantiekatalog prüfen', 'Kaufvertrag prüfen', 'red flags in the SPA', 'W&I compatibility check', 'warranty review', 'liability caps', 'indemnity review', or comparing a draft SPA against previous deals. Even if the user just says 'take a look at this contract' and the file is clearly an SPA, use this skill. Auto-detects language and produces all outputs (report, redline, comments) in the same language."
---

# SPA Red-Flag Due Diligence (Buy-Side)

## Purpose

This skill screens Share Purchase Agreement drafts received from the seller side during M&A transactions. It evaluates each clause from Vorsprung Partners' buy-side perspective, flags deviations from your established baseline, and generates a redline markup with buyer-friendly alternative language.

## Workflow

The skill operates in three phases:

### Phase 1: Extract and Classify

1. **Read the uploaded SPA** using pandoc or python-docx. If the file is a PDF, extract text first.
2. **Detect the language** (German or English). This is critical: the detected language governs ALL subsequent outputs — the red-flag report, the interactive checklist, the redline alternative language, and the Word comments must ALL be written in the same language as the SPA. If the SPA is in English, everything is in English. If in German, everything is in German. Never mix languages.
3. **Parse the SPA structure** — identify all major sections and map them to the screening categories listed below.
4. **Read the baseline reference** at `references/buy-side-baseline.md` — this contains the Vorsprung Partners buy-side standard positions distilled from previous SPAs (ZSB, Window, HemaTec, Forest). The baseline is written in German with English equivalents; use the language-appropriate version.

### Phase 2: Red-Flag Report

Screen every section of the SPA against the buy-side baseline. For each clause or provision, assign a traffic-light rating:

- **RED** — Unacceptable from buy-side perspective. The clause materially disadvantages the buyer, is missing entirely, or deviates significantly from the baseline. Needs revision before signing.
- **AMBER** — Requires attention. The clause is below the baseline standard but may be acceptable depending on deal context (e.g., purchase price, seller leverage, W&I insurance). Should be negotiated.
- **GREEN** — Acceptable. The clause is in line with or better than the Vorsprung baseline.

**Screening categories** (evaluate ALL of these, even if some sections are missing from the SPA — a missing section is itself a red flag):

1. **Purchase Price & Payment Mechanics** — fixed vs. adjustable, payment timing, escrow
2. **Earn-Out** — EBITDA definition, calculation, anti-manipulation, dispute resolution
3. **Locked Box / No-Leakage** — definition of leakage, permitted leakage, restitution
4. **Closing Conditions** — regulatory approvals, MAC clause, long-stop date
5. **Seller Warranties / Garantien** — scope, completeness, qualification (knowledge/materiality), fundamental vs. business warranty split
6. **Warranty Consequences / Rechtsfolgen** — remedy scope, Naturalrestitution / restitution in kind, damages definition
7. **Liability Caps & Limitations / Haftungsbeschränkungen** — cap (Haftungshöchstbetrag), de minimis, basket/deductible (Freibetrag) vs. threshold (Freigrenze), limitation periods, fraud carve-out
8. **Tax Provisions / Steuerklauseln** — tax warranties, tax indemnity (Steuerfreistellung), scope, cooperation, control of proceedings
9. **Specific Indemnities / Freistellungen** — scope, whether subject to caps, environmental
10. **Interim Covenants** — ordinary course operation, consent requirements
11. **Non-Compete / Non-Solicit** — duration, scope, enforceability
12. **W&I Insurance Compatibility** — whether warranty language supports underwriting
13. **Governing Law & Dispute Resolution** — jurisdiction, arbitration
14. **Miscellaneous** — assignment, confidentiality, costs, notices, form requirements

**Output two things:**

**A) Red-Flag Report as Word Document (.docx)**

Use the bundled script `scripts/generate_report.js` to create the report. First, construct a JSON data file matching this structure, then run:

```bash
cd <skill-directory>
npm install  # only if node_modules doesn't exist yet
node scripts/generate_report.js <output_path.docx> <json_data_path.json>
```

The JSON data file must contain:
```json
{
  "projectName": "Project XYZ",
  "date": "2026-03-20",
  "language": "de",
  "summary": {
    "red": 3, "amber": 5, "green": 8,
    "topIssues": ["Issue 1", "Issue 2", "Issue 3"],
    "overallAssessment": "Overall assessment text..."
  },
  "sections": [
    {
      "id": 1,
      "category": "Purchase Price & Payment Mechanics",
      "rating": "RED",
      "spaProvision": "What the SPA says...",
      "baselinePosition": "What Vorsprung normally expects...",
      "assessment": "Analysis and reasoning...",
      "suggestedAction": "revise"
    }
  ],
  "missingProvisions": ["Missing item 1", "Missing item 2"],
  "wiInsuranceNotes": "Observations on W&I insurability..."
}
```

The report will include a cover page, executive summary with colored RED/AMBER/GREEN count boxes, section-by-section analysis tables with colored rating cells, missing provisions, and W&I insurance notes. All formatted A4 with Arial font.

**B) Interactive Checklist in Chat**

After generating the report, present each RED and AMBER item as an interactive checklist. For each flagged item, show:
- The flag number, category, and severity
- A one-line summary of the issue
- Ask the user: **"Waive this flag? (yes/no)"**

Collect all waiver decisions before proceeding to Phase 3. GREEN items are not shown (they're fine as-is). Items the user waives will be excluded from the redline markup.

### Phase 3: Redline Markup

For all RED and AMBER items that were NOT waived by the user:

The redline is applied **directly into the seller's original SPA document** — not a separate sheet. The script opens the uploaded .docx, locates the matching clause text, and inserts Word track-changes markup in-place. When the user opens the file in Word, they see the original SPA with strikethrough deletions and underlined insertions exactly where the problematic clauses are.

1. **Use the original SPA .docx** as the base document. If the SPA was uploaded as PDF, first convert it to .docx (e.g., using pandoc or libreoffice).
2. **For each non-waived flag**, the script will:
   - Find the paragraph in the SPA containing the original clause text
   - Replace it with `<w:del>` (deletion) + `<w:ins>` (insertion) revision marks
   - Add a Word comment referencing the red-flag report item number
   - Preserve all original formatting, styles, numbering, headers, footers

Use the bundled script `scripts/generate_redline.js` to create the redlined SPA. Construct a JSON data file, then run:

```bash
node scripts/generate_redline.js <original_spa.docx> <output_path.docx> <json_data_path.json>
```

**Important:** The `originalText` field in the JSON must closely match the actual text in the SPA document. Copy it as accurately as possible from the extracted SPA text. The script uses fuzzy matching (normalized whitespace, case-insensitive, word-overlap scoring) but closer matches produce better results.

The JSON data file must contain:
```json
{
  "projectName": "Project XYZ",
  "date": "2026-03-20",
  "language": "de",
  "author": "Vorsprung Partners",
  "redlines": [
    {
      "flagId": 1,
      "category": "Liability Caps & Limitations",
      "rating": "RED",
      "clauseRef": "§ 12.3",
      "originalText": "Die Gesamthaftung des Verkäufers ist auf 5% des Kaufpreises beschränkt...",
      "revisedText": "Die Gesamthaftung des Verkäufers unter den Geschäftsgarantien ist auf 20% des Kaufpreises beschränkt...",
      "comment": "Red Flag #1: Liability cap of 5% is far below baseline..."
    }
  ]
}
```

The script modifies the seller's .docx in-place: it unzips the archive, injects `<w:del>` / `<w:ins>` revision marks and `<w:comment>` elements into the XML, enables track changes in settings.xml, and repacks. The result is the original SPA with redlines visible in Word's Track Changes view, authored by "Vorsprung Partners".

**Important guidance for generating alternative language:**
- **Language consistency is paramount.** The alternative clauses, comments, and all text in the redline must be in the same language as the uploaded SPA. An English SPA gets English redlines with English legal terminology (e.g., "representations and warranties", "liability cap", "basket / deductible", "indemnification", "material adverse change"). A German SPA gets German redlines with German legal terminology (e.g., "Garantien", "Haftungshöchstbetrag", "Freibetrag / Freigrenze", "Freistellung", "wesentlich nachteiliges Ereignis").
- Use the same defined terms as the SPA (e.g., if the SPA defines "Seller" / "Verkäufer", "Purchaser" / "Käuferin", "Company" / "Gesellschaft", use those exact terms)
- Reference the same clause numbering scheme (e.g., "Section 12.3" for English SPAs, "§ 12.3" for German SPAs)
- Draw from the Vorsprung baseline positions but adapt to the specific deal structure (GmbH vs. AG / Ltd vs. plc, single vs. multiple sellers, etc.)
- For liability figures (caps, de minimis, basket), use percentage-of-purchase-price formulations where the actual purchase price is known, or [●]% placeholders where it isn't
- Be specific — don't just say "market standard language"; write out the actual clause text
- For English SPAs, use common-law-influenced drafting conventions typical of cross-border European M&A (e.g., independent guarantee promises / selbstständige Garantieversprechen concepts still apply in German-law governed English-language SPAs)

## Key Principles

**Why this matters:** The buy-side SPA review is one of the most critical steps in an M&A transaction. A poorly reviewed SPA can leave the buyer exposed to undisclosed liabilities, earn-out manipulation, or warranty gaps that surface years after closing. The goal is not to flag everything possible, but to identify the provisions that materially deviate from what Vorsprung Partners has successfully negotiated in past deals and that could create real economic or legal risk.

**Tone:** The red-flag report is an internal working document for the deal team, not a legal opinion. Be direct and practical. Flag what matters, explain why it matters, and propose specific language. Avoid legalese for its own sake.

**Proportionality:** Not every deviation is equally important. A missing de minimis threshold is AMBER; a missing liability cap is RED. A 15-month limitation period (vs. baseline 18 months) might be AMBER; a 6-month period is RED. Use judgment.

**Deal context awareness:** Some deviations may be acceptable in context. For example, if the buyer is getting a very attractive price, tighter warranty limitations might be tolerable. Flag them anyway, but note that they may be acceptable depending on deal dynamics.
