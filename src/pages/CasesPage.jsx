import { Link } from 'react-router'
import PageHeading from '../components/ui/PageHeading.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'

export default function CasesPage({ cases, items }) {
  return (
    <>
      <PageHeading title="Мої кейси" />
      <p>Нижче наведено практичні роботи, прив'язані до навичок.</p>
      {cases.length === 0 ? (
        <EmptyState title="Кейсів ще немає.">
          <p><Link to="new">Підготувати новий кейс</Link></p>
        </EmptyState>
      ) : (
        <ul>
          {cases.map((item) => {
            const skill = items.find((entry) => entry.id === item.skillId)
            return (
              <li key={item.id}>
                <strong>{item.title}</strong> ({skill?.name ?? 'Навичка відсутня'})
                {' — '}
                <Link to={`${encodeURIComponent(item.id)}/edit`}>Редагувати</Link>
              </li>
            )
          })}
        </ul>
      )}
    </>
  )
}