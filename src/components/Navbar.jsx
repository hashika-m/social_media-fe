import React from 'react'
import { MdOutlineHome } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { AiOutlinePlus } from "react-icons/ai";
import { GoVideo } from "react-icons/go";
import profile from '../assets/profile.jpeg'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const navigate=useNavigate()
    const {userData}=useSelector((state)=>state.user)
    console.log('Navbar userData:',userData._id)
    return (
        <>
            <div className="fixed bottom-5 left-1/2 -translate-x-1/2  w-[90%] sm:w-[70%] md:w-[55%] lg:w-[40%] xl:w-[30%] h-16 bg-black  flex justify-around items-center rounded-full 
                shadow-2xl shadow-black/40 z-50 text-white " >
                {/* items */}
                <div className='w-6 h-6 text-2xl cursor-pointer' onClick={()=>navigate('/home')}><MdOutlineHome /></div>
                <div className='w-6 h-6 text-2xl cursor-pointer' onClick={()=>navigate('/search')}><CiSearch /></div>
                <div className='w-6 h-6 text-2xl cursor-pointer' onClick={()=>navigate('/upload')}><AiOutlinePlus /></div>
                <div className='w-6 h-6 text-2xl cursor-pointer' onClick={()=>navigate('/loops')}><GoVideo /></div>
                <div>
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 cursor-pointer" 
                    onClick={()=>{if(userData?._id){navigate(`/profile/${userData._id}`)}}}>
                        <img
                            src={userData.profilePic || profile}
                            alt="profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar