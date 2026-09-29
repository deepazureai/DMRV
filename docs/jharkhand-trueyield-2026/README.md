# TrueYield Jharkhand: revenue-leakage analytics proposal (Sept 2026)

| File | What it is |
|---|---|
| `TrueYield_Jharkhand_Proposal.pdf` / `.docx` | 9-page proposal to the Finance Department, Government of Jharkhand. Sections: executive summary, revenue and CAG evidence, comparative study of existing systems, solution (data lake + Trino + detection engine), ML discovery engine, CAG-finding → check mapping, approach, benefits, cost, risks, engagement, sources |
| `INTERNAL_pricing_basis.md` | Internal pricing basis and negotiation notes (not for submission) |

Based on the platform in `deepazureai/trueyield_wb` (AeROS/TrueYield: 85 checks across 10 families).

Customer quote (excl. GST): pilot ₹55 lakh; one-time ₹1.9 cr (licence ₹50 lakh, data platform ₹42.5 lakh, adaptation ₹57.5 lakh, discovery engine ₹40 lakh); recurring ₹64 lakh a year. Internal ranges and walk-away floor: `../internal/Negotiation_Sheet_Jharkhand.md`.

## Rebuild
```bash
cd source && npm install docx
node build.js ../TrueYield_Jharkhand_Proposal.docx
soffice --headless --convert-to pdf --outdir .. ../TrueYield_Jharkhand_Proposal.docx
```
