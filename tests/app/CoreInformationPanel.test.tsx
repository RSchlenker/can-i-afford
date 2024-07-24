import { expect, it } from '@jest/globals'
import { renderWithProviders } from '../utils'
import Page from '../../app/page'
import { screen } from '@testing-library/react'
import { fireEvent } from '@testing-library/dom'
import { act } from 'react'
import { successfulToolCallResponse } from '../TestHelper'
import { ToolCallResponse } from '../../app/actions/ActionDTO'
import { OpenAIToolCall } from '@langchain/core/messages'

let nextStartVolume = 10000

jest.mock('../../app/actions/openAIAction', () => {
  return {
    askChatGPT: (text: string): Promise<ToolCallResponse> => {
      return Promise.resolve(
        successfulToolCallResponse([
          {
            name: 'changeStartVolume',
            args: {
              amount: nextStartVolume,
            },
          },
        ] as OpenAIToolCall[]),
      )
    },
  }
})

it('should be able to adjust the start volume with chatGPT', async () => {
  renderWithProviders(<Page />)
  expect(screen.getByTestId('chart')).toHaveAttribute(
    'data-chart-result',
    '99994',
  )
  const AITextInput = screen.getByTestId('ai-text-input')
  await act(async () => {
    fireEvent.change(AITextInput, {
      target: { value: 'Derzeit habe ich 10000 Euro' },
    })
    fireEvent.click(screen.getByText('Vorstellung hinzufügen'))
  })
  expect(screen.getByTestId('chart')).toHaveAttribute(
    'data-chart-result',
    '19999',
  )
  expect(screen.getByDisplayValue('10000')).toBeInTheDocument()
})

it('should be able to adjust the start volume in UI', async () => {
  renderWithProviders(<Page />)
  const startVolumeInput = screen.getByTestId('start-volume-input')
  expect(screen.getByDisplayValue('10000')).toBeInTheDocument()
  await act(async () => {
    fireEvent.change(startVolumeInput, {
      target: { value: '555' },
    })
  })
  expect(screen.getByDisplayValue('555')).toBeInTheDocument()
  expect(screen.getByTestId('chart')).toHaveAttribute(
    'data-chart-result',
    '1110',
  )
})
