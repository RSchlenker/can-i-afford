import { OpenAIToolCall } from '@langchain/core/messages'
import { ChangeRequest } from '@/business/SimulationEngine'

export default class ChangeFactor {
  static toChangeRequest(call: OpenAIToolCall): ChangeRequest {
    const { name, fields } = call.args
    return {
      name,
      fields,
    }
  }
}
