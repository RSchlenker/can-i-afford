import '@testing-library/jest-dom'

jest.mock('uuid', () => ({ v4: () => Math.random().toString() }))
jest.mock('./app/actions/authenticated', () => () => true)
jest.mock('./app/actions/signIn', () => jest.fn())

const mockResizeObserver = jest.fn().mockImplementation(() => ({
  disconnect: jest.fn(),
  observe: jest.fn(),
  unobserve: jest.fn(),
}))

window.ResizeObserver = window.ResizeObserver || mockResizeObserver
