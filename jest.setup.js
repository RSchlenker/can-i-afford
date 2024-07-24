// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Fix unsupported export in uuid library for jest
jest.mock('uuid', () => ({ v4: () => Math.random().toString() }))
jest.mock('./app/actions/authenticated', () => () => true)
jest.mock('./app/actions/signIn', () => jest.fn())

window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }))
