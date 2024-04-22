import * as R from 'ramda'
import { etfs } from '../../business/finances'
import { mapAll, multipleYears, oneYear } from '../../business/future'

it('should map multiple functions to one value', () => {
  const mapped = mapAll(1, 2020, [R.add(1), R.add(1)])
  expect(mapped).toBe(3)
})

it('Should calculate etfs on fortune', () => {
  const afterOneYear = oneYear([etfs(0.03)], 2000, 20)
  expect(afterOneYear).toBe(2000 * 1.03)
})

it('Should return volume after 4 years', () => {
  const after4Years = multipleYears([etfs(0.03)], 2022, 4, 2000)
  expect(after4Years).toBe(2000 * 1.03 * 1.03 * 1.03 * 1.03)
})

it('should filter even number', () => {
  const numbers = [1, 2, 3, 4, 5, 6]
  const result = R.filter((number) => number % 2 === 0, numbers)
  expect(result).toEqual([2, 4, 6])
})
