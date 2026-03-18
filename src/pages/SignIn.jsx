import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/icon.png'
import api from '../api/api.js'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice.js'

const SignIn = () => {
  const navigate = useNavigate()
  const dispatch=useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    console.log(email, password)
    setMessage('')


    try {
      const res = await api.post('/auth/signin', { email, password })

      setMessage(res.data.message)
      setEmail('')
      setPassword('')
      dispatch(setUserData(res.data.user))
      navigate('/home')

      console.log('sucess:', res.data)
    } catch (err) {
     setMessage(err.response?.data?.message || "Something went wrong")
      console.log(err)
      setLoading(false)
    }

  }
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 px-4">

        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

          <div className="flex flex-col items-center gap-3 mb-6">
            <img src={logo} alt="logo" className="w-14" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Sign In...
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
              Login to connect & share
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="py-3 rounded-xl text-white font-semibold bg-linear-to-r from-indigo-500 via-green-500 to-amber-500 hover:opacity-90 active:scale-95 transition"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

          </form>

          {/* messgae for users */}
          <div className='text-left mt-2'>
            {message && <p className='text-center text-success'>{message}</p>}

          </div>
          {/* footer */}
          {/* signup link */}
          <p className="text-center text-gray-500 text-sm mt-6">
            Don't have an account?
            <span onClick={() => navigate("/signup")} className="text-indigo-600 font-medium cursor-pointer hover:underline ml-1"> Sign Up</span>

          </p>
          {/* forgot-password link */}
          <p className="text-center text-gray-500 text-sm mt-2">
            Forgotted password?
              < span onClick = {() => navigate("/forgotPassword")} className = "text-indigo-600 font-medium cursor-pointer hover:underline ml-1" > Forgot - Password ?</span >
          </p>


        </div>
      </div>
    </>
  )
}

export default SignIn


