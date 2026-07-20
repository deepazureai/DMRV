# DMRV Workflow Restructure - Role-Based Separation

## Current Problem

The submission workflow currently shows all stages (verification, approval, carbon credit generation) in a single wizard that the Entity Submitter can access. This violates the DMRV process and creates security/process issues.

**Current (Incorrect):**
```
Entity Submitter
  └─ New Submission Wizard
     ├─ Step 1: Upload Data
     ├─ Step 2: Methodology
     ├─ Step 3: Review
     └─ Step 4: Submit + Verify + Approve + Generate Credits ❌ WRONG
```

## Correct DMRV Workflow Architecture

**Proper (Correct):**
```
Entity Submitter
  ├─ My Submissions (read-only view after submit)
  └─ New Submission (upload & submit only - no verify/approve)
     ├─ Step 1: Upload Data
     ├─ Step 2: Methodology
     ├─ Step 3: Review
     └─ Step 4: Submit ✓ (ends here)
        └─ Status: SUBMITTED

Verifier Auditor
  ├─ Verification Workbench
  │  ├─ For Verification (PENDING_VERIFICATION submissions)
  │  ├─ View Evidence (modal)
  │  ├─ View Calculation (modal)
  │  ├─ Mark as VERIFIED or REQUEST CORRECTIONS
  │  └─ Status: VERIFIED or REQUEST_CORRECTIONS

BEE Regulator
  ├─ Approval Queue
  │  ├─ For Approval (VERIFIED submissions)
  │  ├─ View Verifier Report
  │  ├─ Issue Carbon Credits
  │  ├─ Approve or Reject
  │  └─ Status: APPROVED or REJECTED

Registry Operator
  └─ Registry Operations
     ├─ For Registration (APPROVED submissions)
     ├─ Build Blockchain Packet
     ├─ Register on Blockchain
     └─ Status: REGISTERED
```

---

## Submission Statuses Across Workflow

| Status | Who Sees | Who Can Act | Next Status |
|--------|----------|------------|------------|
| DRAFT | Submitter (me) | Submitter | SUBMITTED |
| SUBMITTED | Submitter (view-only), Verifier | Verifier | PENDING_VERIFICATION |
| PENDING_VERIFICATION | Verifier, Submitter (view-only) | Verifier | VERIFIED or REQUEST_CORRECTIONS |
| REQUEST_CORRECTIONS | Submitter, Verifier | Submitter | RESUBMITTED |
| RESUBMITTED | Verifier, Submitter (view-only) | Verifier | VERIFIED or REQUEST_CORRECTIONS |
| VERIFIED | Verifier (view-only), BEE Regulator, Submitter (view-only) | BEE Regulator | PENDING_APPROVAL |
| PENDING_APPROVAL | BEE Regulator, Submitter (view-only) | BEE Regulator | APPROVED or REJECTED |
| APPROVED | Registry Operator, Submitter (view-only) | Registry Operator | REGISTERED |
| REGISTERED | All roles (view-only) | Registry Operator | - |
| REJECTED | Submitter, BEE Regulator (view-only) | Submitter | DRAFT |

---

## Page Structure Reorganization

### 1. Submissions Page (Entity Submitter Only)

**Tab 1: My Submissions (New Default)**
- Table: File Name, Date, Status, Quality Score, Records, Actions
- Status badges: Draft, Submitted, Pending Verification, Verified, Approved, Registered, Rejected
- Click row → Detail view shows:
  - Overview (metadata)
  - Data Preview (uploaded records)
  - Verification (verifier comments - read-only)
  - Approval (approver comments - read-only)
  - Calculation (if approved, carbon credits)

**Tab 2: Upload New Data (Old "Carbon Data Upload")**
- For quick file uploads without formal submission
- No workflow - just reference/preview
- Dual-panel layout: File list + Records grid
- Functionality:
  - Drag & drop upload
  - File preview (table)
  - Delete file
  - No status tracking
  - No workflow involvement

**Tab 3: Submission Timeline (Old - Keep as Historical)**
- Shows lifecycle of submissions
- Read-only

**New Submission Button:**
- Wizard with only 4 steps:
  - Step 1: Select Entity & Project
  - Step 2: Upload CSV Data
  - Step 3: Confirm Methodology
  - Step 4: Review & Submit ✓
- On submit: Status becomes SUBMITTED
- After submit: Confirmation dialog shows

---

### 2. Verification/Verifier Auditor Page (Verifier Role Only)

**Tab 1: For Verification**
- Table: Submission ID, Entity, Date Submitted, Records, Quality Score
- Status: PENDING_VERIFICATION
- Click row → Detail panel:
  - Data Overview (read-only)
  - Records Grid (sortable, expandable)
  - Quality Check Panel:
    - Data validation results
    - Exception flags
    - Evidence review status
  - **View Evidence Button** → Modal:
    - Supporting documents list
    - Document details
    - Upload status
  - **View Calculation Button** → Modal:
    - Total emissions (tCO2e)
    - Carbon credits estimated
    - Emission factor
    - Methodology
    - Formula explanation
  - Verifier Actions:
    - Comments textarea
    - "Request Corrections" button
    - "Mark as Verified" button

**Tab 2: Corrected Submissions**
- Shows resubmitted items after corrections
- Same review workflow

**Tab 3: My Verified Submissions**
- Read-only view of verified submissions
- Passed to BEE Regulator

---

### 3. Approvals/BEE Regulator Page (BEE Regulator Role Only)

**Tab 1: For Approval**
- Table: Submission ID, Entity, Verified Date, Records, Carbon Credits
- Status: PENDING_APPROVAL
- Click row → Detail panel:
  - Submission Overview
  - Verifier Report (read-only)
    - Verifier comments
    - Quality assessment
  - Data Summary (read-only)
    - Records count
    - Quality score
  - Calculation Review (read-only)
    - Emissions calculated
    - Carbon credits proposed
  - Approval Actions:
    - Comments textarea
    - "Issue Carbon Credits" button
    - "Request Further Review" button
    - "Reject" button

**Tab 2: Approved Submissions**
- Ready for registry

**Tab 3: Rejected Submissions**
- Rejected by approver
- Submitter can resubmit

---

### 4. Registry/Blockchain Page (Registry Operator Role Only)

**Tab 1: For Registration**
- Table: Submission ID, Entity, Approved Date, Carbon Credits
- Click row → Detail panel:
  - All data (read-only cascade)
  - Blockchain Packet Builder:
    - Packet ID (auto-generated)
    - Hash
    - Timestamp
  - "Register on Blockchain" button

**Tab 2: Registered CCCs**
- All registered submissions
- Search, filter, blockchain details

---

## Implementation Tasks

### Task 1: Fix Data Model
- Add status enum: DRAFT, SUBMITTED, PENDING_VERIFICATION, REQUEST_CORRECTIONS, RESUBMITTED, VERIFIED, PENDING_APPROVAL, APPROVED, REGISTERED, REJECTED
- Add verifier_comments field
- Add approver_comments field
- Add carbon_credits_issued field
- Add blockchain_packet_id field

### Task 2: Fix Submission Wizard (Entity Submitter)
- Remove verification step
- Remove approval step
- Remove credit generation step
- Keep only: Entity Select, Data Upload, Methodology, Review & Submit
- On submit: Set status to SUBMITTED
- Add confirmation dialog before submit

### Task 3: Create "My Submissions" Tab
- List all submissions by current user
- Show status, dates, quality, actions
- Click to view details with cascading read-only data

### Task 4: Enhance Verification Page
- Build "For Verification" tab
- Add Evidence Viewer modal
- Add Calculation Viewer modal
- Add verifier action buttons
- Create "Corrected Submissions" tab
- Create "My Verified Submissions" tab

### Task 5: Enhance Approvals Page
- Build "For Approval" tab
- Show verifier report (read-only)
- Add approval action buttons
- Create "Approved Submissions" tab
- Create "Rejected Submissions" tab

### Task 6: Enhance Registry Page
- Build "For Registration" tab
- Add Blockchain Packet Builder
- Create "Registered CCCs" tab

### Task 7: Fix Carbon Data Upload Tab
- Keep only file upload + preview
- No status or workflow
- Dual-panel layout

### Task 8: Update Role-Based Navigation
- Remove inappropriate links per role
- Only show what each role needs

---

## Key Benefits

1. **Security:** Each role performs only their tasks
2. **Compliance:** Proper DMRV workflow with checks and balances
3. **Transparency:** Clear status progression
4. **Auditability:** Complete history of actions
5. **User Experience:** Clear role expectations
6. **Scalability:** Easy to add more roles/steps
