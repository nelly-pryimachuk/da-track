import useCases from './useCases.js'

export default function useDeleteCase() {
  const { deleteCase } = useCases()

  return async function deleteWithConfirmation(record) {
    const confirmed = window.confirm(
      `Видалити кейс «${record.title}» (${record.id})? `
      + 'Запис буде вилучено з поточної колекції. Скасування видалення не передбачено.',
    )
    if (!confirmed) return { ok: false, cancelled: true }
    return deleteCase(record.id)
  }
}