// TrueYield Jharkhand: revenue-leakage analytics proposal to the Finance Department, Government of Jharkhand.
// All money values in ₹ lakh as [low, high]; figures exclude GST.
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType,
  ShadingType, BorderStyle, AlignmentType, LevelFormat, PageBreak, Footer,
  PageNumber, VerticalAlign, TableLayoutType, HeightRule,
} = require("docx");

const COMPANY = "Kirnova Technologies";
const CLIENT = "Finance Department, Government of Jharkhand";
const CLIENT_SHORT = "Finance Department, Government of Jharkhand";

// ---------- cost (₹ lakh) ----------
const COST = {
  pilot: { build: [26, 34], other: [2, 4] },     // Phase 0–1: adaptation, 3 departments, 3 districts
  rollout: { build: [33, 42], other: [7, 12] },  // Phase 2: 4 more departments, all districts, security audit, training
  infra: [4, 8],                                  // per year: hosting (largely absorbed if at JAP-IT SDC), AI usage
  om: [12, 18],                                   // per year: maintenance, rule & rate updates, helpdesk
  municipal: [15, 22],                            // optional: municipal edition for 3 ULBs
};
const add = (...r) => r.reduce((a, x) => [a[0] + x[0], a[1] + x[1]], [0, 0]);
const PILOT = add(COST.pilot.build, COST.pilot.other);
const ROLLOUT = add(COST.rollout.build, COST.rollout.other);
const ONE_TIME = add(PILOT, ROLLOUT);
const RECUR = add(COST.infra, COST.om);

// ---------- design tokens ----------
const FONT = "Arial";
const NAVY = "1B2A44", TEAL = "0E7C7B", GOLD = "B7791F", INK = "1F2937", MUTED = "5B6472", LINE = "CBD5E1";
const TINT_TEAL = "E6F4F3", TINT_GOLD = "FDF5E6", ZEBRA = "F7F9FC";
const PAGE_W = 11906, MARGIN = 850, CW = PAGE_W - 2 * MARGIN, BODY = 19;

const num = (v) => (Number.isInteger(v) ? String(v) : v.toFixed(1));
const crs = (l) => (l / 100).toFixed(2).replace(/0$/, "");
const one = (l) => (l >= 100 ? `₹${crs(l)} cr` : `₹${num(l)} lakh`);
function rng([a, b]) {
  if (a >= 100) return `₹${crs(a)}–${crs(b)} cr`;
  if (b < 100) return `₹${num(a)}–${num(b)} lakh`;
  return `₹${num(a)} lakh–${crs(b)} cr`;
}

// ---------- helpers ----------
const run = (text, o = {}) => new TextRun({ text, font: FONT, size: o.size || BODY, bold: o.bold, italics: o.italics, color: o.color || INK });
const para = (children, o = {}) => new Paragraph({
  children: Array.isArray(children) ? children : [run(children, o)],
  spacing: { before: o.before || 0, after: o.after === undefined ? 80 : o.after, line: o.line || 264 },
  alignment: o.align, keepNext: o.keepNext,
});
const J = AlignmentType.JUSTIFIED;
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
    margins: { top: o.pad ?? 60, bottom: o.pad ?? 60, left: 110, right: 110 },
    verticalAlign: o.valign || VerticalAlign.TOP, columnSpan: o.span,
  });
}
const table = (rows, widths) => new Table({ rows, columnWidths: widths, width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA }, layout: TableLayoutType.FIXED });
const pageBreak = () => new Paragraph({ children: [new PageBreak()] });
const headRow = (labels, widths, rightFrom = 99) => new TableRow({ tableHeader: true, cantSplit: true, children: labels.map((h, i) => cell(para([run(h, { bold: true, color: "FFFFFF", size: 16 })], { after: 0, align: i >= rightFrom ? AlignmentType.RIGHT : undefined }), widths[i], { fill: NAVY, pad: 50 })) });
const txtRow = (vals, widths, o = {}) => new TableRow({ cantSplit: true, children: vals.map((v, i) => cell(para([run(v, { size: 16, bold: (o.boldFirst && i === 0) || o.bold, color: (o.boldFirst && i === 0) ? NAVY : INK })], { after: 0, line: 232, align: i >= (o.rightFrom ?? 99) ? AlignmentType.RIGHT : undefined }), widths[i], { fill: o.fill, pad: 45 })) });
function h1(num, text) {
  return new Paragraph({ children: [run(num + "  ", { bold: true, color: TEAL, size: 28 }), run(text.toUpperCase(), { bold: true, color: NAVY, size: 28 })], spacing: { before: 240, after: 100 }, keepNext: true });
}
const h2 = (text) => para([run(text, { bold: true, color: TEAL, size: 20 })], { before: 120, after: 60, keepNext: true });
const callout = (label, children, color = GOLD, fill = TINT_GOLD) => table([new TableRow({ cantSplit: true, children: [cell([
  para([run(label, { bold: true, color, size: 17 })], { after: 40 }), ...children,
], CW, { fill, borders: { ...noBorders, left: { style: BorderStyle.SINGLE, size: 24, color } }, pad: 110 })] })], [CW]);
const spacer = (a = 80) => para("", { after: a });

// ---------- cover ----------
function cover() {
  const out = [];
  out.push(table([new TableRow({ height: { value: 5200, rule: HeightRule.ATLEAST }, children: [cell([
    para([run("PROPOSAL FOR DISCUSSION", { bold: true, color: "E9B949", size: 20 })], { after: 360, before: 300 }),
    para([run("TrueYield Jharkhand", { bold: true, color: "FFFFFF", size: 58 })], { after: 140, line: 300 }),
    para([run("Revenue leakage analytics across departments: one view of every taxpayer, and a verified list of revenue the state is already owed", { color: "DCE6F2", size: 27 })], { after: 360, line: 320 }),
    para([run("Prepared for:   ", { color: "B8C7DA", size: 21 }), run(CLIENT, { color: "FFFFFF", size: 21, bold: true })], { after: 60 }),
    para([run("With:   ", { color: "B8C7DA", size: 19 }), run("Commercial Taxes · Mines & Geology · Revenue, Registration & Land Reforms · Transport · Excise & Prohibition · Energy (JBVNL)", { color: "DCE6F2", size: 19 })], { after: 80 }),
    para([run("Prepared by:    ", { color: "B8C7DA", size: 21 }), run(COMPANY, { color: "FFFFFF", size: 21, bold: true }), run("  ·  Kolkata  ·  September 2026", { color: "B8C7DA", size: 21 })], { after: 200 }),
  ], CW, { fill: NAVY, borders: noBorders, pad: 400 })] })], [CW]));
  out.push(spacer(300));
  const w = CW / 3;
  const stat = (big, small, fill) => cell([para([run(big, { bold: true, color: NAVY, size: 30 })], { after: 30, align: AlignmentType.CENTER }), para([run(small, { color: MUTED, size: 16 })], { after: 0, align: AlignmentType.CENTER })], w, { fill, borders: noBorders, pad: 140, valign: VerticalAlign.CENTER });
  out.push(table([new TableRow({ children: [
    stat("4-month pilot", "3 departments · 3 districts · read-only", TINT_TEAL),
    stat(rng(PILOT), "pilot, one-time", ZEBRA),
    stat("Already built", "working platform; adapted, not developed from scratch", TINT_TEAL),
  ] })], [w, w, w]));
  out.push(spacer(300));
  out.push(para([run("CONTENTS", { bold: true, color: GOLD, size: 19 })], { after: 100 }));
  [
    "Executive summary",
    "1   Jharkhand's revenue and where it leaks",
    "2   What Jharkhand has today: a comparative study",
    "3   The proposed solution",
    "4   What the CAG found, and how TrueYield would catch it",
    "5   Approach and methodology",
    "6   Benefits",
    "7   Indicative cost",
    "8   Key risks and safeguards",
    "9   How we will work with the Government",
  ].forEach((t) => out.push(para([run(t, { size: 19 })], { after: 40 })));
  return out;
}

// ---------- executive summary ----------
function execSummary() {
  const out = [pageBreak()];
  out.push(para([run("Executive summary", { bold: true, color: NAVY, size: 40 })], { after: 140 }));
  out.push(para("Jharkhand expects ₹45,999 crore of own tax revenue in 2026–27 and about ₹16,000 crore from mining. Every one of these rupees is collected by a department that sees only its own records. The Commercial Taxes Department sees GST returns but not the electricity a business draws; Mines & Geology sees royalty but not the stamp duty paid on the lease deed; Registration sees a sale deed but not the turnover of the buyer. Leakage lives in the gaps between these registers, and CAG audits of Jharkhand have repeatedly found it there.", { align: J }));
  out.push(para("TrueYield is a revenue-leakage analytics platform that reads each department's records where they sit, compares them for the same taxpayer, and produces a ranked, rupee-quantified list of cases for officers to verify. It does not replace any departmental system and does not assess anyone; it tells officers where to look and shows the arithmetic behind every figure.", { align: J }));
  out.push(spacer(40));
  out.push(callout("THE PROPOSAL IN FIVE LINES", [
    bullet([run("What: ", { bold: true }), run("a cross-department leakage platform for the Finance Department, starting with Commercial Taxes, Mines & Geology and Registration.")]),
    bullet([run("Why now: ", { bold: true }), run("our review of public information found no cross-department revenue-leakage platform in Jharkhand today; GST-only national analytics give the state limited access and do not cover mining, stamps, land, transport or excise.")]),
    bullet([run("Proof: ", { bold: true }), run("the platform is already built and running on test data with a library of 85 checks across 10 families; it is adapted to Jharkhand's statutes and registers, not developed from scratch.")]),
    bullet([run("Pilot: ", { bold: true }), run(`4 months, 3 departments, 3 districts, read-only access, ${rng(PILOT)}. Full rollout only if the pilot's verified results justify it.`)]),
    bullet([run("Total: ", { bold: true }), run(`${rng(ONE_TIME)} one-time for the full state rollout, and ${rng(RECUR)} a year to run.`)]),
  ], TEAL, TINT_TEAL));
  out.push(spacer(60));
  out.push(h2("What the Government gets"));
  [
    "A single view of each taxpayer across GST, mining, stamps and registration, land, vehicles, excise and electricity.",
    "A ranked verification list for each district and department, every case with its evidence, arithmetic and statutory rate.",
    "Clear separation between evidence (both records are the state's own, keyed to the same taxpayer) and leads (patterns that need field verification).",
    "Recovery tracking from assignment to realisation, and a leadership dashboard for the Finance Secretary.",
    "Data stays with each department; the platform reads, never writes, and runs in the Jharkhand State Data Centre.",
  ].forEach((t) => out.push(bullet(t)));
  return out;
}

// ---------- 1. revenue & leakage ----------
function section1() {
  const out = [pageBreak()];
  out.push(h1("1", "Jharkhand's revenue and where it leaks"));
  out.push(para("Jharkhand's own revenue rests on a few large heads, each administered by a different department with its own register.", { align: J }));
  const W = [3600, 2300, 4306];
  out.push(table([
    headRow(["Revenue head (2026–27 BE)", "Estimate", "Administered by / main register"], W),
    txtRow(["Own tax revenue (total)", "₹45,999 crore", "Finance Department (all heads below)"], W, { boldFirst: true }),
    txtRow(["State GST", "₹14,563.75 crore", "Commercial Taxes: GST returns, e-way bills"], W, { boldFirst: true }),
    txtRow(["Taxes on sales, trade etc. (VAT on petroleum, liquor)", "₹7,899.72 crore", "Commercial Taxes"], W, { boldFirst: true }),
    txtRow(["State excise", "₹4,500 crore", "Excise & Prohibition; JSBCL (wholesale)"], W, { boldFirst: true }),
    txtRow(["Stamps & registration", "≈ ₹1,800 crore", "Revenue, Registration & Land Reforms: NGDRS / Jharnibandhan"], W, { boldFirst: true }),
    txtRow(["Mining receipts (non-tax)", "≈ ₹16,000 crore", "Mines & Geology: JIMMS"], W, { boldFirst: true }),
  ], W));
  out.push(para([run("Sources: PRS Legislative Research, Jharkhand Budget Analysis 2026–27, and budget summaries (see Sources). Figures to be confirmed against the Budget at a Glance.", { italics: true, color: MUTED, size: 16 })], { before: 60 }));
  out.push(h2("The evidence of leakage"));
  out.push(para("The Comptroller and Auditor General's revenue-sector audits of Jharkhand show the same pattern year after year: revenue is lost not for lack of rules but because records that should agree are never compared.", { align: J }));
  [
    [ "₹12,737 crore", " of under-assessment, short levy or loss of revenue found in 45,954 test-checked cases across sales tax, excise, vehicles, land revenue, stamps, electricity duty and mining (CAG Report No. 4 of 2016); departments accepted ₹11,676 crore of it." ],
    [ "₹446 crore", " short levy of royalty from undervaluing coal rejects in a colliery's returns, and ₹143.5 crore from district offices applying incorrect royalty rates (CAG revenue-sector reports)." ],
    [ "₹12.4 crore", " short levy of stamp duty and registration fees because mining leases were registered without checking the royalty on the approved mining plan." ],
    [ "₹70.9 crore", " potential loss from 368 non-operational sand ghats, plus short-levied royalty and unrealised dead rent, in the CAG's 2025 report on minor minerals, which also found minor-mineral revenue falling from ₹1,082 crore (2017–18) to ₹698 crore (2021–22)." ],
    [ "Excise", ": since the 2025 policy, wholesale supply stays with JSBCL and retail sale is with private licensees, creating two records that can be reconciled continuously for every licensee." ],
  ].forEach(([b, t]) => out.push(bullet([run(b, { bold: true, color: NAVY }), run(t)])));
  out.push(spacer(40));
  out.push(callout("WHAT THESE HAVE IN COMMON", [para("Each finding is a disagreement between two records the state already holds: a royalty rate and the notified rate; a lease's royalty and the stamp duty on its deed; a lessee's returns and its despatches. Audit finds them years later, one sample at a time. A platform that compares the records continuously finds them while they can still be recovered.", { after: 0, align: J })]));
  return out;
}

// ---------- 2. comparative study ----------
function section2() {
  const out = [pageBreak()];
  out.push(h1("2", "What Jharkhand has today: a comparative study"));
  out.push(para("Jharkhand has invested well in departmental systems. The question for revenue leakage is whether any of them compares one department's records with another's for the same taxpayer and turns the disagreement into a verified rupee figure.", { align: J }));
  const W = [1700, 2400, 3106, 3000];
  out.push(table([
    headRow(["Department", "Existing system", "What it does well", "What it cannot see"], W),
    txtRow(["Commercial Taxes", "GST system (GSTN), state tax portal; national BIFA / GST Prime analytics", "Registration, returns, e-way bills; GST-only risk outputs from the national analytics", "Electricity use, property, vehicles, stamps, mining or excise of the same taxpayer; state access to BIFA is limited to a few officers"], W, { boldFirst: true }),
    txtRow(["Mines & Geology", "JIMMS (upgraded May 2025)", "Leases, e-challans and transit permits; shares data with ports, railways, Commercial Taxes, Income Tax and treasury", "Whether the lease deed was stamped on the right royalty, or whether a lessee's GST and power use match reported extraction"], W, { boldFirst: true }),
    txtRow(["Registration", "NGDRS / Jharnibandhan", "Online valuation, e-stamp, e-payment and appointments", "Whether the parties' turnover, land use or repeat pattern suggests undervaluation"], W, { boldFirst: true }),
    txtRow(["Land records", "Jharbhoomi", "Records of rights and online mutation", "Commercial activity on land not converted for that use; delays between deed and mutation"], W, { boldFirst: true }),
    txtRow(["Transport", "VAHAN / SARATHI (NIC)", "Registration, permits, tax payment", "Commercial use of privately registered vehicles; fleet size against declared business scale"], W, { boldFirst: true }),
    txtRow(["Excise", "Excise portal; JSBCL wholesale", "Licences, wholesale supply", "Retail sales against duty-paid quantity and against the licensee's GST"], W, { boldFirst: true }),
    txtRow(["Energy", "JBVNL billing", "Connections, consumption, billing", "Dormant GST registrations drawing commercial power; tariff misclassification"], W, { boldFirst: true }),
    txtRow(["Municipal", "SUDA municipal services portal", "Holding, water and trade tax payment", "Unassessed floors or commercial use visible in other records"], W, { boldFirst: true }),
  ], W));
  out.push(h2("How other tools compare"));
  const W2 = [2900, 1830, 1830, 1830, 1816];
  const Y = "Yes", N = "No", P = "Partly";
  out.push(table([
    headRow(["Capability", "National GST analytics (BIFA)", "JIMMS", "Departmental MIS", "TrueYield"], W2),
    txtRow(["Covers GST", Y, N, "Own dept", Y], W2, { boldFirst: true }),
    txtRow(["Covers mining, stamps, land, vehicles, excise, power", N, "Mining only", "Own dept", Y], W2, { boldFirst: true }),
    txtRow(["One view of a taxpayer across departments", N, N, N, Y], W2, { boldFirst: true }),
    txtRow(["Rupee figure with its arithmetic and statutory rate", P, P, N, Y], W2, { boldFirst: true }),
    txtRow(["Evidence separated from leads", N, N, N, Y], W2, { boldFirst: true }),
    txtRow(["Officer worklist and recovery tracking", P, N, P, Y], W2, { boldFirst: true }),
    txtRow(["Fully controlled by the state", "No (GSTN)", Y, Y, Y], W2, { boldFirst: true }),
  ], W2));
  out.push(spacer(60));
  out.push(callout("CONCLUSION OF THE STUDY", [para("Based on public information, Jharkhand has strong departmental systems but no platform that compares them. Other states are moving GST-first (Karnataka with IIT Hyderabad; Telangana's push for AI), but none, to our knowledge, compares GST with mining, stamps, land, vehicles, excise and power for the same taxpayer. TrueYield would sit on top of JIMMS, NGDRS, Jharbhoomi, VAHAN, JBVNL and the tax systems, reading from each and changing none, and would complement the national GST analytics. To be confirmed with the Finance and Commercial Taxes Departments in Phase 0.", { after: 0, align: J, size: 18 })], TEAL, TINT_TEAL));
  return out;
}

// ---------- 3. solution ----------
function section3() {
  const out = [pageBreak()];
  out.push(h1("3", "The proposed solution"));
  out.push(para("TrueYield connects to each department's database in read-only mode, maps its tables to a common vocabulary, and runs a library of checks that compare records for the same taxpayer (linked by PAN, GSTIN, or matched on name, address and mobile where no shared key exists). Every finding carries its inputs, arithmetic, statutory rate and the officer accountable for it.", { align: J }));
  out.push(h2("Check families, adapted to Jharkhand's registers"));
  const W = [2200, 3000, 5006];
  out.push(table([
    headRow(["Family", "Jharkhand data", "Examples of what is checked"], W),
    txtRow(["GST & allied", "GST returns, e-way bills", "Turnover falling while power use rises; ITC far above sector norms; turnover split across GSTINs to stay under thresholds; circular trading"], W, { boldFirst: true }),
    txtRow(["Mines & minerals", "JIMMS leases, e-challans, royalty", "Royalty due vs paid at the notified rate; extraction beyond permit; operations after lease expiry; dead rent unpaid; idle leases with power drawn"], W, { boldFirst: true }),
    txtRow(["Registration & stamps", "NGDRS / Jharnibandhan", "Document type set to a lower-duty class; repeat parties undervaluing; lease deeds stamped below the royalty-based value"], W, { boldFirst: true }),
    txtRow(["Land records", "Jharbhoomi", "Commercial activity on non-converted land; long gap between deed and mutation"], W, { boldFirst: true }),
    txtRow(["Motor vehicles", "VAHAN", "Road tax unpaid; commercial use of privately registered vehicles; permit fee leakage"], W, { boldFirst: true }),
    txtRow(["State excise", "Excise portal, JSBCL", "Sales vs duty-paid quantity; licence fee shortfall; excise sales vs GST declared"], W, { boldFirst: true }),
    txtRow(["Power & utilities", "JBVNL", "Dormant GST registration with active commercial connection; commercial use billed as domestic"], W, { boldFirst: true }),
    txtRow(["Cross-department", "All of the above", "Business growing in assets but not in tax; the same taxpayer non-compliant in several departments; mining extraction vs transport movement"], W, { boldFirst: true }),
  ], W));
  out.push(h2("What officers and leaders see"));
  [
    ["Taxpayer 360", "every register's view of one taxpayer, with findings first and each figure traceable to its source record."],
    ["Verification worklist", "ranked by district, circle and department, assigned to named officers, with status from assignment to recovery."],
    ["Recovery drill-down", "state › district › circle, separating recurring revenue from one-time recovery."],
    ["Leadership dashboard", "what has been found, verified and recovered, and how much rests on evidence rather than leads."],
    ["Ask-a-question assistant", "officers ask about a taxpayer in plain Hindi or English and get answers that cite the records."],
    ["Policy simulator", "estimate the effect of a rate or threshold change before it is notified."],
  ].forEach(([h, t]) => out.push(bullet([run(h + ": ", { bold: true }), run(t)])));
  out.push(spacer(40));
  out.push(callout("SAFEGUARDS BUILT IN", [
    bullet("A discrepancy is not an evasion. The output is a verification list; nothing is assessed, billed or demanded by the platform."),
    bullet("Evidence (both records are the state's own, keyed to the same taxpayer) is kept apart from leads (patterns and benchmarks), and a lead is never promoted to evidence automatically."),
    bullet("Every statutory rate sits in one table that the department signs off; no rupee is computed from an unsigned rate."),
    bullet("Read-only access, role-based permissions, audit logs, hosting in the State Data Centre, DPDP Act 2023 compliant."),
  ]));
  return out;
}

// ---------- 4. CAG mapping + what is built ----------
function section4() {
  const out = [pageBreak()];
  out.push(h1("4", "What the CAG found, and how TrueYield would catch it"));
  const W = [4200, 6006];
  out.push(table([
    headRow(["CAG finding in Jharkhand", "The TrueYield check that compares the two records"], W),
    txtRow(["Royalty short-levied by undervaluing coal rejects in returns (₹446 crore)", "Extraction vs royalty gap: value and quantity in the lessee's returns compared with JIMMS despatches and the notified basis"], W),
    txtRow(["Incorrect royalty rates applied by district offices (₹143.5 crore)", "Royalty recomputed from the signed-off rate table for each mineral and lease; any difference is flagged with both rates shown"], W),
    txtRow(["Mining leases registered without verifying royalty; short stamp duty (₹12.4 crore)", "Cross-department: the lease's annual royalty in JIMMS compared with the value on which its deed was stamped in NGDRS"], W),
    txtRow(["Short levy of royalty and unrealised dead rent (2025 report)", "Repeated short payments; dead rent due vs paid per lease and year"], W),
    txtRow(["Non-operational sand ghats and idle leases (₹70.9 crore potential loss)", "Lease capacity underutilised; inactive lease with power or transport activity nearby"], W),
  ], W));
  out.push(para([run("These are illustrations of fit, not claims about current cases. Whether the same patterns exist today is what the pilot will measure.", { italics: true, color: MUTED, size: 17 })], { before: 60 }));
  out.push(h1("5", "Approach and methodology"));
  out.push(para("TrueYield is already built. The work is to adapt its rules and rates to Jharkhand's statutes, connect it to the departments' registers, and prove its value on real records before any statewide commitment.", { align: J }));
  const PW = [1700, 1300, 5006, 2200];
  out.push(table([
    headRow(["Phase", "Duration", "What we do", "Output"], PW),
    txtRow(["0. Mobilise", "4 weeks", "Data-sharing order from the Finance Department; read-only access to Commercial Taxes, Mines & Geology and Registration; confirm existing tools; department sign-off on the rate table.", "Signed data compact and rate table"], PW, { boldFirst: true }),
    txtRow(["1. Pilot", "3 months", "Adapt checks to Jharkhand law; connect the three departments; run in three districts (proposed: Ranchi, Dhanbad, East Singhbhum); officers verify the top cases in the field.", "Verified findings, measured hit rate, recovery pipeline"], PW, { boldFirst: true }),
    txtRow(["Decision gate", "2 weeks", "Pilot results reviewed with the Finance Secretary; proceed only if verified findings justify it.", "Go / no-go"], PW, { boldFirst: true }),
    txtRow(["2. Rollout", "6 months", "Add Transport, Excise, JBVNL and land records; all 24 districts; officer training; security audit; leadership dashboard.", "Statewide platform"], PW, { boldFirst: true }),
    txtRow(["3. Run", "Ongoing", "Rule and rate updates as notifications change; monthly findings and recovery report.", "Monthly recovery report"], PW, { boldFirst: true }),
  ], PW));
  out.push(para([run("Optional: ", { bold: true }), run("a municipal edition (holding, water and trade tax) already exists from our earlier Jharkhand work and can be added for Ranchi and two other urban local bodies.")], { before: 80, align: J }));
  return out;
}

// ---------- 6-7 benefits & cost ----------
function section6() {
  const out = [pageBreak()];
  out.push(h1("6", "Benefits"));
  const h = CW / 2;
  const bh = (t) => para([run(t, { bold: true, color: TEAL, size: 18 })], { after: 40 });
  out.push(table([new TableRow({ cantSplit: true, children: [
    cell([bh("For the Government"), ...[
      "Revenue the state is already owed, found while it can still be recovered rather than years later in audit",
      "One view of every taxpayer across departments",
      "Officers' time directed to the highest-value, best-evidenced cases",
      "Audit readiness: every figure traceable to its record and rate",
      "Evidence for policy: what a rate or threshold change would yield",
    ].map((t) => bullet([run(t, { size: 18 })]))], h, { borders: noBorders }),
    cell([bh("For honest taxpayers and businesses"), ...[
      "Fewer blanket inspections; scrutiny targeted at real discrepancies",
      "A level playing field against under-reporting competitors",
      "Clear, record-based reasons whenever a case is raised",
    ].map((t) => bullet([run(t, { size: 18 })]))], h, { borders: noBorders }),
  ] })], [h, h]));
  out.push(spacer(40));
  out.push(callout("SCALE, NOT A FORECAST", [para(`If verified recoveries reached just 0.1% of own tax revenue (about ₹46 crore a year), that would be about fifty times the platform's full one-time cost of ${rng(ONE_TIME)}. How much leakage exists in Jharkhand today is not known by anyone; measuring it on real records is the purpose of the pilot.`, { after: 0, align: J })], TEAL, TINT_TEAL));

  out.push(h1("7", "Indicative cost"));
  const CWs = [5806, 2200, 2200];
  const crow = (lbl, v, o = {}) => new TableRow({ cantSplit: true, children: [
    cell(para([run(lbl, { size: 17, bold: o.bold })], { after: 0 }), CWs[0], { fill: o.fill }),
    cell(para([run(one(v[0]), { size: 17, bold: o.bold })], { after: 0 }), CWs[1], { fill: o.fill }),
    cell(para([run(one(v[1]), { size: 17, bold: o.bold })], { after: 0 }), CWs[2], { fill: o.fill }),
  ] });
  out.push(table([
    headRow(["Component", "Low", "High"], CWs),
    crow("Pilot (Phases 0–1): adaptation to Jharkhand, 3 departments, 3 districts", PILOT),
    crow("Statewide rollout (Phase 2): 4 more departments, 24 districts, training, security audit", ROLLOUT),
    crow("One-time total", ONE_TIME, { bold: true, fill: TINT_TEAL }),
    crow("Infrastructure per year (hosting, storage, AI usage)", COST.infra),
    crow("Operations & maintenance per year (support, rule and rate updates, helpdesk)", COST.om),
    crow("Recurring total per year", RECUR, { bold: true, fill: TINT_TEAL }),
    crow("Optional: municipal edition for 3 urban local bodies", COST.municipal),
  ], CWs));
  out.push(h2("Cost assumptions"));
  [
    "The platform already exists; costs cover adaptation to Jharkhand's statutes and registers, integration, deployment, training and support, not development from scratch.",
    "Delivery cost of ₹1.1–1.4 lakh per person-month for a Kolkata-based team with on-site presence in Ranchi.",
    "The rollout is paid only if the Government proceeds after the pilot's decision gate.",
    "If hosted in the Jharkhand State Data Centre (JAP-IT), most infrastructure cost is absorbed by the state.",
    "All amounts exclude GST and are indicative (±20%) until scoped jointly with the Finance Department.",
  ].forEach((t) => out.push(bullet(t)));
  return out;
}

// ---------- 8-9 risks, engagement, sources ----------
function closing() {
  const out = [pageBreak()];
  out.push(h1("8", "Key risks and safeguards"));
  const RW = [3200, CW - 3200];
  out.push(table([
    headRow(["Risk", "How we handle it"], RW),
    ...[
      ["Departments reluctant to share data", "Read-only access under a Finance Department order; data stays in each department; departments see their own findings first."],
      ["Limited access to GST data held by GSTN", "Start with the returns and e-way bill data available to the Commercial Taxes Department; national analytics outputs are used alongside, not replaced."],
      ["Records do not share a common key", "PAN and GSTIN where available; name, address and mobile matching elsewhere, with every inferred link graded and shown as a lead."],
      ["Too many false alarms", "Evidence separated from leads; ranked lists; officers verify before any action; thresholds tuned on pilot results."],
      ["Rates or rules change", "One signed-off rate table; updates coded within two weeks of notification."],
      ["Privacy and misuse", "Role-based access, audit logs, State Data Centre hosting, DPDP Act 2023 compliance."],
    ].map(([r, m]) => new TableRow({ cantSplit: true, children: [
      cell(para([run(r, { size: 17, bold: true })], { after: 0 }), RW[0]),
      cell(para([run(m, { size: 17 })], { after: 0 }), RW[1]),
    ] })),
  ], RW));
  out.push(h1("9", "How we will work with the Government"));
  const W = [2800, CW - 2800];
  out.push(table([
    ["Start small, prove value", "A 4-month pilot on real records in three districts; statewide rollout only after a decision gate."],
    ["Transparent procurement", "Engagement through GeM, JAP-IT or an empanelled system integrator."],
    ["Data stays with the state", "Read-only connections; hosting in the Jharkhand State Data Centre or a government-approved Indian cloud."],
    ["No vendor lock-in", "Open-source technology, source code in escrow, full documentation and training for departmental officers."],
    ["Hindi and English", "All screens, reports and the assistant in Hindi and English."],
    ["Pay for outcomes", "Milestones tied to measurable results: verified findings, cases assigned, recoveries tracked."],
  ].map(([hh, t]) => new TableRow({ cantSplit: true, children: [
    cell(para([run(hh, { bold: true, size: 18 })], { after: 0 }), W[0], { pad: 80 }),
    cell(para([run(t, { size: 18 })], { after: 0 }), W[1], { pad: 80 }),
  ] })), W));
  out.push(h2("Sources (public information, accessed September 2026)"));
  [
    ["PRS Legislative Research: Jharkhand Budget Analysis 2026–27", "https://prsindia.org/budgets/states/jharkhand-budget-analysis-2026-27"],
    ["Drishti IAS: Jharkhand Budget 2026–27", "https://www.drishtiias.com/state-pcs-current-affairs/jharkhand-budget-202627"],
    ["CAG: Report No. 4 of 2016, Revenue Sector, Government of Jharkhand", "https://cag.gov.in/webroot/uploads/download_audit_report/2016/Jharkhand_Report_No_4_of_2016_Revenue_Sector.pdf"],
    ["CAG: Revenue Sector report on Jharkhand 2017–18 (Report 1 of 2020)", "https://cag.gov.in/webroot/uploads/download_audit_report/2017/Report%201%20of%202020%20RS%202017-18,%20Jharkhand,%20Eng-05f6c86e2410dd7.40400418.pdf"],
    ["CAG 2025 report on minor minerals in Jharkhand (news coverage)", "https://thejharkhandstory.co.in/cag-flags-sharp-fall-in-jharkhands-minor-mineral-revenue-points-to-major-lapses/"],
    ["Business Jharkhand: CAG finds ₹70.92 crore loss, illegal leases (Dec 2025)", "https://www.businessjharkhand.com/2025/12/12/cag-report-revealed-system-failure-and-poor-monitoring-in-jharkhand-the-audit-found-illegal-leases-faulty-auctions-and-70-92-crore-revenue-loss/"],
    ["The Week: Jharkhand cabinet approves new excise policy (May 2025)", "https://www.theweek.in/wire-updates/national/2025/05/15/ces17-jh-cabinet-excise.html"],
    ["JIMMS: Jharkhand Integrated Mines & Minerals Management System", "https://mineralsportal.jharkhand.gov.in/aboutJIMMS.aspx"],
    ["NGDRS / Jharnibandhan: property registration", "https://jharnibandhan.gov.in/"],
    ["SUDA Jharkhand municipal services portal", "https://municipalservices.jharkhand.gov.in/"],
    ["Urbanomics: state access to GSTN BIFA and GST Prime", "https://urbanomics.substack.com/p/some-thoughts-on-gst-administration"],
    ["Karnataka GST analytics portal with IIT Hyderabad", "https://www.casansaar.com/news-GST/karnataka-moves-ahead-with-gst-analytics-portal-development/14457.html"],
    ["Department of Commercial Taxes, Jharkhand", "https://en.wikipedia.org/wiki/Department_of_Commercial_Taxes_(Jharkhand)"],
  ].forEach(([t, u]) => out.push(new Paragraph({ children: [run(t + " — ", { size: 15 }), run(u, { size: 15, color: TEAL })], numbering: { reference: "num", level: 0 }, spacing: { after: 30, line: 230 } })));
  out.push(para([run("Status descriptions are based on public information up to September 2026 and should be confirmed with the Departments before formal submission.", { italics: true, size: 17, color: MUTED })], { before: 120 }));
  return out;
}

const doc = new Document({
  creator: COMPANY,
  title: `TrueYield Jharkhand: proposal to the ${CLIENT_SHORT}`,
  styles: { default: { document: { run: { font: FONT, size: BODY, color: INK } } } },
  numbering: { config: [
    { reference: "bul", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 220 } }, run: { color: TEAL } } }] },
    { reference: "num", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 300 } }, run: { size: 15 } } }] },
  ] },
  sections: [{
    properties: { page: { size: { width: PAGE_W, height: 16838 }, margin: { top: 900, bottom: 900, left: MARGIN, right: MARGIN, footer: 400 } } },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [
      run(`${COMPANY}  ·  Proposal to the ${CLIENT_SHORT}  ·  Page `, { size: 15, color: MUTED }),
      new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 15, color: MUTED }),
    ] })] }) },
    children: [...cover(), ...execSummary(), ...section1(), ...section2(), ...section3(), ...section4(), ...section6(), ...closing()],
  }],
});

console.log("pilot", PILOT, "rollout", ROLLOUT, "one-time", ONE_TIME, "recurring", RECUR);
const outName = process.argv[2] || "TrueYield_Jharkhand_Proposal.docx";
Packer.toBuffer(doc).then((b) => { fs.writeFileSync(outName, b); console.log("wrote", outName); });
