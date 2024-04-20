import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Factor } from '@/business/SimulationEngine'
import { monthlyIncome } from '@/business/finances'

export interface IChartSlice {
  startYear: number
  startVolume: number
  endYear: number
  factors: Array<Factor>
}

const initialState: IChartSlice = {
  startYear: 2025,
  startVolume: 50000,
  endYear: 2060,
  factors: [{ factor: monthlyIncome(2), name: 'income', id: 'some' }],
}

export const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    setStartYear: (state, action: PayloadAction) => {
      state.startYear = action.payload
    },
    addFactor: (state, action: PayloadAction) => {
      state.factors.push(action.payload)
    },
  },
})

export const { setStartYear, addFactor } = chartSlice.actions
export const chartReducer = chartSlice.reducer
