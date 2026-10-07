import Section from '../components/ui/Section.jsx'
import SkillsSummary from '../components/skills/SkillsSummary.jsx'
import SkillFilters from '../components/skills/SkillFilters.jsx'
import SkillList from '../components/skills/SkillList.jsx'
import useSkillFilters from '../hooks/useSkillFilters.js'

export default function HomePage({ items, selectedId, onSelect }) {
  const {
    query,
    setQuery,
    practicingOnly,
    setPracticingOnly,
    visibleItems,
    resetFilters,
  } = useSkillFilters(items)

  return (
    <>
      <Section id="about" title="Про мене">
        <p>Мій шлях у вивченні дата-аналітики — навички та практичні кейси.</p>
      </Section>

      <Section id="skills" title="Навички">
        <SkillsSummary total={items.length} />
        <SkillFilters
          query={query}
          practicingOnly={practicingOnly}
          onQueryChange={setQuery}
          onPracticingOnlyChange={setPracticingOnly}
          onReset={resetFilters}
        />
        <p>Показано навичок: {visibleItems.length}</p>
        <SkillList
          items={visibleItems}
          selectedId={selectedId}
          onSelect={onSelect}
          emptyTitle={items.length === 0
            ? 'Навички ще не додано.'
            : 'За цими фільтрами нічого не знайдено.'}
        />
        <p><a href="#new-case">Перейти до нового кейсу</a></p>
      </Section>
    </>
  )
}