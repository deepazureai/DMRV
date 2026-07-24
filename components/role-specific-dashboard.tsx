'use client'

import React from 'react'
import { useRole } from '@/lib/role-context'
import Link from 'next/link'
import { TrendingUp, AlertCircle, CheckCircle, Clock, FileText, Lock, Zap, BarChart3, MessageSquare } from 'lucide-react'

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
          <Link href="/review-comments" className="rounded-lg border border-border bg-card p-6 shadow-sm hover:shadow-md hover:border-primary transition-all cursor-pointer">
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <p className="text-sm font-medium text-muted-foreground">Review Comments Pending</p>
                <p className="text-2xl font-bold text-foreground">0</p>
                <p className="text-xs text-muted-foreground mt-1">No action items</p>
              </div>
              <div className="text-muted-foreground ml-4">
                <MessageSquare size={24} />
              </div>
            </div>
          </Link>
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

// ACVA Verifier Dashboard - VERIFICATION QUEUE FOCUSED
function ACVAVerifierDashboard() {
  return (
    <div className="space-y-8 p-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Verification Workspace & Queue</h2>
        <p className="text-muted-foreground">TUV-SUD India (ACVA) | Accredited Carbon Verification Agency | dMRV Validation & Verification</p>
      </div>

      {/* Priority Queue Status */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Verification Queue Status (Risk-Ranked)</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label="CRITICAL - Blocked"
            value="2"
            description="Immediate action required"
            icon={<AlertCircle className="text-red-600" size={24} />}
          />
          <MetricCard
            label="MAJOR - In Review"
            value="5"
            description="CAR deadline: 7 days"
            icon={<Clock className="text-amber-600" size={24} />}
          />
          <MetricCard
            label="MINOR - Noted"
            value="3"
            description="Documented issues"
            icon={<AlertCircle className="text-yellow-600" size={24} />}
          />
          <MetricCard
            label="Verified - Ready"
            value="18"
            description="Awaiting check-verification"
            icon={<CheckCircle className="text-emerald-600" size={24} />}
          />
        </div>
      </div>

      {/* Specific Submissions in Queue */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Current Submissions in Verification</h3>
        <div className="space-y-3">
          <div className="rounded-lg border border-red-200 bg-red-50/5 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-foreground">Eastern Cement Works | 2024-Q1</p>
                <p className="text-xs text-muted-foreground mt-1">Status: CRITICAL ANOMALY</p>
                <p className="text-xs text-muted-foreground mt-2">Issue: GEI confidence score 76% (threshold: 85%) due to missing calibration cert expiry date</p>
              </div>
              <span className="text-xs font-semibold bg-red-100 text-red-700 px-3 py-1 rounded">BLOCKING</span>
            </div>
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50/5 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-foreground">Green Steel Manufacturing | 2024-Q1</p>
                <p className="text-xs text-muted-foreground mt-1">Status: MAJOR CAR - Consumption Spike</p>
                <p className="text-xs text-muted-foreground mt-2">Issue: Coal consumption +22% (Jan 15-20) vs baseline. Entity response due 2024-04-10 (3 days remaining)</p>
              </div>
              <span className="text-xs font-semibold bg-amber-100 text-amber-700 px-3 py-1 rounded">3 DAYS LEFT</span>
            </div>
          </div>

          <div className="rounded-lg border border-emerald-200 bg-emerald-50/5 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-foreground">Sustainable Energy Solutions | 2024-Q1</p>
                <p className="text-xs text-muted-foreground mt-1">Status: VERIFIED - Ready for Check-Verification</p>
                <p className="text-xs text-muted-foreground mt-2">GEI: 1.567 kg CO2e/MWh | Data Quality: 96% | No outstanding queries</p>
              </div>
              <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-3 py-1 rounded">READY</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6-Step Pipeline for Current Submission */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Validation Pipeline - Green Steel 2024-Q1</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            label="1. Schema"
            value="✓ PASS"
            description="Format OK"
            icon={<CheckCircle className="text-emerald-600" size={20} />}
          />
          <MetricCard
            label="2. Completeness"
            value="✓ PASS"
            description="All fields"
            icon={<CheckCircle className="text-emerald-600" size={20} />}
          />
          <MetricCard
            label="3. Range/Outliers"
            value="⚠ FLAG"
            description="+22% spike"
            icon={<AlertCircle className="text-amber-600" size={20} />}
          />
          <MetricCard
            label="4. Duplicates"
            value="✓ PASS"
            description="No issues"
            icon={<CheckCircle className="text-emerald-600" size={20} />}
          />
          <MetricCard
            label="5. Evidence"
            value="✓ PASS"
            description="Certs valid"
            icon={<CheckCircle className="text-emerald-600" size={20} />}
          />
          <MetricCard
            label="6. Confidence"
            value="89%"
            description="MAJOR only"
            icon={<AlertCircle className="text-amber-600" size={20} />}
          />
        </div>
      </div>

      {/* CAR & Query Management */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Active CARs & Queries (SLA Tracking)</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between p-3 bg-muted rounded">
            <span>Green Steel: Coal Spike Explanation</span>
            <span className="text-xs font-semibold bg-amber-100 text-amber-700 px-2 py-1 rounded">3 DAYS</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted rounded">
            <span>Eastern Cement: Calibration Cert Expiry</span>
            <span className="text-xs font-semibold bg-red-100 text-red-700 px-2 py-1 rounded">URGENT</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-emerald-50 rounded">
            <span>Sustainable Energy: Query Resolution</span>
            <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-1 rounded">CLOSED</span>
          </div>
        </div>
      </div>

      {/* Monthly Verification Metrics */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Verification Metrics (Mar 2024)</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label="Submissions Received"
            value="28"
            description="March intake"
            icon={<FileText className="text-blue-600" size={24} />}
          />
          <MetricCard
            label="Verified & Passed"
            value="18"
            description="64% clearance rate"
            icon={<CheckCircle className="text-emerald-600" size={24} />}
          />
          <MetricCard
            label="Avg Verification Time"
            value="12 days"
            description="14-day SLA average"
            icon={<Clock className="text-blue-600" size={24} />}
          />
          <MetricCard
            label="Avg Data Quality"
            value="88%"
            description="Confidence score"
            icon={<BarChart3 className="text-blue-600" size={24} />}
          />
        </div>
      </div>
    </div>
  )
}

// Check-Verifier Dashboard - ACVA REPORT REVIEW FOCUSED
function CheckVerifierDashboard() {
  return (
    <div className="space-y-8 p-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Independent Check-Verification & Audit</h2>
        <p className="text-muted-foreground">Bureau Veritas (Check-Verifier) | ACVA Report Review | EU AVR Compliance (ICAP Standards)</p>
      </div>

      {/* Review Queue Status */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">ACVA Report Review Queue (7-day SLA)</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label="Pending Review"
            value="12"
            description="ACVA reports waiting"
            icon={<Clock className="text-amber-600" size={24} />}
          />
          <MetricCard
            label="Under Review"
            value="5"
            description="In progress (avg 3 days)"
            icon={<FileText className="text-blue-600" size={24} />}
          />
          <MetricCard
            label="APPROVED"
            value="34"
            description="Released to BEE officer"
            icon={<CheckCircle className="text-emerald-600" size={24} />}
          />
          <MetricCard
            label="REJECTED/REFERRED"
            value="2"
            description="Returned to ACVA"
            icon={<AlertCircle className="text-red-600" size={24} />}
          />
        </div>
      </div>

      {/* Specific ACVA Reports Under Review */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">ACVA Verification Reports - Current Review</h3>
        <div className="space-y-3">
          <div className="rounded-lg border border-amber-200 bg-amber-50/5 p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-semibold text-foreground">Green Steel Manufacturing | 2024-Q1</p>
                <p className="text-xs text-muted-foreground mt-1">ACVA Verifier: TUV-SUD India | Submitted: 2024-03-28</p>
              </div>
              <span className="text-xs font-semibold bg-amber-100 text-amber-700 px-3 py-1 rounded">IN REVIEW</span>
            </div>
            <div className="text-xs space-y-1 mt-3 pl-3 border-l-2 border-amber-400">
              <p>ACVA Finding: Confidence score 89%. Coal spike CAR resolved with entity response.</p>
              <p>Check-Verification Note: Verifying CAR closure documentation & entity response authenticity.</p>
              <p>Expected approval: 2024-04-03 (3 days)</p>
            </div>
          </div>

          <div className="rounded-lg border border-emerald-200 bg-emerald-50/5 p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-semibold text-foreground">Sustainable Energy Solutions | 2024-Q1</p>
                <p className="text-xs text-muted-foreground mt-1">ACVA Verifier: TUV-SUD India | Submitted: 2024-03-25</p>
              </div>
              <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-3 py-1 rounded">APPROVED</span>
            </div>
            <div className="text-xs space-y-1 mt-3 pl-3 border-l-2 border-emerald-400">
              <p>ACVA Finding: GEI 1.567 kg CO2e/MWh | Confidence 96% | No queries outstanding.</p>
              <p>Check-Verification: ICAP compliance verified ✓ | Released to BEE approval gate.</p>
              <p>Approved: 2024-03-29</p>
            </div>
          </div>
        </div>
      </div>

      {/* EU ICAP Compliance Checklist */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">EU MRV Standards (ICAP) Compliance Review</h3>
        <div className="rounded-lg border border-border bg-card p-6 space-y-3 text-sm">
          <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded">
            <CheckCircle size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Completeness (ICAP Principle 1)</p>
              <p className="text-xs text-muted-foreground">All mandatory data fields present. Evidence pack complete.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded">
            <CheckCircle size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Consistency (ICAP Principle 2)</p>
              <p className="text-xs text-muted-foreground">Activity data aligns with production records. No contradictions.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded">
            <CheckCircle size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Accuracy (ICAP Principle 3)</p>
              <p className="text-xs text-muted-foreground">GEI deviation within ±5% materiality threshold. Acceptable.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-amber-50 rounded">
            <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Integrity (ICAP Principle 4)</p>
              <p className="text-xs text-muted-foreground">ACVA auditor independence: Verified no conflicts. However, entity audit history review needed.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Materiality Threshold Verification */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Materiality Threshold Verification (±5%)</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50/5 p-4">
            <p className="text-xs font-semibold text-emerald-600 mb-2">Green Steel - Coal Consumption</p>
            <p className="text-sm">5,520 tonnes ± 5% = 5,244-5,796</p>
            <p className="text-xs text-muted-foreground mt-2">Reported: 5,598 tonnes ✓ Within range</p>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50/5 p-4">
            <p className="text-xs font-semibold text-emerald-600 mb-2">Sustainable Energy - GEI</p>
            <p className="text-sm">1.567 ± 5% = 1.489-1.645 kg CO2e/MWh</p>
            <p className="text-xs text-muted-foreground mt-2">Calculated: 1.567 ✓ Exact match</p>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50/5 p-4">
            <p className="text-xs font-semibold text-amber-600 mb-2">Eastern Cement - Calib Cert</p>
            <p className="text-sm">Expires: 2024-06-30</p>
            <p className="text-xs text-muted-foreground mt-2">⚠ Expiry within 3 months - FLAG for renewal</p>
          </div>
        </div>
      </div>

      {/* Monthly Audit Metrics */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Check-Verification Metrics (Mar 2024)</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label="Reports Reviewed"
            value="28"
            description="ACVA submissions"
            icon={<FileText className="text-blue-600" size={24} />}
          />
          <MetricCard
            label="Approval Rate"
            value="86%"
            description="24 of 28 approved"
            icon={<CheckCircle className="text-emerald-600" size={24} />}
          />
          <MetricCard
            label="Avg Review Time"
            value="4.2 days"
            description="Under 7-day SLA"
            icon={<Clock className="text-blue-600" size={24} />}
          />
          <MetricCard
            label="Materiality Issues"
            value="1"
            description="Flagged for clarity"
            icon={<AlertCircle className="text-amber-600" size={24} />}
          />
        </div>
      </div>
    </div>
  )
}

// BEE Officer Dashboard - APPROVAL & ISSUANCE FOCUSED
function BEEOfficerDashboard() {
  return (
    <div className="space-y-8 p-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">CCC Approval & Issuance Gateway</h2>
        <p className="text-muted-foreground">Bureau of Energy Efficiency | Regulatory Approval & Carbon Credit Certificate Issuance</p>
      </div>

      {/* Approval Queue Status */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">CCC Issuance Pipeline Status</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label="Check-Verified"
            value="28"
            description="Awaiting BEE approval"
            icon={<FileText className="text-blue-600" size={24} />}
          />
          <MetricCard
            label="CCCs Ready to Issue"
            value="2.14M"
            description="From over-performers"
            icon={<Zap className="text-emerald-600" size={24} />}
          />
          <MetricCard
            label="Approved & Issued"
            value="18.7M"
            description="YTD 2024 (hash-registered)"
            icon={<CheckCircle className="text-emerald-600" size={24} />}
          />
          <MetricCard
            label="Under-performer Deficit"
            value="3.2M CCCs"
            description="Purchase requirements"
            icon={<AlertCircle className="text-amber-600" size={24} />}
          />
        </div>
      </div>

      {/* Specific Submissions for Approval */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Submissions Awaiting BEE Approval</h3>
        <div className="space-y-3">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50/5 p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-semibold text-foreground">Eastern Cement Works | 2024-Q1</p>
                <p className="text-xs text-muted-foreground mt-1">Check-Verified: 2024-03-29 | Performance: Over-performer</p>
              </div>
              <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-3 py-1 rounded">READY</span>
            </div>
            <div className="text-xs space-y-2 mt-3 pl-3 border-l-2 border-emerald-400">
              <div className="flex justify-between">
                <span>GEI Achieved:</span>
                <span className="font-semibold">1,361.84 kg CO2e/tonne</span>
              </div>
              <div className="flex justify-between">
                <span>Baseline (BEE):</span>
                <span className="font-semibold">1,520 kg CO2e/tonne</span>
              </div>
              <div className="flex justify-between">
                <span>CCC Surplus to Issue:</span>
                <span className="font-semibold text-emerald-600">19,288 CCCs</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-emerald-200 bg-emerald-50/5 p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-semibold text-foreground">Sustainable Energy Solutions | 2024-Q1</p>
                <p className="text-xs text-muted-foreground mt-1">Check-Verified: 2024-03-29 | Performance: Under-performer</p>
              </div>
              <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-3 py-1 rounded">READY</span>
            </div>
            <div className="text-xs space-y-2 mt-3 pl-3 border-l-2 border-amber-400">
              <div className="flex justify-between">
                <span>GEI Achieved:</span>
                <span className="font-semibold">1.567 kg CO2e/MWh</span>
              </div>
              <div className="flex justify-between">
                <span>Baseline (BEE):</span>
                <span className="font-semibold">0.65 kg CO2e/MWh</span>
              </div>
              <div className="flex justify-between">
                <span>CCC Deficit Needed:</span>
                <span className="font-semibold text-amber-600">413,995 CCCs to purchase</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sector Performance Summary */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Sector-Wise Performance Analysis (2024-Q1)</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50/5 p-4">
            <p className="text-xs font-semibold text-emerald-600 mb-2">CEMENT SECTOR</p>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>Over-performers:</span>
                <span className="font-semibold">48 of 49 entities</span>
              </div>
              <div className="flex justify-between">
                <span>Avg GEI vs Baseline:</span>
                <span className="font-semibold">-8.2%</span>
              </div>
              <div className="flex justify-between">
                <span>CCCs Generated:</span>
                <span className="font-semibold">680,000</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50/5 p-4">
            <p className="text-xs font-semibold text-amber-600 mb-2">STEEL SECTOR</p>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>Over-performers:</span>
                <span className="font-semibold">18 of 40 entities</span>
              </div>
              <div className="flex justify-between">
                <span>Avg GEI vs Baseline:</span>
                <span className="font-semibold">+15.3%</span>
              </div>
              <div className="flex justify-between">
                <span>CCCs Deficit:</span>
                <span className="font-semibold">1.2M needed</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-emerald-200 bg-emerald-50/5 p-4">
            <p className="text-xs font-semibold text-emerald-600 mb-2">POWER SECTOR</p>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>Over-performers:</span>
                <span className="font-semibold">31 of 50 entities</span>
              </div>
              <div className="flex justify-between">
                <span>Avg GEI vs Baseline:</span>
                <span className="font-semibold">-3.8%</span>
              </div>
              <div className="flex justify-between">
                <span>CCCs Generated:</span>
                <span className="font-semibold">920,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ICM Registration Status */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">ICM Blockchain Registration Status</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between p-3 bg-muted rounded">
            <span>CCCs Issued & Registered on Ledger</span>
            <span className="font-semibold">18.7M (hash-verified)</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted rounded">
            <span>Available for CERC Trading</span>
            <span className="font-semibold">15.2M (banked/compliant)</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted rounded">
            <span>Trading Transactions YTD</span>
            <span className="font-semibold">8,432 compliance deals</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted rounded">
            <span>Avg CCC Price (CERC)</span>
            <span className="font-semibold">₹285 per CCC</span>
          </div>
        </div>
      </div>

      {/* Regulatory Compliance Timeline */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Compliance & Regulatory Timeline (Mar 2024)</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            label="Approved this Month"
            value="28"
            description="Q1 2024 submissions"
            icon={<CheckCircle className="text-emerald-600" size={24} />}
          />
          <MetricCard
            label="CCCs Issued"
            value="1.6M"
            description="Registered to ICM"
            icon={<Zap className="text-emerald-600" size={24} />}
          />
          <MetricCard
            label="Regulatory Audit"
            value="Compliant"
            description="All audits passed"
            icon={<CheckCircle className="text-emerald-600" size={24} />}
          />
        </div>
      </div>
    </div>
  )
}

// ICM Registry Dashboard - LEDGER OPERATIONS & TRADING FOCUSED
function ICMRegistryDashboard() {
  return (
    <div className="space-y-8 p-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Blockchain Ledger & Market Operations</h2>
        <p className="text-muted-foreground">Indian Carbon Market (ICM) Registry | Distributed Ledger & Trading Platform</p>
      </div>

      {/* CCC Registration Pipeline */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">CCC Registration Pipeline (Blockchain)</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label="From BEE (Pending)"
            value="2.14M"
            description="Awaiting ledger registration"
            icon={<Clock className="text-amber-600" size={24} />}
          />
          <MetricCard
            label="Registered on Ledger"
            value="18.7M"
            description="Hash-verified & immutable"
            icon={<Lock className="text-blue-600" size={24} />}
          />
          <MetricCard
            label="Active Market CCCs"
            value="15.2M"
            description="Available for trading"
            icon={<Zap className="text-emerald-600" size={24} />}
          />
          <MetricCard
            label="Banked (Carryover)"
            value="3.5M"
            description="Compliance reserve"
            icon={<BarChart3 className="text-blue-600" size={24} />}
          />
        </div>
      </div>

      {/* Registration Status for Pending CCCs */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Pending CCC Registration Batches</h3>
        <div className="space-y-3">
          <div className="rounded-lg border border-amber-200 bg-amber-50/5 p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-semibold text-foreground">Eastern Cement Works 2024-Q1 | 19,288 CCCs</p>
                <p className="text-xs text-muted-foreground mt-1">BEE Approval: 2024-04-01 | Status: Awaiting Registration</p>
              </div>
              <span className="text-xs font-semibold bg-amber-100 text-amber-700 px-3 py-1 rounded">IN QUEUE</span>
            </div>
            <div className="text-xs space-y-1 mt-3 pl-3 border-l-2 border-amber-400">
              <p>Hash pending generation. Expected registration: 2024-04-03</p>
              <p>Transaction fee: ₹28,932 | Batch size: 19,288 units</p>
            </div>
          </div>

          <div className="rounded-lg border border-blue-200 bg-blue-50/5 p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-semibold text-foreground">Sustainable Energy Solutions 2024-Q1 | 0 CCCs (Deficit)</p>
                <p className="text-xs text-muted-foreground mt-1">BEE Approval: 2024-04-01 | Status: Deficit Recorded</p>
              </div>
              <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded">RECORDED</span>
            </div>
            <div className="text-xs space-y-1 mt-3 pl-3 border-l-2 border-blue-400">
              <p>Under-performer: 413,995 CCCs deficit recorded on ledger</p>
              <p>Compliance obligation: Entity must purchase CCCs by 2024-12-31</p>
            </div>
          </div>
        </div>
      </div>

      {/* Blockchain Ledger Integrity */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Blockchain Ledger Integrity & Verification</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50/5 p-4">
            <p className="text-xs font-semibold text-emerald-600 mb-2">HASH VERIFICATION</p>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="font-semibold">100% Verified</span>
              </div>
              <div className="flex justify-between">
                <span>Last audit:</span>
                <span className="font-semibold">2024-03-31</span>
              </div>
              <div className="flex justify-between">
                <span>Next audit:</span>
                <span className="font-semibold">2024-04-30</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-emerald-200 bg-emerald-50/5 p-4">
            <p className="text-xs font-semibold text-emerald-600 mb-2">RECONCILIATION</p>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>BEE Registry Match:</span>
                <span className="font-semibold">18.7M ✓</span>
              </div>
              <div className="flex justify-between">
                <span>Entity Accounts Match:</span>
                <span className="font-semibold">18.7M ✓</span>
              </div>
              <div className="flex justify-between">
                <span>Discrepancies:</span>
                <span className="font-semibold">0</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-emerald-200 bg-emerald-50/5 p-4">
            <p className="text-xs font-semibold text-emerald-600 mb-2">AUDIT TRAIL</p>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>Total transactions:</span>
                <span className="font-semibold">8,432</span>
              </div>
              <div className="flex justify-between">
                <span>Immutability:</span>
                <span className="font-semibold">100%</span>
              </div>
              <div className="flex justify-between">
                <span>Regulatory:</span>
                <span className="font-semibold">COMPLIANT</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CCC Market Trading Activity */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">CERC CCC Trading Market Activity</h3>
        <div className="rounded-lg border border-border bg-card p-6 space-y-3 text-sm">
          <div className="flex items-center justify-between p-3 bg-muted rounded">
            <span>Compliance Trading Transactions (Q1 2024)</span>
            <span className="font-semibold">2,108</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted rounded">
            <span>Banking Transactions (Carryover)</span>
            <span className="font-semibold">847 | 2.8M CCCs held</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted rounded">
            <span>Avg Trading Price (CERC)</span>
            <span className="font-semibold">₹285 per CCC</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted rounded">
            <span>Total Trading Volume</span>
            <span className="font-semibold">3.2M CCCs (Mar 2024)</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted rounded">
            <span>Market Liquidity</span>
            <span className="font-semibold">₹912M (circulating)</span>
          </div>
        </div>
      </div>

      {/* Market Participants */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Market Participants & CCC Holders</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-blue-200 bg-blue-50/5 p-4">
            <p className="text-xs font-semibold text-blue-600 mb-2">OBLIGATED ENTITIES</p>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>Active entities:</span>
                <span className="font-semibold">187</span>
              </div>
              <div className="flex justify-between">
                <span>Over-performers:</span>
                <span className="font-semibold">97 (CCC sellers)</span>
              </div>
              <div className="flex justify-between">
                <span>Under-performers:</span>
                <span className="font-semibold">90 (CCC buyers)</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-green-200 bg-green-50/5 p-4">
            <p className="text-xs font-semibold text-green-600 mb-2">REGISTERED TRADERS</p>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>CERC registered:</span>
                <span className="font-semibold">42</span>
              </div>
              <div className="flex justify-between">
                <span>Active this quarter:</span>
                <span className="font-semibold">38</span>
              </div>
              <div className="flex justify-between">
                <span>Total volume handled:</span>
                <span className="font-semibold">2.8M CCCs</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50/5 p-4">
            <p className="text-xs font-semibold text-amber-600 mb-2">COMPLIANCE RESERVE</p>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>Banked CCCs:</span>
                <span className="font-semibold">3.5M</span>
              </div>
              <div className="flex justify-between">
                <span>Compliance coverage:</span>
                <span className="font-semibold">87% (2.1M @ ₹1,050)</span>
              </div>
              <div className="flex justify-between">
                <span>Holdings entities:</span>
                <span className="font-semibold">45</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registry Operations Metrics */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Registry Operations & Ledger Metrics</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label="Registrations Today"
            value="0"
            description="Pending batch processing"
            icon={<FileText className="text-blue-600" size={24} />}
          />
          <MetricCard
            label="System Uptime"
            value="99.98%"
            description="Last 30 days"
            icon={<CheckCircle className="text-emerald-600" size={24} />}
          />
          <MetricCard
            label="Avg Registration Time"
            value="2.4 hours"
            description="Hash generation to ledger"
            icon={<Clock className="text-blue-600" size={24} />}
          />
          <MetricCard
            label="Total CCC Lifetime"
            value="47.2M"
            description="Historical ledger entries"
            icon={<Lock className="text-blue-600" size={24} />}
          />
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
