# DMRV Workflow Restructure - Comprehensive Summary

## Issues Identified & Fixed

### Issue 1: Nested Button Error in Carbon Data Upload ✅ FIXED
**Problem:** The `DataPreviewViewer` component had a nested button structure causing hydration errors
```
<button> (header container)
  └─ <Button> (View Evidence/Calculation)  ❌ Nested button violation
```

**Solution:** Changed header from `<button>` to `<div>` with click handler
```
<div> (header container with onClick)
  └─ <Button> (View Evidence/Calculation)  ✅ No nesting
```

**File:** `/components/data-preview-viewer.tsx`

---

## Workflow Architecture Problem Identified

### Current (Incorrect) DMRV Flow
The submission workflow currently allows Entity Submitters to:
1. Upload carbon data
2. Verify it themselves
3. Approve it themselves  
4. Generate carbon credits themselves

**This is wrong because:**
- Violates DMRV process (independent verification required)
- Security issue (submitter shouldn't approve their own submission)
- Compliance issue (regulatory requirements for separation of duties)

### Correct DMRV Flow (To Be Implemented)

**Stage 1: Entity Submitter**
- Upload carbon data
- Fill submission details
- Submit for verification
- **CANNOT:** Verify, approve, or generate credits
- After submit: Can only view status and verifier/approver comments

**Stage 2: Verifier Auditor** (Receives from Stage 1)
- Reviews submitted data
- Checks data quality and calculations
- Views supporting evidence
- Requests corrections or marks as VERIFIED
- **CANNOT:** Approve or generate credits

**Stage 3: BEE Regulator** (Receives from Stage 2)
- Reviews verified submission
- Reviews verifier's findings
- Issues carbon credits
- Approves for registration
- **CANNOT:** Re-verify or modify submission data

**Stage 4: Registry Operator** (Receives from Stage 3)
- Records on blockchain
- Maintains registry
- Tracks carbon credits

---

## Complete Restructure Plan

See `/DMRV_WORKFLOW_RESTRUCTURE.md` for full details.

### Key Changes Required:

#### 1. Submission Wizard (Entity Submitter)
**Current (Wrong):** 4 steps including verification, approval, credit generation
**Future (Correct):** 4 steps for submission only
```
Step 1: Select Entity & Project
Step 2: Upload CSV Data
Step 3: Confirm Methodology
Step 4: Review & Submit ✓ (ends here)
       └─ Confirmation dialog appears
       └─ Status: SUBMITTED
       └─ Cannot modify after submission
```

#### 2. Submissions Page - My Submissions Tab (New)
Shows all submissions with status progression:
- DRAFT (in progress)
- SUBMITTED (waiting for verification)
- PENDING_VERIFICATION (being verified)
- REQUEST_CORRECTIONS (verifier needs changes)
- VERIFIED (passed verification, waiting approval)
- PENDING_APPROVAL (in approval queue)
- APPROVED (approved, waiting registration)
- REGISTERED (recorded on blockchain)
- REJECTED (rejected, can resubmit)

Each submission shows cascading read-only views of:
- Original submission data
- Verifier comments
- Approver comments
- Carbon credits (if approved)
- Blockchain details (if registered)

#### 3. Carbon Data Upload Tab (Entity Submitter)
**New Purpose:** Quick reference file upload (NOT part of formal workflow)
- File upload and preview only
- No status tracking
- No workflow involvement
- Separate from "New Submission"
- Can be deleted without affecting formal submissions
- Dual-panel layout maintained:
  - Left: File list with metadata
  - Right: Data grid viewer

#### 4. Verification Page (Verifier Auditor Only)
**Current:** Empty or showing wrong data
**Future:** Full audit workbench
```
Tab 1: For Verification
  ├─ List of PENDING_VERIFICATION submissions
  ├─ Detail panel with:
  │  ├─ Data Overview (read-only)
  │  ├─ Records Grid (sortable, expandable)
  │  ├─ Quality Check Panel
  │  ├─ View Evidence button → Modal
  │  ├─ View Calculation button → Modal
  │  ├─ Verifier Comments textarea
  │  ├─ "Request Corrections" button
  │  └─ "Mark as Verified" button
  │
  Tab 2: Corrected Submissions
  └─ Resubmitted items for re-verification

  Tab 3: My Verified Submissions
  └─ Read-only view of verified items
```

#### 5. Approvals Page (BEE Regulator Only)
**Current:** Shows approval queue but may allow incorrect actions
**Future:** Complete approval workflow
```
Tab 1: For Approval
  ├─ List of VERIFIED submissions only
  ├─ Detail panel with:
  │  ├─ Submission Overview
  │  ├─ Verifier Report (read-only)
  │  ├─ Data Summary (read-only)
  │  ├─ Calculation Review (read-only)
  │  ├─ Approver Comments textarea
  │  ├─ "Issue Carbon Credits" button
  │  ├─ "Request Further Review" button
  │  └─ "Reject" button
  │
  Tab 2: Approved Submissions
  └─ Ready for registry

  Tab 3: Rejected Submissions
  └─ Return to submitter for resubmission
```

#### 6. Registry Page (Registry Operator Only)
**Current:** May not have proper blockchain integration
**Future:** Complete blockchain recording
```
Tab 1: For Registration
  ├─ List of APPROVED submissions only
  ├─ Detail panel with:
  │  ├─ All data (read-only cascade)
  │  ├─ Blockchain Packet Builder
  │  └─ "Register on Blockchain" button
  │
  Tab 2: Registered CCCs
  └─ All registered submissions with blockchain details
```

---

## Role-Based Navigation (Sidebar)

### Entity Submitter Sidebar
- Dashboard
- Entities
- Submissions ← **Primary**
- Data Quality
- Methodology
- Evidence
- Settings

### Verifier Auditor Sidebar
- Dashboard
- Verification ← **Primary**
- Data Quality
- Methodology
- Settings

### BEE Regulator Sidebar
- Dashboard
- Approvals ← **Primary**
- Blockchain
- Registry
- Settings

### Registry Operator Sidebar
- Dashboard
- Blockchain ← **Primary**
- Registry
- Projects
- Settings

---

## Data Model Updates Required

Add to Submission entity:
```
status: DRAFT | SUBMITTED | PENDING_VERIFICATION | REQUEST_CORRECTIONS | 
        RESUBMITTED | VERIFIED | PENDING_APPROVAL | APPROVED | REGISTERED | REJECTED
verifier_id: string (who verified)
verifier_comments: string
verification_date: Date
approver_id: string (who approved)
approver_comments: string
approval_date: Date
carbon_credits_issued: number
blockchain_packet_id: string
registration_date: Date
```

---

## Implementation Priority

### Phase 1 (Critical - Security/Compliance)
1. Fix Submission Wizard to remove verify/approve steps
2. Add status enum to data model
3. Implement access control: Entity Submitter cannot see verify/approve pages
4. Add confirmation dialog on submission

### Phase 2 (High - Workflow Functionality)
5. Create "My Submissions" tab with status progression
6. Implement Verification Page full workflows
7. Implement Approvals Page full workflows
8. Implement Registry Page full workflows

### Phase 3 (Medium - Polish)
9. Fix Carbon Data Upload tab (remove workflow)
10. Add status badges and filtering
11. Add notification/audit trail
12. Performance optimization

---

## Testing Scenarios

### Test 1: Golden Path (All Steps)
1. Submitter creates submission → Status: SUBMITTED
2. Verifier reviews → Status: VERIFIED
3. Approver approves → Status: APPROVED + Credits: 7,242
4. Registry records → Status: REGISTERED + Blockchain: PKT-001

### Test 2: Correction Flow
1. Submitter submits → Status: SUBMITTED
2. Verifier requests corrections → Status: REQUEST_CORRECTIONS
3. Submitter resubmits corrected data → Status: RESUBMITTED
4. Verifier approves correction → Status: VERIFIED
5. Continue to approval/registry

### Test 3: Rejection Flow
1. Submitter submits → Status: SUBMITTED
2. Verifier or Approver rejects → Status: REJECTED
3. Submitter sees rejection notice
4. Submitter can resubmit as new submission

### Test 4: Role Access Control
1. Submitter tries to access /verification → Should see "Access Denied"
2. Verifier tries to access submission wizard → Should see "Access Denied"
3. Approver tries to verify data → Should see "Access Denied"
4. Registry Operator tries to approve → Should see "Access Denied"

---

## Security & Compliance

### Separation of Duties
- Submitter cannot verify/approve their own submission ✓
- Verifier cannot approve (separate from verification) ✓
- Approver cannot modify submitted data ✓
- Registry Operator cannot approve ✓

### Audit Trail
- Record who changed status and when
- Store verifier comments with timestamp
- Store approver comments with timestamp
- Store blockchain transaction details

### Compliance
- Matches DMRV requirements
- Independent verification enforced
- Regulatory approval separate from verification
- Blockchain recording immutable

---

## Next Steps

1. **Read:** Review `/DMRV_WORKFLOW_RESTRUCTURE.md` for complete implementation details
2. **Plan:** Approve the restructure approach
3. **Implement:** Phase 1 (Critical fixes) first
4. **Test:** Golden path and edge cases
5. **Deploy:** To staging environment

**Build Status:** ✅ Currently building successfully with no errors
**Next Issue to Fix:** Nested button error in Carbon Data Upload tab ✅ FIXED

The application is ready for workflow restructuring implementation!
