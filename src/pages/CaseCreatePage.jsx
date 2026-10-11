import { Link, useNavigate, useSearchParams } from 'react-router'
import PageHeading from '../components/ui/PageHeading.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import useSkillSelection from '../hooks/useSkillSelection.js'
import CasePage from './CasePage.jsx'
import NotFoundPage from './NotFoundPage.jsx'

export default function CaseCreatePage({ items }) {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { selectedId, clearSelection } = useSkillSelection()

  const skillId = searchParams.get('skillId')

  if (skillId === null) {
    const lastSelectionSearch = selectedId
      ? `?${new URLSearchParams({ skillId: selectedId })}`
      : null

    return (
      <>
        <PageHeading title="Новий кейс" />
        <EmptyState title="Спочатку виберіть навичку.">
          <p><Link to="/skills">Відкрити навички</Link></p>
          {lastSelectionSearch && (
            <p>
              <Link to={lastSelectionSearch}>Використати останній вибір</Link>
            </p>
          )}
        </EmptyState>
      </>
    )
  }

  const skill = items.find((entry) => entry.id === skillId)

  if (!skill) {
    return (
      <NotFoundPage
        title="Неможливо підготувати кейс"
        message="Навичка з параметра skillId відсутня в переліку."
      />
    )
  }

  function handleCancel() {
    clearSelection()
    navigate('/skills', { replace: true })
  }

  return (
    <CasePage
      key={`new-${skill.id}`}
      title="Новий кейс"
      skill={skill}
      onCancel={handleCancel}
      cancelLabel="Скасувати чернетку й очистити вибір"
    />
  )
}