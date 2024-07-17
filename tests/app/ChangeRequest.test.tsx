import { screen } from '@testing-library/react'
import Page from '../../app/page'
import { renderWithProviders } from '../utils'
import { beforeEach, expect, it } from '@jest/globals'
import { fireEvent } from '@testing-library/dom'
import { act } from 'react'
import { FACTOR_TYPES } from '@/business/SimulationEngine'

jest.mock('../../app/actions/openAIAction', () => {
  return {
    askChatGPT: (): Promise<object[]> => {
      return Promise.resolve(mockFactors)
    },
  }
})

let mockFactors = [] as object[]

beforeEach(async () => {
  renderWithProviders(<Page />)
  const factorBoxes = screen.getAllByTestId('factor-box')
  await act(async () => {
    factorBoxes.forEach(() => {
      fireEvent.click(screen.getByTestId('delete-factor'))
    })
    fireEvent.change(screen.getByTestId('start-volume-input'), {
      target: { value: 0.0 },
    })
  })
})

it('should update existing factor', async () => {
  expect(screen.getByTestId('chart')).toHaveAttribute('data-chart-result', '0')
  await triggerResponseFor([MONTHLY_OUTCOME, CHANGE_AMOUNT_TO_100])
  await click(screen.getByText('Vorstellung hinzufügen'))
  expect(screen.getByTestId('chart')).toHaveAttribute(
    'data-chart-result',
    `${21 * 12 * -100}`,
  )
})

it('should reduce existing factor', async () => {
  await triggerResponseFor([MONTHLY_OUTCOME])
  expect(screen.getByTestId('chart')).toHaveAttribute(
    'data-chart-result',
    `${21 * 12 * -1000}`,
  )
  await triggerResponseFor([REDUCE_FOR_10_YEARS])
  expect(screen.getByTestId('chart')).toHaveAttribute(
    'data-chart-result',
    `${11 * 12 * -1000 + 10 * 12 * -500}`,
  )
  await act(async () => {
    fireEvent.click(screen.getByTestId('show-reductions'))
  })
  expect(screen.getByText('Anpassungen')).toBeInTheDocument()
  expect(screen.getByText('2030 - 2040', { exact: false })).toBeInTheDocument()
  expect(screen.getByText('50%')).toBeInTheDocument()
})

it('should keep reductions when changing an existing factor', async () => {
  await triggerResponseFor([MONTHLY_OUTCOME, REDUCE_FOR_10_YEARS])
  expect(screen.getByTestId('chart')).toHaveAttribute(
    'data-chart-result',
    `${11 * 12 * -1000 + 10 * 12 * -500}`,
  )
  mockFactors = [CHANGE_START_OF_OUTCOME_TO_2025]
  await click(screen.getByText('Vorstellung hinzufügen'))
  expect(screen.getByText('2025 - 2045', { exact: false })).toBeInTheDocument()
  await click(screen.getByTestId('show-reductions'))
  expect(screen.getByText('Anpassungen')).toBeInTheDocument()
  expect(screen.getByText('2030 - 2040', { exact: false })).toBeInTheDocument()
  expect(screen.getByText('50%')).toBeInTheDocument()
})

async function click(element) {
  await act(async () => {
    fireEvent.click(element)
  })
}
async function triggerResponseFor(factors) {
  mockFactors = factors
  return act(async () => {
    fireEvent.click(screen.getByText('Vorstellung hinzufügen'))
  })
}

const MONTHLY_OUTCOME = {
  name: FACTOR_TYPES.MONTHLY_OUTCOME,
  args: {
    name: 'my outcome',
    amount: 1000,
    startYear: 2025,
    endYear: 2045,
  },
}
const CHANGE_AMOUNT_TO_100 = {
  name: FACTOR_TYPES.CHANGE_FACTOR,
  args: {
    name: MONTHLY_OUTCOME.args.name,
    fields: {
      amount: 100,
    },
  },
}
const CHANGE_START_OF_OUTCOME_TO_2025 = {
  name: FACTOR_TYPES.CHANGE_FACTOR,
  args: {
    name: MONTHLY_OUTCOME.args.name,
    fields: {
      startYear: 2025,
    },
  },
}
const REDUCE_FOR_10_YEARS = {
  name: 'reduceTo',
  args: {
    name: MONTHLY_OUTCOME.args.name,
    factor: 0.5,
    startYear: 2030,
    endYear: 2040,
  },
}
