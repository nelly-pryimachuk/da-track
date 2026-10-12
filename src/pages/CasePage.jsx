import { useState } from 'react'
import PageHeading from '../components/ui/PageHeading.jsx'
import Section from '../components/ui/Section.jsx'
import AppButton from '../components/ui/AppButton.jsx'
import CaseForm from '../components/cases/CaseForm.jsx'
import CaseSummary from '../components/cases/CaseSummary.jsx'
import { validateCase } from '../domain/caseValidation.js'

const emptyDraft = {
  skillIds: [],
  title: '',
  summary: '',
  hoursSpent: '',
  readyToPublish: false,
  link: '',
}

const fieldOrder = [
  'skillIds', 'title', 'summary', 'hoursSpent', 'link', 'readyToPublish',
]

function toDraft(source) {
  return {
    skillIds: [...source.skillIds],
    title: source.title,
    summary: source.summary,
    hoursSpent: String(source.hoursSpent),
    readyToPublish: source.readyToPublish,
    link: source.link,
  }
}

function isSameDraft(a, b) {
  return a.title === b.title
    && a.summary === b.summary
    && a.hoursSpent === b.hoursSpent
    && a.readyToPublish === b.readyToPublish
    && a.link === b.link
    && a.skillIds.length === b.skillIds.length
    && a.skillIds.every((id) => b.skillIds.includes(id))
}

export default function CasePage({
  title,
  skills,
  initialDraft = emptyDraft,
  onSave,
  onCancel,
  submitLabel,
  cancelLabel = 'Вийти без збереження',
}) {
  const initialValues = toDraft(initialDraft)
  const [draft, setDraft] = useState(() => toDraft(initialDraft))
  const [touched, setTouched] = useState({})
  const [attempted, setAttempted] = useState(false)
  const [operationError, setOperationError] = useState('')

  const validation = validateCase(draft, skills)
  const errors = Object.fromEntries(
    Object.entries(validation.errors).filter(([field]) => (
      attempted || touched[field]
    )),
  )
  const isDirty = !isSameDraft(draft, initialValues)

  function handleChange(field, value) {
    setDraft((previous) => ({ ...previous, [field]: value }))
    setOperationError('')
  }

  function handleBlur(field) {
    setTouched((previous) => ({ ...previous, [field]: true }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setAttempted(true)
    setOperationError('')

    if (!validation.ok) {
      const firstField = fieldOrder.find((field) => validation.errors[field])
      if (firstField) {
        event.currentTarget.querySelector(`[name="${firstField}"]`)?.focus()
      }
      return
    }

    const result = onSave(validation.value)
    if (!result.ok) {
      setOperationError(
        result.message || Object.values(result.errors ?? {}).join(' '),
      )
    }
  }

  function handleReset() {
    if (!isDirty) return
    if (!window.confirm('Відкинути введені зміни та відновити початкові поля?')) {
      return
    }
    setDraft(toDraft(initialDraft))
    setTouched({})
    setAttempted(false)
    setOperationError('')
  }

  function handleCancel() {
    if (isDirty && !window.confirm('Вийти та відкинути незбережені зміни?')) {
      return
    }
    onCancel()
  }

  return (
    <>
      <PageHeading title={title} />
      <Section id="case-editor" title="Поля та підсумок">
        <CaseForm
          idPrefix="case-draft"
          skills={skills}
          draft={draft}
          errors={errors}
          operationError={operationError}
          onChange={handleChange}
          onBlur={handleBlur}
          onSubmit={handleSubmit}
          onReset={handleReset}
          submitLabel={submitLabel}
        />
        <CaseSummary skills={skills} draft={draft} />
      </Section>
      <AppButton variant="secondary" onClick={handleCancel}>
        {cancelLabel}
      </AppButton>
    </>
  )
}