import { describe, expect, test } from 'vitest'
import { selectCases } from './selectCases.js'
import { savedCase } from '../test/fixtures.js'

function makeCase(overrides) {
  return Object.freeze({ ...savedCase, ...overrides })
}

describe('selectCases', () => {
  test('поєднує пошук, навичку й порядок без зміни джерела', () => {
    const records = Object.freeze([
      makeCase({ id: 'c-1', title: 'Запити SQL', skillIds: ['skill-001'], hoursSpent: 4 }),
      makeCase({
        id: 'c-2',
        title: 'Запити Excel',
        skillIds: ['skill-001', 'skill-002'],
        hoursSpent: 1,
      }),
      makeCase({ id: 'c-3', title: 'Запити Power BI', skillIds: ['skill-002'], hoursSpent: 2 }),
    ])

    const result = selectCases(records, {
      query: ' ЗАПИТИ ',
      skillId: 'skill-001',
      sort: 'hours-asc',
    })

    expect(result.map((record) => record.id)).toEqual(['c-2', 'c-1'])
    expect(records.map((record) => record.id)).toEqual(['c-1', 'c-2', 'c-3'])
  })

  test('шукає і в назві, і в описі', () => {
    const records = [
      makeCase({ id: 'c-1', title: 'Перший', summary: 'Містить слово діаграма в описі.' }),
      makeCase({ id: 'c-2', title: 'Діаграма продажів', summary: 'Опис без шуканого слова.' }),
      makeCase({ id: 'c-3', title: 'Третій', summary: 'Нічого спільного з пошуком.' }),
    ]

    const result = selectCases(records, { query: 'діаграм', skillId: 'all', sort: 'title' })

    expect(result.map((record) => record.id)).toEqual(['c-2', 'c-1'])
  })

  test('сортує за годинами за спаданням, а рівні значення розрізняє за id', () => {
    const records = [
      makeCase({ id: 'c-b', hoursSpent: 5 }),
      makeCase({ id: 'c-a', hoursSpent: 5 }),
      makeCase({ id: 'c-c', hoursSpent: 9 }),
    ]

    const result = selectCases(records, { query: '', skillId: 'all', sort: 'hours-desc' })

    expect(result.map((record) => record.id)).toEqual(['c-c', 'c-a', 'c-b'])
  })

  test('відсутність збігів не видаляє початковий запис', () => {
    const records = [savedCase]

    const result = selectCases(records, {
      query: 'несумісний пошуковий текст',
      skillId: 'all',
      sort: 'title',
    })

    expect(result).toEqual([])
    expect(records).toEqual([savedCase])
  })
})