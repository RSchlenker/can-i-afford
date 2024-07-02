import { DynamicStructuredTool } from '@langchain/core/tools'
import { z } from 'zod'
import { FACTOR_TYPES } from '@/business/SimulationEngine'

export const oneTimeEventTool = new DynamicStructuredTool({
  name: FACTOR_TYPES.ONE_TIME_EVENT,
  description:
    'Calculates a one time increase or decrease of money. For example buying something only once in a specified year.',
  schema: z.object({
    name: z.string().describe('The name of the event'),
    amount: z.number().describe('The amount of money. Can also be negative.'),
    year: z.number().describe('The year of the event.'),
  }),
  func: async ({ name, amount }) => `Outcome of: ${name} (${amount})`,
} as any)
