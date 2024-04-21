import { RootState, useAppSelector } from '../store/store'
import { FaMinus, FaPlus } from 'react-icons/fa6'
import { Factor } from '@/business/SimulationEngine'
import { useEffect, useState } from 'react'
import UsedFactor from './UsedFactor'
import AddFactorMenu from './AddFactorMenu'
import FactorForm from './FactorForm'

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
  const initateForm = () => {
    toggleMenu(false)
    toggleForm(true)
  }
  const reset = () => {
    toggleMenu(true)
    toggleForm(false)
  }

  return (
    <div className="flex my-10 w-1/2 border-2 relative">
      <div className="p-10">
        {factorsToDisplay.map((factor) => {
          return <UsedFactor key={factor.id} factor={factor} />
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
                <FaPlus className="mx-auto align-middle h-full text-white" />
              </a>
            </div>
            <div
              className="h-8 w-8 rounded-full bg-orange-600"
              onClick={initateForm}
            >
              <a data-testid="add-outcome">
                <FaMinus className="mx-auto align-middle h-full text-white" />
              </a>
            </div>
          </AddFactorMenu>
        </div>
      ) : (
        ''
      )}
      {showForm ? (
        <div className="ml-auto">
          <FactorForm onFinished={reset} onCancel={reset} />
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
