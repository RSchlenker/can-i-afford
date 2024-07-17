import { simulate } from './simulator'

export enum FACTOR_TYPES {
  INCOME = 'income',
  MONTHLY_OUTCOME = 'monthlyOutcome',
  YEARLY_OUTCOME = 'yearlyOutcome',
  ONE_TIME_EVENT = 'oneTimeEvent',
  START_VOLUME = 'changeStartVolume',
  CHANGE_FACTOR = 'changeFactor',
  REDUCE_TO = 'reduceTo',
  OTHER = 'other',
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
  year?: number
}

export interface Setting {
  name: string
  value: number
}

export interface ChangeRequest {
  name: string
  fields: object
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
