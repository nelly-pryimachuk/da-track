import { NavLink, Outlet } from 'react-router'

export default function CasesLayout() {
  return (
    <>
      <nav aria-label="Навігація розділом кейсів">
        <ul className="nav-list">
          <li><NavLink to="." end>Список кейсів</NavLink></li>
          <li><NavLink to="new">Новий кейс</NavLink></li>
        </ul>
      </nav>
      <Outlet />
    </>
  )
}