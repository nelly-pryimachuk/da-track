import { useSearchParams } from 'react-router'
import { selectCases } from '../domain/selectCases.js'

export default function useCaseFilters(cases, skills) {
  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get('q') ?? ''
  const rawSkill = searchParams.get('skill')
  const skillId = skills.some((skill) => skill.id === rawSkill) ? rawSkill : 'all'
  const rawSort = searchParams.get('sort')
  const sort = ['hours-asc', 'hours-desc'].includes(rawSort) ? rawSort : 'title'
  const visibleCases = selectCases(cases, { query, skillId, sort })
  
  function setParameter(name, value, defaultValue, replace = false) {
    const next = new URLSearchParams(searchParams)
    if (value === defaultValue) next.delete(name)
    else next.set(name, value)
    setSearchParams(next, { replace })
  }

  function resetFilters() {
    const next = new URLSearchParams(searchParams)
    next.delete('q')
    next.delete('skill')
    next.delete('sort')
    setSearchParams(next)
  }

  return {
    query,
    skillId,
    sort,
    visibleCases,
    setQuery: (value) => setParameter('q', value, '', true),
    setSkill: (value) => setParameter('skill', value, 'all'),
    setSort: (value) => setParameter('sort', value, 'title'),
    resetFilters,
  }
}