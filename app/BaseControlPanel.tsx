import { RootState, useAppSelector } from '../store/store'
import { FaArrowTrendDown, FaArrowTrendUp, FaComment } from 'react-icons/fa6'
import { Factor } from '@/business/SimulationEngine'
import { useEffect, useState } from 'react'
import UsedFactor from './UsedFactor'
import AddFactorMenu from './AddFactorMenu'
import FactorForm from './FactorForm'
import { IncomeFactory } from '@/business/factorys/IncomeFactory'
import AIDialog from './AIDialog'

export default function BaseControlPanel() {
  const factors: Array<Factor> = useAppSelector(
    (state: RootState) => state.chart.factors,
  )
  const [factorsToDisplay, setFactors] = useState(factors)
  useEffect(() => {
    setFactors(factors)
  }, [factors])

  const [showMenu, toggleMenu] = useState(true)
  const [showForm, toggleForm] = useState(false)
  const [showAIDialog, toggleAIDialog] = useState(false)
  const initateForm = () => {
    toggleMenu(false)
    toggleForm(true)
  }
  const reset = () => {
    toggleMenu(true)
    toggleForm(false)
    toggleAIDialog(false)
  }
  const initiateAIDialog = () => {
    toggleMenu(false)
    toggleAIDialog(true)
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
      {showMenu ? (
        <div className="ml-auto mr-10 mt-2">
          <AddFactorMenu>
            <div
              className="h-8 w-8 rounded-full bg-emerald-500"
              onClick={initateForm}
            >
              <a data-testid="add-income">
                <FaArrowTrendUp className="mx-auto align-middle h-full text-white" />
              </a>
            </div>
            <div
              className="h-8 w-8 rounded-full bg-emerald-500"
              onClick={initiateAIDialog}
            >
              <a data-testid="add-income">
                <FaComment className="mx-auto align-middle h-full text-white" />
              </a>
            </div>
            <div
              className="h-8 w-8 rounded-full bg-orange-600"
              onClick={initateForm}
            >
              <a data-testid="add-outcome">
                <FaArrowTrendDown className="mx-auto align-middle h-full text-white" />
              </a>
            </div>
          </AddFactorMenu>
        </div>
      ) : (
        ''
      )}
      {showForm ? (
        <div className="absolute top-0 right-0 shadow-2xl">
          <FactorForm
            factory={new IncomeFactory()}
            onFinished={reset}
            onCancel={reset}
          />
        </div>
      ) : (
        ''
      )}
      {showAIDialog ? <AIDialog onFinished={reset} onCancel={reset} /> : ''}
    </div>
  )
}
