import { useState } from 'react'
import { Link } from 'react-router'
import PageHeading from '../components/ui/PageHeading.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import AppButton from '../components/ui/AppButton.jsx'
import CaseFilters from '../components/cases/CaseFilters.jsx'
import useCases from '../hooks/useCases.js'
import useCaseFilters from '../hooks/useCaseFilters.js'
import useDeleteCase from '../hooks/useDeleteCase.js'

export default function CasesPage({ items }) {
  const { cases } = useCases()
  const {
    query, skillId, sort, visibleCases,
    setQuery, setSkill, setSort, resetFilters,
  } = useCaseFilters(cases, items)
  const deleteWithConfirmation = useDeleteCase()
  const [error, setError] = useState('')
  const skillNames = new Map(items.map((skill) => [skill.id, skill.name]))

  function handleDelete(record) {
    setError('')
    const result = deleteWithConfirmation(record)
    if (!result.ok && !result.cancelled) setError(result.message)
  }

  return (
    <>
      <PageHeading title="Мої кейси" />
      <p>Практичні роботи, прив'язані до навичок.</p>
      <p><Link to="/cases/new">Створити новий кейс</Link></p>
      {error && <p role="alert">{error}</p>}

      <CaseFilters
        query={query}
        skillId={skillId}
        sort={sort}
        skills={items}
        onQueryChange={setQuery}
        onSkillChange={setSkill}
        onSortChange={setSort}
        onReset={resetFilters}
      />
      <p>Показано кейсів: {visibleCases.length} з {cases.length}</p>

      {cases.length === 0 ? (
        <EmptyState title="Кейсів ще немає.">
          <p><Link to="/cases/new">Підготувати перший кейс</Link></p>
        </EmptyState>
      ) : visibleCases.length === 0 ? (
        <EmptyState title="За цими параметрами нічого не знайдено.">
          <AppButton variant="secondary" onClick={resetFilters}>
            Скинути фільтри
          </AppButton>
        </EmptyState>
      ) : (
        <ul className="case-list">
          {visibleCases.map((record) => (
            <li key={record.id} className="case-item">
              <h3>
                <Link to={`/cases/${encodeURIComponent(record.id)}`}>
                  {record.title}
                </Link>
              </h3>
              <p>
                Навички:{' '}
                {record.skillIds
                  .map((id) => skillNames.get(id) ?? 'Навичка відсутня')
                  .join(', ')}
              </p>
              <p>
                Годин: {record.hoursSpent}.{' '}
                {record.readyToPublish ? 'Готовий до публікації.' : 'У роботі.'}
              </p>
              <p>
                <Link to={`/cases/${encodeURIComponent(record.id)}/edit`}>
                  Редагувати
                </Link>{' '}
                <AppButton variant="secondary" onClick={() => handleDelete(record)}>
                  Видалити
                </AppButton>
              </p>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}