import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import PageHeading from '../components/ui/PageHeading.jsx'
import AppButton from '../components/ui/AppButton.jsx'
import useCases from '../hooks/useCases.js'
import useDeleteCase from '../hooks/useDeleteCase.js'
import NotFoundPage from './NotFoundPage.jsx'

export default function CaseDetailsPage({ items }) {
  const { caseId } = useParams()
  const navigate = useNavigate()
  const { cases } = useCases()
  const deleteWithConfirmation = useDeleteCase()
  const [error, setError] = useState('')

  const record = cases.find((entry) => entry.id === caseId)

  if (!record) return <NotFoundPage title="Кейс не знайдено" />

  const skills = record.skillIds.map((id) => ({
    id,
    skill: items.find((entry) => entry.id === id),
  }))

  function handleDelete() {
    setError('')
    const result = deleteWithConfirmation(record)
    if (result.ok) navigate('/cases', { replace: true })
    else if (!result.cancelled) setError(result.message)
  }

  return (
    <>
      <PageHeading title={record.title} />
      {error && <p role="alert">{error}</p>}
      <dl>
        <dt>Навички</dt>
        <dd>
          {skills.map(({ id, skill }, index) => (
            <span key={id}>
              {index > 0 && ', '}
              {skill
                ? <Link to={`/skills/${encodeURIComponent(skill.id)}`}>{skill.name}</Link>
                : 'Навичка відсутня в каталозі'}
            </span>
          ))}
        </dd>
        <dt>Опис результату</dt>
        <dd>{record.summary}</dd>
        <dt>Витрачено годин</dt>
        <dd>{record.hoursSpent}</dd>
        <dt>Готовий до публікації</dt>
        <dd>{record.readyToPublish ? 'Так' : 'Ні'}</dd>
        <dt>Посилання</dt>
        <dd>
          {record.link
            ? <a href={record.link} target="_blank" rel="noreferrer">{record.link}</a>
            : 'Немає'}
        </dd>
      </dl>
      <p>
        <Link to={`/cases/${encodeURIComponent(record.id)}/edit`}>
          Редагувати кейс
        </Link>
      </p>
      <AppButton variant="secondary" onClick={handleDelete}>
        Видалити кейс
      </AppButton>
      <p><Link to="/cases">До всіх кейсів</Link></p>
    </>
  )
}