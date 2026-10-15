import { useNavigate, useSearchParams } from 'react-router'
import useSkillSelection from '../hooks/useSkillSelection.js'
import useCases from '../hooks/useCases.js'
import CasePage from './CasePage.jsx'
import NotFoundPage from './NotFoundPage.jsx'
import { useEffect, useRef } from 'react'

export default function CaseCreatePage({ items }) {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { clearSelection } = useSkillSelection()
  const { createCase } = useCases()
  const pageAlive = useRef(false)

  useEffect(() => {
    pageAlive.current = true
    return () => {
      pageAlive.current = false
    }
  }, [])
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

  async function handleSave(input) {
    const result = await createCase(input)
    if (result.ok && pageAlive.current) {
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