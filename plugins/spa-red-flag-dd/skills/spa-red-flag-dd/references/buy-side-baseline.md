# Vorsprung Partners — Buy-Side SPA Baseline Standards

This reference distills the buyer-side positions from previous Vorsprung Partners SPAs (ZSB/Barcelona, Window/Müller, HemaTec, Forest/Schrader). Use these as the benchmark when screening incoming seller drafts. Deviations from these positions should be flagged.

## Language Note
The baseline below uses German terms with English equivalents in parentheses. When producing outputs:
- **German SPA → German outputs:** Use the German terms (Garantien, Haftungshöchstbetrag, Freibetrag, Freistellung, etc.)
- **English SPA → English outputs:** Use the English equivalents (warranties, liability cap, basket/deductible, indemnity, etc.)
- The legal concepts are the same — only the language differs. The same baseline thresholds (20% cap, EUR 150k de minimis, etc.) apply regardless of language.

## Table of Contents
1. [Overall Structure](#1-overall-structure)
2. [Purchase Price & Payment](#2-purchase-price--payment)
3. [Earn-Out](#3-earn-out)
4. [No-Leakage / Locked Box](#4-no-leakage--locked-box)
5. [Closing Conditions & MAC](#5-closing-conditions--mac)
6. [Seller Warranties (Verkäufergarantien)](#6-seller-warranties)
7. [Warranty Breach Consequences](#7-warranty-breach-consequences)
8. [Liability Limitations](#8-liability-limitations)
9. [Tax Provisions](#9-tax-provisions)
10. [Indemnities (Freistellungen)](#10-indemnities)
11. [Interim Covenants](#11-interim-covenants)
12. [Non-Compete / Non-Solicit](#12-non-compete--non-solicit)
13. [W&I Insurance Compatibility](#13-wi-insurance-compatibility)
14. [Confidentiality & Miscellaneous](#14-confidentiality--miscellaneous)

---

## 1. Overall Structure

Vorsprung SPAs typically follow this structure (German-law GmbH share purchases, occasionally AG):

- Preamble / Recitals with corporate background
- Shareholder resolutions / consents (Gesellschafterversammlung)
- Sale and transfer of shares (Verkauf und Abtretung)
- Purchase price and payment mechanics
- Earn-out (where applicable)
- No-leakage / locked-box provisions (Kein Wertabfluss)
- Closing conditions (Vollzugsvoraussetzungen)
- Closing mechanics (Vollzug / Vollzugshandlungen)
- Withdrawal rights (Rücktritt)
- Interim covenants (Führung des Geschäftsbetriebs)
- Seller warranties (Garantien) — typically as Anlage
- Warranty breach consequences (Rechtsfolgen / Verletzung von Verkäufergarantien)
- Liability limitations (Haftungsbeschränkung)
- Tax provisions (Steuern)
- Indemnities (Freistellungen)
- Buyer warranties (Käufergarantien)
- Confidentiality
- Costs
- Notices
- Miscellaneous / Final provisions (Schlussbestimmungen)

**Key structural expectation:** Warranties are structured as selbstständige Garantieversprechen (independent guarantee promises) under § 311 Abs. 1 BGB — not as Beschaffenheitsvereinbarungen (quality agreements) under § 434 BGB. This is standard for German M&A and has important implications for limitation periods and remedies. In English-language SPAs governed by German law, this is typically expressed as: "The Seller's warranties constitute independent guarantee promises (selbstständige Garantieversprechen) within the meaning of Section 311(1) BGB."

---

## 2. Purchase Price & Payment

**Baseline positions:**
- Fixed purchase price (Festkaufpreis) paid at closing, or
- Purchase price with post-closing adjustment (completion accounts) or locked-box mechanism
- Payment by wire transfer, free of costs/taxes, to seller's nominated account
- Payments from seller to buyer (warranty claims, indemnities etc.) treated as purchase price reduction for tax purposes

**Red flags in seller drafts:**
- Purchase price payable before closing conditions satisfied
- No escrow or retention mechanism for disputed amounts
- Seller's ability to challenge purchase price calculation without clear dispute resolution
- Missing or vague payment mechanics

---

## 3. Earn-Out

**Baseline positions (from ZSB and Window SPAs):**
- EBITDA-based earn-out with clearly defined calculation methodology
- Normalization of EBITDA for extraordinary items
- Floor and ceiling (minimum/maximum EBITDA thresholds)
- Multiple earn-out periods possible (e.g., Earn-Out I and II covering different fiscal years)
- Catch-up mechanism: if target missed in period 1 but average across periods meets threshold, earn-out still payable
- Calculation by company's auditor (Steuerberater/Wirtschaftsprüfer)
- Anti-manipulation clause: buyer cannot artificially shift revenue/costs to defeat earn-out
- Earn-out payments treated as purchase price adjustment for tax purposes

**Red flags in seller drafts:**
- Vague EBITDA definition without normalization rules
- No buyer covenant to operate business in ordinary course during earn-out period
- Seller's unilateral right to determine EBITDA
- Missing dispute resolution mechanism for earn-out calculation
- No anti-manipulation protection
- Earn-out period extending beyond 2-3 years

---

## 4. No-Leakage / Locked Box

**Baseline positions (from ZSB, Window, Forest SPAs):**
- Seller guarantees no value extraction (Wertabfluss/Vermögensabfluss) from effective date to closing
- Comprehensive definition of leakage: dividends, management fees, loans, guarantees, asset transfers, payments to seller or related parties
- Defined list of permitted leakage (Erlaubte/Zulässige Wertabflüsse) in schedule
- Euro-for-euro restitution obligation for any leakage
- Leakage claims not subject to the general liability caps (important!)
- Related persons (Nahestehende Personen) defined broadly (§ 138 InsO or similar)

**Red flags in seller drafts:**
- Narrow definition of leakage that excludes indirect extraction
- Broad permitted leakage carve-outs
- Leakage claims subject to general liability limitations
- No definition or incomplete definition of related persons
- Missing guarantee period (should cover Stichtag to Vollzugstag)

---

## 5. Closing Conditions & MAC

**Baseline positions:**
- Merger control clearance (Bundeskartellamt) as standard condition
- MAC clause: material adverse change in target's business, defined as permanent event with measurable EBITDA impact (e.g., ≥17.5% of annual EBITDA in ZSB)
- Force majeure excluded from MAC definition
- Buyer's right to waive closing conditions unilaterally
- Long-stop date (typically 3-6 months after signing) with automatic termination
- Seller confirmation of no-MAC at closing (Bestätigung Nichtvorliegen MAC)

**Red flags in seller drafts:**
- No MAC clause or MAC defined so narrowly as to be meaningless
- MAC triggered only by "insolvency-level" events
- Seller can also waive buyer-protective conditions
- No long-stop date or excessively long period (>6 months)
- Missing break fee or termination mechanics

---

## 6. Seller Warranties (Verkäufergarantien)

**Baseline warranty catalogue (from ZSB Garantiekatalog and Forest §7):**

### Fundamental Warranties (Fundamentalgarantien)
These receive enhanced protection (higher caps, longer limitation):
- Seller's authority and capacity to transact
- No insolvency proceedings
- Title to shares — free and clear of encumbrances
- Corporate existence and valid incorporation

### Business Warranties
- **Corporate matters:** accurate share register, capital fully paid, no undisclosed shareholders, no enterprise agreements (§§ 291/292 AktG)
- **Financial statements:** compliance with GoB/HGB, true and fair view, books properly maintained, BWAs accurate
- **Material contracts:** complete list, no defaults, no change-of-control termination rights, key customer relationships intact
- **Real estate:** complete list, proper permits, good condition, valid leases
- **Assets & IP:** ownership of material assets, IP free of encumbrances, no infringement
- **Employees:** complete list with compensation details, no pending disputes, pension obligations disclosed, works council/CBA status
- **Litigation:** no material proceedings (typically >EUR 100,000 threshold), no threatened claims
- **Permits & compliance:** all necessary licenses/permits in place, regulatory compliance, public procurement compliance (GWB, VgV)
- **Insurance:** adequate coverage, premiums current
- **IT:** no material disruptions, adequate capacity, license compliance
- **Environmental:** compliance with environmental law (especially important for industrial targets — Forest had separate environmental indemnity in §9)
- **Tax:** proper filing, no disputes, no audits pending (often separate section)
- **Anti-corruption / Anti-bribery:** no improper payments

### Warranty qualifiers to watch
- **Knowledge qualifier (Kenntnis des Verkäufers):** acceptable if defined as actual knowledge of seller plus named relevant persons, after reasonable inquiry. Problematic if limited to actual personal knowledge of seller only.
- **Materiality qualifiers:** acceptable if applied narrowly (e.g., "wesentlich" for specific warranties like contract lists). Problematic if applied as blanket qualifier across all warranties.
- **Disclosure qualifier:** VDR/data room disclosure should be "in Fairer Weise" — meaning clearly and specifically disclosed, not buried in bulk documents. A reasonable person reviewing the VDR should have been able to identify the relevant facts.

---

## 7. Warranty Breach Consequences

**Baseline positions:**
- Primary remedy: Naturalrestitution (restoration to position as if warranty were true)
- If not possible or not timely: monetary damages (Schadenersatz in Geld)
- Damages calculated per §§ 249 ff. BGB
- Excluded from damages: unforeseeable consequential losses, internal admin costs, lost profits (UNLESS from binding contracted orders), wasted expenditure, purchase-price-multiple claims

**Red flags in seller drafts:**
- Sole remedy limited to purchase price reduction (no Naturalrestitution)
- Excessive limitations on damage types recoverable
- No obligation to give prompt written notice (Anspruchsmitteilung) — while required, this should not be a condition precedent with unreasonably short deadlines
- Seller's right to cure without clear timeframe

---

## 8. Liability Limitations

**Baseline positions (from ZSB as primary benchmark):**

| Parameter (DE / EN) | General Warranties (Geschäftsgarantien / Business Warranties) | Fundamental + Tax (Fundamentalgarantien / Fundamental Warranties) |
|-----------|-------------------|-------------------|
| **Cap / Haftungshöchstbetrag** | 20% of purchase price | 100% of purchase price |
| **De minimis / Mindestbetrag** | EUR 150,000 per claim | None |
| **Basket / Freibetrag (excess only / Freibetrag)** | EUR 500,000 (excess only — seller pays only above basket) | None |
| **Limitation period / Verjährungsfrist** | 18 months from closing | 5 years from closing (Fundamental), separate for Tax |

Note on terminology: "Freibetrag" = excess-only basket/deductible (seller liable only for amount exceeding the basket). "Freigrenze" = threshold/tipping basket (once exceeded, seller liable from first euro). The Vorsprung baseline uses Freibetrag (excess only), which is more seller-friendly than Freigrenze. In English SPAs: "deductible" or "excess-only basket" = Freibetrag; "threshold" or "tipping basket" = Freigrenze.

**Forest SPA comparison:** Cap at 100% for title warranties, 10-year limitation period (this is the seller-friendliest of the four SPAs and was a smaller, simpler deal).

**HemaTec comparison:** Cap at 100% of purchase price, 10-year limitation (also simpler structure).

**Red flags in seller drafts:**
- Overall cap below 20% of purchase price for general warranties
- Fundamental warranty cap below 100%
- De minimis above EUR 150,000 (or above ~1% of EV)
- Basket (Freibetrag) above EUR 500,000 (or above ~3-5% of EV) — especially if first-dollar (Freigrenze) rather than excess-only (Freibetrag)
- Limitation period below 18 months for general warranties
- Limitation period below 36 months for fundamental warranties
- All warranties subject to knowledge/disclosure qualifiers
- Seller knowledge defense applied to fundamental warranties
- No carve-out from caps for fraud/wilful misconduct (Vorsatz/arglistige Täuschung)
- Mitigation obligations placed disproportionately on buyer

---

## 9. Tax Provisions

**Baseline positions (from ZSB and Window SPAs):**
- Separate tax warranties (Steuergarantien): proper filing, no disputes, compliance
- Tax indemnity (Steuerfreistellung): seller indemnifies for pre-closing tax liabilities
- Indemnified taxes include: corporate income tax, trade tax, VAT, wage tax, real estate transfer tax
- Tax benefit offset: indemnity reduced by tax savings arising from the indemnified matter
- Seller cooperation: seller must cooperate with tax audits, buyer controls defense
- Tax indemnity NOT subject to general warranty caps (separate regime)
- Limitation: typically statutory limitation for tax claims (often 5-7 years)

**Red flags in seller drafts:**
- Tax indemnity subject to general warranty caps
- Short limitation period for tax claims (should follow statutory periods)
- Buyer cannot control tax proceedings
- No seller cooperation obligation
- Tax indemnity limited to "known" tax issues only

---

## 10. Indemnities (Freistellungen)

**Baseline positions:**
- Specific indemnities for identified risks from due diligence
- Environmental indemnity (especially for industrial targets — Forest §9 had dedicated section)
- Indemnities typically NOT subject to general warranty limitations (de minimis, basket, cap)
- Euro-for-euro recovery
- Indemnity claims treated as purchase price reduction for tax purposes

**Red flags in seller drafts:**
- Specific indemnities subject to general caps
- Narrow scope that doesn't cover identified DD risks
- Missing environmental indemnity for industrial/manufacturing targets

---

## 11. Interim Covenants

**Baseline positions:**
- Seller must operate business in ordinary course between signing and closing
- Consent requirements for extraordinary actions (material contracts, capex above threshold, hiring/firing key employees, dividend payments, changes to articles of association)
- No dispositions of material assets
- Maintenance of insurance coverage
- Compliance with laws
- Buyer's reasonable access to information

**Red flags in seller drafts:**
- Broad carve-outs allowing seller to take extraordinary actions without consent
- No information rights for buyer during interim period
- Consent thresholds too high

---

## 12. Non-Compete / Non-Solicit

**Baseline positions (from HemaTec Gesellschaftervereinbarung):**
- Non-compete for seller: typically 2-3 years post-closing
- Scope: same industry/market as target, defined geographic area
- Non-solicitation of employees and customers
- Concentration obligation for management sellers who remain post-closing

**Red flags in seller drafts:**
- No non-compete or period less than 2 years
- Narrow scope that allows seller to compete through related entities
- No non-solicitation provision
- Non-compete subject to unreasonable carve-outs

---

## 13. W&I Insurance Compatibility

When W&I insurance is contemplated, the SPA must be compatible with underwriting requirements:

**Key requirements:**
- Clean warranty catalogue without excessive knowledge/materiality qualifiers
- Fundamental warranties clearly separated from business warranties
- De minimis and basket at reasonable levels (not so high that they swallow W&I coverage)
- Limitation periods long enough for W&I policy period (typically 7 years for W&I)
- Seller's fraud/wilful misconduct carved out from all limitations
- No "seller-friendly" disclosure mechanisms that could defeat warranty claims
- VDR properly maintained with index

**Red flags:**
- Blanket knowledge qualifiers making warranties effectively uninsurable
- Warranty periods shorter than standard W&I policy period
- Unusual limitation mechanisms that W&I insurers may exclude

---

## 14. Confidentiality & Miscellaneous

**Baseline positions:**
- Mutual confidentiality with carve-outs for advisors, financing parties, legal/regulatory requirements
- Governing law: German law (Recht der Bundesrepublik Deutschland / the laws of the Federal Republic of Germany)
- Dispute resolution: German courts (typically Hamburg) or arbitration (Schiedsgericht / arbitral tribunal)
- Written form requirement (Schriftformerfordernis / written form) for amendments
- No assignment (Abtretung / assignment) without prior written consent
- Severability clause (Salvatorische Klausel / severability)
- Entire agreement / integration clause (Gesamtvertrag / entire agreement)
- Costs: each party bears own advisor costs; notarial costs split or borne by buyer
- Notices: written form, specified addresses

**Note for English-language SPAs:** Even when the SPA is drafted in English, German-law concepts apply if the governing law is German. Key terms like "selbstständige Garantieversprechen", notarization requirements (§ 15 Abs. 4 GmbHG), and Freibetrag/Freigrenze mechanics should be referenced in the English-language equivalent but still explicitly tied to the German statutory framework.
