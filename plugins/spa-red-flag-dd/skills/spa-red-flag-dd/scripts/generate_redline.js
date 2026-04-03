#!/usr/bin/env node
/**
 * SPA Redline Generator — In-Place Edition
 *
 * Opens the seller's original SPA .docx, locates the text passages that need
 * revision, and inserts Word track-changes markup (w:del / w:ins) plus comments
 * directly into the document. The output is the same SPA with redlines visible
 * in Word's "Track Changes" view.
 *
 * Usage:
 *   node generate_redline.js <original_docx_path> <output_path> <json_data_path>
 *
 * The JSON data file must contain:
 * {
 *   "projectName": "Project XYZ",
 *   "date": "2026-03-20",
 *   "language": "de" | "en",
 *   "author": "Vorsprung Partners",
 *   "redlines": [
 *     {
 *       "flagId": 1,
 *       "category": "Liability Caps & Limitations",
 *       "rating": "RED" | "AMBER",
 *       "clauseRef": "§ 12.3",
 *       "originalText": "Die Gesamthaftung des Verkäufers...",
 *       "revisedText": "Die Gesamthaftung des Verkäufers unter den Geschäftsgarantien...",
 *       "comment": "Red Flag #1: Liability cap below baseline..."
 *     }
 *   ]
 * }
 *
 * Approach:
 * 1. Unzip the .docx (which is a ZIP of XML files)
 * 2. Parse word/document.xml — collect text across <w:r> runs per paragraph
 * 3. For each redline item, find the paragraph(s) containing the original text
 *    using normalized fuzzy matching
 * 4. Replace matched runs with <w:del> (original) + <w:ins> (revised) markup
 * 5. Add <w:commentRangeStart/End> around each revision + comment references
 * 6. Create or update word/comments.xml with the comment bodies
 * 7. Ensure word/settings.xml has <w:trackRevisions/> enabled
 * 8. Ensure [Content_Types].xml and word/_rels/document.xml.rels reference comments.xml
 * 9. Repack and write the modified .docx
 */

const fs = require("fs");
const JSZip = require("jszip");

const args = process.argv.slice(2);
if (args.length < 3) {
  console.error("Usage: node generate_redline.js <original_docx> <output_path> <json_data_path>");
  process.exit(1);
}

const originalDocxPath = args[0];
const outputPath = args[1];
const data = JSON.parse(fs.readFileSync(args[2], "utf-8"));

const author = data.author || "Vorsprung Partners";
const dateStr = data.date || new Date().toISOString().slice(0, 10);
const isoDate = `${dateStr}T00:00:00Z`;

// ── Helpers ──────────────────────────────────────────────────────────────

function escapeXml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Normalize whitespace for fuzzy matching: collapse runs of spaces/newlines */
function normalize(s) {
  return (s || "").replace(/\s+/g, " ").trim();
}

/** Extract plain text from all <w:t> elements inside a given XML fragment */
function extractText(xml) {
  const texts = [];
  const re = /<w:t[^>]*>([\s\S]*?)<\/w:t>/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    texts.push(m[1]
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'"));
  }
  return texts.join("");
}

/**
 * Find the highest existing w:id across del/ins/comment elements so we don't
 * collide when adding new ones.
 */
function findMaxId(xml) {
  let max = 0;
  const re = /w:id="(\d+)"/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    const n = parseInt(m[1], 10);
    if (n > max) max = n;
  }
  return max;
}

/**
 * Given a <w:p>...</w:p> block and a target string, check if the paragraph's
 * concatenated text contains the target (normalized, case-insensitive).
 * Returns true/false.
 */
function paragraphContains(pXml, target) {
  const pText = normalize(extractText(pXml));
  const tNorm = normalize(target);
  if (!tNorm) return false;
  return pText.toLowerCase().includes(tNorm.toLowerCase());
}

/**
 * Try to find a shorter unique snippet (first ~80 chars) of the originalText
 * that still uniquely identifies the paragraph. This handles cases where the
 * model's originalText is a slight paraphrase of the actual SPA text.
 */
function findMatchingSnippetLength(pText, originalText) {
  const oNorm = normalize(originalText).toLowerCase();
  const pNorm = normalize(pText).toLowerCase();
  // Try progressively shorter prefixes
  for (const len of [oNorm.length, 120, 80, 50, 30]) {
    const snippet = oNorm.substring(0, Math.min(len, oNorm.length));
    if (snippet.length >= 20 && pNorm.includes(snippet)) return true;
  }
  return false;
}

// ── Deletion / Insertion XML builders ────────────────────────────────────

function buildDeletionXml(text, revId, rPrInner) {
  // rPrInner is the original run's <w:rPr> content (fonts, size, etc.) to preserve formatting
  const rPr = rPrInner ? `<w:rPr>${rPrInner}<w:del/></w:rPr>` : `<w:rPr><w:del/></w:rPr>`;
  return `<w:del w:id="${revId}" w:author="${escapeXml(author)}" w:date="${isoDate}"><w:r>${rPr}<w:delText xml:space="preserve">${escapeXml(text)}</w:delText></w:r></w:del>`;
}

function buildInsertionXml(text, revId, rPrInner) {
  const rPr = rPrInner ? `<w:rPr>${rPrInner}</w:rPr>` : "";
  return `<w:ins w:id="${revId}" w:author="${escapeXml(author)}" w:date="${isoDate}"><w:r>${rPr}<w:t xml:space="preserve">${escapeXml(text)}</w:t></w:r></w:ins>`;
}

function buildCommentXml(commentId, text) {
  return `<w:comment w:id="${commentId}" w:author="${escapeXml(author)}" w:date="${isoDate}" w:initials="VP"><w:p><w:r><w:rPr><w:sz w:val="18"/><w:szCs w:val="18"/></w:rPr><w:t xml:space="preserve">${escapeXml(text)}</w:t></w:r></w:p></w:comment>`;
}

// ── Main ─────────────────────────────────────────────────────────────────

async function main() {
  // 1. Read and unzip the original .docx
  const docxBuf = fs.readFileSync(originalDocxPath);
  const zip = await JSZip.loadAsync(docxBuf);

  // 2. Read document.xml
  const docXmlFile = zip.file("word/document.xml");
  if (!docXmlFile) {
    console.error("ERROR: word/document.xml not found in the .docx archive.");
    process.exit(1);
  }
  let docXml = await docXmlFile.async("string");

  // Find the highest existing ID to avoid collisions
  let nextId = findMaxId(docXml) + 1;

  // 3. Collect all <w:p>...</w:p> blocks with their positions
  //    We use a regex that matches complete paragraph elements.
  //    This is safe because <w:p> elements don't nest.
  const paragraphs = [];
  const pRegex = /<w:p[ >][\s\S]*?<\/w:p>/g;
  let pMatch;
  while ((pMatch = pRegex.exec(docXml)) !== null) {
    paragraphs.push({
      start: pMatch.index,
      end: pMatch.index + pMatch[0].length,
      xml: pMatch[0],
      text: normalize(extractText(pMatch[0]))
    });
  }

  // 4. For each redline, find the matching paragraph(s) and build replacements
  const replacements = []; // { start, end, newXml }
  const comments = []; // comment XML strings

  let matchCount = 0;
  let missCount = 0;

  for (const item of (data.redlines || [])) {
    const origNorm = normalize(item.originalText).toLowerCase();
    if (!origNorm) continue;

    // Find paragraph(s) that contain the original text
    // Strategy: try exact normalized match first, then fuzzy prefix match
    let matched = [];

    // Pass 1: exact substring match on normalized text
    for (const p of paragraphs) {
      if (p.text.toLowerCase().includes(origNorm)) {
        matched.push(p);
      }
    }

    // Pass 2: if no exact match, try matching on a shorter prefix snippet
    if (matched.length === 0) {
      for (const p of paragraphs) {
        if (findMatchingSnippetLength(p.text, item.originalText)) {
          matched.push(p);
        }
      }
    }

    // Pass 3: if still no match, try word-overlap scoring
    if (matched.length === 0) {
      const origWords = new Set(origNorm.split(/\s+/).filter(w => w.length > 3));
      let bestScore = 0;
      let bestP = null;
      for (const p of paragraphs) {
        const pWords = new Set(p.text.toLowerCase().split(/\s+/));
        let overlap = 0;
        for (const w of origWords) {
          if (pWords.has(w)) overlap++;
        }
        const score = origWords.size > 0 ? overlap / origWords.size : 0;
        if (score > bestScore && score >= 0.5) {
          bestScore = score;
          bestP = p;
        }
      }
      if (bestP) {
        matched.push(bestP);
        console.log(`  Flag #${item.flagId}: fuzzy match (${Math.round(bestScore * 100)}% word overlap)`);
      }
    }

    if (matched.length === 0) {
      console.log(`  WARNING: Flag #${item.flagId} ("${item.clauseRef || item.category}") — no matching paragraph found. Will append at end.`);
      missCount++;
      // Append as new paragraph at end of body (before closing </w:body>)
      const commentId = nextId++;
      const delId = nextId++;
      const insId = nextId++;

      const fallbackXml =
        `<w:p><w:pPr/><w:commentRangeStart w:id="${commentId}"/>` +
        buildDeletionXml(item.originalText, delId, "") +
        buildInsertionXml(item.revisedText, insId, "") +
        `<w:commentRangeEnd w:id="${commentId}"/>` +
        `<w:r><w:rPr><w:rStyle w:val="CommentReference"/></w:rPr><w:commentReference w:id="${commentId}"/></w:r>` +
        `</w:p>`;

      // Insert before </w:body>
      const bodyEnd = docXml.lastIndexOf("</w:body>");
      if (bodyEnd !== -1) {
        docXml = docXml.slice(0, bodyEnd) + fallbackXml + docXml.slice(bodyEnd);
      }

      comments.push(buildCommentXml(commentId, `[Flag #${item.flagId} — ${item.rating} — ${item.category}] ${item.comment}`));
      continue;
    }

    matchCount++;

    // Use the FIRST matching paragraph for the replacement
    const targetP = matched[0];

    // Extract the first <w:rPr> from the paragraph to preserve formatting
    const rPrMatch = targetP.xml.match(/<w:rPr>([\s\S]*?)<\/w:rPr>/);
    const rPrInner = rPrMatch ? rPrMatch[1].replace(/<w:del\/>/g, "") : "";

    // Build the replacement: keep <w:pPr> but replace all runs
    const pPrMatch = targetP.xml.match(/<w:pPr>[\s\S]*?<\/w:pPr>/);
    const pPr = pPrMatch ? pPrMatch[0] : "<w:pPr/>";

    const commentId = nextId++;
    const delId = nextId++;
    const insId = nextId++;

    // The replacement paragraph: original pPr + comment start + deletion + insertion + comment end + ref
    const newParagraph =
      `<w:p>${pPr}` +
      `<w:commentRangeStart w:id="${commentId}"/>` +
      buildDeletionXml(targetP.text, delId, rPrInner) +
      buildInsertionXml(item.revisedText, insId, rPrInner) +
      `<w:commentRangeEnd w:id="${commentId}"/>` +
      `<w:r><w:rPr><w:rStyle w:val="CommentReference"/></w:rPr><w:commentReference w:id="${commentId}"/></w:r>` +
      `</w:p>`;

    replacements.push({
      start: targetP.start,
      end: targetP.end,
      newXml: newParagraph
    });

    comments.push(buildCommentXml(commentId, `[Flag #${item.flagId} — ${item.rating} — ${item.category}] ${item.comment}`));

    console.log(`  Flag #${item.flagId} ("${item.clauseRef || item.category}") — matched in paragraph at offset ${targetP.start}`);
  }

  // 5. Apply replacements in reverse order (so offsets stay valid)
  replacements.sort((a, b) => b.start - a.start);
  for (const r of replacements) {
    docXml = docXml.slice(0, r.start) + r.newXml + docXml.slice(r.end);
  }

  // 6. Write back document.xml
  zip.file("word/document.xml", docXml);

  // 7. Create or update word/comments.xml
  const commentsBody = comments.join("\n");
  let commentsXml;
  const existingComments = zip.file("word/comments.xml");
  if (existingComments) {
    let existing = await existingComments.async("string");
    // Insert our new comments before </w:comments>
    const closeTag = "</w:comments>";
    const idx = existing.lastIndexOf(closeTag);
    if (idx !== -1) {
      commentsXml = existing.slice(0, idx) + commentsBody + "\n" + existing.slice(idx);
    } else {
      commentsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<w:comments xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">\n${commentsBody}\n</w:comments>`;
    }
  } else {
    commentsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<w:comments xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">\n${commentsBody}\n</w:comments>`;
  }
  zip.file("word/comments.xml", commentsXml);

  // 8. Ensure settings.xml has trackRevisions
  const settingsFile = zip.file("word/settings.xml");
  if (settingsFile) {
    let settingsXml = await settingsFile.async("string");
    if (!settingsXml.includes("<w:trackRevisions")) {
      // Insert before </w:settings>
      settingsXml = settingsXml.replace("</w:settings>", "<w:trackRevisions/>\n</w:settings>");
      zip.file("word/settings.xml", settingsXml);
    }
  }

  // 9. Ensure [Content_Types].xml has the comments content type
  const ctFile = zip.file("[Content_Types].xml");
  if (ctFile) {
    let ctXml = await ctFile.async("string");
    if (!ctXml.includes("comments.xml")) {
      ctXml = ctXml.replace("</Types>",
        `<Override PartName="/word/comments.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml"/>\n</Types>`);
      zip.file("[Content_Types].xml", ctXml);
    }
  }

  // 10. Ensure word/_rels/document.xml.rels has a relationship for comments
  const relsFile = zip.file("word/_rels/document.xml.rels");
  if (relsFile) {
    let relsXml = await relsFile.async("string");
    if (!relsXml.includes("comments")) {
      // Find the next rId
      const rIdMatches = [...relsXml.matchAll(/Id="rId(\d+)"/g)];
      const maxRId = rIdMatches.reduce((max, m) => Math.max(max, parseInt(m[1], 10)), 0);
      const newRId = `rId${maxRId + 1}`;
      relsXml = relsXml.replace("</Relationships>",
        `<Relationship Id="${newRId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments" Target="comments.xml"/>\n</Relationships>`);
      zip.file("word/_rels/document.xml.rels", relsXml);
    }
  }

  // 11. Write the modified .docx
  const buffer = await zip.generateAsync({ type: "nodebuffer" });
  fs.writeFileSync(outputPath, buffer);

  console.log(`\nRedline document written to ${outputPath}`);
  console.log(`  ${matchCount} flags matched in-place, ${missCount} appended at end`);
  console.log(`  ${comments.length} comments added`);
}

main().catch(err => {
  console.error("Error generating redline:", err);
  process.exit(1);
});
