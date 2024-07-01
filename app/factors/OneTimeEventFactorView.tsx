import { Factor } from '@/business/SimulationEngine'
import { FaSun, FaX } from 'react-icons/fa6'
import FactorBox from './FactorBox'

export default function OneTimeEventFactorView({ factor }: { factor: Factor }) {
  return (
    <FactorBox Icon={FaSun} id={factor.id} color="amber-400">
      <div className="grid grid-cols-2 gap-1 text-xs">
        {renderCoreInformation(factor)}
      </div>
    </FactorBox>
  )
}

const renderCoreInformation = (factor: Factor) => {
  return (
    <>
      <h3 className="font-bold text-lg col-span-2">{factor.name}</h3>
      <p>Jahr</p>
      <p>{factor.year}</p>
      <p>Ausgabe</p>
      <p>{factor.amount}</p>
    </>
  )
}
