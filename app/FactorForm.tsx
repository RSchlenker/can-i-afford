import { income } from '@/business/finances'
import { useAppDispatch } from '../store/store'
import { addFactor } from '../store/chartSlice'
import { FormEvent } from 'react'
import { FaX } from 'react-icons/fa6'

export default function FactorForm({
  onFinished,
  onCancel,
}: {
  onFinished: Function
  onCancel: Function
}) {
  const dispatch = useAppDispatch()
  const saveFactor = (e: FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as any)
    const formJson = Object.fromEntries(formData.entries())
    dispatch(
      addFactor({
        factor: income(+formJson.value),
        name: formJson.name,
      } as any),
    )
    onFinished()
  }

  return (
    <div className="bg-emerald-500 h-full w-80 p-4 relative">
      <form className="flex flex-col" method="post" onSubmit={saveFactor}>
        <input
          className="m-4 px-1 bg-emerald-500 text-white placeholder-white border-b-2 border-b-emerald-600 focus:outline-none focus:border-b-emerald-300"
          name="name"
          placeholder={'Name'}
          required
        />
        <input
          className="my-2 mx-4 px-1 bg-emerald-500 text-white placeholder-white border-b-2 border-b-emerald-600 focus:outline-none focus:border-b-emerald-300"
          name="value"
          placeholder="Value"
          required
        />
        <button
          className="bg-emerald-600 m-4 text-white font-bold focus:outline-none focus:bg-emerald-300 hover:bg-emerald-300"
          type="submit"
        >
          save
        </button>
      </form>
      <a
        className="absolute top-3 right-3 text-white text-2xl hover:text-emerald-300 hover:cursor-pointer"
        data-testid="close-form"
        onClick={() => onCancel()}
      >
        <FaX />
      </a>
    </div>
  )
}
