// Consulting Partner term sheet (draft for legal review). Internal to Kirnova.
const fs = require("fs");
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle, AlignmentType, LevelFormat, Footer, PageNumber, TableLayoutType } = require("docx");
const FONT = "Arial", NAVY = "1B2A44", TEAL = "0E7C7B", MUTED = "5B6472", LINE = "CBD5E1", TINT = "E6F4F3";
const PAGE_W = 11906, MARGIN = 1000, CW = PAGE_W - 2 * MARGIN;
const run = (t, o = {}) => new TextRun({ text: t, font: FONT, size: o.size || 20, bold: o.bold, italics: o.italics, color: o.color || "1F2937" });
const para = (c, o = {}) => new Paragraph({ children: Array.isArray(c) ? c : [run(c, o)], spacing: { before: o.before || 0, after: o.after ?? 80, line: 270 }, alignment: o.align, keepNext: o.keepNext });
const bullet = (c) => new Paragraph({ children: Array.isArray(c) ? c : [run(c)], numbering: { reference: "bul", level: 0 }, spacing: { after: 50, line: 262 } });
const thin = { style: BorderStyle.SINGLE, size: 4, color: LINE };
const B = { top: thin, bottom: thin, left: thin, right: thin };
const cell = (c, w, o = {}) => new TableCell({ children: Array.isArray(c) ? c : [c], width: { size: w, type: WidthType.DXA }, borders: B, shading: o.fill ? { type: ShadingType.CLEAR, color: "auto", fill: o.fill } : undefined, margins: { top: 70, bottom: 70, left: 120, right: 120 } });
const W = [2600, CW - 2600];
const row = (k, parts) => new TableRow({ cantSplit: true, children: [
  cell(para([run(k, { bold: true, color: NAVY, size: 19 })], { after: 0 }), W[0], { fill: TINT }),
  cell(parts.map((p) => (typeof p === "string" ? para([run(p, { size: 19 })], { after: 50 }) : p)), W[1]),
] });
const sb = (t) => new Paragraph({ children: [run(t, { size: 19 })], numbering: { reference: "bul", level: 0 }, spacing: { after: 40, line: 250 } });
const h = (t) => para([run(t, { bold: true, color: TEAL, size: 24 })], { before: 220, after: 100, keepNext: true });

const terms = [
  ["Parties", ["Kirnova Technologies [Private Limited] (\"Kirnova\") and [Partner name, legal form, registered address, PAN, GSTIN] (\"Partner\")."]],
  ["Nature of relationship", ["Independent consulting partner on a principal-to-principal basis. Not an agent, employee or joint venturer. The Partner has no authority to bind Kirnova or to make any representation or commitment to any government department on Kirnova's behalf."]],
  ["Opportunities covered", ["Named opportunities only (Schedule A), initially:", sb("Sadak Setu Digital Stack: Road Construction Department, Government of Jharkhand"), sb("TrueYield revenue-leakage platform: Finance Department, Government of Jharkhand"), "New opportunities are added only by written addendum. Non-exclusive unless an addendum states otherwise."]],
  ["Services to be provided by the Partner", ["The fee is payable only for services actually performed and recorded:",
    sb("Opportunity research: department structure, budgets, procurement route and timelines"),
    sb("Tender and bid support: document preparation, compliance matrix, empanelment (GeM, JAP-IT), pre-bid queries"),
    sb("Formal stakeholder coordination: scheduling and minuting official meetings and presentations, attended with Kirnova"),
    sb("On-ground project coordination in Ranchi: logistics, workshop and training arrangements, user-adoption support"),
    sb("Contract administration: milestone documentation, invoice submission and payment follow-up"),
    sb("[Optional] Arranging bank guarantees, EMD or performance security at the Partner's cost or on agreed terms")]],
  ["Reporting", ["Monthly activity report: meetings held (date, office, attendees, purpose), documents prepared, hours spent. Kirnova may withhold fees for any month without a report."]],
  ["Fee", ["One-time contract value (development, licence, rollout): [15]% of Net Receipts.", "Recurring AMC and support: [7.5]% of Net Receipts for the first [2] years of AMC, nil thereafter.",
    "Net Receipts means amounts actually received by Kirnova from the government client, excluding GST, taxes, and pass-through costs (hosting and cloud, third-party audits, scanning and digitisation, hardware, travel reimbursed at actuals).",
    "Cap: the fee on any one opportunity shall not exceed ₹[__] lakh without written approval."]],
  ["When and how paid", ["Within 15 days of Kirnova receiving each payment from the client, against the Partner's GST invoice.", "Only by bank transfer to the Partner's own account in its registered name. No cash, no payments to third parties, no advances.", "TDS deducted as applicable (Section 194J). No fee is earned on award, bid submission or signing alone."]],
  ["Anti-bribery and integrity (essential)", ["The Partner warrants and undertakes that it, its directors, employees and sub-contractors:",
    sb("shall not offer, promise, give or authorise any payment, gift, hospitality or advantage to any public servant, political party, party functionary or person connected to them, to obtain or retain business or influence any decision (Prevention of Corruption Act, 1988, as amended in 2018, including Sections 7, 8, 9 and 12)"),
    sb("is not a public servant, and has no relative or business interest connected with any official involved in the procurement; any such relationship is disclosed in writing before signing (Schedule B)"),
    sb("shall not appoint sub-agents or pass on any part of the fee without Kirnova's prior written consent"),
    sb("shall comply with any Integrity Pact or agent-disclosure requirement in the tender, and consents to Kirnova disclosing this agreement and the fee where a tender requires it"),
    sb("shall keep accurate books and records of all expenses related to the opportunities and allow Kirnova or its auditors to inspect them"),
    "Breach allows Kirnova to terminate immediately, withhold unpaid fees and recover fees already paid for the affected opportunity. The Partner shall indemnify Kirnova for losses from any breach. The Partner signs an annual compliance certificate."]],
  ["Separation from CSR", ["Kirnova's Social Impact Fund is governed by its Board and is not linked to any contract, fee or opportunity. The Partner has no role in, and no entitlement from, CSR spending."]],
  ["Intellectual property and confidentiality", ["All software, product IP, proposals, pricing and client data remain Kirnova's (or the client's). The Partner receives no licence or rights. Confidentiality survives termination for [3] years."]],
  ["Non-solicitation and non-circumvention", ["For the term and [12] months after, the Partner shall not solicit Kirnova staff, or offer competing products or services for the named opportunities."]],
  ["Term and termination", ["[24] months, renewable by agreement. Either party may terminate on [60] days' notice. Fees on receipts from contracts signed before termination remain payable (for the one-time contract value only), subject to the integrity clauses."]],
  ["Law and disputes", ["Indian law. Disputes by arbitration under the Arbitration and Conciliation Act, 1996, seat [Kolkata], sole arbitrator."]],
];

const doc = new Document({
  styles: { default: { document: { run: { font: FONT, size: 20 } } } },
  numbering: { config: [{ reference: "bul", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 340, hanging: 200 } } } }] }] },
  sections: [{
    properties: { page: { size: { width: PAGE_W, height: 16838 }, margin: { top: 1000, bottom: 900, left: MARGIN, right: MARGIN } } },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [run("Kirnova Technologies  ·  Consulting Partner Term Sheet  ·  DRAFT for legal review  ·  Page ", { size: 15, color: MUTED }), new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 15, color: MUTED })] })] }) },
    children: [
      para([run("DRAFT FOR LEGAL REVIEW  ·  CONFIDENTIAL", { bold: true, color: "B7791F", size: 18 })], { after: 120 }),
      para([run("Consulting Partner Term Sheet", { bold: true, color: NAVY, size: 40 })], { after: 80 }),
      para([run("Kirnova Technologies and [Partner]: government opportunities in Jharkhand", { color: MUTED, size: 22 })], { after: 200 }),
      para("This term sheet sets out the main terms on which the Partner will provide consulting services to Kirnova for named government opportunities. It is not binding until a definitive agreement is signed. Square brackets mark values to be agreed.", { after: 160 }),
      new Table({ rows: terms.map(([k, v]) => row(k, v)), columnWidths: W, width: { size: CW, type: WidthType.DXA }, layout: TableLayoutType.FIXED }),
      h("Before signing"),
      bullet("Have a lawyer turn this into the definitive agreement and review it against the specific tender's terms, since some tenders restrict agents or require their disclosure."),
      bullet("Collect the Partner's KYC (PAN, GSTIN, incorporation, bank details), the Schedule B conflict-of-interest declaration, and a signed copy of the anti-bribery clause."),
      bullet("Keep the monthly activity reports with the invoices; together they show what the fee paid for."),
      para([run("Signed for Kirnova: ____________________________     Date: ____________", { size: 19 })], { before: 300, after: 200 }),
      para([run("Signed for Partner: ____________________________     Date: ____________", { size: 19 })]),
    ],
  }],
});
Packer.toBuffer(doc).then((b) => { fs.writeFileSync(process.argv[2], b); console.log("ok"); });
