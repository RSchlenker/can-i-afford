'use client'
import ReduxProvider from '../store/ReduxProvider'
import SimulationChart from './SimulationChart'
import BaseControlPanel from './BaseControlPanel'

export default function Page() {
  return (
    <ReduxProvider>
      <main>
        <h1>Can I afford?</h1>
        <SimulationChart class="px-20" />
        <BaseControlPanel />
      </main>
    </ReduxProvider>
  )
}
