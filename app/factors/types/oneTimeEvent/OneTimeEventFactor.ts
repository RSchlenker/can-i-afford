import { OpenAIToolCall } from '@langchain/core/messages'
import { Factor, FACTOR_TYPES } from '@/business/SimulationEngine'
import { buySomething } from '@/business/finances'

export default class OneTimeEventFactor {
  static toFactor(call: OpenAIToolCall): Factor {
    const { name, amount, year } = call.args
    return {
      name,
      factor: buySomething(-amount, year),
      type: FACTOR_TYPES.ONE_TIME_EVENT,
      amount,
      year,
    }
  }

  static changeFields(
    factor: Factor,
    fields: {
      name?: string
      amount?: number
      year?: number
    },
  ): Factor {
    return OneTimeEventFactor.toFactor({
      args: {
        ...factor,
        ...fields,
      },
    } as OpenAIToolCall)
  }
}
