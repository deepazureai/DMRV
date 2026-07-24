/**
 * Review Comments Schema
 * Defines structure for verifier comments, CARs, and queries
 */

import { ReviewCommentSeverity, ReviewCommentStatus } from './dmrv-data-mapping'

export interface ReviewComment {
  id: string
  submissionId: string
  reviewerRole: 'acva-verifier' | 'check-verifier' | 'bee-officer'
  reviewerName: string
  reviewerOrganization: string
  commentType: 'CRITICAL' | 'MAJOR' | 'MINOR' | 'QUERY' | 'CAR'
  severity: ReviewCommentSeverity
  commentText: string
  relatedField: string // e.g., 'GEI', 'coal_consumption', 'calibration_cert'
  createdAt: Date
  resolvedAt?: Date
  entityResponse?: string
  entityResponseDate?: Date
  resolutionStatus: ReviewCommentStatus
  linkedDocuments?: string[]
  actionRequired: boolean
  daysSinceCreated: number
}

/**
 * Mock Review Comments for Testing
 * Shows realistic comment flow with entity responses
 */

export const MOCK_REVIEW_COMMENTS: ReviewComment[] = [
  {
    id: 'RC-001',
    submissionId: 'ECW-2024-Q1',
    reviewerRole: 'acva-verifier',
    reviewerName: 'Dr. Priya Sharma',
    reviewerOrganization: 'TUV-SUD India',
    commentType: 'CAR',
    severity: ReviewCommentSeverity.MAJOR,
    commentText:
      'Coal consumption spike of 22% observed on Jan 15-20 compared to historical baseline. Please provide explanation and supporting documentation (kiln maintenance logs, extended operation schedules, etc.) to justify the variance.',
    relatedField: 'coal_consumption',
    createdAt: new Date('2024-03-10'),
    resolvedAt: new Date('2024-03-25'),
    entityResponse:
      'During this period, kiln maintenance was extended due to emergency repairs. Supporting documentation includes maintenance logs (attached), extended shift schedules, and meter data verification from our sub-metering system.',
    entityResponseDate: new Date('2024-03-18'),
    resolutionStatus: ReviewCommentStatus.RESOLVED,
    linkedDocuments: ['kiln-maintenance-log-2024.pdf', 'shift-schedule-jan-2024.xlsx'],
    actionRequired: false,
    daysSinceCreated: 25,
  },
  {
    id: 'RC-002',
    submissionId: 'ECW-2024-Q1',
    reviewerRole: 'acva-verifier',
    reviewerName: 'Dr. Priya Sharma',
    reviewerOrganization: 'TUV-SUD India',
    commentType: 'QUERY',
    severity: ReviewCommentSeverity.MINOR,
    commentText:
      'Electricity meter calibration certificate expires on 2024-06-30. Recommend renewal before Q2 submission to ensure continued data credibility and compliance with metering standards.',
    relatedField: 'meter_calibration',
    createdAt: new Date('2024-03-15'),
    resolvedAt: undefined,
    entityResponse: undefined,
    resolutionStatus: ReviewCommentStatus.OPEN,
    actionRequired: true,
    daysSinceCreated: 20,
  },
  {
    id: 'RC-003',
    submissionId: 'ECW-2024-Q1',
    reviewerRole: 'check-verifier',
    reviewerName: 'Rajesh Kumar',
    reviewerOrganization: 'Bureau Veritas India',
    commentType: 'QUERY',
    severity: ReviewCommentSeverity.MINOR,
    commentText:
      'ACVA CAR regarding consumption spike has been adequately resolved. Kiln maintenance documentation verifies the exceptional condition. ICAP Principle 2 (Consistency) confirmed.',
    relatedField: 'verification_consistency',
    createdAt: new Date('2024-03-28'),
    resolvedAt: new Date('2024-03-29'),
    entityResponse: undefined,
    resolutionStatus: ReviewCommentStatus.RESOLVED,
    actionRequired: false,
    daysSinceCreated: 7,
  },
]

/**
 * Mock Review Comments for Resubmission Scenario
 * Example: Entity received multiple comments and needs to fix
 */

export const MOCK_PENDING_COMMENTS: ReviewComment[] = [
  {
    id: 'RC-004',
    submissionId: 'GSM-2024-Q1',
    reviewerRole: 'acva-verifier',
    reviewerName: 'Dr. Priya Sharma',
    reviewerOrganization: 'TUV-SUD India',
    commentType: 'CAR',
    severity: ReviewCommentSeverity.MAJOR,
    commentText:
      'GEI calculation shows confidence score 76%, below acceptable threshold of 85%. Missing documentation for renewable energy off-take agreement. Please provide signed agreement or MOU.',
    relatedField: 'renewable_energy_calculation',
    createdAt: new Date('2024-03-25'),
    resolvedAt: undefined,
    entityResponse: undefined,
    resolutionStatus: ReviewCommentStatus.OPEN,
    actionRequired: true,
    daysSinceCreated: 11,
  },
  {
    id: 'RC-005',
    submissionId: 'GSM-2024-Q1',
    reviewerRole: 'acva-verifier',
    reviewerName: 'Dr. Priya Sharma',
    reviewerOrganization: 'TUV-SUD India',
    commentType: 'QUERY',
    severity: ReviewCommentSeverity.MAJOR,
    commentText:
      'Activity data completeness: Missing monthly breakdown for March 2024. Only summary provided. Please submit detailed monthly activity data with daily readings for complete quarter coverage.',
    relatedField: 'activity_data_completeness',
    createdAt: new Date('2024-03-26'),
    resolvedAt: undefined,
    entityResponse: undefined,
    resolutionStatus: ReviewCommentStatus.OPEN,
    actionRequired: true,
    daysSinceCreated: 10,
  },
  {
    id: 'RC-006',
    submissionId: 'GSM-2024-Q1',
    reviewerRole: 'acva-verifier',
    reviewerName: 'Dr. Priya Sharma',
    reviewerOrganization: 'TUV-SUD India',
    commentType: 'MINOR',
    severity: ReviewCommentSeverity.MINOR,
    commentText:
      'Evidence pack organization: Please provide table of contents for evidence attachments. Current submission has 47 files without clear indexing. This helps verification traceability.',
    relatedField: 'evidence_documentation',
    createdAt: new Date('2024-03-27'),
    resolvedAt: undefined,
    entityResponse: undefined,
    resolutionStatus: ReviewCommentStatus.OPEN,
    actionRequired: false,
    daysSinceCreated: 9,
  },
]

/**
 * Helper function to count pending comments by severity
 */
export function countPendingComments(comments: ReviewComment[]): {
  total: number
  critical: number
  major: number
  minor: number
  actionRequired: number
} {
  const pending = comments.filter(c => c.resolutionStatus === ReviewCommentStatus.OPEN)

  return {
    total: pending.length,
    critical: pending.filter(c => c.severity === ReviewCommentSeverity.CRITICAL).length,
    major: pending.filter(c => c.severity === ReviewCommentSeverity.MAJOR).length,
    minor: pending.filter(c => c.severity === ReviewCommentSeverity.MINOR).length,
    actionRequired: pending.filter(c => c.actionRequired).length,
  }
}

/**
 * Helper function to format comment for display
 */
export function formatCommentDate(date: Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}
