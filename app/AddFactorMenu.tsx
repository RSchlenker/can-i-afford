import { FaPlus } from 'react-icons/fa6'
import { Planet } from 'react-planet'

export default function AddFactorMenu({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Planet
      centerContent={
        <div
          className="h-8 w-8 rounded-full bg-amber-500"
          data-testid="add-factor"
        >
          <FaPlus className="mx-auto align-middle h-full text-white" />
        </div>
      }
      hideOrbit
      autoClose
      orbitRadius={40}
    >
      {children}
    </Planet>
  )
}
