import { useLocation } from 'react-router-dom'
import TempScaleToggle from './TempScaleToggle.jsx'
import PrecipUnitToggle from './PrecipUnitToggle.jsx'

const TEMP_ROUTES = new Set(['/climate-data', '/analysis'])
const PRECIP_ROUTES = new Set(['/climate-data', '/analysis'])

export default function GlobalOverlay() {
  const { pathname } = useLocation()
  return (
    <div className="global-overlay">
      {TEMP_ROUTES.has(pathname) && <TempScaleToggle />}
      {PRECIP_ROUTES.has(pathname) && <PrecipUnitToggle />}
    </div>
  )
}
