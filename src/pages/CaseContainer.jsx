import CasePage from './CasePage.jsx'
import useSkillSelection from '../hooks/useSkillSelection.js'

export default function CaseContainer() {
  const { selectedId, selectedItem, clearSelection } = useSkillSelection()

  return (
    <CasePage
      key={selectedId ?? 'empty'}
      skill={selectedItem}
      onClearSelection={clearSelection}
    />
  )
}