'use server'

import { AzureChatOpenAI } from '@langchain/openai'
import {
  monthlyIncomeTool,
  monthlyOutcomeTool,
  promptWithExample,
  reduceToTool,
  yearlyOutcomeTool,
} from '@/business/adapters/OpenAITools'
import { HumanMessage, OpenAIToolCall } from '@langchain/core/messages'

export async function askChatGPT(question: string): Promise<OpenAIToolCall[]> {
  const model = new AzureChatOpenAI({
    azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME,
    azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME,
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiVersion: process.env.AZURE_OPENAI_API_VERSION,
    azureOpenAIBasePath: process.env.AZURE_OPENAI_BASE_PATH,
  })
  const llmWithTools = model.bindTools([
    monthlyOutcomeTool,
    yearlyOutcomeTool,
    monthlyIncomeTool,
    reduceToTool,
  ])
  const response = await llmWithTools.invoke([
    ...promptWithExample,
    new HumanMessage(question),
  ])
  return response.tool_calls as OpenAIToolCall[]
}
