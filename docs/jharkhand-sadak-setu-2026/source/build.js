const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType,
  ShadingType, BorderStyle, AlignmentType, LevelFormat, PageBreak, Footer,
  PageNumber, VerticalAlign, TableLayoutType, HeightRule,
} = require("docx");
const C = require("./content");
const { COMPANY, CLIENT, CLIENT_SHORT, RATE, effort, passThrough, team, recurring, modules, sources } = C;

// ---------- design tokens ----------
const FONT = "Arial";
const NAVY = "1B2A44";
const TEAL = "0E7C7B";
const GOLD = "B7791F";
const INK = "1F2937";
const MUTED = "5B6472";
const LINE = "CBD5E1";
const TINT_NAVY = "EAF0F7";
const TINT_GOLD = "FDF5E6";
const TINT_TEAL = "E6F4F3";
const ZEBRA = "F7F9FC";
const PAGE_W = 11906; // A4
const MARGIN = 794;
const CW = PAGE_W - 2 * MARGIN;
const BODY = 19; // 9.5pt

// ---------- money helpers (values in ₹ lakh) ----------
const sum = (rows, i) => rows.reduce((a, r) => a + r[i], 0);
const add = (...ranges) => ranges.reduce((a, r) => [a[0] + r[0], a[1] + r[1]], [0, 0]);
function one(l) {
  if (l >= 100) { const c = Math.round(l) / 100; return `₹${c.toFixed(2).replace(/0$/, "")} cr`; }
  return `₹${Math.round(l)} lakh`;
}
function rng([a, b]) {
  if (a >= 100 && b >= 100) return `₹${(a / 100).toFixed(2).replace(/0$/, "")}–${(b / 100).toFixed(2).replace(/0$/, "")} cr`;
  if (a < 100 && b < 100) return `₹${Math.round(a)}–${Math.round(b)} lakh`;
  return `₹${Math.round(a)} lakh – ${one(b)}`;
}
const modTotal = (m) => add(m.cost.build, m.cost.digitisation || [0, 0]);
const platformWide = passThrough.filter((p) => !p[0].startsWith("Digitisation")).reduce((a, p) => add(a, p[1]), [0, 0]);
const ONE_TIME = add(...modules.map(modTotal), platformWide);
const RECUR = recurring.reduce((a, r) => add(a, r[1]), [0, 0]);
const byCodes = (codes) => modules.filter((m) => codes.includes(m.code));
const half = [platformWide[0] / 2, platformWide[1] / 2];
const PHASE1 = add(...byCodes(["01", "05", "06"]).map(modTotal), half);
const PHASE2 = add(...byCodes(["02", "03", "04", "07"]).map(modTotal), half);
const ESSENTIAL = add(...byCodes(["01", "03", "05", "06"]).map(modTotal), platformWide);
const PM_TOTAL = sum(effort, 1);

// ---------- docx helpers ----------
const run = (text, o = {}) => new TextRun({ text, font: FONT, size: o.size || BODY, bold: o.bold, italics: o.italics, color: o.color || INK });
const para = (children, o = {}) => new Paragraph({
  children: Array.isArray(children) ? children : [run(children, o)],
  spacing: { before: o.before || 0, after: o.after === undefined ? 60 : o.after, line: o.line || 252 },
  alignment: o.align, keepNext: o.keepNext, keepLines: o.keepLines,
});
const bullet = (children, o = {}) => new Paragraph({
  children: Array.isArray(children) ? children : [run(children)],
  numbering: { reference: "bul", level: 0 },
  spacing: { after: o.after === undefined ? 40 : o.after, line: 246 }, keepLines: true, keepNext: o.keepNext,
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
    margins: { top: o.pad ?? 60, bottom: o.pad ?? 60, left: 110, right: 110 },
    verticalAlign: o.valign || VerticalAlign.TOP, columnSpan: o.span,
  });
}
const table = (rows, widths) => new Table({ rows, columnWidths: widths, width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA }, layout: TableLayoutType.FIXED });
const pageBreak = () => new Paragraph({ children: [new PageBreak()] });
function sectionHead(num, text) {
  return new Paragraph({
    children: [run(num + "  ", { bold: true, color: TEAL, size: 22 }), run(text.toUpperCase(), { bold: true, color: NAVY, size: 20 })],
    spacing: { before: 130, after: 60 }, keepNext: true,
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: NAVY, space: 2 } },
  });
}
const headRow = (labels, widths, alignRightFrom = 99) => new TableRow({ tableHeader: true, cantSplit: true, children: labels.map((h, i) => cell(para([run(h, { bold: true, color: "FFFFFF", size: 16 })], { after: 0, align: i >= alignRightFrom ? AlignmentType.RIGHT : undefined }), widths[i], { fill: NAVY, pad: 45 })) });
const callout = (label, text, color = GOLD, fill = TINT_GOLD) => table([new TableRow({ cantSplit: true, children: [cell([
  para([run(label, { bold: true, color, size: 17 })], { after: 30 }),
  ...(Array.isArray(text) ? text : [para(text, { after: 0 })]),
], CW, { fill, borders: { ...noBorders, left: { style: BorderStyle.SINGLE, size: 24, color } }, pad: 90 })] })], [CW]);

// ---------- cover ----------
function cover() {
  const out = [];
  out.push(table([new TableRow({ height: { value: 4700, rule: HeightRule.ATLEAST }, children: [cell([
    para([run("PROPOSAL FOR DISCUSSION", { bold: true, color: "E9B949", size: 20 })], { after: 360, before: 300 }),
    para([run("Sadak Setu Digital Stack", { bold: true, color: "FFFFFF", size: 56 })], { after: 120, line: 300 }),
    para([run("Faster DPRs, sound cost checks and time-bound approvals for Jharkhand's roads", { color: "DCE6F2", size: 28 })], { after: 320, line: 320 }),
    para([run("Prepared for: ", { color: "B8C7DA", size: 21 }), run(CLIENT, { color: "FFFFFF", size: 21, bold: true })], { after: 80 }),
    para([run("Prepared by: ", { color: "B8C7DA", size: 21 }), run(COMPANY, { color: "FFFFFF", size: 21, bold: true }), run("  ·  Kolkata  ·  September 2026", { color: "B8C7DA", size: 21 })], { after: 200 }),
  ], CW, { fill: NAVY, borders: noBorders, pad: 360 })] })], [CW]));
  out.push(para("", { after: 160 }));
  // headline price strip
  const w3 = [CW / 3, CW / 3, CW / 3];
  const stat = (big, small, fill) => cell([para([run(big, { bold: true, color: NAVY, size: 30 })], { after: 20, align: AlignmentType.CENTER }), para([run(small, { color: MUTED, size: 16 })], { after: 0, align: AlignmentType.CENTER })], CW / 3, { fill, borders: noBorders, pad: 110, valign: VerticalAlign.CENTER });
  out.push(table([new TableRow({ children: [
    stat(rng(ONE_TIME), "complete platform, one-time (all 7 modules)", TINT_TEAL),
    stat(rng(RECUR) + " / yr", "hosting, AI usage and maintenance", ZEBRA),
    stat("10 months", "to full rollout, in two phases", TINT_TEAL),
  ] })], w3));
  out.push(para("", { after: 160 }));
  out.push(para([run("THE SEVEN MODULES", { bold: true, color: GOLD, size: 19 })], { after: 80 }));
  out.push(table(modules.map((m) => new TableRow({ cantSplit: true, children: [
    cell(para([run(m.code, { bold: true, color: TEAL, size: 26 })], { after: 0 }), 800, { borders: { ...noBorders, bottom: thin }, valign: VerticalAlign.CENTER, pad: 50 }),
    cell([para([run(m.name, { bold: true, color: NAVY, size: 21 }), run("  ·  " + m.subtitle, { color: MUTED, size: 17 })], { after: 10 }),
      para([run(m.tagline, { italics: true, size: 17 })], { after: 0 })], CW - 800 - 1500, { borders: { ...noBorders, bottom: thin }, pad: 50 }),
    cell(para([run(rng(modTotal(m)), { bold: true, color: NAVY, size: 18 })], { after: 0, align: AlignmentType.RIGHT }), 1500, { borders: { ...noBorders, bottom: thin }, valign: VerticalAlign.CENTER, pad: 50 }),
  ] })), [800, CW - 2300, 1500]));
  out.push(para([run("Module prices include each module's share of the shared platform. All figures exclude GST and are indicative until scoped jointly with the Department.", { italics: true, color: MUTED, size: 16 })], { before: 80 }));
  return out;
}

// ---------- at a glance ----------
function glance() {
  const out = [pageBreak()];
  out.push(para([run("At a glance", { bold: true, color: NAVY, size: 34 })], { after: 80 }));
  out.push(para("Jharkhand's Road Construction Department looks after a 12,736 km network, including about 9,450 km of State Highways, Major District Roads and other state roads, and has ₹6,601 crore for roads in 2026–27. Every project starts with a Detailed Project Report (DPR). Today a DPR is drafted in varying formats, priced against rates spread across the last published Schedule of Rates and later circulars, checked by hand at several levels, and moved as a paper file. Sadak Setu is one platform with seven modules that make each step faster, consistent and auditable, without replacing the engineer's judgement.", { after: 120 }));
  const W = [450, 2150, 3350, 1900, 1150, 1306];
  const rows = [headRow(["#", "Module", "What it solves", "Status today", "Phase", "One-time"], W, 5)];
  const solves = {
    "01": "No benchmark; rates applied by hand from scattered sources",
    "02": "DPRs rewritten from scratch in varying formats",
    "03": "Checkable errors caught late, at CDO",
    "04": "No independent check of estimate reasonableness",
    "05": "Paper file movement; no stage deadlines",
    "06": "25 years of DPRs unsearchable in record rooms",
    "07": "DPR pipeline not visible on RCD's GIS",
  };
  modules.forEach((m, i) => {
    const fill = i % 2 ? "FFFFFF" : ZEBRA;
    rows.push(new TableRow({ cantSplit: true, children: [
      cell(para([run(m.code, { bold: true, color: TEAL, size: 17 })], { after: 0 }), W[0], { fill, pad: 45 }),
      cell(para([run(m.name, { bold: true, color: NAVY, size: 17 })], { after: 0 }), W[1], { fill, pad: 45 }),
      cell(para([run(solves[m.code], { size: 16 })], { after: 0, line: 230 }), W[2], { fill, pad: 45 }),
      cell(para([run(m.status, { size: 16 })], { after: 0, line: 230 }), W[3], { fill, pad: 45 }),
      cell(para([run(m.phase.split(" (")[0], { size: 16 })], { after: 0 }), W[4], { fill, pad: 45 }),
      cell(para([run(rng(modTotal(m)), { size: 16, bold: true })], { after: 0, align: AlignmentType.RIGHT }), W[5], { fill, pad: 45 }),
    ] }));
  });
  const totalRow = (label, val, o = {}) => new TableRow({ cantSplit: true, children: [
    cell(para([run(label, { bold: o.bold, size: 17, color: o.bold ? NAVY : INK })], { after: 0 }), W[0] + W[1] + W[2] + W[3] + W[4], { fill: o.fill, span: 5, pad: 45 }),
    cell(para([run(val, { bold: o.bold, size: 17, color: o.bold ? NAVY : INK })], { after: 0, align: AlignmentType.RIGHT }), W[5], { fill: o.fill, pad: 45 }),
  ] });
  rows.push(totalRow("Platform-wide items: security audit, AI usage during build, on-site presence in Ranchi and workshops", rng(platformWide)));
  rows.push(totalRow("Complete platform, one-time", rng(ONE_TIME), { bold: true, fill: TINT_NAVY }));
  rows.push(totalRow("Recurring per year: hosting, AI usage, maintenance for all seven modules", rng(RECUR), { bold: true, fill: TINT_TEAL }));
  out.push(table(rows, W));
  out.push(para([run(`For scale: the complete platform costs about ${(ONE_TIME[0] / 100 / 6601 * 100).toFixed(3)}–${(ONE_TIME[1] / 100 / 6601 * 100).toFixed(3)}% of RCD's 2026–27 roads allocation. Improving estimate accuracy on a single ₹60 crore project by 2% would recover its full cost.`, { italics: true, color: MUTED, size: 16 })], { before: 60, after: 80 }));

  out.push(sectionHead("→", "How the seven fit together"));
  out.push(para([run("One DPR, one digital thread. ", { bold: true }), run("The Knowledge Base (06) turns past DPRs into data. Smart Cost Estimation (01) benchmarks each new proposal. Auto-DPR Drafting (02) produces a standard draft. The Compliance Checker (03) and Cost Assurance (04) attach evidence before the file moves. Digital Approval Tracking (05) moves it to sanction on a clock. The GIS Link-up (07) shows it all on RCD's existing map. All seven share one login, one workflow engine, one document store and one dashboard, which is why the whole platform costs about as much as a single stand-alone system.")]));
  out.push(para("", { after: 40 }));
  out.push(callout("RECOMMENDED START", [
    bullet([run("Proof of concept, 6–8 weeks, one division: ", { bold: true }), run("Knowledge Base + cost benchmark preview on RCD's own past DPRs. ₹6–8 lakh, adjusted in full against Phase 1 if the Department proceeds.")]),
    bullet([run(`Phase 1, months 1–4 (${rng(PHASE1)}): `, { bold: true }), run("Modules 06, 01 and 05: the data foundation, benchmarking and time-bound approvals.")]),
    bullet([run(`Phase 2, months 5–10 (${rng(PHASE2)}): `, { bold: true }), run("Modules 02, 03, 04 and 07: drafting, automated checks, cost assurance and the map link-up.")], { after: 0 }),
  ]));
  return out;
}

// ---------- pricing basis ----------
function pricing() {
  const out = [pageBreak()];
  out.push(para([run("How the price is built", { bold: true, color: NAVY, size: 34 })], { after: 80 }));
  out.push(para(`The price is built bottom-up from the work involved: about ${PM_TOTAL} person-months from one team of eight over ten months, at a blended ₹${RATE[0]}–${RATE[1]} lakh per person-month, plus a small set of pass-through costs. There is one platform, one team, one hosting environment, one security audit and one maintenance contract, not seven separate systems.`, { after: 100 }));

  out.push(sectionHead("A", "Effort by workstream"));
  const EW = [6906, 1200, 1100, 1100];
  const er = [headRow(["Workstream", "Person-months", "Low", "High"], EW, 1)];
  effort.forEach(([w, pm], i) => er.push(new TableRow({ cantSplit: true, children: [
    cell(para([run(w, { size: 16 })], { after: 0, line: 230 }), EW[0], { fill: i % 2 ? "FFFFFF" : ZEBRA, pad: 40 }),
    cell(para([run(String(pm), { size: 16 })], { after: 0, align: AlignmentType.RIGHT }), EW[1], { fill: i % 2 ? "FFFFFF" : ZEBRA, pad: 40 }),
    cell(para([run(one(pm * RATE[0]), { size: 16 })], { after: 0, align: AlignmentType.RIGHT }), EW[2], { fill: i % 2 ? "FFFFFF" : ZEBRA, pad: 40 }),
    cell(para([run(one(pm * RATE[1]), { size: 16 })], { after: 0, align: AlignmentType.RIGHT }), EW[3], { fill: i % 2 ? "FFFFFF" : ZEBRA, pad: 40 }),
  ] })));
  const labour = [PM_TOTAL * RATE[0], PM_TOTAL * RATE[1]];
  const trow = (label, pm, lohi, o = {}) => new TableRow({ cantSplit: true, children: [
    cell(para([run(label, { size: 16, bold: o.bold, color: o.bold ? NAVY : INK })], { after: 0, line: 230 }), EW[0], { fill: o.fill, pad: 40 }),
    cell(para([run(pm, { size: 16, bold: o.bold })], { after: 0, align: AlignmentType.RIGHT }), EW[1], { fill: o.fill, pad: 40 }),
    cell(para([run(one(lohi[0]), { size: 16, bold: o.bold })], { after: 0, align: AlignmentType.RIGHT }), EW[2], { fill: o.fill, pad: 40 }),
    cell(para([run(one(lohi[1]), { size: 16, bold: o.bold })], { after: 0, align: AlignmentType.RIGHT }), EW[3], { fill: o.fill, pad: 40 }),
  ] });
  er.push(trow("Team effort", String(PM_TOTAL), labour, { bold: true, fill: TINT_NAVY }));
  passThrough.forEach(([w, v]) => er.push(trow(w, "–", v)));
  er.push(trow("Complete platform, one-time (module prices are rounded shares of this)", "", ONE_TIME, { bold: true, fill: TINT_NAVY }));
  out.push(table(er, EW));

  out.push(sectionHead("B", "The delivery team"));
  const TW = [6306, 1300, 1300, 1400];
  const tr = [headRow(["Role", "People", "Months", "Person-months"], TW, 1)];
  team.forEach(([r, n, mth, pm], i) => tr.push(new TableRow({ cantSplit: true, children: [
    cell(para([run(r, { size: 16 })], { after: 0 }), TW[0], { fill: i % 2 ? "FFFFFF" : ZEBRA, pad: 40 }),
    cell(para([run(n, { size: 16 })], { after: 0, align: AlignmentType.RIGHT }), TW[1], { fill: i % 2 ? "FFFFFF" : ZEBRA, pad: 40 }),
    cell(para([run(mth, { size: 16 })], { after: 0, align: AlignmentType.RIGHT }), TW[2], { fill: i % 2 ? "FFFFFF" : ZEBRA, pad: 40 }),
    cell(para([run(String(pm), { size: 16 })], { after: 0, align: AlignmentType.RIGHT }), TW[3], { fill: i % 2 ? "FFFFFF" : ZEBRA, pad: 40 }),
  ] })));
  tr.push(new TableRow({ cantSplit: true, children: [
    cell(para([run("Total", { size: 16, bold: true, color: NAVY })], { after: 0 }), TW[0] + TW[1] + TW[2], { fill: TINT_NAVY, span: 3, pad: 40 }),
    cell(para([run(String(team.reduce((a, t) => a + t[3], 0)), { size: 16, bold: true, color: NAVY })], { after: 0, align: AlignmentType.RIGHT }), TW[3], { fill: TINT_NAVY, pad: 40 }),
  ] }));
  out.push(table(tr, TW));

  out.push(sectionHead("C", "Why one platform costs so much less than seven systems"));
  [
    ["Built once, used seven times: ", "login, roles, audit trail, workflow, documents, dashboards and Hindi/English support are shared by every module."],
    ["One team, not seven: ", "the same eight people carry the design from Module 06 through to Module 02, with no hand-offs."],
    ["Reuse what Jharkhand already has: ", "RCD's GIS portal, the State Data Centre run by JAP-IT and the state's e-Office are integrated, not rebuilt."],
    ["Open-source stack, no licence fees: ", "AI is pay-per-use or runs on open models hosted in India, so there are no per-seat charges."],
    ["One audit, one hosting environment, one maintenance contract: ", "running costs are 15–18% of the build a year, in line with common government practice."],
  ].forEach(([h, t]) => out.push(bullet([run(h, { bold: true }), run(t)])));

  out.push(sectionHead("D", "Phases, payments and running costs"));
  const PW = [3700, 3606, 1500, 1500];
  const prw = [headRow(["Stage", "Scope", "Duration", "Price"], PW, 3)];
  [
    ["Proof of concept", "One division; Knowledge Base and benchmark preview on RCD data", "6–8 weeks", "₹6–8 lakh*"],
    ["Phase 1", "Modules 06, 01, 05 live in all circles", "Months 1–4", rng(PHASE1)],
    ["Phase 2", "Modules 02, 03, 04, 07; three months of hypercare", "Months 5–10", rng(PHASE2)],
    ["Annual maintenance & hosting", recurring.map((r) => r[0].split(":")[0]).join("; "), "Per year", rng(RECUR)],
  ].forEach((r, i) => prw.push(new TableRow({ cantSplit: true, children: r.map((t, j) => cell(para([run(t, { size: 16, bold: j === 0 || j === 3, color: j === 0 ? NAVY : INK })], { after: 0, line: 230, align: j === 3 ? AlignmentType.RIGHT : undefined }), PW[j], { fill: i % 2 ? "FFFFFF" : ZEBRA, pad: 40 })) })));
  out.push(table(prw, PW));
  out.push(para([run("* Adjusted in full against Phase 1. Payments are linked to milestones: requirements sign-off 20%, user acceptance 30%, go-live 40%, and 10% after 90 days of stable operation.", { italics: true, color: MUTED, size: 16 })], { before: 50, after: 60 }));

  out.push(callout("IF THE BUDGET IS TIGHTER", [para([run(`Essential package: Modules 06, 01, 03 and 05 (benchmarking, automated checks and time-bound approvals on a searchable archive) for ${rng(ESSENTIAL)} one-time. Drafting, cost assurance and the GIS link-up can follow when funds allow, with no rework.`)], { after: 0 })], TEAL, TINT_TEAL));
  out.push(para("", { after: 40 }));
  out.push(table([new TableRow({ cantSplit: true, children: [
    cell([para([run("Included", { bold: true, color: TEAL, size: 17 })], { after: 30 }),
      ...["Source code and data owned by the state; source code in escrow", "Training for all roles (up to 10 workshops) and user manuals in Hindi and English", "Three months of hypercare after go-live", "Independent security audit before go-live", "Digitisation of up to ~800 past DPRs"].map((t) => bullet([run(t, { size: 17 })]))], CW / 2, { borders: { ...noBorders, top: thin } }),
    cell([para([run("Not included", { bold: true, color: GOLD, size: 17 })], { after: 30 }),
      ...["GST", "Server hardware at the State Data Centre, if the state hosts it", "Field surveys, traffic counts or drone data collection", "Scanning beyond ~800 DPRs (₹1.5–3 per page)", "Changes in scope after requirements sign-off"].map((t) => bullet([run(t, { size: 17 })]))], CW / 2, { borders: { ...noBorders, top: thin } }),
  ] })], [CW / 2, CW / 2]));
  return out;
}

// ---------- module pages ----------
function modulePages(m) {
  const out = [pageBreak()];
  out.push(table([new TableRow({ children: [cell([
    para([run(`MODULE ${m.code}`, { bold: true, color: "E9B949", size: 17 })], { after: 70 }),
    para([run(m.name, { bold: true, color: "FFFFFF", size: 36 }), run("   " + m.subtitle, { color: "DCE6F2", size: 21 })], { after: 50, line: 276 }),
    para([run(m.tagline, { italics: true, color: "DCE6F2", size: 18 })], { after: 0 }),
  ], CW, { fill: NAVY, borders: noBorders, pad: 140 })] })], [CW]));
  out.push(para("", { after: 50 }));
  const h = CW / 2;
  const label = (t) => para([run(t.toUpperCase(), { bold: true, color: TEAL, size: 15 })], { after: 20 });
  out.push(table([
    new TableRow({ children: [
      cell([label("Owner & partners"), para([run(m.dept, { size: 16 })], { after: 0, line: 230 })], h, { fill: TINT_TEAL }),
      cell([label("Status today"), para([run(m.status + ". ", { size: 16, bold: true }), run(m.statusDetail, { size: 16 })], { after: 0, line: 230 })], h, { fill: TINT_TEAL }),
    ] }),
    new TableRow({ children: [
      cell([label("When"), para([run(m.phase, { size: 16 })], { after: 0 })], h, { fill: TINT_TEAL }),
      cell([label("One-time price"), para([run(rng(modTotal(m)), { size: 16, bold: true }), run("  ·  running costs shared across the platform", { size: 16 })], { after: 0 })], h, { fill: TINT_TEAL }),
    ] }),
  ], [h, h]));

  out.push(sectionHead("1", "The problem"));
  m.problem.forEach((t) => out.push(bullet(t)));
  out.push(sectionHead("2", "What we will build"));
  out.push(para(m.intro, { after: 50, keepNext: true }));
  m.modules.forEach(([hh, t]) => out.push(bullet([run(hh + ": ", { bold: true, color: NAVY }), run(t)])));
  out.push(callout("WHY THIS IS DIFFERENT", m.diff));

  out.push(sectionHead("3", "How we will do it"));
  const PW = [1500, 1200, 5306, 2300];
  const pr = [headRow(["Step", "Duration", "What we do", "Output"], PW)];
  m.phases.forEach((r, i) => pr.push(new TableRow({ cantSplit: true, children: r.map((t, j) => cell(para([run(t, { size: 16, bold: j === 0, color: j === 0 ? NAVY : INK })], { after: 0, line: 230 }), PW[j], { fill: i % 2 ? "FFFFFF" : ZEBRA, pad: 40 })) })));
  out.push(table(pr, PW));

  out.push(sectionHead("4", "Benefits"));
  const bh = (t) => para([run(t, { bold: true, color: TEAL, size: 17 })], { after: 30 });
  out.push(table([new TableRow({ cantSplit: true, children: [
    cell([bh("For the Department"), ...m.benefitsGov.map((t) => bullet(t))], h, { borders: noBorders, pad: 30 }),
    cell([bh("For consultants, contractors & citizens"), ...m.benefitsInd.map((t) => bullet(t))], h, { borders: noBorders, pad: 30 }),
  ] })], [h, h]));

  out.push(sectionHead("5", "Price and key risks"));
  const note = m.cost.digitisation
    ? `  (build incl. its share of the shared platform ${rng(m.cost.build)}; digitisation of up to ~800 past DPRs ${rng(m.cost.digitisation)}).`
    : "  (includes its share of the shared platform).";
  out.push(para([run("One-time price: ", { bold: true, color: NAVY }), run(rng(modTotal(m)), { bold: true, color: NAVY }), run(note + " Hosting, AI usage and maintenance are priced once for the whole platform.", { size: 17, color: MUTED })], { after: 60 }));
  const RW = [3300, CW - 3300];
  out.push(table(m.risks.map(([r, mm], i) => new TableRow({ cantSplit: true, children: [
    cell(para([run(r, { size: 16, bold: true, color: NAVY })], { after: 0 }), RW[0], { fill: i % 2 ? "FFFFFF" : ZEBRA, borders: { ...noBorders, bottom: thin }, pad: 40 }),
    cell(para([run(mm, { size: 16 })], { after: 0 }), RW[1], { fill: i % 2 ? "FFFFFF" : ZEBRA, borders: { ...noBorders, bottom: thin }, pad: 40 }),
  ] })), RW));
  return out;
}

// ---------- closing ----------
function closing() {
  const out = [pageBreak()];
  out.push(para([run("How we will work with the Department", { bold: true, color: NAVY, size: 34 })], { after: 100 }));
  const items = [
    ["Start small, prove value", "A 6–8 week proof of concept on RCD's own data in one division, adjusted against Phase 1. Scale only after results are visible."],
    ["Transparent procurement", "Through GeM, JAP-IT or an empanelled system integrator; open tender for the full rollout where rules require it."],
    ["Data stays with the state", "Hosting in the Jharkhand State Data Centre (JAP-IT) or a MeitY-empanelled Indian cloud; compliant with the DPDP Act 2023."],
    ["Security first", "A CERT-In-empanelled audit before go-live; role-based access; tamper-evident audit logs."],
    ["No vendor lock-in", "Open-source technology, source code in escrow, full documentation and training for RCD engineers."],
    ["Hindi and English", "All screens, reports and training material in Hindi and English."],
    ["Pay for outcomes", "Milestone payments tied to measurable results: DPRs processed, approval days, benchmark accuracy."],
    ["Built for Jharkhand", "On-site presence in Ranchi during rollout; internships for students from Jharkhand engineering colleges."],
  ];
  const W = [2700, CW - 2700];
  out.push(table(items.map(([hh, t], i) => new TableRow({ cantSplit: true, children: [
    cell(para([run(hh, { bold: true, color: NAVY })], { after: 0 }), W[0], { fill: i % 2 ? "FFFFFF" : ZEBRA, borders: { ...noBorders, bottom: thin } }),
    cell(para(t, { after: 0 }), W[1], { fill: i % 2 ? "FFFFFF" : ZEBRA, borders: { ...noBorders, bottom: thin } }),
  ] })), W));
  out.push(para("", { after: 60 }));
  out.push(callout("ONE PLATFORM, MORE DEPARTMENTS", "The same platform can later serve the Rural Works Department (₹5,082 crore in 2026–27) and the Building Construction Department with configuration rather than a new build, so each extension costs a fraction of the first."));
  out.push(sectionHead("i", "Sources (public information, accessed September 2026)"));
  sources.forEach(([t, u]) => out.push(new Paragraph({ children: [run(t + " — ", { size: 15 }), run(u, { size: 14, color: TEAL })], numbering: { reference: "num", level: 0 }, spacing: { after: 20, line: 220 } })));
  out.push(para([run("Status descriptions are based on public information up to September 2026 and should be confirmed with the Department before formal submission.", { italics: true, color: MUTED, size: 16 })], { before: 80 }));
  return out;
}

const doc = new Document({
  creator: COMPANY,
  title: `Sadak Setu Digital Stack: proposal to the ${CLIENT_SHORT}`,
  styles: { default: { document: { run: { font: FONT, size: BODY, color: INK } } } },
  numbering: { config: [
    { reference: "bul", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 300, hanging: 200 } }, run: { color: TEAL } } }] },
    { reference: "num", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 300 } }, run: { size: 15 } } }] },
  ] },
  sections: [{
    properties: { page: { size: { width: PAGE_W, height: 16838 }, margin: { top: 700, bottom: 700, left: MARGIN, right: MARGIN, footer: 360 } } },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [
      run(`${COMPANY}  ·  Proposal to the ${CLIENT_SHORT}  ·  Page `, { size: 14, color: MUTED }),
      new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 14, color: MUTED }),
    ] })] }) },
    children: [...cover(), ...glance(), ...pricing(), ...modules.flatMap(modulePages), ...closing()],
  }],
});

console.log("one-time", ONE_TIME, "recurring", RECUR, "phase1", PHASE1, "phase2", PHASE2, "essential", ESSENTIAL, "PM", PM_TOTAL);
const outName = process.argv[2] || "Sadak_Setu_Jharkhand_RCD.docx";
Packer.toBuffer(doc).then((b) => { fs.writeFileSync(outName, b); console.log("wrote", outName); });
