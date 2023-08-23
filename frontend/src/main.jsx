import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './context/authContext.jsx'
import { DateProvider } from './context/dateContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <DateProvider>
      <React.StrictMode>
        <BrowserRouter>
            <App /> 
        </BrowserRouter>
      </React.StrictMode>,
      </DateProvider>
  </AuthProvider>
  
)
