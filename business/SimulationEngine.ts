import { simulate } from './simulator'

export interface Factor {
  name: string
  factor: Function
  id: string
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
