# TrueYield Jharkhand: revenue-leakage analytics proposal (Sept 2026)

| File | What it is |
|---|---|
| `TrueYield_Jharkhand_Proposal.pdf` / `.docx` | 8-page proposal to the Finance Department, Government of Jharkhand. Sections: executive summary, revenue and CAG evidence, comparative study of existing systems, solution, CAG-finding → check mapping, approach, benefits, cost, risks, engagement, sources |
| `INTERNAL_pricing_basis.md` | Internal pricing basis and negotiation notes (not for submission) |

Based on the platform in `deepazureai/trueyield_wb` (AeROS/TrueYield: 85 checks across 10 families).

Price: pilot ₹28–38 lakh; one-time total ₹68–92 lakh; recurring ₹16–26 lakh/yr (excl. GST).

## Rebuild
```bash
cd source && npm install docx
node build.js ../TrueYield_Jharkhand_Proposal.docx
soffice --headless --convert-to pdf --outdir .. ../TrueYield_Jharkhand_Proposal.docx
```
