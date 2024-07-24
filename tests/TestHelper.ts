import { OpenAIToolCall } from '@langchain/core/messages'
import { ToolCallResponse } from '../app/actions/ActionDTO'
import { act } from 'react'
import { screen } from '@testing-library/react'
import { fireEvent } from '@testing-library/dom'

export function successfulToolCallResponse(
  toolCalls: OpenAIToolCall[],
): ToolCallResponse {
  return {
    authenticated: true,
    toolCalls,
  }
}

export function rejectedToolCallResponse(): ToolCallResponse {
  return {
    authenticated: false,
    toolCalls: [],
  }
}

export async function removeAllExistingFactors() {
  await act(async () => {
    const factorBoxes = screen.queryAllByTestId('factor-box')
    if (factorBoxes !== null) {
      factorBoxes.forEach(() => {
        fireEvent.click(screen.getByTestId('delete-factor'))
      })
      fireEvent.change(screen.getByTestId('start-volume-input'), {
        target: { value: 0.0 },
      })
    }
  })
}
