import AppButton from '../ui/AppButton.jsx'
import FormField from '../ui/FormField.jsx'

export default function CaseForm({
  idPrefix,
  skills,
  draft,
  errors,
  operationError,
  onChange,
  onBlur,
  onSubmit,
  onReset,
  submitLabel,
}) {
  const skillsId = `${idPrefix}-skills`
  const titleId = `${idPrefix}-title`
  const summaryId = `${idPrefix}-summary`
  const hoursId = `${idPrefix}-hours`
  const linkId = `${idPrefix}-link`
  const publishId = `${idPrefix}-publish`
  const hasErrors = Object.keys(errors).length > 0

  function describedBy(id, error) {
    return `${id}-hint${error ? ` ${id}-error` : ''}`
  }

  function handleSkillToggle(skillId) {
    const next = draft.skillIds.includes(skillId)
      ? draft.skillIds.filter((id) => id !== skillId)
      : [...draft.skillIds, skillId]
    onChange('skillIds', next)
  }

  return (
    <form noValidate onSubmit={onSubmit} aria-label="Форма кейсу">
      <p>
        Збережіть зміни кнопкою нижче. Незбережене введення зникає
        при виході зі сторінки або її перезавантаженні.
      </p>
      {hasErrors && <p role="alert">Виправте позначені поля.</p>}
      {operationError && <p role="alert">{operationError}</p>}

      <fieldset aria-describedby={describedBy(skillsId, errors.skillIds)}>
        <legend>Навички (обов'язково)</legend>
        <p id={`${skillsId}-hint`} className="field-hint">
          Виберіть від 1 до 4 навичок, які ви використали в цьому кейсі.
        </p>
        {skills.map((skill) => (
          <label key={skill.id} className="checkbox-field">
            <input
              type="checkbox"
              name="skillIds"
              value={skill.id}
              checked={draft.skillIds.includes(skill.id)}
              onChange={() => handleSkillToggle(skill.id)}
              onBlur={() => onBlur('skillIds')}
            />
            {skill.name}
          </label>
        ))}
        {errors.skillIds && (
          <p id={`${skillsId}-error`} className="field-error">
            {errors.skillIds}
          </p>
        )}
      </fieldset>

      <FormField
        id={titleId}
        label="Назва кейсу (обов'язково)"
        hint="Від 3 до 80 символів без крайніх пробілів."
        error={errors.title}
      >
        <input
          id={titleId}
          name="title"
          required
          value={draft.title}
          onChange={(event) => onChange('title', event.target.value)}
          onBlur={() => onBlur('title')}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={describedBy(titleId, errors.title)}
        />
      </FormField>

      <FormField
        id={summaryId}
        label="Опис результату (обов'язково)"
        hint="Що саме зробили і що зрозуміли. Від 20 до 500 символів."
        error={errors.summary}
      >
        <textarea
          id={summaryId}
          name="summary"
          rows={4}
          required
          value={draft.summary}
          onChange={(event) => onChange('summary', event.target.value)}
          onBlur={() => onBlur('summary')}
          aria-invalid={Boolean(errors.summary)}
          aria-describedby={describedBy(summaryId, errors.summary)}
        />
      </FormField>

      <FormField
        id={hoursId}
        label="Витрачено годин (обов'язково)"
        hint="Ціле число від 1 до 100."
        error={errors.hoursSpent}
      >
        <input
          id={hoursId}
          name="hoursSpent"
          type="number"
          min={1}
          max={100}
          step={1}
          required
          value={draft.hoursSpent}
          onChange={(event) => onChange('hoursSpent', event.target.value)}
          onBlur={() => onBlur('hoursSpent')}
          aria-invalid={Boolean(errors.hoursSpent)}
          aria-describedby={describedBy(hoursId, errors.hoursSpent)}
        />
      </FormField>

      <FormField
        id={linkId}
        label="Посилання на роботу"
        hint="Файл, репозиторій або публікація. Обов'язкове, якщо кейс готовий до публікації."
        error={errors.link}
      >
        <input
          id={linkId}
          name="link"
          type="url"
          value={draft.link}
          onChange={(event) => onChange('link', event.target.value)}
          onBlur={() => onBlur('link')}
          aria-invalid={Boolean(errors.link)}
          aria-describedby={describedBy(linkId, errors.link)}
        />
      </FormField>

      <div>
        <label className="checkbox-field" htmlFor={publishId}>
          <input
            id={publishId}
            name="readyToPublish"
            type="checkbox"
            checked={draft.readyToPublish}
            onChange={(event) => onChange('readyToPublish', event.target.checked)}
            onBlur={() => onBlur('readyToPublish')}
            aria-invalid={Boolean(errors.readyToPublish)}
            aria-describedby={describedBy(publishId, errors.readyToPublish)}
          />
          Готовий до публікації
        </label>
        <p id={`${publishId}-hint`} className="field-hint">
          Для такого кейсу посилання на роботу обов'язкове.
        </p>
        {errors.readyToPublish && (
          <p id={`${publishId}-error`} className="field-error">
            {errors.readyToPublish}
          </p>
        )}
      </div>

      <div className="form-actions">
        <AppButton type="submit">{submitLabel}</AppButton>
        <AppButton variant="secondary" onClick={onReset}>
          Відновити початкові поля
        </AppButton>
      </div>
    </form>
  )
}