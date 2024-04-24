import { Factor } from '@/business/SimulationEngine'
import { FaArrowTrendUp, FaX } from 'react-icons/fa6'
import { removeFactor } from '../store/chartSlice'
import { useAppDispatch } from '../store/store'
import { useState } from 'react'

export default function UsedFactor({ factor }: { factor: Factor }) {
  const dispatch = useAppDispatch()
  const deleteFactor = () => {
    dispatch(removeFactor(factor.id) as any)
  }
  const [showButtons, setShowButtons] = useState(false)

  return (
    <div
      data-testid="used-factor"
      className="bg-emerald-500 hover:bg-emerald-300 w-80 p-4 text-white flex relative"
      key={factor.id || Math.random()}
      onClick={() => setShowButtons(!showButtons)}
    >
      <FaArrowTrendUp className="h-full text-white text-2xl mr-4 w-6" />
      <p className="font-semibold">{factor.name}</p>
      <p>Factor: {factor.factor(0)}</p>
      {showButtons ? (
        <a
          className="absolute -top-7 right-0 h-7 w-7 bg-red-500"
          data-testid="delete-factor"
          onClick={() => deleteFactor()}
        >
          <FaX className="h-full align-middle mx-auto" />
        </a>
      ) : (
        ''
      )}
    </div>
  )
}
