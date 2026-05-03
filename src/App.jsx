import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { TempScaleProvider } from './components/TempScaleContext.jsx'
import NavHeader from './components/NavHeader.jsx'
import LandingPage from './pages/LandingPage.jsx'
import BuilderPage from './pages/BuilderPage.jsx'
import CollectDataPage from './pages/CollectDataPage.jsx'
import AnalysisPage from './pages/AnalysisPage.jsx'
import CreateATransectPage from './pages/CreateATransectPage.jsx'
import WhatIsFelsiusPage from './pages/WhatIsFelsiusPage.jsx'
import TempScaleToggle from './components/TempScaleToggle.jsx'

export default function App() {
  return (
    <TempScaleProvider>
      <HashRouter>
        <div className="app-shell">
          <NavHeader />
          <div className="page-content">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/builder" element={<BuilderPage />} />
              <Route path="/climate-data" element={<CollectDataPage />} />
              <Route path="/analysis" element={<AnalysisPage />} />
              <Route path="/create-a-transect" element={<CreateATransectPage />} />
              <Route path="/what-is-felsius" element={<WhatIsFelsiusPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <TempScaleToggle />
        </div>
      </HashRouter>
    </TempScaleProvider>
  )
}
