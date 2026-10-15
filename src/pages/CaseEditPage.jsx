import { useNavigate, useParams } from 'react-router'
import useCases from '../hooks/useCases.js'
import CasePage from './CasePage.jsx'
import NotFoundPage from './NotFoundPage.jsx'
import { useEffect, useRef } from 'react'

export default function CaseEditPage({ items }) {
  const { caseId } = useParams()
  const navigate = useNavigate()
  const { cases, updateCase } = useCases()
  const record = cases.find((entry) => entry.id === caseId)
  const pageAlive = useRef(false)
  const activeId = useRef(caseId)

  useEffect(() => {
    pageAlive.current = true
    return () => {
      pageAlive.current = false
    }
  }, [])

  useEffect(() => {
    activeId.current = caseId
    return () => {
      activeId.current = null
    }
  }, [caseId])

  if (!record) {
    return (
      <NotFoundPage
        title="Кейс для редагування не знайдено"
        message="Перевірте ідентифікатор кейсу в адресі."
      />
    )
  }

  const detailsPath = `/cases/${encodeURIComponent(record.id)}`

  async function handleSave(input) {
    const result = await updateCase(record.id, input)
    if (result.ok && pageAlive.current && activeId.current === record.id) {
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