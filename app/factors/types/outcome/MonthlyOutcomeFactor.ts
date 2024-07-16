import { OpenAIToolCall } from '@langchain/core/messages'
import { fromToYear, monthlyOutcome } from '@/business/finances'
import { Factor, FACTOR_TYPES } from '@/business/SimulationEngine'

export default class MonthlyOutcomeFactor {
  static toFactor(call: OpenAIToolCall): Factor {
    const { name, amount, startYear, endYear } = call.args
    return {
      name,
      factor: fromToYear(startYear, endYear, monthlyOutcome(amount)),
      type: FACTOR_TYPES.MONTHLY_OUTCOME,
      amount,
      startYear,
      endYear,
    }
  }

  static changeFields(
    factor: Factor,
    fields: {
      name?: string
      amount?: number
      startYear?: number
      endYear?: number
    },
  ): Factor {
    const result = MonthlyOutcomeFactor.toFactor({
      args: {
        ...factor,
        ...fields,
      },
    } as OpenAIToolCall)
    return result
  }
}
