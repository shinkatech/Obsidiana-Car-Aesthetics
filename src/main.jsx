import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@fontsource/big-shoulders-display/latin-800'
import '@fontsource/big-shoulders-display/latin-900'
import '@fontsource/instrument-sans/latin-400'
import '@fontsource/instrument-sans/latin-500'
import '@fontsource/instrument-sans/latin-600'
import '@fontsource/ibm-plex-mono/latin-400'
import '@fontsource/ibm-plex-mono/latin-500'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
