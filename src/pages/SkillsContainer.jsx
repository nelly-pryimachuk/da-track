import SkillsPage from './SkillsPage.jsx'
import useSkillSelection from '../hooks/useSkillSelection.js'

export default function SkillsContainer({ items }) {
  const { selectedId, selectSkill } = useSkillSelection()

  return (
    <SkillsPage
      items={items}
      selectedId={selectedId}
      onSelect={selectSkill}
    />
  )
}