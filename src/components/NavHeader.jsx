import { NavLink } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/builder', label: 'Builder' },
  { to: '/climate-data', label: 'Climate Data' },
  { to: '/analysis', label: 'Analysis' },
  { to: '/koppen', label: 'Koppen' },
]

export default function NavHeader() {
  return (
    <nav className="nav-header">
      <NavLink to="/" className="nav-brand">
        Transect Project
      </NavLink>
      <div className="nav-links">
        {NAV_LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => 'nav-link' + (isActive ? ' nav-link-active' : '')}
          >
            {label}
          </NavLink>
        ))}
        <a
          href="https://github.com/duskvirkus/transect-project"
          target="_blank"
          rel="noreferrer"
          className="nav-link"
        >
          Project Source Code
        </a>
      </div>
    </nav>
  )
}
