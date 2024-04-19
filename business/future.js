import * as R from 'ramda'

export const oneYear = R.curry((transformers, startCapital, year) =>
  mapAll(startCapital, year, transformers),
)

export const mapAll = (initialValue, currentYear, transformers) =>
  R.reduce(
    (money, transform) => transform(money, currentYear),
    initialValue,
  )(transformers)

export const multipleYears = (
  transformers,
  startYear,
  numberOfYears,
  startCapital,
) =>
  R.reduce(
    oneYear(transformers),
    startCapital,
    R.range(startYear, startYear + numberOfYears),
  )

export const predictedChangeAfterYears = (
  startYear,
  endYear,
  yearlyChange,
  amount,
) => {
  return R.reduce(
    (acc) => R.multiply(1 + yearlyChange, acc),
    amount,
    R.range(startYear, endYear),
  )
}
