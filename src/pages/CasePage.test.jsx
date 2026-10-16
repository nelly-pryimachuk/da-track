import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import CasePage from './CasePage.jsx'
import { skills } from '../data/skills.js'
import { savedCase, validInput } from '../test/fixtures.js'
import { deferred } from '../test/deferred.js'

const emptyDraftWithSkill = {
  skillIds: ['skill-001'],
  title: '',
  summary: '',
  hoursSpent: '',
  readyToPublish: false,
  link: '',
}

function renderEditor(onSave) {
  return render(
    <CasePage
      title="Новий кейс"
      skills={skills}
      initialDraft={emptyDraftWithSkill}
      onSave={onSave}
      onCancel={vi.fn()}
      submitLabel="Створити кейс"
    />,
  )
}

async function fillValidForm(user) {
  await user.type(screen.getByRole('textbox', { name: /Назва кейсу/ }), validInput.title)
  await user.type(screen.getByRole('textbox', { name: /Опис результату/ }), validInput.summary)
  const hours = screen.getByRole('spinbutton', { name: /Витрачено годин/ })
  await user.clear(hours)
  await user.type(hours, String(validInput.hoursSpent))
}

test('не зберігає порожню назву та пояснює помилку', async () => {
  const user = userEvent.setup()
  const onSave = vi.fn()
  renderEditor(onSave)

  await user.click(screen.getByRole('button', { name: 'Створити кейс' }))

  const title = screen.getByRole('textbox', { name: /Назва кейсу/ })
  expect(title).toHaveAttribute('aria-invalid', 'true')
  expect(title).toHaveFocus()
  expect(screen.getByRole('alert')).toHaveTextContent('Виправте позначені поля.')
  expect(onSave).not.toHaveBeenCalled()
})

test('передає нормалізовані поля й блокує повтор до відповіді', async () => {
  const user = userEvent.setup()
  const pending = deferred()
  const onSave = vi.fn().mockReturnValue(pending.promise)
  renderEditor(onSave)
  await fillValidForm(user)

  await user.click(screen.getByRole('button', { name: 'Створити кейс' }))

  const submit = screen.getByRole('button', { name: 'Збереження…' })
  expect(submit).toBeDisabled()
  expect(screen.getByRole('textbox', { name: /Назва кейсу/ })).toBeDisabled()
  await user.click(submit)
  expect(onSave).toHaveBeenCalledTimes(1)
  expect(onSave).toHaveBeenCalledWith(validInput)

  await act(async () => {
    pending.resolve({ ok: true, record: savedCase })
    await pending.promise
  })

  expect(screen.getByRole('button', { name: 'Створити кейс' })).toBeEnabled()
})

test('після відмови зберігає введення й дозволяє свідомий повтор', async () => {
  const user = userEvent.setup()
  const onSave = vi
    .fn()
    .mockResolvedValueOnce({ ok: false, message: 'Сервіс тимчасово недоступний.' })
    .mockResolvedValueOnce({ ok: true, record: savedCase })
  renderEditor(onSave)
  await fillValidForm(user)

  await user.click(screen.getByRole('button', { name: 'Створити кейс' }))

  expect(await screen.findByRole('alert')).toHaveTextContent('Сервіс тимчасово недоступний.')
  expect(screen.getByRole('textbox', { name: /Назва кейсу/ })).toHaveValue(validInput.title)
  expect(screen.getByRole('textbox', { name: /Опис результату/ })).toHaveValue(validInput.summary)
  expect(screen.getByRole('spinbutton', { name: /Витрачено годин/ })).toHaveValue(validInput.hoursSpent)

  await user.click(screen.getByRole('button', { name: 'Створити кейс' }))

  await waitFor(() => {
    expect(screen.getByRole('button', { name: 'Створити кейс' })).toBeEnabled()
  })
  expect(onSave).toHaveBeenCalledTimes(2)
  expect(screen.queryByRole('alert')).not.toBeInTheDocument()
})