import { OpenAIToolCall } from '@langchain/core/messages'
import { fromToYear, monthlyIncome } from '@/business/finances'
import { Factor, FACTOR_TYPES } from '@/business/SimulationEngine'
import { uuid } from 'uuidv4'

export default class IncomeFactor {
  static toFactor(call: OpenAIToolCall): Factor {
    const { name, amount, startYear, endYear } = call.args
    return {
      name,
      factor: fromToYear(startYear, endYear, monthlyIncome(amount)),
      type: FACTOR_TYPES.INCOME,
      amount,
      startYear,
      endYear,
      id: uuid(),
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
    const result = IncomeFactor.toFactor({
      args: {
        ...factor,
        ...fields,
      },
    } as OpenAIToolCall)
    return result
  }
}
