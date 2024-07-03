'use client'
import ReduxProvider from '../store/ReduxProvider'
import SimulationChart from './SimulationChart'
import BaseControlPanel from './BaseControlPanel'
import '../styles/global.css'
import AITextForm from './AITextForm'

export default function Page() {
  return (
    <ReduxProvider>
      <main className="mx-auto p-8">
        <h1 className="text-5xl">Zukunftsplaner</h1>
        <div className="mx-auto grid grid-cols-5">
          <div className="col-span-2">
            <AITextForm />
          </div>
          <div className="col-span-2 h-96">
            <SimulationChart />
          </div>
        </div>
        <BaseControlPanel />
      </main>
    </ReduxProvider>
  )
}
