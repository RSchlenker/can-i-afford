'use client'
import { RootState, useAppSelector } from '../store/store'
import { Factor } from '@/business/SimulationEngine'
import { useEffect, useState } from 'react'
import FactorView from './factors/FactorView'

export default function BaseControlPanel() {
  const factors: Array<Factor> = useAppSelector(
    (state: RootState) => state.chart.factors,
  )
  const [factorsToDisplay, setFactors] = useState(factors)
  useEffect(() => {
    setFactors(factors)
  }, [factors])

  return (
    <div className="flex my-10 flex-grow mx-20 border-2 relative">
      <div className="p-10 w-full flex flex-wrap">
        {factorsToDisplay.map((factor) => {
          return (
            <div key={factor.id || Math.random()} className="m-3">
              <FactorView factor={factor} />{' '}
            </div>
          )
        })}
      </div>
    </div>
  )
}
