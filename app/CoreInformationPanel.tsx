'use client'
import { Field, Input, Label } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../store/store'
import { adjustSetting } from '../store/chartSlice'

export default function CoreInformationPanel() {
  const dispatch = useAppDispatch()

  const startVolume = useAppSelector(
    (state: RootState) => state.chart.startVolume,
  )
  const [shownVolume, setShownVolume] = useState(startVolume)
  useEffect(() => {
    setShownVolume(startVolume)
  }, [startVolume])

  const updateStartVolume = (value: number) => {
    dispatch(adjustSetting({ name: 'startVolume', value }))
  }

  return (
    <div className="p-4 pl-101">
      <h3 className="text-xl">Einstellungen</h3>
      <div className="p-4">
        <Field className="flex items-center gap-4">
          <Label className="">Startkapital:</Label>
          <Input
            type="number"
            value={shownVolume}
            onChange={(e) => updateStartVolume(e.target.value)}
            className="border-x-2 rounded-lg focus:outline-none focus:shadow-outline p-2 w-1/3 text-gray-400 text-center"
            data-testid="start-volume-input"
          />
        </Field>
      </div>
    </div>
  )
}
