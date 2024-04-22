import { income } from '@/business/finances'
import { SimulationRequest } from '@/business/SimulationEngine'
import { simulateForChartJS } from '@/business/adapters/chartjs'
import { expect, it } from '@jest/globals'

it('should return chart data', () => {
  const request = {
    factors: [{ factor: income(2000) }],
    startYear: 2022,
    endYear: 2024,
    startVolume: 0,
  } as SimulationRequest
  const chartData = simulateForChartJS(request)
  expect(chartData).toEqual({
    labels: ['2022', '2023', '2024'],
    data: [0, 2000, 4000],
  })
})
