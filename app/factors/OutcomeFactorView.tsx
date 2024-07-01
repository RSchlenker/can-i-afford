import { Factor, FACTOR_TYPES } from '@/business/SimulationEngine'
import { FaArrowTrendDown, FaClock, FaX } from 'react-icons/fa6'
import { useState } from 'react'

export default function OutcomeFactorView({
  factor,
  deleteFactor,
}: {
  factor: Factor
  deleteFactor: Function
}) {
  const isMonthly = factor.type === FACTOR_TYPES.MONTHLY_OUTCOME
  const [showReductions, setShowReductions] = useState(false)
  return (
    <div className="text-white flex min-h-[4.5rem]">
      <FaArrowTrendDown className="text-white text-2xl mr-4 max-w-8 min-w-8" />
      <div className="grid grid-cols-2 gap-1 text-xs">
        {!showReductions
          ? renderCoreInformation(factor, isMonthly)
          : renderReductions(factor)}
      </div>
      <a
        className="absolute top-1 -right-1 h-4 w-7"
        data-testid="delete-factor"
        onClick={() => deleteFactor()}
      >
        <FaX className="h-full align-middle mx-auto text-gray-100 hidden group-hover:block hover:text-gray-300 cursor-pointer" />
      </a>
      {factor.reductions && factor.reductions.length > 0 ? (
        <a
          className="absolute bottom-1.5 right-2 w-7"
          onClick={() => setShowReductions(!showReductions)}
        >
          <FaClock className="h-full w-full align-middle mx-auto text-gray-100 hover:text-gray-300 cursor-pointer" />
        </a>
      ) : (
        ''
      )}
    </div>
  )
}

const reduction = (reduction: object) => {
  return (
    <div className="w-40 grid grid-cols-2">
      <p>
        {reduction.startYear} - {reduction.endYear}:
      </p>
      <p> {reduction.factor * 100}%</p>
    </div>
  )
}

const renderReductions = (factor: Factor) => {
  return (
    <div className="w-full">
      <h3 className="font-bold text-lg col-span-2">Anpassungen</h3>
      {factor.reductions?.map((r) => reduction(r))}
    </div>
  )
}

const renderCoreInformation = (factor: Factor, isMonthly: Boolean) => {
  return (
    <>
      <h3 className="font-bold text-lg col-span-2">{factor.name}</h3>
      <p>Zeitraum</p>
      <p>
        {factor.startYear} - {factor.endYear}
      </p>
      <p>Ausgabe</p>
      <p>
        {factor.amount} {isMonthly ? '/ Monat' : '/ Jahr'}
      </p>
    </>
  )
}
