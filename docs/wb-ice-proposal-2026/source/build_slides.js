const pptxgen = require("pptxgenjs");
const { COMPANY } = require("./content");

const NAVY = "1F3A5F", NAVY_DEEP = "15293F", AMBER = "D97706", AMBER_DK = "B45309", TEAL = "0F766E";
const INK = "1F2937", MUTED = "5B6472", ICE = "DCE6F2", CARD = "F3F6FA";
const HEAD = "Cambria", BODY = "Calibri";

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.33 x 7.5
pres.title = `${COMPANY}: Vision, Mission & Goals`;

const t = (slide, text, o) => slide.addText(text, { isTextBox: true, fontFace: BODY, color: INK, margin: 0, valign: "top", ...o });
const dot = (slide, x, y, d, label, fill = AMBER) => {
  slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, line: { color: fill } });
  t(slide, label, { x, y, w: d, h: d, align: "center", valign: "middle", bold: true, color: "FFFFFF", fontSize: d > 0.5 ? 16 : 12 });
};

// ---------- Slide 1: motto, vision, mission ----------
{
  const s = pres.addSlide();
  s.background = { color: NAVY };
  t(s, COMPANY.toUpperCase(), { x: 0.6, y: 0.45, w: 8, h: 0.35, fontSize: 13, bold: true, color: "F6C27A", charSpacing: 3 });
  t(s, "Technology that serves Bengal.", { x: 0.6, y: 0.85, w: 12, h: 0.9, fontFace: HEAD, fontSize: 42, bold: true, color: "FFFFFF" });
  t(s, "Build for Bengal  ·  Maintain for Bengal  ·  Scale from Bengal", { x: 0.6, y: 1.75, w: 12, h: 0.4, fontSize: 16, italic: true, color: ICE });

  // Vision card
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 2.4, w: 5.5, h: 3.75, fill: { color: NAVY_DEEP }, line: { color: NAVY_DEEP }, rectRadius: 0.12 });
  dot(s, 0.9, 2.65, 0.55, "V");
  t(s, "Our Vision", { x: 1.6, y: 2.7, w: 4.2, h: 0.45, fontFace: HEAD, fontSize: 22, bold: true, color: "FFFFFF", valign: "middle" });
  t(s, "To be West Bengal's most trusted home-grown technology partner, making governance faster, fairer and more transparent, and taking Bengal-built digital products to India and the world.",
    { x: 0.9, y: 3.4, w: 4.95, h: 2.5, fontSize: 17, color: ICE, paraSpaceAfter: 6 });

  // Mission card
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 6.4, y: 2.4, w: 6.33, h: 3.75, fill: { color: NAVY_DEEP }, line: { color: NAVY_DEEP }, rectRadius: 0.12 });
  dot(s, 6.7, 2.65, 0.55, "M");
  t(s, "Our Mission", { x: 7.4, y: 2.7, w: 5, h: 0.45, fontFace: HEAD, fontSize: 22, bold: true, color: "FFFFFF", valign: "middle" });
  const mission = [
    ["Deliver: ", "outcome-linked digital solutions for state departments."],
    ["Sustain: ", "stand behind every system for years through dependable maintenance."],
    ["Extend: ", "bring the same capability to Bengal's enterprises and MSMEs."],
    ["Productise: ", "turn proven solutions into products with recurring revenue."],
    ["Give back: ", "create tech jobs in Bengal and commit a fixed share of revenue to society."],
  ];
  s.addText(mission.flatMap(([h, b], i) => [
    { text: h, options: { bold: true, color: "F6C27A", bullet: { indent: 14 } } },
    { text: b, options: { color: ICE, breakLine: i < mission.length - 1 } },
  ]), { isTextBox: true, x: 6.7, y: 3.35, w: 5.85, h: 2.7, fontFace: BODY, fontSize: 14, margin: 0, valign: "top", paraSpaceAfter: 5 });

  // values row
  const values = ["Transparency", "Measurable outcomes", "Open technology", "Bengal talent", "Shared prosperity"];
  const vw = 2.34, gap = 0.1;
  values.forEach((v, i) => {
    const x = 0.6 + i * (vw + gap);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 6.45, w: vw, h: 0.55, fill: { color: NAVY }, line: { color: "4A6488", width: 1 }, rectRadius: 0.27 });
    t(s, v, { x, y: 6.45, w: vw, h: 0.55, align: "center", valign: "middle", fontSize: 13, color: "FFFFFF", bold: true });
  });
  s.addNotes("Open with the motto. The vision is long-term; the mission lists the five things we do, in order: deliver, sustain, extend, productise, give back.");
}

// ---------- Slide 2: short / mid / long-term goals ----------
{
  const s = pres.addSlide();
  s.background = { color: "FFFFFF" };
  t(s, "Where we are going", { x: 0.6, y: 0.45, w: 12, h: 0.7, fontFace: HEAD, fontSize: 36, bold: true, color: NAVY });
  t(s, "From government solutions, to long-term maintenance, to private IT, to our own products", { x: 0.6, y: 1.15, w: 12, h: 0.4, fontSize: 16, color: MUTED });

  const cols = [
    { tag: "1", when: "Now – 12 months", name: "Foundation", color: AMBER_DK, items: [
      "1–2 paid pilots with the ICE Department (Karma Praman, Sabuj Shilpa)",
      "Register on GeM; apply for Webel Technology empanelment; begin ISO 27001",
      "Core team of 12–15 in Kolkata",
    ], target: "First ₹1–2 cr revenue" },
    { tag: "2", when: "1 – 3 years", name: "Scale", color: TEAL, items: [
      "4–6 department solutions live, each with a multi-year maintenance contract",
      "Private IT for Bengal industry: carbon and CBAM compliance, MSME automation",
      "Team of 50–80; campus hiring from state colleges",
    ], target: "₹10–15 cr revenue, 30%+ recurring" },
    { tag: "3", when: "3 – 5+ years", name: "Products", color: NAVY, items: [
      "License our engines (DMRV, rules-as-code clearances, incentive verification) to other states and enterprises",
      "SaaS subscriptions for industry compliance",
      "Bengal as our delivery hub for India-wide clients",
    ], target: "40%+ revenue from products" },
  ];
  const cw = 3.9, cg = 0.32, y0 = 1.85;
  // connector line behind the number dots
  s.addShape(pres.shapes.LINE, { x: 0.6 + 0.3, y: y0 + 0.3, w: 2 * (cw + cg), h: 0, line: { color: "CBD5E1", width: 2, dashType: "dash" } });
  cols.forEach((c, i) => {
    const x = 0.6 + i * (cw + cg);
    dot(s, x, y0, 0.6, c.tag, c.color);
    t(s, c.when.toUpperCase(), { x: x + 0.75, y: y0 + 0.02, w: cw - 0.8, h: 0.28, fontSize: 12, bold: true, color: c.color, charSpacing: 1 });
    t(s, c.name, { x: x + 0.75, y: y0 + 0.28, w: cw - 0.8, h: 0.4, fontFace: HEAD, fontSize: 22, bold: true, color: INK });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: y0 + 0.85, w: cw, h: 3.25, fill: { color: CARD }, line: { color: CARD }, rectRadius: 0.1 });
    s.addText(c.items.map((it, j) => ({ text: it, options: { bullet: { indent: 14 }, breakLine: j < c.items.length - 1 } })),
      { isTextBox: true, x: x + 0.25, y: y0 + 1.1, w: cw - 0.5, h: 2.1, fontFace: BODY, fontSize: 14, color: INK, margin: 0, valign: "top", paraSpaceAfter: 8 });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x + 0.25, y: y0 + 3.3, w: cw - 0.5, h: 0.6, fill: { color: c.color }, line: { color: c.color }, rectRadius: 0.08 });
    t(s, "Target: " + c.target, { x: x + 0.25, y: y0 + 3.3, w: cw - 0.5, h: 0.6, align: "center", valign: "middle", fontSize: 14, bold: true, color: "FFFFFF" });
  });
  t(s, "Short-term focus: prove value to the West Bengal ICE Department with fast, low-risk pilots, then earn long-term trust through maintenance that never lets a system go stale.",
    { x: 0.6, y: 6.3, w: 12.1, h: 0.6, fontSize: 14, italic: true, color: MUTED });
  s.addNotes("Revenue targets are indicative planning goals. The key message: we win with government, stay through maintenance, then scale into private IT and products.");
}

// ---------- Slide 3: business model + social commitment ----------
{
  const s = pres.addSlide();
  s.background = { color: "FFFFFF" };
  t(s, "How we grow, and how we give back", { x: 0.6, y: 0.45, w: 12, h: 0.7, fontFace: HEAD, fontSize: 36, bold: true, color: NAVY });

  t(s, "Planned revenue mix (%)", { x: 0.6, y: 1.35, w: 6, h: 0.35, fontSize: 16, bold: true, color: INK });
  s.addChart(pres.charts.BAR, [
    { name: "Government projects", labels: ["Year 1", "Year 3", "Year 5"], values: [80, 40, 20] },
    { name: "Government maintenance", labels: ["Year 1", "Year 3", "Year 5"], values: [10, 25, 25] },
    { name: "Private IT services", labels: ["Year 1", "Year 3", "Year 5"], values: [10, 25, 20] },
    { name: "Products / SaaS", labels: ["Year 1", "Year 3", "Year 5"], values: [0, 10, 35] },
  ], {
    x: 0.5, y: 1.75, w: 6.2, h: 4.6, barDir: "col", barGrouping: "percentStacked",
    chartColors: ["94A3B8", TEAL, "5B8DB8", AMBER], showLegend: true, legendPos: "b", legendFontSize: 12, legendFontFace: BODY,
    showValue: true, dataLabelPosition: "ctr", dataLabelFontSize: 11, dataLabelColor: "FFFFFF", dataLabelFormatCode: '0;;;',
    catAxisLabelColor: INK, catAxisLabelFontSize: 13, valAxisHidden: true, valGridLine: { style: "none" }, catGridLine: { style: "none" }, barGapWidthPct: 60,
  });

  // Social commitment card
  const cx = 7.1, cwid = 5.63;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: 1.35, w: cwid, h: 5.5, fill: { color: NAVY }, line: { color: NAVY }, rectRadius: 0.12 });
  t(s, "OUR SOCIAL COMMITMENT", { x: cx + 0.4, y: 1.6, w: cwid - 0.8, h: 0.3, fontSize: 12, bold: true, color: "F6C27A", charSpacing: 2 });
  t(s, "2%", { x: cx + 0.4, y: 1.95, w: 1.9, h: 1.1, fontFace: HEAD, fontSize: 64, bold: true, color: "FFFFFF" });
  t(s, "of annual revenue, from year one, to a Bengal Social Impact Fund", { x: cx + 2.2, y: 2.15, w: cwid - 2.6, h: 0.9, fontSize: 16, color: ICE, valign: "middle" });
  const pts = [
    ["Focus areas: ", "digital skills for youth, artisan and MSME training, women entrepreneurs, STEM labs in schools."],
    ["Community-led: ", "public representatives and local bodies can propose programmes for their areas."],
    ["Governed & reported: ", "approved by our Board under Companies Act Schedule VII areas, with an annual public report."],
    ["Kept separate: ", "the fund is independent of any contract. We win work only through open, transparent procurement."],
  ];
  s.addText(pts.flatMap(([h, b], i) => [
    { text: h, options: { bold: true, color: "F6C27A", bullet: { indent: 14 } } },
    { text: b, options: { color: ICE, breakLine: i < pts.length - 1 } },
  ]), { isTextBox: true, x: cx + 0.4, y: 3.3, w: cwid - 0.8, h: 3.3, fontFace: BODY, fontSize: 14, margin: 0, valign: "top", paraSpaceAfter: 8 });
  s.addNotes("The 2% figure is a proposal and can be adjusted. Keeping the fund board-governed and separate from procurement protects both the company and every partner who supports it.");
}

const out = process.argv[2] || "Company_Vision_Goals.pptx";
pres.writeFile({ fileName: out }).then(() => console.log("wrote", out));
