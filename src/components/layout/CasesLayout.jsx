import { NavLink, Outlet } from 'react-router'
import CaseNotice from '../cases/CaseNotice.jsx'
import CasesGate from '../cases/CasesGate.jsx'

export default function CasesLayout() {
  return (
    <>
      <nav aria-label="Навігація розділом кейсів">
        <ul className="nav-list">
          <li><NavLink to="." end>Список кейсів</NavLink></li>
          <li><NavLink to="new">Новий кейс</NavLink></li>
        </ul>
      </nav>
      <p>Кейси зберігаються в локальному сховищі цього браузера.</p>
      <CaseNotice />
      <CasesGate>
        <Outlet />
      </CasesGate>
    </>
  )
}