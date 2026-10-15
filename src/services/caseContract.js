import { skills } from '../data/skills.js'
import { validateCase } from '../domain/caseValidation.js'
import { ServiceError } from './ServiceError.js'

// Перевіряє команду запису й залишає лише дозволені поля.
export function toCaseInput(input) {
  const result = validateCase(input, skills)
  if (!result.ok) {
    throw new ServiceError('Перевірте поля кейсу.', {
      code: 'VALIDATION',
      errors: result.errors,
    })
  }
  return result.value
}

// Перевіряє структуру запису, прочитаного з джерела, і створює новий об'єкт.
export function toCase(value) {
  const valid =
    value !== null &&
    typeof value === 'object' &&
    typeof value.id === 'string' &&
    value.id.length > 0 &&
    Array.isArray(value.skillIds) &&
    value.skillIds.every((id) => typeof id === 'string') &&
    typeof value.title === 'string' &&
    typeof value.summary === 'string' &&
    Number.isInteger(value.hoursSpent) &&
    typeof value.readyToPublish === 'boolean' &&
    typeof value.link === 'string'

  if (!valid) {
    throw new ServiceError('Джерело повернуло некоректний запис кейсу.', {
      code: 'BAD_DATA',
    })
  }

  return {
    id: value.id,
    skillIds: [...value.skillIds],
    title: value.title,
    summary: value.summary,
    hoursSpent: value.hoursSpent,
    readyToPublish: value.readyToPublish,
    link: value.link,
  }
}

export function toCaseList(value) {
  if (!Array.isArray(value)) {
    throw new ServiceError('Джерело повернуло некоректний список.', {
      code: 'BAD_DATA',
    })
  }
  const records = value.map(toCase)
  if (new Set(records.map((record) => record.id)).size !== records.length) {
    throw new ServiceError('Джерело повернуло повторні ідентифікатори.', {
      code: 'BAD_DATA',
    })
  }
  return records
}