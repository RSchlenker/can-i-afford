import { Factor } from '@/business/SimulationEngine'
import { FaArrowTrendUp, FaClock, FaX } from 'react-icons/fa6'
import { useState } from 'react'
import FactorBox from './FactorBox'

export default function IncomeFactorView({ factor }: { factor: Factor }) {
  const [showReductions, setShowReductions] = useState(false)
  return (
    <FactorBox id={factor.id!} Icon={FaArrowTrendUp} color="emerald-500">
      <div className="grid grid-cols-2 gap-1 text-xs">
        {!showReductions
          ? renderCoreInformation(factor)
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

const renderCoreInformation = (factor: Factor) => {
  return (
    <>
      <h3 className="font-bold text-lg col-span-2">{factor.name}</h3>
      <p>Zeitraum</p>
      <p>
        {factor.startYear} - {factor.endYear}
      </p>
      <p>Verdienst</p>
      <p>{factor.amount}</p>
    </>
  )
}
