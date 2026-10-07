import AppButton from '../ui/AppButton.jsx'
import FormField from '../ui/FormField.jsx'

export default function SkillFilters({
  query,
  practicingOnly,
  onQueryChange,
  onPracticingOnlyChange,
  onReset,
}) {
  return (
    <div className="catalog-filters">
      <FormField id="skills-query" label="Пошук за назвою">
        <input
          id="skills-query"
          type="search"
          name="query"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </FormField>
      <label className="checkbox-field">
        <input
          type="checkbox"
          checked={practicingOnly}
          onChange={(event) => onPracticingOnlyChange(event.target.checked)}
        />
        Лише ті, що практикую
      </label>

      <AppButton variant="secondary" onClick={onReset}>
        Скинути фільтри
      </AppButton>
    </div>
  )
}