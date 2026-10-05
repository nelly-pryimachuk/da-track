import Section from '../components/ui/Section.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import StatusBadge from '../components/skills/StatusBadge.jsx'
import CaseFormPreview from '../components/cases/CaseFormPreview.jsx'

export default function CasePage({ skill }) {
  return (
    <Section id="new-case" title="Додавання кейсу">
      {skill ? (
        <>
          <p>
            Приклад для навички «{skill.name}»:{' '}
            <StatusBadge status={skill.status} />
          </p>
          <CaseFormPreview idPrefix="case-preview" skillName={skill.name} />
        </>
      ) : (
        <EmptyState title="Немає навички для макета кейсу.">
          <p><a href="#skills">Переглянути навички</a></p>
        </EmptyState>
      )}
    </Section>
  )
}