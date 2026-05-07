import { createContext, useContext, useState } from 'react'

const PrecipUnitContext = createContext(null)

export function PrecipUnitProvider({ children }) {
  const [unit, setUnit] = useState('mm')
  return (
    <PrecipUnitContext.Provider value={{ unit, setUnit }}>
      {children}
    </PrecipUnitContext.Provider>
  )
}

export function usePrecipUnit() {
  return useContext(PrecipUnitContext)
}
