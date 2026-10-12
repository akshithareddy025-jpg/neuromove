import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/premium-glass.css'
import App from './App.jsx'
import SmoothScrollProvider from './components/ui/SmoothScrollProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SmoothScrollProvider>
      <App />
    </SmoothScrollProvider>
  </StrictMode>,
)

