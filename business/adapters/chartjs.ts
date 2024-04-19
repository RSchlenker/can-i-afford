import {
  SimulationEngine,
  SimulationRequest,
  SimulationResult,
} from '../SimulationEngine'

export interface ChartData {
  labels: Array<string>
  data: Array<number>
}

export function simulateForChartJS(request: SimulationRequest): ChartData {
  const simulation = new SimulationEngine().simulate(request)
  const labels = simulation.map(
    (result: SimulationResult) => result.year as string,
  )
  const data = simulation.map((result: SimulationResult) => result.volume)
  return { labels, data }
}
