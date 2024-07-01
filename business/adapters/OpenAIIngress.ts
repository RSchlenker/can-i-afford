import { Factor, FACTOR_TYPES } from '@/business/SimulationEngine'
import { OpenAIToolCall } from '@langchain/core/messages'
import {
  buySomething,
  fromToYear,
  monthlyIncome,
  monthlyOutcome,
  outcome,
  reducedDuring,
} from '@/business/finances'

export function convertToFactors(processResponse: OpenAIToolCall[]): Factor[] {
  const factors: Factor[] = []
  processResponse.forEach((toolCall) => {
    const { name, amount, startYear, endYear, factor, year } = toolCall.args
    if (toolCall.name === 'monthlyIncome') {
      factors.push({
        name,
        factor: fromToYear(startYear, endYear, monthlyIncome(amount)),
        type: FACTOR_TYPES.INCOME,
        amount,
        startYear,
        endYear,
      })
    } else if (toolCall.name === 'monthlyOutcome') {
      factors.push({
        name,
        factor: fromToYear(startYear, endYear, monthlyOutcome(amount)),
        type: FACTOR_TYPES.MONTHLY_OUTCOME,
        amount,
        startYear,
        endYear,
      })
    } else if (toolCall.name === 'yearlyOutcome') {
      factors.push({
        name,
        factor: fromToYear(startYear, endYear, outcome(amount)),
        type: FACTOR_TYPES.YEARLY_OUTCOME,
        amount,
        startYear,
        endYear,
      })
    } else if (toolCall.name === 'reduceTo') {
      const existingFactor = factors.find((f) => f.name === name)
      existingFactor.factor = reducedDuring(
        startYear,
        endYear,
        factor,
        existingFactor.factor,
      )
      const reduction = { factor, startYear, endYear }
      existingFactor.reductions
        ? existingFactor.reductions.push(reduction)
        : (existingFactor.reductions = [reduction])
    } else if (toolCall.name === 'oneTimeEvent') {
      factors.push({
        name,
        factor: buySomething(-amount, year),
        type: FACTOR_TYPES.ONE_TIME_EVENT,
        amount,
        year,
      })
    }
  })
  return factors
}
