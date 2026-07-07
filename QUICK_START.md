# Quick Start - ICM Digital Trust Layer

## Launch Application
Visit: **http://localhost:3000**

---

## 5-Minute Interactive Demo

### Phase 1: Entity Submitter (Minute 1-2)
1. Click **"Entity Submitter"** role card
2. Click Dashboard → **Submissions**
3. Click **"New Submission"** button
4. Complete the wizard:
   - **Step 1**: Leave project info, add description, click Next
   - **Step 2**: Drag/drop any file OR click to browse (CSV/Excel/JSON/PDF work)
   - **Step 3**: Select any methodology, click Next
   - **Step 4**: Click **Submit**

✅ Submission created and shows "Submitted" status (blue)

---

### Phase 2: Verifier Auditor (Minute 2-3)
1. Click your name/role in top header
2. Select **"Verifier Auditor"**
3. Go to **Submissions**
4. Click the submitted submission
5. Click **"Verification"** tab
6. Add review notes in the textarea
7. Click **"Approve for Verification"**

✅ Status changes to "Verified" (green)

---

### Phase 3: BEE Regulator (Minute 3-4)
1. Change role to **"BEE Regulator"**
2. Go to **Submissions**
3. Click the verified submission
4. Click **"Approval"** tab
5. See the carbon credit certificate preview
6. Add approval notes
7. Click **"Issue Carbon Credit Certificate"**

✅ Status changes to "Approved" (purple)
✅ Shows: **14,850+ CCCs issued**

---

### Phase 4: Registry Operator (Minute 4-5)
1. Change role to **"Registry Operator"**
2. Go to **Submissions**
3. Click the approved submission
4. Click **"Blockchain"** tab
5. Click **"Register on Blockchain"**

✅ Status changes to "Registered" (emerald)
✅ Shows immutable blockchain hash
✅ **Workflow Complete!**

---

## Key Interactive Features

### File Upload
- **Drag & drop** multi-format files (CSV, Excel, JSON, PDF)
- **Max 50MB** per file
- Shows upload errors and outstanding items
- Validates file types in real-time

### Data Quality
- **Auto-calculated quality score** based on files uploaded
- **Exceptions** shown with severity levels (Critical/Major/Minor)
- **Suggested resolutions** for each exception

### Role-Based Workflows
- Each role sees different tabs and actions
- **Entity Submitter**: Upload and submit
- **Verifier**: Review and validate
- **BEE Regulator**: Certify and issue CCCs
- **Registry Operator**: Register on blockchain

### Carbon Credit Calculation
Shows real calculation:
```
14,850 CCCs = 10,000 tonnes CO₂ × 1.0 factor × 87% quality
Market value: ₹2,175,000 at ₹250/CCC
```

### Immutable Blockchain Recording
- **SHA-256 hash** generated automatically
- **Copy to clipboard** for ledger recording
- **Immutable status** confirms permanent storage

---

## What You Can Do Now

✅ Create submissions with file upload  
✅ Upload multiple file formats (CSV/Excel/JSON/PDF)  
✅ Auto-calculated quality scores and CCCs  
✅ Review and resolve data exceptions  
✅ Step through complete verification workflow  
✅ Approve and issue carbon credits  
✅ Register on blockchain with immutable hash  
✅ Switch between all 5 stakeholder roles  
✅ Persistent role selection (saved in browser)  
✅ Complete audit trail with timestamps  

---

## File Upload Examples

### Try uploading any of these:
- **CSV file**: `emissions_data.csv` - Will be recognized as emissions data
- **Excel**: `methodology.xlsx` - Will be recognized as calculations
- **JSON**: Any JSON file - Will be recognized as metadata
- **PDF**: Any PDF - Will be recognized as evidence document
- **Multiple files**: Upload 3+ files together for highest quality score

### System recognizes:
- Uploaded file count → Quality score component
- File types → Exception validation
- File size → Validation error handling

---

## Golden Path Exemplar

The application includes a complete exemplar:
- **Entity**: Eastern Cement Works Ltd
- **Project**: Solar Power Generation - 10 MW
- **Period**: Q1 FY2026-27
- **Journey**: Submission → Verification → Approval → Blockchain Registration
- **Result**: 14,850 CCCs issued and immutably recorded

---

## Role Persistence

Your selected role is saved automatically. When you:
- **Reload the page** → You stay as same role
- **Close and reopen browser** → Same role persists
- **Switch roles** → Click header, new role selected and saved

To reset: Clear browser storage or use private/incognito window

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Submissions not showing | Refresh page, check role is set |
| Can't upload files | Use supported formats (CSV/Excel/JSON/PDF), check file size |
| Quality score is 0% | Complete all wizard steps and click Submit |
| Can't approve as Verifier | Submission must be "Submitted" status first |
| Blockchain hash missing | Submission must be in "Approved" status |
| Role not saving | Clear browser cache or use private window |

---

## Next: Full Documentation

For complete details on:
- All interactive workflows
- File upload specifications
- Quality score calculations
- CCC calculation formulas
- Blockchain hash generation
- Component architecture
- State management details

See: **INTERACTIVE_WORKFLOWS.md**

---

## Need Help?

The application includes:
- **Drag-and-drop file zone** with clear instructions
- **4-step wizard** with guidance at each step
- **Validation messages** for errors
- **Inline help text** explaining each field
- **Status badges** showing submission state
- **Timeline view** of all state transitions

All interactions are non-destructive and reversible in this demo environment.

**Happy testing! 🚀**
