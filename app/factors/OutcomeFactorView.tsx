import { Factor, FACTOR_TYPES } from '@/business/SimulationEngine'
import { FaArrowTrendDown, FaClock, FaX } from 'react-icons/fa6'
import { useState } from 'react'
import FactorBox from './FactorBox'

export default function OutcomeFactorView({ factor }: { factor: Factor }) {
  const isMonthly = factor.type === FACTOR_TYPES.MONTHLY_OUTCOME
  const [showReductions, setShowReductions] = useState(false)
  return (
    <FactorBox Icon={FaArrowTrendDown} id={factor.id} color="amber-700">
      <div className="grid grid-cols-2 gap-1 text-xs">
        {!showReductions
          ? renderCoreInformation(factor, isMonthly)
          : renderReductions(factor)}
      </div>
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
    </FactorBox>
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
