'use client'
import { Field, Label, Textarea } from '@headlessui/react'
import { useState } from 'react'
import { askChatGPT } from './actions/openAIAction'
import { convertToFactors } from '@/business/adapters/OpenAIIngress'
import {
  adjustSetting,
  applyChangeToFactor,
  setFactors,
} from '../store/chartSlice'
import { RootState, useAppDispatch, useAppSelector } from '../store/store'
import LoadingButton from './components/LoadingButton'
import { Factor } from '@/business/SimulationEngine'
import cloneDeep from 'lodash/cloneDeep'

const placeholder = `Ich verdiene 4000 Euro pro Monat.
  Ab 2035 möchte ich nur noch Teilzeit arbeiten: 70% ist genug.
  Nach 10 Jahren arbeite ich dann wieder Vollzeit. 
  Für Urlaub gebe ich 8000 Euro pro Jahr aus.`

export default function AITextForm() {
  const currentFactors: Array<Factor> = useAppSelector(
    (state: RootState) => state.chart.factors,
  )
  const [text, setText] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const [authenticated, setAuthenticated] = useState<boolean>(true)
  const onConfirm = async () => {
    setLoading(true)
    const factorsAsString = currentFactors
      .map((factor) => ({
        name: factor.name,
        amount: factor.amount,
        startYear: factor.startYear,
        endYear: factor.endYear,
      }))
      .map((it) => JSON.stringify(it))
      .join('\n')
    const { authenticated, toolCalls } = await askChatGPT(text, factorsAsString)
    setLoading(false)
    setAuthenticated(authenticated)
    if (!authenticated) {
      return
    }
    const clonedFactors = cloneDeep(currentFactors)
    const { factors, settings, changes } = convertToFactors(
      toolCalls,
      clonedFactors,
    )
    dispatch(setFactors(factors))
    settings.forEach((setting) => {
      dispatch(adjustSetting(setting))
    })
    changes.forEach((change) => {
      dispatch(applyChangeToFactor(change))
    })
    setText('')
  }
  return (
    <div className="p-8">
      <Field>
        <Label className="">Beschreibe deine Zukunftsvorstellung</Label>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          name="Dein Lebensszenario"
          placeholder={placeholder}
          className="w-full flex flex-grow h-52 border-2 rounded-lg focus:outline-none focus:shadow-outline p-2 resize-none whitespace-pre-line"
          data-testid="ai-text-input"
        />
      </Field>
      <div className="flex text-amber-700 pl-3">
        {!authenticated ? (
          <p>You are unauthenticated, please log in to continue</p>
        ) : (
          ''
        )}
        <div className="w-full flex">
          <LoadingButton
            text="Vorstellung hinzufügen"
            isLoading={loading}
            onClick={onConfirm}
          />
        </div>
      </div>
    </div>
  )
}
