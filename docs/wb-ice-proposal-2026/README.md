# West Bengal ICE Department: Initiatives Proposal (Sept 2026)

| File | What it is |
|---|---|
| `WB_ICE_Initiatives.pdf` / `.docx` | 16-page print booklet: cover, portfolio summary, 6 initiatives (2 pages each), engagement model, cost assumptions, sources |
| `Company_Vision_Goals.pdf` / `.pptx` | 3 slides: motto, vision & mission; short/mid/long-term goals; revenue mix & social commitment |

## Editing and rebuilding

All text lives in `source/content.js` (set `COMPANY` there to replace `[Company Name]`).

```bash
cd source && npm install docx pptxgenjs
node build_doc.js ../WB_ICE_Initiatives.docx
node build_slides.js ../Company_Vision_Goals.pptx
soffice --headless --convert-to pdf --outdir .. ../WB_ICE_Initiatives.docx ../Company_Vision_Goals.pptx
```

Status facts are from public reports up to September 2026; confirm them with the Department before formal submission.
