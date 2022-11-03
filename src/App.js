import WelcomePage from './pages/WelcomePage'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/notesAppAuth" element={<WelcomePage />} />
          <Route path="/notesAppAuth/homepage" element={<HomePage />} />
          <Route path="/notesAppAuth/homepage/about" element={<AboutPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
