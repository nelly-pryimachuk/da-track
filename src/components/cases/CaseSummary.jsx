export default function CaseSummary({ skillName, draft }) {
  const summary = draft.summary.trim()

  return (
    <aside aria-labelledby="case-summary-title">
      <h3 id="case-summary-title">Поточна чернетка</h3>
      <dl>
        <dt>Навичка</dt>
        <dd>{skillName}</dd>
        <dt>Назва кейсу</dt>
        <dd>{draft.title.trim() || 'Ще не вказано'}</dd>
        <dt>Опис результату</dt>
        <dd>{summary || 'Ще не вказано'}</dd>
      </dl>
      <p>Цей підсумок не підтверджує збереження.</p>
    </aside>
  )
}