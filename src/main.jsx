import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './assets/css/styles.css'
import ErrorBoundary from './context/ErrorBoundary'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
    <App />
    </ErrorBoundary>
  </StrictMode>
)
