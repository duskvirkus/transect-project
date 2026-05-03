import { Link } from 'react-router-dom'
import { useTempScale } from './TempScaleContext.jsx'
import { TEMP_SCALES } from './temperature.js'

export default function TempScaleToggle() {
  const { scale, setScale } = useTempScale()

  return (
    <div className="temp-scale-overlay">
      <div className="temp-scale-strip">
        {TEMP_SCALES.map(({ key, name, symbol }) => (
          <button
            key={key}
            className={'temp-scale-btn' + (scale === key ? ' temp-scale-btn-active' : '')}
            onClick={() => setScale(key)}
          >
            {scale === key ? `${name} (${symbol})` : symbol}
          </button>
        ))}
      </div>
      {scale === 'felsius' && (
        <Link to="/what-is-felsius" className="felsius-info-link">
          What is Felsius?
        </Link>
      )}
    </div>
  )
}
