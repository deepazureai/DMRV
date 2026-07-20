import { SubmissionStatus } from './submission-context'

export function canTransitionTo(currentStatus: SubmissionStatus, targetStatus: SubmissionStatus, userRole?: string): boolean {
  const validTransitions: Record<SubmissionStatus, SubmissionStatus[]> = {
    draft: ['submitted'],
    submitted: ['pending_verification'],
    pending_verification: ['verified', 'verification_requested_corrections', 'verification_rejected'],
    verification_requested_corrections: ['pending_verification', 'verification_rejected'],
    verified: ['pending_approval'],
    verification_rejected: ['submitted'], // Can resubmit after rejection
    pending_approval: ['approved', 'approval_requested_corrections', 'approval_rejected'],
    approval_requested_corrections: ['pending_approval', 'approval_rejected'],
    approved: ['pending_registration'],
    approval_rejected: ['pending_verification'], // Back to verification
    pending_registration: ['registered', 'registration_failed'],
    registered: [],
    registration_failed: ['pending_registration'], // Can retry
  }

  return validTransitions[currentStatus]?.includes(targetStatus) || false
}

export function getSubmissionPhase(status: SubmissionStatus): 'submission' | 'verification' | 'approval' | 'registry' {
  if (['draft', 'submitted', 'pending_verification', 'verification_requested_corrections', 'verification_rejected'].includes(status)) {
    return 'submission'
  }
  if (['verified', 'pending_approval', 'approval_requested_corrections', 'approval_rejected'].includes(status)) {
    return 'verification'
  }
  if (['approved', 'pending_registration'].includes(status)) {
    return 'approval'
  }
  return 'registry'
}

export function isStatusFinal(status: SubmissionStatus): boolean {
  return ['registered', 'verification_rejected', 'approval_rejected'].includes(status)
}

export function getNextExpectedRole(status: SubmissionStatus): string {
  switch (status) {
    case 'submitted':
    case 'pending_verification':
      return 'verifier-auditor'
    case 'verified':
    case 'pending_approval':
      return 'bee-regulator'
    case 'approved':
    case 'pending_registration':
      return 'registry-operator'
    default:
      return 'entity-submitter'
  }
}

export function canUserPerformAction(userRole: string, status: SubmissionStatus, action: string): boolean {
  const role = userRole as 'entity-submitter' | 'verifier-auditor' | 'bee-regulator' | 'registry-operator' | 'sector-officer'

  const actionPermissions: Record<string, Record<string, boolean>> = {
    submit: {
      'entity-submitter': ['draft', 'submitted', 'verification_requested_corrections', 'approval_requested_corrections'].includes(status),
      'verifier-auditor': false,
      'bee-regulator': false,
      'registry-operator': false,
      'sector-officer': false,
    },
    verify: {
      'entity-submitter': false,
      'verifier-auditor': ['pending_verification', 'verification_requested_corrections'].includes(status),
      'bee-regulator': false,
      'registry-operator': false,
      'sector-officer': ['pending_verification', 'verification_requested_corrections'].includes(status),
    },
    approve: {
      'entity-submitter': false,
      'verifier-auditor': false,
      'bee-regulator': ['pending_approval', 'approval_requested_corrections'].includes(status),
      'registry-operator': false,
      'sector-officer': ['pending_approval', 'approval_requested_corrections'].includes(status),
    },
    register: {
      'entity-submitter': false,
      'verifier-auditor': false,
      'bee-regulator': false,
      'registry-operator': ['pending_registration', 'registration_failed'].includes(status),
      'sector-officer': ['pending_registration', 'registration_failed'].includes(status),
    },
  }

  return actionPermissions[action]?.[role] || false
}

export function getStatusDescription(status: SubmissionStatus): string {
  const descriptions: Record<SubmissionStatus, string> = {
    draft: 'Draft submission not yet submitted',
    submitted: 'Submitted and awaiting verification review',
    pending_verification: 'Waiting for verifier auditor review',
    verification_requested_corrections: 'Verifier requested corrections, resubmit to proceed',
    verified: 'Verified successfully, awaiting approval',
    verification_rejected: 'Verification rejected, submit corrections and resubmit',
    pending_approval: 'Verified and awaiting regulatory approval',
    approval_requested_corrections: 'Approver requested corrections, submit and resubmit',
    approved: 'Approved for carbon credit issuance',
    approval_rejected: 'Approval rejected, return to verification',
    pending_registration: 'Approved and ready for blockchain registration',
    registered: 'Successfully registered on blockchain',
    registration_failed: 'Registration failed, retry registration',
  }

  return descriptions[status]
}
