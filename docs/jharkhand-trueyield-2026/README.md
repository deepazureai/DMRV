# TrueYield Jharkhand: revenue-leakage analytics proposal (Sept 2026)

| File | What it is |
|---|---|
| `TrueYield_Jharkhand_Proposal.pdf` / `.docx` | Proposal to the Finance Department, Government of Jharkhand. Sections: executive summary, revenue and CAG evidence, comparative study of existing systems, solution (data lake + Trino + detection engine), ML discovery engine, CAG-finding → check mapping, approach, benefits, cost, risks, engagement, sources, annex of hosting requirements |
| `INTERNAL_pricing_basis.md` | Internal pricing basis and negotiation notes (not for submission) |

Based on the platform in `deepazureai/trueyield_wb` (AeROS/TrueYield: 85 checks across 10 families).

Customer quote (excl. GST):
- Pilot: ₹56.5 lakh
- One-time: ₹1.97 cr (licence ₹50 lakh, data platform ₹46.5 lakh, adaptation ₹57.5 lakh, discovery engine ₹42.5 lakh)
- Recurring: ₹47.5 lakh a year (maintenance only)

Everything, including the data lake and the AI models, is hosted in the Jharkhand State Data Centre. The state provides all infrastructure, which is not charged.

Internal ranges and the walk-away floor are in `../internal/Negotiation_Sheet_Jharkhand.md`.

## Rebuild
```bash
cd source && npm install docx
node build.js ../TrueYield_Jharkhand_Proposal.docx
soffice --headless --convert-to pdf --outdir .. ../TrueYield_Jharkhand_Proposal.docx
```
