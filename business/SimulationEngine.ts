import { simulate } from './simulator'

export interface SimulationRequest {
  startYear: number
  endYear: number
  startVolume: number
  factors: Function
}

export interface SimulationResult {
  year: number
  volume: number
}

export class SimulationEngine {
  simulate(request: SimulationRequest): Array<SimulationResult> {
    return simulate(
      request.factors,
      request.startYear,
      request.endYear,
      request.startVolume,
    )
  }
}
