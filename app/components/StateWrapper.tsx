'use client'

import ReduxProvider from '../../store/ReduxProvider'

export default function StateWrapper({ children }) {
  return <ReduxProvider>{children}</ReduxProvider>
}
