import React, { useState } from 'react'
import api from '../api/api.js'
import logo from '../assets/icon.png'

const ForgotPassword = () => {

  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await api.post('/auth/forgotPassword', { email })
      setMessage(res.data.message)
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong')
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 px-4">
      
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

          <div className="flex flex-col items-center gap-3 mb-6">
            <img src={logo} alt="logo" className="w-14" />
            <h2 className="text-2xl font-semibold text-gray-800">
             Forgot Password
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
               Enter your email to receive a reset link
            </p>
          </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              placeholder="example@email.com"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="py-3 rounded-xl text-white font-semibold bg-linear-to-r from-indigo-500 via-green-500 to-amber-500 hover:opacity-90 active:scale-95 transition"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

        </form>

        {/* Message */}
        {message && (
          <p className="mt-5 text-center text-sm text-black font-medium">
            {message}
          </p>
        )}

      </div>
    </div>
  )
}

export default ForgotPassword