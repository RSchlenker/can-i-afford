import { DynamicStructuredTool } from '@langchain/core/tools'
import { z } from 'zod'
import { FACTOR_TYPES } from '@/business/SimulationEngine'

export const yearlyOutcomeTool = new DynamicStructuredTool({
  name: FACTOR_TYPES.YEARLY_OUTCOME,
  description: 'Calculates a yearly outcome',
  schema: z.object({
    name: z.string().describe('The name of the outcome'),
    amount: z.number().describe('The amount of money of the outcome'),
    startYear: z.number().describe('The first year of the outcome.'),
    endYear: z.number().describe('The last year of the outcome.'),
  }),
  func: async ({ name, amount }) => `Outcome of: ${name} (${amount})`,
} as any)
