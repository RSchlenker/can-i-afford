import { OpenAIToolCall } from '@langchain/core/messages'
import { etfs, interestRate } from '@/business/finances'
import { Factor, FACTOR_TYPES } from '@/business/SimulationEngine'
import { uuid } from 'uuidv4'

export default class InterestRateFactor {
  static toFactor(call: OpenAIToolCall): Factor {
    const { name, amount } = call.args
    return {
      name,
      factor: interestRate(amount),
      type: FACTOR_TYPES.INTEREST_RATE,
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
    return InterestRateFactor.toFactor({
      args: {
        ...factor,
        ...fields,
      },
    } as OpenAIToolCall)
  }
}
