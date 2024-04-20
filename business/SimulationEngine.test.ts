import { SimulationEngine, SimulationRequest } from './SimulationEngine'
import { income } from './finances'
import { expect } from '@jest/globals'

it('Should simulate over 2 years', () => {
  const engine: SimulationEngine = new SimulationEngine()
  const request = {
    factors: [{ factor: income(2000) }],
    startYear: 2022,
    endYear: 2024,
    startVolume: 0,
  } as SimulationRequest
  const result = engine.simulate(request)
  expect(result[2]).toEqual({ volume: 4000, year: 2024 })
})
