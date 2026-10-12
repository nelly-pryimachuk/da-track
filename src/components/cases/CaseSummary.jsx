export default function CaseSummary({ skills, draft }) {
  const skillNames = skills
    .filter((skill) => draft.skillIds.includes(skill.id))
    .map((skill) => skill.name)

  return (
    <aside aria-labelledby="case-summary-title">
      <h3 id="case-summary-title">Поточна чернетка</h3>
      <dl>
        <dt>Навички</dt>
        <dd>{skillNames.length > 0 ? skillNames.join(', ') : 'Ще не вибрано'}</dd>
        <dt>Назва кейсу</dt>
        <dd>{draft.title.trim() || 'Ще не вказано'}</dd>
        <dt>Опис результату</dt>
        <dd>{draft.summary.trim() || 'Ще не вказано'}</dd>
        <dt>Витрачено годин</dt>
        <dd>{draft.hoursSpent === '' ? 'Ще не вказано' : draft.hoursSpent}</dd>
        <dt>Готовий до публікації</dt>
        <dd>{draft.readyToPublish ? 'Так' : 'Ні'}</dd>
        <dt>Посилання</dt>
        <dd>{draft.link.trim() || 'Немає'}</dd>
      </dl>
      <p>Цей підсумок не підтверджує збереження.</p>
    </aside>
  )
}