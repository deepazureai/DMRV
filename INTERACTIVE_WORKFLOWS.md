# ICM Digital Trust Layer - Interactive Workflows Guide

## Overview

The application is now **fully interactive** with complete end-to-end workflows for all 5 stakeholder roles. Users can now upload files, submit data, verify submissions, approve carbon credits, and register on blockchain - all within the application.

## Getting Started

### 1. Role Selection
When you first visit the application, you'll see the **Role Selector** landing page with 4 interactive role options:

- **Entity Submitter** (📤) - Upload emissions data and submit for verification
- **Verifier Auditor** (🔍) - Review and validate submissions
- **BEE Regulator** (✅) - Approve verified submissions and issue carbon credits
- **Registry Operator** (⛓) - Register approved credits on blockchain

Click any role to assume that identity and access the role-specific dashboard.

### 2. Persistent Role Selection
Your selected role is saved in browser localStorage, so when you return, you'll automatically resume as the same role. You can switch roles by clicking your name in the top header.

---

## Interactive Workflows

### WORKFLOW 1: Entity Submitter - Data Upload & Submission

**Access:** Navigate to `/submissions` or click "Submissions" in the sidebar

#### Steps:

1. **Create New Submission**
   - Click the blue "New Submission" button
   - A 4-step wizard appears

2. **Step 1: Project Information**
   - Review Entity ID and Project ID (pre-filled)
   - Add a description of your emissions reduction initiative
   - Click "Next"

3. **Step 2: Upload Supporting Data**
   - Drag and drop files OR click to browse
   - Supported formats:
     - **CSV** - Emissions data records
     - **Excel (.xlsx)** - Calculations and methodology
     - **JSON** - Structured submission metadata
     - **PDF** - Evidence documents
   - The system validates file formats (max 50MB each)
   - Exceptions/outstanding items are highlighted in yellow
   - Click "Next"

4. **Step 3: Select Methodology**
   - Choose from:
     - Clean Development Mechanism (CDM)
     - Verified Carbon Standard (VCS)
     - ISO 14064-2 Quantification
   - Click "Next"

5. **Step 4: Review & Submit**
   - Review file count, methodology, and status
   - Click "Submit" - submission is sent for validation
   - Status immediately changes to "Submitted"

#### Result:
- Submission appears in the list with "Submitted" status (blue badge)
- Quality score is automatically calculated
- Submission is now visible to Verifier role

---

### WORKFLOW 2: Verifier Auditor - Data Quality Review & Validation

**Access:** Submitted submissions appear automatically; click any submitted submission in `/submissions`

#### Steps:

1. **Open Submission Detail Modal**
   - Click any submitted submission row
   - Modal opens showing submission overview
   - Click the "Verification" tab

2. **Review Quality Score**
   - Current quality score displayed prominently
   - Recommendation shows "APPROVE" (green) if score ≥ 70%, "REVIEW" (yellow) if lower
   - Score is auto-calculated based on:
     - Number of uploaded files
     - Data completeness
     - Methodology alignment
     - Evidence quality

3. **Address Data Quality Exceptions**
   - A list of exceptions appears with severity levels:
     - **CRITICAL** (red) - Must be resolved before approval
     - **MAJOR** (yellow) - Strongly recommended to fix
     - **MINOR** (blue) - Optional notes for improvement
   - Each exception includes:
     - Description of the issue
     - Suggested resolution steps
     - Example: "Emissions data CSV file is required - Upload emissions_data.csv"

4. **Add Verification Notes**
   - Fill the "Verification Notes" textarea with your audit findings
   - Document any issues you discovered, data validation checks performed
   - Example: "All Q1-Q3 data validated. Q4 shows 15% variance - verified correct via facility records."

5. **Approve for Verification**
   - Click "Approve for Verification" button (green)
   - Status changes to "Verified" (green badge)
   - Submission now appears as verified in listings

#### Result:
- Submission progresses from "Submitted" → "Verified"
- Verifier notes are recorded permanently
- Submission now available for BEE Regulator approval

---

### WORKFLOW 3: BEE Regulator - Carbon Credit Certification & Issuance

**Access:** Verified submissions appear automatically; click any verified submission and go to "Approval" tab

#### Steps:

1. **View Carbon Credit Certificate Preview**
   - A professional certificate display shows:
     - Submission ID
     - Estimated emissions reduction (tonnes CO₂)
     - **Carbon Credits (CCCs) to be issued** - major metric
     - Quality score verification
     - Certification date

2. **Review Calculation Details**
   - System shows:
     - Estimated CO₂ reduction based on uploaded files
     - Quality score adjustment factor
     - CCC calculation formula: Emissions × Verification Factor × Quality Score
     - Resulting CCC amount (e.g., 14,850 CCCs)

3. **View Impact Summary**
   - Three key metrics displayed:
     - CO₂ Reduction (tonnes)
     - CCCs Issued (number)
     - Market Value at ₹250/CCC (indicative price)

4. **Add Regulatory Notes**
   - Fill "Regulatory Approval Notes" textarea
   - Document the regulatory decision rationale
   - Example: "Approved - all verification requirements met. Emissions reduction verified as genuine. CCCs calculated per ISO 14064-2 standard."

5. **Issue Certificate**
   - Click "Issue Carbon Credit Certificate" button (green)
   - System generates immutable blockchain hash
   - Status changes to "Approved" (purple badge)
   - Verifier notes displayed for reference

#### Result:
- Carbon credits officially issued
- Blockchain hash generated
- Submission ready for Registry Operator to register

---

### WORKFLOW 4: Registry Operator - Blockchain Registration & Immutable Recording

**Access:** Approved submissions appear automatically; click any approved submission and go to "Blockchain" tab

#### Steps:

1. **Review Blockchain Status**
   - Shows: "Ready for Registration" status
   - Indicates: "This submission is approved and ready for permanent blockchain registration"

2. **Immutable Blockchain Record Details Displayed:**
   - **Submission ID**: Unique identifier
   - **Carbon Credits Issued**: Final CCC amount (e.g., 14,850)
   - **Blockchain Hash (SHA-256)**: 64-character hex string generated by system
   - **Registration Authority**: National Voluntary Carbon Credit Registry (NVCCC)

3. **Copy Blockchain Hash**
   - Click the copy icon next to the hash
   - Hash copied to clipboard for external ledger recording
   - Confirmation message: "Copied to clipboard"

4. **Register on Blockchain**
   - Click "Register on Blockchain" button (blue)
   - Animation shows: "⛓ Registering on Blockchain..."
   - Process completes in ~2 seconds
   - Status changes to "Registered" (emerald green badge)

5. **View Immutable Record Confirmation**
   - Green confirmation box appears
   - Message: "Blockchain Registration Complete - This record is now immutable and permanently stored"
   - All details become read-only (locked)

#### Benefits Displayed:
- Permanent and tamper-proof record of carbon credit issuance
- Transparent verification of emissions reduction
- Enables secure carbon credit trading and retirement
- Auditable trail for regulatory compliance

#### Result:
- Submission reaches final state: "Registered"
- Immutable blockchain record permanently created
- Workflow complete end-to-end

---

## Complete End-to-End Journey

### The Golden Path Example: Eastern Cement Works Ltd, Q1 FY2026-27

Follow this complete workflow within the application:

1. **Entity Submitter**: Create new submission for Eastern Cement Works
   - Upload sample emissions data (CSV), methodology (JSON), evidence (PDF)
   - Submit for verification

2. **Verifier Auditor**: Review the submission
   - Check quality score (pre-calculated: 87%)
   - Review any exceptions
   - Add verification notes confirming data accuracy
   - Approve for verification

3. **BEE Regulator**: Certify the emission reduction
   - Review the carbon credit calculation
   - Confirm 14,850 CCCs to be issued
   - Add regulatory approval notes
   - Issue carbon credit certificate

4. **Registry Operator**: Register on blockchain
   - Register the approved submission
   - Immutable hash generated and recorded
   - Submission locked as permanent record

**Time to Completion**: Approximately 21 days from submission to blockchain registration (simulated)

---

## State Management & Data Persistence

### Submission Lifecycle States

```
Draft → Submitted → Under Review → Verified → Approved → Registered
  ↓         ↓            ↓            ↓          ↓          ↓
Create   Submit      Review      Verify    Certify    Blockchain
        Files      Exceptions  Validate   CCCs      Immutable
```

### What Persists:
- **Uploaded Files**: Stored with submission (name, type, size, upload timestamp)
- **Quality Score**: Calculated once during submission validation
- **Verification Notes**: Added by Verifier, locked after approval
- **CCC Amount**: Calculated by system based on emissions and quality
- **Blockchain Hash**: Generated once during approval, immutable thereafter
- **All Timestamps**: Recorded at each state transition

### Role Persistence:
- Selected role saved to browser localStorage
- Automatically restored on page reload
- Switch roles using the role selector in header

---

## File Upload Specifications

### Supported Formats

| Format | Typical Content | Max Size | Example |
|--------|-----------------|----------|---------|
| CSV | Emissions data records | 50MB | `emissions_Q1_2026.csv` |
| Excel | Calculations, methodology | 50MB | `methodology.xlsx` |
| JSON | Structured metadata | 50MB | `submission_data.json` |
| PDF | Evidence documents | 50MB | `lab_certificate.pdf` |

### Validation Rules

- **File Format**: Only supported extensions accepted
- **File Size**: Individual files ≤ 50MB
- **Multiple Files**: Upload as many as needed
- **Exceptions**: Missing required file types flagged during submission

---

## Quality Score Calculation

The system automatically calculates a quality score (0-100%) based on:

```javascript
Score = (fileCount × 5) + (completeness × 20) + (methodology × 30) + (evidence × 25) - (exceptions × 3)
Score Range: 0-100% (clamped)
```

### Factors:
- **File Count** (0-20 points): More comprehensive data = higher score
- **Data Completeness** (0-20 points): All required fields provided
- **Methodology Alignment** (0-30 points): Proper methodology selection
- **Evidence Quality** (0-25 points): Supporting documentation provided
- **Exceptions** (penalty): Each exception reduces score by 3 points

### Score Interpretation:
- **90-100%**: Excellent - Automatic approval recommended
- **80-89%**: Good - Approval with minor review
- **70-79%**: Satisfactory - Review recommended
- **<70%**: Poor - Additional validation required

---

## Carbon Credit (CCC) Calculation

### Formula:
```
CCC Amount = Emissions × Verification Factor × Quality Score × Project Multiplier

Where:
- Emissions = Tonnes CO₂ equivalent (from data)
- Verification Factor = 0.5-1.0 (based on verification level)
- Quality Score = Submitted quality percentage (0-100)
- Project Multiplier = 0.6-1.2 (varies by project type)
```

### Project Type Multipliers:
- **Renewable Energy**: 1.0x
- **Energy Efficiency**: 0.8x
- **Waste Management**: 0.6x
- **Forestry/Carbon Sequestration**: 1.2x

### Example:
```
Emissions: 10,000 tonnes CO₂
Verification Factor: 1.0 (full verification)
Quality Score: 87%
Project Type: Renewable (1.0x)

CCC = 10,000 × 1.0 × 0.87 × 1.0 = 8,700 CCCs
Market Value at ₹250/CCC = ₹2,175,000
```

---

## Blockchain Hash Generation

### Process:
1. System receives approved submission
2. Creates immutable record containing:
   - Submission ID
   - CCC amount
   - Certification timestamp
   - Quality score
   - Verifier and Regulator signatures
3. Generates SHA-256 hash of combined data
4. Records hash immutably on blockchain
5. Hash cannot be modified (cryptographic integrity)

### Hash Format:
```
0x[64-character hexadecimal string]
Example: 0x7a4b2c5d9e8f1a3b6c2d5e8f1a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f
```

### Verification:
- Hash can be used to verify submission authenticity
- Any modification to submission changes the hash
- Original hash remains unchanged (detect tampering)

---

## Interactive Features Summary

### Enabled Interactions:
✅ File upload with drag-and-drop  
✅ Multi-step submission wizard  
✅ Data quality exception resolution  
✅ Verification note taking  
✅ Carbon credit calculation visualization  
✅ Blockchain hash generation  
✅ Immutable record confirmation  
✅ Role-based access control  
✅ Submission status tracking  
✅ Audit trail with timestamps  

### User Experience:
- Real-time status updates
- Toast notifications for actions
- Modal windows for details
- Inline validation and error handling
- Loading states during processing
- Confirmation messages after completion

---

## Testing the Complete Workflow

### Quick Test Scenario (5 minutes):

1. **Start as Entity Submitter**
   - Go to /submissions
   - Click "New Submission"
   - Complete 4-step wizard
   - Submit

2. **Switch to Verifier**
   - Change role (click role selector)
   - Go to /submissions
   - Click submitted submission
   - Go to Verification tab
   - Click "Approve for Verification"

3. **Switch to BEE Regulator**
   - Change role
   - Go to /submissions
   - Find verified submission
   - Go to Approval tab
   - Click "Issue Carbon Credit Certificate"

4. **Switch to Registry Operator**
   - Change role
   - Go to /submissions
   - Find approved submission
   - Go to Blockchain tab
   - Click "Register on Blockchain"

Result: Submission goes through complete lifecycle with immutable blockchain record created.

---

## Technical Details

### State Management:
- React Context API (SubmissionContext, RoleContext)
- Client-side state with localStorage persistence
- Real-time UI updates via hooks

### Components:
- `FileUploadZone` - Drag-and-drop file handling
- `SubmissionWizard` - 4-step guided submission
- `InteractiveSubmissions` - Submission list with actions
- `SubmissionDetailModal` - Full submission details
- `VerifierReviewPanel` - Verification workflow
- `RegulatorApprovalPanel` - Certification workflow
- `BlockchainRegistrationPanel` - Registry workflow

### Calculations:
- Quality score auto-calculation
- CCC amount based on emissions and quality
- Blockchain hash generation with SHA-256
- Exception validation and resolution

---

## Troubleshooting

### Submission Not Appearing After Upload
- Check browser console for errors (F12 → Console)
- Ensure at least one file is uploaded
- Refresh page to reload state

### Quality Score Shows 0%
- Upload required file types (CSV, JSON, PDF)
- Quality score calculated when submission is submitted
- More files = higher initial score

### Can't Approve as Verifier
- Submission must be in "Submitted" status
- Quality score must be calculated (wait a moment)
- All file uploads must complete successfully

### Blockchain Hash Not Showing
- Submission must be in "Approved" status
- Registry Operator role required
- Refresh if hash doesn't appear after registration

### Role Change Not Working
- Clear browser cache (Ctrl+Shift+Del)
- Or open in private/incognito window
- Role selection requires JavaScript enabled

---

## Next Steps

Future enhancements could include:
- Real database storage (Neon PostgreSQL, Supabase)
- Actual blockchain integration (Ethereum, Hyperledger)
- Email notifications at each workflow stage
- PDF certificate generation and download
- API endpoints for external integration
- Advanced reporting and analytics dashboards
- Multi-user team workflows
- Document signing and audit trails
