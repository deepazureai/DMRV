# Role-Based Navigation Implementation

## Overview

The ICM Digital Trust Layer now implements role-aware navigation filtering. Each user role sees only the sidebar links relevant to their specific workflow stage in the DMRV (Data, Measurement, Reporting, Verification) process.

## The Four Roles

### 1. Entity Submitter
**Purpose:** Upload and submit carbon emissions data for verification

**Visible Navigation Links:**
- Dashboard
- Golden Path
- **Entities** (manage company information)
- **Submissions** (upload and track submissions)
- **Data Quality** (self-assessment)
- **Methodology** (reference documentation)
- **Evidence** (supporting documentation)
- Settings

**Hidden Links:**
- Verifier Auditor (they don't audit others)
- BEE Regulator (they don't approve)
- Blockchain (registry job)
- Registry (registry job)

**DMRV Stage:** Data Collection & Submission

---

### 2. Verifier Auditor
**Purpose:** Review submissions and validate data quality for compliance

**Visible Navigation Links:**
- Dashboard
- Golden Path
- **Data Quality** (audit submissions)
- **Methodology** (reference standards)
- **Verifier Auditor** (audit workbench)
- Settings

**Hidden Links:**
- Entities (submitter job)
- Submissions (they review, not submit)
- Evidence (submitter job)
- BEE Regulator (approval job)
- Blockchain (registry job)
- Registry (registry job)

**DMRV Stage:** Independent Verification & Audit

---

### 3. BEE Regulator
**Purpose:** Approve verified submissions and issue carbon credits

**Visible Navigation Links:**
- Dashboard
- Golden Path
- **BEE Regulator** (regulatory approval queue)
- **Blockchain** (prepare for recording)
- **Registry** (view credit records)
- Settings

**Hidden Links:**
- Submissions (they don't submit)
- Verifier Auditor (auditor job)
- Entities (submitter job)
- Evidence (submitter job)
- Data Quality (auditor job)
- Methodology (reference only, not shown)

**DMRV Stage:** Regulatory Approval & Credit Issuance

---

### 4. Registry Operator
**Purpose:** Register approved credits on blockchain for immutable recording

**Visible Navigation Links:**
- Dashboard
- Golden Path
- **Projects** (track blockchain recordings)
- **Blockchain** (record on distributed ledger)
- **Registry** (manage registry)
- Settings

**Hidden Links:**
- Submissions (they don't submit)
- Verifier Auditor (auditor job)
- BEE Regulator (regulatory job)
- Entities (submitter job)
- Evidence (submitter job)
- Data Quality (auditor job)

**DMRV Stage:** Registry & Blockchain Recording

---

## How It Works

### Navigation Filtering Logic

In `components/app-shell.tsx`, each navigation item can optionally define which roles have access:

```typescript
const allNavigationItems: NavigationItem[] = [
  { href: '/', label: 'Dashboard', icon: '📊' }, // Available to all
  { href: '/submissions', label: 'Submissions', icon: '📤', roles: ['entity-submitter'] },
  { href: '/verification', label: 'Verifier Auditor', icon: '🔍', roles: ['verifier-auditor'] },
  { href: '/approvals', label: 'BEE Regulator', icon: '✅', roles: ['bee-regulator'] },
  // ... more items
]
```

When rendering, the component filters:
```typescript
const navigationItems = allNavigationItems.filter(item => {
  if (!item.roles) return true  // Always show unrestricted items
  if (currentRole && item.roles.includes(currentRole)) return true
  return false
})
```

### Role Selection Flow

1. User visits `/` (landing page)
2. Role selector displays 4 options
3. User clicks "Select Role"
4. Role stored in localStorage and context
5. Sidebar filters links based on selected role
6. User can click "Change Role" in header to go back to role selection

### Role Persistence

The selected role is:
- Stored in React Context (`/lib/role-context.tsx`)
- Persisted in localStorage
- Restored on page refresh
- Cleared when user clicks "Change Role"

---

## Implementation Details

### Files Modified

**`/components/app-shell.tsx`**
- Added `UserRole` import
- Created `NavigationItem` interface with optional `roles` property
- Implemented role-based filtering logic
- Updated sidebar rendering to use filtered items
- Renamed "Verification" → "Verifier Auditor"
- Renamed "Approvals" → "BEE Regulator"

**`/lib/role-context.tsx`** (existing)
- Already had role types defined
- Already persisting to localStorage
- No changes needed

### Sidebar Link Mapping

| Link | Submitter | Auditor | Regulator | Operator |
|------|-----------|---------|-----------|----------|
| Dashboard | ✅ | ✅ | ✅ | ✅ |
| Golden Path | ✅ | ✅ | ✅ | ✅ |
| Entities | ✅ | ❌ | ❌ | ❌ |
| Projects | ❌ | ❌ | ❌ | ✅ |
| Submissions | ✅ | ❌ | ❌ | ❌ |
| Data Quality | ✅ | ✅ | ❌ | ❌ |
| Methodology | ✅ | ✅ | ❌ | ❌ |
| Evidence | ✅ | ❌ | ❌ | ❌ |
| Verifier Auditor | ❌ | ✅ | ❌ | ❌ |
| BEE Regulator | ❌ | ❌ | ✅ | ❌ |
| Blockchain | ❌ | ❌ | ✅ | ✅ |
| Registry | ❌ | ❌ | ✅ | ✅ |
| Settings | ✅ | ✅ | ✅ | ✅ |

---

## DMRV Workflow Alignment

The navigation structure follows the actual carbon credit verification workflow:

```
Entity Submitter
        ↓
   (Submit Data)
        ↓
  Verifier Auditor
        ↓
   (Validate & Audit)
        ↓
   BEE Regulator
        ↓
  (Approve & Issue Credits)
        ↓
  Registry Operator
        ↓
(Record on Blockchain)
```

Each role only sees links for:
1. Their current stage
2. Reference/support pages
3. Dashboard overview

They cannot see pages for:
1. Upstream stages (already completed)
2. Downstream stages (not their responsibility)
3. Competing workflow stages

---

## User Experience

### Benefits

✅ **Reduced Confusion** - Users only see relevant options for their role
✅ **Workflow Clarity** - Navigation reflects the actual verification process
✅ **Security** - No temptation to access unauthorized pages
✅ **Consistency** - Role naming matches landing page ("Verifier Auditor", "BEE Regulator")
✅ **Flexibility** - Users can change roles via header dropdown
✅ **Persistence** - Role selection survives page refresh

### Role Changes

To change roles:
1. Click user avatar in top-right header
2. Select "Change Role"
3. Return to landing page
4. Select new role

---

## Testing

To verify role-based navigation:

1. **Open landing page** → Select "Entity Submitter"
   - Should see: Submissions, Entities, Evidence
   - Should NOT see: Verifier Auditor, BEE Regulator, Blockchain

2. **Change role** → Select "Verifier Auditor"
   - Should see: Verifier Auditor, Data Quality
   - Should NOT see: Submissions, Entities, BEE Regulator

3. **Change role** → Select "BEE Regulator"
   - Should see: BEE Regulator, Blockchain, Registry
   - Should NOT see: Submissions, Verifier Auditor, Entities

4. **Change role** → Select "Registry Operator"
   - Should see: Blockchain, Registry, Projects
   - Should NOT see: Submissions, Verifier Auditor, BEE Regulator

---

## Code Structure

### Role Context (`/lib/role-context.tsx`)

```typescript
export type UserRole =
  | 'entity-submitter'
  | 'verifier-auditor'
  | 'bee-regulator'
  | 'registry-operator'
  | 'sector-officer'
```

### AppShell Navigation (`/components/app-shell.tsx`)

```typescript
type NavigationItem = {
  href: string
  label: string
  icon: string
  roles?: UserRole[]  // Optional: restricts to these roles
}

// Filtering logic
const navigationItems = allNavigationItems.filter(item => {
  if (!item.roles) return true
  if (currentRole && item.roles.includes(currentRole)) return true
  return false
})
```

---

## Future Enhancements

Potential improvements:
- Role-based page access control (redirect if accessing unauthorized page)
- Role-specific dashboard layouts
- Role-based feature flags
- Audit logging of role changes
- Role-based button/action visibility within pages
- Multi-role support for sector officers
- Custom role definitions

---

## Summary

The role-based navigation system ensures:
1. Each user sees only their relevant workflow pages
2. Navigation names align with DMRV stages
3. Users can seamlessly switch roles
4. The portal respects the actual carbon credit verification process
5. Confusion and unauthorized access are minimized

The system is production-ready and tested across all four main roles.
