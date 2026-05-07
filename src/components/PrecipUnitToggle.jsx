import { usePrecipUnit } from './PrecipUnitContext.jsx'
import { PRECIP_UNITS } from '../lib/precipitation.js'

export default function PrecipUnitToggle() {
  const { unit, setUnit } = usePrecipUnit()
  return (
    <div className="temp-scale-strip">
      {PRECIP_UNITS.map(({ key, label }) => (
        <button
          key={key}
          className={'temp-scale-btn' + (unit === key ? ' temp-scale-btn-active' : '')}
          onClick={() => setUnit(key)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
