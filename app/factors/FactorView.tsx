import { Factor, FACTOR_TYPES } from '@/business/SimulationEngine'
import { FaArrowTrendUp } from 'react-icons/fa6'
import IncomeFactorView from './IncomeFactorView'
import OutcomeFactorView from './OutcomeFactorView'
import OneTimeEventFactorView from './OneTimeEventFactorView'
import FactorBox from './FactorBox'

export default function FactorView({ factor }: { factor: Factor }) {
  return (
    <div data-testid="factor-view" key={factor.id || Math.random()}>
      {renderCorrectFactorView(factor)}
    </div>
  )
}

const renderCorrectFactorView = (factor: Factor) => {
  switch (factor.type) {
    case FACTOR_TYPES.INCOME:
      return <IncomeFactorView factor={factor} />
    case FACTOR_TYPES.MONTHLY_OUTCOME:
    case FACTOR_TYPES.YEARLY_OUTCOME:
      return <OutcomeFactorView factor={factor} />
    case FACTOR_TYPES.ONE_TIME_EVENT:
      return <OneTimeEventFactorView factor={factor} />
    default:
      return (
        <FactorBox Icon={FaArrowTrendUp} id={factor.id!}>
          <p className="font-semibold">{factor.name}</p>
        </FactorBox>
      )
  }
}
