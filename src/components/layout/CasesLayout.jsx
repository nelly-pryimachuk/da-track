import { NavLink, Outlet } from 'react-router'
import CaseNotice from '../cases/CaseNotice.jsx'

export default function CasesLayout() {
  return (
    <>
      <nav aria-label="Навігація розділом кейсів">
        <ul className="nav-list">
          <li><NavLink to="." end>Список кейсів</NavLink></li>
          <li><NavLink to="new">Новий кейс</NavLink></li>
        </ul>
      </nav>
      <p>Локальні дані зберігаються до перезавантаження сторінки.</p>
      <CaseNotice />
      <Outlet />
    </>
  )
}