import { useNavigate, useParams } from 'react-router'
import useCases from '../hooks/useCases.js'
import CasePage from './CasePage.jsx'
import NotFoundPage from './NotFoundPage.jsx'

export default function CaseEditPage({ items }) {
  const { caseId } = useParams()
  const navigate = useNavigate()
  const { cases, updateCase } = useCases()

  const record = cases.find((entry) => entry.id === caseId)

  if (!record) {
    return (
      <NotFoundPage
        title="Кейс для редагування не знайдено"
        message="Перевірте ідентифікатор кейсу в адресі."
      />
    )
  }

  const detailsPath = `/cases/${encodeURIComponent(record.id)}`

  function handleSave(input) {
    const result = updateCase(record.id, input)
    if (result.ok) {
      navigate(detailsPath, { replace: true })
    }
    return result
  }

  return (
    <CasePage
      key={`edit-${record.id}`}
      title={`Редагування: ${record.title}`}
      skills={items}
      initialDraft={{
        skillIds: record.skillIds,
        title: record.title,
        summary: record.summary,
        hoursSpent: record.hoursSpent,
        readyToPublish: record.readyToPublish,
        link: record.link,
      }}
      onSave={handleSave}
      submitLabel="Зберегти зміни"
      onCancel={() => navigate(detailsPath)}
    />
  )
}