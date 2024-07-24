import { OpenAIToolCall } from '@langchain/core/messages'

export interface ActionResponse {
  authenticated: boolean
}

export interface ToolCallResponse extends ActionResponse {
  toolCalls: OpenAIToolCall[]
}
