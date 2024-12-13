import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from './pages/Home'
import Details from './pages/Details'
import SavedCities from './pages/SavedCities'
import 'react-toastify/dist/ReactToastify.css'
import SavedCitiesProvider from './context/SavedCitiesContext'
import WeatherProvider from './context/WeatherContext'
import { Nav, Navbar } from 'react-bootstrap'


function App() {
  return (
    <WeatherProvider>
      <SavedCitiesProvider>

        <Router>
        <nav>
          <div id='nav-panel'>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='me-auto'>
                <Nav.Link as={NavLink} to='/'>
                  Home
                </Nav.Link>
                <Nav.Link as={NavLink} to='/saved'>
                  Saved Cities
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </div>
        </nav>
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
