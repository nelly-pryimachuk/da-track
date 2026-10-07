import SkillCard from './SkillCard.jsx'
import EmptyState from '../ui/EmptyState.jsx'

export default function SkillList({
  items,
  selectedId,
  onSelect,
  emptyTitle = 'Навички ще не додано.',
}) {
  if (items.length === 0) {
    return <EmptyState title={emptyTitle} />
  }

  return (
    <ul className="skills-grid">
      {items.map((item) => (
        <li key={item.id}>
          <SkillCard
            item={item}
            selected={item.id === selectedId}
            onSelect={onSelect}
          />
        </li>
      ))}
    </ul>
  )
}