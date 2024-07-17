import { OpenAIToolCall } from '@langchain/core/messages'
import { Factor, FACTOR_TYPES } from '@/business/SimulationEngine'
import { fromToYear, outcome } from '@/business/finances'

export default class YearlyOutcomeFactor {
  static toFactor(call: OpenAIToolCall): Factor {
    const { name, amount, startYear, endYear } = call.args
    return {
      name,
      factor: fromToYear(startYear, endYear, outcome(amount)),
      type: FACTOR_TYPES.YEARLY_OUTCOME,
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
    return YearlyOutcomeFactor.toFactor({
      args: {
        ...factor,
        ...fields,
      },
    } as OpenAIToolCall)
  }
}
