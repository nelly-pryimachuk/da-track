import SkillCard from './SkillCard.jsx'
import EmptyState from '../ui/EmptyState.jsx'

export default function SkillList({ items }) {
  if (items.length === 0) {
    return (
      <EmptyState title="Навички ще не додано.">
        <p>Після наповнення переліку тут з'являться картки навичок.</p>
      </EmptyState>
    )
  }

  return (
    <ul className="skills-grid">
      {items.map((item) => (
        <li key={item.id}>
          <SkillCard item={item} />
        </li>
      ))}
    </ul>
  )
}