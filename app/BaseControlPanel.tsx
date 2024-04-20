import { RootState, useAppDispatch, useAppSelector } from '../store/store'
import { addFactor, setStartYear } from '../store/chartSlice'
import { monthlyIncome } from '@/business/finances'
import { FaPlus } from 'react-icons/fa6'
import { Factor } from '@/business/SimulationEngine'
import { useEffect, useState } from 'react'

export default function BaseControlPanel() {
  const dispatch = useAppDispatch()
  const factors: Array<Factor> = useAppSelector(
    (state: RootState) => state.chart.factors,
  )
  const [factorsToDisplay, setFactors] = useState(factors)
  useEffect(() => {
    setFactors(factors)
  }, [factors])

  return (
    <div className="w-1/2 border-2 p-10 my-10 relative">
      {factorsToDisplay.map((factor) => {
        return <div key={factor.id}>{factor.name}</div>
      })}
      <a
        className="absolute top-2 right-2 text-3xl text-amber-500 hover:text-green-500"
        data-testid="add-factor"
        onClick={() =>
          dispatch(addFactor({ factor: monthlyIncome(100), name: 'testst' }))
        }
      >
        <FaPlus />
      </a>
    </div>
  )
}
