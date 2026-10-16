import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation } from 'react-router'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import App from './App.jsx'
import { caseService } from './services/caseService.js'
import { ServiceError } from './services/ServiceError.js'
import { savedCase, validInput } from './test/fixtures.js'
import { deferred } from './test/deferred.js'

vi.mock('./services/caseService.js', () => ({
  caseService: {
    getAll: vi.fn(),
    getById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}))

beforeEach(() => {
  for (const method of Object.values(caseService)) method.mockReset()
  caseService.getAll.mockResolvedValue([{ ...savedCase }])
  caseService.getById.mockResolvedValue({ ...savedCase })
  caseService.create.mockImplementation(async (input) => ({ ...input, id: 'case-created' }))
  caseService.update.mockImplementation(async (id, input) => ({ ...input, id }))
  caseService.delete.mockResolvedValue(undefined)
})

afterEach(() => {
  vi.restoreAllMocks()
})

function LocationProbe() {
  const location = useLocation()
  return (
    <output data-testid="location">
      {location.pathname}
      {location.search}
    </output>
  )
}

function renderApp(path = '/cases') {
  const user = userEvent.setup()
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
      <LocationProbe />
    </MemoryRouter>,
  )
  return user
}

test('показує завантаження до отримання колекції', async () => {
  const pending = deferred()
  caseService.getAll.mockReturnValueOnce(pending.promise)
  renderApp()

  expect(screen.getByText('Завантаження кейсів…')).toBeInTheDocument()
  expect(screen.queryByText(savedCase.title)).not.toBeInTheDocument()

  await act(async () => {
    pending.resolve([savedCase])
    await pending.promise
  })

  expect(await screen.findByText(savedCase.title)).toBeInTheDocument()
  expect(screen.queryByText('Завантаження кейсів…')).not.toBeInTheDocument()
})

test('після відмови читання повторно завантажує дані', async () => {
  caseService.getAll
    .mockRejectedValueOnce(new ServiceError('Навчальна відмова читання.'))
    .mockResolvedValueOnce([savedCase])
  const user = renderApp()

  expect(await screen.findByRole('alert')).toHaveTextContent('Навчальна відмова читання.')
  expect(screen.queryByText(savedCase.title)).not.toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: 'Спробувати ще раз' }))

  expect(await screen.findByText(savedCase.title)).toBeInTheDocument()
  expect(screen.queryByRole('alert')).not.toBeInTheDocument()
})

test('успішний порожній список має окреме пояснення', async () => {
  caseService.getAll.mockResolvedValueOnce([])
  renderApp()

  expect(await screen.findByText(/Кейсів ще немає/)).toBeInTheDocument()
  expect(screen.queryByRole('alert')).not.toBeInTheDocument()
})

test.each([
  ['/cases/case-test-001', savedCase.title],
  ['/cases/case-test-001/edit', `Редагування: ${savedCase.title}`],
  ['/cases/case-missing', 'Кейс не знайдено'],
  ['/cases/new?skillId=skill-missing', 'Неможливо підготувати кейс'],
])('адреса %s відкриває відповідний екран', async (path, title) => {
  renderApp(path)
  expect(await screen.findByRole('heading', { name: title })).toBeInTheDocument()
})

test('невідома адреса показує сторінку «не знайдено»', async () => {
  renderApp('/unknown-page')
  expect(await screen.findByRole('heading', { name: /не знайдено/i })).toBeInTheDocument()
})

test('URL фільтра без збігів не змінює джерело кейсів', async () => {
  renderApp('/cases?q=немає_такого_збігу&sort=hours-asc')

  expect(await screen.findByText('За цими параметрами нічого не знайдено.')).toBeInTheDocument()
  expect(caseService.delete).not.toHaveBeenCalled()
})

test('створює кейс і відкриває його підтверджені деталі', { timeout: 15000 }, async () => {
  caseService.getAll.mockResolvedValueOnce([])
  const user = renderApp('/cases/new?skillId=skill-001')

  await user.type(await screen.findByRole('textbox', { name: /Назва кейсу/ }), validInput.title)
  await user.type(screen.getByRole('textbox', { name: /Опис результату/ }), validInput.summary)
  const hours = screen.getByRole('spinbutton', { name: /Витрачено годин/ })
  await user.clear(hours)
  await user.type(hours, String(validInput.hoursSpent))
  await user.click(screen.getByRole('button', { name: 'Створити кейс' }))

  expect(await screen.findByRole('heading', { name: validInput.title })).toBeInTheDocument()
  expect(screen.getByTestId('location')).toHaveTextContent('/cases/case-created')
  expect(caseService.create).toHaveBeenCalledTimes(1)
  expect(caseService.create).toHaveBeenCalledWith(validInput)
  expect(screen.queryByRole('form', { name: 'Форма кейсу' })).not.toBeInTheDocument()
})

test('редагує кейс із тим самим id та новою назвою', { timeout: 15000 }, async () => {
  const user = renderApp('/cases/case-test-001/edit')

  const title = await screen.findByRole('textbox', { name: /Назва кейсу/ })
  await user.clear(title)
  await user.type(title, 'Оновлена назва кейсу')
  await user.click(screen.getByRole('button', { name: 'Зберегти зміни' }))

  expect(await screen.findByRole('heading', { name: 'Оновлена назва кейсу' })).toBeInTheDocument()
  expect(screen.getByTestId('location')).toHaveTextContent('/cases/case-test-001')
  expect(caseService.update).toHaveBeenCalledWith(savedCase.id, {
    ...validInput,
    title: 'Оновлена назва кейсу',
  })
})

test('скасування діалогу не викликає видалення', async () => {
  vi.spyOn(window, 'confirm').mockReturnValue(false)
  const user = renderApp('/cases/case-test-001')
  await screen.findByRole('heading', { name: savedCase.title })

  await user.click(screen.getByRole('button', { name: 'Видалити кейс' }))

  expect(caseService.delete).not.toHaveBeenCalled()
  expect(screen.getByRole('heading', { name: savedCase.title })).toBeInTheDocument()
})

test('відмова видалення залишає запис і поточну адресу', async () => {
  vi.spyOn(window, 'confirm').mockReturnValue(true)
  caseService.delete.mockRejectedValueOnce(new ServiceError('Не вдалося видалити кейс.'))
  const user = renderApp('/cases/case-test-001')
  await screen.findByRole('heading', { name: savedCase.title })

  await user.click(screen.getByRole('button', { name: 'Видалити кейс' }))

  expect(await screen.findByRole('alert')).toHaveTextContent('Не вдалося видалити кейс.')
  expect(screen.getByText(savedCase.summary)).toBeInTheDocument()
  expect(screen.getByTestId('location')).toHaveTextContent('/cases/case-test-001')
  expect(caseService.delete).toHaveBeenCalledWith(savedCase.id)
})

test('підтверджене видалення прибирає потрібний кейс і повертає до списку', async () => {
  vi.spyOn(window, 'confirm').mockReturnValue(true)
  const user = renderApp('/cases/case-test-001')
  await screen.findByRole('heading', { name: savedCase.title })

  await user.click(screen.getByRole('button', { name: 'Видалити кейс' }))

  expect(await screen.findByText(/Кейсів ще немає/)).toBeInTheDocument()
  expect(screen.getByTestId('location')).toHaveTextContent('/cases')
  expect(caseService.delete).toHaveBeenCalledWith(savedCase.id)
})