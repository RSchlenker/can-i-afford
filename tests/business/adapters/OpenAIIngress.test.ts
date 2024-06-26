import { expect, it } from '@jest/globals'
import { processUserInput } from '@/business/adapters/OpenAIIngress'
import 'openai/shims/web'
import { AzureChatOpenAI } from '@langchain/openai'

it('should prompt Azure OpenAI', async () => {
  const model = new AzureChatOpenAI()
  const response = await processUserInput(
    model,
    'Ich verdiene 2000 Euro im Monat',
  )
  expect(AzureChatOpenAI).toHaveBeenCalled()
  expect(response).toHaveLength(1)
})
