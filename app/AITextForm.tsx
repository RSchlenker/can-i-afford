import { Field, Label, Textarea } from '@headlessui/react'
import { useState } from 'react'
import { askChatGPT } from './actions/openAIAction'
import { Circles } from 'react-loader-spinner'
import { convertToFactors } from '@/business/adapters/OpenAIIngress'
import { addFactor } from '../store/chartSlice'
import { useAppDispatch } from '../store/store'

export default function AITextForm() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const onConfirm = async () => {
    setLoading(true)
    const response = await askChatGPT(text)
    const factors = convertToFactors(response)
    factors.forEach((factor) => {
      dispatch(addFactor(factor))
    })
    setLoading(false)
    setText('')
  }
  const placeholder = `Ich verdiene 4000 Euro pro Monat.
  Ab 2035 möchte ich nur noch Teilzeit arbeiten: 70% ist genug.
  Nach 10 Jahren arbeite ich dann wieder Vollzeit. 
  Für Urlaub gebe ich 8000 Euro pro Jahr aus.`
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
        <button
          type="button"
          className="inline-flex min-w-40 min-h-8 justify-center rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 sm:w-auto ml-auto mt-3 focus:outline-none focus:shadow-outline focus:bg-emerald-600"
          onClick={onConfirm}
        >
          {loading ? (
            <div data-testid="ai-loader">
              <Circles
                height="23"
                width="23"
                color="white"
                ariaLabel="circles-loading"
              />
            </div>
          ) : (
            'Vorstellung hinzufügen'
          )}
        </button>
      </div>
    </div>
  )
}
