import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { EmotionProvider } from './contexts/EmotionContext'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <EmotionProvider>
        <App />
      </EmotionProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
