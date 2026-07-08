export interface CSVData {
  records: Array<Record<string, any>>
  metrics: {
    deviation: number
    duplicateRecords: number
    exceptionRecords: number
    totalRecords: number
    averageQuality: number
  }
}

export function parseCSV(csvText: string): CSVData {
  const lines = csvText.trim().split('\n')
  if (lines.length < 2) {
    return {
      records: [],
      metrics: {
        deviation: 0,
        duplicateRecords: 0,
        exceptionRecords: 0,
        totalRecords: 0,
        averageQuality: 0
      }
    }
  }

  const headers = lines[0].split(',').map(h => h.trim())
  const records: Array<Record<string, any>> = []

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim())
    if (values.length === headers.length) {
      const record: Record<string, any> = {}
      headers.forEach((header, idx) => {
        let value: any = values[idx]
        // Try to parse as number
        if (!isNaN(Number(value)) && value !== '') {
          value = Number(value)
        }
        record[header] = value
      })
      records.push(record)
    }
  }

  // Calculate metrics
  const deviation = records.filter((r: any) => r.Deviation_Flag === 1 || r.Deviation_Flag === '1').length
  const duplicateRecords = records.filter((r: any) => r.Duplicate_Flag === 1 || r.Duplicate_Flag === '1').length
  const exceptionRecords = records.filter((r: any) => r.Exception_Type && r.Exception_Type !== 'None').length

  const qualityScores = records
    .map((r: any) => parseInt(r.Data_Quality_Score) || 0)
    .filter(s => s > 0)

  const averageQuality = qualityScores.length > 0
    ? qualityScores.reduce((a, b) => a + b, 0) / qualityScores.length
    : 0

  return {
    records,
    metrics: {
      deviation,
      duplicateRecords,
      exceptionRecords,
      totalRecords: records.length,
      averageQuality
    }
  }
}

export async function loadSampleCSV(sampleName: string): Promise<CSVData> {
  try {
    const response = await fetch(`/sample-data-${sampleName}.csv`)
    const csvText = await response.text()
    return parseCSV(csvText)
  } catch (error) {
    console.error(`Failed to load sample CSV: ${sampleName}`, error)
    return {
      records: [],
      metrics: {
        deviation: 0,
        duplicateRecords: 0,
        exceptionRecords: 0,
        totalRecords: 0,
        averageQuality: 0
      }
    }
  }
}
