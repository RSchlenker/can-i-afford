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
import { changeTool } from '../factors/types/change/changeTool'
import isAuthenticated from './authenticated'
import { ToolCallResponse } from './ActionDTO'

export async function askChatGPT(
  question: string,
  existingFactors: string,
): Promise<ToolCallResponse> {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    return {
      toolCalls: [],
      authenticated: false,
    }
  }
  try {
    const model = new AzureChatOpenAI()
    const llmWithTools = model.bindTools([
      monthlyOutcomeTool,
      yearlyOutcomeTool,
      incomeTool,
      reduceToTool,
      oneTimeEventTool,
      changeStartVolumeTool,
      changeTool,
    ])
    const response = await llmWithTools.invoke([
      ...promptWithExample,
      new HumanMessage(`Current Factors:\n ${existingFactors}`),
      new HumanMessage(question),
    ])
    return {
      authenticated: true,
      toolCalls: response.tool_calls as OpenAIToolCall[],
    }
  } catch (e) {
    console.log(e)
  }
}
