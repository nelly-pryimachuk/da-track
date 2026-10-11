import { useNavigate, useParams } from 'react-router'
import CasePage from './CasePage.jsx'
import NotFoundPage from './NotFoundPage.jsx'

export default function CaseEditPage({ cases, items }) {
  const { caseId } = useParams()
  const navigate = useNavigate()

  const savedCase = cases.find((entry) => entry.id === caseId)

  if (!savedCase) {
    return (
      <NotFoundPage
        title="Кейс не знайдено"
        message="Перевірте ідентифікатор кейсу в адресі."
      />
    )
  }

  const skill = items.find((entry) => entry.id === savedCase.skillId)

  if (!skill) {
    return (
      <NotFoundPage
        title="Навичка кейсу відсутня"
        message="Демонстраційний запис посилається на навичку, якої немає в переліку."
      />
    )
  }

  return (
    <CasePage
      key={`edit-${savedCase.id}`}
      title={`Редагування кейсу ${savedCase.id}`}
      skill={skill}
      initialDraft={{
        title: savedCase.title,
        summary: savedCase.summary,
      }}
      onCancel={() => navigate('/cases')}
    />
  )
}