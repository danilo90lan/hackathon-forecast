import { Container, Navbar, Nav } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from './pages/Home'
import Details from './pages/Details'
import SavedCities from './pages/SavedCities'
import 'react-toastify/dist/ReactToastify.css'
import SavedCitiesProvider from './context/SavedCitiesContext'
import WeatherProvider from './context/WeatherContext'

function App() {
  return (
    <WeatherProvider>
    <SavedCitiesProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/saved' element={<SavedCities />} />
          <Route path='/details/:id' element={<Details />} />
        </Routes>
      </Router>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </SavedCitiesProvider>
    </WeatherProvider>
  )
}

export default App
