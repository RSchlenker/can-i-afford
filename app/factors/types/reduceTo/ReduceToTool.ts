import { DynamicStructuredTool } from '@langchain/core/tools'
import { z } from 'zod'

export const reduceToTool = new DynamicStructuredTool({
  name: 'reduceTo',
  description:
    'Reduce or increase a given outcome / income factor for a specified time. If a outcome is adjusted for 40% from 2020 to 2030, this tool should be used to calculate it. Also calculates increases of factors.',
  schema: z.object({
    name: z.string().describe('The name of the outcome/income to be adjusted'),
    factor: z
      .number()
      .describe(
        'The factor to adjust the outcome or income to. For example 0.4 is a 40% reduction.',
      ),
    startYear: z.number().describe('The first year of the reduction.'),
    endYear: z.number().describe('The last year of the reduction.'),
  }),
  func: async ({ name, factor, startYear, endYear }) =>
    `Reduction for: ${name} (${factor}, ${startYear}, ${endYear})`,
} as any)
