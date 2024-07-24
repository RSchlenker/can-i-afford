import SimulationChart from './SimulationChart'
import BaseControlPanel from './BaseControlPanel'
import '../styles/global.css'
import AITextForm from './AITextForm'
import CoreInformationPanel from './CoreInformationPanel'
import StateWrapper from './components/StateWrapper'
import AuthenticationButton from './components/AuthenticationButton'

export default function Page() {
  return (
    <main className="mx-auto p-8">
      <h1 className="text-5xl">Zukunftsplaner</h1>
      <StateWrapper>
        <div className="mx-auto grid grid-cols-5">
          <div className="col-span-2">
            <AuthenticationButton />
            <AITextForm />
          </div>
          <div className="col-span-2 h-96">
            <SimulationChart />
          </div>
          <div className="col-span-1">
            <CoreInformationPanel />
          </div>
        </div>
        <BaseControlPanel />
      </StateWrapper>
    </main>
  )
}
