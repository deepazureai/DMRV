// DMRV Mock Data - Realistic Industry Submissions with GEI Calculations

import {
  DmrvActor,
  DmrvRole,
  DmrvSubmission,
  ActivityData,
  GeiCalculation,
  Query,
  CAR,
  VerificationReport,
  CheckVerification,
  DataQualityAnomaly,
  ValidationResult,
  ConfidenceScore,
} from './dmrv-types'

// ============================================================================
// ACTORS (DMRV Roles)
// ============================================================================

export const dmrvActors: Record<string, DmrvActor> = {
  // Obligated Entities
  'entity-cement-ecwl': {
    id: 'entity-cement-ecwl',
    name: 'Eastern Cement Works Ltd',
    role: 'obligated-entity',
    organization: 'Eastern Cement Works Ltd',
    email: 'compliance@ecwl.in',
    registeredAt: '2023-05-15',
  },
  'entity-steel-gsm': {
    id: 'entity-steel-gsm',
    name: 'Green Steel Manufacturing',
    role: 'obligated-entity',
    organization: 'Green Steel Manufacturing',
    email: 'data@greensteel.in',
    registeredAt: '2023-06-20',
  },
  'entity-chemicals-icc': {
    id: 'entity-chemicals-icc',
    name: 'India Chemical Corporation',
    role: 'obligated-entity',
    organization: 'India Chemical Corporation',
    email: 'mrv@indiachemica.in',
    registeredAt: '2023-07-10',
  },
  'entity-power-tpg': {
    id: 'entity-power-tpg',
    name: 'Thermal Power Generation Ltd',
    role: 'obligated-entity',
    organization: 'Thermal Power Generation Ltd',
    email: 'reporting@tpg.in',
    registeredAt: '2023-08-01',
  },
  'entity-textile-abc': {
    id: 'entity-textile-abc',
    name: 'ABC Textile Mills',
    role: 'obligated-entity',
    organization: 'ABC Textile Mills',
    email: 'sustainability@abctextile.in',
    registeredAt: '2023-09-15',
  },

  // ACVA (Accredited Carbon Verification Agencies)
  'acva-gcv': {
    id: 'acva-gcv',
    name: 'Global Carbon Verification',
    role: 'acva',
    organization: 'Global Carbon Verification Ltd',
    email: 'verification@gcv.in',
    accreditationId: 'ACVA-IND-2023-001',
    registeredAt: '2023-01-15',
  },
  'acva-env': {
    id: 'acva-env',
    name: 'Environmental Assurance & Verification',
    role: 'acva',
    organization: 'EAV Solutions',
    email: 'team@eavsolutions.in',
    accreditationId: 'ACVA-IND-2023-002',
    registeredAt: '2023-02-01',
  },

  // Check-Verifiers
  'check-verifier-dvri': {
    id: 'check-verifier-dvri',
    name: 'Deutsche Verification & Registry International',
    role: 'check-verifier',
    organization: 'DVRI Solutions',
    email: 'check@dvri.in',
    accreditationId: 'AVR-EU-2023-101',
    registeredAt: '2023-03-10',
  },

  // BEE Officer
  'bee-officer-singh': {
    id: 'bee-officer-singh',
    name: 'Dr. Amelia Singh',
    role: 'bee-officer',
    organization: 'Bureau of Energy Efficiency',
    email: 'amelia.singh@bee.gov.in',
    registeredAt: '2022-01-01',
  },

  // Registry Operator
  'registry-icm': {
    id: 'registry-icm',
    name: 'Indian Carbon Market Registry',
    role: 'registry-operator',
    organization: 'ICM Limited',
    email: 'operations@icmregistry.in',
    registeredAt: '2023-01-01',
  },
}

// ============================================================================
// BEE-APPROVED EMISSION FACTORS (v3.2, FY2024)
// ============================================================================

export const emissionFactors = {
  'EF-COAL-v3.2': { value: 2.41, unit: 'kg CO2e/kg', source: 'coal' },
  'EF-GAS-v3.2': { value: 2.04, unit: 'kg CO2e/m³', source: 'naturalGas' },
  'EF-DIESEL-v3.2': { value: 2.67, unit: 'kg CO2e/litre', source: 'diesel' },
  'EF-BIOMASS-v3.2': { value: 0, unit: 'kg CO2e/kg', source: 'biomass' }, // Zero-emission
  'EF-GRID-ELEC-v3.2': { value: 0.73, unit: 'kg CO2e/kWh', source: 'gridElectricity' }, // India grid average
  'EF-CAPTIVE-v3.2': { value: 1.2, unit: 'kg CO2e/kWh', source: 'captiveElectricity' },
  'EF-RENEWABLE-v3.2': { value: 0, unit: 'kg CO2e/kWh', source: 'renewableElectricity' }, // Zero-emission
}

// ============================================================================
// REALISTIC INDUSTRY SUBMISSIONS WITH GEI CALCULATIONS
// ============================================================================

// Submission 1: Cement (Obligated Entity - Over-performer)
export const submission_cement_q1_2024: DmrvSubmission = {
  id: 'SUB-CEMENT-2024-Q1-001',
  entityId: 'entity-cement-ecwl',
  sector: 'cement',
  reportingPeriod: '2024-Q1',

  activityData: {
    coal: 45000, // tonne
    naturalGas: 8500, // m³ × 1000
    diesel: 2200, // litre
    biomass: 3500, // tonne (waste fuel)
    gridElectricity: 52000, // MWh
    captiveElectricity: 18000, // MWh (own captive unit)
    renewableElectricity: 12000, // MWh (rooftop solar)
    productionOutput: 125000, // tonnes of cement
    outputUnit: 'tonne',
    period: '2024-Q1',
    submittedAt: '2024-04-15T10:30:00Z',
  },

  geiCalculation: {
    id: 'GEI-CEMENT-001',
    submissionId: 'SUB-CEMENT-2024-Q1-001',
    activityData: {
      coal: 45000,
      naturalGas: 8500,
      diesel: 2200,
      biomass: 3500,
      gridElectricity: 52000,
      captiveElectricity: 18000,
      renewableElectricity: 12000,
      productionOutput: 125000,
      outputUnit: 'tonne',
      period: '2024-Q1',
      submittedAt: '2024-04-15T10:30:00Z',
    },
    fuelEmissions: 118270, // (45000×2.41 + 8500×2.04 + 2200×2.67 + 3500×0) tCO2e
    electricityEmissions: 51960, // (52000×0.73 + 18000×1.2 + 12000×0) tCO2e
    renewableAdjustment: 0, // Already zero-emission in calculation
    totalEmissions: 170230, // tCO2e (actual emissions)
    gei: 1361.84, // 170230 / 125000
    geiUnit: 'kg CO2e/tonne of cement',
    completenessPercentage: 98,
    consistencyScore: 96,
    accuracyScore: 95,
    beeBaselineGei: 1520, // BEE baseline for cement FY2024
    baselineVersion: '2024-Q1',
    performanceStatus: 'over-performer', // 1361.84 < 1520 (baseline)
    cccSurplus: 19_288, // (1520 - 1361.84) × 125000 / 1000
    calculatedAt: '2024-04-15T10:30:00Z',
  },

  uploadedFiles: [
    {
      name: 'coal_invoices_q1_2024.pdf',
      type: 'application/pdf',
      documentType: 'mandatory',
      url: '/files/coal-inv-q1.pdf',
      uploadedAt: '2024-04-15T10:30:00Z',
      verified: false,
    },
    {
      name: 'electricity_meter_logs_q1.xlsx',
      type: 'application/vnd.ms-excel',
      documentType: 'mandatory',
      url: '/files/meter-logs-q1.xlsx',
      uploadedAt: '2024-04-15T10:35:00Z',
      verified: false,
    },
    {
      name: 'calibration_certificate_grid_meter.pdf',
      type: 'application/pdf',
      documentType: 'supportive',
      url: '/files/calib-cert-grid.pdf',
      uploadedAt: '2024-04-15T10:40:00Z',
      verified: false,
    },
    {
      name: 'production_output_logs.xlsx',
      type: 'application/vnd.ms-excel',
      documentType: 'mandatory',
      url: '/files/production-q1.xlsx',
      uploadedAt: '2024-04-15T10:45:00Z',
      verified: false,
    },
    {
      name: 'renewable_energy_certificate.pdf',
      type: 'application/pdf',
      documentType: 'supportive',
      url: '/files/rec-solar.pdf',
      uploadedAt: '2024-04-15T10:50:00Z',
      verified: false,
    },
  ],

  status: 'acva-review',
  submittedAt: '2024-04-15T10:30:00Z',
  acvaAssignedAt: '2024-04-16T09:00:00Z',
  assignedToAcva: 'acva-gcv',
  submittedBy: 'entity-cement-ecwl',

  validationResults: [],
}

// Submission 2: Steel (Under-performer - needs CCC purchase)
export const submission_steel_q1_2024: DmrvSubmission = {
  id: 'SUB-STEEL-2024-Q1-001',
  entityId: 'entity-steel-gsm',
  sector: 'steel',
  reportingPeriod: '2024-Q1',

  activityData: {
    coal: 120000, // coking coal
    naturalGas: 25000, // m³
    diesel: 8500, // litre
    gridElectricity: 85000, // MWh
    captiveElectricity: 0,
    productionOutput: 65000, // tonnes of finished steel
    outputUnit: 'tonne',
    period: '2024-Q1',
    submittedAt: '2024-04-16T14:20:00Z',
  },

  geiCalculation: {
    id: 'GEI-STEEL-001',
    submissionId: 'SUB-STEEL-2024-Q1-001',
    activityData: {
      coal: 120000,
      naturalGas: 25000,
      diesel: 8500,
      gridElectricity: 85000,
      productionOutput: 65000,
      outputUnit: 'tonne',
      period: '2024-Q1',
      submittedAt: '2024-04-16T14:20:00Z',
    },
    fuelEmissions: 315340, // (120000×2.41 + 25000×2.04 + 8500×2.67) tCO2e
    electricityEmissions: 62050, // 85000×0.73 tCO2e
    renewableAdjustment: 0,
    totalEmissions: 377390, // tCO2e
    gei: 5798.31, // 377390 / 65000
    geiUnit: 'kg CO2e/tonne of steel',
    completenessPercentage: 92,
    consistencyScore: 89,
    accuracyScore: 91,
    beeBaselineGei: 1850, // BEE baseline for steel (measured per tonne net output)
    baselineVersion: '2024-Q1',
    performanceStatus: 'under-performer', // 5798.31 > 1850 (this is intentionally high to show deficit)
    cccDeficit: 258_688, // (5798.31 - 1850) × 65000 / 1000
    calculatedAt: '2024-04-16T14:20:00Z',
  },

  uploadedFiles: [
    {
      name: 'coal_purchase_agreements_q1.pdf',
      type: 'application/pdf',
      documentType: 'mandatory',
      url: '/files/coal-agreement-q1.pdf',
      uploadedAt: '2024-04-16T14:20:00Z',
      verified: false,
    },
    {
      name: 'electricity_bills_q1.pdf',
      type: 'application/pdf',
      documentType: 'mandatory',
      url: '/files/elec-bills-q1.pdf',
      uploadedAt: '2024-04-16T14:25:00Z',
      verified: false,
    },
  ],

  status: 'data-validation',
  submittedAt: '2024-04-16T14:20:00Z',
  submittedBy: 'entity-steel-gsm',

  validationResults: [],
}

// Submission 3: Power Generation (Recent submission)
export const submission_power_q1_2024: DmrvSubmission = {
  id: 'SUB-POWER-2024-Q1-001',
  entityId: 'entity-power-tpg',
  sector: 'power',
  reportingPeriod: '2024-Q1',

  activityData: {
    coal: 280000, // tonnes (thermal coal for power plant)
    naturalGas: 15000, // m³
    productionOutput: 450000, // MWh (electricity generated)
    outputUnit: 'MWh',
    period: '2024-Q1',
    submittedAt: '2024-04-18T11:15:00Z',
  },

  geiCalculation: {
    id: 'GEI-POWER-001',
    submissionId: 'SUB-POWER-2024-Q1-001',
    activityData: {
      coal: 280000,
      naturalGas: 15000,
      productionOutput: 450000,
      outputUnit: 'MWh',
      period: '2024-Q1',
      submittedAt: '2024-04-18T11:15:00Z',
    },
    fuelEmissions: 705080, // (280000×2.41 + 15000×2.04) tCO2e
    electricityEmissions: 0,
    renewableAdjustment: 0,
    totalEmissions: 705080,
    gei: 1.567, // 705080 / 450000
    geiUnit: 'kg CO2e/MWh of electricity',
    completenessPercentage: 97,
    consistencyScore: 94,
    accuracyScore: 96,
    beeBaselineGei: 0.65, // BEE grid average baseline (India)
    baselineVersion: '2024-Q1',
    performanceStatus: 'under-performer', // 1.567 > 0.65
    cccDeficit: 413_995, // (1.567 - 0.65) × 450000 / 1000
    calculatedAt: '2024-04-18T11:15:00Z',
  },

  uploadedFiles: [],
  status: 'submitted',
  submittedAt: '2024-04-18T11:15:00Z',
  submittedBy: 'entity-power-tpg',

  validationResults: [],
}

export const dmrvSubmissions: DmrvSubmission[] = [
  submission_cement_q1_2024,
  submission_steel_q1_2024,
  submission_power_q1_2024,
]

// ============================================================================
// QUERIES & CARs (Live Communication)
// ============================================================================

export const sampleQueries: Query[] = [
  {
    id: 'Q-CEMENT-001',
    submissionId: 'SUB-CEMENT-2024-Q1-001',
    raisedBy: 'acva-gcv',
    type: 'clarification',
    title: 'Clarification on Biomass Fuel Classification',
    description:
      'In Section 3.2, you have classified 3,500 tonnes of waste fuel as "biomass". Can you confirm: (a) the source of this waste fuel, (b) whether it has BEE approval as renewable, and (c) the chain of custody documentation?',
    fieldName: 'biomass',
    raisedAt: '2024-04-17T10:00:00Z',
    dueDate: '2024-04-24T23:59:00Z', // 7-day regulatory deadline
    status: 'open',
  },
  {
    id: 'Q-CEMENT-002',
    submissionId: 'SUB-CEMENT-2024-Q1-001',
    raisedBy: 'acva-gcv',
    type: 'document-request',
    title: 'Meter Calibration Certificate Verification',
    description:
      'Please provide updated calibration certificate for the captive electricity meter. Current certificate shows validity until 2024-03-31, which is before your Q1 data collection period.',
    fieldName: 'captiveElectricity',
    raisedAt: '2024-04-17T10:15:00Z',
    dueDate: '2024-04-24T23:59:00Z',
    status: 'responded',
    responseNotes:
      'Updated calibration certificate for captive meter uploaded (valid until 2025-03-31). Meter was recalibrated on 2024-04-05.',
    respondedAt: '2024-04-19T09:30:00Z',
    respondedBy: 'entity-cement-ecwl',
    acvaComment:
      'Response accepted. Calibration certificate now valid and covers the reporting period.',
    closedAt: '2024-04-19T14:00:00Z',
  },
]

export const sampleCARs: CAR[] = [
  {
    id: 'CAR-STEEL-001',
    submissionId: 'SUB-STEEL-2024-Q1-001',
    raisedBy: 'acva-env',
    type: 'major',
    title: 'Non-Conformity: Coal Consumption Data Inconsistency',
    description:
      'Steel production output (65,000 tonnes) shows 120,000 tonnes of coal input. This results in GEI of 5,798 kg CO2e/tonne, which deviates significantly from sector trend. Please reconcile.',
    nonConformity:
      'Coal consumption data not aligned with historical production records or industry benchmarks.',
    evidenceOfNonConformity:
      'GEI calculation shows ±12% deviation from 5-year facility average. Per EU ETS MRR, materiality threshold is ±5%.',
    raisedAt: '2024-04-17T15:00:00Z',
    dueDate: '2024-05-01T23:59:00Z', // 14-day regulatory deadline
    status: 'responded',
    correctionProposed:
      'Upon re-audit, identified meter reading error in third week of March. Corrected coal consumption: 98,000 tonnes. Revised GEI: 1,889 kg CO2e/tonne (under-performer baseline 1,850).',
    revisedDataProvided: true,
    correctedSubmittedAt: '2024-04-26T11:00:00Z',
    materiality: {
      threshold: 5,
      deviationFound: 12,
      withinThreshold: false,
    },
  },
]

export const sampleComments = [
  {
    id: 'comment-001',
    queryId: 'Q-CEMENT-001',
    submissionId: 'SUB-CEMENT-2024-Q1-001',
    lastActivityAt: '2024-04-19T09:30:00Z',
    comments: [
      {
        id: 'c1',
        author: dmrvActors['acva-gcv'],
        authorRole: 'acva',
        message:
          'Hi, we need clarification on the biomass classification. Can you provide the source documentation?',
        timestamp: '2024-04-17T10:00:00Z',
      },
      {
        id: 'c2',
        author: dmrvActors['entity-cement-ecwl'],
        authorRole: 'obligated-entity',
        message:
          'The biomass is waste fuel (sawdust, wood chips) from our packaging line. We have purchased it from authorized waste-to-energy vendors. Documentation attached in portal.',
        timestamp: '2024-04-18T16:45:00Z',
      },
      {
        id: 'c3',
        author: dmrvActors['acva-gcv'],
        authorRole: 'acva',
        message:
          'Documentation reviewed and accepted. Classification confirmed as renewable per BEE Schedule 1. Query closed.',
        timestamp: '2024-04-19T09:30:00Z',
        isSystemMessage: false,
      },
    ],
  },
]
