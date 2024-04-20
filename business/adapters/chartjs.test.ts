import { income } from '../finances'
import { SimulationRequest } from '../SimulationEngine'
import { simulateForChartJS } from './chartjs'

it('should return chart data', () => {
  const request = {
    factors: [{ factor: income(2000) }],
    startYear: 2022,
    endYear: 2024,
    startVolume: 0,
  } as SimulationRequest
  const chartData = simulateForChartJS(request)
  expect(chartData).toEqual({
    labels: [2022, 2023, 2024],
    data: [0, 2000, 4000],
  })
})
