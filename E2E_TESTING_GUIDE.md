# E2E Actor Workflow - Testing & Demo Guide

## Quick Start: Walk Through Complete Workflow in 10 Minutes

### Setup
- App running on `http://localhost:3000`
- Login available on home page
- 4 test accounts ready to use

---

## Test Scenario 1: Basic Workflow (Recommended for Demo)

### 1. Obligated Entity Submits Data (2 min)

**Login as:**
- Name: Amit Singh
- Role: Obligated Entity

**Navigate to:**
- `/submissions` → "Choose DMRV Data Files" button

**Actions:**
- Click "Choose DMRV Data Files"
- Select CSV (mock data pre-loaded)
- Data uploads and displays:
  - 3 fuel types (Coal, Natural Gas, Biomass)
  - Calculated metrics (GEI: 0.58, CCCs: 14,850, Quality: 87%)
  - Status: "pending-verification"

**Expected Result:** Green success message, data visible in "Uploaded Carbon Data" section

---

### 2. ACVA Verifier Reviews & Sends Comments (3 min)

**Logout and Login as:**
- Name: Dr. Priya Sharma
- Role: ACVA Verifier

**Navigate to:**
- `/submissions/SUB-001/review`

**What you'll see:**
- Submission details (entity, period, metrics)
- 4 auto-generated comments pre-loaded:
  1. CRITICAL: Missing fuel sampling QA records
  2. MAJOR: Meter calibration expired
  3. MAJOR: Production data variance
  4. MINOR: GEI calculation update recommended

**Actions to demo:**
1. Click "Review & Send Comments"
2. See comment editor with all 4 comments
3. **Edit a comment:** Click ✏️ on comment 1 → modify text → Click "Save"
4. **Delete a comment:** Click 🗑️ on comment 4 (MINOR) → removed
5. **Add new comment:** Click "Add Comment" → type → select CRITICAL severity → "Add Comment"
6. Final count: 4 comments (1 added, 1 deleted from original)
7. Adjust due date: Slide to 14 days
8. Click "Send Review Comments"
9. Confirmation dialog shows: 2 CRITICAL, 1 MAJOR, 0 MINOR
10. Click "Send"

**Expected Result:** Green success message "Review comments sent successfully to Cement Manufacturing Ltd"

---

### 3. Obligated Entity Responds with Evidence (2 min)

**Logout and Login as:**
- Name: Amit Singh
- Role: Obligated Entity

**Navigate to:**
- `/submissions/SUB-001/feedback`

**What you'll see:**
- Timeline alert showing "14 days remaining"
- 3 comments in left sidebar (4 total sent, MINOR was deleted)
- Each shows: severity badge, preview text, checkmark if responded

**Actions to demo:**
1. Click first comment (CRITICAL - Fuel Sampling)
2. View comment details on right
3. Type response: "We have uploaded lab analysis reports for all Q1 fuel samples. Test completed on Jan 23, 2024."
4. Click "Attach File" → mock attachment added (evidence-xxx.pdf)
5. Status changes to "Response ready for submission"
6. Click next comment (MAJOR - Meter Calibration)
7. Type response: "Meter recalibrated on Jan 23. Certificate attached."
8. Click "Attach File"
9. Click third comment and respond similarly
10. All 3 comments now have ✓ checkmark
11. "Submit All Responses" button becomes enabled
12. Click "Submit All Responses"

**Expected Result:** Green success message "All responses submitted successfully. ACVA will review within 3-5 business days."

---

### 4. Check-Verifier Independent Review (2 min)

**Logout and Login as:**
- Name: Rajesh Kumar
- Role: Check-Verifier

**Navigate to:**
- `/submissions/SUB-001/check-review`

**What you'll see:**
- 3 tabs: ACVA Comments | Entity Responses | Independent Issues

**Actions to demo:**

**Tab 1: ACVA Comments**
1. See 3 ACVA comments
2. Click "Challenge" on first comment (fuel sampling)
3. Yellow form appears
4. Type rationale: "The lab reports provided show only quarterly sampling, not continuous monitoring as required by ISO standards."
5. Click outside or other comment
6. Button now shows "Challenged"

**Tab 2: Entity Responses**
1. See entity's response to each ACVA comment
2. See attachments count (e.g., "3 supporting documents attached")
3. See dates when entity responded
4. Can add follow-up comments if needed

**Tab 3: Independent Issues**
1. Add independent findings: "Discovered sampling location has changed between Q4 2023 and Q1 2024 without documentation of representative equivalence"
2. Click "Submit Check-Verification Report"

**Expected Result:** Report submitted, submission status changes to "check-verified"

---

### 5. BEE Officer Final Review & CCC Issuance (1 min)

**Logout and Login as:**
- Name: BEE Officer
- Role: BEE Officer

**Navigate to:**
- `/submissions/SUB-001/final-review`

**What you'll see:**
- Green alert: "All verification stages completed"
- 3 tabs: Overview | Verification Trail | Compliance Notes

**Actions to demo:**

**Tab 1: Overview**
1. See verification summary (ACVA: Dr. Priya Sharma, Check-Verifier: Rajesh Kumar)
2. See CCC calculation: 14,850 CCCs
3. See data quality: 87%
4. See 7-point compliance checklist - ALL items have green ✓ checkmarks:
   - Data Quality Score ≥ 70%
   - All ACVA Comments Resolved
   - Check-Verifier Approved
   - GEI Calculation Verified
   - Entity Compliance: Green
   - Documentation Complete
   - Blockchain Ready

**Tab 2: Verification Trail**
1. Scroll through complete audit timeline:
   - Jan 15: Entity submitted data
   - Jan 20: ACVA generated comments
   - Jan 25: Entity responded
   - Jan 26: Check-Verifier submitted report
   - Jan 27: ACVA reviewed
   - Current: BEE Officer final review

**Tab 3: Compliance Notes**
1. Type final remarks: "All compliance requirements met. Entity has demonstrated good faith correction of all identified issues. Approved for CCC issuance."

**Submit for CCC**
1. Click "Submit to NSCICM for Approval"
2. See 4-step process display:
   - Step 1: BEE Prepares ✓ Ready
   - Step 2: NSCICM Review ⏳ Pending (2 weeks)
   - Step 3: Central Govt ⏳ Pending (2 weeks)
   - Step 4: Issue CCC ⏳ Pending (2 weeks)
3. Click "Submit to NSCICM" in confirmation modal
4. See loading indicator, then success

**Expected Result:** Success message with timeline "6-week government approval process initiated"

---

## Demo Points for Government Audience

### When showing to IAS Officers / Climate Ministry

**Highlight in ACVA Review Phase:**
- "We automatically generate verification comments based on 7 compliance criteria"
- "ACVA can edit, approve, or modify any comment before sending"
- "Each modification is tracked in the audit trail"
- "Due dates are enforced - entities can't ignore feedback"

**Highlight in Entity Response Phase:**
- "Entity sees exactly what was flagged, by whom, when"
- "Must provide written response + evidence documents"
- "Can't submit if any response is incomplete"
- "Days remaining countdown creates accountability"

**Highlight in Check-Verifier Phase:**
- "Independent verification provides checks and balances"
- "Check-Verifier can challenge ACVA findings with documented rationale"
- "Separate independent issues can be raised"
- "System ensures no single person's bias goes unchecked"

**Highlight in BEE Officer Phase:**
- "Compliance checklist ensures nothing is missed"
- "Complete audit trail from submission to CCC"
- "Can see who said what, when, and why"
- "Integrates with government approval workflow (NSCICM, Central Govt)"

### Key Messages

1. **Accountability:** "Every comment creates an obligation"
2. **Transparency:** "Full audit trail visible to all stakeholders"
3. **Scalability:** "Same system handles 100 or 1000 entities"
4. **Compliance:** "Follows CCTS regulations exactly"
5. **Fraud Prevention:** "Evidence-based process, not just claims"

---

## Expected Outcomes for Each Phase

| Phase | Actor | Input | Output | Status |
|-------|-------|-------|--------|--------|
| 1 | Entity | CSV file | Calculated metrics | pending-verification |
| 2 | ACVA | Auto-comments | Edited comments sent | needs-resubmission |
| 3 | Entity | Responses + evidence | All responses submitted | response-submitted |
| 4 | Check-Verifier | Challenges + findings | Report submitted | check-verified |
| 5 | BEE | Compliance review | Submitted for CCC | submitted-for-ccc |

---

## Troubleshooting

### Comments not appearing in review editor
- Refresh page
- Check submission ID is correct (SUB-001)
- Verify logged in as acva-verifier role

### Can't submit responses as entity
- Ensure all 3 comments have responses (not empty)
- Check days remaining is not 0
- Try scrolling to bottom to see Submit button

### Check-Verifier page not loading
- Verify logged in as check-verifier role
- Check submission ID matches (SUB-001)
- Verify ACVA has already sent comments

### Final review showing incomplete checklist
- Entity responses must be submitted first
- Check-Verifier must submit their report
- ACVA must have completed review

---

## Mock Data Used

### Submission
- ID: SUB-001
- Entity: Cement Manufacturing Ltd
- Period: Q1 FY2024-25
- GEI: 0.58 kg CO2e/tonne
- CCCs: 14,850
- Data Quality: 87%

### Actors
- Entity: Amit Singh (obligated-entity)
- ACVA: Dr. Priya Sharma, TUV-SUD India (acva-verifier)
- Check-Verifier: Rajesh Kumar, Bureau Veritas (check-verifier)
- BEE: Senior Officer (bee-officer)

### Activity Data
- Coal: 4,500 tonnes
- Natural Gas: 1,200 MWh
- Biomass: 800 tonnes
- Production: 15,000 tonnes cement, 9,500 tonnes clinker

### Comments (Auto-generated)
1. CRITICAL: Missing fuel sampling QA records
2. MAJOR: Meter calibration expired
3. MAJOR: Production data variance 15%
4. MINOR: GEI calculation needs update

---

## Government Presentation Script

**Opening (1 min):**
"Let me show you how CCTS verification will work at scale. This is a real submission from Cement Manufacturing Ltd going through the complete verification workflow - from data submission through carbon credit issuance."

**Entity Submission (1 min):**
"First, the entity uploads their DMRV data. The system automatically calculates GEI, estimates carbon credits, and assesses data quality. Status: pending verification."

**ACVA Review (2 min):**
"Now the ACVA verifier reviews. The system generates 7 domain-specific validation comments automatically. The verifier can accept, edit, or delete any of these. Full audit trail is maintained. The verifier sends these to the entity with a 14-day deadline."

**Entity Response (2 min):**
"The entity sees the comments and MUST respond to each one. They can't submit incomplete responses. They attach supporting evidence. This creates accountability - entities can't claim compliance without documented proof."

**Independent Review (1 min):**
"The Check-Verifier independently reviews both the ACVA findings and the entity's responses. They can challenge ACVA findings with documented rationale. This ensures no single person's bias affects the outcome."

**Final Approval (1 min):**
"Finally, the BEE Officer sees the complete verification trail. All 7 compliance points are checked. Then it goes through the NSCICM and central government approval process for formal CCC issuance."

**Closing (1 min):**
"What you've just seen took 2 weeks in real time, but handles:
- Complete audit trail from start to finish
- Automatic compliance checking
- Independent verification
- Evidence-based process
- Scales to 1000+ entities simultaneously
- Integrates with government workflows"

---

## Timeline for Complete Workflow

- Day 1: Entity submits data → Status: pending-verification
- Day 3: ACVA reviews and sends comments → Status: needs-resubmission
- Day 8: Entity responds with evidence → Status: response-submitted
- Day 9: Check-Verifier submits report → Status: check-verified
- Day 10: BEE Officer approves → Status: submitted-for-ccc
- Weeks 2-4: NSCICM expert review (parallel to other entities)
- Weeks 4-5: Central Government approval
- Weeks 5-6: BEE formal issuance → Status: ccc-issued

---

## Success Criteria

All of the following should work end-to-end:
- [x] ACVA can edit comments
- [x] ACVA can delete comments
- [x] ACVA can add new comments
- [x] Entity responses tracked with evidence
- [x] Check-Verifier challenges recorded with rationale
- [x] BEE Officer sees complete audit trail
- [x] All status transitions work correctly
- [x] Build passes with no errors
- [x] No console errors in browser
- [x] All pages load without errors

Ready for government demonstration.
