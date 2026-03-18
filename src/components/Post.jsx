import React, { useEffect, useState } from 'react'
import profile from '../assets/profile.jpeg'
import VideoPlayer from './VideoPlayer'
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineComment } from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";
import api from '../api/api';
import { setPostData } from '../redux/postSlice';
import { setUserData } from '../redux/userSlice'
import FollowButton from './FollowButton';
import { useNavigate } from 'react-router-dom';
import { getSocket } from '../hooks/socket';

const Post = ({ post }) => {

    const userData = useSelector(state => state.user)
    const postData = useSelector(state => state.post)
    const [showComment, setShowComment] = useState(true)
    const [message, setMessage] = useState('')
    const [isSaved, setIsSaved] = useState(userData?.saved?.includes(post?._id) || false)
    const dispatch = useDispatch()
    // console.log("userData:", userData)
    // console.log("author:", post.author)
    const navigate = useNavigate()
    const socket = getSocket();
    // const[likes,setLikes]=useState(post.likes.length)


    const handleLike = async () => {
        try {
            const result = await api.get(`/post/like/${post._id}`, { withCredentials: true })
            const updatedPost = result.data

            // Safe optimistic update - ensure postData is array
            if (Array.isArray(postData)) {
                const updatedPosts = postData.map(p =>
                    p._id.toString() === post._id.toString() ? updatedPost : p
                )
                dispatch(setPostData(updatedPosts))
            }

            // Always refetch fresh data (fixes refresh)
            setTimeout(async () => {
                const freshResult = await api.get('/post/getAll')
                dispatch(setPostData(freshResult.data))
            }, 200)
        } catch (error) {
            console.log(error)
        }
    }
    const handleComment = async () => {
        if (!message.trim()) return; // Prevent empty comments

        try {
            const result = await api.post(`/post/comment/${post._id}`, { message }, { withCredentials: true })
            const updatedPost = result.data
            // Safe optimistic update - ensure postData is array
            if (Array.isArray(postData)) {
                const updatedPosts = postData.map(p =>
                    p._id.toString() === post._id.toString() ? updatedPost : p
                )
                dispatch(setPostData(updatedPosts))
            }

            // Always refetch fresh data (fixes refresh)
            setTimeout(async () => {
                const freshResult = await api.get('/post/getAll')
                dispatch(setPostData(freshResult.data))
            }, 200)

            setMessage('')

        } catch (error) {
            console.log(error)
        }
    }

    const handleSaved = async () => {
        try {
            // Optimistic update
            setIsSaved(!isSaved)

            const result = await api.post(`/post/saved/${post._id}`, {}, { withCredentials: true })
            dispatch(setUserData(result.data))

            // Refetch fresh user data shortly after
            setTimeout(async () => {
                const userResult = await api.get('/user/current')
                dispatch(setUserData(userResult.data))
            }, 200)
        } catch (error) {
            // Revert optimistic update on error
            setIsSaved(isSaved)
            console.log('Save post error:', error.response?.data || error.message)
        }
    }

    // realtime-likes
    useEffect(() => {
        // if (!socket || !Array.isArray(postData)) return;

        console.log("Listening for likedPost...");
        // const handleLike = (updatedPost) => {
        //     console.log("LIKE RECEIVED:", updatedPost);
        //     const updatedPosts = postData.map(p =>
        //        p._id.toString() === updatedPost._id.toString() ? updatedPost : p
        //     );
        //     dispatch(setPostData(updatedPosts));
        // };
        socket.on('likedPost', (data)=>{
            console.log('receivedLike',data)
            console.log('post:',post)
                setPostData((prev)=>{prev.map((p)=>p._id.toString()===data._id.toString()?{...p,likes:data.likes}:p)})
                // setLikes(data.likes)
        });
        return () => socket.off('likedPost');
    }, []);
    // realtime-comments
    useEffect(() => {
        if (!socket || !Array.isArray(postData)) return;
        const handleComment = (updatedPost) => {
            console.log("COMMENT RECEIVED:", updatedPost);
            const updatedPosts = postData.map(p =>
               p._id.toString() === updatedPost._id.toString() ? updatedPost : p
            );
            dispatch(setPostData(updatedPosts));
        };
        socket.on('commentPost', handleComment);
        return () => socket.off('commentPost', handleComment);
    }, [socket, dispatch]);
    console.log("Socket in Post:", socket);

    return (
        <div className="w-[95%] sm:w-[90%] flex flex-col gap-3 bg-white items-center shadow-xl shadow-[#00000030] rounded-2xl p-3">

            {/* Header */}
            <div onClick={() => navigate(`/profile/${post.author._id}`)}
                className="w-full flex justify-between items-center">

                <div className="flex items-center gap-3">

                    {/* Profile pic */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-gray-300">
                        <img
                            src={post.author?.profilePic || profile}
                            alt="profile"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Name */}
                    <div className="font-semibold text-sm sm:text-base truncate max-w-35 sm:max-w-50">
                        {post.author?.name}
                    </div>

                </div>

                {/* Follow button */}
                {/* <button className="text-sm px-3 py-1 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition cursor-pointer">
                    Follow
                </button> */}
                {userData?.userData?._id !== post?.author?._id && (
                    <FollowButton
                        tailwind="text-sm px-3 py-1 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition cursor-pointer"
                        targetUserId={post.author._id}
                    />
                )}

            </div>

            {/* Media */}
            <div className="w-full flex items-center justify-center">

                {post.mediaType === "image" && (
                    <img
                        src={post.media}
                        alt="preview"
                        className="rounded-xl w-full max-h-112.5 object-contain"
                    />
                )}

                {post.mediaType === "video" && (
                    <div className="w-full max-h-112.5">
                        <VideoPlayer media={post.media} />
                    </div>
                )}

            </div>
            {/* like and comment  and save*/}
            <div className='w-full h-15 flex justify-between items-center px-5 mt-2.5 '>
                {/* left part */}
                <div className='flex justify-center items-center gap-2.5'>
                    {/* like */}
                    <div className='flex items-center justify-center gap-1'>
                        {post.likes?.includes(userData?._id) && <GoHeart onClick={handleLike} className='w-6.25 h-6.25 cursor-pointer' />}
                        {!post.likes?.includes(userData?._id) && <GoHeartFill onClick={handleLike} className='text-red-800 w-6.25 h-6.25 cursor-pointer' />}
                        <span>{post.likes?.length}</span>
                        {/* <span>{likes.length}</span> */}
                    </div>
                    {/* commnet */}
                    <div className='flex items-center justify-center gap-1'>
                        <AiOutlineComment onClick={() => setShowComment(!showComment)} className='w-6.25 h-6.25 cursor-pointer' />
                        <span>{post.comments?.length}</span>
                    </div>
                </div>
                {/* right part */}
                <div>
                    {!isSaved ? (
                        <FaRegBookmark
                            onClick={handleSaved}
                            className='w-6.25 h-6.25 cursor-pointer'
                        />
                    ) : (
                        <FaBookmark
                            onClick={handleSaved}
                            className='w-6.25 h-6.25 cursor-pointer'
                        />
                    )}
                </div>
            </div>
            {/* caption field of teh user */}
            {post.caption && <div className='w-full px-5 gap-2.5 flex justify-start items-center'>
                <h1>{post.author.name}</h1>
                <div>{post.caption}</div>
            </div>}

            {/* Comment section */}
            {showComment && (
                <div className="w-full flex flex-col gap-4 pb-5">

                    {/* Input field for adding comment */}
                    <div className="w-full flex items-center gap-3 px-5 relative">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-gray-300">
                            <img
                                src={userData?.profilePic || profile}
                                alt="profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Write comment..."
                            className="px-3 border-b-2 border-b-gray-500 w-full outline-none h-10"
                        />
                        <button
                            className="absolute right-5 cursor-pointer"
                            onClick={handleComment}
                        >
                            <FiSend className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Existing comments */}
                    <div className="w-full max-h-75 overflow-auto">
                        {post.comments.map((com, index) => (
                            <div
                                key={index}
                                className="w-full px-5 py-2 flex items-center gap-3 border-b border-gray-200"
                            >
                                <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-300">
                                    <img
                                        src={com.author?.profilePic || profile}
                                        alt="profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <span className="font-semibold">{com.author?.name}: </span>
                                    {com.message}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            )}

        </div >
    )
}

export default Post
