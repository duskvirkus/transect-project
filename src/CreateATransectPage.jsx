import { useNavigate } from 'react-router-dom'

const STEPS = [
  {
    number: 1,
    title: 'Builder',
    path: '/builder',
    description:
      'Use the map to place stations along your transect. You can drag points to adjust their positions and download the resulting transect JSON.',
  },
  {
    number: 2,
    title: 'Climate Data',
    path: '/climate-data',
    description:
      'Upload your transect JSON to fetch 30-year climate normals (1996–2025) from Open-Meteo ERA5 for each station. Download the enriched dataset when complete.',
  },
  {
    number: 3,
    title: 'Analysis',
    path: '/analysis',
    description:
      'Analyze and visualize the climate data across your transect stations to identify patterns with elevation and geography.',
    comingSoon: true,
  },
]

export default function CreateATransectPage() {
  const navigate = useNavigate()

  return (
    <div className="create-transect-page">
      <h1>Create a Transect</h1>
      <p>Follow these three steps to build and analyze your own transect.</p>
      <ul className="transect-steps">
        {STEPS.map((step) => (
          <li key={step.number} className={`transect-step${step.comingSoon ? ' transect-step-coming-soon' : ''}`}>
            <div className="step-header">
              <span className="step-number">{step.number}</span>
              <h2>{step.title}</h2>
              {step.comingSoon && <span className="step-badge-coming-soon">Coming Soon</span>}
            </div>
            <p>{step.description}</p>
            <button className="btn-secondary" onClick={() => navigate(step.path)} disabled={step.comingSoon}>
              Go to {step.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
