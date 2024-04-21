'use client'
import ReduxProvider from '../store/ReduxProvider'
import SimulationChart from './SimulationChart'
import BaseControlPanel from './BaseControlPanel'
import '../styles/global.css'

export default function Page() {
  return (
    <ReduxProvider>
      <main className="mx-auto p-8">
        <h1 className="text-2xl text-center">Can I afford?</h1>
        <div className="w-1/2 mx-auto">
          <SimulationChart />
        </div>
        <BaseControlPanel />
      </main>
    </ReduxProvider>
  )
}
