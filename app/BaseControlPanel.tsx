import { RootState, useAppDispatch, useAppSelector } from '../store/store'
import { addFactor, setStartYear } from '../store/chartSlice'
import { monthlyIncome } from '@/business/finances'
import { FaPlus } from 'react-icons/fa6'
import { Factor } from '@/business/SimulationEngine'
import { useEffect, useState } from 'react'
import UsedFactor from './UsedFactor'

export default function BaseControlPanel() {
  const dispatch = useAppDispatch()
  const factors: Array<Factor> = useAppSelector(
    (state: RootState) => state.chart.factors,
  )
  const [factorsToDisplay, setFactors] = useState(factors)
  useEffect(() => {
    setFactors(factors)
  }, [factors])

  const [showMenu, toggleMenu] = useState(false)

  return (
    <div className="flex my-10">
      <div className="w-1/2 border-2 p-10 relative">
        {factorsToDisplay.map((factor) => {
          return <UsedFactor key={factor.id} factor={factor} />
        })}
        <a
          className="absolute top-2 right-2 text-3xl text-amber-500 hover:text-green-500"
          data-testid="add-factor"
          onClick={() => toggleMenu(!showMenu)}
        >
          <FaPlus />
        </a>
      </div>
      {showMenu ? (
        <div className="">
          <a
            onClick={() =>
              dispatch(
                addFactor({ factor: monthlyIncome(100), name: 'income' }),
              )
            }
          >
            add income
          </a>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
