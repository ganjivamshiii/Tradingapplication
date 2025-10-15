import React from 'react'
import { BrowserRouter as Router , Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './components/context/AuthContext'
import ProtectedRoute from './components/common/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Dashboard from './pages/Dashboard'
import LandingPage from './pages/LandingPage'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Dashboard - Can be accessed without login (demo mode) */}
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;