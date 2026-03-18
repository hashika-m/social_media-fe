import React, { useState } from 'react'
import logo from '../assets/icon.png'
import api from '../api/api.js'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice.js'

const SignUp = () => {

    const navigate = useNavigate()
    const dispatch=useDispatch()
    // states to handel inputs
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage('')

        try {
            const res = await api.post('/auth/signup', { name, email, password })
            localStorage.setItem('token', res.data.token)
            setMessage(res.data.message)
            setName('')
            setEmail('')
            setPassword('')
            dispatch(setUserData(res.data))
            navigate('/home')
            console.log('sucess:', res.data)
        } catch (err) {
            setMessage(err.response?.data.message || "Something went wrong")
            console.log(err)
        }

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 px-4">

            {/* Card */}
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

                {/* Logo + Title */}
                <div className="flex flex-col items-center gap-3 mb-6">
                    <img src={logo} alt="logo" className="w-14 sm:w-16" />
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
                        Create Account
                    </h2>
                    <p className="text-gray-500 text-sm sm:text-base">
                        Join us and connect with your friends!
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-5">

                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />

                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />

                        <button
                            type="submit"
                            className="mt-2 py-3 rounded-xl text-white font-semibold bg-linear-to-r from-indigo-500 via-green-500 to-amber-500 hover:opacity-90 active:scale-95 transition-all duration-200 cursor-pointer"
                        >
                            Create Account
                        </button>
                    </div>

                </form>

                
                {/* Footer */}
                <p className="text-center text-gray-500 text-sm mt-6">
                    Already have an account?
                    <span
                        onClick={() => navigate("/signin")}
                        className="text-indigo-600 font-medium cursor-pointer hover:underline ml-1"
                    >
                        Sign In
                    </span>
                </p>


                {/* messgae for users */}
                <div className='text-left mt-2'>
                    {message && <p className='text-center text-success'>{message}</p>}

                </div>

            </div>
        </div>
    )
}

export default SignUp
