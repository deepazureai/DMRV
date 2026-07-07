# ICM Digital Trust Layer - System Guide

## Executive Summary

The ICM Digital Trust Layer is an enterprise-grade carbon credit verification and blockchain registry platform. This guide documents the complete system architecture, data model, workflows, and operational procedures.

## System Overview

### Purpose

Enable transparent, verifiable carbon credit certification through a multi-stakeholder digital platform that:
- Captures carbon credit data from offset and renewable energy projects
- Applies approved CDM/ACM methodologies for CCC calculation
- Provides independent third-party verification
- Ensures regulatory compliance through BEE oversight
- Records all CCCs permanently on blockchain for immutability

### Key Principles

1. **Trust & Transparency:** All actions auditable with complete lifecycle history
2. **Regulatory Compliance:** BEE oversight at critical approval gates
3. **Data Integrity:** Immutable blockchain recording of all approved CCCs
4. **Stakeholder Collaboration:** Clear communication between all parties
5. **Process Efficiency:** Streamlined workflows with exception handling

## System Architecture

### 9 Core Modules

```
┌─────────────────────────────────────────────────────────────┐
│                  ICM Digital Trust Layer                     │
├──────────┬──────────┬──────────┬──────────┬──────────────────┤
│ Module 1 │ Module 2 │ Module 3 │ Module 4 │ Module 5 ...     │
│ Entities │Projects  │Boundaries│Ingestion │ Data Quality...  │
│ & Orgs   │& Offsets │& Methods │& Submit  │ CCC Calc...      │
├──────────┴──────────┴──────────┴──────────┴──────────────────┤
│              Shared Data Layer & Mock Database               │
│  • 248 Entities • 684 Projects • 684 Submissions             │
│  • 342+ Data Quality Issues • Evidence Files                 │
├──────────────────────────────────────────────────────────────┤
│        Stakeholder Portal (5 Personas)                       │
│  Entity | Verifier | BEE | Registry Op | Sector Officer     │
├──────────────────────────────────────────────────────────────┤
│        Blockchain Registry Layer                             │
│  Immutable CCC Recording & Transaction History               │
└──────────────────────────────────────────────────────────────┘
```

### Data Model

#### Core Entities

```typescript
Entity {
  id: string
  name: string
  sector: string
  location: string
  status: 'active' | 'pending' | 'suspended'
  certifications: string[]
  contact: { name, email, phone }
}

Project {
  id: string
  entityId: string
  name: string
  status: 'planning' | 'active' | 'completed' | 'paused'
  methodology: string (ACM0013, ACM0014, ACM0002, etc.)
  expectedCCCs: number
}

Submission {
  id: string
  projectId: string
  entityId: string
  period: string (Q1 FY2026-27, etc.)
  status: 'draft' | 'submitted' | 'under_review' | 'verified' | 'approved' | 'registered'
  dataQualityScore: number (0-100)
  exceptions: string[]
  cccEstimate: number
}

DataQualityIssue {
  id: string
  submissionId: string
  issueType: 'missing_data' | 'outlier' | 'inconsistency' | 'validation_error'
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  resolved: boolean
  resolution?: string
}

Evidence {
  id: string
  submissionId: string
  type: 'sensor_data' | 'document' | 'report' | 'certificate' | 'other'
  fileName: string
  uploadDate: string
  size: number (bytes)
  verified: boolean
}

BlockchainPacket {
  id: string
  submissionId: string
  entityId: string
  status: 'pending' | 'signed' | 'registered' | 'failed'
  cccAmount: number
  hash: string (packet hash)
  registryTxHash: string (blockchain transaction hash)
  createdAt: string
  registeredAt?: string
}
```

## Stakeholder Workflows

### 1. Entity / Project Developer

**Role:** Submit carbon credit data for verification

**Primary Workflow:**
1. Register organization and projects via onboarding wizard
2. Collect carbon credit calculation data from operations
3. Prepare evidence files (sensor data, certificates, audit reports)
4. Submit data via submission form with quality self-assessment
5. Monitor submission through verification lifecycle
6. Receive CCC allocation upon approval
7. Track CCC movement through registry

**Key Actions:**
- `/entities` - View registered entities
- `/projects` - Browse registered projects
- `/submissions` - Submit new data or view status
- `/evidence` - Upload supporting documents
- `/golden-path` - View exemplar submission

### 2. Data Quality Assurance

**Role:** Validate submission data quality and identify exceptions

**Primary Workflow:**
1. Review incoming submissions
2. Run automated data quality checks
3. Flag issues with severity levels
4. Document exceptions and root causes
5. Work with entities to resolve issues
6. Approve submission for verification phase

**Key Actions:**
- `/data-quality` - View all data quality issues
- `/submissions` - Review submission details
- Issue resolution tracking and audit trail

### 3. Third-Party Verifier

**Role:** Independently verify calculations and methodologies

**Primary Workflow:**
1. Receive verified submissions from quality assurance
2. Review all evidence and documentation
3. Validate data against approved methodologies
4. Perform independent CCC calculations
5. Resolve any discrepancies with entity
6. Issue verification certificate
7. Approve for regulatory review

**Key Actions:**
- `/verification` - Verifier workbench
- `/methodology` - Review calculation methodology
- `/evidence` - Examine evidence files
- Issue verification approval

### 4. BEE Regulator

**Role:** Ensure regulatory compliance and approve for registry

**Primary Workflow:**
1. Review verified submissions
2. Check compliance with policies
3. Verify methodology application correctness
4. Approve for blockchain registration
5. Monitor overall compliance trends
6. Generate regulatory reports

**Key Actions:**
- `/approvals` - BEE approval queue
- `/blockchain` - View registration readiness
- Approve for blockchain publication

### 5. Registry Operator

**Role:** Register approved CCCs on blockchain ledger

**Primary Workflow:**
1. Receive BEE-approved submissions
2. Create blockchain packet with submission data
3. Generate packet cryptographic hash
4. Sign transaction with organization key
5. Submit to blockchain network
6. Confirm immutable recording
7. Track transaction history

**Key Actions:**
- `/blockchain` - Create and manage blockchain packets
- `/registry` - View all registered transactions
- Confirm blockchain network status

### 6. Sector Officer

**Role:** Monitor sector-wide trends and coordinate activities

**Primary Workflow:**
1. Monitor sector submissions and approvals
2. Generate sector analytics and reporting
3. Identify trends and anomalies
4. Coordinate stakeholder activities
5. Provide policy advisory
6. Create sector reports

## The Golden Path Example

### Submission Details

**Entity:** Eastern Cement Works Ltd (ECWL)
**Period:** Q1 FY2026-27
**Methodology:** ACM0013 - Optimization of Energy Systems
**Project:** Energy efficiency improvements in kiln operations

### Complete Lifecycle (21 Days)

#### Day 1: Data Submission
```
Action: Entity submits Q1 data
Files: 4 supporting documents (12.1 MB total)
- Hourly sensor readings (CSV)
- Project boundary documentation (PDF)
- Third-party audit report (PDF)
- ISO 50001 certification (PDF)
Status: SUBMITTED
```

#### Day 1-2: Quality Assessment
```
Automated Checks:
- Format validation: PASSED
- Required fields: PASSED
- Data range checks: PASSED
- Outlier detection: 2 EXCEPTIONS FLAGGED

Exceptions:
1. Temperature sensor variance: 0.3°C on Day 8 (RESOLVED)
2. Missing weather data: January 8 (RESOLVED)

Manual Review: Data Quality Score 87%
Status: APPROVED FOR VERIFICATION
```

#### Day 3-9: Verification Review
```
Verifier: Michael Chen, Global Carbon Verification Ltd
Actions:
- All evidence files validated
- Methodology ACM0013 correctly applied
- Calculations verified independently
- CCC amount: 14,850 (verified)
- Quality assessment: 87% maintained

Status: VERIFIED
```

#### Day 10-14: Regulatory Approval
```
Regulator: Dr. Amelia Singh, Bureau of Energy Efficiency
Actions:
- Compliance verification complete
- Policy adherence confirmed
- Ready for blockchain registration
Status: APPROVED
```

#### Day 15-21: Blockchain Registration
```
Registry Operator: Sarah Thompson, International Carbon Registry
Actions:
- Create blockchain packet
- Packet Hash: 0x8a9c4d2f7e1b3a9c...
- Sign transaction
- TX Hash: 0x5f2e1d9c8b7a6f5e...
- Register on blockchain
- Confirm immutability

Status: REGISTERED (Permanent & Immutable)
```

### Key Metrics
- Data Quality Score: 87%
- Exceptions Identified: 2 (both resolved)
- Total Duration: 21 days
- Verified CCCs: 14,850
- Blockchain Status: Registered

## Database Schema

### Tables (When Connected to Real Database)

```sql
-- Core entities
CREATE TABLE entities (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  sector VARCHAR(100),
  location VARCHAR(255),
  status VARCHAR(50),
  registration_date DATE,
  created_at TIMESTAMP
);

CREATE TABLE projects (
  id UUID PRIMARY KEY,
  entity_id UUID REFERENCES entities,
  name VARCHAR(255),
  methodology VARCHAR(255),
  expected_cccs INTEGER,
  status VARCHAR(50),
  created_at TIMESTAMP
);

CREATE TABLE submissions (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES projects,
  entity_id UUID REFERENCES entities,
  period VARCHAR(50),
  status VARCHAR(50),
  data_quality_score INTEGER,
  ccc_estimate INTEGER,
  submission_date DATE,
  created_at TIMESTAMP
);

-- Quality tracking
CREATE TABLE data_quality_issues (
  id UUID PRIMARY KEY,
  submission_id UUID REFERENCES submissions,
  issue_type VARCHAR(50),
  severity VARCHAR(20),
  description TEXT,
  resolved BOOLEAN,
  resolution_notes TEXT,
  created_at TIMESTAMP
);

-- Evidence management
CREATE TABLE evidence_files (
  id UUID PRIMARY KEY,
  submission_id UUID REFERENCES submissions,
  file_type VARCHAR(50),
  file_name VARCHAR(255),
  file_size INTEGER,
  upload_date DATE,
  verified BOOLEAN,
  created_at TIMESTAMP
);

-- Blockchain registry
CREATE TABLE blockchain_packets (
  id UUID PRIMARY KEY,
  submission_id UUID REFERENCES submissions,
  entity_id UUID REFERENCES entities,
  status VARCHAR(50),
  ccc_amount INTEGER,
  packet_hash VARCHAR(255),
  tx_hash VARCHAR(255),
  created_at TIMESTAMP,
  registered_at TIMESTAMP
);

-- Audit trail
CREATE TABLE audit_log (
  id UUID PRIMARY KEY,
  submission_id UUID REFERENCES submissions,
  action VARCHAR(255),
  actor VARCHAR(255),
  timestamp TIMESTAMP,
  details JSON
);
```

## API Endpoints (Ready for Backend Integration)

### Submission Management
```
GET    /api/submissions              - List all submissions
GET    /api/submissions/:id          - Get submission details
POST   /api/submissions              - Create new submission
PUT    /api/submissions/:id          - Update submission
GET    /api/submissions/:id/status   - Get lifecycle status
```

### Data Quality
```
GET    /api/issues                   - List all issues
GET    /api/issues?severity=high     - Filter by severity
POST   /api/issues/:id/resolve       - Mark issue resolved
GET    /api/submissions/:id/issues   - Issues for submission
```

### Evidence Management
```
GET    /api/evidence                 - List all evidence
POST   /api/evidence/upload          - Upload new file
GET    /api/evidence/:id/download    - Download file
PUT    /api/evidence/:id/verify      - Mark as verified
```

### Blockchain Registry
```
GET    /api/blockchain/packets       - List all packets
POST   /api/blockchain/packets       - Create new packet
GET    /api/blockchain/packets/:id   - Packet details
PUT    /api/blockchain/packets/:id/sign - Sign packet
POST   /api/blockchain/packets/:id/register - Register on chain
GET    /api/blockchain/status        - Network status
```

## Integration Roadmap

### Phase 1: Data Layer
Replace mock data with database:
1. Connect PostgreSQL (Neon/Aurora)
2. Replace mock-data.ts functions with queries
3. Implement API endpoints above

### Phase 2: Authentication
Implement role-based access:
1. Integrate Auth.js/Better Auth
2. Map personas to user roles
3. Add permission middleware

### Phase 3: Blockchain Integration
Connect actual blockchain:
1. Integrate with Ethereum/Polygon testnet
2. Deploy smart contract for CCC registry
3. Implement cryptographic signing

### Phase 4: Real-Time Updates
Add WebSocket/Server Events:
1. Real-time submission status
2. Live issue resolution notifications
3. Blockchain transaction confirmations

## Operations & Maintenance

### Monitoring

- **System Health:** Dashboard shows API, blockchain gateway, data processing status
- **Performance Metrics:** Response times, error rates, throughput
- **Data Quality:** Overall quality score trends, issue resolution rates
- **Compliance:** Audit trail completeness, policy adherence

### Troubleshooting

| Issue | Diagnosis | Resolution |
|-------|-----------|-----------|
| Submission rejected | Check data quality issues page | Review exceptions, work with entity to resolve |
| Verification delayed | Check verifier queue | Contact verifier for status update |
| Blockchain registration failed | Check blockchain page | Verify network connection, retry signing |
| Data validation errors | Check submissions page | Review evidence files, validate against methodology |

## Security Considerations

### Data Protection
- Row Level Security (RLS) for database
- Per-user data scoping in queries
- Role-based access control for pages

### Audit Trail
- All actions logged with actor, timestamp, changes
- Immutable blockchain recording
- Complete lifecycle history for compliance

### Network Security
- HTTPS for all connections
- Cryptographic signing for blockchain transactions
- API authentication and rate limiting

## Deployment

### Production Checklist

- [ ] Database backup strategy configured
- [ ] Error monitoring (Sentry/similar) enabled
- [ ] Audit logging to persistent storage
- [ ] Blockchain network confirmed (testnet/mainnet)
- [ ] Rate limiting configured
- [ ] SSL certificates valid
- [ ] API authentication enabled
- [ ] User roles configured
- [ ] Disaster recovery plan documented

## Support

### Common Questions

**Q: How do I add a new entity?**
A: Go to `/entities`, click "Add Entity", fill the registration form.

**Q: Can I modify a submitted submission?**
A: No. Create a new submission for the next period. Submitted submissions are immutable for audit trail.

**Q: What happens if data quality check fails?**
A: Issues appear on `/data-quality` page. Work with entity to resolve exceptions before verification.

**Q: How are CCCs registered on blockchain?**
A: Registry operator creates packet, signs transaction, submits to blockchain network at `/blockchain`.

**Q: Can I export data?**
A: Yes. Go to `/settings` and select "Export Data" for downloadable reports.

## References

- **Methodology:** ACM0013 (Energy Optimization), ACM0014 (Fuel Switch), ACM0002 (Renewable Energy)
- **Standards:** ISO 14001 (Environmental), ISO 50001 (Energy Management)
- **Blockchain:** Ethereum/Polygon for immutable registry
- **Compliance:** BEE (Bureau of Energy Efficiency) regulatory framework
