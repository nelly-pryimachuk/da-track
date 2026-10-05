import AppButton from '../ui/AppButton.jsx'
import FormField from '../ui/FormField.jsx'

export default function CaseFormPreview({ idPrefix, skillName }) {
  const titleId = `${idPrefix}-title`
  const hoursId = `${idPrefix}-hours`
  const summaryId = `${idPrefix}-summary`
  const noticeId = `${idPrefix}-notice`

  return (
    <form
      aria-label="Макет форми нового кейсу"
      aria-describedby={noticeId}
      onSubmit={(event) => event.preventDefault()}
    >
      <p id={noticeId}>
        Це макет для перевірки структури полів. Дані не зберігаються.
      </p>
      <FormField id={titleId} label="Назва кейсу">
        <input id={titleId} name="title" defaultValue="" />
      </FormField>
      <FormField id={hoursId} label="Пов'язана навичка">
        <input id={hoursId} name="skillName" value={skillName} readOnly />
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
          defaultValue=""
          aria-describedby={`${summaryId}-hint`}
        />
      </FormField>
      <div className="form-actions">
        <AppButton type="reset" variant="secondary">
          Очистити текст
        </AppButton>
        <AppButton disabled>Збереження буде доступне пізніше</AppButton>
      </div>
    </form>
  )
}