import { screen } from '@testing-library/react'
import Page from '../../app/page'
import { renderWithProviders } from '../utils'
import { expect, it } from '@jest/globals'
import { fireEvent } from '@testing-library/dom'
import { act } from 'react'
import { FACTOR_TYPES } from '@/business/SimulationEngine'

jest.mock('../../app/actions/openAIAction', () => {
  return {
    askChatGPT: (text: string): Promise<object[]> => {
      return Promise.resolve([
        {
          name: FACTOR_TYPES.MONTHLY_OUTCOME,
          args: {
            name: 'my outcome',
            amount: 5555,
            startYear: 2025,
            endYear: 2035,
          },
        },
        {
          name: FACTOR_TYPES.CHANGE_FACTOR,
          args: {
            name: 'my outcome',
            fields: {
              amount: 100,
            },
          },
        },
      ])
    },
  }
})

it('should update existing factor', async () => {
  renderWithProviders(<Page />)
  const AITextInput = screen.getByTestId('ai-text-input')
  expect(screen.getByTestId('chart')).toHaveAttribute(
    'data-chart-result',
    '99994',
  )
  await act(async () => {
    fireEvent.change(AITextInput, {
      target: { value: 'Robin verdient 2000 Euro monatlich.' },
    })
    fireEvent.click(screen.getByText('Vorstellung hinzufügen'))
  })
  expect(screen.getByTestId('chart')).toHaveAttribute(
    'data-chart-result',
    '76507',
  )
})
