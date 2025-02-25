import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  ChangeRequest,
  Factor,
  FACTOR_TYPES,
  Setting,
} from '@/business/SimulationEngine'
import { etfs, interestRate } from '@/business/finances'
import { v4 as uuidv4 } from 'uuid'
import MonthlyOutcomeFactor from '../app/factors/types/outcome/MonthlyOutcomeFactor'
import IncomeFactor from '../app/factors/types/income/IncomeFactor'
import YearlyOutcomeFactor from '../app/factors/types/outcome/YearlyOutcomeFactor'
import OneTimeEventFactor from '../app/factors/types/oneTimeEvent/OneTimeEventFactor'
import InvestmentFactor from '../app/factors/types/investment/InvestmentFactor'
import InterestRateFactor from '../app/factors/types/interestRate/InterestRateFactor'

export interface IChartSlice {
  startYear: number
  startVolume: number
  endYear: number
  factors: Array<Factor>
}

const initialState: IChartSlice = {
  startYear: 2026,
  startVolume: 70000,
  endYear: 2060,
  factors: [
    {
      factor: etfs(0.03),
      name: 'Investment 3%',
      amount: 0.03,
      id: 'investment-rate',
      type: FACTOR_TYPES.INVESTMENT_RATE,
    },
    {
      factor: interestRate(0.03),
      name: 'Zinsen 3%',
      id: 'interest-rate',
      amount: 0.03,
      type: FACTOR_TYPES.INTEREST_RATE,
    },
  ],
}

function updateFieldsOfFactor(factor: Factor, fields: any): Factor {
  if (factor['type'] === FACTOR_TYPES.MONTHLY_OUTCOME) {
    const adjustedFactor = MonthlyOutcomeFactor.changeFields(
      { ...factor },
      fields,
    )
    return MonthlyOutcomeFactor.withReductions(
      adjustedFactor,
      factor.reductions,
    )
  } else if (factor['type'] === FACTOR_TYPES.INCOME) {
    const adjustedFactor = IncomeFactor.changeFields({ ...factor }, fields)
    return MonthlyOutcomeFactor.withReductions(
      adjustedFactor,
      factor.reductions,
    )
  } else if (factor['type'] === FACTOR_TYPES.INVESTMENT_RATE) {
    return InvestmentFactor.changeFields({ ...factor }, fields)
  } else if (factor['type'] === FACTOR_TYPES.INTEREST_RATE) {
    return InterestRateFactor.changeFields({ ...factor }, fields)
  } else if (factor['type'] === FACTOR_TYPES.YEARLY_OUTCOME) {
    const adjustedFactor = YearlyOutcomeFactor.changeFields(
      { ...factor },
      fields,
    )
    return MonthlyOutcomeFactor.withReductions(
      adjustedFactor,
      factor.reductions,
    )
  } else if (factor.type === FACTOR_TYPES.ONE_TIME_EVENT) {
    const adjustedFactor = OneTimeEventFactor.changeFields(
      { ...factor },
      fields,
    )
    return MonthlyOutcomeFactor.withReductions(
      adjustedFactor,
      factor.reductions,
    )
  } else {
    console.log('Could not change factor for type: ', factor.type)
    return factor
  }
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
    setFactors: (state, action: PayloadAction<Array<Factor>>) => {
      state.factors = action.payload
    },
    adjustSetting: (state, action?: PayloadAction<Setting>) => {
      if (action) {
        state[action.payload.name] = action.payload.value
      }
    },
    applyChangeToFactor: (state, action?: PayloadAction<ChangeRequest>) => {
      if (action) {
        const factor = state.factors.find(
          (f: Factor) => f.name === action.payload.name,
        )
        if (factor) {
          state.factors = state.factors.filter(
            (f: Factor) => f.name !== action.payload.name,
          )
          state.factors.push(
            updateFieldsOfFactor(factor, action.payload.fields),
          )
        }
      }
    },
    removeFactor: (state, action?: PayloadAction<string>) => {
      if (action) {
        state.factors = state.factors.filter(
          (factor: Factor) => factor.id !== action.payload,
        )
      }
    },
    removeAllFactors: (state) => {
      state.factors = []
    },
  },
})

export const {
  addFactor,
  removeFactor,
  setFactors,
  removeAllFactors,
  adjustSetting,
  applyChangeToFactor,
} = chartSlice.actions
export const chartReducer = chartSlice.reducer
