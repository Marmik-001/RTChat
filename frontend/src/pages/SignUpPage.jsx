import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"
import toast from "react-hot-toast"
function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
  })
  const {isSigningUp , signup} = useAuthStore()

  const validateForm = () => {
    if(!formData.email || !formData.password || !formData.fullName) {
      return toast.error('Please fill all fields')
    }
    if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      return toast.error('Invalid Email')
    }

    if(formData.password.length < 6) {
      return toast.error('Password must be atleast 6 characters')
    }
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(validateForm()) {
      signup(formData)
    }
  }


  return (
    
    <div className="min-h-screen grid lg:grid-cols-2 place-items-center">
      {/* Left */}
      <div className="bg-red-50 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">

        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label ">Email</label>
            <input type="text" placeholder="John@email.com" 
            value={formData.email}
            onChange= {(e) => setFormData({...formData, email: e.target.value})}
            />
             <label className="label ">Full Name</label>
            <input type="text" placeholder="John Doe" 
            value={formData.fullName}
            onChange= {(e) => setFormData({...formData, fullName: e.target.value})}
            />
             <label className="label ">Password</label>
            <input type="password" placeholder="********" 
            value={formData.password}
            onChange= {(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <button type="submit" className="text-lg border-2 border-black py-2 px-6 my-6 bg-black text-white disabled:bg-green-500" disabled={isSigningUp}>Sign Up </button>
        </form>
        <div>Already a user ? <Link to='/signin' className="text-blue-500"  >Sign In</Link>  </div>
        </div>
      </div>
      {/* Right */}
      <div></div>
    </div>
  )
}
export default SignUpPage