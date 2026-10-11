import { useState } from 'react'
import PageHeading from '../components/ui/PageHeading.jsx'
import Section from '../components/ui/Section.jsx'
import AppButton from '../components/ui/AppButton.jsx'
import StatusBadge from '../components/skills/StatusBadge.jsx'
import CaseForm from '../components/cases/CaseForm.jsx'
import CaseSummary from '../components/cases/CaseSummary.jsx'

const emptyDraft = { title: '', summary: '' }

export default function CasePage({
  title,
  skill,
  initialDraft = emptyDraft,
  onCancel,
  cancelLabel = 'Вийти без збереження',
}) {
  const [draft, setDraft] = useState(() => ({ ...initialDraft }))

  function handleTitleChange(nextTitle) {
    setDraft((previous) => ({ ...previous, title: nextTitle }))
  }

  function handleSummaryChange(summary) {
    setDraft((previous) => ({ ...previous, summary }))
  }

  function handleReset() {
    setDraft({ ...emptyDraft })
  }

  return (
    <>
      <PageHeading title={title} />
      <Section id="case-editor" title="Поля та підсумок">
        <p>
          Навичка «{skill.name}»:{' '}
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
      </Section>
      <AppButton variant="secondary" onClick={onCancel}>
        {cancelLabel}
      </AppButton>
    </>
  )
}