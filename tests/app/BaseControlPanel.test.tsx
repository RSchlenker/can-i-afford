import { expect, it } from '@jest/globals'
import { renderWithProviders } from '../utils'
import BaseControlPanel from '../../app/BaseControlPanel'
import { fireEvent, screen, within } from '@testing-library/dom'
import { addFactor } from '../../store/chartSlice'
import { income } from '@/business/finances'
import { setupStore } from '../../store/store'
import { act } from 'react'
jest.mock('../../app/actions/openAIAction', () => jest.fn())

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
