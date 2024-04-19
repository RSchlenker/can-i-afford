import { configureStore } from '@reduxjs/toolkit'
import { chartReducer } from './chartSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: { chart: chartReducer },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  })
}
export const store = setupStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type ChartStore = ReturnType<typeof store>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
