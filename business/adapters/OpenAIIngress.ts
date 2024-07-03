import { Factor, FACTOR_TYPES, Setting } from '@/business/SimulationEngine'
import { OpenAIToolCall } from '@langchain/core/messages'
import { reducedDuring } from '@/business/finances'
import IncomeFactor from '../../app/factors/types/income/IncomeFactor'
import MonthlyOutcomeFactor from '../../app/factors/types/outcome/MonthlyOutcomeFactor'
import YearlyOutcomeFactor from '../../app/factors/types/outcome/YearlyOutcomeFactor'
import OneTimeEventFactor from '../../app/factors/types/oneTimeEvent/OneTimeEventFactor'
import StartVolumeSetting from '../../app/factors/types/settings/StartVolumeSetting'

export function convertToFactors(processResponse: OpenAIToolCall[]): {
  factors: Factor[]
  settings: Setting[]
} {
  const factors: Factor[] = []
  const settings: Setting[] = []
  processResponse.forEach((toolCall) => {
    if (toolCall.name === FACTOR_TYPES.INCOME) {
      factors.push(IncomeFactor.toFactor(toolCall))
    } else if (toolCall.name === FACTOR_TYPES.MONTHLY_OUTCOME) {
      factors.push(MonthlyOutcomeFactor.toFactor(toolCall))
    } else if (toolCall.name === FACTOR_TYPES.YEARLY_OUTCOME) {
      factors.push(YearlyOutcomeFactor.toFactor(toolCall))
    } else if (toolCall.name === 'reduceTo') {
      reduceFactor(factors, toolCall.args)
    } else if (toolCall.name === FACTOR_TYPES.ONE_TIME_EVENT) {
      factors.push(OneTimeEventFactor.toFactor(toolCall))
    } else if (toolCall.name === FACTOR_TYPES.START_VOLUME) {
      settings.push(StartVolumeSetting.toSetting(toolCall))
    }
  })
  return { factors, settings }
}

function reduceFactor(factors: Factor[], { name, startYear, endYear, factor }) {
  const existingFactor = factors.find((f) => f.name === name)
  existingFactor.factor = reducedDuring(
    startYear,
    endYear,
    factor,
    existingFactor.factor,
  )
  const reduction = { factor, startYear, endYear }
  existingFactor.reductions
    ? existingFactor.reductions.push(reduction)
    : (existingFactor.reductions = [reduction])
}
