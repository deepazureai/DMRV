const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType,
  ShadingType, BorderStyle, AlignmentType, LevelFormat, PageBreak, Footer,
  PageNumber, VerticalAlign, TableLayoutType, HeightRule,
} = require("docx");
const { COMPANY, projects, sources } = require("./content");

// ---------- design tokens ----------
const FONT = "Arial";
const NAVY = "1F3A5F";
const TEAL = "0F766E";
const AMBER = "B45309";
const INK = "1F2937";
const MUTED = "5B6472";
const LINE = "CBD5E1";
const TINT_NAVY = "EAF0F7";
const TINT_AMBER = "FDF3E4";
const TINT_TEAL = "E6F4F1";
const PAGE_W = 11906; // A4
const MARGIN = 794; // ~0.55in
const CW = PAGE_W - 2 * MARGIN; // content width
const BODY = 19; // half-points (9.5pt)

// ---------- helpers ----------
const run = (text, o = {}) => new TextRun({ text, font: FONT, size: o.size || BODY, bold: o.bold, italics: o.italics, color: o.color || INK });
const para = (children, o = {}) => new Paragraph({
  children: Array.isArray(children) ? children : [run(children, o)],
  spacing: { before: o.before || 0, after: o.after === undefined ? 60 : o.after, line: o.line || 252 },
  alignment: o.align, keepNext: o.keepNext, keepLines: o.keepLines,
});
const bullet = (children, o = {}) => new Paragraph({
  children: Array.isArray(children) ? children : [run(children)],
  numbering: { reference: "bul", level: 0 },
  spacing: { after: o.after === undefined ? 40 : o.after, line: 246 },
  keepLines: true,
});
const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };
const thin = { style: BorderStyle.SINGLE, size: 4, color: LINE };
const thinBorders = { top: thin, bottom: thin, left: thin, right: thin };

function cell(children, width, o = {}) {
  return new TableCell({
    children: Array.isArray(children) ? children : [children],
    width: { size: width, type: WidthType.DXA },
    shading: o.fill ? { type: ShadingType.CLEAR, color: "auto", fill: o.fill } : undefined,
    borders: o.borders || thinBorders,
    margins: { top: o.pad ?? 70, bottom: o.pad ?? 70, left: 110, right: 110 },
    verticalAlign: o.valign || VerticalAlign.TOP,
    columnSpan: o.span,
  });
}
function table(rows, widths, o = {}) {
  return new Table({
    rows, columnWidths: widths, width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA },
    layout: TableLayoutType.FIXED, borders: o.borders,
  });
}

function sectionHead(num, text) {
  return new Paragraph({
    children: [run(num + "  ", { bold: true, color: AMBER, size: 23 }), run(text.toUpperCase(), { bold: true, color: NAVY, size: 21 })],
    spacing: { before: 150, after: 70 },
    keepNext: true,
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: NAVY, space: 2 } },
  });
}

// ₹ lakh range -> readable string
function amt(l) {
  if (l >= 100) { const c = l / 100; return (Number.isInteger(c) ? c.toFixed(1) : (Math.round(c * 100) / 100).toString()) ; }
  return String(l);
}
function fmtRange([a, b]) {
  if (a >= 100 && b >= 100) return `₹${amt(a)}–${amt(b)} cr`;
  if (a < 100 && b < 100) return `₹${a}–${b} lakh`;
  return `₹${a} lakh–${amt(b)} cr`;
}
function oneTime(c) { return [c.pilot[0] + c.rollout[0] + (c.field ? c.field[0] : 0), c.pilot[1] + c.rollout[1] + (c.field ? c.field[1] : 0)]; }
function recurring(c) { return [c.infra[0] + c.om[0], c.infra[1] + c.om[1]]; }

// ---------- cover ----------
function cover() {
  const out = [];
  out.push(table([new TableRow({
    height: { value: 5200, rule: HeightRule.ATLEAST },
    children: [cell([
      para([run("PROPOSAL FOR DISCUSSION", { bold: true, color: "F6C27A", size: 20 })], { after: 300, before: 400 }),
      para([run("Shilpa Shakti Digital Stack", { bold: true, color: "FFFFFF", size: 56 })], { after: 120, line: 300 }),
      para([run("Six technology initiatives to speed up investment, jobs and ease of doing business in West Bengal", { color: "DCE6F2", size: 28 })], { after: 360, line: 320 }),
      para([run("Prepared for: ", { color: "B8C7DA", size: 21 }), run("Department of Industry, Commerce & Enterprises, Government of West Bengal", { color: "FFFFFF", size: 21, bold: true })], { after: 80 }),
      para([run("Prepared by: ", { color: "B8C7DA", size: 21 }), run(COMPANY, { color: "FFFFFF", size: 21, bold: true }), run("  ·  Kolkata  ·  September 2026", { color: "B8C7DA", size: 21 })], { after: 300 }),
    ], CW, { fill: NAVY, borders: noBorders, pad: 400 })],
  })], [CW]));

  out.push(para("", { after: 240 }));
  out.push(para([run("THE SIX INITIATIVES", { bold: true, color: AMBER, size: 20 })], { after: 120 }));
  const rows = projects.map((p) => new TableRow({ children: [
    cell(para([run(p.code, { bold: true, color: AMBER, size: 30 })], { after: 0 }), 900, { borders: { ...noBorders, bottom: thin }, valign: VerticalAlign.CENTER }),
    cell([para([run(p.name, { bold: true, color: NAVY, size: 23 }), run("  ·  " + p.subtitle, { color: MUTED, size: 19 })], { after: 20 }),
          para([run(p.tagline, { italics: true, color: INK, size: 18 })], { after: 0 })], CW - 900, { borders: { ...noBorders, bottom: thin } }),
  ] }));
  out.push(table(rows, [900, CW - 900]));
  out.push(para("", { after: 200 }));
  out.push(para([run("Each initiative is set out on two pages: problem, solution, approach, benefits and indicative cost. All figures are indicative and subject to detailed scoping with the Department.", { italics: true, color: MUTED, size: 17 })]));
  return out;
}

// ---------- portfolio summary ----------
function portfolio() {
  const out = [new Paragraph({ children: [new PageBreak()] })];
  out.push(para([run("Portfolio at a glance", { bold: true, color: NAVY, size: 36 })], { after: 80 }));
  out.push(para("West Bengal's new government has made industrial revival its first economic priority. Its plans include a jobs-linked incentive pool of ₹5,000 crore, a new land policy, an overhaul of Silpa Sathi, revival of closed-factory land, and a ₹1,000 crore programme to rejuvenate legacy clusters. Each of these commitments now needs a digital backbone that makes it fast, verifiable and visible to investors. The six initiatives below were chosen because they either do not exist yet or exist only as static portals, and because each one directly supports a commitment the government has already announced.", { after: 140 }));

  const W = [450, 1850, 3000, 2050, 1450, 1506];
  const head = ["#", "Initiative", "What it solves", "Status today", "One-time", "Recurring / yr"];
  const rows = [new TableRow({ tableHeader: true, children: head.map((h, i) => cell(para([run(h, { bold: true, color: "FFFFFF", size: 17 })], { after: 0 }), W[i], { fill: NAVY })) })];
  const solves = {
    "01": "MoUs that never become factories; no single view of stuck projects",
    "02": "Scarce, opaque and idle industrial land; closed-factory tracts",
    "03": "Desk-to-desk approvals; 'deemed approval' with no enforcement",
    "04": "Jobs-linked incentives that are easy to inflate; legacy-claim disputes",
    "05": "Middlemen, brand dilution and siloed ONDC pilots across 570 clusters",
    "06": "CCTS carbon targets and EU CBAM threatening jobs in heavy industry and exports",
  };
  let lo = 0, hi = 0, rlo = 0, rhi = 0;
  projects.forEach((p, idx) => {
    const ot = oneTime(p.cost), rc = recurring(p.cost);
    lo += ot[0]; hi += ot[1]; rlo += rc[0]; rhi += rc[1];
    const fill = idx % 2 ? "FFFFFF" : "F7F9FC";
    rows.push(new TableRow({ children: [
      cell(para([run(p.code, { bold: true, color: AMBER, size: 18 })], { after: 0 }), W[0], { fill }),
      cell([para([run(p.name, { bold: true, color: NAVY, size: 18 })], { after: 0 }), para([run(p.subtitle, { color: MUTED, size: 15 })], { after: 0, line: 220 })], W[1], { fill }),
      cell(para([run(solves[p.code], { size: 17 })], { after: 0, line: 230 }), W[2], { fill }),
      cell(para([run(p.status, { size: 17 })], { after: 0, line: 230 }), W[3], { fill }),
      cell(para([run(fmtRange(ot), { size: 17, bold: true })], { after: 0 }), W[4], { fill }),
      cell(para([run(fmtRange(rc), { size: 17 })], { after: 0 }), W[5], { fill }),
    ] }));
  });
  rows.push(new TableRow({ children: [
    cell(para([run("Whole portfolio", { bold: true, size: 18, color: NAVY })], { after: 0 }), W[0] + W[1] + W[2] + W[3], { fill: TINT_NAVY, span: 4 }),
    cell(para([run(fmtRange([lo, hi]), { bold: true, size: 17, color: NAVY })], { after: 0 }), W[4], { fill: TINT_NAVY }),
    cell(para([run(fmtRange([rlo, rhi]), { bold: true, size: 17, color: NAVY })], { after: 0 }), W[5], { fill: TINT_NAVY }),
  ] }));
  out.push(table(rows, W));
  const pct = [(lo / 100 / 6000 * 100).toFixed(1), (hi / 100 / 6000 * 100).toFixed(1)];
  out.push(para([run(`For scale: the whole portfolio costs about ${pct[0]}–${pct[1]}% of the ₹6,000 crore (incentive pool plus cluster programme) it would help the state spend well.`, { italics: true, color: MUTED, size: 17 })], { before: 60, after: 120 }));

  out.push(sectionHead("→", "How the six fit together"));
  out.push(para([run("One investor, one ID, one journey. ", { bold: true }), run("Nivesh Setu (01) tracks the investor from MoU to production. Shilpa Bhumi (02) finds and clears the land. Silpa Sathi 2.0 (03) issues approvals on a clock. Karma Praman (04) pays incentives against verified jobs. Bangla Cluster Connect (05) carries the same approach to MSME clusters, and Sabuj Shilpa (06) keeps heavy industry and exporters carbon-compliant. Each can be built on its own, but they share a common investor record, sign-on and dashboard, so every one added makes the others more useful.")], { after: 100 }));

  out.push(table([new TableRow({ children: [cell([
    para([run("RECOMMENDED STARTING POINTS", { bold: true, color: AMBER, size: 18 })], { after: 60 }),
    bullet([run("04 Karma Praman: ", { bold: true }), run("the most time-critical. The ₹5,000 crore jobs-linked policy is expected around October 2026, and building the verification engine alongside the policy means claims can be checked from the first payout.")]),
    bullet([run("06 Sabuj Shilpa: ", { bold: true }), run("fastest to show. Our DMRV prototype already works end to end, so a 20-unit pilot can go live in 8–10 weeks.")]),
    bullet([run("01 Nivesh Setu: ", { bold: true }), run("the shared backbone. A war-room for the top 100 projects gives the CM and Minister immediate visibility and links all the later modules.")], { after: 0 }),
  ], CW, { fill: TINT_AMBER, borders: { ...noBorders, left: { style: BorderStyle.SINGLE, size: 24, color: AMBER } }, pad: 120 })] })], [CW]));
  return out;
}

// ---------- project pages ----------
function projectPages(p) {
  const out = [new Paragraph({ children: [new PageBreak()] })];
  // header band
  out.push(table([new TableRow({ children: [cell([
    para([run(`INITIATIVE ${p.code}`, { bold: true, color: "F6C27A", size: 17 })], { after: 80 }),
    para([run(p.name, { bold: true, color: "FFFFFF", size: 38 }), run("   " + p.subtitle, { color: "DCE6F2", size: 22 })], { after: 60, line: 276 }),
    para([run(p.tagline, { italics: true, color: "DCE6F2", size: 19 })], { after: 0 }),
  ], CW, { fill: NAVY, borders: noBorders, pad: 150 })] })], [CW]));
  out.push(para("", { after: 60 }));

  // info grid
  const half = CW / 2;
  const label = (t) => para([run(t.toUpperCase(), { bold: true, color: TEAL, size: 15 })], { after: 20 });
  const ot = oneTime(p.cost), rc = recurring(p.cost);
  out.push(table([
    new TableRow({ children: [
      cell([label("Owner & partner departments"), para([run(p.dept, { size: 17 })], { after: 0, line: 230 })], half, { fill: TINT_TEAL }),
      cell([label("Status today"), para([run(p.status + ". ", { size: 17, bold: true }), run(p.statusDetail, { size: 17 })], { after: 0, line: 230 })], half, { fill: TINT_TEAL }),
    ] }),
    new TableRow({ children: [
      cell([label("Timeline"), para([run(p.timeline, { size: 17 })], { after: 0 })], half, { fill: TINT_TEAL }),
      cell([label("Indicative cost"), para([run("One-time " + fmtRange(ot), { size: 17, bold: true }), run("  ·  Recurring " + fmtRange(rc) + " / yr", { size: 17 })], { after: 0 })], half, { fill: TINT_TEAL }),
    ] }),
  ], [half, half]));

  // 1 problem
  out.push(sectionHead("1", "Problem statement"));
  p.problem.forEach((t) => out.push(bullet(t)));

  // 2 solution
  out.push(sectionHead("2", "Proposed solution"));
  out.push(para(p.solutionIntro, { after: 60, keepNext: true }));
  p.modules.forEach(([h, t]) => out.push(bullet([run(h + ": ", { bold: true, color: NAVY }), run(t)])));
  out.push(para("", { after: 40 }));
  out.push(table([new TableRow({ cantSplit: true, children: [cell([
    para([run("UNIQUE DIFFERENTIATOR", { bold: true, color: AMBER, size: 17 })], { after: 30 }),
    para(p.differentiator, { after: 0 }),
  ], CW, { fill: TINT_AMBER, borders: { ...noBorders, left: { style: BorderStyle.SINGLE, size: 24, color: AMBER } }, pad: 100 })] })], [CW]));

  // 3 approach
  out.push(sectionHead("3", "Approach & methodology"));
  const PW = [1500, 1100, 5406, 2300];
  const hdr = ["Phase", "Duration", "What we do", "Output"];
  const prow = [new TableRow({ tableHeader: true, cantSplit: true, children: hdr.map((h, i) => cell(para([run(h, { bold: true, color: "FFFFFF", size: 16 })], { after: 0 }), PW[i], { fill: TEAL, pad: 50 })) })];
  p.phases.forEach((r, idx) => prow.push(new TableRow({ cantSplit: true, children: r.map((t, i) => cell(para([run(t, { size: 17, bold: i === 0, color: i === 0 ? NAVY : INK })], { after: 0, line: 230 }), PW[i], { fill: idx % 2 ? "FFFFFF" : "F7F9FC", pad: 50 })) })));
  out.push(table(prow, PW));
  out.push(para([run("Method: ", { bold: true, color: NAVY }), run(p.method)], { before: 60, after: 0 }));

  // 4 benefits
  out.push(sectionHead("4", "Benefits"));
  const bh = (t) => para([run(t, { bold: true, color: TEAL, size: 18 })], { after: 40 });
  out.push(table([new TableRow({ cantSplit: true, children: [
    cell([bh("For the Government"), ...p.benefitsGov.map((t) => bullet(t))], half, { borders: { ...noBorders, top: thin } }),
    cell([bh("For industry, MSMEs & citizens"), ...p.benefitsInd.map((t) => bullet(t))], half, { borders: { ...noBorders, top: thin } }),
  ] })], [half, half]));

  // 5 cost
  out.push(sectionHead("5", "Likely cost range (development + infrastructure)"));
  const c = p.cost;
  const CWs = [5306, 2500, 2500];
  const crow = (label, lohi, o = {}) => new TableRow({ cantSplit: true, children: [
    cell(para([run(label, { size: 17, bold: o.bold, color: o.bold ? NAVY : INK })], { after: 0 }), CWs[0], { fill: o.fill, pad: 45 }),
    cell(para([run(lohi[0] >= 100 ? `₹${amt(lohi[0])} cr` : `₹${lohi[0]} lakh`, { size: 17, bold: o.bold })], { after: 0, align: AlignmentType.RIGHT }), CWs[1], { fill: o.fill, pad: 45 }),
    cell(para([run(lohi[1] >= 100 ? `₹${amt(lohi[1])} cr` : `₹${lohi[1]} lakh`, { size: 17, bold: o.bold })], { after: 0, align: AlignmentType.RIGHT }), CWs[2], { fill: o.fill, pad: 45 }),
  ] });
  const crows = [new TableRow({ tableHeader: true, cantSplit: true, children: ["Component", "Low", "High"].map((h, i) => cell(para([run(h, { bold: true, color: "FFFFFF", size: 16 })], { after: 0, align: i ? AlignmentType.RIGHT : undefined }), CWs[i], { fill: TEAL, pad: 45 })) })];
  crows.push(crow("Development: pilot (Phases 0–1)", c.pilot));
  crows.push(crow("Development: full rollout (Phase 2), incl. security audit", c.rollout));
  if (c.field) crows.push(crow("Field onboarding (cluster facilitators, training)", c.field));
  crows.push(crow("One-time total", oneTime(c), { bold: true, fill: TINT_NAVY }));
  crows.push(crow("Infrastructure per year (hosting, storage, gateways, data)", c.infra));
  crows.push(crow("Operations & maintenance per year (support, updates, helpdesk)", c.om));
  crows.push(crow("Recurring total per year", recurring(c), { bold: true, fill: TINT_NAVY }));
  out.push(table(crows, CWs));
  out.push(para([run(p.costNote + " Figures exclude GST and are ±25% until scoped.", { italics: true, color: MUTED, size: 16 })], { before: 50, after: 0 }));

  // 6 risks
  out.push(sectionHead("6", "Key risks & how we handle them"));
  const RW = [3600, CW - 3600];
  out.push(table(p.risks.map(([r, m], i) => new TableRow({ cantSplit: true, children: [
    cell(para([run(r, { size: 17, bold: true, color: NAVY })], { after: 0 }), RW[0], { fill: i % 2 ? "FFFFFF" : "F7F9FC", borders: { ...noBorders, bottom: thin }, pad: 50 }),
    cell(para([run(m, { size: 17 })], { after: 0 }), RW[1], { fill: i % 2 ? "FFFFFF" : "F7F9FC", borders: { ...noBorders, bottom: thin }, pad: 50 }),
  ] })), RW));
  return out;
}

// ---------- engagement + sources ----------
function closing() {
  const out = [new Paragraph({ children: [new PageBreak()] })];
  out.push(para([run("How we will work with the Department", { bold: true, color: NAVY, size: 36 })], { after: 120 }));
  const items = [
    ["Start small, prove value", "A 6–8 week proof of concept on one initiative, using the Department's own data in its own environment, at no cost or a nominal one. Scale up only after the results are visible."],
    ["Clean, transparent procurement", "Engagement through GeM, Webel Technology Ltd (the state's nodal e-governance agency) or an empanelled system-integrator partner. Rollouts through open tender, where we compete on merit."],
    ["Data stays with the state", "Hosting in the WB State Data Centre or a MeitY-empanelled Indian cloud. Compliant with the DPDP Act 2023, with consent-based data sharing."],
    ["Security first", "A CERT-In-empanelled security audit before every go-live, with STQC certification where required. Role-based access and tamper-evident audit logs."],
    ["No vendor lock-in", "Open-source stack, source code in escrow, full documentation, and training for state officers. The state owns its configurations and data."],
    ["Bengali-first", "Screens for citizens and MSMEs in Bengali, Hindi and English, with voice-led flows for artisans and micro units."],
    ["Outcome-linked contracts", "Every engagement carries measurable KPIs (approval days, jobs verified, acres unlocked) and monthly public-facing reports."],
    ["Build in Bengal", "Delivery team based in Kolkata, with internships and hiring from state engineering colleges and polytechnics."],
  ];
  const W = [2700, CW - 2700];
  out.push(table(items.map(([h, t], i) => new TableRow({ cantSplit: true, children: [
    cell(para([run(h, { bold: true, color: NAVY })], { after: 0 }), W[0], { fill: i % 2 ? "FFFFFF" : "F7F9FC", borders: { ...noBorders, bottom: thin } }),
    cell(para(t, { after: 0 }), W[1], { fill: i % 2 ? "FFFFFF" : "F7F9FC", borders: { ...noBorders, bottom: thin } }),
  ] })), W));

  out.push(sectionHead("i", "Cost assumptions"));
  [
    "Blended delivery cost of ₹1.4–2.0 lakh per person-month for a Kolkata-based team (product, design, engineering, QA, project management).",
    "Pilot = Phases 0–1; rollout = Phase 2. Operations and maintenance are typically 15–20% of build cost per year and include the helpdesk, bug fixes, minor enhancements and rule updates.",
    "Infrastructure assumes a MeitY-empanelled cloud. If hosted in the State Data Centre, part of this cost is absorbed by the state.",
    "All amounts exclude GST and are indicative (±25%) until scoped jointly with the Department.",
  ].forEach((t) => out.push(bullet(t)));

  out.push(sectionHead("ii", "Sources (public information, accessed September 2026)"));
  sources.forEach(([t, u]) => out.push(new Paragraph({
    children: [run(t + " — ", { size: 15 }), run(u, { size: 14, color: TEAL })],
    numbering: { reference: "num", level: 0 }, spacing: { after: 20, line: 220 },
  })));
  out.push(para([run("Status descriptions are based on public reports up to September 2026 and should be confirmed with the Department before formal submission.", { italics: true, color: MUTED, size: 16 })], { before: 80 }));
  return out;
}

const doc = new Document({
  creator: COMPANY,
  title: "Shilpa Shakti Digital Stack: Six initiatives for the ICE Department, Government of West Bengal",
  styles: { default: { document: { run: { font: FONT, size: BODY, color: INK } } } },
  numbering: { config: [
    { reference: "bul", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 300, hanging: 200 } }, run: { color: TEAL } } }] },
    { reference: "num", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 300 } }, run: { size: 15 } } }] },
  ] },
  sections: [{
    properties: { page: { size: { width: PAGE_W, height: 16838 }, margin: { top: 700, bottom: 700, left: MARGIN, right: MARGIN, footer: 360 } } },
    footers: { default: new Footer({ children: [new Paragraph({
      alignment: AlignmentType.RIGHT,
      children: [run(`${COMPANY}  ·  Proposal to the ICE Department, Government of West Bengal  ·  Page `, { size: 14, color: MUTED }), new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 14, color: MUTED })],
    })] }) },
    children: [...cover(), ...portfolio(), ...projects.flatMap(projectPages), ...closing()],
  }],
});

const outName = process.argv[2] || "WB_ICE_Initiatives.docx";
Packer.toBuffer(doc).then((b) => { fs.writeFileSync(outName, b); console.log("wrote", outName); });
