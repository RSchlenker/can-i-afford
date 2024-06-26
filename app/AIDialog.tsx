import { useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Textarea,
} from '@headlessui/react'
import { FaComment } from 'react-icons/fa6'
import { useAppDispatch } from '../store/store'
import { askChatGPT } from './actions/openAIAction'
import { convertToFactors } from '@/business/adapters/OpenAIIngress'
import { addFactor } from '../store/chartSlice'
import { Circles } from 'react-loader-spinner'

export default function AIDialog({
  onFinished,
  onCancel,
}: {
  onFinished: Function
  onCancel: Function
}) {
  const [open, setOpen] = useState(true)
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  const onConfirm = async () => {
    setLoading(true)
    await askAIModel(text)
    setLoading(false)
    setOpen(false)
    onFinished()
  }

  const reset = () => {
    onCancel()
    setOpen(false)
  }

  const dispatch = useAppDispatch()
  async function askAIModel(question: string) {
    const response = await askChatGPT(question)
    const factors = convertToFactors(response)
    factors.forEach((factor) => {
      dispatch(addFactor(factor))
    })
  }

  return (
    <Dialog className="relative z-10" open={open} onClose={setOpen}>
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-2xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <FaComment />
                </div>
                <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    Beschreibe das Szenario
                  </DialogTitle>
                  <div className="flex mt-2 w-full">
                    <Textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="bg-gray-50 w-full flex flex-grow h-52"
                      name="Dein Lebensszenario"
                    ></Textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex min-w-40 min-h-8 justify-center rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                onClick={onConfirm}
              >
                {loading ? (
                  <Circles
                    height="23"
                    width="23"
                    color="white"
                    ariaLabel="circles-loading"
                  />
                ) : (
                  'Generieren'
                )}
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={reset}
                data-autofocus
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
