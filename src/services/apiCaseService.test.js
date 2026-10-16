import { afterEach, expect, test, vi } from 'vitest'
import { createApiCaseService } from './apiCaseService.js'
import { savedCase } from '../test/fixtures.js'

afterEach(() => {
  vi.unstubAllGlobals()
})

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

test('відхиляє HTTP 404 замість удаваного успіху', async () => {
  const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 404 }))
  vi.stubGlobal('fetch', fetchMock)
  const service = createApiCaseService('https://example.test/api')

  await expect(service.getById('missing')).rejects.toMatchObject({
    code: 'NOT_FOUND',
    status: 404,
  })
  expect(fetchMock).toHaveBeenCalledWith(
    'https://example.test/api/cases/missing',
    expect.objectContaining({ method: 'GET' }),
  )
})

test('після DELETE 204 не намагається читати JSON', async () => {
  const response = new Response(null, { status: 204 })
  const readJson = vi.spyOn(response, 'json')
  const fetchMock = vi.fn().mockResolvedValue(response)
  vi.stubGlobal('fetch', fetchMock)
  const service = createApiCaseService('https://example.test/api')

  await expect(service.delete('case-test-001')).resolves.toBeUndefined()
  expect(readJson).not.toHaveBeenCalled()
  expect(fetchMock).toHaveBeenCalledWith(
    'https://example.test/api/cases/case-test-001',
    expect.objectContaining({ method: 'DELETE' }),
  )
})

test('повертає нормалізований список із коректної відповіді', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse([{ ...savedCase, extra: 'x' }])))
  const service = createApiCaseService('https://example.test/api')

  const result = await service.getAll()

  expect(result).toEqual([savedCase])
  expect(result[0]).not.toHaveProperty('extra')
})

test.each([
  { label: 'неправильна оболонка', body: { items: [] } },
  { label: 'тип годин', body: [{ ...savedCase, hoursSpent: 'шість' }] },
  { label: 'повторний id', body: [savedCase, { ...savedCase }] },
])('відхиляє несумісну структуру: $label', async ({ body }) => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse(body)))
  const service = createApiCaseService('https://example.test/api')

  await expect(service.getAll()).rejects.toMatchObject({ code: 'BAD_DATA' })
})

test('мережева відмова дає зрозумілу помилку, а не аварію', async () => {
  vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')))
  const service = createApiCaseService('https://example.test/api')

  await expect(service.getAll()).rejects.toMatchObject({ code: 'NETWORK' })
})

test('помилка сервера HTTP 500 не вважається успіхом', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 500 })))
  const service = createApiCaseService('https://example.test/api')

  await expect(service.getAll()).rejects.toMatchObject({ code: 'HTTP', status: 500 })
})