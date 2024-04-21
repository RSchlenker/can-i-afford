import { expect, it } from '@jest/globals'
import { renderWithProviders } from '../tests/utils'
import BaseControlPanel from './BaseControlPanel'
import { fireEvent, screen } from '@testing-library/dom'

it('should show the name of a used factor', () => {
  renderWithProviders(<BaseControlPanel />)
  expect(screen.getByText('income'))
  fireEvent.click(screen.getByTestId('add-factor'))
  fireEvent.click(screen.getByText('add income'))
  expect(screen.getAllByText('income')).toHaveLength(2)
})

it('should not show add income button before clicking on +', () => {
  renderWithProviders(<BaseControlPanel />)
  expect(screen.queryByText('add income')).toBeNull()
  fireEvent.click(screen.getByTestId('add-factor'))
  expect(screen.queryByText('add income')).not.toBeNull()
})
