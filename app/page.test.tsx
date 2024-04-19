import { screen } from '@testing-library/react'
import Page from './page'
import { renderWithProviders } from '../tests/utils'
import { expect } from '@jest/globals'
import { fireEvent } from '@testing-library/dom'

it('should display heading', () => {
  renderWithProviders(<Page />)
  expect(screen.getByRole('heading')).toHaveTextContent('Can I afford?')
})

it('should update data on button click', () => {
  renderWithProviders(<Page />)
  expect(screen.getByTestId('start-year')).toHaveTextContent('2025')
  fireEvent.click(screen.getByRole('button'))
  expect(screen.getByTestId('start-year')).toHaveTextContent('2015')
})
