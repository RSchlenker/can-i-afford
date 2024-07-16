import { expect, it } from '@jest/globals'
import { OpenAIToolCall } from '@langchain/core/messages'
import { convertToFactors } from '@/business/adapters/OpenAIIngress'
import {
  ChangeRequest,
  Factor,
  FACTOR_TYPES,
} from '@/business/SimulationEngine'

it('should be able to convert time framed monthlyOutcome', async () => {
  const responseFromOpenAI = [
    {
      name: 'monthlyOutcome',
      args: { amount: 1000, startYear: 2017, endYear: 2020, name: 'Test name' },
    },
  ] as OpenAIToolCall[]
  const { factors }: Factor[] = convertToFactors(responseFromOpenAI)
  expect(factors).toHaveLength(1)
  const { type, startYear, endYear, amount, factor } = factors[0]
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
  const { factors }: Factor[] = convertToFactors(responseFromOpenAI)
  expect(factors).toHaveLength(1)
  const { type, factor, reductions } = factors[0]
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

it('should be able to convert time framed yearly outcome', async () => {
  const responseFromOpenAI = [
    {
      name: 'yearlyOutcome',
      args: { amount: 1000, startYear: 2017, endYear: 2020, name: 'Test name' },
    },
  ] as OpenAIToolCall[]
  const { factors }: Factor[] = convertToFactors(responseFromOpenAI)
  expect(factors).toHaveLength(1)
  const { type, startYear, endYear, amount, factor } = factors[0]
  expect(type).toEqual(FACTOR_TYPES.YEARLY_OUTCOME)
  expect(startYear).toBe(2017)
  expect(endYear).toBe(2020)
  expect(amount).toBe(1000)
  expect(factor(0, 2017)).toBe(-1000)
  expect(factor(0, 2021)).toBe(0)
})

it('should be able to convert time framed monthly income', async () => {
  const responseFromOpenAI = [
    {
      name: 'income',
      args: { amount: 1000, startYear: 2017, endYear: 2020, name: 'Test name' },
    },
  ] as OpenAIToolCall[]
  const { factors }: Factor[] = convertToFactors(responseFromOpenAI)
  expect(factors).toHaveLength(1)
  const { type, startYear, endYear, amount, factor } = factors[0]
  expect(type).toEqual(FACTOR_TYPES.INCOME)
  expect(startYear).toBe(2017)
  expect(endYear).toBe(2020)
  expect(amount).toBe(1000)
  expect(factor(0, 2017)).toBe(12 * 1000)
  expect(factor(0, 2021)).toBe(0)
})

it('should handle one time event', async () => {
  const responseFromOpenAI = [
    {
      name: 'oneTimeEvent',
      args: { amount: 10000, year: 2040, name: 'Ones upon a time' },
    },
  ] as OpenAIToolCall[]
  const { factors }: Factor[] = convertToFactors(responseFromOpenAI)
  expect(factors).toHaveLength(1)
  const { type, year, amount, factor } = factors[0]
  expect(type).toEqual(FACTOR_TYPES.ONE_TIME_EVENT)
  expect(year).toBe(2040)
  expect(amount).toBe(10000)
  expect(factor(0, 2040)).toBe(10000)
  expect(factor(0, 2021)).toBe(0)
})

it('should handle change of start volume', async () => {
  const responseFromOpenAI = [
    {
      name: 'changeStartVolume',
      args: { amount: 10000 },
    },
  ] as OpenAIToolCall[]
  const { settings }: Factor[] = convertToFactors(responseFromOpenAI)
  expect(settings).toHaveLength(1)
  const { name, value } = settings[0]
  expect(name).toEqual('startVolume')
  expect(value).toBe(10000)
})

it('should be able to handle edit requests', async () => {
  const responseFromOpenAI = [
    {
      name: 'changeFactor',
      args: {
        name: 'mein einkommen',
        fields: { amount: 4444 },
      },
    },
  ] as OpenAIToolCall[]
  const { changes }: ChangeRequest[] = convertToFactors(responseFromOpenAI)
  expect(changes).toHaveLength(1)
  const { name, fields } = changes[0]
  expect(name).toEqual('mein einkommen')
  expect(fields).toEqual({ amount: 4444 })
})
