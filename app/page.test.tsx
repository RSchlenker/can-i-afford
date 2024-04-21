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
  expect(screen.getByTestId('chart')).toHaveAttribute(
    'data-chart-result',
    '50840',
  )
  fireEvent.click(screen.getByTestId('add-factor'))
  fireEvent.click(screen.getByTestId('add-income'))

  const incomeInput = screen.getByPlaceholderText('Value')
  fireEvent.change(incomeInput, { target: { value: '5000' } })
  const nameInput = screen.getByPlaceholderText('Name')
  fireEvent.change(nameInput, { target: { value: 'anyName' } })
  fireEvent.click(screen.getByText('save'))
  expect(screen.getByTestId('chart')).toHaveAttribute(
    'data-chart-result',
    '225840',
  )
})
