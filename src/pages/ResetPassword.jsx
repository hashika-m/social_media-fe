import React from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/api.js'
import logo from '../assets/icon.png'

const ResetPassword = () => {
      const { token } = useParams()
  const navigate = useNavigate()
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const [error,setError]=useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
    }
    
     setError('')
     setLoading(true)
    try {
      const res = await api.post(`/auth/resetPassword/${token}`, { newPassword, confirmPassword })
      alert(res.data.message)
      navigate('/signin')
    } catch (err) {
      setError(err.response?.data.message || 'Incorrect password')
      console.log(err);
    } finally{
      setLoading(false)
    }
  };
  return (
   <>
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 px-4">
         
         <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
   
             <div className="flex flex-col items-center gap-3 mb-6">
               <img src={logo} alt="logo" className="w-14" />
               <h2 className="text-2xl font-semibold text-gray-800">
                Reset Password
               </h2>
               <p className="text-gray-500 text-sm sm:text-base">
                 Reset Your Password!
               </p>
             </div>
   
           {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="py-3 rounded-xl text-white font-semibold bg-linear-to-r from-indigo-500 via-green-500 to-amber-500 hover:opacity-90 active:scale-95 transition w-full">
          {loading? 'Resetting....':'Reset Password'}
          </button>
        </form>

        {/* Message */}
        {error && <p className="mt-4 text-center text-sm text-red-500 font-medium">{error}</p>}

   
         </div>
       </div>
   </>
  )
}

export default ResetPassword