# TrueYield Jharkhand: internal pricing basis

**Internal to Kirnova. Do not include in the government submission.**

## Headline (excl. GST)
| Item | Price |
|---|---|
| Pilot (Phase 0–1, 4 months, 3 departments, 3 districts) | ₹28–38 lakh |
| Statewide rollout (Phase 2, 6 months) | ₹40–54 lakh |
| **One-time total** | **₹68–92 lakh** |
| Recurring per year (infrastructure ₹4–8 lakh + O&M ₹12–18 lakh) | ₹16–26 lakh |
| Optional municipal edition (3 ULBs) | ₹15–22 lakh |

## Why it is lower than Sadak Setu
The platform exists: a library of 85 checks across 10 families, the federated reader, the money engine, the rulebook compiler, the UI, the RAG assistant and the Azure/SDC deployment. The work is adaptation, not a build:
- rules and rates moved to Jharkhand statutes (JGST, the JH Minor Mineral Concession Rules, the Indian Stamp Act as applied in Jharkhand, the JH Motor Vehicles Taxation Act, JH Excise)
- Jharkhand register mappings (JIMMS, NGDRS, Jharbhoomi, VAHAN, JBVNL, excise/JSBCL)
- entity resolution for registers without PAN (JBVNL, Jharbhoomi)
- deployment and training

## Effort
**Pilot: about 24 person-months × ₹1.1–1.4 lakh = ₹26–34 lakh**
- lead/PM ×1
- tax domain specialist (ex-officer or CA) ×1
- data/integration engineers ×2
- rules/backend ×1
- frontend ×0.5
- QA ×0.5

Add infrastructure/test and travel of ₹2–4 lakh.

**Rollout: about 30 person-months (5 people × 6 months) = ₹33–42 lakh**

Add a CERT-In audit (₹3–5 lakh), training and travel (₹3–5 lakh) and infrastructure (₹1–2 lakh).

## Negotiation guidance
- The pilot is the real ask. Don't discount it below about ₹25 lakh: data access in Phase 0 is the hardest part and takes senior time.
- If they want a lower entry point, cut the pilot to 2 departments (Commercial Taxes + Mines & Geology, which covers about 65% of own revenue) and 2 districts, for about ₹20–26 lakh.
- Avoid a pure percentage-of-recovery model. Governments rarely accept it, and it looks like a bounty. A small success-linked milestone is fine.
- Upsell path: the municipal edition (already built, calibrated to Ranchi Municipal Corporation's published figures), then other states.

## Checks on the comparative study (confirm in Phase 0)
- No public evidence was found of a cross-department revenue-leakage platform in Jharkhand. Ask the Commercial Taxes Department what BIFA / GST Prime outputs they receive, and whether any vendor analytics project is under way.
- JIMMS already shares data with Commercial Taxes, so position TrueYield as *using* that sharing, not competing with JIMMS (CSM Technologies built JIMMS).
