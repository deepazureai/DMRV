# Negotiation sheet: Jharkhand proposals

**Internal to Kirnova. Never share with the customer or attach to a bid.**

- **What the customer sees:** the single figures in the proposals, which are the top of each internal range.
- **Assumptions:** profit is before tax, against a delivery cost of about ₹93 lakh for each project, with the partner fee taken on the price received. In practice the fee is slightly lower because pass-through costs are excluded. All figures exclude GST.

---

## 1. Sadak Setu: Road Construction Department

| | Quoted | Walk-away floor |
|---|---|---|
| One-time | **₹1.53 cr** | **₹1.30 cr** |
| Recurring per year | **₹41.5 lakh** | **₹32 lakh** |

### Price ladder (one-time)
| Step | Price | Profit, partner 20% | Profit, partner 15% |
|---|---|---|---|
| Quote | ₹1.53 cr | ₹30 lakh | ₹37 lakh |
| −5% | ₹1.46 cr | ₹24 lakh | ₹31 lakh |
| −10% | ₹1.38 cr | ₹17 lakh | ₹24 lakh |
| **−15% (floor)** | **₹1.30 cr** | **₹11 lakh** | **₹18 lakh** |

### Below the floor, cut scope instead of price
- Drop **04 Cost Assurance** (₹9 lakh) and **07 GIS Road Map** (₹11.5 lakh). That lowers the price by ₹20.5 lakh without touching your margin on the rest.
- Or phase the work: Phase 1 this financial year (Modules 06, 01, 05), and the rest next year under a fresh sanction.

---

## 2. TrueYield: Finance Department

| | Quoted | Walk-away floor |
|---|---|---|
| Pilot | **₹55 lakh** | **₹42.5 lakh** |
| One-time total | **₹1.9 cr** | **₹1.43 cr** |
| Recurring per year | **₹64 lakh** | **₹45 lakh** |

### Price ladder (one-time)
| Step | Price | Profit, partner 20% | Profit, partner 15% |
|---|---|---|---|
| Quote | ₹1.90 cr | ₹59 lakh | ₹68 lakh |
| −5% | ₹1.81 cr | ₹51 lakh | ₹60 lakh |
| −10% | ₹1.71 cr | ₹44 lakh | ₹52 lakh |
| −15% | ₹1.62 cr | ₹36 lakh | ₹44 lakh |
| −20% | ₹1.52 cr | ₹29 lakh | ₹36 lakh |
| **−25% (floor)** | **₹1.43 cr** | **₹21 lakh** | **₹28 lakh** |

### Before reducing price
- **Licence as a subscription:** take ₹30 lakh up front plus ₹10 lakh a year for 2 years instead of ₹50 lakh at once. The total is the same, but the up-front figure is lower.
- **Defer the discovery engine** (₹40 lakh) to year 2. It depends on pilot outcomes anyway, so this is a natural phase, not a discount.
- **Smaller pilot:** if the ₹55 lakh pilot is the sticking point, offer 2 departments (Commercial Taxes + Mines & Geology) in 2 districts for about ₹45 lakh.

---

## 3. How to give ground (both proposals)
1. **Concede terms before price.** Offer phasing across two financial years, an extra 3 months of hypercare, or extra training workshops. These cost little.
2. **Trade every concession.** Each reduction should buy something: a mobilisation advance of 10–15%, payment within 30 days of each milestone, a firm work order or LoI date, or a shorter decision gate.
3. **Move in the steps above, not in one jump.** Take at least one meeting between steps.
4. **Never cut price and scope at the same time.**
5. **Below the floor, cut scope** (modules or departments), not the price of the same scope.
6. **The partner fee is a percentage of receipts,** so it falls automatically as the price falls. Don't agree a fixed rupee amount with the partner.
7. **Maintenance:** don't give the first year free. If pushed, offer a 6-month warranty period inside the one-time price instead.

## 4. Regenerating the customer copies
Both proposals are generated from source:
- Sadak Setu: `docs/jharkhand-sadak-setu-2026/source/`
- TrueYield: `docs/jharkhand-trueyield-2026/source/`

Each `build.js` has two settings:
- `LOADING = 1.25`: the commercial uplift.
- `QUOTE_HIGH = true`: show the top of each range as a single figure.

To issue a revised offer at a step on the ladder, change the ranges or loading and rebuild the PDF, as described in each folder's README.
