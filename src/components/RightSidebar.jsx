import React from 'react'
import Messages from '../pages/Messages'

const RightSidebar = () => {
  return (
    <div className='w-[25%] hidden lg:block min-h-screen bg-white border-l-2 border-gray-200 '>
      <Messages/>
    </div>
  )
}

export default RightSidebar