import HomePage from './HomePage.jsx'
import useSkillSelection from '../hooks/useSkillSelection.js'

export default function SkillsContainer({ items }) {
  const { selectedId, selectSkill } = useSkillSelection()

  return (
    <HomePage
      items={items}
      selectedId={selectedId}
      onSelect={selectSkill}
    />
  )
}