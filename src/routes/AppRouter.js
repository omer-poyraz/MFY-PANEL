import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// Components
import LoadingSpinner from '../components/LoadingSpinner'

// Pages
import Home from '../pages/home/Home'
import BlogList from '../pages/blog/BlogList'
import Login from '../pages/auth/Login'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  
  if (loading) {
    return <LoadingSpinner />
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

// Public Route Component (login sayfası için)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  
  if (loading) {
    return <LoadingSpinner />
  }
  
  return isAuthenticated ? <Navigate to="/" replace /> : children
}

const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />
      
      {/* Protected Routes */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/blog" 
        element={
          <ProtectedRoute>
            <BlogList />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/menu" 
        element={
          <ProtectedRoute>
            <div>Menü Sayfası</div>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/services" 
        element={
          <ProtectedRoute>
            <div>Hizmetler Sayfası</div>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/settings" 
        element={
          <ProtectedRoute>
            <div>Ayarlar Sayfası</div>
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <div>Profil Sayfası</div>
          </ProtectedRoute>
        } 
      />
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRouter
