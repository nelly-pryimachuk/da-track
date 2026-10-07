import { useState } from 'react'

export default function useSkillFilters(items) {
  const [query, setQuery] = useState('')
  const [practicingOnly, setPracticingOnly] = useState(false)

  const normalizedQuery = query.trim().toLocaleLowerCase('uk')
  const visibleItems = items.filter((item) => (
    item.name.toLocaleLowerCase('uk').includes(normalizedQuery)
    && (!practicingOnly || item.status === 'Практикую')
  ))

  function resetFilters() {
    setQuery('')
    setPracticingOnly(false)
  }

  return {
    query,
    setQuery,
    practicingOnly,
    setPracticingOnly,
    visibleItems,
    resetFilters,
  }
}