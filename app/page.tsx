'use client'
import LineChart from './LineChart'
import { monthlyIncome } from '@/business/finances'
import { ChartData, simulateForChartJS } from '@/business/adapters/chartjs'
import { SimulationRequest } from '@/business/SimulationEngine'
import { useEffect, useRef, useState } from 'react'

// export const metadata = {
//   title: 'Can I afford',
// }

export default function Page() {
  const factors = [monthlyIncome(2000)]
  const simulationRequest = {
    factors,
    startYear: 2024,
    endYear: 2026,
    startVolume: 50000,
  } as SimulationRequest
  const chartjsData: ChartData = simulateForChartJS(simulationRequest)

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

  setTimeout(() => {
    setData({
      labels: chartjsData.labels,
      datasets: [
        {
          label: 'Dataset 1',
          data: chartjsData.data.map((it) => it / 2),
        },
      ],
    } as any)
  }, 2000)
  return <LineChart data={data} />
}
