'use client'

import React from 'react'
import { useRole } from '@/lib/role-context'
import { TrendingUp, AlertCircle, CheckCircle, Clock, FileText, Lock, Zap, BarChart3 } from 'lucide-react'

interface MetricCardProps {
  label: string
  value: string | number
  description?: string
  icon?: React.ReactNode
  trend?: 'up' | 'down' | 'stable'
}

function MetricCard({ label, value, description, icon, trend }: MetricCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold text-foreground">{typeof value === 'number' ? value.toLocaleString() : value}</p>
          {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        </div>
        {icon && <div className="text-muted-foreground ml-4">{icon}</div>}
      </div>
    </div>
  )
}

// Obligated Entity Dashboard (Submitter) - SUBMISSION FOCUSED
function ObligedEntityDashboard() {
  return (
    <div className="space-y-8 p-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">GEI Submission & Verification Status</h2>
        <p className="text-muted-foreground">Eastern Cement Works | 2024-Q1 Submission | Obligated Entity Portal</p>
      </div>

      {/* Latest Submission Status */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Last Submission: 2024-Q1 (Jan-Mar)</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label="Submission Status"
            value="VERIFIED"
            description="ACVA verified on 2024-03-28"
            icon={<CheckCircle className="text-emerald-600" size={24} />}
          />
          <MetricCard
            label="Data Quality Score"
            value="94%"
            description="Confidence: HIGH"
            icon={<BarChart3 className="text-blue-600" size={24} />}
          />
          <MetricCard
            label="GEI Calculated"
            value="1,361.84"
            description="kg CO2e/tonne"
            icon={<Zap className="text-emerald-600" size={24} />}
          />
          <MetricCard
            label="Outstanding Queries"
            value="0"
            description="All CARs resolved"
            icon={<CheckCircle className="text-emerald-600" size={24} />}
          />
        </div>
      </div>

      {/* Validation Pipeline Progress */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">dMRV Validation Pipeline (6-Step)</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            label="1. Schema Validation"
            value="✓ PASS"
            description="Format & Structure OK"
            icon={<CheckCircle className="text-emerald-600" size={20} />}
          />
          <MetricCard
            label="2. Completeness"
            value="✓ PASS"
            description="Fuel, output, evidence"
            icon={<CheckCircle className="text-emerald-600" size={20} />}
          />
          <MetricCard
            label="3. Range & Outliers"
            value="⚠ WARN"
            description="Consumption spike +18%"
            icon={<AlertCircle className="text-amber-600" size={20} />}
          />
          <MetricCard
            label="4. Duplicates"
            value="✓ PASS"
            description="No double-counting"
            icon={<CheckCircle className="text-emerald-600" size={20} />}
          />
          <MetricCard
            label="5. Evidence Credibility"
            value="✓ PASS"
            description="Certs valid until 2024-06"
            icon={<CheckCircle className="text-emerald-600" size={20} />}
          />
          <MetricCard
            label="6. Confidence Score"
            value="94%"
            description="Data credibility HIGH"
            icon={<CheckCircle className="text-emerald-600" size={20} />}
          />
        </div>
      </div>

      {/* ML Anomalies & Rule Deviations */}
      <div className="rounded-lg border border-amber-200 bg-amber-50/5 p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">ML Anomalies & Rule-Based Deviations Detected</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3 p-3 bg-muted rounded">
            <AlertCircle className="text-amber-600 flex-shrink-0 mt-0.5" size={18} />
            <div>
              <p className="font-medium">ML Alert: Consumption Spike</p>
              <p className="text-xs text-muted-foreground">Jan 15-20: Coal consumption +18% vs baseline. ACVA CAR issued & resolved.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-muted rounded">
            <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
            <div>
              <p className="font-medium">Rule-Based: Calibration Renewal</p>
              <p className="text-xs text-muted-foreground">Meter calibration certificate expires 2024-06-30. Renewal recommended before Q2 submission.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded">
            <CheckCircle className="text-emerald-600 flex-shrink-0 mt-0.5" size={18} />
            <div>
              <p className="font-medium">GEI vs Baseline Comparison</p>
              <p className="text-xs text-muted-foreground">Your GEI (1,361.84) is 10.4% below baseline (1,520). Over-performer status confirmed.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Verifier Feedback & Comments */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Verifier Feedback (ACVA - TUV-SUD India)</h3>
        <div className="rounded-lg border border-border bg-card p-6 space-y-4">
          <div className="border-l-4 border-amber-600 pl-4 py-2">
            <p className="text-sm font-medium text-foreground">CAR-001: Coal Consumption Variance (Status: RESOLVED)</p>
            <p className="text-xs text-muted-foreground mt-1">Raised: 2024-03-10 | Your Response: 2024-03-18 | Closed: 2024-03-25</p>
            <p className="text-xs mt-2 text-muted-foreground italic">"Verifier: Explanation accepted. Kiln maintenance logs & extended run schedule confirmed via meter data. No credibility issue."</p>
          </div>
          <div className="border-l-4 border-emerald-600 pl-4 py-2">
            <p className="text-sm font-medium text-foreground">Query: Renewable Energy Offset Documentation (Status: RESOLVED)</p>
            <p className="text-xs text-muted-foreground mt-1">Raised: 2024-03-15 | Your Response: 2024-03-19 | Closed: 2024-03-25</p>
            <p className="text-xs mt-2 text-muted-foreground italic">"Verifier: Wind farm off-take agreement verified. All renewable generation properly documented."</p>
          </div>
        </div>
      </div>

      {/* CCC Issuance Projection */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Carbon Credit Certificate (CCC) Projection</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            label="Performance"
            value="Over-Performer"
            description="GEI below baseline"
            icon={<TrendingUp className="text-emerald-600" size={24} />}
          />
          <MetricCard
            label="CCC Surplus"
            value="19,288"
            description="Credits to be earned"
            icon={<Zap className="text-emerald-600" size={24} />}
          />
          <MetricCard
            label="Expected Issuance"
            value="Jun 2024"
            description="After BEE approval"
            icon={<Clock className="text-blue-600" size={24} />}
          />
        </div>
      </div>

      {/* Timeline & Upcoming Deadlines */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Submission Timeline & Deadlines</h3>
        <div className="space-y-4 text-sm">
          <div className="flex items-center gap-4">
            <div className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-3 py-1 rounded">COMPLETED</div>
            <div>
              <p className="font-medium">2024-Q1 Submission</p>
              <p className="text-xs text-muted-foreground">Uploaded: 2024-02-15 | Verified: 2024-03-28</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded">UPCOMING</div>
            <div>
              <p className="font-medium">2024-Q2 Submission</p>
              <p className="text-xs text-muted-foreground">Deadline: 2024-08-15 | Expected verification: 2024-09-30</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs font-semibold bg-amber-100 text-amber-700 px-3 py-1 rounded">ACTION NEEDED</div>
            <div>
              <p className="font-medium">Calibration Certificate Renewal</p>
              <p className="text-xs text-muted-foreground">Current certificate expires: 2024-06-30 | Renew before Q2 submission</p>
            </div>
          </div>
        </div>
      </div>

      {/* Historical Metrics & Trends */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Historical Performance (2023-2024)</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            label="Avg Data Quality"
            value="91%"
            description="3-quarter average"
            icon={<BarChart3 className="text-blue-600" size={24} />}
          />
          <MetricCard
            label="Avg GEI"
            value="1,389"
            description="kg CO2e/tonne (Q4 2023-Q1 2024)"
            icon={<Zap className="text-blue-600" size={24} />}
          />
          <MetricCard
            label="Total CCCs Earned"
            value="52,144"
            description="2023-2024 YTD"
            icon={<CheckCircle className="text-emerald-600" size={24} />}
          />
        </div>
      </div>
    </div>
  )
}

// ACVA Verifier Dashboard
function ACVAVerifierDashboard() {
  return (
    <div className="space-y-8 p-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">dMRV Verification & Validation Workspace</h2>
        <p className="text-muted-foreground">ACVA Agency | Data Quality & Verification Engine</p>
      </div>

      {/* Verification Queue */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Verification Queue (Risk-Ranked)</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label="CRITICAL Issues"
            value="2"
            description="Block verification"
            icon={<AlertCircle className="text-red-600" size={24} />}
          />
          <MetricCard
            label="MAJOR CARs"
            value="5"
            description="CAR Open (8/14 days)"
            icon={<AlertCircle className="text-amber-600" size={24} />}
          />
          <MetricCard
            label="MINOR Issues"
            value="3"
            description="Noted & documented"
            icon={<AlertCircle className="text-yellow-600" size={24} />}
          />
          <MetricCard
            label="Verified & Passed"
            value="18"
            description="Ready for check-verification"
            icon={<CheckCircle className="text-emerald-600" size={24} />}
          />
        </div>
      </div>

      {/* Data Quality Analysis */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">6-Step Validation Pipeline Status</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            label="1. Schema Validation"
            value="PASS"
            description="Format & Completeness"
            icon={<CheckCircle className="text-emerald-600" size={24} />}
          />
          <MetricCard
            label="2. Completeness Check"
            value="PASS"
            description="Fuel, Output, Evidence"
            icon={<CheckCircle className="text-emerald-600" size={24} />}
          />
          <MetricCard
            label="3. Range & Outliers"
            value="WARN"
            description="Spike detected (>15%)"
            icon={<AlertCircle className="text-amber-600" size={24} />}
          />
          <MetricCard
            label="4. Duplicates & Units"
            value="PASS"
            description="No double-counting"
            icon={<CheckCircle className="text-emerald-600" size={24} />}
          />
          <MetricCard
            label="5. Evidence Credibility"
            value="PASS"
            description="Calibration valid"
            icon={<CheckCircle className="text-emerald-600" size={24} />}
          />
          <MetricCard
            label="6. Confidence Score"
            value="92%"
            description="High credibility"
            icon={<CheckCircle className="text-emerald-600" size={24} />}
          />
        </div>
      </div>

      {/* Anomaly Detection Summary */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">ML Anomaly Detection</h3>
        <div className="space-y-2 text-sm">
          <p className="text-muted-foreground">Consumption Spike (Jan 15-20): +18% vs historical trend → MAJOR CAR issued</p>
          <p className="text-muted-foreground">Calibration Certificate: Valid until 2024-06-30 → FLAG for renewal</p>
          <p className="text-muted-foreground">GEI vs Baseline: -10.4% below baseline → Over-performer status confirmed</p>
        </div>
      </div>
    </div>
  )
}

// Check-Verifier Dashboard
function CheckVerifierDashboard() {
  return (
    <div className="space-y-8 p-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Check-Verification & EU AVR Compliance</h2>
        <p className="text-muted-foreground">Independent Verification | ACVA Outcome Confirmation</p>
      </div>

      {/* Check-Verification Queue */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Pending Check-Verifications (7-day SLA)</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label="ACVA Reports Pending"
            value="12"
            description="Awaiting review"
            icon={<Clock className="text-amber-600" size={24} />}
          />
          <MetricCard
            label="Compliance Review"
            value="8"
            description="ICAP Principles verified"
            icon={<CheckCircle className="text-blue-600" size={24} />}
          />
          <MetricCard
            label="APPROVED"
            value="34"
            description="Released to BEE"
            icon={<CheckCircle className="text-emerald-600" size={24} />}
          />
          <MetricCard
            label="REJECTED"
            value="1"
            description="Returned to ACVA"
            icon={<AlertCircle className="text-red-600" size={24} />}
          />
        </div>
      </div>

      {/* EU Compliance Checklist */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">EU MRV Standards (ICAP) Compliance</h3>
        <div className="rounded-lg border border-border bg-card p-6 space-y-3 text-sm">
          <div className="flex items-center justify-between p-3 bg-emerald-50 rounded">
            <span>Completeness (ICAP): All data fields present</span>
            <CheckCircle size={16} className="text-emerald-600" />
          </div>
          <div className="flex items-center justify-between p-3 bg-emerald-50 rounded">
            <span>Consistency (ICAP): Data alignment verified</span>
            <CheckCircle size={16} className="text-emerald-600" />
          </div>
          <div className="flex items-center justify-between p-3 bg-emerald-50 rounded">
            <span>Accuracy (ICAP): Within ±5% materiality threshold</span>
            <CheckCircle size={16} className="text-emerald-600" />
          </div>
          <div className="flex items-center justify-between p-3 bg-amber-50 rounded">
            <span>Integrity (ICAP): Verifier independence confirmed (no conflicts)</span>
            <AlertCircle size={16} className="text-amber-600" />
          </div>
        </div>
      </div>
    </div>
  )
}

// BEE Officer Dashboard
function BEEOfficerDashboard() {
  return (
    <div className="space-y-8 p-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">BEE Regulatory Oversight & CCC Issuance</h2>
        <p className="text-muted-foreground">Bureau of Energy Efficiency | CCTS Administrator & Approval Gate</p>
      </div>

      {/* Approval Pipeline */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">CCC Issuance Pipeline</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label="Verified & Ready"
            value="28"
            description="At approval gate"
            icon={<FileText className="text-blue-600" size={24} />}
          />
          <MetricCard
            label="CCCs to Issue"
            value="2.5M"
            description="From verified over-performers"
            icon={<Zap className="text-emerald-600" size={24} />}
          />
          <MetricCard
            label="CCCs Already Issued"
            value="18.7M"
            description="YTD 2024"
            icon={<CheckCircle className="text-emerald-600" size={24} />}
          />
          <MetricCard
            label="CCC Deficit Required"
            value="3.2M"
            description="By under-performers"
            icon={<AlertCircle className="text-amber-600" size={24} />}
          />
        </div>
      </div>

      {/* Sector Analytics */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Sector Performance (GEI vs Baseline)</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            label="Cement Sector"
            value="98%"
            description="Over-performer (48 entities)"
            icon={<CheckCircle className="text-emerald-600" size={24} />}
          />
          <MetricCard
            label="Steel Sector"
            value="45%"
            description="Mixed performance"
            icon={<AlertCircle className="text-amber-600" size={24} />}
          />
          <MetricCard
            label="Power Sector"
            value="62%"
            description="Over-performer (coal constrained)"
            icon={<CheckCircle className="text-emerald-600" size={24} />}
          />
        </div>
      </div>

      {/* Blockchain Registry Status */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Blockchain Registration Status (ICM)</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between p-3 bg-muted rounded">
            <span>CCCs Written to Immutable Ledger</span>
            <span className="font-semibold">18.7M (hash-verified)</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted rounded">
            <span>Available for CERC Trading</span>
            <span className="font-semibold">15.2M (banked)</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted rounded">
            <span>Compliance Transactions</span>
            <span className="font-semibold">8,432 (Jan-Sep 2024)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ICM Registry Dashboard
function ICMRegistryDashboard() {
  return (
    <div className="space-y-8 p-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Indian Carbon Market Registry</h2>
        <p className="text-muted-foreground">ICM Operator | Blockchain Ledger & Trading Operations</p>
      </div>

      {/* Registry Metrics */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">CCC Trading & Market Activity</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label="Total CCCs Issued"
            value="18.7M"
            description="All verified & registered"
            icon={<Lock className="text-blue-600" size={24} />}
          />
          <MetricCard
            label="Active Market CCCs"
            value="12.3M"
            description="Available for trading"
            icon={<Zap className="text-emerald-600" size={24} />}
          />
          <MetricCard
            label="Q3 Trading Volume"
            value="3.8M"
            description="Compliance & banking"
            icon={<TrendingUp className="text-blue-600" size={24} />}
          />
          <MetricCard
            label="Avg Price"
            value="₹285"
            description="Per CCC (CERC)"
            icon={<BarChart3 className="text-amber-600" size={24} />}
          />
        </div>
      </div>

      {/* Blockchain Verification */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Blockchain Ledger Integrity</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            label="Hash Verification"
            value="100%"
            description="Immutable & auditable"
            icon={<CheckCircle className="text-emerald-600" size={24} />}
          />
          <MetricCard
            label="Reconciliation Status"
            value="VERIFIED"
            description="Match source data"
            icon={<CheckCircle className="text-emerald-600" size={24} />}
          />
          <MetricCard
            label="Regulatory Audit"
            value="COMPLIANT"
            description="Trail preserved"
            icon={<CheckCircle className="text-emerald-600" size={24} />}
          />
        </div>
      </div>

      {/* Market Participants */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Market Participants & Activity</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between p-3 bg-muted rounded">
            <span>Active Obligated Entities</span>
            <span className="font-semibold">187</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted rounded">
            <span>Registered Traders (CERC)</span>
            <span className="font-semibold">42</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted rounded">
            <span>Banking Transactions (Carryover)</span>
            <span className="font-semibold">2.8M CCCs held</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function RoleSpecificDashboard() {
  const { currentRole } = useRole()

  switch (currentRole) {
    case 'obligated-entity':
      return <ObligedEntityDashboard />
    case 'acva-verifier':
      return <ACVAVerifierDashboard />
    case 'check-verifier':
      return <CheckVerifierDashboard />
    case 'bee-officer':
      return <BEEOfficerDashboard />
    case 'icm-registry':
      return <ICMRegistryDashboard />
    default:
      return null
  }
}
