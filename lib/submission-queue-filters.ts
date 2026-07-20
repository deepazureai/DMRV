import { SubmissionState } from './submission-context'

export function getMySubmissions(submissions: SubmissionState[], entityId: string): SubmissionState[] {
  return submissions.filter(sub => sub.entityId === entityId)
}

export function getForVerification(submissions: SubmissionState[]): SubmissionState[] {
  return submissions.filter(sub => 
    sub.status === 'pending_verification'
  )
}

export function getForVerifierReview(submissions: SubmissionState[]): SubmissionState[] {
  return submissions.filter(sub => 
    ['pending_verification', 'verification_requested_corrections', 'verified', 'verification_rejected'].includes(sub.status)
  )
}

export function getForApproval(submissions: SubmissionState[]): SubmissionState[] {
  return submissions.filter(sub => 
    sub.status === 'pending_approval'
  )
}

export function getForApproverReview(submissions: SubmissionState[]): SubmissionState[] {
  return submissions.filter(sub => 
    ['pending_approval', 'approval_requested_corrections', 'verified', 'approved', 'approval_rejected'].includes(sub.status)
  )
}

export function getForRegistration(submissions: SubmissionState[]): SubmissionState[] {
  return submissions.filter(sub => 
    sub.status === 'pending_registration'
  )
}

export function getForRegistryReview(submissions: SubmissionState[]): SubmissionState[] {
  return submissions.filter(sub => 
    ['pending_registration', 'registered', 'registration_failed'].includes(sub.status)
  )
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'draft':
      return 'bg-gray-100 text-gray-800'
    case 'submitted':
      return 'bg-blue-100 text-blue-800'
    case 'pending_verification':
      return 'bg-yellow-100 text-yellow-800'
    case 'verification_requested_corrections':
      return 'bg-orange-100 text-orange-800'
    case 'verified':
      return 'bg-green-100 text-green-800'
    case 'verification_rejected':
      return 'bg-red-100 text-red-800'
    case 'pending_approval':
      return 'bg-cyan-100 text-cyan-800'
    case 'approval_requested_corrections':
      return 'bg-orange-100 text-orange-800'
    case 'approved':
      return 'bg-purple-100 text-purple-800'
    case 'approval_rejected':
      return 'bg-red-100 text-red-800'
    case 'pending_registration':
      return 'bg-indigo-100 text-indigo-800'
    case 'registered':
      return 'bg-emerald-100 text-emerald-800'
    case 'registration_failed':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export function getStatusIcon(status: string) {
  switch (status) {
    case 'submitted':
    case 'pending_verification':
    case 'pending_approval':
    case 'pending_registration':
      return 'Clock'
    case 'verified':
    case 'approved':
    case 'registered':
      return 'CheckCircle'
    case 'verification_rejected':
    case 'approval_rejected':
    case 'registration_failed':
      return 'AlertCircle'
    case 'verification_requested_corrections':
    case 'approval_requested_corrections':
      return 'AlertCircle'
    default:
      return 'AlertCircle'
  }
}

export function getStatusLabel(status: string): string {
  return status
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
