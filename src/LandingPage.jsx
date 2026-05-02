import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const navigate = useNavigate()
  const heroBg = `url(${import.meta.env.BASE_URL}landing.png)`

  return (
    <div className="landing-page" style={{ backgroundImage: heroBg }}>
      <div className="landing-overlay">
        <h1 className="landing-title">Transect Project</h1>
        <p className="landing-description">
          This project analyzes climate data along a transect of weather stations on the
          slopes of Mount Fuji (transect 278). Use the tools below to explore the default
          dataset or build your own transect from scratch.
        </p>
        <div className="landing-actions">
          <button className="btn-primary" onClick={() => navigate('/climate-data')}>
            View Fuji 278 Transect
          </button>
          <button className="btn-secondary" onClick={() => navigate('/create-a-transect')}>
            Create a Transect
          </button>
        </div>
      </div>
    </div>
  )
}
