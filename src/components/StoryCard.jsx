import React from 'react'
import profile from '../assets/profile.jpeg'
import { GoPlus } from "react-icons/go"
import { useNavigate } from 'react-router-dom'

const StoryCard = ({ userName, profilePic, hasStory, email, isOwn }) => {

  const navigate = useNavigate()

  const handleClick = () => {

    // open story
    if (hasStory) {
      navigate(`/story/${email}`)
      return
    }

    // upload story
    if (isOwn) {
      navigate('/upload')
    }

  }

  return (
    <div className="flex flex-col items-center">

      {/* story ring */}
      <div
        className={`w-19 h-19 ${hasStory ? 'bg-linear-to-tr from-indigo-500 via-green-500 to-amber-600 p-0.5' : ''} rounded-full flex justify-center items-center relative`}
      >

        {/* profile */}
        <div
          onClick={handleClick}
          className="w-17 h-17 rounded-full overflow-hidden border-2 border-gray-300 cursor-pointer"
        >
          <img
            src={profilePic || profile}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* + icon */}
        {isOwn && !hasStory && (
          <GoPlus
            className="absolute -bottom-1 -right-1 text-xl font-extrabold bg-amber-500 text-white rounded-full p-1 border-2 border-white"
            onClick={() => navigate('/upload')}
          />
        )}

      </div>

      <div className="text-[14px] text-center truncate w-20 mt-1">
        {userName}
      </div>

    </div>
  )
}

export default StoryCard