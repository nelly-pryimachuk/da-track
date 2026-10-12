import { useContext } from 'react'
import { CasesContext } from '../context/CasesContext.js'

export default function useCases() {
  const context = useContext(CasesContext)
  if (context === null) {
    throw new Error('useCases must be used within CasesProvider')
  }
  return context
}