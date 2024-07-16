import { DynamicStructuredTool } from '@langchain/core/tools'
import { z } from 'zod'
import { FACTOR_TYPES } from '@/business/SimulationEngine'

export const changeTool = new DynamicStructuredTool({
  name: FACTOR_TYPES.CHANGE_FACTOR,
  description: 'Adjust an existing factor',
  schema: z.object({
    name: z.string().describe('The name of the factor to be adjusted'),
    fields: z.object({
      name: z.string().describe('The new name of the factor').optional(),
      amount: z.number().describe('The new amount of the factor').optional(),
      startYear: z.number().describe('The new start year').optional(),
      endYear: z.number().describe('the new end year').optional(),
    }),
  }),
  func: async ({ name, amount }) => `Outcome of: ${name} (${amount})`,
} as any)
