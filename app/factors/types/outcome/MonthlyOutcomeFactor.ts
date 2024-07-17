import { OpenAIToolCall } from '@langchain/core/messages'
import { fromToYear, monthlyOutcome, reducedDuring } from '@/business/finances'
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

  static withReductions(oldFactor: Factor, reductions?: object[]): Factor {
    if (reductions) {
      reductions.forEach(({ startYear, endYear, factor }) => {
        oldFactor.factor = reducedDuring(
          startYear,
          endYear,
          factor,
          oldFactor.factor,
        )
        const reduction = { factor, startYear, endYear }
        oldFactor.reductions
          ? oldFactor.reductions.push(reduction)
          : (oldFactor.reductions = [reduction])
      })
    }
    return oldFactor
  }
}
