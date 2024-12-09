import { Container, Navbar, Nav } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from './pages/Home'
import 'react-toastify/dist/ReactToastify.css'
import SavedCitiesProvider from './context/SavedCitiesContext'

function App() {

  return (
    <SavedCitiesProvider>
      <Router>
        <Navbar bg='dark' variant='dark' expand='lg' sticky='top'>
          <Container>
            <Navbar.Brand as={Link} to='/'>
              WeatherWise
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='me-auto'>
                <Nav.Link as={Link} to='/'>
                  Home
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          <Route path='/' element={<Home />} />
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
