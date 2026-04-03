---
name: vorsprung-commercial-dd
description: >
  Run a quick commercial due diligence (quick DD) on a German SME target for Vorsprung Partners.
  Produces a structured 10-section markdown report with an investment view (Attractive / Neutral /
  Not Attractive) within the 48-hour speed standard. Use this skill whenever the user asks for:
  commercial due diligence, quick DD, a market or investment view on a company, "is this worth
  deeper work?", sector analysis for a potential acquisition, "run the numbers on this market",
  "assess this target", "what do we think about this deal?", or any request to evaluate a German
  SME or Mittelstand business from a commercial angle. Also trigger when the user uploads a CIM,
  teaser, or company profile and asks for a commercial view, or when they describe a target company
  and ask whether it is a good investment opportunity.
---

# Vorsprung Commercial Due Diligence

Run a fast, investor-grade commercial due diligence on a German SME. The goal is to produce a
clear, structured view within 48 hours — enough to decide "is this worth deeper work?" — using
publicly available data and web research.

## Who reads this output

Investment managers and deal team members at Vorsprung Partners. They are highly business-literate,
time-constrained, and may not be domain experts in the target's industry. They skim for headlines
and implications. Avoid jargon or define it briefly. Be concise and analytical.

## Step 1: Understand the task

Before writing anything, confirm your understanding of the inputs. Restate in 3–5 bullets:
- What industry / segment you're covering
- What the target company is (if provided)
- What the investor context is (always: direct PE investor, Vorsprung Partners)
- What geography / region is relevant (default: Germany nationwide)
- Any constraints (data limits, time, depth)

If something essential is missing — especially the industry or the target — ask up to 3 focused
clarifying questions, then proceed with stated assumptions even if not answered.

## Step 2: Research

Use web search and browsing to gather:
- Market size and growth estimates for the German segment (look for industry reports, trade
  associations, Statista, IBISWorld, Destatis, IFM Bonn, BDI, relevant Verbände)
- Key demand drivers and recent trends (last 2–3 years)
- Named competitors operating in Germany (SMEs, corporates, international, digital entrants)
- Any relevant German/EU regulation affecting the business model
- For the target company: website, LinkedIn, press releases, Bundesanzeiger, Creditreform if
  accessible, any news

For any quantitative claim, provide a range and a brief source note: `[Source: Statista, 2024]`.
If data is not available, say so explicitly and provide a labelled estimate: `[Estimate]`.

## Step 3: Write the report

Use **exactly** the 10-section structure below. Do not skip sections. Do not merge sections.
Every section has a clear job — follow through on each one.

Save the final report as a `.md` file in the user's workspace folder
(`/sessions/fervent-charming-archimedes/mnt/flvorsprung/`), named:
`[TargetCompanyName or Industry]_Quick_DD_[YYYY-MM-DD].md`

---

### Report structure

Use this exact template, filling in all placeholders:

```
# Quick Commercial Due Diligence
## [Target Company / Industry] — [Date]
*Prepared for Vorsprung Partners | Investor type: Direct PE*

---

## 1. Executive Summary

**Key findings:**
- [3–7 bullet takeaways — one sentence each, leading with the most important]

**Investment view: [Attractive / Neutral / Not Attractive]**
[1–2 sentence rationale]

---

## 2. Context & Scope

- **Industry / segment:** [industry] — [subsegment]
- **Geography:** [Germany nationwide / specific region]
- **Target company:** [name, size, basic financials if known — or "not specified"]
- **Investor context:** Vorsprung Partners (direct PE), [decision type, e.g. initial screening]
- **Key constraints:** [data limits, time, browsing used yes/no]

---

## 3. Market & Segment Overview (German SME Focus)

**Market definition:** [1–2 sentences on what's in/out of scope]

**Market size and growth:**
[EUR X–Y [m/bn], [year], growing at ~A–B% p.a. [Source: ...]]

**Key demand drivers:**
- [Driver 1: because → commercial implication]
- [Driver 2]
- [Driver 3]

**Seasonality, cyclicality, resilience:**
[Brief assessment — does demand hold in downturns? Is it lumpy?]

**Position of German SMEs vs large players:**
[How fragmented? Do SMEs compete on price, service, niche?]

---

## 4. Customer & Problem

**Main customer segments:**
| Segment | Profile | Share (est.) |
|---------|---------|-------------|
| [Segment A] | [Short description] | [~X%] |
| [Segment B] | [Short description] | [~X%] |

**Core needs / problems solved:**
- [Problem 1]
- [Problem 2]

**Buying process and decision makers:**
[Who decides, how long is the cycle, is it procurement-driven or relationship-driven?]

**Switching costs and loyalty:**
[High / Medium / Low — and why]

---

## 5. Competitive Landscape

**Competitor types:**
- *German SMEs:* [examples if known]
- *Large incumbents / corporates:* [examples if known]
- *International players:* [examples if known]
- *Digital / new entrants:* [examples if known]

**Competitive intensity:** [High / Medium / Low]
[1–2 sentences on how they compete — price, service, specialisation, brand]

**Simple positioning:**
[E.g., "Market splits between premium/specialist players (higher margin, lower volume) and
commoditised generalists (high volume, thin margins). Target occupies [position]."]

---

## 6. Target Company Snapshot ([Target Name])

*[Skip this section if no target was provided — note "No target specified."]*

**Business model:**
- [Bullet 1]
- [Bullet 2]
- [Bullet 3–6 max]

**Revenue streams and approximate unit economics:**
[State as estimates: e.g., "likely EBITDA margin ~X–Y% based on comparable SMEs in this
segment [Estimate]"]

**Customer mix and concentration:**
[Any known key accounts? Estimated customer count? B2B vs B2C split?]

**Strengths, weaknesses, edge:**
| | Assessment |
|---|---|
| Strengths | [2–3 bullets] |
| Weaknesses | [2–3 bullets] |
| Moat / edge (if any) | [Brief — or "unclear at this stage"] |

---

## 7. Regulation & Structural Factors (Germany / EU)

**Key regulations:**
- [Regulation 1 and its commercial implication]
- [Regulation 2]

**Licences / certifications needed:**
[Yes/No — which ones, and how hard to obtain]

**Structural barriers to entry or scalability:**
[What makes it hard for a new entrant? What limits growth?]

---

## 8. Commercial Risks & Red Flags

| Risk area | Risk | Severity | Mitigation |
|-----------|------|----------|------------|
| Demand | [e.g., cyclical exposure to construction] | H/M/L | [e.g., long-term contracts] |
| Competition | | | |
| Pricing | | | |
| Operational | | | |
| Regulatory / macro | | | |

*Mark any hard red flags (deal-breakers) in **bold**.*

---

## 9. Recommendation & Next Checks

**Overall view: [Go / No-Go / More Work Needed]**

**Fit with Vorsprung strategy:** [1–2 sentences]

**Top confirmatory questions for deeper DD:**
1. [Question 1]
2. [Question 2]
3. [Question 3]
4. [Question 4 — optional]
5. [Question 5 — optional]

**Alternative view:**
[1–3 bullets describing a plausible contrarian interpretation — more bullish or more cautious
than the main view, and why]

---

## 10. Assumptions, Data Gaps & Uncertainties

| Section | Key assumption | Confidence | What would change the view |
|---------|---------------|------------|---------------------------|
| Market size | [assumption] | H/M/L | [what if wrong] |
| Competitive landscape | | | |
| Target financials | | | |
| Regulation | | | |

**What this quick DD does NOT cover:**
- Detailed financial modelling or valuation
- Legal due diligence
- Technical product assessment beyond commercial logic
- Management team assessment

**Dependencies:**
[Any strong dependencies on future regulation, technology, or macro conditions]
```

---

## Step 4: Sanity check before finalising

Before saving the file, do a quick internal check:
- Are market sizes and growth rates consistent across sections 3, 4, and 9?
- Does the investment view in section 1 follow logically from sections 5, 6, and 8?
- Have you marked at least 3 uncertainties in section 10?
- Are quantitative claims sourced or labelled as estimates?
- Is section 6 filled in if a target was named — or explicitly noted as "not specified"?

Fix any inconsistencies, then save and share the file.

## Tone and format

- **Markdown output only** — use the template headings exactly
- **Length:** 1,500–2,500 words (excluding tables)
- **Tone:** Concise, analytical, neutral, investor-friendly
- **Numbers:** Always show units and year (e.g., `EUR 450m, 2023`); use ranges where uncertain
- **Evidence vs. assumption:** Mark clearly with `[Source: ...]` or `[Estimate]`
- **No jargon** without a brief definition — the reader may not be a domain expert
