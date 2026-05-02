import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import NavHeader from './NavHeader.jsx'
import LandingPage from './LandingPage.jsx'
import BuilderPage from './BuilderPage.jsx'
import HomePage from './HomePage.jsx'
import AnalysisPage from './AnalysisPage.jsx'
import CreateATransectPage from './CreateATransectPage.jsx'
import './App.css'

export default function App() {
  return (
    <HashRouter>
      <div className="app-shell">
        <NavHeader />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/builder" element={<BuilderPage />} />
            <Route path="/climate-data" element={<HomePage />} />
            <Route path="/analysis" element={<AnalysisPage />} />
            <Route path="/create-a-transect" element={<CreateATransectPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  )
}
