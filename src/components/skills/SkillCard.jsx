import { useState } from 'react'
import StatusBadge from './StatusBadge.jsx'
import AppButton from '../ui/AppButton.jsx'

export default function SkillCard({ item, selected, onSelect }) {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const descriptionId = `skill-${item.id}-description`

  return (
    <article className="skill-card">
      <h3>{item.name}</h3>
      <p className="category">{item.category}</p>
      <p><StatusBadge status={item.status} /></p>

      <AppButton
        variant="secondary"
        aria-expanded={detailsOpen}
        aria-controls={descriptionId}
        onClick={() => setDetailsOpen((previous) => !previous)}
      >
        {detailsOpen ? 'Згорнути опис' : 'Показати опис'}
      </AppButton>
      <p id={descriptionId} hidden={!detailsOpen}>{item.description}</p>

      <p>
        <AppButton
          aria-pressed={selected}
          onClick={() => onSelect(item.id)}
        >
          Вибрати «{item.name}»
        </AppButton>
      </p>
      {selected && <p className="selection-note">Обрано для кейсу.</p>}
    </article>
  )
}