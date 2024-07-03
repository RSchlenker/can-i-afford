import { screen } from '@testing-library/react'
import Page from '../../app/page'
import { renderWithProviders } from '../utils'
import { expect, it } from '@jest/globals'
import { fireEvent } from '@testing-library/dom'
import { act } from 'react'

jest.mock('../../app/actions/openAIAction', () => {
  return {
    askChatGPT: (text: string): Promise<object[]> => {
      return Promise.resolve([
        {
          name: 'monthlyOutcome',
          args: {
            amount: 100,
            startYear: 2025,
            endYear: 2035,
            name: 'Test name',
          },
        },
      ])
    },
  }
})

it('should display heading', () => {
  renderWithProviders(<Page />)
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    'Zukunftsplaner',
  )
})

it('should update data in graph when adding a new factor', async () => {
  renderWithProviders(<Page />)
  expect(screen.getByTestId('chart')).toHaveAttribute(
    'data-chart-result',
    '99994',
  )
  const AITextInput = screen.getByTestId('ai-text-input')
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

it('should add a new outcome to the list of factors', async () => {
  const { store } = renderWithProviders(<Page />)
  const AITextInput = screen.getByTestId('ai-text-input')
  const noOfUsedFactors = screen.getAllByTestId('factor-view').length
  await act(async () => {
    fireEvent.change(AITextInput, {
      target: { value: 'Robin verdient 2000 Euro monatlich.' },
    })
    fireEvent.click(screen.getByText('Vorstellung hinzufügen'))
  })
  expect(screen.getAllByTestId('factor-view')).toHaveLength(noOfUsedFactors + 1)
})
