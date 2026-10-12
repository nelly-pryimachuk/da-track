import { useState } from 'react'
import { CasesContext } from '../context/CasesContext.js'
import { cases as initialCases } from '../data/cases.js'
import { validateCase } from '../domain/caseValidation.js'

export default function CasesProvider({ items, children }) {
  const [cases, setCases] = useState(() => (
    initialCases.map((entry) => ({ ...entry, skillIds: [...entry.skillIds] }))
  ))
  const [notice, setNotice] = useState('')

  function createCase(input) {
    const validation = validateCase(input, items)
    if (!validation.ok) return validation

    const record = {
      id: `case-${crypto.randomUUID()}`,
      ...validation.value,
    }
    setCases((previous) => [...previous, record])
    setNotice('Кейс створено в поточній локальній колекції.')
    return { ok: true, record }
  }

  function updateCase(id, input) {
    const current = cases.find((entry) => entry.id === id)
    if (!current) return { ok: false, message: 'Кейс для оновлення не знайдено.' }

    const validation = validateCase(input, items)
    if (!validation.ok) return validation

    const record = { ...validation.value, id: current.id }
    setCases((previous) => previous.map((entry) => (
      entry.id === id ? record : entry
    )))
    setNotice('Зміни кейсу збережено в поточній локальній колекції.')
    return { ok: true, record }
  }

  function deleteCase(id) {
    if (!cases.some((entry) => entry.id === id)) {
      return { ok: false, message: 'Кейс для видалення не знайдено.' }
    }
    setCases((previous) => previous.filter((entry) => entry.id !== id))
    setNotice('Кейс видалено з поточної локальної колекції.')
    return { ok: true }
  }

  function dismissNotice() {
    setNotice('')
  }

  return (
    <CasesContext.Provider value={{
      cases, createCase, updateCase, deleteCase,
      notice, dismissNotice,
    }}>
      {children}
    </CasesContext.Provider>
  )
}