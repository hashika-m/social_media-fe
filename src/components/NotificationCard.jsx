import React from 'react'
import profile from '../assets/profile.jpeg'

const NotificationCard = ({ n }) => {
    
    return (
        <div className='w-full flex justify-between items-center px-4 py-2 bg-white/90 rounded-lg shadow-sm hover:bg-gray-100 transition duration-200 min-h-[3rem]'>

            {/* Sender Info */}
            <div className='flex gap-3 items-center'>
                <div className='w-12 h-12 sm:w-10 sm:h-10 rounded-full overflow-hidden cursor-pointer border border-gray-200 flex-shrink-0'>
                    <img
                        src={n.sender?.profilePic || profile}
                        alt='profile Pic'
                        className='w-full h-full object-cover block'
                    />
                </div>

                <div className='flex flex-col'>
                    <h1 className='text-sm sm:text-xs font-semibold text-gray-800'>
                        {n.sender?.name || 'Unknown'}
                    </h1>
                    <div className='text-xs sm:text-[10px] text-gray-700 truncate max-w-[150px] sm:max-w-[100px]'>
                        {n.message || ''}
                    </div>
                </div>
            </div>

            {/* Post / Loop Media */}
            <div className='w-14 h-14 sm:w-12 sm:h-12 rounded-lg overflow-hidden border-2 border-amber-500 flex-shrink-0'>
                {n.loop?.media ? (
                    <video src={n.loop.media} muted autoPlay className="w-full h-full object-cover" />
                ) : n.post?.media ? (
                    n.post.mediaType === 'image' ? (
                        <img src={n.post.media} className="w-full h-full object-cover" />
                    ) : (
                        <video src={n.post.media} muted loop className="w-full h-full object-cover" />
                    )
                ) : null}
            </div>
        </div>
    )
}

export default NotificationCard