import { DynamicStructuredTool } from '@langchain/core/tools'
import { z } from 'zod'
import {
  AIMessage,
  HumanMessage,
  SystemMessage,
  ToolMessage,
} from '@langchain/core/messages'

export const monthlyOutcomeTool = new DynamicStructuredTool({
  name: 'monthlyOutcome',
  description: 'Calculates the monthly outcome',
  schema: z.object({
    name: z.string().describe('The name of the outcome'),
    amount: z.number().describe('The amount of money of the outcome'),
    startYear: z.number().describe('The first year of the outcome.'),
    endYear: z
      .number()
      .describe(
        'The last year of the outcome. By default it should always be 2060',
      ),
  }),
  func: async ({ name, amount }) => `Outcome of: ${name} (${amount})`,
} as any)

export const monthlyIncomeTool = new DynamicStructuredTool({
  name: 'monthlyIncome',
  description: 'Calculates the monthly income',
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

export const yearlyOutcomeTool = new DynamicStructuredTool({
  name: 'yearlyOutcome',
  description: 'Calculates a yearly outcome',
  schema: z.object({
    name: z.string().describe('The name of the outcome'),
    amount: z.number().describe('The amount of money of the outcome'),
    startYear: z.number().describe('The first year of the outcome.'),
    endYear: z.number().describe('The last year of the outcome.'),
  }),
  func: async ({ name, amount }) => `Outcome of: ${name} (${amount})`,
} as any)

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

export const promptWithExample = [
  new SystemMessage(`Du bist ein sehr erfahrener Informatiker der Tools ausführen soll. Es ist wichtig dass du dich an die Regeln hältst die ich vorgebe. Erfinde nichts außerhalb der gegebenen Regeln. Im Folgenden beschreibe ich ein Szenario und du musst die richtigen Tools auswählen um das Szenario zu erfüllen. 

## Regeln ##
Nutze nur die übergebenen Tools
Nutze für jede Berechnung einen neuen Tool Aufruf
Jeder Name der Tools muss eindeutig sein und darf kein zweites mal vorkommen.
Um Einflüsse zu reduzieren zum Beispiel für eine Pflege nutze das reduceTo tool.
Eine Reduzierung kann nicht länger dauern als das Ende eines Einkommens / Auskommens.
Setze das endYear bei Income und Outcome auf 2060 es sei denn das Szenario nennt ein anderes Datum.
Wenn das startYear nicht angegeben ist nutze 2025.
Nutze für die Namen der Faktoren die selbe Sprache wie im Szenario.
Wenn eine Einkommen oder auskommen reduziert wird ist sein endYear mindestens so lange wie die Reduzierung.
Mache alle Berechnungen auf einmal.
Berechne alle Reduzierungen direkt mit.`),
  new HumanMessage(
    'Norbert hat eine Rente von 4000 Euro. Christine hat eine Rente von 1200 Euro. Norbert stirbt 2040 und die Witwenrente ist dann nur noch 60% Prozent von dem vorherigen Betrag. Für Urlaub wird jährlich 15000 Euro ausgegeben. Wenn Norbert stirbt sind die Urlaubskosten halbiert.',
  ),
  new AIMessage({
    content: '',
    tool_calls: [
      {
        name: 'monthlyIncome',
        args: {
          name: 'Rente Norbert',
          amount: 4000,
          startYear: 2025,
          endYear: 2060,
        },
        id: '1',
      },
      {
        name: 'monthlyIncome',
        args: {
          name: 'Rente Christine',
          amount: 1200,
          startYear: 2025,
          endYear: 2060,
        },
        id: '2',
      },
      {
        name: 'reduceTo',
        args: {
          name: 'Rente Norbert',
          factor: 0.6,
          startYear: 2040,
          endYear: 2060,
        },
        id: '3',
      },
      {
        name: 'yearlyOutcome',
        args: { name: 'Urlaub', amount: 15000, startYear: 2025, endYear: 2060 },
        id: '4',
      },
      {
        name: 'reduceTo',
        args: { name: 'Urlaub', factor: 0.5, startYear: 2040, endYear: 2060 },
        id: '5',
      },
    ],
  }),
  new ToolMessage({
    tool_call_id: '1',
    content: '',
  }),
  new ToolMessage({
    tool_call_id: '2',
    content: '',
  }),
  new ToolMessage({
    tool_call_id: '3',
    content: '',
  }),
  new ToolMessage({
    tool_call_id: '4',
    content: '',
  }),
  new ToolMessage({
    tool_call_id: '5',
    content: '',
  }),
  new AIMessage({
    content: `Done`,
  }),
]
