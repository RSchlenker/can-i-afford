import * as R from 'ramda'
import { multipleYears } from './future'

export const simulate = (factors, startYear, endYear, startVolume) =>
  R.chain(
    (currentYear) => {
      return {
        year: currentYear,
        volume: multipleYears(
          factors,
          startYear,
          R.range(startYear, currentYear).length,
          startVolume,
        ),
      }
    },
    R.range(startYear, endYear + 1),
  )
