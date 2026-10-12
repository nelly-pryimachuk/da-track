function isHttpUrl(value) {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export function validateCase(input, skills) {
  const errors = {}
  const title = typeof input.title === 'string' ? input.title.trim() : ''
  const summary = typeof input.summary === 'string' ? input.summary.trim() : ''
  const link = typeof input.link === 'string' ? input.link.trim() : ''
  const hoursText = String(input.hoursSpent ?? '').trim()
  const hoursSpent = Number(hoursText)
  const skillIds = Array.isArray(input.skillIds) ? input.skillIds : []

  if (skillIds.length === 0) {
    errors.skillIds = 'Виберіть хоча б одну навичку.'
  } else if (skillIds.length > 4) {
    errors.skillIds = 'Можна вибрати не більше 4 навичок.'
  } else if (
    new Set(skillIds).size !== skillIds.length
    || !skillIds.every((id) => skills.some((skill) => skill.id === id))
  ) {
    errors.skillIds = 'Вибрано навичку, якої немає в каталозі.'
  }

  if (title.length === 0) {
    errors.title = 'Укажіть назву кейсу.'
  } else if (title.length < 3 || title.length > 80) {
    errors.title = 'Назва має містити від 3 до 80 символів без крайніх пробілів.'
  }

  if (summary.length === 0) {
    errors.summary = 'Опишіть результат роботи.'
  } else if (summary.length < 20 || summary.length > 500) {
    errors.summary = 'Опис має містити від 20 до 500 символів без крайніх пробілів.'
  }

  if (hoursText === '') {
    errors.hoursSpent = 'Укажіть, скільки годин ви витратили.'
  } else if (
    !Number.isInteger(hoursSpent)
    || hoursSpent < 1
    || hoursSpent > 100
  ) {
    errors.hoursSpent = 'Кількість годин має бути цілим числом від 1 до 100.'
  }

  if (link !== '' && !isHttpUrl(link)) {
    errors.link = 'Посилання має починатися з http:// або https://.'
  }

  if (typeof input.readyToPublish !== 'boolean') {
    errors.readyToPublish = 'Ознака готовності має бути логічним значенням.'
  } else if (input.readyToPublish && link === '') {
    errors.link = 'Для кейсу, готового до публікації, додайте посилання на роботу.'
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors }
  }

  return {
    ok: true,
    errors: {},
    value: {
      skillIds: [...skillIds],
      title,
      summary,
      hoursSpent,
      readyToPublish: input.readyToPublish,
      link,
    },
  }
}