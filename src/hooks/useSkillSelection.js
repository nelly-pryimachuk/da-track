import { useContext } from 'react'
import { SkillSelectionContext } from '../context/SkillSelectionContext.js'

export default function useSkillSelection() {
  const selection = useContext(SkillSelectionContext)
  if (selection === null) {
    throw new Error(
      'useSkillSelection must be used within SkillSelectionProvider',
    )
  }
  return selection
}