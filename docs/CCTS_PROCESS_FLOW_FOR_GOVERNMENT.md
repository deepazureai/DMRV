# Carbon Credits Trading System (CCTS) - Complete Process Flow
## ICM Digital Trust Layer - Enterprise Carbon Verification Platform

**Document Version:** 2.0  
**Last Updated:** July 2026  
**Classification:** Government Presentation Ready  
**Target Audience:** Government Leadership, IAS Officers, Ministry Officials

---

## Executive Summary

The Carbon Credits Trading System is a **7-stage, multi-stakeholder verification workflow** designed to ensure authentic carbon emissions data from industrial entities flows through government regulatory frameworks with complete transparency, audit trails, and blockchain immutability.

### Key Stats
- **7 distinct stages** with clear hand-offs between agencies
- **5 user roles** (Obligated Entity, ACVA, Check-Verifier, BEE, NSCICM)
- **Automatic data validation** (Rule-based engine + AI validation)
- **100% audit trail** (Every action timestamped and logged)
- **Real-time status tracking** for all stakeholders
- **Blockchain integration** for final carbon credit issuance

---

## Complete 7-Stage Workflow

### STAGE 1: Data Upload & Validation (Obligated Entity)
**Duration:** Day 1-2 | **Owner:** Obligated Entity | **System Role:** DMRV Portal

#### Actor: Obligated Entity (Industrial Manufacturer)
**Example:** Eastern Cement Works, Green Steel Manufacturing Ltd

#### Process Flow

```
Obligated Entity Login
        ↓
[Dashboard: View Q1 FY2026-27 Submission Deadline]
        ↓
Click "Submit Q1 FY2026-27 Carbon Data"
        ↓
[Upload Screen]
├─ Upload CSV File (Activity Data)
│  └─ Fuel consumption, electricity, production quantity
├─ Upload Supporting Documents (PDF)
│  └─ Invoices, meter readings, third-party certifications
└─ Add Comments
   └─ "This is our actual operating data for Q1 2026"
        ↓
System: Auto-Validation Triggers
├─ Data Schema Check ✓ All fields present
├─ Duplicate Detection ✓ No previous submission
├─ Format Validation ✓ Numbers in correct ranges
└─ Business Rules ✓ Emission factors match BEE standards
        ↓
[Success Message]
"Submission received. Reference: SUB-2026-Q1-ECW-001"
"Data Quality Score: 87% (2 exceptions identified)"
        ↓
AUTO-GENERATED COMMENTS (System AI Validation)
├─ ✓ "Fuel consumption data format is valid"
├─ ✓ "Electricity consumption within expected range for facility"
├─ ⚠ "Production quantity differs 3% from historical average"
├─ ⚠ "One activity record has emission factor version mismatch"
└─ ℹ "Baseline period data available - GEI calculated at 1.82 kg CO₂e/tonne"
        ↓
Dashboard Updates to: "PENDING REVIEW"
        ↓
NOTIFICATION SENT → ACVA Verifier (Dr. Priya Sharma)
"New submission ready for verification: Eastern Cement Works Q1 2026"
```

#### Auto-Generated Comments Logic
The system automatically generates 5-7 domain-specific comments:

**Comment #1 - Data Schema Validation**
- **Type:** Auto-generated (System)
- **Severity:** Info
- **Content:** "All required fields present: fuel_type, quantity, emission_factor_version, production_amount"
- **Action:** Informational

**Comment #2 - Range Validation**
- **Type:** Auto-generated (System)
- **Severity:** Warning (if deviation > 5%)
- **Content:** "Production quantity 3.2% lower than 3-year historical average"
- **Suggested Action:** Verify production schedule for Q1

**Comment #3 - Duplicate Detection**
- **Type:** Auto-generated (System)
- **Severity:** Info
- **Content:** "Checked against 24 previous submissions - no duplicates detected"
- **Action:** Clear to proceed

**Comment #4 - Baseline Consistency**
- **Type:** Auto-generated (AI)
- **Severity:** Info
- **Content:** "GEI baseline: 1.82 kg CO₂e/tonne (matches BEE Category A for cement)"
- **Action:** On track for carbon credit eligibility

**Comment #5 - Emission Factor Check**
- **Type:** Auto-generated (System)
- **Severity:** Warning
- **Content:** "1 record uses old emission factor version (v2.1 instead of current v2.3)"
- **Suggested Action:** Update to latest BEE emission factor table

#### Submission Status on Submitter Dashboard
```
Submission: Q1 FY2026-27 Data
Status: ⏳ PENDING ACVA REVIEW
Reference: SUB-2026-Q1-ECW-001
Uploaded: Jan 15, 2026 @ 10:30 AM
Data Quality: 87% (2 warnings)
Days in Current Stage: 1
Next Reviewer: Dr. Priya Sharma (TUV-SUD / ACVA)
Expected Review Completion: Jan 22, 2026
```

---

### STAGE 2: ACVA Verification Review
**Duration:** Day 3-14 (11 days) | **Owner:** ACVA Verifier (Dr. Priya Sharma) | **Organization:** TUV-SUD

#### Actor: ACVA Verifier
**Who:** Dr. Priya Sharma, Bureau Veritas / TUV-SUD  
**Authority:** Technical verification of carbon data authenticity

#### Process Flow

```
[ACVA Dashboard]
PENDING REVIEW: "Eastern Cement Works Q1 2026"
├─ Status: High Priority (87% quality score triggers review)
├─ Deadline: 11 days remaining
├─ Previous Comments: 5 auto-generated + submitter note
└─ Risk Flags: 1 warning (emission factor version)
        ↓
ACVA Clicks "Review Submission"
        ↓
[Verification Detail Page Opens]
Contains:
├─ Entity Profile
│  ├─ Name: Eastern Cement Works
│  ├─ License: ACVA-2024-ECW-7834
│  ├─ Category: Large Cement Manufacturer
│  └─ Previous Submissions: 6 (all approved)
├─ Submission Data
│  ├─ Q1 2026 Activity Records: 45 fuel entries, 32 electricity entries
│  ├─ Production Quantity: 18,450 tonnes
│  ├─ GEI Calculated: 1.82 kg CO₂e/tonne
│  └─ Estimated Carbon Credits: 245 CCCs
├─ Auto-Generated Comments (Display All 5)
│  ├─ [INFO] "Data schema valid..."
│  ├─ [WARNING] "Production 3.2% below average..."
│  ├─ [INFO] "No duplicates detected..."
│  ├─ [INFO] "Baseline consistent with BEE standards..."
│  └─ [WARNING] "1 emission factor version mismatch..."
├─ Supporting Documents
│  ├─ Fuel_Invoices_Q1_2026.pdf (Linked to 5 specific records)
│  ├─ Electricity_Bills_Q1_2026.pdf (Linked to 3 specific records)
│  └─ Production_Schedule_Q1_2026.pdf
└─ Previous Comments Thread
   ├─ System: "Initial validation passed"
   ├─ Submitter: "This data has been verified by our internal QA"
   └─ (ACVA can now add their own comments)
        ↓
ACVA Reviews Comments & Makes Edits
├─ Action: Edit auto-generated WARNING comment
│  ├─ Original: "Production 3.2% lower than 3-year average"
│  ├─ ACVA's Edit: "Production decrease is within acceptable range given Q1 2026 market conditions. ACCEPTABLE."
│  └─ Status: Modified by ACVA (manual override)
├─ Action: ADD NEW COMMENT from ACVA
│  ├─ Comment: "Verified against site inspection records from Jan 2026. All fuel and electricity quantities cross-checked with equipment calibration certificates. ✓ VERIFIED"
│  ├─ Category: Verification Assessment
│  ├─ Severity: Info (green check)
│  └─ Author: Dr. Priya Sharma (ACVA)
├─ Action: ADD FOLLOW-UP QUESTION
│  ├─ Comment: "Please provide explanation for 3.2% production variance"
│  ├─ Category: Clarification Needed
│  ├─ Severity: Warning (yellow)
│  └─ Status: Awaiting Entity Response
└─ Comment Summary: 7 comments (5 auto + 2 ACVA manual)
        ↓
ACVA Reviews Supporting Documents
├─ Clicks "Fuel_Invoices_Q1_2026.pdf"
├─ Links invoices to specific fuel entries
├─ Cross-checks quantities against supplier records
├─ Status: ✓ VERIFIED
        ↓
ACVA Decision: Click "Send Review Comments to Entity"
        ↓
[Confirmation Dialog]
"Ready to send 7 comments to Eastern Cement Works?"
├─ 5 auto-generated comments
├─ 2 ACVA manual comments
├─ 1 question requiring response
└─ Deadline for response: 7 days
        ↓
ACVA Confirms: "Send to Entity"
        ↓
[SUCCESS ALERT with Reference]
"Review comments sent successfully via DMRV Portal"
"Reference: RCV-2026-Q1-ECW-1-ACVA-PRIYA-SHARMA"
"Entity deadline for response: Jan 22, 2026 @ 5:00 PM"
        ↓
SUBMISSION STATUS CHANGES
├─ Old: "PENDING ACVA REVIEW"
└─ New: "NEEDS RESUBMISSION"
        ↓
NOTIFICATION SENT → Obligated Entity
Subject: "Review Comments Ready - Eastern Cement Works Q1 2026"
Message: "Dr. Priya Sharma (ACVA) has sent 7 review comments. 
Response required by Jan 22. Access portal to view details."
        ↓
ON ACVA DASHBOARD
├─ Submission moves from "PENDING REVIEW" to "SENT TO ENTITY"
├─ Status shows: "Awaiting entity response (7 days remaining)"
└─ Next action: Entity submits responses
```

#### ACVA Comment Types & Visibility

| Comment Type | Author | Visibility | Example |
|--------------|--------|-----------|---------|
| Auto-Generated (System) | DMRV System | Public to Entity | "Data schema validation complete" |
| Auto-Generated (AI) | AI Engine | Public to Entity | "GEI baseline consistent with BEE standards" |
| ACVA Verification | Dr. Priya Sharma | Public to Entity | "Verified against site inspection records" |
| Clarification Request | Dr. Priya Sharma | Public to Entity | "Please explain 3.2% production variance" |
| Internal Note | Dr. Priya Sharma | Private (ACVA only) | "Flag for potential supply chain issue" |

#### ACVA Edit Capabilities

ACVA can:
- ✓ Modify auto-generated comments with their professional assessment
- ✓ Add multiple new comments with different categories
- ✓ Ask clarification questions that require entity response
- ✓ Flag potential data quality issues
- ✓ Override system warnings with expert judgment
- ✓ Add supporting evidence (links to inspection reports, calibration certificates)
- ✗ Delete comments (all kept for audit trail)
- ✗ Access submitter's internal systems (read-only access only)

#### Timeline for ACVA Stage

```
Day 1-2:   Submission received + auto-validation (System)
Day 3-7:   ACVA reviews data (must complete within 5 business days)
Day 8-14:  Entity responds to ACVA questions (7-day deadline)
Day 15:    ACVA resolves follow-up questions or escalates
           If resolved → moves to Stage 3 (Check-Verifier)
           If disputes → returns to ACVA for 2nd round review
```

---

### STAGE 3: Entity Response & Resubmission
**Duration:** Day 8-15 (7 days + 1 day) | **Owner:** Obligated Entity | **System:** DMRV Portal

#### Actor: Obligated Entity (Responding to ACVA Comments)

#### Process Flow

```
[Entity Receives Notification]
Dashboard Alert: "7 review comments from Dr. Priya Sharma (ACVA)"
Status: "NEEDS RESUBMISSION"
Deadline: 7 days (Jan 22, 2026)
        ↓
Entity Clicks "View Review Comments"
        ↓
[Comments Display Page]
Shows all 7 comments with:
├─ Auto comments (5): System validations (read-only)
├─ ACVA comments (2): 
│  ├─ [INFO] "Verified against site inspection..."
│  └─ [WARNING] "Please explain 3.2% production variance"
└─ Action Required: Answer the question
        ↓
Entity Prepares Response
├─ Reason for 3.2% variance identified:
│  ├─ Q1 2026 had 2 scheduled maintenance days (Jan 8-9)
│  ├─ Unexpected power outage on Jan 15 (4 hours)
│  └─ Combined effect: 3.2% lower production
├─ Evidence attached:
│  ├─ Maintenance Schedule (internal document)
│  ├─ Power Utility Emergency Report (external document)
│  └─ Revised Production Log with annotations
└─ Entity Manager Adds Comment:
   "All questions addressed with supporting documentation"
        ↓
Entity Clicks "Submit Response to ACVA"
        ↓
[Confirmation Dialog]
"Ready to send response to Dr. Priya Sharma?"
"Include 3 supporting documents?"
└─ CONFIRM
        ↓
[SUCCESS MESSAGE]
Reference: RSP-2026-Q1-ECW-1-ENTITY-RESPONSE
Message: "Response submitted successfully"
Status: "AWAITING ACVA VERIFICATION OF RESPONSE"
        ↓
SUBMISSION STATUS CHANGES
├─ Old: "NEEDS RESUBMISSION"
└─ New: "UNDER REVIEW (Response Submitted)"
        ↓
NOTIFICATION SENT → ACVA Verifier (Dr. Priya Sharma)
Subject: "Eastern Cement Works has responded to your review comments"
Message: "View entity response with 3 supporting documents attached"
        ↓
ON ENTITY DASHBOARD
Submission Timeline shows:
│
├─ Jan 15: ACVA sent review comments (7 comments)
│
├─ Jan 22: Entity submitted response
│  └─ Question: "Why is production 3.2% below average?"
│     Entity Response: "Maintenance + power outage (evidence attached)"
│
└─ [AWAITING ACVA VERIFICATION OF RESPONSE]
```

#### Entity Response Rules

Entity can:
- ✓ View all auto-generated and ACVA comments
- ✓ Add responses to clarification questions
- ✓ Provide additional supporting documents
- ✓ Explain any data anomalies
- ✓ Request extension (adds 3 days, requires justification)
- ✗ Edit original submitted data (requires formal amendment process)
- ✗ Delete or dispute ACVA comments

---

### STAGE 4: Check-Verifier Independent Audit
**Duration:** Day 16-25 (10 days) | **Owner:** Check-Verifier | **Organization:** Bureau Veritas

#### Actor: Independent Check-Verifier
**Who:** Rajesh Kumar, Bureau Veritas  
**Authority:** Independent audit of entity's compliance with CCTS standards

#### Process Flow

```
[Check-Verifier Portal]
AUDIT QUEUE: "Eastern Cement Works - Q1 2026 (HIGH PRIORITY)"
├─ Status: Ready for Audit
├─ ACVA Review: ✓ Complete (All comments addressed)
├─ Entity Response: ✓ Received
├─ Days in Queue: 2
└─ Deadline: Must complete by Day 25
        ↓
Check-Verifier Clicks "Start Audit"
        ↓
[Independent Verification Checklist]
5 verification items to complete:

┌─ Item 1: Data Schema Verification ─────────────────────┐
│ ✓ Confirm all required fields present and valid format │
│   Status: COMPLETE (Auto-validation already done)      │
│   Check-Verifier: Reviews and confirms                 │
└─────────────────────────────────────────────────────────┘

┌─ Item 2: Baseline Consistency Review ──────────────────┐
│ ✓ Cross-check against industry baseline & BEE standards│
│   Baseline GEI: 1.82 kg CO₂e/tonne (Cement Category A) │
│   Submitted GEI: 1.82 kg CO₂e/tonne                    │
│   Status: ALIGNED ✓                                    │
│   Check-Verifier: Confirms match                       │
└─────────────────────────────────────────────────────────┘

┌─ Item 3: Emission Factor Validation ──────────────────┐
│ ⚠ Verify correct emission factors per latest guidelines│
│   Issue Found: 1 record used old EF version v2.1       │
│   Latest Version: v2.3                                 │
│   Check-Verifier Reviews:                              │
│   - Impact: 2.1% calculation variance                  │
│   - Decision: MINOR ISSUE - Acceptable with note       │
│   - Note Added: "Re-calculated with v2.3 = 1.81 kg..."│
└─────────────────────────────────────────────────────────┘

┌─ Item 4: Variance Analysis ────────────────────────────┐
│ ✓ Investigate unusual outliers or seasonal variations  │
│   Variance Found: 3.2% production decrease             │
│   Entity Explanation: Maintenance + power outage       │
│   Supporting Evidence: 3 documents attached            │
│   Check-Verifier Analysis:                             │
│   - Maintenance: Verified with site inspector report   │
│   - Power Outage: Confirmed with utility emergency log │
│   - Decision: JUSTIFIED & VERIFIED ✓                   │
└─────────────────────────────────────────────────────────┘

┌─ Item 5: ACVA Comments Resolution ────────────────────┐
│ ✓ Validate that all ACVA comments were properly addressed
│   ACVA Comment 1: "Schema validation complete" - ✓      │
│   ACVA Comment 2: "Data quality 87%" - ✓               │
│   ACVA Comment 3: "Explain 3.2% variance" - ✓ RESOLVED │
│   ACVA Comment 4: "EF version mismatch" - ✓ NOTED      │
│   ACVA Comment 5: "Baseline consistent" - ✓            │
│   Check-Verifier: All comments reviewed & resolved     │
└─────────────────────────────────────────────────────────┘

All 5 items COMPLETE ✓
        ↓
[Audit Decision Section]

┌──────────────────────────────────────────────────────┐
│ AUDIT DECISION - Select One:                        │
├──────────────────────────────────────────────────────┤
│ ○ APPROVE - Pass Independent Audit                 │
│   ✓ All verification items complete                │
│   ✓ No material issues identified                  │
│   ✓ Ready for CCC issuance                         │
│                                                      │
│ ○ CONDITIONAL - Return to ACVA for Clarification  │
│   ⚠ Minor issues found requiring explanation       │
│   ⚠ ACVA to provide additional assessment          │
│   ⚠ 7-day response deadline                        │
│                                                      │
│ ○ REJECT - Fails Independent Audit                │
│   ✗ Critical compliance gaps identified            │
│   ✗ Significant data quality issues                │
│   ✗ Entity must resubmit complete data             │
└──────────────────────────────────────────────────────┘
        ↓
Check-Verifier Selects: "APPROVE - Pass Independent Audit"
        ↓
[SUCCESS MESSAGE]
"Audit decision recorded"
Reference: CV-2026-Q1-ECW-001-APPROVED
        ↓
Check-Verifier Clicks: "Send to BEE Officer"
        ↓
[SUBMISSION STATUS UPDATED]
├─ Old: "UNDER INDEPENDENT AUDIT"
└─ New: "APPROVED BY CHECK-VERIFIER - Awaiting BEE Officer Review"
        ↓
NOTIFICATION SENT → BEE Officer
Subject: "Carbon Data Approved by Check-Verifier - Ready for Review"
Message: "Eastern Cement Works Q1 2026 submission APPROVED by Check-Verifier 
Rajesh Kumar. Reference: CV-2026-Q1-ECW-001-APPROVED. Ready for BEE Officer 
final review and CCC issuance authorization."
        ↓
ON CHECK-VERIFIER DASHBOARD
├─ Submission moves from "PENDING AUDIT" to "COMPLETED"
├─ Audit reference: CV-2026-Q1-ECW-001-APPROVED
└─ Next stage: BEE Officer Final Review
```

#### Check-Verifier Audit Types

| Audit Type | Trigger | Duration | Output |
|------------|---------|----------|--------|
| **Standard Audit** | Quality Score 70-89% | 5-7 days | Approve/Conditional/Reject |
| **Expedited Audit** | Quality Score 90%+ | 2-3 days | Usually Approve |
| **Deep Dive Audit** | Quality Score <70% | 10-14 days | Detailed report required |
| **Follow-up Audit** | Conditional decision from previous | 7 days | Verify clarifications |

---

### STAGE 5: BEE Officer Final Review & CCC Issuance
**Duration:** Day 26-30 (5 days) | **Owner:** BEE Officer | **Authority:** Federal carbon credit authority

#### Actor: BEE Officer (Final Authority)
**Role:** Authorize carbon credit issuance based on verified data

#### Process Flow

```
[BEE Officer Dashboard]
FINAL REVIEW QUEUE: "Eastern Cement Works Q1 2026"
├─ Status: Ready for CCC Issuance
├─ Check-Verifier Approval: ✓ Yes (CV-2026-Q1-ECW-001-APPROVED)
├─ Calculated CCCs: 245 credits
├─ Estimated Value: $36,750 (@ $150/credit)
└─ Deadline: 5 days to issue
        ↓
BEE Officer Reviews
├─ Check-Verifier audit report: ✓ Approved
├─ All ACVA comments: ✓ Addressed
├─ Entity response documentation: ✓ Complete
├─ Data quality score: 87% ✓
└─ Compliance check: ✓ All standards met
        ↓
BEE Officer Decision: "APPROVE FOR CCC ISSUANCE"
        ↓
[CCC Issuance Form]
├─ Submission: SUB-2026-Q1-ECW-001
├─ Carbon Credits to Issue: 245 CCCs
├─ Period: Q1 FY2026-27 (Jan 1 - Mar 31, 2026)
├─ Validity: 5 years (until Mar 31, 2031)
├─ Entity: Eastern Cement Works
├─ Issued On: Jan 30, 2026
├─ Authorized By: BEE Officer Approver (Name)
└─ Reference: CCC-2026-Q1-ECW-001
        ↓
BEE Officer Clicks: "AUTHORIZE CCC ISSUANCE"
        ↓
[CONFIRMATION]
"245 Carbon Credits authorized for issuance"
"Reference: CCC-2026-Q1-ECW-001"
        ↓
SUBMISSION STATUS CHANGES
├─ Old: "APPROVED BY CHECK-VERIFIER"
└─ New: "CCC ISSUED - Awaiting NSCICM Registration"
        ↓
BACKEND PROCESS TRIGGERS
├─ Blockchain Contract: Issue 245 CCCs to entity wallet
├─ Certificate Generation: Create official CCC document
├─ Registry Entry: Generate NSCICM registration request
└─ Notification: Send confirmation to all stakeholders
        ↓
NOTIFICATIONS SENT
├─ → Entity: "245 CCCs issued. Reference: CCC-2026-Q1-ECW-001"
├─ → ACVA: "Submission completed. CCC issuance confirmed."
├─ → Check-Verifier: "CCC issuance authorized. Audit complete."
└─ → NSCICM: "New CCC registration request pending approval"
```

#### CCC Issuance Certificate Fields

```
╔════════════════════════════════════════════════════════════╗
║         CARBON CREDIT CERTIFICATE (CCC)                  ║
╠════════════════════════════════════════════════════════════╣
║                                                            ║
║ Certificate Number:    CCC-2026-Q1-ECW-001               ║
║ Issue Date:           Jan 30, 2026                       ║
║ Expiry Date:          Mar 31, 2031                       ║
║                                                            ║
║ Issued To:            Eastern Cement Works               ║
║ License #:            ACVA-2024-ECW-7834                ║
║ Registration #:       NIC-ECW-2026-001                   ║
║                                                            ║
║ Reporting Period:     Q1 FY2026-27                       ║
║ (Jan 1, 2026 - Mar 31, 2026)                            ║
║                                                            ║
║ Verified Emissions:   33,489 tonnes CO₂e                ║
║ Baseline:             1.82 kg CO₂e/tonne                ║
║ GEI Achieved:         1.81 kg CO₂e/tonne               ║
║ Reduction:            0.55% below baseline              ║
║                                                            ║
║ Carbon Credits:       245 CCCs issued                    ║
║ (1 CCC = 1 tonne CO₂e reduction)                        ║
║                                                            ║
║ Authorized By:        Dr. BEE Officer Approver           ║
║ Verified By:          Rajesh Kumar, Bureau Veritas       ║
║ Reviewed By:          Dr. Priya Sharma, TUV-SUD          ║
║                                                            ║
║ Blockchain Hash:      0x7a3f8c9b2d1e4f5a6b9c...         ║
║ Smart Contract:       0x9f8e7d6c5b4a3210...             ║
║                                                            ║
║ Valid For Trading On: BEE Carbon Registry               ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

---

### STAGE 6: NSCICM & Central Government Approval
**Duration:** Day 31-45 (15 days) | **Owner:** NSCICM | **Authority:** National carbon credit authority

#### Actor: NSCICM Officer (Registration Authority)

#### Process Flow

```
[NSCICM Registration System]
PENDING REGISTRATION: "Eastern Cement Works - 245 CCCs"
├─ Submitted By: BEE Officer
├─ BEE Reference: CCC-2026-Q1-ECW-001
├─ Status: New Registration Request
├─ Blockchain Status: Pending NSCICM Signature
└─ Days in Queue: 2
        ↓
NSCICM Officer Reviews
├─ Entity Verification: ✓ Registered in NSCICM database
├─ BEE Authorization: ✓ Confirmed (CCC-2026-Q1-ECW-001)
├─ Blockchain Smart Contract: ✓ Valid
├─ Compliance Check: ✓ All requirements met
└─ Documentation: ✓ Complete
        ↓
NSCICM Officer Decision: "APPROVE FOR REGISTRATION"
        ↓
[Registration Authorization]
├─ National Registry Entry: NRC-2026-ECW-001
├─ CCCs to Register: 245
├─ Serial Numbers: NRC-2026-ECW-001 through NRC-2026-ECW-245
├─ Entity NSCICM ID: NIC-ECW-2026
└─ Locked Until: Mar 31, 2031 (expiry date)
        ↓
NSCICM Officer Clicks: "REGISTER CCCs ON NATIONAL REGISTRY"
        ↓
BACKEND PROCESS
├─ Smart Contract: Execute final blockchain signature
├─ Registry Database: Create 245 individual CCC records
├─ Serial Numbers: Generate unique blockchain tokens
├─ Lock Timestamp: Record registration date/time
└─ Audit Log: Complete chain of custody recorded
        ↓
[SUCCESS - CCCs NOW LIVE ON NATIONAL REGISTRY]
        ↓
NSCICM REGISTRATION CERTIFICATE
```
Certificate Generated (Blockchain-backed):
```
NRC-2026-ECW-001 THRU NRC-2026-ECW-245
Eastern Cement Works - Q1 2026 Carbon Credits
Registered: Jan 30, 2026 @ NSCICM
Valid Until: Mar 31, 2031
Blockchain Confirmations: 147
Status: ✓ REGISTERED & TRADEABLE
```

```
        ↓
SUBMISSION STATUS CHANGES
├─ Old: "CCC ISSUED - AWAITING NSCICM REGISTRATION"
└─ New: "✓ CARBON CREDITS ISSUED & REGISTERED - COMPLETE"
        ↓
FINAL NOTIFICATIONS SENT
├─ → Entity: "245 CCCs registered on NSCICM registry"
│           "Serial: NRC-2026-ECW-001 thru NRC-2026-ECW-245"
│           "Now available for trading"
├─ → BEE: "Registration complete. CCC-2026-Q1-ECW-001"
├─ → ACVA: "Submission lifecycle complete"
├─ → Check-Verifier: "Audit cycle completed successfully"
└─ → Ministry: "New carbon credits registered (245 CCCs)"
```

#### Entity Now Has

- ✓ 245 blockchain-backed carbon credits
- ✓ Serial numbers: NRC-2026-ECW-001 through NRC-2026-ECW-245
- ✓ Trading capability on BEE Carbon Exchange
- ✓ Credits locked until Mar 31, 2031
- ✓ Can sell on open market or keep for compliance offset
- ✓ Complete audit trail on blockchain

---

### STAGE 7: Carbon Credits Trading & Blockchain Registration
**Duration:** Day 46+ (Ongoing) | **Owner:** Entity / BEE Carbon Exchange

#### Actor: Obligated Entity (Now a CCC Holder)

#### Process Flow

```
[Entity Trading Dashboard]
CARBON CREDITS PORTFOLIO: 245 CCCs (Q1 2026)
├─ Serial Range: NRC-2026-ECW-001 to NRC-2026-ECW-245
├─ Status: ✓ Registered and Tradeable
├─ Acquisition Value: $36,750 (@ issuance)
├─ Current Market Price: $165/CCC
├─ Portfolio Value: $40,425 (21% appreciation)
├─ Expiry: Mar 31, 2031
└─ 5-Year Options:
   ├─ Hold for compliance offset requirements
   ├─ Sell on BEE Carbon Exchange
   ├─ Use in bilateral trades
   └─ Retire for corporate sustainability goals
        ↓
ENTITY DECISION OPTIONS

Option 1: SELL CREDITS
Entity clicks "Sell 100 CCCs on Exchange"
├─ Quantity: 100 CCCs
├─ Reserve Price: $160/CCC
├─ Listing Fee: $500
└─ Expected Revenue: $16,000 (after fees)
        ↓
Buyers on Exchange see listing
Buyer purchases 100 CCCs @ $165/CCC
        ↓
[BLOCKCHAIN TRANSACTION]
├─ Transfer: NRC-2026-ECW-001 thru NRC-2026-ECW-100
├─ From: Eastern Cement Works wallet
├─ To: Buyer Company wallet
├─ Amount Received: $16,500
├─ Commission to Exchange: 1%
└─ Timestamp: Recorded on blockchain

Result: Entity now has $16,500 cash + 145 CCCs remaining

Option 2: USE FOR COMPLIANCE
Entity keeps all 245 CCCs for their own compliance offset
├─ 2026 Baseline: 33,489 tonnes CO₂e
├─ Achieved: 33,454 tonnes CO₂e
├─ Excess Performance: 35 tonnes (covered by 35 CCCs)
├─ Surplus CCCs: 210 (can sell or hold)
└─ Compliance Status: ✓ COMPLIANT

Option 3: RETIRE CREDITS
Entity retires 50 CCCs for voluntary carbon offset
├─ Action: "Retire 50 CCCs for Corporate Sustainability"
├─ Reason: "2026 Carbon Neutrality Initiative"
├─ Blockchain Status: Credits marked as RETIRED (irreversible)
├─ CSR Report: Certificates generated (for annual report)
└─ Remaining Tradeable: 195 CCCs
```

#### Complete Blockchain Trail

Every CCC has complete, immutable history:

```
CCC Serial: NRC-2026-ECW-045
├─ Issued: Jan 30, 2026 @ BEE Officer Approver
├─ Registered: Jan 30, 2026 @ NSCICM
├─ Initial Owner: Eastern Cement Works (NIC-ECW-2026)
├─ Transaction 1: Sold to Green Energy Corp Feb 15, 2026 ($165)
├─ Transaction 2: Sold to Sustainability Fund Corp Mar 10, 2026 ($172)
├─ Transaction 3: Retired Mar 25, 2026 (Carbon Offset Program)
├─ Final Status: RETIRED - No longer in circulation
└─ Blockchain Hash: 0x7a3f8c9b2d1e4f5a6b9c... ✓ VERIFIED
```

---

## Cross-Stage: Submission Status Tracker for Submitter

The submitter (Obligated Entity) sees this complete journey in their dashboard:

```
╔═══════════════════════════════════════════════════════════════════════╗
║           SUBMISSION STATUS TRACKER - Real-Time View                 ║
║        Eastern Cement Works | Q1 FY2026-27 (SUB-2026-Q1-ECW-001)    ║
╚═══════════════════════════════════════════════════════════════════════╝

STAGE 1: DATA UPLOAD & VALIDATION
Status: ✓ COMPLETE (Jan 15, 2026)
├─ You uploaded: CSV file + 3 supporting documents
├─ System auto-validation: PASSED (87% quality score)
├─ Comments generated: 5 automatic system comments
└─ Next: ACVA Verification Review (in progress)

STAGE 2: ACVA VERIFICATION REVIEW
Status: ⏳ IN PROGRESS (9 days remaining)
├─ Reviewer: Dr. Priya Sharma (TUV-SUD / ACVA)
├─ Review started: Jan 15, 2026
├─ Comments received: 7 total (5 auto + 2 manual)
├─ Action required: RESPOND TO QUESTIONS
└─ Deadline: Jan 22, 2026 @ 5 PM
─ ✓ Response submitted: Jan 22, 2026

STAGE 3: ENTITY RESPONSE & RESUBMISSION
Status: ✓ COMPLETE (Jan 22, 2026)
├─ Your response: "Addressed all 7 comments with documentation"
├─ Follow-up question answered: "Production variance explained"
├─ Documents provided: 3 supporting attachments
└─ Next: Independent Audit Review (processing)

STAGE 4: CHECK-VERIFIER INDEPENDENT AUDIT
Status: ⏳ IN PROGRESS (2 days remaining)
├─ Auditor: Rajesh Kumar (Bureau Veritas)
├─ Audit started: Jan 23, 2026
├─ Checklist items: 5 of 5 complete
├─ Current decision: APPROVED
└─ Expected completion: Jan 25, 2026

STAGE 5: BEE OFFICER FINAL REVIEW & CCC ISSUANCE
Status: ⏰ PENDING (Awaiting Check-Verifier completion)
├─ Calculated CCC Award: 245 credits
├─ Expected issuance: Jan 30, 2026
├─ Blockchain contract: Ready
└─ Smart contract: Prepared for issuance

STAGE 6: NSCICM & CENTRAL GOVT APPROVAL
Status: ⏰ PENDING (After BEE Officer)
├─ Registry entry: Will be created automatically
├─ National registry: Pending registration
├─ Blockchain lock: To be finalized
└─ Trading enabled: After NSCICM approval

STAGE 7: CARBON CREDITS ISSUED & TRADEABLE
Status: ⏰ PENDING (Final stage)
├─ Trading status: Will enable after registration
├─ Your wallet: Ready to receive CCCs
├─ Serial numbers: NRC-2026-ECW-001 thru NRC-2026-ECW-245
└─ Market access: After full registration

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CURRENT STATUS SUMMARY:
├─ Overall Progress: 54% (Stages 1-3 complete, Stage 4 in progress)
├─ Days elapsed: 10 days
├─ Days to carbon credits: ~20 more days estimated
├─ Your pending actions: None (awaiting auditor review)
└─ Next milestone: Independent Audit Completion (Jan 25)
```

---

## To-and-Fro Interactions Between Actors

### Interaction #1: ACVA ↔ Entity (Comment Exchange)

```
FLOW A: Standard Review + Response

ACVA sends review comments to Entity:
  └─ "Please explain 3.2% production variance"

Entity responds with:
  └─ "Maintenance + power outage (see attached documents)"

ACVA receives response and:
  ├─ Reviews supporting documents
  ├─ Confirms explanation is valid
  ├─ Updates comment: "VERIFIED - Acceptable"
  └─ Approves submission to proceed


FLOW B: Dispute Resolution

ACVA questions data quality:
  └─ "Emission factor version appears outdated"

Entity challenges ACVA assessment:
  └─ "We used the correct version per BEE guideline v2.1"

ACVA reviews entity challenge:
  ├─ Checks BEE guidelines
  ├─ Finds v2.3 is now current
  ├─ But acknowledges v2.1 was valid at submission time
  ├─ Updates comment: "Acceptable with recalculation noted"
  └─ Issues: "Use v2.3 for future submissions"

Entity acknowledges and saves guidance
  └─ Future submissions will use v2.3
```

---

### Interaction #2: Check-Verifier ↔ ACVA (Audit Review)

```
Check-Verifier receives submission:
  └─ Reviews all ACVA comments and entity responses

Check-Verifier questions ACVA's assessment:
  └─ "Did you independently verify the maintenance claim?"

ACVA responds:
  ├─ "I reviewed utility emergency report (attached)"
  ├─ "Cross-referenced with site inspection dated Jan 20"
  ├─ "Maintenance records available upon request"
  └─ "Conclusion: VERIFIED as accurate"

Check-Verifier continues:
  └─ "Excellent documentation. I concur with verification."

Check-Verifier completes independent audit:
  └─ "All ACVA assessments validated. Recommend APPROVAL."
```

---

### Interaction #3: Entity ↔ BEE Officer (During Appeal)

```
Scenario: Entity disputes CCC quantity awarded

Entity submits appeal:
  └─ "We believe calculation should be 250 CCCs not 245"
     └─ Reason: "Production data includes offsite facility"

BEE Officer reviews appeal:
  ├─ Checks original submission
  ├─ Reviews ACVA assessment
  ├─ Checks Check-Verifier's calculation
  └─ Notes: "Offsite facility not in this period's scope per rules"

BEE Officer responds to entity:
  └─ "Appeal DENIED - 245 CCCs is correct per CCTS rules"
     └─ "Please resubmit Q2 data including offsite facility"

Entity accepts decision:
  └─ Proceeds with 245 CCCs for current period
```

---

## Key System Features Visible to Government Leadership

### 1. Audit Trail Completeness
Every action is recorded with:
- **Timestamp** (down to second)
- **Actor** (name, role, organization)
- **Action** (uploaded, reviewed, commented, approved)
- **Changes** (what was modified)
- **Justification** (why the decision was made)

Example:
```
Jan 15, 2026 10:30:47 | Eastern Cement Works | Data Upload
  └─ Uploaded: activity_data_q1_2026.csv (1,200 records)

Jan 15, 2026 10:31:15 | DMRV System | Auto-Validation
  └─ Data Quality: 87% | Exceptions: 2 (logged)

Jan 15, 2026 14:30:22 | Dr. Priya Sharma (TUV-SUD) | Review Started
  └─ Status changed to "UNDER REVIEW"

Jan 15, 2026 16:45:33 | Dr. Priya Sharma (TUV-SUD) | Comment Added
  └─ "Emission factor version needs verification"
  └─ Severity: Warning | Category: Data Quality

Jan 22, 2026 11:20:15 | Eastern Cement Works | Response Submitted
  └─ Added 3 supporting documents
  └─ Response: "All issues addressed"

Jan 23, 2026 09:15:42 | Rajesh Kumar (Bureau Veritas) | Audit Initiated
  └─ Checklist progress: 0/5 items complete

Jan 25, 2026 14:55:08 | Rajesh Kumar (Bureau Veritas) | Decision Made
  └─ Status: "APPROVED FOR CCC ISSUANCE"
  └─ Reference: CV-2026-Q1-ECW-001-APPROVED
```

### 2. Workflow Intelligence
System auto-generates comments using AI:
- Data validation rules
- Emission factor checks
- Baseline consistency analysis
- Anomaly detection

Human experts then:
- Review auto-generated comments
- Add their professional judgment
- Can override or refine recommendations
- All changes tracked in audit

### 3. Real-Time Dashboards by Role

**Entity Dashboard:**
```
PENDING ACTIONS: 0
AWAITING REVIEWS: 1 submission (Stage 4: Check-Verifier Audit)
COMPLETED: 0 submissions (full cycle)
ISSUED CREDITS: 0 CCCs (pending completion)
```

**ACVA Dashboard:**
```
PENDING REVIEW: 2 submissions
IN PROGRESS: 0 submissions
COMPLETED: 45 submissions (this quarter)
SUCCESS RATE: 97% (44 approved, 1 rejected)
AVG REVIEW TIME: 6.2 days
```

**Check-Verifier Dashboard:**
```
AUDIT QUEUE: 3 pending
IN AUDIT: 1 submission
COMPLETED: 38 submissions (this quarter)
APPROVAL RATE: 94% (35 approved, 2 conditional, 1 rejected)
AVG AUDIT TIME: 7.8 days
```

**BEE Officer Dashboard:**
```
READY FOR ISSUANCE: 1 submission (245 CCCs)
CCC ISSUED THIS MONTH: 1,245 credits
NSCICM REGISTERED: 890 credits
TOTAL PORTFOLIO: 89,450 CCCs issued YTD
```

---

## Government Leadership Presentation Talking Points

### Point 1: End-to-End Transparency
- 7-stage workflow with hand-offs between independent agencies
- Each stage has specific actor, clear authority, and defined timeline
- Complete audit trail of all decisions and modifications
- No single entity can unilaterally approve or manipulate data

### Point 2: Automated Compliance
- System auto-generates 5-7 domain-specific review comments
- AI-powered validation checks data against BEE standards
- Business rules engine automatically applies government regulations
- Reduces human error, speeds up processing, ensures consistency

### Point 3: Multi-Layer Verification
- **Layer 1:** ACVA (Technical verification of data authenticity)
- **Layer 2:** Check-Verifier (Independent 3rd-party audit)
- **Layer 3:** BEE Officer (Government final authority)
- Each layer can challenge or refine previous decisions

### Point 4: Real-Time Stakeholder Visibility
- Entities see exactly where their submission is in workflow
- Remaining deadlines and actions required clearly displayed
- Comments organized by source (auto vs. human, ACVA vs. Check-Verifier)
- Complete response history available for accountability

### Point 5: Blockchain Immutability
- All final CCC issuances recorded on blockchain
- Each credit has unique serial number and transaction history
- Cannot be altered after NSCICM registration
- Complete chain of custody from issuance through trading

### Point 6: Scalability & Efficiency
- Process optimized for monthly submissions from 500+ entities
- Auto-validation handles 95% of routine checks
- Human experts focus on complex/edge cases only
- Average cycle: 30-45 days (target: reduce to 21 days)

---

## Summary Table: 7-Stage Workflow

| Stage | Actor | Duration | Authority | Key Output | Next Step |
|-------|-------|----------|-----------|-----------|-----------|
| 1 | Entity | Day 1-2 | Submitter | Data Quality Score | ACVA Review |
| 2 | ACVA | Day 3-14 | TUV-SUD/Verifier | Review Comments | Entity Response |
| 3 | Entity | Day 8-15 | Submitter | Response + Evidence | Check-Verifier Audit |
| 4 | Check-Verifier | Day 16-25 | Bureau Veritas | Audit Decision | BEE Officer Review |
| 5 | BEE Officer | Day 26-30 | Federal Authority | CCC Authorization | NSCICM Registration |
| 6 | NSCICM | Day 31-45 | National Authority | Registry Entry | Trading Enabled |
| 7 | Entity | Day 46+ | Market | CCC Trading | Portfolio Management |

---

## Conclusion

The CCTS platform transforms carbon credit issuance from a manual, error-prone process into a **transparent, multi-layered verification system** with:

✓ Complete audit trails  
✓ Real-time stakeholder visibility  
✓ Automated compliance checking  
✓ Independent 3-party verification  
✓ Blockchain immutability  
✓ Scalable to thousands of entities monthly  

This framework ensures **government confidence in carbon credit authenticity** while **streamlining the operational workflow** for all participating agencies and industries.

---

**Document Prepared For:** Government Leadership Presentation  
**Classification:** Open - Stakeholder Communication  
**Last Updated:** July 26, 2026  
**Next Review:** October 2026 (Post-Q2 Submissions Analysis)
