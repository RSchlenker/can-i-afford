import { DynamicStructuredTool } from '@langchain/core/tools'
import { z } from 'zod'
import { FACTOR_TYPES } from '@/business/SimulationEngine'

export const changeStartVolumeTool = new DynamicStructuredTool({
  name: FACTOR_TYPES.START_VOLUME,
  description: 'Sets the amount of money the simulation begins with',
  schema: z.object({
    amount: z.number().describe('The money the simulation starts with'),
  }),
  func: async ({ name, amount }) => `Outcome of: ${name} (${amount})`,
} as any)
