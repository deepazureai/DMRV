// Content for the Sadak Setu proposal to the Road Construction Department, Government of Jharkhand.
// All money values are in ₹ lakh as [low, high] (1 crore = 100 lakh). Figures exclude GST.

const COMPANY = "Kirnova Technologies";
const CLIENT = "Road Construction Department (Path Nirman Vibhag), Government of Jharkhand";
const CLIENT_SHORT = "RCD, Government of Jharkhand";

// Effort model behind the price (person-months). Module effort excludes the shared platform,
// which is carried as its own line and spread across modules at 1.4x in the module prices.
const RATE = [1.1, 1.4]; // ₹ lakh per person-month, blended, fully loaded
const effort = [
  ["Shared platform: login & roles, audit trail, document store, workflow engine, dashboards, Hindi/English", 10],
  ["01 Smart Cost Estimation (incl. digital Schedule of Rates library)", 10],
  ["02 Auto-DPR Drafting", 13],
  ["03 Compliance Checker", 6],
  ["04 Cost Assurance", 3],
  ["05 Digital Approval Tracking", 8],
  ["06 Project Knowledge Base", 6],
  ["07 GIS Link-up (with the existing RCD GIS portal)", 4],
  ["Project management, testing, security hardening, user acceptance, training", 10],
];
const passThrough = [
  ["Digitisation of up to ~800 past DPRs (scanning, OCR, quality check)", [4, 7]],
  ["Independent security audit by a CERT-In-empanelled auditor", [3, 5]],
  ["AI model usage and cloud test environments during the build", [2, 4]],
  ["On-site presence in Ranchi, workshops and travel", [3, 5]],
];
const team = [
  ["Solution lead & project manager (civil engineering + IT)", "1", "10", 10],
  ["Highway domain engineer (IRC codes, SoR, DPR rules)", "1", "8", 8],
  ["Backend developers", "2", "10", 20],
  ["Frontend / mobile developer", "1.5", "9", 13],
  ["AI & data engineer", "1", "8", 8],
  ["GIS developer", "0.5", "4", 2],
  ["QA / test engineer", "1", "6", 6],
  ["DevOps & security (part-time)", "0.3", "10", 3],
];
const recurring = [
  ["Hosting: Jharkhand State Data Centre (largely absorbed by the state) or MeitY-empanelled Indian cloud", [5, 8]],
  ["AI usage (report drafting, smart search), SMS and e-mail alerts", [2, 4]],
  ["Annual maintenance: helpdesk, fixes, SoR and IRC rule updates, minor enhancements (15–18% of build)", [14, 20]],
];

const modules = [
  {
    code: "01", name: "Smart Cost Estimation", subtitle: "Benchmarking against past sanctions",
    tagline: "Every estimate compared with similar past projects before it reaches the approving officer.",
    dept: "RCD: Central Design Organisation (CDO), Chief Engineer (Communication), divisions; Finance",
    status: "Not started", statusDetail: "Estimates are built division by division. The last fully published RCD Schedule of Rates appears to be 2021–22, with current rates issued through tender notices, so rate application is manual and uneven.",
    phase: "Phase 1 (months 1–4)",
    problem: [
      "RCD's roads budget for 2026–27 is ₹6,601 crore, yet each estimate is prepared without a systematic comparison to what similar roads actually cost.",
      "Similar roads in similar terrain can carry very different per-km estimates, with nothing to flag or explain the gap.",
      "Current rates are spread across the last published SoR, circulars and tender notices, so the same item can be priced differently in two divisions.",
    ],
    intro: "A benchmarking engine trained on RCD's past DPRs and sanction orders. Enter the basics (road class, length, width, terrain, traffic, district) and it returns a benchmark cost and the closest comparable projects.",
    modules: [
      ["Digital rate library", "Current SoR items, circulars and approved rate analyses in one versioned library, applied automatically."],
      ["Explainable benchmark", "Shows which items make an estimate higher or lower than its peers, in plain language."],
      ["Outlier alerts", "Estimates far from the benchmark are flagged with the reason before approval."],
      ["Review dashboard", "All estimates across circles with comparison charts and a weekly Hindi/English review pack."],
    ],
    diff: "It learns from what RCD actually sanctioned, not from generic averages, and explains every number. The same engine powers Module 04, so cost assurance comes almost free.",
    phases: [
      ["Discover", "3 weeks", "Collect past DPRs and sanction orders; agree data access with CDO and Finance.", "Data baseline"],
      ["Pilot", "8 weeks", "Build rate library and benchmark for the top 3 road types; test in Ranchi circle.", "Live comparison dashboard"],
      ["Roll out", "6 weeks", "All circles; weekly review pack; connect to Modules 04 and 06.", "State-wide benchmarking"],
    ],
    benefitsGov: ["Every estimate checked against evidence before sanction.", "If better benchmarking trims even 0.5% off inflated estimates, that is about ₹30 crore a year on a ₹6,000 crore capital outlay.", "Audit trail ready for AG and vigilance review."],
    benefitsInd: ["Clear, consistent rate basis for consultants and contractors.", "Fewer disputes over estimate reasonableness.", "Engineers spend less time looking up rates."],
    cost: { build: [15, 20] },
    risks: [["Old DPR data is patchy", "Start with the 200 largest recent DPRs; show confidence levels; accuracy rises as data grows."], ["Seen as policing engineers", "Framed as decision support: it strengthens an estimate, it does not reject it."]],
  },
  {
    code: "02", name: "Auto-DPR Drafting", subtitle: "Assisted report generation",
    tagline: "A complete, standard-format DPR draft in days, from survey data.",
    dept: "RCD: CDO (design & estimation), divisions, empanelled DPR consultants",
    status: "Not started", statusDetail: "DPRs are prepared by divisions or empanelled consultants in varying formats. Pavement design and quantities live in individual spreadsheets.",
    phase: "Phase 2 (months 5–10)",
    problem: [
      "Much of every DPR (design basis, specifications, quantity build-up, standard chapters) is rewritten from scratch each time.",
      "Pavement design is done in personal spreadsheets; one wrong input carries through to the whole estimate. Mining-traffic corridors make this riskier.",
      "Forest-land, land-acquisition and utility-shifting sections are often thin, which later causes the delays Jharkhand road projects are known for.",
    ],
    intro: "From survey inputs (alignment, soil CBR, traffic counts, drainage), the system produces a full draft DPR in RCD's standard format, exportable to Word for review and signature.",
    modules: [
      ["Pavement design engine", "Layer thicknesses computed to IRC:37, including heavy-axle mining traffic; every input and result shown."],
      ["Bill of Quantities", "Quantities linked to the Module 01 rate library with automatic rate application."],
      ["Drafted narrative", "Standard chapters and project description drafted by AI, then edited and approved by the engineer."],
      ["Clearance chapter", "Structured sections for forest land, land acquisition and utilities, so gaps are visible at draft stage."],
    ],
    diff: "Engineering first, AI second: the design and costs come from IRC rules and RCD rates, while AI only drafts the prose. Consultants and divisions submit in one format, which makes review much faster.",
    phases: [
      ["Baseline", "3 weeks", "Pick the 3 most common project types; agree the standard format with CDO.", "Template library"],
      ["Pilot", "10 weeks", "Build design engine, BoQ and drafting; produce 10 DPRs in parallel with the normal process.", "10 assisted DPRs"],
      ["Roll out", "8 weeks", "All circles and consultants; connect to Modules 03 and 04; training.", "Standard DPR pipeline"],
    ],
    benefitsGov: ["Drafting time for common project types cut from weeks to days.", "One format across all 24 districts and all consultants.", "Fewer return-for-correction rounds."],
    benefitsInd: ["Consultants get a clear template and instant calculations.", "Projects reach tender sooner.", "Standardised estimates reduce tendering disputes."],
    cost: { build: [20, 26] },
    risks: [["Engineers distrust AI text", "AI drafts only the narrative; design and costs are rule-based; the engineer signs."], ["IRC editions change", "Design rules are versioned; new editions coded within weeks of notification."]],
  },
  {
    code: "03", name: "Compliance Checker", subtitle: "Automated standards verification",
    tagline: "Every DPR checked against the rules before it leaves the division.",
    dept: "RCD: CDO, Quality Control wing, divisions",
    status: "Manual review only", statusDetail: "Each level (division, circle, CDO) checks by hand. The same basic errors are caught late, after review time has been spent.",
    phase: "Phase 2 (months 5–10)",
    problem: [
      "Common return reasons (pavement thickness, carriageway width for the road class, drainage sizing, missing chapters) are mechanically checkable, yet checked by hand.",
      "There is no shared digital checklist, so reviewers apply their own interpretation.",
      "Forest-land and clearance gaps are spotted late, when they are most expensive to fix.",
    ],
    intro: "A rules engine that tests each DPR against IRC standards and RCD norms, and cites the clause for every failure.",
    modules: [
      ["Engineering rules", "Pavement thickness for traffic, width by road class, camber, drainage and culvert sizing."],
      ["Completeness rules", "All required chapters, drawings and annexures present before the file can move."],
      ["Clearance flags", "Alignment through forest land or sensitive areas flagged early for the clearance process."],
      ["Review bands", "Warn/fail bands rather than bare pass/fail; overrides need a recorded reason."],
    ],
    diff: "Not a paper checklist: each rule runs automatically, cites the standard and clause, and says exactly what failed and why.",
    phases: [
      ["Baseline", "2 weeks", "List the 15 most frequent return reasons with CDO.", "Rule catalogue"],
      ["Pilot", "6 weeks", "Automate 10 rules; run in shadow mode beside manual review.", "Validated rules"],
      ["Roll out", "6 weeks", "30+ rules; connect to Modules 02 and 05.", "State-wide checker"],
    ],
    benefitsGov: ["Checkable errors caught at source, not at CDO.", "Reviewers focus on engineering judgement.", "Every decision documented."],
    benefitsInd: ["Instant feedback to consultants on gaps.", "Predictable review timelines."],
    cost: { build: [9, 12] },
    risks: [["Rules too rigid for site conditions", "Review bands and documented overrides."], ["Officers feel second-guessed", "Shadow mode for one cycle before it becomes mandatory."]],
  },
  {
    code: "04", name: "Cost Assurance", subtitle: "Independent cost verification",
    tagline: "Three independent checks that catch what a single threshold cannot.",
    dept: "RCD: CDO, Finance, Vigilance",
    status: "Not started", statusDetail: "An estimate is checked mainly against its own build-up. There is no independent benchmark or peer comparison.",
    phase: "Phase 2 (months 5–10)",
    problem: [
      "A fixed-percentage check cannot tell difficult terrain from an inflated estimate.",
      "No one compares the item-wise total with an independent benchmark or with per-km costs of similar sanctioned roads.",
      "Manual changes to system-generated figures are not tracked.",
    ],
    intro: "A verification layer on top of Module 01 that attaches a one-page assurance report to every DPR.",
    modules: [
      ["Check 1: build-up vs benchmark", "Item-wise total compared with the Module 01 benchmark."],
      ["Check 2: override tracking", "Any manual change to computed figures is logged and graded."],
      ["Check 3: peer comparison", "Per-km cost against similar sanctioned roads in the same region."],
    ],
    diff: "Three views of cost from three angles, recorded in a report reviewers and auditors can rely on. It reuses Module 01, which is why it costs so little.",
    phases: [
      ["Build", "4 weeks", "Assemble peer database; build the three checks.", "Assurance report"],
      ["Validate", "4 weeks", "Shadow mode against recent sanctions; calibrate thresholds.", "Calibrated checks"],
    ],
    benefitsGov: ["Evidence-based verification on every DPR.", "Vigilance-ready trail of checks and overrides."],
    benefitsInd: ["Engineers see where their estimate sits against peers.", "Fewer post-sanction revisions."],
    cost: { build: [5, 6] },
    risks: [["Too many alerts early on", "Shadow mode and calibration before go-live."], ["Too few comparable projects", "The report says so, rather than making a weak comparison."]],
  },
  {
    code: "05", name: "Digital Approval Tracking", subtitle: "DPR workflow with deadlines",
    tagline: "Every DPR tracked from submission to sanction, with automatic escalation.",
    dept: "RCD: all divisions and circles, CDO, Engineer-in-Chief, Secretariat; Finance",
    status: "File-based", statusDetail: "DPR files move Division → Circle → CDO → Engineer-in-Chief → Department → Finance. There is no DPR-specific tracker with stage deadlines (to be confirmed with the Department).",
    phase: "Phase 1 (months 1–4)",
    problem: [
      "No one can see, at a glance, where every DPR is and how long it has been there.",
      "No stage deadlines are enforced; files can wait for weeks without escalation.",
      "Returned DPRs carry handwritten remarks that are hard to act on.",
    ],
    intro: "A DPR-specific workflow with stage deadlines, role-based queues and automatic escalation. It complements, and can link to, the state's e-Office.",
    modules: [
      ["Role-based queues", "Each officer sees only what needs action, with countdown timers."],
      ["Stage deadlines", "Agreed days per stage, with alerts at 80% and 100% of the time allowed."],
      ["Gatekeeping", "A DPR cannot enter the chain without its compliance and cost-assurance reports."],
      ["Clear returns", "Specific sections marked for correction, not generic remarks."],
    ],
    diff: "Not e-Office with a DPR label: stages cannot be skipped, deadlines escalate automatically, and approvals carry the evidence from Modules 03 and 04.",
    phases: [
      ["Map", "3 weeks", "Document the real approval chain in 2 circles; set deadlines from observed data.", "Process map"],
      ["Pilot", "8 weeks", "Workflow and dashboards live in Ranchi circle; SMS alerts.", "Live tracking"],
      ["Roll out", "6 weeks", "All circles; Secretary's dashboard; training for all roles.", "State-wide tracking"],
    ],
    benefitsGov: ["Real-time pipeline for the Secretary and Engineer-in-Chief.", "Approval time targeted to fall from months to weeks.", "Bottleneck analytics by stage and office."],
    benefitsInd: ["Submitters see status without phone calls.", "Faster correction and resubmission."],
    cost: { build: [12, 16] },
    risks: [["Parallel paper files continue", "Final sanction requires the digital record, so upstream adoption follows."], ["Weak connectivity in field offices", "Light web app, SMS alerts, offline drafts that sync later."]],
  },
  {
    code: "06", name: "Project Knowledge Base", subtitle: "Searchable archive of past projects",
    tagline: "Twenty-five years of project memory, searchable in seconds.",
    dept: "RCD: CDO, divisions, record rooms at Project Bhawan and circle offices",
    status: "Paper archives", statusDetail: "Past DPRs and sanctions since the state's formation in 2000 sit in record rooms. They cannot be searched or compared.",
    phase: "Phase 1 (months 1–4)",
    problem: [
      "Knowledge leaves with officers on transfer; similar past work is hard to find.",
      "Engineers cannot quickly pull comparable DPRs for reference or cost comparison.",
      "Modules 01 and 04 need historical data that is not yet digital.",
    ],
    intro: "A digitised, AI-searchable archive of DPRs and sanction orders that becomes the data foundation for cost benchmarking.",
    modules: [
      ["Meaning-based search", "\"Two-lane road with a minor bridge in hilly forest terrain\" finds relevant projects even with different wording."],
      ["Comparable projects", "Per-km cost of the five most similar sanctioned projects for any new proposal."],
      ["Reference library", "Full past DPRs one click away while drafting."],
    ],
    diff: "Not a filing system: it understands what each project is, which is what makes similarity search and cost comparison possible.",
    phases: [
      ["Inventory", "3 weeks", "Survey record rooms; prioritise recent, high-value and common project types.", "Digitisation plan"],
      ["Digitise", "10 weeks", "Scan and index up to ~800 DPRs; build search; pilot with engineers.", "Searchable archive"],
      ["Run", "Ongoing", "Every newly sanctioned DPR added automatically.", "Self-growing archive"],
    ],
    benefitsGov: ["Institutional memory survives transfers.", "Feeds Modules 01 and 04, improving accuracy over time."],
    benefitsInd: ["Consultants calibrate estimates against approved precedent.", "Fewer disputes about past approvals."],
    cost: { build: [9, 12], digitisation: [4, 7] },
    risks: [["Poor condition of old files", "Start with digital and recent files; manual correction where OCR fails."], ["Circles reluctant to share", "Read-only central access; circles keep ownership."]],
  },
  {
    code: "07", name: "GIS Link-up", subtitle: "DPR pipeline on RCD's existing map",
    tagline: "Every proposal and sanction placed on the road map RCD already uses.",
    dept: "RCD GIS cell; CDO; Forest, Environment & Climate Change Department (layers); JAP-IT",
    status: "GIS portal exists", statusDetail: "RCD already runs a GIS portal for State Highways and Major District Roads. It is not linked to DPRs in preparation or under approval.",
    phase: "Phase 2 (months 5–10)",
    problem: [
      "Planning decisions use lists and tables; proposals are not visible on the network map.",
      "Two proposals on the same stretch, or proposals crossing forest land and elephant corridors, are spotted late.",
    ],
    intro: "We extend, not replace, the existing RCD GIS: DPR and approval-stage layers plus early conflict checks.",
    modules: [
      ["Pipeline layer", "Proposed, under-approval and sanctioned DPRs on their road segments, with cost and stage."],
      ["Overlap alerts", "Automatic flag when two proposals target the same stretch."],
      ["Sensitivity overlay", "Forest land and wildlife-corridor layers (where shared) to flag clearance needs at DPR stage."],
    ],
    diff: "Reuses what the state has already paid for. The value is in the link to the live DPR pipeline, not in another map.",
    phases: [
      ["Integrate", "4 weeks", "Connect to RCD GIS; locate existing DPRs on segments.", "Linked layers"],
      ["Extend", "4 weeks", "Overlap alerts, sensitivity overlay, district and circle views.", "Planning map"],
    ],
    benefitsGov: ["Duplicate spending on the same stretch avoided.", "Forest and corridor conflicts caught before DPRs are finalised."],
    benefitsInd: ["Contractors see upcoming work by district.", "Citizens can see which roads are being improved."],
    cost: { build: [6, 8] },
    risks: [["Limited access to the GIS portal", "Integration agreed with the RCD GIS cell and JAP-IT in week one; fallback is a lightweight layer on open base maps."]],
  },
];

const sources = [
  ["RCD Jharkhand: road network achievements (12,736 km; SH 1,231.9 km; MDR 4,845.7 km)", "https://rcd.jharkhand.gov.in/achivements.php"],
  ["RCD Jharkhand: organisation (Engineer-in-Chief; CE, Central Design Organisation)", "https://rcd.jharkhand.gov.in/organisation.php"],
  ["RCD GIS portal", "https://gis.jharkhand.gov.in/rcd_portal/index.php"],
  ["Jharkhand Budget 2026–27 (Drishti IAS): RCD ₹6,601.28 crore; RWD ₹5,081.74 crore", "https://www.drishtiias.com/state-pcs-current-affairs/jharkhand-budget-202627"],
  ["Jharkhand Budget Analysis 2026–27 (PRS India)", "https://prsindia.org/budgets/states/jharkhand-budget-analysis-2026-27"],
  ["Jharkhand Budget 2026–27 overview (Elets eGov)", "https://egov.eletsonline.com/2026/02/jharkhand-budget-2026-27-unveils-%E2%82%B91-58-lakh-crore-plan-focused-on-welfare-infrastructure-and-economic-growth/"],
  ["Jharkhand RCD Schedule of Rates status (CivilShape)", "https://www.civilshape.in/2025/06/Jharkhand-Road-Construction-Department-SOR-Updated-in-2025-Jharkhand-RCD-SOR.html"],
  ["State-wise Schedule of Rates 2026 (InfraLens)", "https://infralens.in/knowledge/state-wise-sor-india-2026"],
  ["Jharkhand State Roads Project: forest land along project roads (ADB)", "https://www.adb.org/sites/default/files/project-documents//40005-ind-siee.pdf"],
  ["JAP-IT: nodal e-governance agency, State Data Centre", "https://japit.jharkhand.gov.in/"],
];

module.exports = { COMPANY, CLIENT, CLIENT_SHORT, RATE, effort, passThrough, team, recurring, modules, sources };
