import { OpenAIToolCall } from '@langchain/core/messages'
import { etfs } from '@/business/finances'
import { Factor, FACTOR_TYPES } from '@/business/SimulationEngine'
import { uuid } from 'uuidv4'

export default class InvestmentFactor {
  static toFactor(call: OpenAIToolCall): Factor {
    const { name, amount } = call.args
    return {
      name,
      factor: etfs(amount),
      type: FACTOR_TYPES.INVESTMENT_RATE,
      amount,
      id: uuid(),
    }
  }

  static changeFields(
    factor: Factor,
    fields: {
      name?: string
      amount?: number
    },
  ): Factor {
    return InvestmentFactor.toFactor({
      args: {
        ...factor,
        ...fields,
      },
    } as OpenAIToolCall)
  }
}
