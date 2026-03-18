import React from 'react'
import { useSelector } from 'react-redux'

const ReceiverMessage = ({message}) => {
    // const {userData}=useSelector(state=>state.user)
     const {selectedUser}=useSelector(state=>state.message)
  return (
    <div className='w-fit max-w-[60%] bg-blue-200 rounded-t-2xl rounded-br-2xl rounded-bl-0 p-2.5 relative left-0 flex flex-col gap-2'>
      {message.image && 
        <img className='h-50 object-cover rounded-2xl'
        src={message.image} 
        alt='sender img'
        />
        }
        {message.message && <div className='text-[18px] wrap-break-word'>
            {message.message}
        </div>}

        <div className=' w-7.5 h-7.5 rounded-full cursor-pointer overflow-hidden absolute -left-6 -bottom-6.5'>
            <img src={selectedUser.profilePic} alt='sender profile' className='w-full object-cover'/>
        </div>
    </div>
  )
}

export default ReceiverMessage