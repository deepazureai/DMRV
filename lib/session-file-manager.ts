/**
 * Session-based file storage manager
 * Stores uploaded files in memory during the session (cleared when browser closes)
 */

export interface StoredFile {
  id: string
  name: string
  size: number
  type: string
  uploadedAt: Date
  data: string // CSV content as string
}

class SessionFileManager {
  private files: Map<string, StoredFile> = new Map()

  /**
   * Store a file in session memory
   */
  storeFile(file: File, content: string): string {
    const fileId = `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    this.files.set(fileId, {
      id: fileId,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date(),
      data: content,
    })

    console.log(`[v0] File stored in session: ${file.name} (ID: ${fileId})`)
    return fileId
  }

  /**
   * Retrieve a stored file by ID
   */
  getFile(fileId: string): StoredFile | undefined {
    return this.files.get(fileId)
  }

  /**
   * Get all stored files
   */
  getAllFiles(): StoredFile[] {
    return Array.from(this.files.values())
  }

  /**
   * Remove a stored file
   */
  removeFile(fileId: string): boolean {
    return this.files.delete(fileId)
  }

  /**
   * Clear all stored files (called on session end)
   */
  clearAllFiles(): void {
    this.files.clear()
    console.log('[v0] All session files cleared')
  }

  /**
   * Get file stats
   */
  getStats() {
    const totalSize = Array.from(this.files.values()).reduce((sum, f) => sum + f.size, 0)
    return {
      fileCount: this.files.size,
      totalSize,
      files: Array.from(this.files.values()).map(f => ({
        id: f.id,
        name: f.name,
        size: f.size,
        uploadedAt: f.uploadedAt,
      })),
    }
  }
}

// Singleton instance
export const sessionFileManager = new SessionFileManager()
