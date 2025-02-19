import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CategoryProvider } from './Context/CategoryContext.jsx'


createRoot(document.getElementById('root')).render(
  <CategoryProvider>
    <App />
  </CategoryProvider>,
)
