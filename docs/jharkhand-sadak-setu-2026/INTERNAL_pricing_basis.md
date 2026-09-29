# Sadak Setu (Jharkhand RCD): internal pricing basis

**Internal to Kirnova. Do not include in the government submission.**

## Headline
- Whole platform, one-time: **₹88 lakh – ₹1.21 cr** (excl. GST)
- Recurring: **₹21–32 lakh / yr** (infrastructure ₹7–12 lakh + O&M ₹14–20 lakh)

## Bottom-up build
| Workstream | Person-months |
|---|---|
| Shared platform (login/roles, audit, document store, workflow, dashboards, Hindi/English) | 10 |
| 01 Smart Cost Estimation (incl. digital SoR library) | 10 |
| 02 Auto-DPR Drafting | 13 |
| 03 Compliance Checker | 6 |
| 04 Cost Assurance | 3 |
| 05 Digital Approval Tracking | 8 |
| 06 Project Knowledge Base | 6 |
| 07 GIS Road Map (link-up with existing RCD GIS) | 4 |
| PM, QA, security hardening, UAT, training | 10 |
| **Total** | **70** |

At ₹1.1–1.4 lakh per person-month: ₹77–98 lakh.

Pass-through costs: digitisation of ~800 DPRs ₹4–7 lakh; CERT-In audit ₹3–5 lakh; AI/cloud during build ₹2–4 lakh; Ranchi presence and travel ₹3–5 lakh. That gives a total of ₹88 lakh – ₹1.21 cr.

Team: 8 people over 10 months:
- lead/PM ×1
- highway domain engineer ×1
- backend ×2
- frontend ×1.5
- AI/data ×1
- GIS ×0.5
- QA ×1
- DevOps/security ×0.3

## How the module prices were set
Module prices in the proposal are the module effort, plus its share of the shared platform (×1.4), plus the pass-through costs spread across modules. They add up exactly to the platform total.

## Negotiation guidance
- ₹88 lakh is roughly break-even at ₹1.1 lakh per person-month loaded cost. Target around ₹1.05 cr and don't go below about ₹95 lakh.
- The margin comes from AMC and from reusing the platform: Rural Works Department, Building Construction Department, WB PWD, other states.
- Fallback if the budget is tight: an essential package of Modules 06, 01, 03 and 05 at about ₹57–81 lakh.

## Commercial loading (added)
Every cost line in the proposal is the base delivery estimate × **1.25**, applied in `source/build.js` (`LOADING`). It's spread across all modules rather than shown as a separate line.
- It covers the consulting-partner fee (15–20% of net receipts; see `docs/internal/Consulting_Partner_Term_Sheet_DRAFT.docx`) plus delivery contingency.
- Quoted price is now: one-time **₹1.11–1.53 cr**, recurring **₹27.5–41.5 lakh/yr**.

Profit against about ₹93 lakh delivery cost, before tax:

| Price won | Partner at 15% | Partner at 20% |
|---|---|---|
| ₹1.53 cr (top) | about ₹37 lakh | about ₹30 lakh |
| about ₹1.32 cr (mid) | about ₹19 lakh | about ₹13 lakh |
| ₹1.11 cr (bottom) | about ₹1 lakh | about –₹4 lakh |

Negotiation floor with a 20% partner: about ₹1.25 cr.
