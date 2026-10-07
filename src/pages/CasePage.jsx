import { useEffect, useState } from 'react'
import Section from '../components/ui/Section.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import AppButton from '../components/ui/AppButton.jsx'
import StatusBadge from '../components/skills/StatusBadge.jsx'
import CaseForm from '../components/cases/CaseForm.jsx'
import CaseSummary from '../components/cases/CaseSummary.jsx'


function createEmptyDraft() {
  return { title: '', summary: '' }
}

export default function CasePage({ skill, onClearSelection }) {
  const [draft, setDraft] = useState(createEmptyDraft)
  const title = skill ? `DA Track: ${skill.name}` : 'DA Track'

  useEffect(() => {
    const previousTitle = document.title
    document.title = title
    return () => {
      document.title = previousTitle
    }
  }, [title])
  
  function handleTitleChange(title) {
    setDraft((previous) => ({ ...previous, title }))
  }

  function handleSummaryChange(summary) {
    setDraft((previous) => ({ ...previous, summary }))
  }

  function handleReset() {
    setDraft(createEmptyDraft())
  }

  if (!skill) {
    return (
      <Section id="new-case" title="Додавання кейсу">
        <EmptyState title="Навичку ще не вибрано.">
          <p><a href="#skills">Виберіть навичку в переліку</a></p>
        </EmptyState>
      </Section>
    )
  }

  return (
    <Section id="new-case" title="Додавання кейсу">
      <p>
        Обрано «{skill.name}»:{' '}
        <StatusBadge status={skill.status} />
      </p>
      <CaseForm
        idPrefix="case-draft"
        skillName={skill.name}
        draft={draft}
        onTitleChange={handleTitleChange}
        onSummaryChange={handleSummaryChange}
        onReset={handleReset}
      />
      <CaseSummary skillName={skill.name} draft={draft} />
      <AppButton variant="secondary" onClick={onClearSelection}>
        Скасувати вибір і очистити кейс
      </AppButton>
    </Section>
  )
}