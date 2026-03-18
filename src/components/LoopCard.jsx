import React, { useEffect, useRef, useState } from 'react'
import profile from '../assets/profile.jpeg'
import FollowButton from './FollowButton'
import { useNavigate } from 'react-router-dom'
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineComment } from "react-icons/ai";
import api from '../api/api';
import { setLoopData } from '../redux/loopSlice';
import { FiSend } from "react-icons/fi";
import { getSocket } from '../hooks/socket';

const LoopCard = ({ loop }) => {
  const videoRef = useRef(null)
  const commentRef = useRef()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.user)
  const { loopData } = useSelector(state => state.loop)
  const [showComment, setShowComment] = useState(false)
  const [message, setMessage] = useState('')
  const socket = getSocket();

  const handleLike = async () => {
    try {
      const res = await api.get(`/loop/like/${loop._id}`, {}, { withCredentials: true })
      const updatedLoop = res.data

      const updatedLoops = loopData.map(l =>
        l._id === updatedLoop._id ? updatedLoop : l
      )

      dispatch(setLoopData(updatedLoops))
    } catch (error) {
      console.log(error)
    }
  }
  const handleComment = async () => {
    if (!message.trim()) return

    try {
      const res = await api.post(
        `/loop/comment/${loop._id}`,
        { message },
        { withCredentials: true }
      )

      const updatedLoop = res.data

      const updatedLoops = loopData.map(l =>
        l._id.toString() === updatedLoop._id.toString()
          ? updatedLoop
          : l
      )

      dispatch(setLoopData(updatedLoops))
      setMessage('')
    } catch (error) {
      console.log(error)
    }
  }
  // for loops video
  useEffect(() => {
    const observer = new IntersectionObserver((entry) => {
      // console.log(entry)
      const video = videoRef.current
      if (entry.isIntersecting) {
        video.play()
      } else {
        video.pause()
      }
    }, { threshold: 0.6 })
    if (videoRef.current) {
      observer.observe(videoRef.current)

    }
    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current)

      }
    }

  }, [])
  // for commnt popup
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (commentRef.current && !commentRef.current.contains(e.target)) {
        setShowComment(false)
      }
    }
    if (showComment) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showComment])



useEffect(() => {
  if (!socket || !Array.isArray(loopData)) return;
  console.log("Listening for loop events...");
  const handleLike = (updatedData) => {
    console.log("LIKE LOOP:", updatedData);
    const updatedLoops = loopData.map(p =>
      p._id.toString() === updatedData.loopId.toString()
        ? { ...p, likes: updatedData.likes }
        : p
    );
    dispatch(setLoopData(updatedLoops));
  };
  const handleComment = (updatedData) => {
    console.log("COMMENT LOOP:", updatedData);
    const updatedLoops = loopData.map(p =>
      p._id.toString() === updatedData.loopId.toString()
        ? { ...p, comments: updatedData.comments }
        : p
    );
    dispatch(setLoopData(updatedLoops));
  };
  socket.on('likedLoop', handleLike);
  socket.on('commentLoop', handleComment);
  return () => {
    socket.off('likedLoop', handleLike);
    socket.off('commentLoop', handleComment);
  };
}, [socket, dispatch, loopData]);




  return (
    <div className='w-full lg:w-120 h-screen flex items-end justify-center border-l-2 border-r-2 border-amber-100 relative overflow-hidden'>

      <video
        ref={videoRef}
        src={loop?.media}
        autoPlay
        // muted
        loop
        playsInline
        controls
        className='w-full h-full object-contain'
      />
      {/* user  profile caption and like, comment... sections */}
      <div className='w-full absolute h-25 px-5 mb-10 cursor-pointer'>
        <div className="flex items-center gap-3">

          {/* user commecting pop up section */}
          <div
            ref={commentRef}
            className={`absolute z-50 bottom-0 w-full h-125 px-2.5 rounded-4xl transition-transform duration-500 ease-in-out shadow-2xl bg-gray-200 left-0 ${showComment ? 'translate-y-0' : 'translate-y-full hidden'
              }`}
          >

            <h1 className='text-[20px] text-amber-600 text-center font-semibold'>
              Comments
            </h1>
            {/* mapping comments */}
            {loop.comments.length == 0 && <div className='text-center text-20px font-medium mt-8'>
              No comments
            </div>}
            <div  className='w-full h-80 overflow-y-auto flex flex-col gap-5'>
              {loop.comments?.map((com, index) => (
                <div  key={index} className='w-full min-w-20 flex px-2 gap-1 items-center justify-start '>
                  {/* user profile pic+message */}
                    <div className="w-7 h-7 rounded-full overflow-hidden border border-gray-300">
                      <img
                        src={com.author?.profilePic || profile}
                        alt="profile"
                        className="w-full h-full object-cover"
                        onClick={() => navigate(`/profile/${loop.author?._id}`)}
                      />
                    </div>
                    <div>
                      <span className="font-semibold pl-2" >{com.author?.name}: </span>
                      {com.message}
                    </div>
                  </div>
              ))}
            </div>

            {/* Input field for adding comment */}
            <div className="w-full absolute bottom-3 flex items-center gap-3 px-5">
              <div className="w-10 h-8 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-gray-300">
                <img
                  src={userData?.profilePic || profile}
                  alt="profile"
                  className="w-full h-full  object-cover"
                />
              </div>

              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write comment..."
                className="px-3 border-b-2 border-b-gray-500 w-full outline-none h-10 bg-transparent"
              />

              <button
                className="cursor-pointer"
                onClick={handleComment}
              >
                <FiSend className="w-6 h-6" />
              </button>
            </div>

          </div>

          {/* Profile pic */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-gray-300">
            <img
              src={loop.author?.profilePic || profile}
              alt="profile"
              className="w-full h-full object-cover"
              onClick={() => navigate(`/profile/${loop.author?._id}`)}
            />
          </div>

          {/* Name */}
          <div className="font-semibold text-sm sm:text-base truncate max-w-35 sm:max-w-50">
            {loop.author?.name}
          </div>
          <FollowButton targetUserId={loop.author?._id} tailwind={'px-3 py-1 ml-5 bg-amber-500 text-white border-none rounded-full border-white'} />
        </div>
        {/* caption of loop */}
        <div className='text-gray-700 font-medium'>
          {loop.caption}
        </div>
        {/* likes and comment */}
        <div className=' absolute right-0 flex flex-col gap-3 bottom-25 justify-center px-2.5'>
          {/* like */}
          <div className='flex flex-col items-center cursor-pointer'>
            <div onClick={handleLike} className='flex items-center justify-center gap-1'>
              {loop.likes?.includes(userData?._id)
                ? <GoHeartFill className='text-red-600 w-6 h-6' />
                : <GoHeart className='w-6 h-6' />
              }
              <span>{loop.likes?.length}</span>
            </div>
          </div>
          {/* comment */}
          <div className='flex items-center justify-center gap-1'>
            <AiOutlineComment onClick={() => setShowComment(true)} className='w-6.25 h-6.25 cursor-pointer' />
            <span>{loop.comments?.length}</span>
          </div>


        </div>
      </div>

    </div>

  )
}

export default LoopCard