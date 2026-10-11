import { useSearchParams } from 'react-router'

export default function useSkillFilters(items) {
  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get('q') ?? ''
  const practicingOnly = searchParams.get('practicing') === '1'

  const normalizedQuery = query.trim().toLocaleLowerCase('uk')
  const visibleItems = items.filter((item) => (
    item.name.toLocaleLowerCase('uk').includes(normalizedQuery)
    && (!practicingOnly || item.status === 'Практикую')
  ))

  function setQuery(value) {
    const next = new URLSearchParams(searchParams)
    if (value === '') next.delete('q')
    else next.set('q', value)
    setSearchParams(next, { replace: true })
  }

  function setPracticingOnly(value) {
    const next = new URLSearchParams(searchParams)
    if (value) next.set('practicing', '1')
    else next.delete('practicing')
    setSearchParams(next)
  }

  function resetFilters() {
    const next = new URLSearchParams(searchParams)
    next.delete('q')
    next.delete('practicing')
    setSearchParams(next)
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