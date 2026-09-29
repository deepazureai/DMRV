# TrueYield Jharkhand: revenue-leakage analytics proposal (Sept 2026)

| File | What it is |
|---|---|
| `TrueYield_Jharkhand_Proposal.pdf` / `.docx` | 9-page proposal to the Finance Department, Government of Jharkhand. Sections: executive summary, revenue and CAG evidence, comparative study of existing systems, solution (data lake + Trino + detection engine), ML discovery engine, CAG-finding → check mapping, approach, benefits, cost, risks, engagement, sources |
| `INTERNAL_pricing_basis.md` | Internal pricing basis and negotiation notes (not for submission) |

Based on the platform in `deepazureai/trueyield_wb` (AeROS/TrueYield: 85 checks across 10 families).

Price (excl. GST): pilot ₹34–44 lakh; one-time total ₹1.14–1.52 cr (licence ₹30–40 lakh, data platform ₹26–34 lakh, adaptation ₹34–46 lakh, discovery engine ₹24–32 lakh); recurring ₹33–51 lakh/yr.

## Rebuild
```bash
cd source && npm install docx
node build.js ../TrueYield_Jharkhand_Proposal.docx
soffice --headless --convert-to pdf --outdir .. ../TrueYield_Jharkhand_Proposal.docx
```
