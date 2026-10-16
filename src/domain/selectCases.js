export function selectCases(cases, { query, skillId, sort }) {
  const normalizedQuery = query.trim().toLocaleLowerCase('uk')

  const selected = cases.filter((record) => {
    const text = `${record.title} ${record.summary}`.toLocaleLowerCase('uk')
    const matchesSkill = skillId === 'all' || record.skillIds.includes(skillId)
    return text.includes(normalizedQuery) && matchesSkill
  })

  return selected.sort((a, b) => {
    let order
    if (sort === 'hours-asc') order = a.hoursSpent - b.hoursSpent
    else if (sort === 'hours-desc') order = b.hoursSpent - a.hoursSpent
    else order = a.title.localeCompare(b.title, 'uk')
    return order || a.id.localeCompare(b.id)
  })
}