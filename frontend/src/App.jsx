import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { Routes , Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'

function App() {
  
  const {authUser , checkAuth} = useAuthStore()

  useEffect(() => {
    checkAuth()
  },[checkAuth])
console.log(authUser);

  return (
   <div>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        
      </Routes>
   </div>
  )
}

export default App
