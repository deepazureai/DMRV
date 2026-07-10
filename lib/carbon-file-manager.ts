export interface CarbonRecord {
  facility_id: string
  facility_name: string
  measurement_date: string
  energy_source: string
  energy_consumed_kwh: number
  emission_factor_kg_co2_per_kwh: number
  co2_emissions_kg: number
  carbon_credits_generated: number
  fuel_type: string
  data_quality_score: number
  status: string
  deviation_flag: number
  duplicate_flag: number
  exception_type: string
}

export interface UploadedFile {
  id: string
  filename: string
  companyName: string
  uploadDate: string
  recordCount: number
  records: CarbonRecord[]
  totalCarbonCredits: number
  averageQuality: number
  csvContent: string
}

export function parseCSV(csvContent: string): CarbonRecord[] {
  const lines = csvContent.trim().split('\n')
  if (lines.length < 2) return []

  const headers = lines[0].split(',').map((h) => h.trim())
  const records: CarbonRecord[] = []

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map((v) => v.trim())
    if (values.length !== headers.length) continue

    const record: CarbonRecord = {
      facility_id: values[0],
      facility_name: values[1],
      measurement_date: values[2],
      energy_source: values[3],
      energy_consumed_kwh: parseFloat(values[4]) || 0,
      emission_factor_kg_co2_per_kwh: parseFloat(values[5]) || 0,
      co2_emissions_kg: parseFloat(values[6]) || 0,
      carbon_credits_generated: parseFloat(values[7]) || 0,
      fuel_type: values[8],
      data_quality_score: parseFloat(values[9]) || 0,
      status: values[10],
      deviation_flag: parseInt(values[11]) || 0,
      duplicate_flag: parseInt(values[12]) || 0,
      exception_type: values[13] || 'None',
    }
    records.push(record)
  }

  return records
}

export function extractCompanyName(csvContent: string): string {
  const records = parseCSV(csvContent)
  if (records.length === 0) return 'Unknown Company'

  // Extract company from facility_name (e.g., "EnergyCore Facility A" -> "EnergyCore")
  const facilityName = records[0].facility_name
  const parts = facilityName.split(' ')
  return parts[0] || 'Unknown Company'
}

export function calculateMetrics(records: CarbonRecord[]) {
  if (records.length === 0) {
    return { totalCredits: 0, avgQuality: 0, deviations: 0, duplicates: 0 }
  }

  const totalCredits = records.reduce((sum, r) => sum + r.carbon_credits_generated, 0)
  const avgQuality = records.reduce((sum, r) => sum + r.data_quality_score, 0) / records.length
  const deviations = records.filter((r) => r.deviation_flag === 1).length
  const duplicates = records.filter((r) => r.duplicate_flag === 1).length

  return { totalCredits, avgQuality, deviations, duplicates }
}

export function createUploadedFile(
  filename: string,
  csvContent: string,
): UploadedFile {
  const records = parseCSV(csvContent)
  const companyName = extractCompanyName(csvContent)
  const metrics = calculateMetrics(records)

  return {
    id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    filename,
    companyName,
    uploadDate: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }),
    recordCount: records.length,
    records,
    totalCarbonCredits: metrics.totalCredits,
    averageQuality: Math.round(metrics.avgQuality * 10) / 10,
    csvContent,
  }
}

export function loadSampleDataset(datasetName: string): Promise<UploadedFile | null> {
  return fetch(`/carbon-dataset-${datasetName}.csv`)
    .then((res) => res.text())
    .then((csv) => createUploadedFile(`carbon-dataset-${datasetName}.csv`, csv))
    .catch(() => null)
}

// Load datasets for actual entities in the system
export const entityDatasets = [
  { filename: 'eastern-cement-works-data.csv', company: 'Eastern Cement Works Ltd' },
  { filename: 'green-steel-manufacturing-data.csv', company: 'Green Steel Manufacturing' },
  { filename: 'sustainable-energy-solutions-data.csv', company: 'Sustainable Energy Solutions' },
]

export async function loadEntityDatasets(): Promise<UploadedFile[]> {
  const files = await Promise.all(
    entityDatasets.map((dataset) =>
      fetch(`/${dataset.filename}`)
        .then((res) => res.text())
        .then((csv) => createUploadedFile(dataset.filename, csv))
        .catch(() => null)
    )
  )
  return files.filter((f) => f !== null) as UploadedFile[]
}
