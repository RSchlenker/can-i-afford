import { expect, it } from '@jest/globals'
import { OpenAIToolCall } from '@langchain/core/messages'
import { convertToFactors } from '@/business/adapters/OpenAIIngress'
import { Factor, FACTOR_TYPES } from '@/business/SimulationEngine'

it('should be able to convert time framed monthlyOutcome', async () => {
  const responseFromOpenAI = [
    {
      name: 'monthlyOutcome',
      args: { amount: 1000, startYear: 2017, endYear: 2020, name: 'Test name' },
    },
  ] as OpenAIToolCall[]
  const result: Factor[] = convertToFactors(responseFromOpenAI)
  expect(result).toHaveLength(1)
  const { type, startYear, endYear, amount, factor } = result[0]
  expect(type).toEqual(FACTOR_TYPES.MONTHLY_OUTCOME)
  expect(startYear).toBe(2017)
  expect(endYear).toBe(2020)
  expect(amount).toBe(1000)
  expect(factor(0, 2017)).toBe(12 * -1000)
  expect(factor(0, 2021)).toBe(0)
})

it('should add reductions', async () => {
  const responseFromOpenAI = [
    {
      name: 'monthlyOutcome',
      args: { amount: 1000, startYear: 2017, endYear: 2030, name: 'Test name' },
    },
    {
      name: 'reduceTo',
      args: { factor: 0.5, startYear: 2017, endYear: 2020, name: 'Test name' },
    },
  ] as OpenAIToolCall[]
  const result: Factor[] = convertToFactors(responseFromOpenAI)
  expect(result).toHaveLength(1)
  const { type, factor, reductions } = result[0]
  expect(type).toEqual(FACTOR_TYPES.MONTHLY_OUTCOME)
  expect(factor(0, 2017)).toBe(12 * -1000 * 0.5)
  expect(factor(0, 2021)).toBe(12 * -1000)
  if (reductions) {
    expect(reductions).toHaveLength(1)
    expect(reductions[0].factor).toBe(0.5)
    expect(reductions[0].startYear).toBe(2017)
    expect(reductions[0].endYear).toBe(2020)
  }
})
