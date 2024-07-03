import { Field, Label, Textarea } from '@headlessui/react'
import { useState } from 'react'
import { askChatGPT } from './actions/openAIAction'
import { convertToFactors } from '@/business/adapters/OpenAIIngress'
import { addFactor, adjustSetting } from '../store/chartSlice'
import { useAppDispatch } from '../store/store'
import LoadingButton from './components/LoadingButton'

const placeholder = `Ich verdiene 4000 Euro pro Monat.
  Ab 2035 möchte ich nur noch Teilzeit arbeiten: 70% ist genug.
  Nach 10 Jahren arbeite ich dann wieder Vollzeit. 
  Für Urlaub gebe ich 8000 Euro pro Jahr aus.`

export default function AITextForm() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const onConfirm = async () => {
    setLoading(true)
    const response = await askChatGPT(text)
    const { factors, settings } = convertToFactors(response)
    factors.forEach((factor) => {
      dispatch(addFactor(factor))
    })
    settings.forEach((setting) => {
      dispatch(adjustSetting(setting))
    })
    setLoading(false)
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
      <div className="w-full flex">
        <LoadingButton
          text="Vorstellung hinzufügen"
          isLoading={loading}
          onClick={onConfirm}
        />
      </div>
    </div>
  )
}
