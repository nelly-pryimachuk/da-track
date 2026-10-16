import { describe, expect, test } from 'vitest'
import { validateCase } from './caseValidation.js'
import { testSkill, validInput } from '../test/fixtures.js'

const catalog = ['a', 'b', 'c', 'd', 'e'].map((letter) => ({
  id: `skill-${letter}`,
  name: letter,
}))

describe('validateCase', () => {
  test('нормалізує коректні поля, не змінюючи вхід', () => {
    const input = Object.freeze({
      ...validInput,
      title: ` ${validInput.title} `,
      hoursSpent: '6',
      id: 'injected-id',
    })

    const result = validateCase(input, [testSkill])

    expect(result).toEqual({ ok: true, errors: {}, value: validInput })
    expect(result.value).not.toHaveProperty('id')
    expect(input.hoursSpent).toBe('6')
    expect(input.title.startsWith(' ')).toBe(true)
  })

  test.each(['', '0', '1.5', '101'])('відхиляє кількість годин %j', (hoursSpent) => {
    const result = validateCase({ ...validInput, hoursSpent }, [testSkill])
    expect(result.ok).toBe(false)
    expect(result.errors.hoursSpent).toBeTruthy()
  })

  test.each([1, 100])('приймає граничну кількість годин %i', (hoursSpent) => {
    expect(validateCase({ ...validInput, hoursSpent }, [testSkill]).ok).toBe(true)
  })

  test.each([2, 81])('відхиляє назву завдовжки %i', (length) => {
    const result = validateCase({ ...validInput, title: 'а'.repeat(length) }, [testSkill])
    expect(result.errors.title).toBeTruthy()
  })

  test.each([3, 80])('приймає назву завдовжки %i', (length) => {
    const result = validateCase({ ...validInput, title: 'а'.repeat(length) }, [testSkill])
    expect(result.ok).toBe(true)
  })

  test.each([19, 501])('відхиляє опис завдовжки %i', (length) => {
    const result = validateCase({ ...validInput, summary: 'а'.repeat(length) }, [testSkill])
    expect(result.errors.summary).toBeTruthy()
  })

  test('вимагає від 1 до 4 унікальних наявних навичок', () => {
    const check = (skillIds) => validateCase({ ...validInput, skillIds }, catalog)

    expect(check([]).errors.skillIds).toBeTruthy()
    expect(check(['skill-a', 'skill-a']).errors.skillIds).toBeTruthy()
    expect(check(['skill-missing']).errors.skillIds).toBeTruthy()
    expect(check(['skill-a', 'skill-b', 'skill-c', 'skill-d', 'skill-e']).errors.skillIds)
      .toBeTruthy()
    expect(check(['skill-a', 'skill-b', 'skill-c', 'skill-d']).ok).toBe(true)
  })

  test('посилання має бути адресою http або https', () => {
    const check = (link) => validateCase({ ...validInput, link }, [testSkill])

    expect(check('ftp://example.com/file').errors.link).toBeTruthy()
    expect(check('не посилання').errors.link).toBeTruthy()
    expect(check('').ok).toBe(true)
    expect(check('https://example.com/case').ok).toBe(true)
  })

  test('готовий до публікації кейс потребує посилання', () => {
    const withoutLink = validateCase(
      { ...validInput, readyToPublish: true, link: '' },
      [testSkill],
    )
    expect(withoutLink.ok).toBe(false)
    expect(withoutLink.errors.link).toBeTruthy()

    const withLink = validateCase(
      { ...validInput, readyToPublish: true, link: 'https://example.com/case' },
      [testSkill],
    )
    expect(withLink.ok).toBe(true)
  })
})