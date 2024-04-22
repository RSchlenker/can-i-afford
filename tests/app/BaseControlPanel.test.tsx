import { expect, it } from '@jest/globals'
import { renderWithProviders } from '../utils'
import BaseControlPanel from '../../app/BaseControlPanel'
import { fireEvent, screen } from '@testing-library/dom'

it('should add a income factor', () => {
  const { store } = renderWithProviders(<BaseControlPanel />)
  fireEvent.click(screen.getByTestId('add-factor'))
  fireEvent.click(screen.getByTestId('add-income'))

  const incomeInput = screen.getByPlaceholderText('Value')
  fireEvent.change(incomeInput, { target: { value: '5000' } })
  const nameInput = screen.getByPlaceholderText('Name')
  fireEvent.change(nameInput, { target: { value: 'anyName' } })
  fireEvent.click(screen.getByText('save'))

  const newFactor = store.getState().chart.factors[1].factor
  const factorName = store.getState().chart.factors[1].name
  expect(newFactor(0)).toBe(5000)
  expect(factorName).toBe('anyName')
  expect(screen.getByTestId('add-factor')).toBeVisible()
})

it('should should hide menu when showing form', () => {
  renderWithProviders(<BaseControlPanel />)
  expect(screen.queryByTestId('add-income')).not.toBeVisible()
  fireEvent.click(screen.getByTestId('add-factor'))
  fireEvent.click(screen.getByTestId('add-income'))
  expect(screen.queryByTestId('add-income')).toBeNull()
  expect(screen.queryByTestId('add-factor')).toBeNull()
})
