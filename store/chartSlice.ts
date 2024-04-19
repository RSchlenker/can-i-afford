import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IChartSlice {
  startYear: number
  startVolume: number
  endYear: number
}

const initialState: IChartSlice = {
  startYear: 2025,
  startVolume: 50000,
  endYear: 2060,
}

export const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    setStartYear: (state, action: PayloadAction) => {
      state.startYear = action.payload
    },
  },
})

export const { setStartYear } = chartSlice.actions
export const chartReducer = chartSlice.reducer
