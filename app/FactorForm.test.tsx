import { expect, it } from '@jest/globals'
import { renderWithProviders } from '../tests/utils'
import BaseControlPanel from './BaseControlPanel'
import { fireEvent, screen } from '@testing-library/dom'

it('should close the form before finishing', () => {
  renderWithProviders(<BaseControlPanel />)
  expect(screen.queryByTestId('add-factor')).not.toBeNull()
  fireEvent.click(screen.getByTestId('add-factor'))
  fireEvent.click(screen.getByTestId('add-income'))
  expect(screen.queryByTestId('add-factor')).toBeNull()
  fireEvent.click(screen.getByTestId('close-form'))
  expect(screen.queryByTestId('add-factor')).not.toBeNull()
})
