import { screen } from '@testing-library/react'
import Page from '../../app/page'
import { renderWithProviders } from '../utils'
import { expect, it } from '@jest/globals'
import { fireEvent } from '@testing-library/dom'
import { act } from 'react'
import { FACTOR_TYPES } from '@/business/SimulationEngine'

let mockFactors = [
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
] as object[]

jest.mock('../../app/actions/openAIAction', () => {
  return {
    askChatGPT: (text: string): Promise<object[]> => {
      return Promise.resolve(mockFactors)
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

it('should reduce existing factor', async () => {
  renderWithProviders(<Page />)
  const AITextInput = screen.getByTestId('ai-text-input')
  mockFactors = [
    {
      name: FACTOR_TYPES.REDUCE_TO,
      args: {
        name: 'my outcome',
        factor: 0.5,
        startYear: 2025,
        endYear: 2035,
      },
    },
  ]
  await act(async () => {
    fireEvent.change(AITextInput, {
      target: { value: 'Ich gebe doch nur 1000 Euro monatlich aus' },
    })
    fireEvent.click(screen.getByText('Vorstellung hinzufügen'))
  })
  await act(async () => {
    fireEvent.click(screen.getByTestId('show-reductions'))
  })
  expect(screen.getByText('Anpassungen')).toBeInTheDocument()
  expect(screen.getByText('2025 - 2035', { exact: false })).toBeInTheDocument()
  expect(screen.getByText('50%')).toBeInTheDocument()
})

it('should should keep reductions when changing an existing factor', async () => {
  renderWithProviders(<Page />)
  const AITextInput = screen.getByTestId('ai-text-input')
  mockFactors = [
    {
      name: FACTOR_TYPES.CHANGE_FACTOR,
      args: {
        name: 'my outcome',
        fields: {
          startYear: 2030,
        },
      },
    },
  ]
  await act(async () => {
    fireEvent.change(AITextInput, {
      target: { value: 'Ich gebe doch nur 1000 Euro monatlich aus' },
    })
    fireEvent.click(screen.getByText('Vorstellung hinzufügen'))
  })
  expect(screen.getByText('2030 - 2035', { exact: false })).toBeInTheDocument()
  await act(async () => {
    fireEvent.click(screen.getByTestId('show-reductions'))
  })
  expect(screen.getByText('Anpassungen')).toBeInTheDocument()
  expect(screen.getByText('2025 - 2035', { exact: false })).toBeInTheDocument()
  expect(screen.getByText('50%')).toBeInTheDocument()
})
