import React from 'react'
import profile from '../assets/profile.jpeg';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedUser } from '../redux/messageSlice';

const OnlineUser = ({user}) => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    
    return (
        <div className='w-15 h-15 flex gap-5 justify-start items-center relative'>
            {/* profile */}
            <div onClick={()=>{
                dispatch(setSelectedUser(user))
                navigate(`/messageArea`)

            }}
            key={user._id} className="w-10 h-10 cursor-pointer rounded-full overflow-hidden border-2 border-white">
                <img
                    src={user.profilePic || profile}
                    alt={user.name}
                    className="w-full h-full object-cover"
                />
            </div>
            {/* status of user */}
            <div className='w-2.5 h-2.5 bg-amber-700 rounded-full absolute top-10 right-5.5'>

            </div>
        </div>
    )
}

export default OnlineUser