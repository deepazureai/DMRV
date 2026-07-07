export interface ParsedFileData {
  type: 'csv' | 'excel' | 'json' | 'pdf' | 'unknown'
  fileName: string
  content: unknown
  recordCount?: number
  parseDate: string
}

export async function parseUploadedFile(file: File): Promise<ParsedFileData> {
  const fileName = file.name
  const fileType = getFileType(fileName)
  const content = await readFileContent(file)

  let parsedContent: unknown = content
  let recordCount: number | undefined

  switch (fileType) {
    case 'csv':
      parsedContent = parseCSV(content as string)
      recordCount = (parsedContent as unknown[]).length
      break
    case 'json':
      parsedContent = parseJSON(content as string)
      recordCount = Array.isArray(parsedContent) ? parsedContent.length : undefined
      break
    case 'pdf':
      parsedContent = {
        fileName,
        type: 'pdf',
        size: file.size,
        uploadedAt: new Date().toISOString(),
      }
      break
    case 'excel':
      parsedContent = {
        fileName,
        type: 'excel',
        content: content as string,
        approximateRows: Math.round(file.size / 100),
      }
      break
  }

  return {
    type: fileType,
    fileName,
    content: parsedContent,
    recordCount,
    parseDate: new Date().toISOString(),
  }
}

function getFileType(fileName: string): 'csv' | 'excel' | 'json' | 'pdf' | 'unknown' {
  const extension = fileName.split('.').pop()?.toLowerCase()

  switch (extension) {
    case 'csv':
      return 'csv'
    case 'xlsx':
    case 'xls':
      return 'excel'
    case 'json':
      return 'json'
    case 'pdf':
      return 'pdf'
    default:
      return 'unknown'
  }
}

async function readFileContent(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      resolve(content)
    }
    reader.onerror = reject
    reader.readAsText(file)
  })
}

function parseCSV(content: string): Record<string, string>[] {
  const lines = content.trim().split('\n')
  if (lines.length === 0) return []

  const headers = lines[0].split(',').map(h => h.trim())
  const records = lines.slice(1).map(line => {
    const values = line.split(',')
    const record: Record<string, string> = {}
    headers.forEach((header, index) => {
      record[header] = values[index]?.trim() || ''
    })
    return record
  })

  return records
}

function parseJSON(content: string): unknown {
  try {
    return JSON.parse(content)
  } catch {
    throw new Error('Invalid JSON format')
  }
}

export function validateCSVData(
  records: Record<string, string>[]
): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (records.length === 0) {
    errors.push('CSV file is empty')
    return { valid: false, errors }
  }

  const requiredColumns = ['date', 'amount', 'source']
  const firstRecord = records[0]
  const columns = Object.keys(firstRecord)

  requiredColumns.forEach(col => {
    if (!columns.includes(col)) {
      errors.push(`Missing required column: ${col}`)
    }
  })

  records.forEach((record, index) => {
    if (!record.amount || isNaN(parseFloat(record.amount))) {
      errors.push(`Row ${index + 1}: Invalid amount value`)
    }
  })

  return {
    valid: errors.length === 0,
    errors,
  }
}

export function validateJSONData(data: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!data) {
    errors.push('JSON data is empty')
  } else if (typeof data !== 'object') {
    errors.push('JSON must be an object or array')
  } else if (Array.isArray(data)) {
    if (data.length === 0) {
      errors.push('JSON array is empty')
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

export function extractMetadata(
  files: { name: string; type: string; content?: unknown }[]
): Record<string, unknown> {
  const metadata: Record<string, unknown> = {
    filesCount: files.length,
    fileTypes: files.map(f => f.type),
    uploadDate: new Date().toISOString(),
  }

  const jsonFile = files.find(f => f.type === 'json')
  if (jsonFile && typeof jsonFile.content === 'object' && jsonFile.content !== null) {
    metadata.methodology = (jsonFile.content as Record<string, unknown>).methodology
    metadata.period = (jsonFile.content as Record<string, unknown>).period
  }

  return metadata
}

export function generateDataSummary(
  files: ParsedFileData[]
): Record<string, unknown> {
  const summary: Record<string, unknown> = {
    totalFiles: files.length,
    fileTypes: files.map(f => f.type),
    recordCount: files.reduce((sum, f) => sum + (f.recordCount || 0), 0),
    parseDate: new Date().toISOString(),
  }

  files.forEach(file => {
    if (file.type === 'csv' && Array.isArray(file.content)) {
      summary.csvRecords = file.recordCount
      summary.dataPoints = file.recordCount ? file.recordCount * 3 : 0 // Estimate
    }
  })

  return summary
}
