import { expect, it } from '@jest/globals'
import { renderWithProviders } from '../utils'
import BaseControlPanel from '../../app/BaseControlPanel'
import { fireEvent, screen, within } from '@testing-library/dom'
import { addFactor } from '../../store/chartSlice'
import { income } from '@/business/finances'
import { setupStore } from '../../store/store'
import { act } from 'react'
jest.mock('../../app/actions/openAIAction', () => jest.fn())

it.skip('should add a income factor', () => {
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

it.skip('should hide menu when showing form', () => {
  renderWithProviders(<BaseControlPanel />)
  expect(screen.queryByTestId('add-income')).not.toBeVisible()
  fireEvent.click(screen.getByTestId('add-factor'))
  fireEvent.click(screen.getByTestId('add-income'))
  expect(screen.queryByTestId('add-income')).toBeNull()
  expect(screen.queryByTestId('add-factor')).toBeNull()
})

it('should be able to delete factors', async () => {
  const store = setupStore()
  store.dispatch(addFactor({ factor: income(10), name: 'test-factor' }))
  store.dispatch(addFactor({ factor: income(10), name: 'test-factor-2' }))
  renderWithProviders(<BaseControlPanel />, { store })
  const usedFactor = screen.getByText('test-factor')
  const deleteButton = within(
    usedFactor.closest('[data-testid=factor-view]'),
  ).getByTestId('delete-factor')
  expect(screen.queryByText('test-factor')).not.toBeNull()
  await act(() => {
    fireEvent.click(deleteButton)
  })
  expect(screen.queryByText('test-factor')).toBeNull()
  expect(screen.queryByText('test-factor-2')).not.toBeNull()
})
