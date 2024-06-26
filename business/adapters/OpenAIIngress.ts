import { Factor } from '@/business/SimulationEngine'
import { AzureChatOpenAI } from '@langchain/openai'
import { OpenAIToolCall } from '@langchain/core/messages'
import {
  fromToYear,
  monthlyIncome,
  monthlyOutcome,
  outcome,
  reducedDuring,
} from '@/business/finances'

interface OpenAIResult {
  name: string
  id: string
  args: {
    name: string
  }
}

export async function processUserInput(
  model: AzureChatOpenAI,
  input: string,
): Promise<OpenAIResult[]> {
  return []
}

export function convertToFactors(processResponse: OpenAIToolCall[]): Factor[] {
  const factors = []
  console.log(processResponse)
  processResponse.forEach((toolCall) => {
    const { name, amount, startYear, endYear, factor } = toolCall.args
    if (toolCall.name === 'monthlyIncome') {
      factors.push({
        name,
        factor: fromToYear(startYear, endYear, monthlyIncome(amount)),
      })
    } else if (toolCall.name === 'monthlyOutcome') {
      factors.push({
        name,
        factor: fromToYear(startYear, endYear, monthlyOutcome(amount)),
      })
    } else if (toolCall.name === 'yearlyOutcome') {
      factors.push({
        name,
        factor: fromToYear(startYear, endYear, outcome(amount)),
      })
    } else if (toolCall.name === 'reduceTo') {
      const existingFactor = factors.find((f) => f.name === name)
      existingFactor.factor = reducedDuring(
        startYear,
        endYear,
        factor,
        existingFactor.factor,
      )
    }
  })
  console.log(factors)
  return factors
}
