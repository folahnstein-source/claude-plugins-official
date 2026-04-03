#!/usr/bin/env node
/**
 * SPA Red-Flag Report Generator
 *
 * Usage: node generate_report.js <output_path> <json_data_path>
 *
 * The JSON data file should contain:
 * {
 *   "projectName": "Project XYZ",
 *   "date": "2026-03-20",
 *   "language": "de" | "en",
 *   "summary": { "red": 3, "amber": 5, "green": 8, "topIssues": ["...", "...", "..."], "overallAssessment": "..." },
 *   "sections": [
 *     {
 *       "id": 1,
 *       "category": "Purchase Price & Payment Mechanics",
 *       "rating": "RED" | "AMBER" | "GREEN",
 *       "spaProvision": "What the SPA says...",
 *       "baselinePosition": "What Vorsprung normally expects...",
 *       "assessment": "Analysis and reasoning...",
 *       "suggestedAction": "revise" | "negotiate" | "accept"
 *     }
 *   ],
 *   "missingProvisions": ["..."],
 *   "wiInsuranceNotes": "..."
 * }
 */

const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle,
  WidthType, ShadingType, PageBreak, PageNumber
} = require("docx");

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error("Usage: node generate_report.js <output_path> <json_data_path>");
  process.exit(1);
}

const outputPath = args[0];
const data = JSON.parse(fs.readFileSync(args[1], "utf-8"));

const COLORS = {
  RED: "FF4444",
  AMBER: "FFB347",
  GREEN: "77DD77"
};

const lang = (data.language || "de").toLowerCase();

const ACTION_LABELS = lang === "en" ? {
  revise: "Revise before signing",
  negotiate: "Negotiate",
  accept: "Accept as-is"
} : {
  revise: "Überarbeitung vor Unterzeichnung erforderlich",
  negotiate: "Verhandeln",
  accept: "Akzeptabel"
};

const LABELS = lang === "en" ? {
  title: "SPA RED-FLAG REPORT",
  datePrefix: "Date",
  confidential: "CONFIDENTIAL — FOR INTERNAL USE ONLY",
  execSummary: "Executive Summary",
  topIssues: "Top Critical Issues:",
  sectionAnalysis: "Section-by-Section Analysis",
  spaLabel: "SPA says:",
  baselineLabel: "Baseline:",
  assessmentLabel: "Assessment:",
  actionLabel: "Action:",
  missingTitle: "Missing Provisions",
  missingIntro: "The following standard provisions are absent from the SPA:",
  wiTitle: "W&I Insurance Compatibility",
} : {
  title: "SPA RED-FLAG REPORT",
  datePrefix: "Datum",
  confidential: "VERTRAULICH — NUR FÜR DEN INTERNEN GEBRAUCH",
  execSummary: "Zusammenfassung",
  topIssues: "Kritischste Punkte:",
  sectionAnalysis: "Analyse nach Kategorien",
  spaLabel: "SPA-Entwurf:",
  baselineLabel: "Baseline:",
  assessmentLabel: "Bewertung:",
  actionLabel: "Maßnahme:",
  missingTitle: "Fehlende Regelungen",
  missingIntro: "Die folgenden Standardregelungen fehlen im SPA-Entwurf:",
  wiTitle: "W&I-Versicherungskompatibilität",
};

const border = { style: BorderStyle.SINGLE, size: 1, color: "999999" };
const borders = { top: border, bottom: border, left: border, right: border };
const cellMargins = { top: 60, bottom: 60, left: 100, right: 100 };

function ratingCell(rating) {
  return new TableCell({
    borders,
    width: { size: 1200, type: WidthType.DXA },
    shading: { fill: COLORS[rating], type: ShadingType.CLEAR },
    verticalAlign: "center",
    margins: cellMargins,
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: rating, bold: true, size: 20, font: "Arial", color: rating === "AMBER" ? "000000" : "FFFFFF" })]
    })]
  });
}

function textCell(text, width, opts = {}) {
  return new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    margins: cellMargins,
    shading: opts.shading ? { fill: opts.shading, type: ShadingType.CLEAR } : undefined,
    children: [new Paragraph({
      spacing: { after: 40 },
      children: [new TextRun({ text: text || "", size: opts.size || 18, font: "Arial", bold: opts.bold || false, color: opts.color || "000000" })]
    })]
  });
}

// Build sections
const children = [];

// Cover page
children.push(
  new Paragraph({ spacing: { before: 4000 }, children: [] }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [new TextRun({ text: LABELS.title, size: 48, bold: true, font: "Arial", color: "333333" })]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 400 },
    children: [new TextRun({ text: data.projectName || "Untitled Project", size: 36, font: "Arial", color: "666666" })]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [new TextRun({ text: `${LABELS.datePrefix}: ${data.date}`, size: 22, font: "Arial", color: "999999" })]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: LABELS.confidential, size: 18, font: "Arial", color: "CC0000", bold: true })]
  }),
  new Paragraph({ children: [new PageBreak()] })
);

// Executive Summary
children.push(
  new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: LABELS.execSummary, font: "Arial", size: 28, bold: true })] }),
  new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: data.summary.overallAssessment || "", size: 20, font: "Arial" })] })
);

// Summary table
const summaryTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [3120, 3120, 3120],
  rows: [
    new TableRow({
      children: [
        textCell(`RED: ${data.summary.red}`, 3120, { shading: COLORS.RED, bold: true, color: "FFFFFF", size: 22 }),
        textCell(`AMBER: ${data.summary.amber}`, 3120, { shading: COLORS.AMBER, bold: true, size: 22 }),
        textCell(`GREEN: ${data.summary.green}`, 3120, { shading: COLORS.GREEN, bold: true, size: 22 })
      ]
    })
  ]
});
children.push(summaryTable);

// Top issues
if (data.summary.topIssues && data.summary.topIssues.length > 0) {
  children.push(
    new Paragraph({ spacing: { before: 300 }, children: [new TextRun({ text: LABELS.topIssues, size: 22, bold: true, font: "Arial" })] })
  );
  data.summary.topIssues.forEach((issue, i) => {
    children.push(new Paragraph({ spacing: { after: 80 }, indent: { left: 360 }, children: [new TextRun({ text: `${i + 1}. ${issue}`, size: 20, font: "Arial" })] }));
  });
}

children.push(new Paragraph({ children: [new PageBreak()] }));

// Section-by-section analysis
children.push(
  new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: LABELS.sectionAnalysis, font: "Arial", size: 28, bold: true })] })
);

(data.sections || []).forEach((section) => {
  const sectionTable = new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [1200, 8160],
    rows: [
      new TableRow({
        children: [
          ratingCell(section.rating),
          textCell(`${section.id}. ${section.category}`, 8160, { bold: true, size: 22 })
        ]
      }),
      new TableRow({
        children: [
          textCell(LABELS.spaLabel, 1200, { bold: true, size: 16, shading: "F5F5F5" }),
          textCell(section.spaProvision, 8160)
        ]
      }),
      new TableRow({
        children: [
          textCell(LABELS.baselineLabel, 1200, { bold: true, size: 16, shading: "F5F5F5" }),
          textCell(section.baselinePosition, 8160)
        ]
      }),
      new TableRow({
        children: [
          textCell(LABELS.assessmentLabel, 1200, { bold: true, size: 16, shading: "F5F5F5" }),
          textCell(section.assessment, 8160)
        ]
      }),
      new TableRow({
        children: [
          textCell(LABELS.actionLabel, 1200, { bold: true, size: 16, shading: "F5F5F5" }),
          textCell(ACTION_LABELS[section.suggestedAction] || section.suggestedAction, 8160, {
            bold: true,
            color: section.suggestedAction === "revise" ? "CC0000" : section.suggestedAction === "negotiate" ? "CC8800" : "228B22"
          })
        ]
      })
    ]
  });
  children.push(
    new Paragraph({ spacing: { before: 300 }, children: [] }),
    sectionTable
  );
});

// Missing provisions
if (data.missingProvisions && data.missingProvisions.length > 0) {
  children.push(
    new Paragraph({ children: [new PageBreak()] }),
    new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: LABELS.missingTitle, font: "Arial", size: 28, bold: true })] }),
    new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: LABELS.missingIntro, size: 20, font: "Arial" })] })
  );
  data.missingProvisions.forEach((item) => {
    children.push(new Paragraph({ spacing: { after: 80 }, indent: { left: 360 }, children: [new TextRun({ text: `• ${item}`, size: 20, font: "Arial", color: "CC0000" })] }));
  });
}

// W&I Insurance Notes
if (data.wiInsuranceNotes) {
  children.push(
    new Paragraph({ spacing: { before: 400 }, children: [] }),
    new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: LABELS.wiTitle, font: "Arial", size: 28, bold: true })] }),
    new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: data.wiInsuranceNotes, size: 20, font: "Arial" })] })
  );
}

// Create document
const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 20 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Arial" },
        paragraph: { spacing: { before: 240, after: 240 }, outlineLevel: 0 } },
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 }, // A4
        margin: { top: 1134, right: 1134, bottom: 1134, left: 1134 } // ~2cm margins
      }
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: "CONFIDENTIAL", size: 14, font: "Arial", color: "CCCCCC", italics: true })]
        })]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "Page ", size: 16, font: "Arial", color: "999999" }),
            new TextRun({ children: [PageNumber.CURRENT], size: 16, font: "Arial", color: "999999" })
          ]
        })]
      })
    },
    children
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outputPath, buffer);
  console.log(`Report written to ${outputPath}`);
});
