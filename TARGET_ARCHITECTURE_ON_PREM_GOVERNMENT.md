# DMRV Digital Trust Layer - Target Architecture for On-Premises Government Data Center

## Executive Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                    ICM Registry (Upstream System)                                   │
│                           Indian Carbon Market - Entity Registry (Cloud/On-Prem)                    │
│                                  ↓ Batch Export (REST/Kafka)                                        │
└─────────────────────────────────────────────────────────────────────────────────────────────────────┘
                                              ↓
        ┌─────────────────────────────────────────────────────────────────────────────────────────┐
        │                         INTEGRATION LAYER (On-Prem Network)                             │
        │  ┌──────────────────────────────────────────────────────────────────────────────────┐  │
        │  │  Technology: Apache Kafka + Kafka Connect (Data Pipeline) + Kong API Gateway     │  │
        │  │  Data Transformation: Apache NiFi (optional) or Kafka Streams                    │  │
        │  │  Protocol: REST APIs + Kafka Topics for Event Streaming                          │  │
        │  │  Staging Database: PostgreSQL (Temporary Entity Staging Tables)                  │  │
        │  │  Data Quality Checks: Automated validation (duplicates, mandatory fields)        │  │
        │  │  Authentication: SAML 2.0 with Government AD/LDAP Integration                    │  │
        └──────────────────────────────────────────────────────────────────────────────────────┘
                                              ↓
        ┌─────────────────────────────────────────────────────────────────────────────────────────┐
        │                      LOAD BALANCER (Government-Approved)                              │
        │        Hardware: F5 BIG-IP or Citrix NetScaler (Production-grade, HA setup)         │
        │        Configuration: SSL/TLS termination, Session persistence, Health checks        │
        │        Redundancy: Active-Passive (with automatic failover)                          │
        └─────────────────────────────────────────────────────────────────────────────────────────┘
                                              ↓
        ┌─────────────────────────────────────────────────────────────────────────────────────────┐
        │                           WEB APPLICATION FIREWALL (WAF)                              │
        │        Solution: ModSecurity (Open-source, government-compliant) or F5 WAF           │
        │        Rules: OWASP Top 10 protection, SQL injection, XSS, CSRF prevention            │
        │        DDoS Protection: Rate limiting, IP reputation blocking                         │
        └─────────────────────────────────────────────────────────────────────────────────────────┘
                                              ↓
        ┌─────────────────────────────────────────────────────────────────────────────────────────┐
        │                    API GATEWAY (Government-Approved APIM)                             │
        │        Solution: Kong (Open-source, government-approved for India)                   │
        │        Features: API versioning, rate limiting, OAuth 2.0, API logging               │
        │        Alternative: Red Hat 3Scale (if already in Red Hat ecosystem)                 │
        │        Authentication: JWT + Role-Based Access Control (RBAC)                        │
        │        API Catalog: Developer portal for microservice discovery                       │
        └─────────────────────────────────────────────────────────────────────────────────────────┘
                                              ↓
        ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
        │                      DMRV DIGITAL TRUST LAYER (N-Tier Architecture)                             │
        │                       Container Orchestration: OpenShift 4.x (Red Hat)                          │
        │                                                                                                  │
        │  ┌────────────────────────────────────────────────────────────────────────────────────────────┐ │
        │  │                         PRESENTATION LAYER (Frontend)                                      │ │
        │  │                                                                                            │ │
        │  │  Technology: Next.js 16 (React + Server Components)                                      │ │
        │  │  Container: Node.js runtime (18 LTS) in OpenShift pods                                   │ │
        │  │  Replicas: 3+ pods (auto-scaling based on CPU/Memory)                                    │ │
        │  │  Language: TypeScript + Tailwind CSS                                                      │ │
        │  │                                                                                            │ │
        │  │  ┌─────────────────────────────────────────────────────────────────────────┐             │ │
        │  │  │            STATIC CONTENT DELIVERY (On-Prem Equivalent)                 │             │ │
        │  │  │                                                                         │             │ │
        │  │  │  Solution: MinIO (S3-Compatible Object Storage) or Ceph                 │             │ │
        │  │  │  Features: High availability, automatic replication, versioning         │             │ │
        │  │  │  Storage: React build artifacts, images, PDFs, CSV exports              │             │ │
        │  │  │  Caching: Varnish Cache (in-front of MinIO for CDN-like behavior)      │             │ │
        │  │  │  Performance: Automatic compression, cache busting, HTTP/2              │             │ │
        │  │  │                                                                         │             │ │
        │  │  │  [MinIO Cluster (3+ nodes) + Varnish Cache Layer]                       │             │ │
        │  │  └─────────────────────────────────────────────────────────────────────────┘             │ │
        │  │                                                                                            │ │
        │  │  ┌─────────────────────────────────────────────────────────────────────────┐             │ │
        │  │  │              FRONTEND CACHING STRATEGY (On-Prem Network)               │             │ │
        │  │  │                                                                         │             │ │
        │  │  │  Redis Cache (for session storage, UI state, API responses)             │             │ │
        │  │  │  Implementation: Redis Cluster (6+ nodes, 3 primaries + 3 replicas)     │             │ │
        │  │  │  TTL Strategy: HTML artifacts (7 days), Images (30 days), JS (7 days)   │             │ │
        │  │  │  Network: Varnish Cache → MinIO with automatic invalidation             │             │ │
        │  │  └─────────────────────────────────────────────────────────────────────────┘             │ │
        │  └────────────────────────────────────────────────────────────────────────────────────────────┘ │
        │                                              ↓                                                  │
        │  ┌────────────────────────────────────────────────────────────────────────────────────────────┐ │
        │  │                        SERVICE LAYER (Microservices)                                       │ │
        │  │                      (Running in OpenShift - Kubernetes)                                   │ │
        │  │                                                                                            │ │
        │  │  1. AUTHENTICATION SERVICE                                                                 │ │
        │  │     - Language: Java (Spring Boot) or Node.js                                              │ │
        │  │     - Port: 8001 (internal)                                                                │ │
        │  │     - Auth: JWT tokens, SAML 2.0, OAuth 2.0                                                │ │
        │  │     - Database: PostgreSQL (auth_db)                                                       │ │
        │  │     - Replicas: 2+ pods                                                                    │ │
        │  │                                                                                            │ │
        │  │  2. SUBMISSION SERVICE                                                                     │ │
        │  │     - Manages entity submissions and workflow state                                        │ │
        │  │     - Language: Node.js + TypeScript                                                       │ │
        │  │     - Port: 8002                                                                           │ │
        │  │     - Database: PostgreSQL (submissions_db)                                                │ │
        │  │     - Event Stream: Kafka (submission.created, submission.updated topics)                  │ │
        │  │     - Replicas: 3+ pods                                                                    │ │
        │  │                                                                                            │ │
        │  │  3. VERIFICATION SERVICE                                                                   │ │
        │  │     - ACVA review, Check-Verifier audit, BEE approval logic                                │ │
        │  │     - Language: Java (Spring Boot) - better for complex business logic                     │ │
        │  │     - Port: 8003                                                                           │ │
        │  │     - Database: PostgreSQL (verification_db)                                               │ │
        │  │     - Event Stream: Kafka (verification.submitted, verification.approved)                  │ │
        │  │     - Replicas: 3+ pods                                                                    │ │
        │  │     - ML Integration: TensorFlow model endpoint for anomaly detection                       │ │
        │  │                                                                                            │ │
        │  │  4. BLOCKCHAIN SERVICE                                                                     │ │
        │  │     - CCC registration on Ethereum blockchain                                              │ │
        │  │     - Language: Node.js with web3.js library                                               │ │
        │  │     - Port: 8004                                                                           │ │
        │  │     - Event Stream: Kafka (blockchain.register, blockchain.confirmed)                      │ │
        │  │     - Smart Contract: DMRV CCC Token on Ethereum Mainnet                                   │ │
        │  │     - Replicas: 2+ pods                                                                    │ │
        │  │     - Integration: Ethereum node (Infura API or internal node)                             │ │
        │  │                                                                                            │ │
        │  │  5. ENTITY MANAGEMENT SERVICE (DMRV Admin)                                                 │ │
        │  │     - Entity staging, validation, approval to production                                   │ │
        │  │     - Language: Node.js + TypeScript                                                       │ │
        │  │     - Port: 8005                                                                           │ │
        │  │     - Database: PostgreSQL (entities_db) with staging tables                               │ │
        │  │     - Event Stream: Kafka (entity.imported, entity.approved)                               │ │
        │  │     - Replicas: 2+ pods                                                                    │ │
        │  │                                                                                            │ │
        │  │  6. AUDIT & LOGGING SERVICE                                                                │ │
        │  │     - Comprehensive audit trail for all actions                                            │ │
        │  │     - Language: Java (Logstash consumer from Kafka)                                        │ │
        │  │     - Database: PostgreSQL (audit_logs_db) or Elasticsearch                                │ │
        │  │     - Event Stream: Kafka consumer (all topics) for audit logging                          │ │
        │  │     - Replicas: 2+ pods                                                                    │ │
        │  │                                                                                            │ │
        │  │  7. NOTIFICATION SERVICE                                                                   │ │
        │  │     - Email, SMS, In-app notifications                                                     │ │
        │  │     - Language: Node.js                                                                    │ │
        │  │     - Port: 8006                                                                           │ │
        │  │     - Queue: Kafka (notification topics)                                                   │ │
        │  │     - Integration: SendGrid (email) or local SMTP                                          │ │
        │  │     - Replicas: 2+ pods                                                                    │ │
        │  │                                                                                            │ │
        │  │  Service Mesh: Istio (optional, for advanced observability)                                │ │
        │  │  Inter-service Communication: gRPC (binary protocol, faster than REST)                     │ │
        │  │  API Documentation: OpenAPI 3.0 (Swagger)                                                  │ │
        │  │                                                                                            │ │
        │  └────────────────────────────────────────────────────────────────────────────────────────────┘ │
        │                                              ↓                                                  │
        │  ┌────────────────────────────────────────────────────────────────────────────────────────────┐ │
        │  │                        DATA LAYER (Persistence)                                            │ │
        │  │                                                                                            │ │
        │  │  PRIMARY TRANSACTIONAL DATABASE (OLTP)                                                     │ │
        │  │  - Technology: PostgreSQL 15+ with Streaming Replication                                   │ │
        │  │  - Configuration:                                                                          │ │
        │  │    * Primary node (write operations)                                                       │ │
        │  │    * 2+ standby replicas (read operations, high availability)                              │ │
        │  │    * Automatic failover with pg_basebackup                                                 │ │
        │  │    * WAL (Write-Ahead Logging) archiving to MinIO                                          │ │
        │  │  - Databases:                                                                              │ │
        │  │    * submissions_db (entities, submissions, status tracking)                               │ │
        │  │    * verification_db (ACVA, Check-Verifier, BEE records)                                   │ │
        │  │    * entities_db (staging and production entity records)                                   │ │
        │  │    * auth_db (users, roles, permissions)                                                   │ │
        │  │  - Backup Strategy:                                                                        │ │
        │  │    * Daily full backups to MinIO                                                           │ │
        │  │    * 30-day retention for point-in-time recovery                                           │ │
        │  │    * Off-site backup replication (secondary data center)                                   │ │
        │  │  - Performance Tuning:                                                                     │ │
        │  │    * Connection pooling (pgBouncer) for microservices                                      │ │
        │  │    * Query optimization and indexing                                                       │ │
        │  │    * Partitioning for large tables (submissions by quarter)                                │ │
        │  │                                                                                            │ │
        │  │  ANALYTICS & REPORTING DATABASE (OLAP)                                                     │ │
        │  │  - Technology: TimescaleDB (PostgreSQL extension) or Apache Druid                          │ │
        │  │  - Purpose: Analytics queries, reporting, BI dashboards                                    │ │
        │  │  - Data Pipeline:                                                                          │ │
        │  │    * ETL from PostgreSQL OLTP to TimescaleDB (Kafka Connect + Debezium)                    │ │
        │  │    * Real-time sync of transaction data                                                    │ │
        │  │    * Schema: Fact tables (submissions, verifications) + Dimensions (entities)              │ │
        │  │  - Queries:                                                                                │ │
        │  │    * Average verification time by verifier                                                 │ │
        │  │    * Quality scores by entity sector                                                       │ │
        │  │    * CCC issuance trends over time                                                         │ │
        │  │    * Blockchain registration success rates                                                 │ │
        │  │                                                                                            │ │
        │  │  CACHE LAYER (In-Memory Store)                                                             │ │
        │  │  - Technology: Redis Cluster 7.x                                                           │ │
        │  │  - Topology: 6 nodes (3 primaries, 3 replicas) for high availability                       │ │
        │  │  - Usage:                                                                                   │ │
        │  │    * Session storage (user login tokens, TTL: 8 hours)                                     │ │
        │  │    * Query results cache (entity lists, dashboard metrics)                                 │ │
        │  │    * Rate limiting counters (API rate limits)                                              │ │
        │  │    * Queue for notifications (before Kafka processing)                                     │ │
        │  │  - Configuration:                                                                          │ │
        │  │    * Eviction policy: LRU (least recently used)                                            │ │
        │  │    * Replication: Async replication across replicas                                       │ │
        │  │                                                                                            │ │
        │  │  EVENT STREAMING & MESSAGE QUEUE                                                            │ │
        │  │  - Technology: Apache Kafka (3+ brokers for HA)                                            │ │
        │  │  - Topics:                                                                                  │ │
        │  │    * submission.created, submission.updated, submission.verified                           │ │
        │  │    * verification.acva_review, verification.check_verifier_audit, verification.bee_approved │
        │  │    * entity.imported, entity.approved, entity.rejected                                     │ │
        │  │    * blockchain.register, blockchain.confirmed, blockchain.failed                         │ │
        │  │    * audit.action (all system actions for compliance)                                      │ │
        │  │    * notification.send (email, SMS, push notifications)                                    │ │
        │  │  - Retention: 30 days (configurable based on compliance requirements)                      │ │
        │  │  - Partition Strategy: By entity_id for ordering guarantees                                │ │
        │  │  - Consumer Groups: One per microservice for independent processing                        │ │
        │  │                                                                                            │ │
        │  └────────────────────────────────────────────────────────────────────────────────────────────┘ │
        │                                              ↓                                                  │
        │  ┌────────────────────────────────────────────────────────────────────────────────────────────┐ │
        │  │                  ANALYTICS & MACHINE LEARNING LAYER                                        │ │
        │  │                                                                                            │ │
        │  │  DATA ANALYTICS PLATFORM                                                                   │ │
        │  │  - Technology: Apache Superset (Open-source, government-approved)                          │ │
        │  │  - Alternative: Metabase (if preferred lighter alternative)                                │ │
        │  │  - Connected to: TimescaleDB (analytics database)                                          │ │
        │  │  - Dashboards:                                                                              │ │
        │  │    * Verification KPIs (average time, quality scores, approval rates)                      │ │
        │  │    * Entity metrics (sector distribution, geographic spread)                               │ │
        │  │    * Blockchain status (registration success rates, gas costs)                             │ │
        │  │    * System health (API response times, service availability)                              │ │
        │  │  - Users: BEE Officers, DMRV Admins, Government Analysts                                  │ │
        │  │  - Export: PDF reports, CSV exports, scheduled email reports                               │ │
        │  │                                                                                            │ │
        │  │  MACHINE LEARNING & AI SERVICE                                                              │ │
        │  │  - Technology: TensorFlow or scikit-learn (Python)                                         │ │
        │  │  - Models:                                                                                  │ │
        │  │    1. Anomaly Detection: Identifies suspicious emission data (outliers)                    │ │
        │  │       - Input: Historical entity data + current submission                                 │ │
        │  │       - Output: Anomaly score (0-100%), confidence level                                   │ │
        │  │       - Deployment: Python Flask microservice in OpenShift                                 │ │
        │  │                                                                                            │ │
        │  │    2. Auto-Review Comment Generation: AI-assisted ACVA review                              │ │
        │  │       - Input: Submission data, quality metrics                                            │ │
        │  │       - Output: Suggested major/minor findings                                             │ │
        │  │       - Model: Pretrained BERT + fine-tuned on ACVA feedback                               │ │
        │  │       - Deployment: HuggingFace Transformers API                                           │ │
        │  │                                                                                            │ │
        │  │    3. Data Quality Scoring: Predicts submission approval likelihood                        │ │
        │  │       - Input: Data completeness, consistency, historical patterns                         │ │
        │  │       - Output: Quality score (0-100%)                                                     │ │
        │  │       - Deployment: Scikit-learn model served via FastAPI                                  │ │
        │  │                                                                                            │ │
        │  │  - Model Training Pipeline:                                                                 │ │
        │  │    * Input: Historical submissions + verification outcomes                                 │ │
        │  │    * Training: Monthly retraining on new data                                              │ │
        │  │    * Evaluation: Cross-validation, precision/recall metrics                                │ │
        │  │    * Deployment: Model versioning in MinIO, Blue-Green deployment                          │ │
        │  │                                                                                            │ │
        │  │  - MLOps & Monitoring:                                                                      │ │
        │  │    * Model performance tracking (accuracy degradation alerts)                               │ │
        │  │    * Feature store for ML models (Feast or Tecton)                                         │ │
        │  │    * Model explainability (SHAP values for interpretable predictions)                      │ │
        │  │                                                                                            │ │
        │  └────────────────────────────────────────────────────────────────────────────────────────────┘ │
        │                                                                                                  │
        │  KUBERNETES CLUSTER (OpenShift 4.x)                                                             │ │
        │  - Master Nodes: 3 nodes (etcd, API server, scheduler, controller-manager)                    │ │
        │  - Worker Nodes: 5-10+ nodes (for microservice pods)                                           │ │
        │  - Node Affinity: Ensure critical services run on dedicated nodes                              │ │
        │  - Resource Limits: CPU, memory quotas per namespace                                          │ │
        │  - Auto-scaling: Horizontal Pod Autoscaler based on metrics                                    │ │
        │  - Persistent Storage: OpenShift Persistent Volumes (PV) backed by SAN                         │ │
        │  - Monitoring: Prometheus + Grafana (pre-installed with OpenShift)                             │ │
        │  - Logging: ELK Stack (Elasticsearch, Logstash, Kibana) or Splunk                              │ │
        │  - Secrets Management: HashiCorp Vault or Kubernetes Secrets                                  │ │
        │                                                                                                  │
        └──────────────────────────────────────────────────────────────────────────────────────────────────┘
                                              ↓
        ┌─────────────────────────────────────────────────────────────────────────────────────────┐
        │                    BLOCKCHAIN INTEGRATION LAYER (Downstream)                            │
        │                                                                                         │
        │  Blockchain: Ethereum Mainnet (for production, immutable CCC records)                  │
        │  Alternatively: Hyperledger Fabric (if private blockchain preferred)                   │
        │                                                                                         │
        │  Smart Contract (Ethereum):                                                             │ │
        │  - Language: Solidity                                                                   │ │
        │  - Function: Register CCC tokens with entity, quantity, verification trail              │ │
        │  - Immutability: Cannot be modified or deleted                                          │ │
        │  - Transparency: Publicly verifiable on blockchain explorer                             │ │
        │                                                                                         │ │
        │  Integration Method:                                                                    │ │
        │  - DMRV → REST API → Blockchain Service → Web3.js → Ethereum Node                      │ │
        │  - Transaction: Send CCC registration data + digital signature                          │ │
        │  - Confirmation: Wait for Tx hash + block inclusion (finality in 12 blocks)            │ │
        │  - Result: Immutable record on public ledger, tradeable in ICM                          │ │
        │                                                                                         │ │
        │  Ethereum Node (On-Prem or Infura):                                                    │ │
        │  - Option 1: Infura API (managed, reliable, no maintenance)                             │ │
        │  - Option 2: Internal Ethereum node (full control, higher maintenance)                  │ │
        │  - Redundancy: Multiple RPC endpoints for failover                                      │ │
        │                                                                                         │ │
        └─────────────────────────────────────────────────────────────────────────────────────────┘
                                              ↓
        ┌─────────────────────────────────────────────────────────────────────────────────────────┐
        │                      DATA GOVERNANCE & COMPLIANCE LAYER                                 │
        │                                                                                         │
        │  Audit Logging: Complete record of all actions, who did it, when, what changed        │
        │  - Stored in: audit_logs_db (PostgreSQL) + Elasticsearch for searchability             │
        │  - Retention: 7 years (per government data retention policy)                            │ │
        │  - Integrity: Digital signatures on audit records (prevent tampering)                   │ │
        │                                                                                         │ │
        │  Data Residency: All data stored within India (on-prem, no cloud)                      │ │
        │  - No data replication to foreign servers                                               │ │
        │  - Encryption keys stored in HSM (Hardware Security Module) on-prem                     │ │
        │                                                                                         │ │
        │  Compliance: GDPR, ISO 27001, Government Data Protection                                │ │
        │  - Encryption at rest (AES-256) and in transit (TLS 1.3)                                │ │
        │  - Access control: Role-based (RBAC)                                                    │ │
        │  - Authentication: Multi-factor authentication for admin users                          │ │
        │                                                                                         │ │
        └─────────────────────────────────────────────────────────────────────────────────────────┘
                                              ↓
        ┌─────────────────────────────────────────────────────────────────────────────────────────┐
        │                         DISASTER RECOVERY & BACKUP                                      │
        │                                                                                         │
        │  RTO (Recovery Time Objective): < 4 hours                                               │ │
        │  RPO (Recovery Point Objective): < 1 hour                                               │ │
        │                                                                                         │ │
        │  Strategy:                                                                              │ │
        │  1. Primary Datacenter: On-prem government data center                                  │ │
        │  2. Backup Datacenter: Secondary on-prem facility (or Tier-2 cloud)                    │ │
        │  3. Replication:                                                                        │ │
        │     - Database: Streaming replication to secondary                                      │ │
        │     - Storage: MinIO cross-region replication                                           │ │
        │     - Kafka: Mirror Maker for event log replication                                     │ │
        │  4. Failover: Automated via health checks                                               │ │
        │  5. Testing: Monthly disaster recovery drills                                           │ │
        │                                                                                         │ │
        │  Backup Media:                                                                          │ │
        │  - Daily backups to on-prem tape library                                                │ │
        │  - Weekly backups archived off-site                                                     │ │
        │  - Monthly backups retained for 7 years                                                 │ │
        │                                                                                         │ │
        └─────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Technology Stack Decision Rationale

### 1. Container Orchestration: OpenShift Container Platform (Red Hat)

**Selection**: OpenShift 4.x (Red Hat's Kubernetes distribution)

**Rationale for Government**:
- ✓ Red Hat Enterprise Linux (RHEL) is government-approved in India
- ✓ Certified for classified workloads (meets C2 security requirements)
- ✓ 24/7 support from Red Hat with SLA
- ✓ Built-in security features (pod security policies, network policies)
- ✓ No vendor lock-in (still Kubernetes underneath)
- ✓ Can be deployed fully on-premises

**Licensing**: 
- OpenShift Container Platform: ~₹5,000-8,000 per node per year
- Total for 8 nodes: ~₹40,000-64,000 annually

**Alternatives Considered**:
- ❌ AWS ECS: Cloud-based, not on-prem
- ❌ Docker Swarm: Not suitable for enterprise workloads
- ✓ Vanilla Kubernetes: Possible but lacks enterprise support & security features

---

### 2. API Gateway (APIM): Kong

**Selection**: Kong Community or Kong Enterprise

**Rationale for Government**:
- ✓ Open-source, no vendor lock-in
- ✓ Lightweight, runs in containers (no separate infrastructure)
- ✓ API versioning, rate limiting, authentication (OAuth 2.0, JWT)
- ✓ Plugin architecture for custom business logic
- ✓ API analytics and monitoring built-in
- ✓ Government-approved in India (used by multiple agencies)

**Alternative Selections**:
- **Option 1 (Recommended)**: Kong (open-source) - Free + operational cost
- **Option 2**: Red Hat 3Scale (if already in Red Hat ecosystem) - ₹2-3 lakhs/year
- **Option 3**: MuleSoft (enterprise, but expensive) - ₹10+ lakhs/year

**Kong Configuration**:
- Admin API: Internal (port 8001)
- Proxy: External (port 8000 for HTTP, 8443 for HTTPS)
- Database: PostgreSQL (Kong metadata)
- Plugins: Authentication, Rate Limiting, Logging, Request Transformation

---

### 3. On-Prem Static Content & Caching: MinIO + Varnish

**Selection**: MinIO (S3-compatible) + Varnish Cache

**Rationale**:
- ✓ MinIO: Provides Azure Blob Storage / AWS S3 equivalent on-prem
- ✓ Varnish: Acts as CDN equivalent, caches content locally
- ✓ Both open-source, no licensing cost
- ✓ MinIO runs in containers (OpenShift native)
- ✓ Varnish is lightweight, can run on modest hardware

**Architecture**:
```
Frontend Pod → Varnish Cache (Layer 1) → MinIO (Layer 2) → Storage Backend
```

**Content Stored**:
- Next.js build artifacts (HTML, JS bundles)
- Images (JPEG, PNG, WebP)
- PDFs (reports, certificates)
- CSV exports

**Performance Targets**:
- Varnish hit rate: 90%+ (cached responses under 10ms)
- MinIO average latency: 50-100ms
- Browser cache: 30 days for immutable assets

---

### 4. Load Balancer: F5 BIG-IP or Citrix NetScaler

**Selection**: F5 BIG-IP (LTM - Local Traffic Manager)

**Rationale for Government**:
- ✓ Industry standard for government deployments
- ✓ Hardware-based, not software (more secure, no OS vulnerabilities)
- ✓ Certified for classified networks (if needed)
- ✓ Advanced SSL/TLS termination
- ✓ Session persistence for stateful applications
- ✓ Health checks and automatic failover
- ✓ DDoS protection modules available

**HA Configuration**:
- Active-Passive mode (2 units)
- Automatic failover (sub-second)
- Shared virtual IP (VIP)

**Alternative**:
- Citrix NetScaler (similar capabilities, slightly lower cost)
- Nginx Open Source (software load balancer, if hardware not available)

---

### 5. Web Application Firewall (WAF)

**Selection**: ModSecurity (open-source) or F5 WAF Module

**Rationale**:
- ✓ ModSecurity: Free, OWASP CRS (Core Rule Set) maintained by community
- ✓ Protects against OWASP Top 10 vulnerabilities
- ✓ Can be deployed inline (in front of Kong) or as Nginx module

**Protection Rules**:
- SQL Injection prevention
- XSS (Cross-Site Scripting) blocking
- CSRF (Cross-Site Request Forgery) protection
- DDoS rate limiting
- Bot detection

**Alternative**:
- F5 WAF Module (integrated with F5 LB, higher cost but unified management)

---

### 6. Database: PostgreSQL (Transactional) + TimescaleDB (Analytics)

**Selection**: 
- PostgreSQL 15+ for OLTP (Online Transaction Processing)
- TimescaleDB for OLAP (Online Analytical Processing)

**Rationale**:
- ✓ PostgreSQL: Most robust open-source RDBMS
- ✓ TimescaleDB: PostgreSQL extension for time-series data
- ✓ Both suitable for government workloads
- ✓ Enterprise support available from many vendors
- ✓ No licensing cost

**Architecture**:
```
PostgreSQL (Primary) → Streaming Replication → PostgreSQL (Standby 1, 2)
                ↓
        ETL Pipeline (Kafka Connect)
                ↓
        TimescaleDB (Analytics Replica)
```

**Backup Strategy**:
- WAL archiving to MinIO (point-in-time recovery)
- Daily full backups
- 30-day retention on-prem, 7-year archival off-site

**Performance Tuning**:
- Connection pooling with pgBouncer
- Table partitioning by date
- Query optimization and index design
- Statistics maintenance

---

### 7. Data Analytics & BI: Apache Superset

**Selection**: Apache Superset

**Rationale for Government**:
- ✓ Open-source, no licensing
- ✓ Web-based (accessible from browsers)
- ✓ Supports PostgreSQL, TimescaleDB
- ✓ Rich visualization options
- ✓ Drill-down capabilities for exploration
- ✓ Scheduled reports (PDF/email)
- ✓ User management and RBAC

**Alternative**:
- Metabase (lighter, simpler, good for basic dashboards)
- Tableau (enterprise, but expensive)
- Looker (Google product, cloud-native)

**Dashboard Examples**:
- Verification KPIs (average time, quality scores)
- Entity sector distribution
- Geographic heatmaps
- Blockchain registration metrics
- System health (API latency, uptime)

---

### 8. Machine Learning: TensorFlow + scikit-learn

**Selection**: Scikit-learn (for tabular data) + TensorFlow (for neural networks)

**Rationale**:
- ✓ Both open-source, widely used in government
- ✓ Python ecosystem (easy for data scientists)
- ✓ Scikit-learn: Perfect for anomaly detection, classification
- ✓ TensorFlow: For NLP models (auto-review comments)

**Models**:
1. **Anomaly Detection**: Isolation Forest (scikit-learn)
   - Detects outliers in submission data
   - Scores suspicious patterns

2. **Review Comment Generation**: Fine-tuned BERT (TensorFlow)
   - Generates suggested ACVA findings
   - Learns from historical feedback

3. **Data Quality Scoring**: Random Forest (scikit-learn)
   - Predicts approval likelihood
   - Identifies likely rejections

**Deployment**:
- FastAPI + Python microservice in OpenShift
- Model versioning in MinIO
- Real-time inference API

---

### 9. Service Bus & Message Queue: Apache Kafka

**Selection**: Apache Kafka (3+ broker cluster)

**Rationale**:
- ✓ Industry standard for event streaming
- ✓ High throughput, low latency
- ✓ Persistent message logs (durability)
- ✓ Consumer groups for parallel processing
- ✓ Exactly-once semantics possible
- ✓ Integrates with microservices

**Key Topics**:
```
submission.created → Verification Service
submission.verified → Notification Service
entity.approved → DMRV Admin Service
blockchain.confirmed → Audit Logging Service
```

**Configuration**:
- Replication factor: 3
- Retention: 30 days
- Partition strategy: By entity_id (ordering)

**Alternative**:
- RabbitMQ (simpler, but less suitable for high-volume streaming)
- Apache Pulsar (newer, better multi-tenancy, but Kafka more mature)

---

### 10. Blockchain Integration

**Selection**: Ethereum Mainnet + Web3.js

**Rationale**:
- ✓ Public blockchain (immutable, transparent)
- ✓ Large ecosystem, well-tested
- ✓ Government already considering it (India Blockchain Mission)
- ✓ Existing ICM may use Ethereum

**Alternative Architectures**:
- **Option 1 (Current)**: Public Ethereum Mainnet
  - Pros: Fully immutable, transparent, public verification
  - Cons: Higher gas costs, slower transactions (12 second blocks)
  - Cost: ~₹500-2,000 per CCC registration (gas)

- **Option 2**: Ethereum Layer 2 (Polygon)
  - Pros: Faster, cheaper (₹50-200 per transaction)
  - Cons: Still dependent on Ethereum for finality
  - Recommended for scaling to millions of CCCs

- **Option 3**: Hyperledger Fabric (private)
  - Pros: Private, consortium-based, no public data
  - Cons: More complex, not truly immutable
  - Not recommended (defeats transparency purpose)

**Smart Contract**:
```solidity
contract DMRVCarbonCredits {
    struct CCC {
        uint256 id;
        address issuer;
        address entity;
        uint256 amount;
        string geValue;
        uint256 timestamp;
        string dataHash; // Pointer to DMRV
    }
    
    mapping(uint256 => CCC) public cccs;
    
    function register(CCC memory newCCC) public onlyBEEOfficer {
        cccs[newCCC.id] = newCCC;
    }
}
```

---

### 11. Caching Strategy (On-Prem)

**Selection**: Redis Cluster (for session/query caching) + Varnish (for HTTP caching)

**Architecture**:
```
Frontend Pod (Next.js)
     ↓
Varnish Cache (HTTP caching, TTL-based)
     ↓
Redis Cluster (Session, API response caching)
     ↓
API Services
```

**Redis Configuration**:
- Cluster mode: 6 nodes (3 primary, 3 replica)
- Eviction policy: LRU (least recently used)
- TTL: 
  - Sessions: 8 hours
  - Dashboard metrics: 5 minutes
  - Entity lists: 1 hour

**Varnish Configuration**:
- HTTP caching for static assets
- Cache-Control headers from Next.js
- TTL: 7 days for JS/CSS, 30 days for images

---

### 12. Logging & Monitoring

**Selection**: 
- Logging: ELK Stack (Elasticsearch, Logstash, Kibana)
- Monitoring: Prometheus + Grafana (pre-installed in OpenShift)

**Rationale**:
- ✓ ELK: Industry standard for log aggregation
- ✓ Prometheus: Kubernetes-native metrics collection
- ✓ Grafana: Rich visualization of metrics
- ✓ All open-source

**Metrics Collected**:
- API response times
- Service error rates
- Database query performance
- Kafka lag
- Memory/CPU usage per pod
- Blockchain transaction status

**Alerts**:
- High error rate (> 1%)
- P99 latency > 1 second
- Pod restart loops
- Disk space < 10%
- Database replication lag > 1 minute

---

## Infrastructure Sizing & Capacity

### Hardware Requirements

**Physical Servers** (for OpenShift cluster):
- Master Nodes: 3× (16 CPU, 64 GB RAM, 500 GB SSD)
- Worker Nodes: 5-8× (24 CPU, 128 GB RAM, 1 TB SSD)
- Load Balancer: 2× F5 BIG-IP (HA pair)
- Storage: SAN with 50 TB usable capacity

**Network Infrastructure**:
- 10 Gbps network fabric (minimum)
- Firewall: Palo Alto Networks or Fortinet (government-approved)
- VPN: For secure remote access by verifiers
- DNS: Redundant DNS servers (BIND)

### Network Architecture

```
Internet / ICM
    ↓
[F5 Load Balancer - HA Pair]
    ↓
[Firewall + WAF]
    ↓
[Kong API Gateway]
    ↓
[OpenShift Ingress Controller]
    ↓
[Microservice Pods]
    ↓
[PostgreSQL + Redis + Kafka]
```

### Capacity Planning (3-Year Horizon)

| Year 1 | Year 2 | Year 3 |
|--------|--------|--------|
| 10,000 submissions/month | 25,000 submissions/month | 50,000 submissions/month |
| 100 CCCs/month issued | 500 CCCs/month issued | 2,000 CCCs/month issued |
| 50 entities in system | 200 entities | 500 entities |
| 20 concurrent users | 100 concurrent users | 300 concurrent users |

---

## Cost Estimation (Annual)

| Component | Year 1 | Year 2 | Year 3 |
|-----------|---------|---------|---------|
| Hardware (amortized) | ₹50L | ₹50L | ₹50L |
| Red Hat OpenShift | ₹8L | ₹8L | ₹8L |
| Software licenses | ₹5L | ₹5L | ₹5L |
| Network/Internet | ₹15L | ₹15L | ₹15L |
| Storage (SAN) | ₹20L | ₹20L | ₹20L |
| Staffing (6 people) | ₹60L | ₹60L | ₹60L |
| Training | ₹10L | ₹5L | ₹5L |
| Maintenance | ₹8L | ₹8L | ₹8L |
| **Total Year** | **₹176L** | **₹171L** | **₹171L** |

**Cost per CCC**: ~₹150-200 (including infrastructure, software, staff)

---

## Security Architecture

### Encryption
- **At Rest**: AES-256 (PostgreSQL pgcrypto, filesystem encryption)
- **In Transit**: TLS 1.3 (all APIs, database connections)
- **Key Management**: HSM (Hardware Security Module) on-prem

### Authentication & Authorization
- **Users**: LDAP/AD integration with government SSO
- **Services**: mTLS (mutual TLS between microservices)
- **API Keys**: JWT tokens with role-based claims
- **MFA**: For admin users (TOTP)

### Network Security
- **Firewall**: Stateful inspection
- **WAF**: ModSecurity with OWASP CRS
- **DDoS**: Rate limiting at API Gateway
- **VPN**: For secure remote access by verifiers

### Audit & Compliance
- **Logging**: All actions logged to audit database
- **Retention**: 7 years for government compliance
- **Integrity**: Digital signatures on sensitive records
- **Compliance**: ISO 27001, C2 security standards

---

## Deployment Roadmap

### Phase 1 (Months 1-3): Infrastructure Setup
- Procure hardware
- Deploy OpenShift cluster
- Setup PostgreSQL, Redis, Kafka
- Configure F5 load balancers

### Phase 2 (Months 4-6): Platform Development
- Deploy microservices
- Integrate with ICM
- Setup blockchain integration
- Implement DMRV Admin workflows

### Phase 3 (Months 7-9): Testing & Validation
- UAT with verifiers
- Load testing
- Security audit
- Disaster recovery drills

### Phase 4 (Months 10-12): Go-Live
- Migrate pilot entities from ICM
- Train administrators and verifiers
- Production launch
- Continuous monitoring

---

## Conclusion

This target architecture provides a production-grade, government-approved, on-premises deployment of the DMRV Digital Trust Layer with:

✓ **No cloud vendor lock-in** (fully on-prem)
✓ **Government-approved technologies** (Red Hat, open-source)
✓ **High availability & disaster recovery** (99.9% SLA possible)
✓ **End-to-end security** (encryption, access control, audit trail)
✓ **Scalability** (Kubernetes auto-scaling)
✓ **Cost-effective** (mix of open-source + commercial where needed)
✓ **Blockchain integration** (immutable CCC records)
✓ **Complete audit trail** (compliance-ready)

The system is ready for deployment in any government data center meeting minimum infrastructure requirements.

---

End of Target Architecture Document
