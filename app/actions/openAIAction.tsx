'use server'

import { AzureChatOpenAI } from '@langchain/openai'
import { promptWithExample } from './OpenAITools'
import { HumanMessage, OpenAIToolCall } from '@langchain/core/messages'
import { incomeTool } from '../factors/types/income/IncomeTool'
import { monthlyOutcomeTool } from '../factors/types/outcome/MonthlyOutcomeTool'
import { yearlyOutcomeTool } from '../factors/types/outcome/YearlyOutcomeTool'
import { oneTimeEventTool } from '../factors/types/oneTimeEvent/OneTimeEventTool'
import { reduceToTool } from '../factors/types/reduceTo/ReduceToTool'
import { changeStartVolumeTool } from '../factors/types/settings/ChangeStartVolumeTool'

export async function askChatGPT(question: string): Promise<OpenAIToolCall[]> {
  const model = new AzureChatOpenAI()
  const llmWithTools = model.bindTools([
    monthlyOutcomeTool,
    yearlyOutcomeTool,
    incomeTool,
    reduceToTool,
    oneTimeEventTool,
    changeStartVolumeTool,
  ])
  const response = await llmWithTools.invoke([
    ...promptWithExample,
    new HumanMessage(question),
  ])
  return response.tool_calls as OpenAIToolCall[]
}
