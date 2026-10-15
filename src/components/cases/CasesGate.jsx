import useCases from '../../hooks/useCases.js'

export default function CasesGate({ children }) {
  const { status, error, reload } = useCases()

  if (status === 'loading') {
    return (
      <section aria-busy="true" aria-label="Кейси">
        <p role="status">Завантаження кейсів…</p>
      </section>
    )
  }

  if (status === 'error') {
    return (
      <section aria-label="Помилка завантаження">
        <p role="alert">{error}</p>
        <button type="button" onClick={() => reload()}>
          Спробувати ще раз
        </button>
      </section>
    )
  }

  return children
}