# Sadak Setu Digital Stack: Jharkhand RCD proposal (Sept 2026)

| File | What it is |
|---|---|
| `Sadak_Setu_Jharkhand_RCD.pdf` / `.docx` | 17-page proposal to the Road Construction Department, Government of Jharkhand, in the original Sadak Setu format: cover, portfolio at a glance, 7 modules (two pages each), how we will work, cost assumptions, sources |
| `INTERNAL_pricing_basis.md` | Internal bottom-up pricing and negotiation notes (not for submission) |

Customer quote (excl. GST): one-time ₹1.53 cr, recurring ₹41.5 lakh a year. Internal ranges and walk-away floor: `../internal/Negotiation_Sheet_Jharkhand.md`.

## Editing and rebuilding

All text and per-module prices live in `source/content.js`; totals are computed by `source/build.js`.

```bash
cd source && npm install docx
node build.js ../Sadak_Setu_Jharkhand_RCD.docx
soffice --headless --convert-to pdf --outdir .. ../Sadak_Setu_Jharkhand_RCD.docx
```
