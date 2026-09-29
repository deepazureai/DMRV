// Content for the Sadak Setu proposal to the Road Construction Department, Government of Jharkhand.
// Money values are in ₹ lakh as [low, high] (1 crore = 100 lakh). Figures exclude GST.

const COMPANY = "Kirnova Technologies";
const CLIENT = "Road Construction Department, Government of Jharkhand";
const CLIENT_SHORT = "RCD, Government of Jharkhand";
const ROADS_BUDGET_CR = 6601; // RCD roads allocation 2026-27, ₹ crore

const modules = [
  {
    code: "01", name: "Smart Cost Estimation", subtitle: "AI-powered benchmarking",
    tagline: "Every estimate compared against similar past projects before it reaches the approving officer.",
    solves: "No benchmarking; estimates vary widely for similar roads", statusShort: "Manual, no comparison system",
    dept: "RCD: Central Design Organisation (CDO); Chief Engineer (Communication); Finance; JAP-IT",
    status: "Not started.", statusDetail: "Each division or DPR consultant prepares estimates manually. No system compares a new estimate with similar past sanctions. The last fully published RCD Schedule of Rates appears to be 2021–22, with later rates issued through circulars and tender notices.",
    timeline: "Pilot 10–12 weeks · Full rollout 5–6 months",
    problem: [
      "RCD has ₹6,601 crore for roads in 2026–27, yet every cost estimate is built from scratch with no comparison to what similar projects actually cost.",
      "Two similar roads in similar terrain can carry very different per-km estimates, with no system to flag or explain the gap.",
      "Rates come from the last published SoR, later circulars and tender notices, so the same item can be priced differently in two divisions.",
      "Review meetings rely on figures compiled by hand from paper files and spreadsheets across circles.",
    ],
    intro: "An AI system trained on RCD's past DPRs and sanction orders. Given a new project's basic details (road class, length, width, terrain, traffic, district), it generates a benchmark cost and shows how it compares with similar approved projects.",
    items: [
      ["Plain-language explanations", "Shows exactly why a project costs more or less than comparable ones, and which items drive the difference."],
      ["Digital rate library", "Current SoR items, circulars and approved rate analyses in one versioned library, applied automatically."],
      ["Outlier alerts", "Estimates significantly above or below expectation are flagged with an explanation before they reach the approver."],
      ["Review dashboard", "A live view of estimates across circles, with comparison charts and a weekly review pack in Hindi and English."],
    ],
    diff: "Most estimation tools apply fixed rules or averages. This system learns from what RCD actually sanctioned and explains every figure in plain language. It also powers Module 04 (Cost Assurance), so independent cost verification needs little extra effort.",
    phases: [
      ["0. Discovery", "3 weeks", "Map DPR archives at Project Bhawan and circle offices; agree data access with CDO and Finance.", "Baseline assessment"],
      ["1. Pilot", "8–10 weeks", "Digitise the top 200 past DPRs; build the rate library and benchmark; pilot in Ranchi circle.", "Live cost comparison dashboard"],
      ["2. Rollout", "3–4 months", "All circles; weekly review pack; connect to Modules 04 and 06.", "State-wide benchmarking"],
      ["3. Run", "Ongoing", "Benchmark refreshed quarterly with new sanctions; monthly accuracy reports.", "Monthly insights"],
    ],
    method: ["Hosting", "Jharkhand State Data Centre (JAP-IT) or a government-approved cloud, with role-based access and a full audit trail."],
    benefitsGov: [
      "Every estimate compared with similar past projects before approval",
      "Evidence-based review for the Secretary and Engineer-in-Chief",
      "Target: trimming even 0.5% from inflated estimates saves about ₹30 crore a year on a ₹6,000 crore capital outlay",
      "Full audit trail for AG and vigilance review",
    ],
    benefitsInd: [
      "Clear benchmarks for consultants and contractors",
      "Transparent cost basis reduces disputes during tendering",
      "Engineers freed from manual rate lookups for field supervision",
    ],
    cost: { pilot: [7, 9], rollout: [10, 14], infra: [1, 2], om: [3, 4] },
    costNote: "Hosting in the State Data Centre or a government-approved cloud.",
    risks: [
      ["Historical data quality varies", "Start with the 200 highest-value recent DPRs; combine scanning with manual validation; accuracy improves as data grows."],
      ["Officers see it as surveillance", "Positioned as decision support: it helps engineers strengthen their estimates and does not replace their judgement."],
      ["Rates change mid-year", "The rate library is versioned; benchmarks recalibrate automatically when circulars change rates."],
    ],
  },
  {
    code: "02", name: "Auto-DPR Drafting", subtitle: "AI-assisted report generation",
    tagline: "Complete DPR drafts in days instead of months, from survey data to a ready document.",
    solves: "Weeks of repetitive drafting; inconsistent formats", statusShort: "Manual process",
    dept: "RCD: CDO; divisions; empanelled DPR consultants; JAP-IT",
    status: "Not started.", statusDetail: "DPRs are drafted by divisions or empanelled consultants in varying formats. Much of the content repeats across similar projects, yet each is written from scratch.",
    timeline: "Pilot 12 weeks · Full rollout 5–6 months (top 5 project types)",
    problem: [
      "A typical DPR takes weeks of engineering time to assemble, much of it repetitive chapters and calculations.",
      "Divisions and consultants use different formats, so CDO reviewers spend time finding information before checking it, and DPRs come back for corrections.",
      "Pavement design is done in individual spreadsheets; one input error cascades through the estimate. Heavy coal and mineral traffic on some corridors makes this riskier.",
      "Forest-land, land-acquisition and utility-shifting sections are often incomplete, which later causes delays during execution.",
    ],
    intro: "Given survey data (alignment, soil conditions, traffic, drainage), the system generates a complete draft DPR in RCD's standard format, downloadable as a Word document:",
    items: [
      ["Automated pavement design", "Layer thicknesses calculated to IRC:37, including heavy-axle mining traffic, with no manual spreadsheet work."],
      ["Complete Bill of Quantities", "Items linked to the Module 01 rate library with automatic rate application."],
      ["AI-written narrative", "Executive summary, justification and site description drafted by AI; engineers review and edit instead of writing from scratch."],
      ["Clearance chapter", "Structured sections for forest land, land acquisition and utilities, so gaps are visible at draft stage."],
      ["One-click Word export", "Standard RCD format, checked against Module 01 benchmarks before export."],
    ],
    diff: "This is not a template filler. The system designs the pavement from IRC rules, prices it from RCD rates, and uses AI only to write the narrative. The engineer's role shifts from document assembly to engineering review.",
    phases: [
      ["0. Baseline", "3 weeks", "Collect the top 5 DPR types by volume; agree the standard format with CDO.", "DPR template library"],
      ["1. Pilot", "10–12 weeks", "Build the design engine, BoQ generator and AI narrative; pilot in Ranchi circle on 3 project types.", "10–15 AI-drafted DPRs"],
      ["2. Rollout", "4–5 months", "All 5 project types, all circles and consultants; connect to Modules 03 and 04; training workshops.", "State-wide DPR automation"],
      ["3. Run", "Ongoing", "Template updates, rate synchronisation, quarterly accuracy review.", "Continuous improvement"],
    ],
    method: ["Output", "Bilingual (Hindi and English). Hosted in the Jharkhand State Data Centre or a government-approved cloud."],
    benefitsGov: [
      "DPR drafting time for common project types cut from weeks to days",
      "Consistent format and calculations across all 24 districts and all consultants",
      "Senior engineering time freed for field supervision instead of paperwork",
      "Fewer return-for-correction rounds with built-in checks",
    ],
    benefitsInd: [
      "Consultants receive clear, standardised DPR templates",
      "Faster DPR-to-tender pipeline gets projects to construction sooner",
      "Standardised estimates reduce tendering disputes",
    ],
    cost: { pilot: [8, 10], rollout: [14, 19], infra: [2, 3], om: [3.5, 5] },
    costNote: "Infrastructure includes AI usage for narrative drafting.",
    risks: [
      ["Engineers resist AI-drafted DPRs", "AI drafts only the narrative; design and costs are rule-based. The engineer reviews and signs, and every edit is tracked."],
      ["Engineering standards change", "Design rules are version-controlled; new IRC editions are coded within weeks of notification."],
      ["Site-specific conditions not captured", "Site observations, photographs and local conditions are always added by the engineer."],
    ],
  },
  {
    code: "03", name: "Compliance Checker", subtitle: "Automated standards verification",
    tagline: "Every DPR checked against engineering rules before it leaves the division.",
    solves: "DPRs returned for errors that could be caught early", statusShort: "Manual review only",
    dept: "RCD: CDO; Quality Control wing; divisions",
    status: "Manual review only.", statusDetail: "Errors are caught late, at circle or CDO level, after review time has already been spent at earlier stages. No automated checking exists.",
    timeline: "Pilot 8–10 weeks · Full rollout 3–4 months",
    problem: [
      "DPRs are reviewed by hand at each level (Division → Circle → CDO). The same basic errors are caught late, wasting review time at every level.",
      "The most common return reasons (pavement thickness, carriageway width for the road class, drainage sizing, missing chapters) are mechanically checkable.",
      "Alignments through forest land or sensitive areas are often identified late, when clearance delays are hardest to absorb.",
      "No standard digital checklist exists, so each reviewer applies their own interpretation.",
    ],
    intro: "An automated checker that verifies every DPR against IRC standards and RCD norms before it leaves the division:",
    items: [
      ["Pavement thickness", "Road layers meet minimum standards for the expected traffic."],
      ["Road width", "Carriageway and formation width match the road's classification."],
      ["Drainage sizing", "Drains and culverts are correctly sized for the catchment."],
      ["Clearance flags", "Alignments crossing forest land are flagged early for the clearance process."],
      ["Complete documentation", "All required chapters, drawings and annexures are present before the file can move forward."],
    ],
    diff: "This is not a checklist on paper. Each rule runs automatically, cites the standard and clause it checks, and tells the officer exactly what failed and why.",
    phases: [
      ["0. Baseline", "3 weeks", "List the top 15 return reasons across circles; agree the rules with CDO.", "Rule catalogue"],
      ["1. Pilot", "8–10 weeks", "Automate the first rules; run alongside manual review to validate.", "10 rules automated"],
      ["2. Rollout", "2–3 months", "30+ rules; connect to Modules 02 and 05; training workshops.", "State-wide checker"],
      ["3. Run", "Ongoing", "New rules added when standards are updated.", "Always-current rules"],
    ],
    method: ["Approach", "Each rule cites the standard, clause and threshold. Runs in shadow mode before going live."],
    benefitsGov: [
      "Return cycles for checkable errors reduced to near zero",
      "Reviewers freed to focus on engineering judgement",
      "Full audit trail protects officers and supports accountability",
      "Clearance issues surfaced at the earliest stage",
    ],
    benefitsInd: [
      "DPRs that pass move faster, with predictable timelines",
      "Consultants get instant feedback on gaps",
      "Clear compliance report for every DPR",
    ],
    cost: { pilot: [4, 5], rollout: [6, 9], infra: [0.5, 1], om: [1.5, 2.5] },
    costNote: "",
    risks: [
      ["Rules too rigid for field conditions", "Each rule has a review band, not just pass/fail. Engineers can override with a documented reason."],
      ["Standards change faster than the system", "Rule updates are coded within two weeks of notification under maintenance."],
      ["Officers see it as replacing judgement", "Shadow mode for one cycle before it becomes mandatory."],
    ],
  },
  {
    code: "04", name: "Cost Assurance", subtitle: "Independent cost verification",
    tagline: "Three independent checks that catch what a single threshold cannot.",
    solves: "No independent check that an estimate is reasonable", statusShort: "No system exists",
    dept: "RCD: CDO; Finance; Vigilance",
    status: "Not started.", statusDetail: "An estimate is checked mainly against its own build-up, which is a circular check. No independent benchmark or peer comparison exists.",
    timeline: "Pilot 6–8 weeks (builds on Module 01) · Full rollout 2–3 months",
    problem: [
      "A fixed-percentage check cannot tell genuine cost variation (difficult terrain, mining traffic) from estimate inflation.",
      "The item-wise total and an independent benchmark are never compared today.",
      "There is no way to compare a project's cost per km with similar sanctioned projects in the same region.",
      "When an engineer changes a system-generated figure, the change is not tracked.",
    ],
    intro: "A verification layer that cross-checks each estimate from three angles and attaches an assurance report to every DPR before approval:",
    items: [
      ["Check 1: item-wise vs benchmark", "The detailed cost total is compared with the Module 01 benchmark; significant gaps are flagged with an explanation."],
      ["Check 2: manual override detection", "Changes to system-generated figures are flagged; small changes get a notice, large ones a warning."],
      ["Check 3: peer comparison", "Cost per km compared with similar sanctioned projects of the same road class and region."],
    ],
    diff: "Three independent checks, each looking at cost from a different angle, together provide an assurance layer that no manual review can match at scale.",
    phases: [
      ["0. Data prep", "2 weeks", "Requires Module 01. Assemble a database of sanctioned projects with cost per km.", "Peer database"],
      ["1. Pilot", "6–8 weeks", "Build the three checks; attach reports to pilot DPRs; validate against manual review.", "Assurance reports on pilot DPRs"],
      ["2. Rollout", "1–2 months", "All circles; connect to Modules 03 and 05; dashboard for Finance.", "State-wide cost assurance"],
      ["3. Run", "Ongoing", "Thresholds recalibrated quarterly; anomaly report for the Secretary.", "Quarterly assurance report"],
    ],
    method: ["Approach", "A verification layer on the Module 01 infrastructure; no separate system is required."],
    benefitsGov: [
      "Independent, evidence-based cost verification on every DPR",
      "Vigilance-ready trail of every check, threshold and override",
      "Target: every DPR with a cost anomaly flagged before it reaches the Secretary",
      "Accuracy improves automatically as more projects are sanctioned",
    ],
    benefitsInd: [
      "Engineers see where their estimate stands against peers",
      "Transparent benchmarking builds trust in estimates",
      "Fewer post-sanction disputes and revisions",
    ],
    cost: { pilot: [2, 3], rollout: [3, 4], infra: [0.5, 1], om: [1, 1.5] },
    costNote: "Builds on Module 01 infrastructure, so only incremental hosting is needed.",
    risks: [
      ["Too many false alerts initially", "Shadow mode for one cycle; calibrate against known-good sanctions."],
      ["Finance sees it as encroachment", "Designed jointly with Finance from Phase 0; the report supports their review and does not replace it."],
      ["Too few comparable projects", "The report says so explicitly rather than making a misleading comparison."],
    ],
  },
  {
    code: "05", name: "Digital Approval Tracking", subtitle: "Paperless approval with deadlines",
    tagline: "Every DPR tracked from submission to sanction, with automatic escalation when delays occur.",
    solves: "Physical file movement; no visibility into delays", statusShort: "File-based",
    dept: "RCD: all divisions and circles; CDO; Engineer-in-Chief; Department Secretariat; Finance; JAP-IT",
    status: "File-based.", statusDetail: "DPR files move Division → Circle → CDO → Engineer-in-Chief → Department → Finance. No DPR-specific system shows which file is where or how long it has been there (to be confirmed with the Department).",
    timeline: "Pilot 10–12 weeks · Full rollout 4–5 months",
    problem: [
      "File movement through several approval stages takes months, and nobody can see the full pipeline at a glance.",
      "No stage deadlines are enforced; a file can wait for weeks without escalation.",
      "Returned DPRs carry handwritten remarks, and submitters often cannot tell exactly what to fix.",
      "Many roles, from Junior Engineer to Secretary, act on DPRs, but there is no role-based view or priority queue.",
    ],
    intro: "A digital approval system that moves every DPR through a defined chain (Draft → Division → Circle → CDO → Engineer-in-Chief → Department → Sanctioned) with clear deadlines and automatic escalation. It complements, and can link to, the state's e-Office:",
    items: [
      ["Role-based dashboards", "Each officer sees only the DPRs needing action, with countdown timers and overdue items flagged."],
      ["Deadline enforcement", "Agreed days per stage, set from observed data, with automatic escalation at 80% and 100% of the time allowed."],
      ["Priority queuing", "The most urgent and highest-value items surface first."],
      ["Clear return feedback", "Specific sections needing correction are highlighted, with no ambiguity."],
    ],
    diff: "This is not e-Office with a DPR label. Stages cannot be skipped, deadlines escalate automatically, and a DPR cannot enter the chain until its compliance and cost-assurance reports (Modules 03–04) are attached.",
    phases: [
      ["0. Map", "3 weeks", "Document the actual approval chain in 2 circles; identify bottlenecks; agree deadline targets with the Engineer-in-Chief.", "Process map and deadlines"],
      ["1. Pilot", "10–12 weeks", "Build the approval system and dashboards; pilot in Ranchi circle; connect to Modules 02–04.", "Live digital approval for one circle"],
      ["2. Rollout", "3–4 months", "All circles; mobile and SMS alerts; Secretary's dashboard; training for all roles.", "State-wide digital approvals"],
      ["3. Run", "Ongoing", "Deadline tuning, bottleneck analytics, quarterly reports.", "Monthly pipeline analytics"],
    ],
    method: ["Approach", "Web-based with SMS and e-mail alerts; offline drafts sync when connectivity returns."],
    benefitsGov: [
      "Real-time view of every DPR for the Secretary and Engineer-in-Chief",
      "Approval time targeted to fall from months to weeks",
      "Clear return feedback reduces back-and-forth",
      "Analytics show which stage, office and project type cause delays",
    ],
    benefitsInd: [
      "Submitters see status in real time, with no phone calls",
      "Clear feedback means faster correction and resubmission",
      "A digital trail replaces physical file tracking",
    ],
    cost: { pilot: [5, 7], rollout: [8, 11], infra: [1, 2], om: [2, 3] },
    costNote: "Infrastructure includes the SMS gateway for deadline alerts.",
    risks: [
      ["Officers bypass the system", "Final sanction requires the digital record, so upstream adoption follows."],
      ["Poor connectivity in field offices", "Light web app, offline drafts and SMS fallback for alerts."],
      ["Deadlines are unrealistic", "Set from observed turnaround times in Phase 0 and tuned quarterly."],
    ],
  },
  {
    code: "06", name: "Project Knowledge Base", subtitle: "Searchable archive of all past projects",
    tagline: "Every past DPR and sanction order, searchable in seconds: institutional memory that survives transfers.",
    solves: "Past DPRs not searchable; knowledge lost on transfer", statusShort: "Paper archives only",
    dept: "RCD: CDO; divisions; record rooms at Project Bhawan and circle offices",
    status: "Paper archives only.", statusDetail: "DPRs and sanction orders from the 25 years since the state's formation sit in record rooms. They cannot be searched or compared.",
    timeline: "Pilot 8–10 weeks · Full rollout 3–4 months",
    problem: [
      "Institutional memory leaves with officers on transfer; the engineer who designed a similar road is now elsewhere, and the DPR is in a cabinet.",
      "An engineer preparing a new DPR cannot quickly find similar past projects for reference or cost comparison.",
      "The cost benchmarking in Modules 01 and 04 needs historical data that is not yet in searchable form.",
    ],
    intro: "A digital archive of past DPRs and sanction orders, with AI search that understands content, not just keywords:",
    items: [
      ["Smart search", "\"Two-lane road with a minor bridge in hilly forest terrain\" finds relevant projects even when the words differ."],
      ["Cost comparison", "For any new project, the cost per km of the five most similar sanctioned projects."],
      ["Reference library", "Complete past DPRs one click away while drafting."],
      ["Data foundation", "Feeds Modules 01 and 04 with the historical data they need."],
    ],
    diff: "This is not a filing system. The AI understands what each project is about, which makes similarity search and cost comparison possible.",
    phases: [
      ["0. Inventory", "3 weeks", "Survey record rooms; prioritise recent, high-value and common project types.", "Digitisation plan"],
      ["1. Pilot", "8–10 weeks", "Scan and index the first 300 DPRs; build search; pilot with engineers in Ranchi circle.", "Searchable archive of 300 DPRs"],
      ["2. Rollout", "2–3 months", "Up to ~800 DPRs; all circles; connect to Modules 01, 02 and 04.", "State-wide knowledge base"],
      ["3. Run", "Ongoing", "Every newly sanctioned DPR added automatically.", "Self-growing archive"],
    ],
    method: ["Approach", "Paper DPRs scanned and digitised with OCR; AI search and similarity matching; hosted in the State Data Centre."],
    benefitsGov: [
      "Institutional memory preserved through transfers",
      "Comparable projects found in seconds instead of days",
      "Feeds Modules 01 and 04, improving accuracy over time",
      "A structured view of the Department's project history",
    ],
    benefitsInd: [
      "Consultants can calibrate estimates against approved precedent",
      "Transparent record reduces disputes about past approvals",
    ],
    cost: { pilot: [8, 11], rollout: [7, 10], infra: [1.5, 2], om: [2, 2.5] },
    costNote: "Includes scanning and OCR of up to ~800 past DPRs.",
    risks: [
      ["Archive condition is poor", "Start with digital and recent files; manual correction where OCR fails."],
      ["Search results are imprecise", "Combined AI and keyword search; engineer feedback improves ranking."],
      ["Circles reluctant to share", "Read-only central access; circles retain ownership of their records."],
    ],
  },
  {
    code: "07", name: "GIS Road Map", subtitle: "Interactive map of all roads and projects",
    tagline: "One map linking every road to its project status, cost and approval stage.",
    solves: "Road map not linked to DPR status and budget", statusShort: "GIS portal, not linked to DPRs",
    dept: "RCD GIS cell; CDO; Forest, Environment & Climate Change Department (layers); JAP-IT",
    status: "GIS portal exists, not linked to DPRs.", statusDetail: "RCD already runs a GIS portal for State Highways and Major District Roads. It does not show DPRs in preparation or under approval.",
    timeline: "Pilot 6–8 weeks · Full rollout 2 months",
    problem: [
      "RCD's 12,736 km network has no single view linking roads to DPRs in preparation, approval stage and budget.",
      "Planning decisions (which roads to prioritise, where to allocate budget) are made from tables and lists.",
      "Overlaps, where two proposals target the same stretch, and conflicts with forest land or elephant corridors are caught late.",
    ],
    intro: "An extension of RCD's existing GIS that shows every road segment, active DPR, approval status and cost on one screen:",
    items: [
      ["Project overlay", "Proposed, under-approval and sanctioned DPRs on their road segments; click any road to see details."],
      ["Filtering", "By circle, district, road class or project status; the Secretary sees the state, the Superintending Engineer their circle."],
      ["Overlap detection", "Automatic alert when two proposals target the same stretch."],
      ["Sensitivity overlay", "Forest land and wildlife-corridor layers, where shared, to flag clearance needs at DPR stage."],
    ],
    diff: "This is not another map viewer. It builds on the GIS the state already has and connects it to the live DPR pipeline, turning it into a planning tool.",
    phases: [
      ["0. Data prep", "2 weeks", "Connect to the RCD GIS portal; locate existing DPRs on road segments.", "Road–DPR linked dataset"],
      ["1. Pilot", "6–8 weeks", "Project and approval layers; connect to Module 05 for live status; pilot in Ranchi circle.", "Linked map for one circle"],
      ["2. Rollout", "1–2 months", "All circles; overlap detection; sensitivity overlay; budget heat map.", "State-wide planning map"],
      ["3. Run", "Ongoing", "New DPRs appear automatically; layers refreshed with the GIS cell.", "Living infrastructure map"],
    ],
    method: ["Approach", "Built on the existing RCD GIS portal and open GIS standards, integrated with JAP-IT."],
    benefitsGov: [
      "One visual view of the network linked to project status",
      "Overlap detection prevents duplicate spending on the same stretch",
      "Forest and corridor conflicts caught before DPRs are finalised",
      "Budget allocation visible by district",
    ],
    benefitsInd: [
      "Contractors see where work is active and upcoming",
      "Citizens can see which roads in their district are being improved",
    ],
    cost: { pilot: [2, 3], rollout: [4, 6], infra: [0.5, 1], om: [1, 1.5] },
    costNote: "Reuses the existing RCD GIS portal, so no new map platform is purchased.",
    risks: [
      ["Road data is incomplete", "Start with State Highways and Major District Roads (best data); gaps are flagged, not hidden."],
      ["Limited access to the GIS portal", "Integration agreed with the GIS cell and JAP-IT in week one; fallback is a lightweight layer on open base maps."],
      ["Map data becomes outdated", "New DPRs update the map automatically; regular refresh with the GIS cell."],
    ],
  },
];

const intro = "Jharkhand's Road Construction Department manages a 12,736 km network across 24 districts, with ₹6,601 crore for roads in 2026–27. Every road project begins with a Detailed Project Report (DPR): a document that today is drafted in varying formats, priced by hand, checked manually at several levels, moved as a physical file and never systematically compared with similar past projects. The seven modules below address each stage of this process, from cost estimation to final approval, and each one directly saves time, money or risk.";

const fitTogether = "Smart Cost Estimation (01) benchmarks every project at inception. Auto-DPR Drafting (02) generates a complete report in days instead of months. The Compliance Checker (03) catches errors before the DPR leaves the division. Cost Assurance (04) independently verifies that the estimate is reasonable. Digital Approval Tracking (05) moves the DPR through a paperless approval chain with deadline enforcement. The Knowledge Base (06) makes every past project searchable. The GIS Road Map (07) places every project on RCD's map. Each can be built on its own, but they share a common platform and dashboard, so every module added makes the others more useful.";

const startingPoints = [
  ["01 Smart Cost Estimation", "the foundation. Digitise past DPRs, build the benchmark and deliver a cost comparison dashboard within months, giving immediate visibility to the Secretary and Engineer-in-Chief."],
  ["04 Cost Assurance", "builds on Module 01. Once benchmarking is live, adding independent cost verification needs minimal extra effort."],
  ["02 Auto-DPR Drafting", "the biggest time saver. Pilot with the 3 most common project types in Ranchi circle to demonstrate the reduction in drafting time."],
];

const workWith = [
  ["Start small, prove value", "A 6–8 week proof of concept using the Department's own data. Scale up only after results are visible."],
  ["Transparent procurement", "Engagement through GeM, JAP-IT or an empanelled system integrator. Rollouts through open tender."],
  ["Data stays with the state", "Hosting in the Jharkhand State Data Centre (JAP-IT) or a government-approved Indian cloud. Compliant with the DPDP Act 2023."],
  ["Security first", "Independent security audit before every go-live. Role-based access and tamper-proof audit logs."],
  ["No vendor lock-in", "Open-source technology, source code in escrow, full documentation and training for state officers."],
  ["Hindi and English", "All screens, reports and training material in Hindi and English."],
  ["Pay for outcomes", "Every contract carries measurable targets (approval days, DPRs generated, cost accuracy) with monthly reports."],
  ["Built for Jharkhand", "Delivery team based in Kolkata with on-site presence in Ranchi, and internships for students from Jharkhand engineering colleges."],
];

const assumptions = [
  "Prices cover design, development, integration, project management, on-site support in Ranchi, training, and contingency for data-quality and integration work.",
  "Prices assume the seven modules are delivered together on one shared platform; modules bought separately may cost more.",
  "Pilot = initial proof of concept; Rollout = state-wide deployment. Annual maintenance is typically 15–20% of build cost.",
  "If hosted in the Jharkhand State Data Centre, part of the infrastructure cost is absorbed by the state.",
  "All amounts exclude GST and are indicative (±25%) until scoped jointly with the Department.",
];

const sources = [
  ["RCD Jharkhand: road network achievements (12,736 km; SH 1,231.9 km; MDR 4,845.7 km)", "https://rcd.jharkhand.gov.in/achivements.php"],
  ["RCD Jharkhand: organisation (Engineer-in-Chief; CE, Central Design Organisation)", "https://rcd.jharkhand.gov.in/organisation.php"],
  ["RCD GIS portal", "https://gis.jharkhand.gov.in/rcd_portal/index.php"],
  ["Jharkhand Budget 2026–27 (Drishti IAS): RCD ₹6,601.28 crore", "https://www.drishtiias.com/state-pcs-current-affairs/jharkhand-budget-202627"],
  ["Jharkhand Budget Analysis 2026–27 (PRS India)", "https://prsindia.org/budgets/states/jharkhand-budget-analysis-2026-27"],
  ["Jharkhand Budget 2026–27 overview (Elets eGov)", "https://egov.eletsonline.com/2026/02/jharkhand-budget-2026-27-unveils-%E2%82%B91-58-lakh-crore-plan-focused-on-welfare-infrastructure-and-economic-growth/"],
  ["Jharkhand RCD Schedule of Rates status (CivilShape)", "https://www.civilshape.in/2025/06/Jharkhand-Road-Construction-Department-SOR-Updated-in-2025-Jharkhand-RCD-SOR.html"],
  ["State-wise Schedule of Rates 2026 (InfraLens)", "https://infralens.in/knowledge/state-wise-sor-india-2026"],
  ["Jharkhand State Roads Project: forest land along project roads (ADB)", "https://www.adb.org/sites/default/files/project-documents//40005-ind-siee.pdf"],
  ["JAP-IT: nodal e-governance agency, State Data Centre", "https://japit.jharkhand.gov.in/"],
];

module.exports = { COMPANY, CLIENT, CLIENT_SHORT, ROADS_BUDGET_CR, modules, intro, fitTogether, startingPoints, workWith, assumptions, sources };
