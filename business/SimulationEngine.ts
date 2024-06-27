import { simulate } from './simulator'

export enum FACTOR_TYPES {
  INCOME,
  MONTHLY_OUTCOME,
  YEARLY_OUTCOME,
  OTHER,
}

export interface Factor {
  name: string
  factor: Function
  id?: string
  type: FACTOR_TYPES
  reductions?: object[]
  amount?: number
  startYear?: number
  endYear?: number
}

export interface SimulationRequest {
  startYear: number
  endYear: number
  startVolume: number
  factors: Array<Factor>
}

export interface SimulationResult {
  year: number
  volume: number
}

export class SimulationEngine {
  simulate(request: SimulationRequest): Array<SimulationResult> {
    const factorsToSimulate = request.factors.map((f) => f.factor)
    return simulate(
      factorsToSimulate,
      request.startYear,
      request.endYear,
      request.startVolume,
    )
  }
}
