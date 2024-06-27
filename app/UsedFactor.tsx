import { Factor, FACTOR_TYPES } from '@/business/SimulationEngine'
import { FaArrowTrendUp, FaX } from 'react-icons/fa6'
import { removeFactor } from '../store/chartSlice'
import { useAppDispatch } from '../store/store'
import { useState } from 'react'
import IncomeFactorView from './factors/IncomeFactorView'
import OutcomeFactorView from './factors/OutcomeFactorView'

export default function UsedFactor({ factor }: { factor: Factor }) {
  const dispatch = useAppDispatch()
  const deleteFactor = () => {
    dispatch(removeFactor(factor.id) as any)
  }
  const [showButtons, setShowButtons] = useState(false)
  const getColorForType = (factor: Factor): string => {
    switch (factor.type) {
      case FACTOR_TYPES.INCOME:
        return 'bg-emerald-500'
      case FACTOR_TYPES.YEARLY_OUTCOME:
      case FACTOR_TYPES.MONTHLY_OUTCOME:
        return 'bg-amber-700'
      case FACTOR_TYPES.OTHER:
        return 'bg-gray-500'
    }
  }

  return (
    <div
      data-testid="used-factor"
      className={
        'w-72 p-4 text-white flex relative group ' + getColorForType(factor)
      }
      key={factor.id || Math.random()}
      onClick={() => setShowButtons(!showButtons)}
    >
      {renderFactorView(factor, deleteFactor)}
    </div>
  )
}

const renderFactorView = (factor: Factor, deleteFactor: Function) => {
  switch (factor.type) {
    case FACTOR_TYPES.INCOME:
      return <IncomeFactorView factor={factor} deleteFactor={deleteFactor} />
    case FACTOR_TYPES.MONTHLY_OUTCOME:
    case FACTOR_TYPES.YEARLY_OUTCOME:
      return <OutcomeFactorView factor={factor} deleteFactor={deleteFactor} />
    default:
      return (
        <>
          <FaArrowTrendUp className="h-full text-white text-2xl mr-4 w-6" />
          <p className="font-semibold">{factor.name}</p>
          <a
            className="absolute top-1 -right-1 h-4 w-7"
            data-testid="delete-factor"
            onClick={() => deleteFactor()}
          >
            <FaX className="h-full align-middle mx-auto text-gray-100 hidden group-hover:block hover:text-gray-300 cursor-pointer" />
          </a>
        </>
      )
  }
}
