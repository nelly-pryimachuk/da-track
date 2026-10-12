import { useNavigate, useSearchParams } from 'react-router'
import useSkillSelection from '../hooks/useSkillSelection.js'
import useCases from '../hooks/useCases.js'
import CasePage from './CasePage.jsx'
import NotFoundPage from './NotFoundPage.jsx'

export default function CaseCreatePage({ items }) {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { clearSelection } = useSkillSelection()
  const { createCase } = useCases()

  const skillId = searchParams.get('skillId')
  const skill = skillId === null
    ? null
    : items.find((entry) => entry.id === skillId)

  if (skillId !== null && !skill) {
    return (
      <NotFoundPage
        title="Неможливо підготувати кейс"
        message="Навичка з параметра skillId відсутня в переліку."
      />
    )
  }

  function handleSave(input) {
    const result = createCase(input)
    if (result.ok) {
      navigate(`/cases/${encodeURIComponent(result.record.id)}`, {
        replace: true,
      })
    }
    return result
  }

  function handleCancel() {
    clearSelection()
    navigate('/cases', { replace: true })
  }

  return (
    <CasePage
      key={`new-${skillId ?? 'none'}`}
      title="Новий кейс"
      skills={items}
      initialDraft={{
        skillIds: skill ? [skill.id] : [],
        title: '',
        summary: '',
        hoursSpent: '',
        readyToPublish: false,
        link: '',
      }}
      onSave={handleSave}
      submitLabel="Створити кейс"
      onCancel={handleCancel}
      cancelLabel="Скасувати чернетку й очистити вибір"
    />
  )
}