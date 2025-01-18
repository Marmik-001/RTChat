import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { Routes , Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'
import { useThemeStore } from './store/useThemeStore'
import {Loader} from 'lucide-react'
import {Toaster} from 'react-hot-toast'
function App() {
  
  const {theme} = useThemeStore()
  const {authUser , checkAuth , isCheckingAuth ,  onLineUsers} = useAuthStore()
  console.log('app online users',onLineUsers);
  useEffect(() => {
    checkAuth()
  },[checkAuth])
if(isCheckingAuth && !authUser) {
 return  <div className='flex justify-center items-center h-screen'>
    <Loader  className='size-20  animate-spin-slow '/>
  </div>
}
  return (
<div data-theme = {theme} >
      <Navbar /> 
      <Routes>
        <Route path="/" element={ authUser?  <HomePage /> : <Navigate to='/signin' /> } />
        <Route path="/signup" element={ !authUser ?   <SignUpPage /> : <Navigate to='/' /> } />
        <Route path="/signin" element={ !authUser ?   <SignInPage /> : <Navigate to='/' /> } />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={ authUser?   <ProfilePage /> : <Navigate to='/signin' />} />
        
      </Routes>
      <Toaster />
   </div>
  )
}

export default App
