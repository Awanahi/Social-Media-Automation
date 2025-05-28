import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Pages
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Automations from './pages/Automations'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'

// Components
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'

// Supabase
import { supabase } from './lib/supabase'

// Styles
import './index.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for active session on load
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session) {
        setIsAuthenticated(true)
        setUser(session.user)
      }
      
      setLoading(false)
    }
    
    checkSession()
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          setIsAuthenticated(true)
          setUser(session.user)
          toast.success('Successfully signed in!')
        }
        
        if (event === 'SIGNED_OUT') {
          setIsAuthenticated(false)
          setUser(null)
          toast.info('Signed out')
        }
      }
    )
    
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) {
        toast.error(error.message)
        return false
      }
      
      return true
    } catch (error) {
      toast.error('An error occurred during login')
      return false
    }
  }
  
  const logout = async () => {
    try {
      await supabase.auth.signOut()
    } catch (error) {
      toast.error('Error signing out')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login login={login} isAuthenticated={isAuthenticated} />} />
        
        <Route 
          path="/" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout logout={logout} />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="automations" element={<Automations />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
