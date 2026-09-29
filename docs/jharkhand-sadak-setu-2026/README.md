# Sadak Setu Digital Stack: Jharkhand RCD proposal (Sept 2026)

| File | What it is |
|---|---|
| `Sadak_Setu_Jharkhand_RCD.pdf` / `.docx` | 12-page proposal to the Road Construction Department, Government of Jharkhand: cover, at-a-glance, how the price is built, 7 modules (one page each), engagement model, sources |

Pricing is bottom-up from one shared platform (about 70 person-months at ₹1.1–1.4 lakh, plus pass-through costs):
one-time ₹88 lakh – ₹1.21 cr, recurring ₹21–32 lakh a year, essential package ₹57–81 lakh.

## Editing and rebuilding

All text, effort and prices live in `source/content.js`; totals are computed by `source/build.js`.

```bash
cd source && npm install docx
node build.js ../Sadak_Setu_Jharkhand_RCD.docx
soffice --headless --convert-to pdf --outdir .. ../Sadak_Setu_Jharkhand_RCD.docx
```
