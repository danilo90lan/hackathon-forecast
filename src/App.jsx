import { Container, Navbar, Nav } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from './pages/Home'
import Details from './pages/Details'
import 'react-toastify/dist/ReactToastify.css'
import SavedCitiesProvider from './context/SavedCitiesContext'

function App () {
  return (
    <SavedCitiesProvider>
      <Router>
        <nav>
          <div id='nav-panel'>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='me-auto'>
                <Nav.Link as={Link} to='/'>
                  Home
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </div>

        </nav>
        <Routes>
          <Route path='/' element={<Home />} />
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
  )
}

export default App
