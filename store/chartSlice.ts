import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Factor, FACTOR_TYPES } from '@/business/SimulationEngine'
import { etfs } from '@/business/finances'
import { v4 as uuidv4 } from 'uuid'

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
  factors: [
    {
      factor: etfs(0.02),
      name: 'Investment 2%',
      id: 'some',
      type: FACTOR_TYPES.OTHER,
    },
  ],
}

export const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    setStartYear: (state, action: PayloadAction<number>) => {
      state.startYear = action.payload
    },
    addFactor: (state, action?: PayloadAction<Factor>) => {
      if (action) {
        state.factors.push({ ...action.payload, id: uuidv4() })
      }
    },
    removeFactor: (state, action?: PayloadAction<string>) => {
      if (action) {
        state.factors = state.factors.filter(
          (factor: Factor) => factor.id !== action.payload,
        )
      }
    },
  },
})

export const { setStartYear, addFactor, removeFactor } = chartSlice.actions
export const chartReducer = chartSlice.reducer
