import { Factor } from '@/business/SimulationEngine'
import { FaSun, FaX } from 'react-icons/fa6'

export default function OneTimeEventFactorView({
  factor,
  deleteFactor,
}: {
  factor: Factor
  deleteFactor: Function
}) {
  return (
    <div className="text-white flex min-h-[4.5rem]">
      <FaSun className="text-white text-2xl mr-4 max-w-8 min-w-8" />
      <div className="grid grid-cols-2 gap-1 text-xs">
        {renderCoreInformation(factor)}
      </div>
      <a
        className="absolute top-1 -right-1 h-4 w-7"
        data-testid="delete-factor"
        onClick={() => deleteFactor()}
      >
        <FaX className="h-full align-middle mx-auto text-gray-100 hidden group-hover:block hover:text-gray-300 cursor-pointer" />
      </a>
    </div>
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
