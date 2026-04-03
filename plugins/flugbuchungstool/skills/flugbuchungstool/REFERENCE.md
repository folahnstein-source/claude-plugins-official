# Flugbuchungstool — Output Template & Referenz

## Pflicht-Output-Struktur

Halte exakt diese Reihenfolge und Formatierung ein:

---

# Flugvergleich für [ABFLUGORT] → [ZIELORT]

**Reisedaten:** [Hin- und Rückflugdatum oder "one-way"]
**Passagiere:** [z. B. 2 Erwachsene]
**Gepäck:** [z. B. 1x Aufgabegepäck 23 kg]
**Reiseklasse:** Economy
**Max. Stopps:** [0 / 1 / unbegrenzt]
**Zeitfenster:** [z. B. Abflug 06:00–12:00 Uhr]
**Prioritäten:** Direktflug → niedrigster Preis → Airline-Direktbuchung
**Recherchebasis:** [genutzte Plattformen]
**Stand der Recherche:** [Datum, Uhrzeit, CET]

---

## Kurzfazit

- **Beste Gesamtoption:** [Option + kurzer Grund, max. 2 Sätze]
- **Günstigste Option:** [Option + Preis]
- **Beste Direktbuchung bei Airline:** [Option + Airline + Preis]
- **Wichtige Hinweise:** [2–4 prägnante Punkte, z. B. Preisvolatilität, Gepäckfalle]

---

## Vergleichstabelle

| Rang | Typ | Airline / Anbieter | Strecke / Flugnr. | Abflug → Ankunft | Dauer | Stops | Gepäck | Tarif | Preis p.P. | Preis gesamt | Buchungsquelle | Buchbar? | Risiken |
|:---:|:---:|---|---|---|:---:|:---:|---|---|---:|---:|---|:---:|---|
| 1 | Direkt | ... | ... | ... | ... | 0 | ... | ... | ... | ... | ... | ✅ | ... |
| 2 | Direkt | ... | ... | ... | ... | 0 | ... | ... | ... | ... | ... | ✅ | ... |
| 3 | 1 Stopp | ... | ... | ... | ... | 1 | ... | ... | ... | ... | ... | ✅ | ... |

> Spalte „Buchbar?": ✅ = buchbar wirkend | ⚠️ = unsicher | ❌ = nicht empfohlen

---

## Detailansicht je Option

### Option [N] — [Kurztitel, z. B. "Lufthansa Direktflug ab FRA"]

| Feld | Detail |
|---|---|
| **Rang & Warum** | [z. B. Rang 1 — günstigster Direktflug, Airline-Direktbuchung verfügbar] |
| **Airline** | [Name + IATA-Code wenn bekannt] |
| **Flugnummer(n)** | [z. B. LH 1234] |
| **Buchbar über** | [Airline-Website / OTA-Name / Metasuche] |
| **Buchungslink** | [URL oder eindeutige Buchungsquelle] |
| **Flugtyp** | Direktflug / [N] Stopp(s) |
| **Abflug** | [Zeit Lokalzeit, Flughafen IATA] |
| **Ankunft** | [Zeit Lokalzeit, Flughafen IATA] |
| **Gesamtdauer** | [z. B. 2h 15min] |
| **Gepäck** | [z. B. 1 Handgepäck 8 kg inklusive / Aufgabe 23 kg: +35 EUR] |
| **Tarifart** | [z. B. Light / Flex / Basic Economy — nicht umbuchbar / umbuchbar gegen Gebühr] |
| **Umbuchung** | [z. B. nicht möglich / 75 EUR Gebühr] |
| **Erstattung** | [z. B. nicht erstattbar / Steuern rückforderbar] |
| **Sitzplatz** | [z. B. kostenpflichtig / inklusive / Standard-Sitzplatz inklusive] |
| **Preis p.P.** | [z. B. 189 EUR] |
| **Preis gesamt** | [z. B. 378 EUR für 2 Personen] |
| **Enthaltene Kosten** | [z. B. Steuern und Gebühren inklusive, kein Gepäck] |
| **Mögliche Zusatzkosten** | [z. B. Aufgabegepäck +35 EUR p.P., Sitzplatzwahl +10 EUR] |
| **Preisquelle validiert** | [z. B. geprüft auf lufthansa.com am 24.03.2026] |

**Nachteile / Risiken:**
- [Punkt 1]
- [Punkt 2]

**Eignung für:** [z. B. reisende mit Gepäck, Flexibilitätsbedarf, Budgetreisende]

---

[Wiederhole den Block für jede weitere Option]

---

## Empfehlung

| Szenario | Empfehlung | Grund |
|---|---|---|
| **Jetzt buchen** | Option [N] | [1 Satz] |
| **Wenn Preis entscheidend** | Option [N] | [1 Satz] |
| **Wenn Flexibilität wichtig** | Option [N] | [1 Satz] |
| **Wenn Gepäck inklusive Pflicht** | Option [N] | [1 Satz] |

---

## Verify

### Annahmen
- [z. B. 1 Handgepäckstück 55×40×20 cm ohne Aufgabe, sofern nicht anders angegeben]
- [z. B. Zahlung per Kreditkarte — mögliche Aufschläge bei manchen OTAs]
- [z. B. Economy Standard, keine Meilen-/Punkteeinlösung]

### Unsicherheiten
- [z. B. Flugpreise ändern sich mehrfach täglich — Preise zum Zeitpunkt der Recherche]
- [z. B. Verfügbarkeit bestimmter Tarife nicht garantiert]
- [z. B. Gepäckregeln bei OTA-Buchungen können von Airline-Regeln abweichen]

### Mögliche Preisfallen in dieser Suche
- [spezifische Warnung 1]
- [spezifische Warnung 2]

### Eine empfohlene Alternative zum Prüfen
> [Konkrete Alternative: z. B. "Abflug von HAM statt FRA prüfen — ggf. 30–50 EUR günstiger laut erster Sichtung" oder "Abflug einen Tag früher (TT.MM.) — oft deutlich günstigere Tarife verfügbar"]

---

## Recherchequellen dieser Anfrage

| Quelle | Typ | Geprüft | Anmerkung |
|---|---|---|---|
| [z. B. lufthansa.com] | Airline direkt | ✅ | Primärquelle für LH-Tarife |
| [z. B. google.com/flights] | Metasuche | ✅ | Preisüberblick, Weiterleitung zur Airline |
| [z. B. skyscanner.de] | Metasuche | ✅ | OTA-Vergleich |
| [z. B. kayak.de] | Metasuche | ✅ | Ergänzender Check |

---

## Glossar (bei Bedarf)

| Begriff | Erklärung |
|---|---|
| OTA | Online Travel Agency (z. B. Expedia, Opodo) — Zwischenhändler |
| Metasuche | Preisvergleichsseite (z. B. Google Flights, Skyscanner) — leitet zur Buchungsquelle weiter |
| Self-Transfer | Zwei separate Tickets für eine Verbindung — kein Schutz bei Verspätung |
| Light/Basic | Billigsttarif — oft nur Handgepäck, nicht umbuchbar |
| Flex-Tarif | Umbuchbar/erstattbar gegen Gebühr oder kostenlos |
| Layover | Zwischenlandung / Umstieg |
| IATA-Code | 3-Buchstaben-Kürzel für Flughafen (z. B. FRA = Frankfurt) |
