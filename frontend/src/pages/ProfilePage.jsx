import toast from 'react-hot-toast'
import { useAuthStore } from '../store/useAuthStore'
import { useState, useEffect } from 'react'

function ProfilePage() {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore()
  const defaultProfilePic = 'https://tse2.mm.bing.net/th?id=OIP.AMuITtaBEpeV3rkv96skRgHaD3&pid=Api&P=0&h=180'


  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if(!file) return;

    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onloadend  = async () => {
      const base64Image = reader.result;
      await updateProfile({profilePic: base64Image})

    }
  }


  return (
    <div className='flex flex-col items-center'>
      <div>
        <label htmlFor="image-change">
      <img className='rounded-full size-48 my-10 border-2  cursor-pointer' src= {authUser.profilePic || defaultProfilePic} />
      </label>
      <input type='file' accept='image/*' className='hidden' id='image-change' onChange={handleImageUpload} />
      </div>

      <div className='flex flex-col text-xl gap-4'>
        <h1>User Information</h1>
        <p>Email: {authUser.email}</p>
        <p>Full Name: {authUser.fullName}</p>

      </div>
      <div className='flex flex-col text-xl gap-4'>
        <h1>Additional Info</h1>
        <p>User Since {new Date(authUser.createdAt).toLocaleDateString()}</p>
        <p>Account Status <span className='text-green-500'>Active</span> </p>
      </div>

    </div>
  )
}

export default ProfilePage