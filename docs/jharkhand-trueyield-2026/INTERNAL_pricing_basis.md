# TrueYield Jharkhand: internal pricing basis

**Internal to Kirnova. Do not include in the government submission.**

## Headline (excl. GST)
| One-time component | Pilot | Rollout | Total |
|---|---|---|---|
| Platform licence (existing product) | ₹8–10 lakh | ₹22–30 lakh | **₹30–40 lakh** |
| Data platform (lake, Trino, ingestion, connectors) | ₹12–16 lakh | ₹14–18 lakh | **₹26–34 lakh** |
| Adaptation & deployment | ₹14–18 lakh | ₹20–28 lakh | **₹34–46 lakh** |
| Discovery engine (3 ML layers) | – | ₹24–32 lakh | **₹24–32 lakh** |
| **One-time total** | **₹34–44 lakh** | **₹80–108 lakh** | **₹1.14–1.52 cr** |

- Recurring: infrastructure ₹15–25 lakh/yr + AMC ₹18–26 lakh/yr = **₹33–51 lakh/yr**.
- Optional municipal edition: ₹15–22 lakh.

## Where your product effort is recovered
1. **Platform licence, ₹30–40 lakh.**
   - The existing build covers the detection engine, 85 checks, money engine, rulebook compiler, entity resolution, console, RAG assistant, policy simulator, data generator and deployment scripts. That's roughly 45–55 person-months, or about ₹55–65 lakh at cost.
   - The licence recovers about 55–65% of that from Jharkhand. The rest is recovered from WB and later states, since the licence is non-exclusive.
   - It's a perpetual, state-wide licence. The core source code goes into escrow, not to the state.
2. **Your ongoing role as product owner and architect** is billed inside the data platform, adaptation and discovery lines at the lead rate. Plan on about 40% of your time across Phases 1–2.
3. **AMC at ₹18–26 lakh/yr** includes licence support and upgrades. This is the recurring product revenue.

## Why the one-time total rose from ₹68–92 lakh to ₹1.14–1.52 cr
- Licence added: +₹30–40 lakh.
- Data platform priced separately, for production scale rather than the PoC's DuckDB/SQLite federation: +₹26–34 lakh, of which about ₹10–12 lakh was previously hidden inside "integration".
- Discovery engine added: +₹24–32 lakh.
- Adaptation reduced, because integration moved to the data platform line.

## Effort behind the services lines
**Data platform: about 22 person-months**
- data architect ×1
- data engineers ×2.5
- DevOps ×0.5

Over the pilot and rollout this covers:
- object storage and an Iceberg/Parquet lake at SDC or cloud
- Trino (coordinator + 3 workers)
- an Airflow-scheduled ingestion DAG per source
- data-quality checks
- 7 department connectors, about 2 PM each

Add test infrastructure of ₹2–3 lakh.

**Discovery engine: about 20 person-months** (ML lead ×1, ML engineers ×2, domain ×0.5, over about 5 months), plus GPU/compute of ₹2–4 lakh.
- Layer 1 (unsupervised): isolation forest / autoencoder / clustering on cross-department taxpayer features.
- Layer 2 (classification): gradient-boosted classifier trained on officer-verified outcomes from the pilot.
- Layer 3 (rule finding): interpretable rule induction, i.e. rule lists or trees distilled from layer 2 with SHAP-guided thresholds.
- Output: rule candidates in rulebook form, back-tested, then human review, then promotion into `detectors.py`, `rate_schedule.py` and `RULEBOOK.md`.

**Adaptation: about 30 person-months** across the pilot and rollout:
- Jharkhand rules and rates
- entity resolution for JBVNL and Jharbhoomi
- Hindi UI
- CERT-In audit (₹3–5 lakh)
- training and travel (₹4–6 lakh)

## Infrastructure sizing (₹15–25 lakh/yr on a MeitY-empanelled cloud)
- Trino: 1 coordinator + 3–4 workers (16 vCPU / 64 GB each)
- 10–20 TB object storage with history
- Airflow
- 2 app servers
- occasional GPU for retraining

That comes to about ₹1.2–2 lakh a month. If JAP-IT's SDC provides VMs and storage, most of it is absorbed.

## Negotiation guidance
- Protect the services lines, and flex the licence if needed. For example: licence ₹20 lakh up front plus ₹10–15 lakh/yr as subscription for 2 years, instead of discounting engineering.
- Pilot floor: about ₹30 lakh.
- Lower-entry fallback: pilot with 2 departments (Commercial Taxes + Mines & Geology) and 2 districts, at about ₹26–32 lakh.
- Avoid a pure percentage-of-recovery model; a small success-linked milestone is fine.

## To confirm in Phase 0
- Whether Commercial Taxes has any vendor analytics project under way, and which BIFA / GST Prime outputs it receives.
- JIMMS already shares data with Commercial Taxes (CSM Technologies built JIMMS), so position TrueYield as consuming that data, not competing with it.
- Whether SDC capacity is available for the data lake, which decides whether the ₹15–25 lakh infrastructure line mostly disappears.

## Commercial loading (added)
Every cost line in the proposal is the base figure above × **1.25**, applied in `source/build.js` (`LOADING`). It's spread across all components rather than shown as a separate line.
- It covers the consulting-partner fee (15–20% of net receipts) plus delivery contingency.

Quoted price is now:
- Pilot: **₹42.5–55 lakh**
- One-time: **₹1.43–1.9 cr**
  - licence ₹37.5–50 lakh
  - data platform ₹32.5–42.5 lakh
  - adaptation ₹42.5–57.5 lakh
  - discovery engine ₹30–40 lakh
- Recurring: **₹41.5–64 lakh/yr**
- Municipal edition: ₹19–27.5 lakh

Profit against about ₹93 lakh services delivery cost, before tax:

| Price won | Partner at 15% | Partner at 20% |
|---|---|---|
| ₹1.9 cr (top) | about ₹68 lakh | about ₹59 lakh |
| about ₹1.66 cr (mid) | about ₹48 lakh | about ₹40 lakh |
| ₹1.43 cr (bottom) | about ₹28 lakh | about ₹21 lakh |

Negotiation floor with a 20% partner: about ₹1.4 cr. Flex the licence into a subscription before cutting services.

## State Data Centre hosting (revised)
Basis: everything runs in the Jharkhand State Data Centre (JAP-IT), including the data lake, Trino and the AI models. The state provides all infrastructure; Kirnova does not charge for any.

Changes to the base figures (before the 1.25 uplift):
- **Infrastructure:** ₹15–25 lakh/yr removed.
- **Data platform, +₹3 lakh net:** ₹13–17 lakh (pilot) and ₹16–20 lakh (rollout). This covers installing MinIO/Iceberg, Trino, Airflow and PostgreSQL on the data centre's VMs, after removing the cloud test environments.
- **Discovery engine, +₹2 lakh:** ₹26–34 lakh, for the machine-learning platform and the in-house assistant model on the data centre's GPU server.
- **Maintenance:** ₹18–26 lakh becomes ₹32–38 lakh/yr, about 3 people. It covers running the self-managed stack at the data centre, 7 data pipelines, the monthly discovery cycle and retraining, and the helpdesk. The old figure was too low for that scope.

Customer quote (highest figures):
- Pilot: **₹56.5 lakh**
- One-time: **₹1.97 cr**
- Recurring: **₹47.5 lakh/yr** (maintenance only)

Delivery cost is now about ₹98 lakh. Hardware sizing is in the proposal's Annex. The price ladder is in `../internal/Negotiation_Sheet_Jharkhand.md`.
