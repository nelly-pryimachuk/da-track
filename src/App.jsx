import AppLayout from './components/layout/AppLayout.jsx'
import HomePage from './pages/HomePage.jsx'
import CasePage from './pages/CasePage.jsx'
import { skills } from './data/skills.js'

const navigationLinks = [
  { href: '#about', label: 'Про мене' },
  { href: '#skills', label: 'Навички' },
  { href: '#new-case', label: 'Новий кейс' },
]

export default function App() {
  const exampleSkill = skills.find((item) => item.id === 'skill-002')

  return (
    <AppLayout title="DA Track" links={navigationLinks}>
      <HomePage />
      <CasePage skill={exampleSkill} />
    </AppLayout>
  )
}