import { useSearchParams } from 'react-router'

export default function useCaseFilters(cases, skills) {
  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get('q') ?? ''
  const rawSkill = searchParams.get('skill')
  const skillId = skills.some((skill) => skill.id === rawSkill) ? rawSkill : 'all'
  const rawSort = searchParams.get('sort')
  const sort = ['hours-asc', 'hours-desc'].includes(rawSort) ? rawSort : 'title'
  const normalizedQuery = query.trim().toLocaleLowerCase('uk')

  const visibleCases = cases.filter((record) => {
    const text = `${record.title} ${record.summary}`.toLocaleLowerCase('uk')
    const matchesSkill = skillId === 'all' || record.skillIds.includes(skillId)
    return text.includes(normalizedQuery) && matchesSkill
  })

  visibleCases.sort((a, b) => {
    let order
    if (sort === 'hours-asc') order = a.hoursSpent - b.hoursSpent
    else if (sort === 'hours-desc') order = b.hoursSpent - a.hoursSpent
    else order = a.title.localeCompare(b.title, 'uk')
    return order || a.id.localeCompare(b.id)
  })

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