import { NavLink } from 'react-router-dom'

export default function NavHeader() {
  return (
    <nav className="nav-header">
      <span className="nav-brand">MET 1050 · Transect</span>
      <div className="nav-links">
        <NavLink
          to="/"
          end
          className={({ isActive }) => 'nav-link' + (isActive ? ' nav-link-active' : '')}
        >
          Climate Data
        </NavLink>
        <NavLink
          to="/builder"
          className={({ isActive }) => 'nav-link' + (isActive ? ' nav-link-active' : '')}
        >
          Builder
        </NavLink>
      </div>
    </nav>
  )
}
