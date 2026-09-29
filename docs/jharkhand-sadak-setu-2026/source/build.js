const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType,
  ShadingType, BorderStyle, AlignmentType, LevelFormat, PageBreak, Footer,
  PageNumber, VerticalAlign, TableLayoutType, HeightRule,
} = require("docx");
const { COMPANY, CLIENT, CLIENT_SHORT, ROADS_BUDGET_CR, modules, intro, fitTogether, startingPoints, workWith, assumptions, sources } = require("./content");

// Commercial loading applied to every cost line in content.js (base = delivery cost estimate).
// Covers partner/consulting arrangements and delivery contingency; see INTERNAL_pricing_basis.md.
const LOADING = 1.25;
const up = ([lo, hi]) => [Math.round(lo * LOADING * 2) / 2, Math.round(hi * LOADING * 2) / 2];
modules.forEach((m) => { for (const k of Object.keys(m.cost)) m.cost[k] = up(m.cost[k]); });
// Customer quote: show the top of each range as a single figure. The ranges stay in content.js
// and the internal negotiation sheet (docs/internal/Negotiation_Sheet_Jharkhand.md).
const QUOTE_HIGH = true;
if (QUOTE_HIGH) modules.forEach((m) => { for (const k of Object.keys(m.cost)) m.cost[k] = [m.cost[k][1], m.cost[k][1]]; });

// ---------- design tokens ----------
const FONT = "Arial";
const NAVY = "1B2A44";
const TEAL = "0E7C7B";
const GOLD = "B7791F";
const INK = "1F2937";
const MUTED = "5B6472";
const LINE = "CBD5E1";
const TINT_TEAL = "E6F4F3";
const TINT_GOLD = "FDF5E6";
const ZEBRA = "F7F9FC";
const PAGE_W = 11906; // A4
const MARGIN = 850;
const CW = PAGE_W - 2 * MARGIN;
const BODY = 19;

// ---------- money (₹ lakh) ----------
const add = (...r) => r.reduce((a, x) => [a[0] + x[0], a[1] + x[1]], [0, 0]);
const num = (v) => (Number.isInteger(v) ? String(v) : v.toFixed(1));
const crs = (l) => (l / 100).toFixed(2).replace(/0$/, "").replace(/\.0$/, ".0");
function one(l) { return l >= 100 ? `₹${crs(l)} cr` : `₹${num(l)} lakh`; }
function rng([a, b]) {
  if (a === b) return one(a);
  if (a >= 100) return `₹${crs(a)}–${crs(b)} cr`;
  if (b < 100) return `₹${num(a)}–${num(b)} lakh`;
  return `₹${num(a)} lakh–${crs(b)} cr`;
}
const oneTime = (c) => add(c.pilot, c.rollout);
const recur = (c) => add(c.infra, c.om);
const TOTAL_ONE = add(...modules.map((m) => oneTime(m.cost)));
const TOTAL_REC = add(...modules.map((m) => recur(m.cost)));

// ---------- docx helpers ----------
const run = (text, o = {}) => new TextRun({ text, font: FONT, size: o.size || BODY, bold: o.bold, italics: o.italics, color: o.color || INK });
const para = (children, o = {}) => new Paragraph({
  children: Array.isArray(children) ? children : [run(children, o)],
  spacing: { before: o.before || 0, after: o.after === undefined ? 70 : o.after, line: o.line || 260 },
  alignment: o.align, keepNext: o.keepNext,
});
const bullet = (children, o = {}) => new Paragraph({
  children: Array.isArray(children) ? children : [run(children, o)],
  numbering: { reference: "bul", level: 0 }, spacing: { after: 50, line: 256 }, keepLines: true,
});
const noB = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: noB, bottom: noB, left: noB, right: noB };
const thin = { style: BorderStyle.SINGLE, size: 4, color: LINE };
const thinBorders = { top: thin, bottom: thin, left: thin, right: thin };
function cell(children, width, o = {}) {
  return new TableCell({
    children: Array.isArray(children) ? children : [children],
    width: { size: width, type: WidthType.DXA },
    shading: o.fill ? { type: ShadingType.CLEAR, color: "auto", fill: o.fill } : undefined,
    borders: o.borders || thinBorders,
    margins: { top: o.pad ?? 70, bottom: o.pad ?? 70, left: 120, right: 120 },
    verticalAlign: o.valign || VerticalAlign.TOP, columnSpan: o.span,
  });
}
const table = (rows, widths) => new Table({ rows, columnWidths: widths, width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA }, layout: TableLayoutType.FIXED });
const pageBreak = () => new Paragraph({ children: [new PageBreak()] });
const headRow = (labels, widths, rightFrom = 99) => new TableRow({ tableHeader: true, cantSplit: true, children: labels.map((h, i) => cell(para([run(h, { bold: true, color: "FFFFFF", size: 17 })], { after: 0, align: i >= rightFrom ? AlignmentType.RIGHT : undefined }), widths[i], { fill: NAVY, pad: 60 })) });
function sectionHead(num, text) {
  return new Paragraph({
    children: [run(num + "  ", { bold: true, color: TEAL, size: 26 }), run(text.toUpperCase(), { bold: true, color: NAVY, size: 26 })],
    spacing: { before: 220, after: 90 }, keepNext: true,
  });
}
const callout = (label, children) => table([new TableRow({ cantSplit: true, children: [cell([
  para([run(label, { bold: true, color: GOLD, size: 17 })], { after: 40 }), ...children,
], CW, { fill: TINT_GOLD, borders: { ...noBorders, left: { style: BorderStyle.SINGLE, size: 24, color: GOLD } }, pad: 110 })] })], [CW]);

// ---------- cover ----------
function cover() {
  const out = [];
  out.push(table([new TableRow({ height: { value: 5000, rule: HeightRule.ATLEAST }, children: [cell([
    para([run("PROPOSAL FOR DISCUSSION", { bold: true, color: "E9B949", size: 20 })], { after: 360, before: 300 }),
    para([run("Sadak Setu Digital Stack", { bold: true, color: "FFFFFF", size: 56 })], { after: 160, line: 300 }),
    para([run("Faster road project reports, smarter cost checks, paperless approvals for Jharkhand's 12,736 km road network", { color: "DCE6F2", size: 28 })], { after: 360, line: 320 }),
    para([run("Prepared for:   ", { color: "B8C7DA", size: 21 }), run(CLIENT, { color: "FFFFFF", size: 21, bold: true })], { after: 80 }),
    para([run("Prepared by:    ", { color: "B8C7DA", size: 21 }), run(COMPANY, { color: "FFFFFF", size: 21, bold: true }), run("  ·  Kolkata  ·  September 2026", { color: "B8C7DA", size: 21 })], { after: 200 }),
  ], CW, { fill: NAVY, borders: noBorders, pad: 400 })] })], [CW]));
  out.push(para("", { after: 300 }));
  out.push(para([run("THE SEVEN MODULES", { bold: true, color: GOLD, size: 20 })], { after: 140 }));
  modules.forEach((m) => {
    out.push(table([new TableRow({ cantSplit: true, children: [
      cell(para([run(m.code, { bold: true, color: TEAL, size: 30 })], { after: 0 }), 900, { borders: noBorders, pad: 40 }),
      cell([para([run(m.name, { bold: true, color: NAVY, size: 22 }), run("  ·  " + m.subtitle, { color: MUTED, size: 18 })], { after: 20 }),
        para([run(m.tagline, { italics: true, color: MUTED, size: 18 })], { after: 0 })], CW - 900, { borders: noBorders, pad: 40 }),
    ] })], [900, CW - 900]));
    out.push(para("", { after: 60 }));
  });
  out.push(para([run("Each module is set out in the same way: the problem, what we will build, how, the benefits and cost. Prices exclude GST and are valid for 90 days from the date of this proposal.", { italics: true, color: MUTED, size: 17 })], { before: 120 }));
  return out;
}

// ---------- portfolio at a glance ----------
function portfolio() {
  const out = [pageBreak()];
  out.push(para([run("Portfolio at a glance", { bold: true, color: NAVY, size: 40 })], { after: 120 }));
  out.push(para(intro, { after: 160, align: AlignmentType.JUSTIFIED }));
  const W = [480, 1950, 2600, 1850, 1800, 1526];
  const rows = [headRow(["#", "Module", "What it solves", "Status today", "One-time", "Recurring / yr"], W)];
  modules.forEach((m) => rows.push(new TableRow({ cantSplit: true, children: [
    cell(para([run(m.code, { bold: true, color: TEAL, size: 17 })], { after: 0 }), W[0]),
    cell(para([run(m.name, { bold: true, color: NAVY, size: 17 })], { after: 0 }), W[1]),
    cell(para([run(m.solves, { size: 17 })], { after: 0, line: 240 }), W[2]),
    cell(para([run(m.statusShort, { size: 17 })], { after: 0, line: 240 }), W[3]),
    cell(para([run(rng(oneTime(m.cost)), { size: 17, bold: true })], { after: 0 }), W[4]),
    cell(para([run(rng(recur(m.cost)), { size: 17 })], { after: 0 }), W[5]),
  ] })));
  rows.push(new TableRow({ cantSplit: true, children: [
    cell(para("", { after: 0 }), W[0], { fill: TINT_TEAL }),
    cell(para([run("Whole portfolio", { bold: true, color: NAVY, size: 17 })], { after: 0 }), W[1] + W[2] + W[3], { fill: TINT_TEAL, span: 3 }),
    cell(para([run(rng(TOTAL_ONE), { bold: true, color: NAVY, size: 17 })], { after: 0 }), W[4], { fill: TINT_TEAL }),
    cell(para([run(rng(TOTAL_REC), { bold: true, color: NAVY, size: 17 })], { after: 0 }), W[5], { fill: TINT_TEAL }),
  ] }));
  out.push(table(rows, W));
  const pct = (l) => (l / 100 / ROADS_BUDGET_CR * 100).toFixed(3);
  out.push(para([run(`For scale: the whole portfolio costs about ${TOTAL_ONE[0] === TOTAL_ONE[1] ? pct(TOTAL_ONE[1]) : pct(TOTAL_ONE[0]) + "–" + pct(TOTAL_ONE[1])}% of RCD's ₹${ROADS_BUDGET_CR.toLocaleString("en-IN")} crore roads allocation for 2026–27.`, { italics: true, color: MUTED, size: 17 })], { before: 80, after: 120 }));
  out.push(para([run("→  ", { bold: true, color: TEAL, size: 21 }), run("HOW THE SEVEN FIT TOGETHER", { bold: true, color: NAVY, size: 21 })], { before: 120, after: 80, keepNext: true }));
  out.push(para([run("One DPR, one digital thread. ", { bold: true }), run(fitTogether)], { after: 160, align: AlignmentType.JUSTIFIED }));
  out.push(callout("RECOMMENDED STARTING POINTS", startingPoints.flatMap(([h, t]) => [
    para([run(h + ":", { bold: true, color: NAVY, size: 18 })], { after: 10 }),
    para([run(t, { size: 18 })], { after: 60 }),
  ])));
  return out;
}

// ---------- module pages ----------
function modulePages(m) {
  const out = [pageBreak()];
  out.push(table([new TableRow({ children: [cell([
    para([run(`MODULE ${m.code}`, { bold: true, color: "B8C7DA", size: 18 })], { after: 80 }),
    para([run(m.name, { bold: true, color: "FFFFFF", size: 40 }), run("   " + m.subtitle, { color: "DCE6F2", size: 21 })], { after: 60, line: 276 }),
    para([run(m.tagline, { italics: true, color: "9FB0C8", size: 19 })], { after: 0 }),
  ], CW, { fill: NAVY, borders: noBorders, pad: 200 })] })], [CW]));
  out.push(para("", { after: 80 }));
  const h = CW / 2;
  const label = (t) => para([run(t, { bold: true, color: TEAL, size: 16 })], { after: 40 });
  const c = m.cost;
  out.push(table([
    new TableRow({ children: [
      cell([label("OWNER & PARTNER DEPARTMENTS"), para([run(m.dept, { size: 17 })], { after: 0, line: 240 })], h),
      cell([label("STATUS TODAY"), para([run(m.status + " ", { size: 17, bold: true }), run(m.statusDetail, { size: 17 })], { after: 0, line: 240 })], h),
    ] }),
    new TableRow({ children: [
      cell([label("TIMELINE"), para([run(m.timeline, { size: 17 })], { after: 0 })], h),
      cell([label("COST"), para([run("One-time ", { size: 17 }), run(rng(oneTime(c)), { size: 17, bold: true }), run("  ·  Recurring " + rng(recur(c)) + " / yr", { size: 17 })], { after: 0 })], h),
    ] }),
  ], [h, h]));

  out.push(sectionHead("1", "The problem"));
  m.problem.forEach((t) => out.push(bullet(t)));
  out.push(sectionHead("2", "What we will build"));
  out.push(para(m.intro, { after: 70, keepNext: true, align: AlignmentType.JUSTIFIED }));
  m.items.forEach(([hh, t]) => out.push(bullet([run(hh + ": ", { bold: true }), run(t)])));
  out.push(para("", { after: 60 }));
  out.push(callout("WHY THIS IS DIFFERENT", [para([run(m.diff, { size: 18 })], { after: 0 })]));

  out.push(sectionHead("3", "How we will do it"));
  const PW = [1500, 1300, 5056, 2350];
  const pr = [headRow(["Phase", "Duration", "What we do", "Output"], PW)];
  m.phases.forEach((r) => pr.push(new TableRow({ cantSplit: true, children: r.map((t, j) => cell(para([run(t, { size: 17, bold: j === 0, color: j === 0 ? NAVY : INK })], { after: 0, line: 240 }), PW[j])) })));
  out.push(table(pr, PW));
  out.push(para([run(m.method[0] + ": ", { bold: true }), run(m.method[1])], { before: 80 }));

  out.push(sectionHead("4", "Benefits"));
  const bh = (t) => para([run(t, { bold: true, color: TEAL, size: 18 })], { after: 40 });
  out.push(table([new TableRow({ cantSplit: true, children: [
    cell([bh("For the Government"), ...m.benefitsGov.map((t) => bullet([run(t, { size: 18 })]))], h, { borders: noBorders, pad: 30 }),
    cell([bh("For contractors, consultants & citizens"), ...m.benefitsInd.map((t) => bullet([run(t, { size: 18 })]))], h, { borders: noBorders, pad: 30 }),
  ] })], [h, h]));

  out.push(sectionHead("5", "Cost"));
  const CWs = [7806, 2400];
  const crow = (lbl, v, o = {}) => new TableRow({ cantSplit: true, children: [
    cell(para([run(lbl, { size: 17, bold: o.bold })], { after: 0 }), CWs[0], { fill: o.fill }),
    cell(para([run(one(v[1]), { size: 17, bold: o.bold })], { after: 0, align: AlignmentType.RIGHT }), CWs[1], { fill: o.fill }),
  ] });
  out.push(table([
    headRow(["Component", "Amount"], CWs, 1),
    crow("Development: pilot (Phases 0–1)", c.pilot),
    crow("Development: full rollout (Phase 2), incl. security audit", c.rollout),
    crow("One-time total", oneTime(c), { bold: true, fill: TINT_TEAL }),
    crow("Infrastructure per year (hosting, storage, gateways, data)", c.infra),
    crow("Operations & maintenance per year (support, updates, helpdesk)", c.om),
    crow("Recurring total per year", recur(c), { bold: true, fill: TINT_TEAL }),
  ], CWs));
  out.push(para([run((m.costNote ? m.costNote + " " : "") + "Figures exclude GST.", { italics: true, color: MUTED, size: 17 })], { before: 60 }));

  out.push(sectionHead("6", "Key risks"));
  const RW = [3000, CW - 3000];
  out.push(table(m.risks.map(([r, mm]) => new TableRow({ cantSplit: true, children: [
    cell(para([run(r, { size: 17, bold: true })], { after: 0 }), RW[0]),
    cell(para([run(mm, { size: 17 })], { after: 0 }), RW[1]),
  ] })), RW));
  return out;
}

// ---------- closing ----------
function closing() {
  const out = [pageBreak()];
  out.push(para([run("How we will work with the Department", { bold: true, color: NAVY, size: 40 })], { after: 160 }));
  const W = [2800, CW - 2800];
  out.push(table(workWith.map(([hh, t]) => new TableRow({ cantSplit: true, children: [
    cell(para([run(hh, { bold: true, size: 18 })], { after: 0 }), W[0], { pad: 90 }),
    cell(para([run(t, { size: 18 })], { after: 0 }), W[1], { pad: 90 }),
  ] })), W));
  out.push(sectionHead("i", "Cost assumptions"));
  assumptions.forEach((t) => out.push(bullet(t)));
  out.push(sectionHead("ii", "Sources (public information, accessed September 2026)"));
  sources.forEach(([t, u]) => out.push(new Paragraph({ children: [run(t + " — ", { size: 15 }), run(u, { size: 15 })], numbering: { reference: "num", level: 0 }, spacing: { after: 30, line: 230 } })));
  out.push(para([run("Status descriptions are based on public reports up to September 2026 and should be confirmed with the Department before formal submission.", { italics: true, size: 18 })], { before: 160 }));
  return out;
}

const doc = new Document({
  creator: COMPANY,
  title: `Sadak Setu Digital Stack: proposal to the ${CLIENT_SHORT}`,
  styles: { default: { document: { run: { font: FONT, size: BODY, color: INK } } } },
  numbering: { config: [
    { reference: "bul", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 220 } } } }] },
    { reference: "num", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 300 } }, run: { size: 15 } } }] },
  ] },
  sections: [{
    properties: { page: { size: { width: PAGE_W, height: 16838 }, margin: { top: 900, bottom: 900, left: MARGIN, right: MARGIN, footer: 400 } } },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [
      run(`${COMPANY}  ·  Proposal to the ${CLIENT_SHORT}  ·  Page `, { size: 15, color: MUTED }),
      new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 15, color: MUTED }),
    ] })] }) },
    children: [...cover(), ...portfolio(), ...modules.flatMap(modulePages), ...closing()],
  }],
});

console.log("one-time", TOTAL_ONE, "recurring", TOTAL_REC);
const outName = process.argv[2] || "Sadak_Setu_Jharkhand_RCD.docx";
Packer.toBuffer(doc).then((b) => { fs.writeFileSync(outName, b); console.log("wrote", outName); });
