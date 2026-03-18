import React, { useRef, useState } from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import profile from '../assets/profile.jpeg'
import api from "../api/api";
import { setProfileData, setUserData } from '../redux/userSlice';

const EditProfile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userData } = useSelector((state) => state.user)
    const imageInput = useRef()
    const [frontendImage, setFrontendImage] = useState(userData.profilePic || profile)
    const [backendImage, setBackendImage] = useState(null)


    const [loading, setLoading] = useState(false)
    const [name, setName] = useState(userData?.name || "")
    const [email, setEmail] = useState(userData?.email || "")
    const [bio, setBio] = useState(userData?.bio || "")
    const [profession, setProfession] = useState(userData?.profession || "")
    const [gender, setGender] = useState(userData?.gender || "")

    // const handleImage = (e) => {
    //     const file = e.target.files[0]
    //     setBackendImage(file)
    //     setFrontendImage(URL.createObjectURL(file))

    // }

    const handleImage = (e) => {
        const file = e.target.files[0]
        if (!file) return

        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
    }
    const handleEditProfile = async () => {
        setLoading(true)
        try {
            const formdata = new FormData()
            formdata.append('name', name)
            formdata.append('email', email)
            formdata.append('bio', bio)
            formdata.append('profession', profession)
            formdata.append('gender', gender)
            // formdata.append('profilePic',backendImage)
            console.log('image', backendImage)
            if (backendImage) {
                formdata.append('profilePic', backendImage)

                // setLoading(false)
            }
            const result = await api.post('/user/editProfile', formdata, { withCredentials: true })
            dispatch(setProfileData(result.data.user))
            dispatch(setUserData(result.data.user))

            navigate(`/profile/${result.data.user._id}`)

        } catch (error) {
            console.log(error.response?.data || error)
            setLoading(false)
        }
    }









    return (
        <div className='w-full m-h-screen  flex items-center flex-col gap-5'>
            {/* back btn */}
            <div className="w-full h-16 flex gap-5 items-center px-6  fixed">
                <IoMdArrowRoundBack
                    className="w-6 h-6 cursor-pointer hover:text-red-700"
                    onClick={() => navigate(`/profile/${userData._id}`)}
                />
                <h1 className='font-semibold text-2xl'>Edit Profile</h1>

            </div>

            {/* profice pic */}
            <div onClick={() => imageInput.current.click()}
                className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border mt-15 md:mt-3">
                <input type="file" accept='image/*' ref={imageInput} hidden onChange={handleImage} />
                <img
                    src={frontendImage}
                    //  src={`${frontendImage}?t=${Date.now()}`}
                    alt="profile"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* editing */}
            <div onClick={() => imageInput.current.click()}
                className='text-amber-600 text-center text-[18px] font-semibold cursor-pointer'>Change Your profile picture</div>

            <input onChange={(e) => setName(e.target.value)} value={name}
                type="text" className='w-[90%] max-w-md h-15 bg-gray-100 border-2 border-amber-600 rounded-2xl px-5 outline-none text-black font-semibold'
                placeholder='Enter your name' />
            <input onChange={(e) => setEmail(e.target.value)} value={email}
                type="text" className='w-[90%] max-w-md h-15 bg-gray-100 border-2 border-amber-600 rounded-2xl px-5 outline-none  text-black font-semibold'
                placeholder='Enter your email' />
            <input onChange={(e) => setBio(e.target.value)} value={bio}
                type="text" className='w-[90%] max-w-md h-15 bg-gray-100 border-2 border-amber-600 rounded-2xl px-5 outline-none  text-black font-semibold'
                placeholder='Enter your bio' />
            <input onChange={(e) => setProfession(e.target.value)} value={profession}
                type="text" className='w-[90%] max-w-md h-15 bg-gray-100 border-2 border-amber-600 rounded-2xl px-5 outline-none  text-black font-semibold'
                placeholder='Enter your profession' />
            <input onChange={(e) => setGender(e.target.value)} value={gender}
                type="text" className='w-[90%] max-w-md h-15 bg-gray-100 border-2 border-amber-600 rounded-2xl px-5 outline-none  text-black font-semibold'
                placeholder='Enter your gender' />
            <button
                onClick={handleEditProfile}
                disabled={loading}
                className="px-2.5 min-w-37 py-1 h-10 bg-amber-600 rounded-2xl text-white hover:bg-amber-700 cursor-pointer disabled:opacity-50"
            >
                {loading ? 'Saving...' : 'Save Changes'}
            </button>


        </div>
    )
}

export default EditProfile