import WelcomePage from './pages/WelcomePage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/notesAppAuth" element={<WelcomePage />} />
          <Route path="/notesAppAuth/homepage" element={<HomePage />} />
          <Route path="/notesAppAuth/homepage/about" element={<AboutPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
