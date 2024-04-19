import { predictedChangeAfterYears } from './future.js'
import * as R from 'ramda'

export const etfs = (etfRate) => multiplyWhenPositive(R.__, withRate(etfRate))

export const buySomething = (price, year) =>
  R.ifElse(isYear(year), R.subtract(R.__, price), R.identity)

export const interestRate = (rate) => multiplyWhenNegative(R.__, withRate(rate))
export const income = (amount) => R.add(amount)
export const monthlyIncome = (income) => R.add(12 * income)
export const incomeWithYearlyChange =
  (income, change, startYear) => (money, currentYear) =>
    R.add(
      money,
      predictedChangeAfterYears(startYear, currentYear, change, income),
    )

export const monthlyIncomeWithYearlyChange = (income, change, startYear) =>
  incomeWithYearlyChange(12 * income, change, startYear)

export const outcome = (amount) => R.subtract(R.__, amount)
export const monthlyOutcome = (outcome) => R.subtract(R.__, 12 * outcome)
export const outcomeWithYearlyChange =
  (outcome, change, startYear) => (money, currentYear) =>
    R.subtract(
      money,
      predictedChangeAfterYears(startYear, currentYear, change, outcome),
    )
export const monthlyOutcomeWithYearlyChange = (outcome, change, startYear) =>
  outcomeWithYearlyChange(12 * outcome, change, startYear)

export const multiplyWhenPositive = R.ifElse(
  R.gte(R.__, 0),
  R.multiply,
  R.identity,
)
const multiplyWhenNegative = R.ifElse(R.lt(R.__, 0), R.multiply, R.identity)

export const withRate = (rate) => 1 + rate

export const fromYear = (year, fn) => {
  return (amount, currentYear) => {
    if (currentYear >= year) {
      return fn(amount)
    } else {
      return amount
    }
  }
}

export const untilYear = (year, fn) => {
  return (amount, currentYear) => {
    if (currentYear <= year) {
      return fn(amount, currentYear)
    } else {
      return amount
    }
  }
}

export const fromToYear = (from, to, fn) => {
  return (amount, currentYear) => {
    if (currentYear >= from && currentYear <= to) {
      return fn(amount, currentYear)
    } else {
      return amount
    }
  }
}

export const reduce = (factor, fn) => {
  return (amount, currentYear) => {
    const difference = fn(amount, currentYear) - amount
    return amount + difference * factor
  }
}

export const reducedDuring = (from, to, factor, fn) => {
  return (amount, currentYear) => {
    if (currentYear < from || currentYear >= to) {
      return fn(amount, currentYear)
    } else {
      const difference = fn(amount, currentYear) - amount
      return amount + difference * factor
    }
  }
}

export const withMaxDifference = (maximum, fn) => {
  return (amount, currentYear) => {
    const difference = fn(amount, currentYear) - amount
    if (difference < maximum) {
      return amount + difference
    } else {
      return amount + maximum
    }
  }
}

const isYear = R.curry((year1, _, year2) => {
  return year1 === year2
})
