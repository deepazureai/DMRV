# DMRV Workflow Gaps - Quick Reference & Visual Map

## Process Flow - Current vs Required

### CURRENT BROKEN FLOW:
```
Obligated Entity Upload → ACVA Review → ❌ STUCK
                                         (Comments don't reach submitter)
                                         (No resubmission path)
                                         (No downstream handshakes)
```

### REQUIRED COMPLETE FLOW:
```
1. OBLIGATED ENTITY
   ├─ Upload data → Submit
   └─ Queue: Awaiting ACVA review
                    ↓
2. ACVA VERIFIER
   ├─ Reviews submission
   ├─ Auto-generates comments
   ├─ Edits/customizes comments
   └─ Sends to submitter → Queue: Awaiting submitter response
                    ↓
3. OBLIGATED ENTITY (FEEDBACK LOOP)
   ├─ Views ACVA feedback
   ├─ Responds: Acknowledge / Resubmit / Appeal
   ├─ Uploads corrected files (if resubmitting)
   └─ Queue: Resubmitted for review OR Escalated
                    ↓
4. CHECK-VERIFIER
   ├─ Views ACVA findings + submitter response
   ├─ Conducts independent audit
   ├─ Agrees/Disagrees with ACVA
   ├─ May query submitter if needed
   └─ Issues verification approval → Queue: Awaiting BEE approval
                    ↓
5. BEE-OFFICER
   ├─ Reviews Check-Verifier approval
   ├─ Validates GEI calculation
   ├─ Final approval or rejection
   └─ Approves → Trigger CCC issuance
                    ↓
6. ICM REGISTRY
   ├─ Receives approved submission
   ├─ Creates blockchain record
   ├─ Generates CCC certificates
   └─ Issues to submitter
                    ↓
7. OBLIGATED ENTITY (FINAL)
   ├─ Receives CCC certificates
   ├─ Views blockchain proof
   └─ Can use CCCs for compliance
```

---

## Gap Matrix - What's Missing

| Gap # | Workflow | Current | Required | Impact | Priority |
|-------|----------|---------|----------|--------|----------|
| 1 | Golden Path Visibility | Text not visible | Dark/white background | Navigation unclear | MEDIUM |
| 2 | ACVA → Entity Feedback | MISSING | Show in dashboard | **BREAKS FLOW** | **CRITICAL** |
| 3 | Entity Re-submission | MISSING | Upload corrected files | **BREAKS FLOW** | **CRITICAL** |
| 4 | Check-Verifier Access | MISSING | Queue of submissions | **BREAKS FLOW** | **CRITICAL** |
| 5 | Check → ACVA Handshake | MISSING | Can flag discrepancies | Verification integrity | HIGH |
| 6 | BEE Officer Approval | MISSING | Final approval workflow | **BREAKS FLOW** | **CRITICAL** |
| 7 | ICM Registry Upload | MISSING | Blockchain creation | **BREAKS FLOW** | **CRITICAL** |
| 8 | Entity Gets CCC | MISSING | Certificate delivery | **BREAKS FLOW** | **CRITICAL** |
| 9 | Notifications | MISSING | Real-time alerts | User experience | HIGH |
| 10 | Audit Trail | MISSING | Activity logging | Compliance | MEDIUM |

---

## Critical Workflow Breaks - Detailed View

### Break #1: ACVA Comments Don't Reach Submitter
```
Current:
ACVA Verifier edit comments → Click "Send" → ❌ Nothing happens to submitter
Submitter sees "Review Comments Pending" → Click → "Access Denied"

Fix Required:
1. Store ACVA comments in submission record
2. Create "Feedback" section in entity dashboard
3. Show ACVA comments with timestamp + actor info
4. Add "Acknowledge", "Resubmit", "Appeal" buttons
5. Track submitter response status
```

### Break #2: No Resubmission Path
```
Current:
Submitter can't upload corrected files after ACVA feedback
No way to track multiple submission versions

Fix Required:
1. Add "Upload Corrected Files" button after viewing feedback
2. Version tracking: v1, v2, v3, etc.
3. Store submitter explanation for changes
4. Status: "Resubmitted for Review"
5. Cycle back to ACVA with new submission
```

### Break #3: Check-Verifier Not in Queue
```
Current:
Check-Verifier role exists but no submissions to review
No view of ACVA findings or submitter data

Fix Required:
1. Check-Verifier dashboard showing approved ACVA submissions
2. View ACVA's verification report + comments
3. Access to original submission data
4. Independent audit findings issuance
5. Can agree/disagree with ACVA or request more docs
6. Escalation path if findings conflict
```

### Break #4: BEE Officer Not in Queue
```
Current:
BEE Officer role exists but can't approve submissions
No trigger for CCC issuance

Fix Required:
1. BEE Officer dashboard showing Check-Verifier approved submissions
2. View complete verification chain (ACVA + Check-Verifier)
3. Final approval or rejection
4. Approval triggers "Issue CCCs" action
5. Can request additional verification if needed
```

### Break #5: No Blockchain/CCC Creation
```
Current:
Submissions end at verification stage
No blockchain record or certificate generated

Fix Required:
1. BEE approval → Send to ICM Registry API
2. ICM Registry creates blockchain transaction
3. Generate CCC serial numbers
4. Create immutable certificate with blockchain proof
5. Return certificate to submitter
6. Records searchable in registry
```

---

## Implementation Task Checklist

### Phase 1: Immediate Fixes (High Impact, Low Effort)
- [ ] Fix Golden Path text contrast (30 min)
- [ ] Rename "Review Comments Pending" → "ACVA Feedback Pending" (5 min)
- [ ] Create "Feedback" dashboard section for entity (1 hour)
- [ ] Display ACVA comments in feedback section (1 hour)

### Phase 2: Critical Workflows (High Impact, Medium Effort)
- [ ] Submitter "Resubmit with Corrections" workflow (1.5 hours)
- [ ] Check-Verifier dashboard & submission queue (2 hours)
- [ ] Check-Verifier independent audit issuance (1 hour)
- [ ] BEE Officer dashboard & approval workflow (1.5 hours)
- [ ] Add notification system (1.5 hours)

### Phase 3: Blockchain Integration (High Impact, High Effort)
- [ ] ICM Registry API integration (2 hours)
- [ ] Blockchain record creation (1.5 hours)
- [ ] CCC certificate generation (1 hour)
- [ ] Submitter certificate dashboard (1 hour)

### Phase 4: Secondary Features (Medium Impact, Low Effort)
- [ ] Check-Verifier ↔ Submitter CAR queries (1 hour)
- [ ] Audit trail/activity logging (1 hour)
- [ ] Public registry search (1.5 hours)

---

## Role Queue States - What Each Actor Should See

### Obligated Entity Dashboard Queue Sections:
```
1. "Awaiting My Submission" → Upload data
2. "Submitted for Review" → Waiting on ACVA (status tracker)
3. "ACVA Feedback Pending" → View comments, respond/resubmit
4. "Resubmitted - Under Review" → Second review in progress
5. "Approved by BEE" → CCC certificates ready
6. "Rejected" → Reason + appeal option
```

### ACVA Verifier Dashboard Queue Sections:
```
1. "New Submissions" → Awaiting review
2. "In Review" → Currently reviewing
3. "Awaiting Submitter Response" → Sent feedback, waiting for acknowledgment
4. "Resubmitted - To Review" → Entity resubmitted corrected data
5. "Approved for Check-Verification" → Sent to Check-Verifier
```

### Check-Verifier Dashboard Queue Sections:
```
1. "ACVA Verified Submissions" → Ready for audit
2. "In Audit" → Currently verifying
3. "Discrepancies Found" → Flag to ACVA
4. "Approved for BEE" → Ready for final approval
5. "Escalated" → Conflict with ACVA findings
```

### BEE Officer Dashboard Queue Sections:
```
1. "Awaiting Final Approval" → Verified submissions
2. "Approved - Issuing CCCs" → In progress
3. "Rejected" → Sent back with reason
4. "CCCs Issued" → Archive of completed submissions
```

### ICM Registry Dashboard Queue Sections:
```
1. "From BEE - To Register" → Awaiting blockchain processing
2. "Processing" → Creating certificate
3. "Issued" → Live on blockchain
4. "Searchable Records" → Public ledger view
```

---

## Critical Data Flow - What Gets Passed Between Roles

### Entity → ACVA:
- Submission ID
- Raw activity data
- Uploaded files/evidence
- GEI calculation request

### ACVA → Entity:
- Auto-generated comments
- Edited comments (with changes highlighted)
- Severity ratings (CRITICAL/MAJOR/MINOR)
- Request for: Clarification / Additional docs / Resubmission
- Timestamp of feedback

### Entity → ACVA (Response):
- Acknowledgment status
- New uploaded files (if resubmitting)
- Submitter explanation/response to comments
- Appeal request (if applicable)

### ACVA → Check-Verifier:
- Verification report
- Final comments
- Recommended CCC amount
- GEI calculation
- Approval status

### Check-Verifier → BEE Officer:
- Independent audit findings
- Agreement/disagreement with ACVA
- Any discrepancies flagged
- Approval for issuance
- Timestamp of verification

### BEE Officer → ICM Registry:
- Complete submission package
- All verification approvals
- GEI calculation
- CCC amount approved
- Actor signatures/approvals (hashed)
- Submission hash for blockchain

### ICM Registry → Entity:
- CCC Certificate ID
- Serial number range
- Blockchain transaction hash
- Certificate URL (for download/proof)
- Timestamp

---

## Success Criteria - When Workflow is Complete

✅ Entity submits data AND receives CCC end-to-end  
✅ All handshakes between roles working bidirectionally  
✅ Feedback loops enable iteration if issues found  
✅ Blockchain records immutable and verifiable  
✅ Certificates issued and trackable  
✅ All actors have appropriate dashboard queues  
✅ Notifications inform actors of status changes  
✅ Process unbreakable from start to finish  

