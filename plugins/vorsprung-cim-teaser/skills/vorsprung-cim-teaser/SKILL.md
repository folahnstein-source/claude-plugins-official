---
name: vorsprung-cim-teaser
description: >
  Convert a seller CIM (Confidential Information Memorandum) into a first-draft investor teaser
  in Vorsprung Partners house style. Use this skill whenever the user uploads or references a CIM,
  Information Memorandum, Factbook, or any seller information package and asks to: "draft a teaser",
  "create a teaser from this CIM", "write a one-pager for this deal", "prepare investor materials",
  "summarise this deal for co-investors", "anonymise this CIM", "make a deal summary", or "prepare
  something for the LP update". Also trigger when the user says "turn this into our format",
  "draft the teaser for Project X", or uploads a CIM alongside teaser examples. The output is a
  2-page investor-ready draft with all confidential identifiers removed, flagged gaps, and a
  Redaction Log — ready for deal team review before any external sharing.
---

# Vorsprung CIM-to-Teaser Builder

Convert a seller CIM into a concise, anonymised investor teaser in Vorsprung house style. The
output is a 2-page draft suitable for internal review and, after approval, selective co-investor
sharing.

## Before you start

1. Read `references/teaser-structure.md` for the exact Vorsprung section layout and example content.
2. Read `references/boilerplate.md` for the verbatim Vorsprung Overview, Disclaimer, and header text.
3. Identify all uploaded files and note which is the CIM vs. supporting files.

## Step 1 — Understand the inputs

Before extracting anything, confirm:
- Which file is the CIM (primary source of facts)?
- What is the project codename? If not provided, propose one and flag it:
  `[FLAG: project codename not provided — using "[ProposedName]" pending deal team confirmation]`
- Is there a target acquisition multiple, equity ticket, or IRR target? (Check for a term sheet or deal team notes.)
- Are there financial exhibits (XLSX) that override CIM financials?

If the CIM is readable and covers at least 2 years of financials, proceed. If missing the codename
only, use a placeholder and continue. Only stop and ask if: (a) multiple CIMs are uploaded with no
clear instruction, or (b) no company or sector can be identified at all.

## Step 2 — Extract structured data

Pull the following from the CIM. Keep a working list internally before writing the teaser.

**Company profile:**
- Founding year and ownership type (family, founder, PE-backed)
- Core business: what the company does and how it earns revenue
- Business segments or service lines (up to 3); revenue split by segment or geography if disclosed
- Headcount (FTEs, rounded to nearest 10 or 50)
- Number of production sites / offices (generalise to region, not exact city)
- Market position: stated or implied rank within niche (e.g., "one of the top 3 in DACH") — quote the CIM directly; do not assert without a source
- Revenue quality: share of recurring vs. project-based revenue; framework agreements or long-term contracts (duration, renewal history)
- Customer concentration: top 3–5 customer types and approximate revenue share (anonymise to sector/type); flag if top customer > 20% of revenue
- Competitive moat: proprietary technology, certifications, accreditations, minimum reference requirements, or switching costs that restrict substitution
- Management depth: number of key functional leaders, combined tenure (anonymised); whether management is committed post-transaction
- Operational metrics: capacity utilisation, backlog coverage ratio, on-time delivery or quality certifications — include only if stated in CIM
- Geographic reach and export share (if relevant)

**Market:**
- Total addressable market size and growth rate (cite if given: `[Source: CIM, p.X]`)
- Key structural demand drivers: regulatory, ESG, infrastructure backlog, demographic, or technological tailwinds — quantify each where the CIM provides data
- Supply/demand imbalance or order backlog dynamics: explain why capacity is constrained or lead times are long
- Market structure: approximate number of significant competitors; whether the market is fragmented (consolidation opportunity) or consolidated (incumbent moat); company's estimated position within that structure
- Barriers to entry: licences, approvals, specialist equipment, reference-project requirements, or minimum scale thresholds that protect incumbents
- Pricing dynamics: ability to pass through input cost inflation; framework pricing vs. spot; any pricing power evidence in the CIM
- Regulatory and policy backdrop: specific programmes, funding budgets, or mandated spending that underpin demand — cite amounts and timelines if given
- Adjacent growth markets or product extension opportunities explicitly flagged in the CIM
- Buy-and-build landscape: if the market is fragmented, note the number of identifiable consolidation targets and their typical size range (use CIM data or flag if absent)

**Financials (exactly as stated — do not interpolate):**
- Revenue: last 3 actuals + 2–3 year forecast (label each: FY20A, FY21A, FY22FC, etc.)
- EBITDA: same series
- EBITDA margin (%): same series
- Revenue CAGR (state the period clearly)
- Order backlog / order intake (if present, with date)

**Transaction:**
- Structure (succession, MBO, buy-and-build, secondary)
- Proposed EV or valuation range
- Proposed equity ticket / leverage multiple
- Seller rollover (%)
- Process type and closing timeline

**Investment highlights (up to 6):**
Identify the strongest, most differentiated claims. Each must be grounded in a specific CIM fact.

## Step 3 — Apply the exclusion filter

Before writing, check every extracted item against these rules. Flag or redact as required.

**Always remove:**
- Legal entity name → replace everywhere with the project codename
- Registered address or exact plant location → generalise to region (e.g., "Northern Germany")
- Named individual managers → replace with "the management team" or "senior management with X years combined experience"
- Named customers → replace with customer type description unless logos are explicitly approved by deal team
- Exact contract values or specific project revenues
- Gross margin or cost-line detail below EBITDA level
- Pending litigation or undisclosed material risks
- Any data room index, adviser names, or timetable not approved for external sharing
- Forward-looking figures without "Management forecast" or "per management plan" label

For every redaction, add a line to the Redaction Log (compiled at the end):
`[REDACTION: [original type] → [replacement applied] | Source: [file, section]]`

## Step 4 — Write the teaser

Follow the exact 2-page structure in `references/teaser-structure.md`. Build section by section.

**Rules:**
- Every factual claim must trace to a source file. If it cannot, either omit it or add:
  `[FLAG: source not found — confirm with deal team]`
- Forecasts always labelled: "Management forecast" or "per management plan"
- Approximate numbers use "c." prefix (e.g., "c. EUR 32m")
- Number format: EUR X.Xm / X% / FY21A — consistent throughout
- No superlatives ("world-class", "unique", "best-in-class") without a cited supporting fact
- Refer to the company as "[Codename]" or "the Company" — never the legal name
- Section headings: bold, ALL CAPS, consistent with Vorsprung style
- Target length: 2 dense but readable pages — no padding, every sentence earns its place

**Investment Highlights:** Write exactly 6. Each has:
1. A bold 3–6 word opening phrase
2. One to two supporting sentences
3. At least one quantified data point where possible

**Financial chart:** Describe in words for the Markdown output:
- Dual-axis chart: Revenue (bars, EUR m, left axis), EBITDA (bars, EUR m, left axis), EBITDA margin % (line, right axis)
- Historical years in dark fill, forecast years in lighter fill
- Note: `[CHART PLACEHOLDER — data table for production use below]`
- Follow with a compact data table: Year | Revenue (EURm) | EBITDA (EURm) | Margin %

## Step 5 — Insert boilerplate

From `references/boilerplate.md`, insert verbatim:
- Confidentiality header on every page
- Vorsprung Overview paragraph
- Disclaimer (final page)
- Contact: Florian Lahnstein, Managing Partner, fl@vorsprungpartners.com, +49 152 28911579

Do not rephrase these blocks.

## Step 6 — Compile and flag

After the teaser draft, append two sections:

**Redaction Log** — numbered list of every redaction applied (type → replacement, source).

**Open Flags** — numbered list of every `[FLAG]` inserted, requiring human sign-off before
external distribution. If there are no flags, write: "No open flags — ready for deal team review."

## Step 7 — Save the output

Save the teaser as a `.md` file named:
`[ProjectCodename]_Teaser_Draft_[YYYY-MM-DD].md`

Try the following paths in order:
1. `/sessions/[session-id]/mnt/flvorsprung/` (Vorsprung folder if mounted)
2. `/sessions/[session-id]/mnt/Desktop/` (Desktop as fallback)

Use the session working directory to resolve the correct path. Tell the user where the file was saved.

## Quality control — run before finalising

- [ ] Every number in the teaser matches a specific figure in a source file
- [ ] No legal entity name or exact registered address anywhere
- [ ] No management names in the target company section
- [ ] No named customer unless explicitly deal team-approved
- [ ] No unsupported superlative
- [ ] All forecast figures labelled as management estimates
- [ ] Financial chart covers ≥ 3 historical years + ≥ 1 forecast year
- [ ] Exactly 6 Investment Highlights; each has a bold opener + data point
- [ ] Vorsprung Overview verbatim from boilerplate
- [ ] Disclaimer present and complete on final page
- [ ] Confidentiality header on every page
- [ ] All [FLAG] items listed in the Open Flags section

## Edge cases

**< 2 years of financials:** Build chart with available data only. Add:
`[FLAG: only X year(s) of actuals available — chart may be misleading without more context]`

**No forecast data:** Use actuals only. Note: "Management forecasts not yet available."

**No quantified market size:** Write a qualitative market narrative. Add:
`[FLAG: no quantified TAM in source — recommend adding market data before external distribution]`

**CIM in German:** Extract in German, translate to English for the teaser. Flag any specialist
terminology that may require expert review.

**Conflicting figures across files:** Use the most recent audited figure. Note the conflict in
the Redaction Log.

**No reference project images:** Insert: `[IMAGE PLACEHOLDER: reference project — to be provided by deal team]`
