import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import NavHeader from './NavHeader.jsx'
import BuilderPage from './BuilderPage.jsx'
import HomePage from './HomePage.jsx'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <NavHeader />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/builder" element={<BuilderPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}
