import { screen } from '@testing-library/react'
import Page from '../../app/page'
import { renderWithProviders } from '../utils'
import { beforeEach, expect, it } from '@jest/globals'
import { fireEvent } from '@testing-library/dom'
import { act } from 'react'
import {
  rejectedToolCallResponse,
  removeAllExistingFactors,
  successfulToolCallResponse,
} from '../TestHelper'

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

beforeEach(async () => {
  renderWithProviders(<Page />)
  await removeAllExistingFactors()
})

it('should show loading spinner', async () => {
  const AITextInput = screen.getByTestId('ai-text-input')
  await act(async () => {
    fireEvent.change(AITextInput, {
      target: { value: 'Robin verdient 2000 Euro monatlich.' },
    })
    fireEvent.click(screen.getByText('Vorstellung hinzufügen'))
  })
  expect(screen.getByTestId('ai-loader')).toBeVisible()
  await act(async () => await resolvePromise(successfulToolCallResponse([])))
  expect(screen.queryByTestId('ai-loader')).toBeNull()
})

it('should clear out the text area', async () => {
  const AITextInput = screen.getByTestId('ai-text-input')
  await act(async () => {
    fireEvent.change(AITextInput, {
      target: { value: 'Robin verdient 2000 Euro monatlich.' },
    })
    fireEvent.click(screen.getByText('Vorstellung hinzufügen'))
    await resolvePromise(successfulToolCallResponse([]))
  })
  expect(screen.queryByText('Robin verdient 2000 Euro monatlich.')).toBeNull()
})

it('should show warning if unauthenticated', async () => {
  const AITextInput = screen.getByTestId('ai-text-input')
  expect(screen.getByTestId('chart')).toHaveAttribute('data-chart-result', '0')
  expect(
    screen.queryByText('You are unauthenticated, please log in to continue'),
  ).toBeNull()
  await act(async () => {
    fireEvent.change(AITextInput, {
      target: { value: 'Robin verdient 2000 Euro monatlich.' },
    })
    fireEvent.click(screen.getByText('Vorstellung hinzufügen'))
    resolvePromise(rejectedToolCallResponse())
  })
  expect(screen.getByTestId('chart')).toHaveAttribute('data-chart-result', '0')
  expect(screen.queryByTestId('ai-loader')).toBeNull()
  expect(
    screen.getByText('Robin verdient 2000 Euro monatlich.'),
  ).toBeInTheDocument()
  expect(
    screen.getByText('You are unauthenticated, please log in to continue'),
  ).toBeInTheDocument()
})
