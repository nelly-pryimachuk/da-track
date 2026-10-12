import AppButton from '../ui/AppButton.jsx'
import FormField from '../ui/FormField.jsx'

export default function CaseFilters({
  query,
  skillId,
  sort,
  skills,
  onQueryChange,
  onSkillChange,
  onSortChange,
  onReset,
}) {
  return (
    <div className="catalog-filters">
      <FormField id="cases-query" label="Пошук за назвою чи описом">
        <input
          id="cases-query"
          type="search"
          name="q"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </FormField>

      <FormField id="cases-skill" label="Навичка">
        <select
          id="cases-skill"
          name="skill"
          value={skillId}
          onChange={(event) => onSkillChange(event.target.value)}
        >
          <option value="all">Усі навички</option>
          {skills.map((skill) => (
            <option key={skill.id} value={skill.id}>{skill.name}</option>
          ))}
        </select>
      </FormField>

      <FormField id="cases-sort" label="Порядок">
        <select
          id="cases-sort"
          name="sort"
          value={sort}
          onChange={(event) => onSortChange(event.target.value)}
        >
          <option value="title">За назвою</option>
          <option value="hours-desc">Спочатку більше годин</option>
          <option value="hours-asc">Спочатку менше годин</option>
        </select>
      </FormField>

      <AppButton variant="secondary" onClick={onReset}>
        Скинути фільтри
      </AppButton>
    </div>
  )
}