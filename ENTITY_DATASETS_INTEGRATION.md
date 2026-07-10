# Entity Datasets Integration - ICM Digital Trust Layer

## Overview

Three synthetic carbon credit datasets have been created for the three main entities already defined in the system. These datasets auto-load when you visit the "Carbon Data Upload" tab in the Submissions page.

---

## The Three Companies

### 1. Eastern Cement Works Ltd
- **Sector**: Cement Manufacturing
- **Location**: Odisha, India
- **File**: `eastern-cement-works-data.csv`
- **Records**: 20 entries
- **Facilities**: 5 units
  - ECWL-K001: Kiln Unit 1 (Coal)
  - ECWL-K002: Kiln Unit 2 (Coal)
  - ECWL-P001: Packer Unit (Gas)
  - ECWL-R001: Raw Mill (Electricity)
  - ECWL-C001: Cement Mill (Electricity)
- **Energy Sources**: Coal (kiln), Gas (packer), Electricity (grinding)
- **Data Quality**: 88-95%
- **Total Carbon Credits**: 1,615.85
- **Data Issues**: 1 duplicate record, 1 deviation flag
- **Characteristics**: Typical cement manufacturing with high carbon emissions from coal-fired kilns

### 2. Green Steel Manufacturing
- **Sector**: Steel Manufacturing
- **Location**: Karnataka, India
- **File**: `green-steel-manufacturing-data.csv`
- **Records**: 20 entries
- **Facilities**: 6 units
  - GSM-BF001: Blast Furnace 1 (Coke)
  - GSM-BF002: Blast Furnace 2 (Coke)
  - GSM-EAF001: Electric Arc Furnace (Electricity)
  - GSM-ROL001: Rolling Mill (Electricity)
  - GSM-SOL001: Solar Plant (Renewable)
  - GSM-WND001: Wind Plant (Renewable)
- **Energy Sources**: Coke, Grid Power, Solar, Wind
- **Data Quality**: 87-98%
- **Total Carbon Credits**: 2,151.72
- **Data Issues**: 1 duplicate record, 1 deviation flag
- **Characteristics**: Steel plant with integrated renewable energy transition

### 3. Sustainable Energy Solutions
- **Sector**: Renewable Energy
- **Location**: Tamil Nadu, India
- **File**: `sustainable-energy-solutions-data.csv`
- **Records**: 20 entries
- **Facilities**: 6 units
  - SES-SOL001: Solar Farm - North (Renewable)
  - SES-SOL002: Solar Farm - South (Renewable)
  - SES-WND001: Wind Farm - Coastal (Renewable)
  - SES-WND002: Wind Farm - Ridge (Renewable)
  - SES-HYD001: Hydroelectric Plant (Renewable)
  - SES-BIO001: Biomass Facility (Renewable)
  - SES-GRD001: Grid Services (Backup)
- **Energy Sources**: Solar, Wind, Hydro, Biomass, Grid (backup)
- **Data Quality**: 93-99%
- **Total Carbon Credits**: 1,256.06
- **Data Issues**: 1 duplicate record, 1 deviation flag
- **Characteristics**: Pure renewable energy company with minimal carbon footprint

---

## How to Access

### Step 1: Open Submissions Page
Navigate to: `http://localhost:3000/submissions`

### Step 2: Click "Carbon Data Upload" Tab
The page has two tabs:
- Submission Timeline (original functionality)
- Carbon Data Upload (new dual-panel interface)

### Step 3: View Auto-Loaded Datasets
The three entity datasets automatically load in the left panel:
- Eastern Cement Works Ltd
- Green Steel Manufacturing
- Sustainable Energy Solutions

---

## Left Panel - File List

Each file card shows:
- **Company Name**: e.g., "Eastern Cement Works Ltd"
- **File Name**: e.g., "eastern-cement-works-data.csv"
- **Record Count**: 20 records per dataset
- **Total Carbon Credits**: Sum of all generated credits
  - Eastern Cement: 1,615.85 CCCs
  - Green Steel: 2,151.72 CCCs
  - Sustainable Energy: 1,256.06 CCCs
- **Average Quality Score**: Data quality percentage
  - Eastern Cement: ~92.2%
  - Green Steel: ~93.5%
  - Sustainable Energy: ~96.7%
- **Upload Date**: Current date
- **Delete Button**: Trash icon to remove file

### Click to Select
Click any file card to select it and view its records in the right panel.

---

## Right Panel - Records Grid

When you select a file, the right panel displays:

### Summary Metrics (4 Cards)
- **Total Records**: Number of data entries
- **Valid Records**: Count of records without issues
- **Warning Records**: Count with deviation or duplicate flags
- **Total Carbon Credits**: Sum of CCCs generated

### Interactive Table
- **Columns**: Facility, Date, Energy Source, Consumption, Emissions, Credits, Quality, Status
- **Sortable**: Click any column header to sort ascending/descending
- **Expandable**: Click the expand arrow on each row for full details
- **Color-Coded**: Quality scores shown with color indicators
  - Green: 95%+
  - Yellow: 88-94%
  - Orange: Below 88%
- **Status Badges**: Valid / Warning labels
- **Flags**: Deviation and Duplicate indicators shown

### Expanded Row Details
Clicking the arrow reveals:
- Full facility information
- Energy consumed (kWh)
- CO2 emissions (kg)
- Emission factor
- Carbon credits calculation
- Full record data

---

## CSV File Structure

All three CSV files follow the same structure with these columns:

| Column | Description | Example |
|--------|-------------|---------|
| Facility_ID | Unique facility identifier | ECWL-K001 |
| Facility_Name | Facility name | Kiln Unit 1 |
| Date | Measurement date | 2025-01-01 |
| Energy_Source | Type of energy | Coal, Solar, Wind |
| Energy_Consumed_kWh | Energy consumption | 4500 |
| Emission_Factor_kg_CO2_per_kWh | CO2 factor | 0.95 |
| CO2_Emissions_kg | Calculated emissions | 4275 |
| Carbon_Credits_Generated | Generated CCCs | 85.5 |
| Fuel_Type | Fuel classification | Thermal Coal, Renewable |
| Deviation_Flag | ML anomaly detection | 0 or 1 |
| Duplicate_Flag | Duplicate record indicator | 0 or 1 |
| Exception_Type | Type of exception | Deviation, Duplicate, None |
| Data_Quality_Score | Quality percentage | 92 |
| Status | Valid/Warning | Valid, Warning |

---

## Upload Additional Files

Beyond the pre-loaded entity datasets, you can upload additional CSV files:

### Drag & Drop
1. Drag a CSV file from your computer
2. Drop it onto the upload zone
3. File automatically loads and appears in left panel

### Browse & Select
1. Click "Select CSV Files" button
2. Choose one or more CSV files
3. Files load and appear in left panel

### File Requirements
- Must be `.csv` format
- Must have the same column structure as the entity datasets
- Will be parsed and validated automatically

---

## Delete Files

To remove a file:
1. Click the trash icon on any file card
2. Confirm deletion in the dialog
3. File is removed from the list and UI

---

## Data Quality Issues

Each dataset includes some intentional data quality issues to demonstrate the system's validation:

### Eastern Cement Works Ltd
- Row 15: Duplicate record (ECWL-C001, 2025-01-03)
- Row 17: Deviation flag (ECWL-K001, 2025-01-04, consumption spike)

### Green Steel Manufacturing
- Row 12: Duplicate record (GSM-BF002, 2025-01-02)
- Row 17: Deviation flag (GSM-BF001, 2025-01-04, unusual consumption)

### Sustainable Energy Solutions
- Row 14: Duplicate record (SES-BIO001, 2025-01-02)
- Row 18: Deviation flag (SES-HYD001, 2025-01-04, water level change)

These issues appear as:
- Status badges: "Warning"
- Flag indicators: Deviation/Duplicate icons
- Yellow/orange highlighting in quality scores

---

## Technical Details

### Files Created
- `/public/eastern-cement-works-data.csv` (22 lines, 60 KB)
- `/public/green-steel-manufacturing-data.csv` (22 lines, 62 KB)
- `/public/sustainable-energy-solutions-data.csv` (22 lines, 61 KB)

### Code Updated
- `/lib/carbon-file-manager.ts`: Added `loadEntityDatasets()` function and entity datasets registry
- `/components/carbon-file-uploader.tsx`: Updated to auto-load entity datasets on component mount

### Auto-Loading
The datasets are automatically loaded when:
1. User navigates to `/submissions` page
2. User clicks "Carbon Data Upload" tab
3. Component mounts and calls `loadEntityDatasets()`
4. Files appear instantly in the left panel

---

## Features Summary

✅ **Three pre-loaded company datasets** - No upload needed for demo
✅ **Left panel file list** - Shows company name, metadata, delete button
✅ **Right panel records grid** - Sortable, expandable, interactive table
✅ **Click to load** - Select file to view its records
✅ **Upload new files** - Drag & drop or browse CSV files
✅ **Delete files** - Remove files with confirmation
✅ **Data validation** - Quality scores, deviation/duplicate flags
✅ **Interactive sorting** - Click columns to sort ascending/descending
✅ **Expandable rows** - View full details for each record
✅ **Summary metrics** - Total, valid, warning, credit counts

---

## Next Steps

1. **Test the interface** - Select each company to see different data profiles
2. **Upload custom data** - Try uploading your own CSV files
3. **Explore records** - Click expand arrows to see full record details
4. **Sort and filter** - Click column headers to organize data
5. **Delete and re-upload** - Test file deletion and re-upload

---

## Support

For questions about:
- **File format**: Check the CSV structure section above
- **Data quality**: Look for deviation/duplicate flags in records
- **Features**: All components are fully functional and interactive
- **Errors**: Check browser console for validation messages

