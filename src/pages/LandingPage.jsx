import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const navigate = useNavigate()
  const heroBg = `url(${import.meta.env.BASE_URL}landing.png)`

  return (
    <div className="landing-page" style={{ backgroundImage: heroBg }}>
      <div className="landing-overlay">
        <h1 className="landing-title">Transect Project</h1>
        <p className="landing-description">
          This is a project for my Meteorology class at{' '}
          <a className="landing-link" href='https://www.frontrange.edu/'>Front Range Community College</a>.{' '}
          The project analyzes the climate along a transect (or line). The one I selected
          starts in Fuji, Japan and goes West 8° North, into South Korea and then China.
          You can use this site to explore my transect or create your own.
        </p>
        <div className="landing-actions">
          <button className="btn-primary" onClick={() => navigate('/analysis')}>
            View Fuji Transect
          </button>
          <button className="btn-secondary" onClick={() => navigate('/create-a-transect')}>
            Create a Transect
          </button>
        </div>
      </div>
    </div>
  )
}
