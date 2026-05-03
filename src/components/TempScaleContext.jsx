import { createContext, useContext, useState } from 'react'

const TempScaleContext = createContext(null)

export function TempScaleProvider({ children }) {
  const [scale, setScale] = useState('celsius')
  return (
    <TempScaleContext.Provider value={{ scale, setScale }}>
      {children}
    </TempScaleContext.Provider>
  )
}

export function useTempScale() {
  return useContext(TempScaleContext)
}
