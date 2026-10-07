import { useState } from 'react'
import { SkillSelectionContext } from '../context/SkillSelectionContext.js'

export default function SkillSelectionProvider({ items, children }) {
  const [selectedId, setSelectedId] = useState(null)
  const selectedItem = items.find((item) => item.id === selectedId)

  function selectSkill(id) {
    if (items.some((item) => item.id === id)) {
      setSelectedId(id)
    }
  }

  function clearSelection() {
    setSelectedId(null)
  }

  const value = {
    selectedId,
    selectedItem,
    selectSkill,
    clearSelection,
  }

  return (
    <SkillSelectionContext.Provider value={value}>
      {children}
    </SkillSelectionContext.Provider>
  )
}