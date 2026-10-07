import AppLayout from './components/layout/AppLayout.jsx'
import SkillSelectionProvider from './providers/SkillSelectionProvider.jsx'
import SkillsContainer from './pages/SkillsContainer.jsx'
import CaseContainer from './pages/CaseContainer.jsx'
import { skills } from './data/skills.js'

const navigationLinks = [
  { href: '#about', label: 'Про мене' },
  { href: '#skills', label: 'Навички' },
  { href: '#new-case', label: 'Новий кейс' },
]

export default function App() {
  return (
    <AppLayout title="DA Track" links={navigationLinks}>
      <SkillSelectionProvider items={skills}>
        <SkillsContainer items={skills} />
        <CaseContainer />
      </SkillSelectionProvider>
    </AppLayout>
  )
}