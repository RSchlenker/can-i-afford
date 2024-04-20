import { RootState, useAppDispatch, useAppSelector } from '../store/store'
import { addFactor, setStartYear } from '../store/chartSlice'
import { monthlyIncome } from '@/business/finances'

export default function BaseControlPanel() {
  const dispatch = useAppDispatch()
  const startYear = useAppSelector((state: RootState) => state.chart.startYear)
  return (
    <div>
      <button onClick={() => dispatch(setStartYear(2015))}>Click me</button>
      <div data-testid="start-year">Start year: {startYear}</div>
      <button
        onClick={() => dispatch(addFactor({ factor: monthlyIncome(100) }))}
      >
        Add income
      </button>
    </div>
  )
}
