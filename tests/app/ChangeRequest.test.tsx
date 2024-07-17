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
  expectChartResultToBe(0)
})

it('should update existing factor', async () => {
  expect(screen.getByTestId('chart')).toHaveAttribute('data-chart-result', '0')
  await triggerResponseFor([MONTHLY_OUTCOME, CHANGE_AMOUNT_TO_100])
  await click(screen.getByText('Vorstellung hinzufügen'))
  expectChartResultToBe(21 * 12 * -100)
})

it('should reduce existing factor', async () => {
  await triggerResponseFor([MONTHLY_OUTCOME])
  expectChartResultToBe(21 * 12 * -1000)
  await triggerResponseFor([REDUCE_FOR_10_YEARS])
  expectChartResultToBe(11 * 12 * -1000 + 10 * 12 * -500)
  await click(screen.getByTestId('show-reductions'))
  expect(screen.getByText('Anpassungen')).toBeInTheDocument()
  expect(screen.getByText('2030 - 2040', { exact: false })).toBeInTheDocument()
  expect(screen.getByText('50%')).toBeInTheDocument()
})

it('should keep reductions when changing an existing factor', async () => {
  await triggerResponseFor([MONTHLY_OUTCOME, REDUCE_FOR_10_YEARS])
  expectChartResultToBe(11 * 12 * -1000 + 10 * 12 * -500)
  mockFactors = [CHANGE_START_OF_OUTCOME_TO_2025]
  await click(screen.getByText('Vorstellung hinzufügen'))
  expect(screen.getByText('2025 - 2045', { exact: false })).toBeInTheDocument()
  await click(screen.getByTestId('show-reductions'))
  expect(screen.getByText('Anpassungen')).toBeInTheDocument()
  expect(screen.getByText('2030 - 2040', { exact: false })).toBeInTheDocument()
  expect(screen.getByText('50%')).toBeInTheDocument()
})

it('should change the name of an existing factor', async () => {
  await triggerResponseFor([MONTHLY_OUTCOME])
  expect(screen.queryByText('new outcome name')).not.toBeInTheDocument()
  await triggerResponseFor([CHANGE_OF_NAME])
  expect(screen.queryByText('new outcome name')).toBeInTheDocument()
})

it('should change income', async () => {
  await triggerResponseFor([MONTHLY_INCOME])
  expectChartResultToBe(10 * 12 * 1000)
  await triggerResponseFor([CHANGE_INCOME_TO_100])
  expectChartResultToBe(10 * 12 * 100)
})

it('should change yearly outcome', async () => {
  await triggerResponseFor([YEARLY_OUTCOME])
  expectChartResultToBe(21 * -1000)
  await triggerResponseFor([CHANGE_YEARLY_OUTCOME_TO_100])
  expectChartResultToBe(21 * -100)
})

it('should change one time event', async () => {
  await triggerResponseFor([ONE_TIME_EVENT])
  expectChartResultToBe(1000)
  await triggerResponseFor([CHANGE_ONE_TIME_EVENT_TO_100])
  expectChartResultToBe(100)
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
function expectChartResultToBe(value: number) {
  expect(screen.getByTestId('chart')).toHaveAttribute(
    'data-chart-result',
    `${value}`,
  )
}

const MONTHLY_INCOME = {
  name: FACTOR_TYPES.INCOME,
  args: {
    name: 'my income',
    amount: 1000,
    startYear: 2025,
    endYear: 2034,
  },
}
const CHANGE_INCOME_TO_100 = {
  name: FACTOR_TYPES.CHANGE_FACTOR,
  args: {
    name: MONTHLY_INCOME.args.name,
    fields: {
      amount: 100,
    },
  },
}

const ONE_TIME_EVENT = {
  name: FACTOR_TYPES.ONE_TIME_EVENT,
  args: {
    name: 'my event',
    amount: 1000,
    year: 2025,
  },
}
const CHANGE_ONE_TIME_EVENT_TO_100 = {
  name: FACTOR_TYPES.CHANGE_FACTOR,
  args: {
    name: ONE_TIME_EVENT.args.name,
    fields: {
      amount: 100,
    },
  },
}

const YEARLY_OUTCOME = {
  name: FACTOR_TYPES.YEARLY_OUTCOME,
  args: {
    name: 'my yearly outcome',
    amount: 1000,
    startYear: 2025,
    endYear: 2045,
  },
}
const CHANGE_YEARLY_OUTCOME_TO_100 = {
  name: FACTOR_TYPES.CHANGE_FACTOR,
  args: {
    name: YEARLY_OUTCOME.args.name,
    fields: {
      amount: 100,
    },
  },
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
const CHANGE_OF_NAME = {
  name: FACTOR_TYPES.CHANGE_FACTOR,
  args: {
    name: MONTHLY_OUTCOME.args.name,
    fields: {
      name: 'new outcome name',
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
