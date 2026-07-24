# DMRV Submission Workflows - Entity Dashboard

## Two Distinct Workflows

### 1. **Activity Data Repository** (Tab: "Activity Data")
**Purpose:** Store and manage raw fuel, electricity, and production consumption data

**What it does:**
- Upload DMRV-format CSV files (fuel tonnes, electricity MWh, production output)
- System parses files and extracts records by facility/process
- Records are stored in a data repository for reference and reuse
- Data quality is checked (completeness, format, units)
- Records are indexed and searchable

**Who uses it:**
- Obligated entities (industries) managing multiple data sources
- Energy managers tracking consumption across facilities
- Compliance teams maintaining audit trails

**Typical files uploaded:**
- `eastern-cement-works-q1-2024-activity.csv` (20+ facility records)
- `green-steel-manufacturing-q1-2024-activity.csv` (fuel, electricity, output)
- `sustainable-energy-q1-2024-activity.csv` (coal, gas, renewables)

**Output:**
- Parsed records visible in data grid
- Historical data for trending and anomaly detection
- Reference for creating submissions

---

### 2. **Formal Submissions** (Tab: "Formal Submissions")
**Purpose:** Bundle activity data with documentation and submit through DMRV verification workflow

**Workflow Steps (Process Flow 3: Data Ingestion):**
1. **New Submission** → Opens wizard
2. **Select monitoring period** (e.g., 2024-Q1, 2024-Q2)
3. **Choose facility/process** (e.g., Kiln Unit 1, Blast Furnace A)
4. **Link activity data** (from Activity Data Repository or upload new)
5. **Attach evidence pack** (invoices, meter logs, calibration certificates, RE contracts)
6. **Review & sign** (digitally timestamped)
7. **Queue for DMRV validation** → Moves to Verifier queue

**Validation Pipeline (Once submitted):**
- Schema validation (mandatory fields)
- Completeness check (fuel data, evidence files present)
- Range & Outliers (consumption spikes, trend deviation)
- Duplicates & Unit detection (prevent double-counting)
- Evidence credibility (calibration validity, source documentation)
- Confidence score (0-100%)

**Then Verification & Approval:**
- ACVA assigned → Issues queries (7-day response window)
- Corrective Action Requests (CAR) for major anomalies
- Check-verification (independent second review)
- BEE assessment → Approval gate
- CCC generation and blockchain registration

---

## Key Differences

| Aspect | Activity Data Repository | Formal Submission |
|--------|-------------------------|-------------------|
| **Purpose** | Store raw consumption data | Submit for verification & CCC generation |
| **Triggers** | Manual file upload | User clicks "New Submission" |
| **Data** | Activity values only | Activity + calculations + evidence |
| **Validation** | Light (format, completeness) | Deep (6-step DMRV engine) |
| **Timeline** | No deadline | 30-60 day verification cycle |
| **Output** | Data grid view | CCC credits (if approved) |
| **Auditable** | Version history | Full audit trail with timestamps |
| **Status** | "Uploaded" | "Submitted" → "Verified" → "Approved" → "Registered" |

---

## Example Workflow

### Entity Submitter: Cement Factory

**Week 1: Activity Data Upload**
- Upload `eastern-cement-works-q1-2024-activity.csv` (20 kiln records)
- System parses → Shows 20 records in data grid
- Quality check: ✓ All mandatory fields present
- Status: "Uploaded & Indexed"

**Week 2: Create Formal Submission**
- Click "New Submission" in Formal Submissions tab
- Select Period: 2024-Q1
- Select Facility: Kiln Unit 1
- Link Activity Data: `eastern-cement-works-q1-2024-activity.csv` (Jan-Mar records filtered)
- Upload Evidence Pack:
  - `invoice-coal-supplier-q1.pdf`
  - `meter-log-kiln-unit-1.xlsx`
  - `calibration-cert-scale-2024-02.pdf`
- Click "Submit for Verification"
- Status: "Submitted" → Moves to ACVA queue

**Week 3-6: DMRV Verification**
- ACVA assigned (verifier@acva-agency.in)
- Automated validation pipeline runs
- ACVA reviews anomaly report
- ACVA raises Query: "Kiln fuel spike Jan 15-20 - explain reason"
- Entity responds: "Kiln maintenance break compensated by extended run Jan 21-28"
- Status: "Query Closed"
- ACVA marks: "Verified" after all queries resolved

**Week 7-8: Check-Verification & Approval**
- Check-Verifier reviews ACVA findings
- BEE Officer approves
- GEI calculated: 1,361.84 kg CO2e/tonne
- vs Baseline: 1,520 kg CO2e/tonne
- Status: "Over-performer" → 19,288 CCC surplus
- CCCs issued to entity's account

---

## Practical Analogy

**Activity Data Repository** = Your personal filing cabinet
- You store receipts, invoices, meter readings
- Organized by date, facility, energy source
- Available whenever you need to reference or audit

**Formal Submission** = Tax return filing
- Takes data from your files
- Adds documentation and declarations
- Submitted to authorities for review
- Authorities verify all facts and calculations
- Once approved, generates official credits/certificates

---

## Downloads Available

Entities can download blank templates for each sector:
- `dmrv-cement-blank-template.csv` - Pre-populated emission factors, fuel types
- `dmrv-steel-blank-template.csv` - Pre-populated for steel sector
- `dmrv-power-blank-template.csv` - Pre-populated for power generation

All templates include instructions and field definitions.

