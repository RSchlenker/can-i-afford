import { IconType } from 'react-icons'
import { FaX } from 'react-icons/fa6'
import { useAppDispatch } from '../../store/store'
import { removeFactor } from '../../store/chartSlice'

export default function FactorBox({
  Icon,
  id,
  color = 'gray-500',
  children,
}: {
  Icon: IconType
  id: string
  color?: string
  children: React.ReactNode
}) {
  const dispatch = useAppDispatch()
  const deleteFactor = () => {
    dispatch(removeFactor(id) as any)
  }
  return (
    <div
      className={
        'w-72 p-4 text-white flex relative group min-h-[4.5rem] bg-' + color
      }
      data-testid="factor-box"
    >
      <Icon className="text-white text-2xl mr-4 max-w-8 min-w-8" />
      {children}
      <a
        className="absolute top-1 -right-1 h-4 w-7"
        data-testid="delete-factor"
        onClick={deleteFactor}
      >
        <FaX className="h-full align-middle mx-auto text-gray-100 hidden group-hover:block hover:text-gray-300 cursor-pointer" />
      </a>
    </div>
  )
}
