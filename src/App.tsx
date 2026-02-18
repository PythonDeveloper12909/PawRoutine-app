import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import PetManagement from './components/PetManagement'
import HealthLogs from './components/HealthLogs'
import Analytics from './components/Analytics'
import Settings from './components/Settings'
import Layout from './components/Layout'
import { getBasename } from './utils/router'

interface User {
  id: string
  name: string
  email: string
}

function App() {
  const basename = getBasename()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const handleLogin = (userData: User) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        {!user ? (
          <>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup onSignup={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <Route path="/" element={<Layout onLogout={handleLogout} />}>
            <Route index element={<Dashboard />} />
            <Route path="pets" element={<PetManagement />} />
            <Route path="logs" element={<HealthLogs />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings user={user} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default App
