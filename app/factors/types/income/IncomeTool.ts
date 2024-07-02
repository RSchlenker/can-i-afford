import { DynamicStructuredTool } from '@langchain/core/tools'
import { z } from 'zod'
import { FACTOR_TYPES } from '@/business/SimulationEngine'

export const incomeTool = new DynamicStructuredTool({
  name: FACTOR_TYPES.INCOME,
  description: 'Calculates a monthly income',
  schema: z.object({
    name: z.string().describe('The name of the income'),
    amount: z.number().describe('The amount of money of the income'),
    startYear: z.number().describe('The first year of the income.'),
    endYear: z
      .number()
      .describe(
        'The last year of the income. By default it should always be 2060',
      ),
  }),
  func: async ({ name, amount }) => `Outcome of: ${name} (${amount})`,
} as any)
