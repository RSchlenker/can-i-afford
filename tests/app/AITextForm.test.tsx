import { screen } from '@testing-library/react'
import Page from '../../app/page'
import { renderWithProviders } from '../utils'
import { expect, it } from '@jest/globals'
import { fireEvent } from '@testing-library/dom'
import { act } from 'react'

let resolvePromise: Function
jest.mock('../../app/actions/openAIAction', () => {
  return {
    askChatGPT: (text: string): Promise<object[]> => {
      return new Promise((res) => {
        resolvePromise = res
      })
    },
  }
})

it('should show loading spinner', async () => {
  renderWithProviders(<Page />)
  const AITextInput = screen.getByTestId('ai-text-input')
  await act(async () => {
    fireEvent.change(AITextInput, {
      target: { value: 'Robin verdient 2000 Euro monatlich.' },
    })
    fireEvent.click(screen.getByText('Vorstellung hinzufügen'))
  })
  expect(screen.getByTestId('ai-loader')).toBeVisible()
  await act(async () => await resolvePromise([]))
  expect(screen.queryByTestId('ai-loader')).toBeNull()
})

it('should clear out the text area', async () => {
  renderWithProviders(<Page />)
  const AITextInput = screen.getByTestId('ai-text-input')
  await act(async () => {
    fireEvent.change(AITextInput, {
      target: { value: 'Robin verdient 2000 Euro monatlich.' },
    })
    fireEvent.click(screen.getByText('Vorstellung hinzufügen'))
    await resolvePromise([])
  })
  expect(screen.queryByText('Robin verdient 2000 Euro monatlich.')).toBeNull()
})
