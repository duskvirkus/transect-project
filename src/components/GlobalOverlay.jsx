import { useLocation } from 'react-router-dom'
import TempScaleToggle from './TempScaleToggle.jsx'
import PrecipUnitToggle from './PrecipUnitToggle.jsx'

const PRECIP_ROUTES = new Set(['/climate-data', '/analysis'])

export default function GlobalOverlay() {
  const { pathname } = useLocation()
  return (
    <div className="global-overlay">
      <TempScaleToggle />
      {PRECIP_ROUTES.has(pathname) && <PrecipUnitToggle />}
    </div>
  )
}
