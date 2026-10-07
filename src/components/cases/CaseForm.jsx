import AppButton from '../ui/AppButton.jsx'
import FormField from '../ui/FormField.jsx'

export default function CaseForm({
  idPrefix,
  skillName,
  draft,
  onTitleChange,
  onSummaryChange,
  onReset,
}) {
  const skillId = `${idPrefix}-skill`
  const titleId = `${idPrefix}-title`
  const summaryId = `${idPrefix}-summary`
  const noticeId = `${idPrefix}-notice`

  return (
    <form
      aria-label="Чернетка нового кейсу"
      aria-describedby={noticeId}
      onSubmit={(event) => event.preventDefault()}
    >
      <p id={noticeId}>
        Чернетка існує лише до зміни навички, скасування вибору
        або перезавантаження сторінки. Кейс не зберігається.
      </p>

      <FormField id={skillId} label="Навичка">
        <input id={skillId} name="skillName" value={skillName} readOnly />
      </FormField>

      <FormField id={titleId} label="Назва кейсу">
        <input
          id={titleId}
          name="title"
          value={draft.title}
          onChange={(event) => onTitleChange(event.target.value)}
        />
      </FormField>

      <FormField
        id={summaryId}
        label="Опис результату"
        hint="Що саме зробили і що зрозуміли під час роботи."
      >
        <textarea
          id={summaryId}
          name="summary"
          rows={3}
          value={draft.summary}
          onChange={(event) => onSummaryChange(event.target.value)}
          aria-describedby={`${summaryId}-hint`}
        />
      </FormField>

      <div className="form-actions">
        <AppButton variant="secondary" onClick={onReset}>
          Очистити поля
        </AppButton>
        <AppButton disabled>Збереження буде доступне пізніше</AppButton>
      </div>
    </form>
  )
}