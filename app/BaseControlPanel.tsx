import { RootState, useAppSelector } from '../store/store'
import { Factor } from '@/business/SimulationEngine'
import { useEffect, useState } from 'react'
import UsedFactor from './UsedFactor'
import AIDialog from './AIDialog'
import { Button } from '@headlessui/react'

export default function BaseControlPanel() {
  const factors: Array<Factor> = useAppSelector(
    (state: RootState) => state.chart.factors,
  )
  const [factorsToDisplay, setFactors] = useState(factors)
  useEffect(() => {
    setFactors(factors)
  }, [factors])

  const [showAIDialog, toggleAIDialog] = useState(false)
  const reset = () => {
    toggleAIDialog(false)
  }

  return (
    <div className="flex my-10 flex-grow mx-20 border-2 relative">
      <div className="p-10 w-full flex flex-wrap">
        {factorsToDisplay.map((factor) => {
          return (
            <div key={factor.id || ''} className="m-3">
              <UsedFactor factor={factor} />{' '}
            </div>
          )
        })}
      </div>
      <Button
        onClick={() => toggleAIDialog(true)}
        className="h-8 hover:bg-gray-600 text-white bg-gray-500 absolute right-0 -top-10"
      >
        Hinzufügen
      </Button>
      {showAIDialog ? <AIDialog onFinished={reset} onCancel={reset} /> : ''}
    </div>
  )
}
