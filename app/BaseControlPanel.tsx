import { RootState, useAppDispatch, useAppSelector } from '../store/store'
import { setStartYear } from '../store/chartSlice'

export default function BaseControlPanel() {
  const dispatch = useAppDispatch()
  const startYear = useAppSelector((state: RootState) => state.chart.startYear)
  return (
    <div>
      <button onClick={() => dispatch(setStartYear(2015))}>Click me</button>
      <div data-testid="start-year">Start year: {startYear}</div>
    </div>
  )
}
