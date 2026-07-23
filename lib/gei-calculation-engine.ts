// GHG Emission Intensity (GEI) Calculation Engine
// Aligned with BEE CCTS methodology and EU ETS standards

import { ActivityData, GeiCalculation, EmissionFactor } from './dmrv-types'
import { emissionFactors } from './dmrv-mock-data'

interface CalculationInputs {
  activityData: ActivityData
  sectorBaseline: number
  emissionFactors: Record<string, { value: number; unit: string }>
}

export class GEICalculationEngine {
  /**
   * Calculate GHG Emission Intensity for a submission
   * Formula: (Sum of Activity × Emission Factor) - Adjustments / Production Output = GEI
   */
  static calculateGEI(
    activityData: ActivityData,
    sectorBaseline: number,
    submissionId: string
  ): GeiCalculation {
    // Fuel Emissions Calculation
    const fuelEmissions = this.calculateFuelEmissions(activityData)

    // Electricity Emissions Calculation
    const electricityEmissions = this.calculateElectricityEmissions(activityData)

    // Renewable Adjustment (deduction for renewable electricity - already zero-emission)
    const renewableAdjustment = 0

    // Total Emissions
    const totalEmissions = fuelEmissions + electricityEmissions

    // GEI Calculation
    const gei = activityData.productionOutput > 0 ? (totalEmissions * 1000) / activityData.productionOutput : 0

    // Performance Status
    const performanceStatus = this.determinePerformanceStatus(gei, sectorBaseline)

    // CCC Calculation (surplus or deficit)
    let cccSurplus: number | undefined
    let cccDeficit: number | undefined

    if (performanceStatus === 'over-performer') {
      // Over-performer: earns CCCs
      const emissionReduction = (sectorBaseline - gei) * activityData.productionOutput
      cccSurplus = Math.round(emissionReduction / 1000) // 1 CCC = 1 tonne CO2e
    } else if (performanceStatus === 'under-performer') {
      // Under-performer: needs to buy CCCs
      const emissionExcess = (gei - sectorBaseline) * activityData.productionOutput
      cccDeficit = Math.round(emissionExcess / 1000)
    }

    // ICAP Scores (placeholder - would be calculated during validation)
    const completenessPercentage = 100
    const consistencyScore = 100
    const accuracyScore = 100

    return {
      id: `GEI-${submissionId}`,
      submissionId,
      activityData,
      fuelEmissions,
      electricityEmissions,
      renewableAdjustment,
      totalEmissions,
      gei,
      geiUnit: activityData.outputUnit === 'tonne' ? 'kg CO2e/tonne' : 'kg CO2e/MWh',
      completenessPercentage,
      consistencyScore,
      accuracyScore,
      beeBaselineGei: sectorBaseline,
      baselineVersion: '2024-Q1',
      performanceStatus,
      cccSurplus,
      cccDeficit,
      calculatedAt: new Date().toISOString(),
    }
  }

  /**
   * Calculate emissions from fuel consumption
   */
  private static calculateFuelEmissions(activityData: ActivityData): number {
    let emissions = 0

    // Coal: 2.41 kg CO2e per kg (or multiply by 1000 for tonnes)
    if (activityData.coal) {
      emissions += activityData.coal * 2410 // tonne to kg conversion
    }

    // Natural Gas: 2.04 kg CO2e per m³
    if (activityData.naturalGas) {
      emissions += activityData.naturalGas * 2.04
    }

    // Diesel: 2.67 kg CO2e per litre
    if (activityData.diesel) {
      emissions += activityData.diesel * 2.67
    }

    // Biomass: 0 kg CO2e (renewable - zero-emission)
    // if (activityData.biomass) {
    //   emissions += 0
    // }

    return emissions / 1000 // Convert to tCO2e
  }

  /**
   * Calculate emissions from electricity consumption
   */
  private static calculateElectricityEmissions(activityData: ActivityData): number {
    let emissions = 0

    // Grid Electricity: 0.73 kg CO2e per kWh (India average)
    if (activityData.gridElectricity) {
      emissions += activityData.gridElectricity * 0.73
    }

    // Captive Electricity: 1.2 kg CO2e per kWh (typically coal-based)
    if (activityData.captiveElectricity) {
      emissions += activityData.captiveElectricity * 1.2
    }

    // Renewable Electricity: 0 kg CO2e (solar, wind, hydro)
    // if (activityData.renewableElectricity) {
    //   emissions += 0
    // }

    return emissions / 1000 // Convert to tCO2e
  }

  /**
   * Determine if entity is over-performer or under-performer
   */
  private static determinePerformanceStatus(
    gei: number,
    baseline: number
  ): 'over-performer' | 'under-performer' | 'baseline-met' {
    const tolerance = baseline * 0.02 // ±2% tolerance
    if (gei < baseline - tolerance) {
      return 'over-performer'
    } else if (gei > baseline + tolerance) {
      return 'under-performer'
    } else {
      return 'baseline-met'
    }
  }

  /**
   * Calculate confidence score based on validation results
   * Confidence = (Valid Records / Total Records) × Validation Passing Rate
   */
  static calculateConfidenceScore(
    validRecords: number,
    totalRecords: number,
    validationPassRate: number,
    entityHistoryScore: number = 85 // Default credibility for new entities
  ): number {
    const completenessRatio = validRecords / Math.max(totalRecords, 1)
    const confidence = Math.round((completenessRatio * validationPassRate * entityHistoryScore) / 100)
    return Math.min(confidence, 100)
  }

  /**
   * Compare with baseline and determine credit surplus/deficit
   */
  static calculateCCCAmount(
    gei: number,
    productionOutput: number,
    baseline: number,
    performanceStatus: string
  ): number {
    const emissionDifference = gei - baseline
    const totalDifference = emissionDifference * productionOutput
    return Math.round(totalDifference / 1000) // 1 CCC = 1 tonne CO2e
  }

  /**
   * Verify GEI calculation is within EU materiality threshold (±5%)
   */
  static verifyMaterialityThreshold(calculatedGei: number, reportedGei: number): {
    withinThreshold: boolean
    deviationPercentage: number
  } {
    const deviation = Math.abs(calculatedGei - reportedGei) / reportedGei
    const deviationPercentage = Math.round(deviation * 100 * 100) / 100
    const threshold = 5 // ±5% per EU ETS MRR
    return {
      withinThreshold: deviationPercentage <= threshold,
      deviationPercentage,
    }
  }
}

/**
 * Format GEI value for display
 */
export function formatGEI(gei: number, unit: string = 'kg CO2e/tonne'): string {
  return `${gei.toFixed(2)} ${unit}`
}

/**
 * Format CCC amount for display
 */
export function formatCCCAmount(amount: number | undefined): string {
  if (!amount) return '—'
  return `${Math.abs(amount).toLocaleString()} CCC`
}

/**
 * Get performance status label
 */
export function getPerformanceStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    'over-performer': 'Exceeds Target (Surplus)',
    'under-performer': 'Below Target (Deficit)',
    'baseline-met': 'Meets Baseline',
  }
  return labels[status] || status
}
