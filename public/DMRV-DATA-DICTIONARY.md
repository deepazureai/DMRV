# DMRV Data Format Dictionary
## Digital Monitoring, Reporting & Verification - BEE Compliance Format

This document describes the standardized data format for submitting activity data to the DMRV system for carbon credit calculation under the Carbon Credit Trading Scheme (CCTS).

---

## CSV Column Definitions

### Mandatory Identification Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| **Reporting_Period** | Text | Calendar quarter or month of data | `2024-Q1`, `2024-01` |
| **Entity_ID** | Text | Unique Obligated Entity code assigned by BEE | `ECE-001`, `GSM-001`, `SES-001` |
| **Entity_Name** | Text | Full legal name of obligated entity | `Eastern Cement Works` |
| **Facility_ID** | Text | Unique facility/process unit identifier within entity | `ECE-K001` (Kiln Unit 1) |
| **Facility_Name** | Text | Descriptive name of facility/process unit | `Kiln Unit 1 (Production)` |

---

### Activity Data Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| **Activity_Type** | Text | Category of activity causing emissions | `Fuel Combustion`, `Electricity Consumption`, `Process Emissions` |
| **Fuel_Type** | Text | Specific fuel or energy source used | `Coal`, `Natural Gas`, `Grid Power`, `Solar (Captive)`, `Wind Power` |
| **Activity_Value_Unit** | Text | Unit of measurement for activity data | `tonnes` (fuel), `m3` (gas), `MWh` (electricity) |
| **Activity_Value** | Numeric | Actual activity quantity during period | `1250` (tonnes coal), `15000` (m3 gas) |

---

### Emission Factor Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| **Emission_Factor_kg_CO2_per_Unit** | Numeric | BEE-approved emission factor in kg CO2 per unit activity | `2.41` (coal), `0.002` (natural gas), `0.65` (grid electricity) |
| **EF_Source** | Text | Source library of emission factor | `BEE-Library` (primary) |
| **EF_Version** | Text | Version of emission factor library used | `v3.2` (current BEE standard) |

---

### Adjustment & Renewable Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| **Adjustments_Renewable_MWh** | Numeric | MWh of renewable energy offset (negative for credits) | `180` (solar offset), `-5100` (wind renewable subtracted) |
| **Adjustments_Other** | Numeric | Other approved adjustments (e.g., process efficiencies) | `0` (or specific approved deduction) |

---

### Output/Production Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| **Output_Type** | Text | Type of product/output generated | `Cement Production`, `Steel Production`, `Electricity Generation` |
| **Output_Unit** | Text | Unit of output measurement | `tonnes` (cement, steel), `MWh` (electricity) |
| **Output_Value** | Numeric | Total output during period for GEI calculation | `8500` (tonnes cement), `25500` (MWh electricity) |

---

### Documentation & Validation Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| **Notes** | Text | Data quality notes, month reference, process description | `"Thermal coal for clinker production"` |
| **Evidence_Reference** | Text | Reference to supporting evidence file (invoice, meter log) | `INV-2024-001` (invoice), `MTR-2024-001` (meter log) |
| **Validation_Status** | Text | DMRV system validation result (auto-populated) | `Passed`, `Warning`, `Failed` |
| **Anomaly_Flag** | Text | Anomaly detection result (auto-populated by DMRV) | `None`, `Deviation`, `Outlier`, `Missing-Evidence` |

---

## Sector-Specific Guidance

### Cement Sector
**Expected Activities:**
- Fuel Combustion: Coal, Natural Gas
- Electricity: Grid Power for Raw Mill, Cement Mill, Packing
- Output: Cement Production (tonnes)

**Typical Emission Factors (v3.2):**
- Thermal Coal: 2.41 kg CO2/tonne
- Natural Gas: 0.002 kg CO2/m3
- Grid Electricity: 0.65 kg CO2/MWh

**GEI Target Baseline:** 1,520 kg CO2e per tonne cement
- **Over-performers**: GEI < 1,520 → Earn Carbon Credits (Surplus)
- **Under-performers**: GEI > 1,520 → Must Purchase Credits (Deficit)

---

### Steel Sector
**Expected Activities:**
- Fuel Combustion: Coke (in Blast Furnace)
- Electricity: Grid Power (EAF, Rolling Mill) + Renewable Offsets
- Renewable: Solar/Wind captive generation for offset
- Output: Steel Production (tonnes)

**Typical Emission Factors (v3.2):**
- Coke: 2.10 kg CO2/tonne
- Grid Electricity: 0.65 kg CO2/MWh
- Solar Captive: 0.05 kg CO2/MWh
- Wind Captive: 0.08 kg CO2/MWh

**GEI Target Baseline:** 1,850 kg CO2e per tonne steel
- **Over-performers**: GEI < 1,850 → Earn Credits (Surplus)
- **Under-performers**: GEI > 1,850 → Purchase Credits (Deficit)

---

### Power Sector
**Expected Activities:**
- Fuel Combustion: Coal, Natural Gas
- Electricity Generation: Base load + Peaking
- Renewable Energy: Wind/Solar (offsets emissions)
- Output: Electricity Generation (MWh)

**Typical Emission Factors (v3.2):**
- Coal: 2.30 kg CO2/tonne
- Natural Gas: 0.002 kg CO2/m3
- Wind: 0.08 kg CO2/MWh
- Solar: 0.05 kg CO2/MWh

**GEI Target Baseline:** 0.65 kg CO2e per MWh
- **Over-performers**: GEI < 0.65 → Earn Credits
- **Under-performers**: GEI > 0.65 → Purchase Credits

---

## GEI Calculation Formula

**GHG Emission Intensity (kg CO2e per unit output):**

```
GEI = (∑ Activity × Emission_Factor - ∑ Renewable_Adjustments) / Output_Value
```

**Example - Cement:**
```
GEI = (1250 tonnes coal × 2.41 + 15,000 m3 gas × 0.002 + 2750 MWh grid × 0.65) / 8,500 tonnes
    = (3,012.5 + 30 + 1,787.5) / 8,500
    = 4,830 / 8,500
    = 0.568 kg CO2 per kg cement ≈ 1,361.84 kg CO2e per tonne cement (vs 1,520 baseline)
    = OVER-PERFORMER (eligible for carbon credit surplus)
```

---

## Data Quality & Validation Rules (6-Step Pipeline)

### Step 1: Schema Validation
- All mandatory fields present
- Correct data types (numeric for quantities, text for IDs)
- Proper date format (YYYY-MM or YYYY-Qx)

### Step 2: Completeness Check
- No missing fuel data during active production period
- Output value must be > 0
- Evidence references provided

### Step 3: Range & Outlier Detection
- Activity values within historical ±20% range
- Consumption spikes flagged for manual review
- Seasonal adjustments noted

### Step 4: Duplicate Detection
- No duplicate rows for same facility on same date
- Unit consistency across period

### Step 5: Evidence Credibility
- Calibration certificates valid (not expired)
- Invoice/meter log reference matches activity dates
- Source documents authenticated

### Step 6: Confidence Score
- Combined score: 0-100%
- **90-100%**: Data Excellent (low risk)
- **75-89%**: Data Good (acceptable with notes)
- **60-74%**: Data Fair (requires queries/CARs)
- **<60%**: Data Poor (rejection likely)

---

## Upload Instructions

1. **Download Template** - Select your sector (Cement/Steel/Power)
2. **Fill Activity Data** - Enter monthly/quarterly readings
3. **Attach Evidence** - Upload supporting documents (folder structure: `Evidence/[Period]/[Document]`)
4. **Sign & Submit** - Digital signature required; timestamp auto-recorded
5. **Track Status** - Monitor submission through DMRV dashboard

---

## Contact & Support

For questions on data format or submission:
- **Technical Support**: support@bee-dmrv.org
- **Verification Queries**: Will be raised by assigned ACVA (Accredited Carbon Verification Agency)
- **Materiality Threshold**: ±5% per EU ETS standards (BEE-aligned)

---

**Last Updated:** 2024-01 | **Version:** 3.2 | **Framework:** EU AVR + ICAP Principles
