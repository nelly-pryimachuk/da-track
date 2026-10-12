import { Outlet } from 'react-router'
import SiteHeader from './SiteHeader.jsx'
import SkillSelectionProvider from '../../providers/SkillSelectionProvider.jsx'
import CasesProvider from '../../providers/CasesProvider.jsx'

const navigationLinks = [
  { to: '/', label: 'Головна', end: true },
  { to: '/skills', label: 'Навички' },
  { to: '/cases', label: 'Кейси' },
]

export default function AppLayout({ items }) {
  return (
    <>
      <a className="skip-link" href="#main-content">Перейти до вмісту</a>
      <SiteHeader title="DA Track" links={navigationLinks} />
      <main id="main-content" tabIndex={-1}>
        <SkillSelectionProvider items={items}>
          <CasesProvider items={items}>
            <Outlet />
          </CasesProvider>
        </SkillSelectionProvider>
      </main>
      <footer>Навчальний проєкт. Навички та кейси.</footer>
    </>
  )
}