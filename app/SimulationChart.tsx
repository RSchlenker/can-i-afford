import LineChart from './components/LineChart'
import { RootState, useAppSelector } from '../store/store'
import { SimulationRequest } from '@/business/SimulationEngine'
import { simulateForChartJS } from '@/business/adapters/chartjs'
import { useEffect, useState } from 'react'

export default function SimulationChart() {
  const factors = useAppSelector((state: RootState) => state.chart.factors)
  const startYear = useAppSelector((state: RootState) => state.chart.startYear)
  const endYear = useAppSelector((state: RootState) => state.chart.endYear)
  const startVolume = useAppSelector(
    (state: RootState) => state.chart.startVolume,
  )

  const simulationRequest = {
    factors,
    startYear,
    endYear,
    startVolume,
  } as SimulationRequest
  const chartjsData = simulateForChartJS(simulationRequest)

  let currentData: any = {
    labels: chartjsData.labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: chartjsData.data,
      },
    ],
  }
  const [data, setData] = useState(currentData)

  const lastEntry = (data: any) => {
    const result = data.datasets[0].data[data.datasets[0].data.length - 1] || 0
    return Number(result)
  }

  useEffect(() => {
    const chartjsData = simulateForChartJS(simulationRequest)
    currentData = {
      labels: chartjsData.labels,
      datasets: [
        {
          label: 'Vermögen',
          data: chartjsData.data,
        },
      ],
    }
    setData(currentData)
  }, [startYear, endYear, startVolume, factors])

  return (
    <div
      data-testid="chart"
      data-chart-result={lastEntry(data).toFixed(0)}
      className="h-full"
    >
      <LineChart data={data} />
    </div>
  )
}
