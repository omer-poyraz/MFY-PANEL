import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './css/main.css'

// Context
import { AuthProvider } from './contexts/AuthContext'

// Router
import AppRouter from './routes/AppRouter'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppRouter />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
