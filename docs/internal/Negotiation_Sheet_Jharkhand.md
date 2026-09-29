# Negotiation sheet: Jharkhand proposals

**Internal to Kirnova. Never share with the customer or attach to a bid.**

**Basis for both proposals:** everything is hosted in the Jharkhand State Data Centre (JAP-IT).
- The state provides all infrastructure: servers, data lake storage, the GPU server, network, backup and DR.
- All data and AI models stay inside the data centre. The AI runs on open-source models on the state's servers.
- Kirnova charges nothing for infrastructure.

**What the customer sees:** the single figures in the proposals, which are the top of each internal range.

**Assumptions for the profit figures:**
- Profit is before tax.
- It is measured against the delivery cost shown for each project.
- The partner fee is taken on the price received. In practice it is slightly lower, because pass-through costs are excluded.
- All figures exclude GST.

---

## 1. Sadak Setu: Road Construction Department
Delivery cost is about **₹96 lakh**. That's about 70 person-months, plus deploying the stack and the in-house AI model on the data centre's servers, plus digitisation, security audit and travel.

| | Quoted | Internal range | Walk-away floor |
|---|---|---|---|
| One-time | **₹1.61 cr** | ₹1.16–1.61 cr | **₹1.37 cr** |
| Recurring per year (maintenance only) | **₹30 lakh** | ₹23.5–30 lakh | **₹26 lakh** |

### Price ladder (one-time)
| Step | Price | Profit, partner 20% | Profit, partner 15% |
|---|---|---|---|
| Quote | ₹1.61 cr | ₹33 lakh | ₹41 lakh |
| −5% | ₹1.53 cr | ₹26 lakh | ₹34 lakh |
| −10% | ₹1.45 cr | ₹20 lakh | ₹27 lakh |
| **−15% (floor)** | **₹1.37 cr** | **₹14 lakh** | **₹20 lakh** |

### Below the floor, cut scope instead of price
- Drop **04 Cost Assurance** (₹9 lakh) and **07 GIS Road Map** (₹11.5 lakh).
- Or phase the work: Modules 06, 01 and 05 this financial year, and the rest next year.

---

## 2. TrueYield: Finance Department
Delivery cost is about **₹98 lakh**. That's about 72 person-months, plus installing the data lake, Trino, the ML platform and the in-house AI model on the data centre's servers, plus audit and travel.

| | Quoted | Internal range | Walk-away floor |
|---|---|---|---|
| Pilot | **₹56.5 lakh** | ₹44–56.5 lakh | **₹44 lakh** |
| One-time total | **₹1.97 cr** | ₹1.49–1.97 cr | **₹1.49 cr** |
| Recurring per year (maintenance only) | **₹47.5 lakh** | ₹40–47.5 lakh | **₹42 lakh** |

### Price ladder (one-time)
| Step | Price | Profit, partner 20% | Profit, partner 15% |
|---|---|---|---|
| Quote | ₹1.97 cr | ₹59 lakh | ₹69 lakh |
| −5% | ₹1.87 cr | ₹51 lakh | ₹61 lakh |
| −10% | ₹1.77 cr | ₹44 lakh | ₹52 lakh |
| −15% | ₹1.67 cr | ₹36 lakh | ₹44 lakh |
| −20% | ₹1.57 cr | ₹28 lakh | ₹36 lakh |
| **−24% (floor)** | **₹1.49 cr** | **₹21 lakh** | **₹29 lakh** |

### Before reducing price
- **Licence as a subscription:** ₹30 lakh up front plus ₹10 lakh a year for 2 years, instead of ₹50 lakh at once.
- **Defer the discovery engine** (₹42.5 lakh) to year 2. It depends on pilot outcomes anyway.
- **Smaller pilot:** 2 departments (Commercial Taxes + Mines & Geology) in 2 districts, for about ₹46 lakh.
- **Monthly to quarterly discovery cycle:** this lowers maintenance to about ₹40 lakh a year without cutting anything else.

---

## 3. Maintenance
- **Sadak Setu, ₹30 lakh a year:** about 2 full-time people for support, fixes, rule and rate updates, and running the stack at the data centre. About ₹23–25 lakh of cost, so don't go below ₹26 lakh.
- **TrueYield, ₹47.5 lakh a year:** about 3 full-time people covering the 7 data pipelines, running the data centre stack, the monthly discovery cycle and retraining, and the helpdesk. About ₹36–40 lakh of cost, so don't go below ₹42 lakh.
- Hosting is not in maintenance, because the state provides it. If the state later asks Kirnova to supply or manage its own servers, price that separately.

## 4. How to give ground (both proposals)
1. **Concede terms before price.** Offer phasing across two financial years, an extra 3 months of hypercare, or extra training.
2. **Trade every concession.** Ask for a 10–15% advance, payment within 30 days, or a firm LoI or work-order date.
3. **Move in the steps above,** one meeting at a time.
4. **Never cut price and scope together.** Below the floor, cut scope.
5. **Keep the partner fee a percentage of receipts,** never a fixed rupee amount.
6. **Maintenance:** don't give the first year free. If pushed, include 6 months of warranty in the one-time price.

## 5. Regenerating the customer copies
Both proposals are generated from source:
- Sadak Setu: `docs/jharkhand-sadak-setu-2026/source/`. Costs are in `content.js`.
- TrueYield: `docs/jharkhand-trueyield-2026/source/`. Costs are in `build.js`.

Settings:
- `LOADING = 1.25`: the commercial uplift.
- `QUOTE_HIGH = true`: show the top of each range as a single figure.

To issue a revised offer at a step on the ladder, change the ranges or loading and rebuild the PDF, as described in each folder's README.
