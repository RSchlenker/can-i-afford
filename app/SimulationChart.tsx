import LineChart from './LineChart'
import { monthlyIncome } from '@/business/finances'
import { RootState, useAppSelector } from '../store/store'
import { SimulationRequest } from '@/business/SimulationEngine'
import { simulateForChartJS } from '@/business/adapters/chartjs'
import { useEffect, useState } from 'react'

export default function SimulationChart() {
  const factors = [monthlyIncome(2000)]
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

  useEffect(() => {
    const chartjsData = simulateForChartJS(simulationRequest)
    currentData = {
      labels: chartjsData.labels,
      datasets: [
        {
          label: 'Dataset 1',
          data: chartjsData.data,
        },
      ],
    }
    setData(currentData)
  }, [startYear, endYear, startVolume])

  return <LineChart data={data} />
}
