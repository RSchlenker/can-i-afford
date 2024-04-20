import { screen } from '@testing-library/react'
import Page from './page'
import { renderWithProviders } from '../tests/utils'
import { expect, it } from '@jest/globals'
import { fireEvent } from '@testing-library/dom'

it('should display heading', () => {
  renderWithProviders(<Page />)
  expect(screen.getByRole('heading')).toHaveTextContent('Can I afford?')
})

it('should update data on button click', () => {
  renderWithProviders(<Page />)
  expect(screen.getByTestId('start-year')).toHaveTextContent('2025')
  expect(screen.getByTestId('chart')).toHaveAttribute(
    'data-chart-result',
    '50840',
  )
  fireEvent.click(screen.getAllByRole('button')[0])
  expect(screen.getByTestId('start-year')).toHaveTextContent('2015')
  expect(screen.getByTestId('chart')).toHaveAttribute(
    'data-chart-result',
    '51080',
  )
  fireEvent.click(screen.getAllByRole('button')[1])
  expect(screen.getByTestId('chart')).toHaveAttribute(
    'data-chart-result',
    '105080',
  )
})
