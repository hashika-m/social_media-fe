import React, { useRef, useState } from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlus } from "react-icons/ai";
import VideoPlayer from '../components/VideoPlayer';
import api from '../api/api.js'
import { useDispatch, useSelector } from 'react-redux'
import { setPostData } from '../redux/postSlice.js';
// import { setStoryData } from '../redux/storySlice.js';
import { setLoopData } from '../redux/loopSlice.js';
import { setUserData } from '../redux/userSlice.js';

const Upload = () => {
    const navigate = useNavigate()
    const [uploadType, setUploadType] = useState('post')
    const [frontendMedia, setFrontendMedia] = useState(null)
    const [backendMedia, setBackendMedia] = useState(null)
    const [mediaType, setMediaType] = useState('')
    const mediaInput = useRef(null)
    const [caption, setCaption] = useState('')
    const dispatch = useDispatch()
    const { postData } = useSelector(state => state.post)
    // const { storyData } = useSelector(state => state.story)
    const { loopData } = useSelector(state => state.loop)
    const [loading, setLoading] = useState(false)

    const handleMedia = (e) => {
        const file = e.target.files[0]
        console.log(file)
        if (!file) return
        if (file.type.includes('image')) {
            setMediaType('image')

        } else {
            setMediaType('video')
        }
        setBackendMedia(file)
        setFrontendMedia(URL.createObjectURL(file))
    }

    const uploadPost = async () => {

        try {
            const formData = new FormData()
            formData.append('caption', caption)
            formData.append('mediaType', mediaType)
            formData.append('media', backendMedia)
            const result = await api.post('/post/upload', formData, { withCredentials: true })
            console.log(result)
            dispatch(setPostData([...postData, result.data]))
            setLoading(false)
            navigate('/home')
        } catch (error) {
            console.log(error)
        }
    }

    const uploadStory = async () => {
        try {
            const formData = new FormData()

            formData.append('mediaType', mediaType)
            formData.append('media', backendMedia)
            const result = await api.post('/story/upload', formData, { withCredentials: true })
            console.log(result)
            // dispatch(setStoryData([...storyData, result.data]))
            setUserData((prev)=>({...prev,story:result.data}))
            setLoading(false)
            navigate('/home')
        } catch (error) {
            console.log(error)
        }
    }

    const uploadLoop = async () => {
        try {
            const formData = new FormData()
            formData.append('caption', caption)
            //    formData.append('mediaType',mediaType)
            formData.append('media', backendMedia)
            const result = await api.post('/loop/upload', formData, { withCredentials: true })
            console.log(result)
            dispatch(setLoopData([...loopData, result.data]))
            setLoading(false)
            navigate('/home')
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpload = () => {
        setLoading(true)
        if (uploadType === 'post') {
            uploadPost()
        } else if (uploadType === 'story') {
            uploadStory()
        } else {
            uploadLoop()
        }
    }


    return (
        <div className='w-full h-screen flex flex-col items-center'>

            {/* Header */}
            <div className="w-full h-16 flex gap-5 items-center px-6 fixed top-0 left-0 bg-white z-10">
                <IoMdArrowRoundBack
                    className="w-6 h-6 cursor-pointer hover:text-red-700"
                    onClick={() => navigate(`/home`)}
                />
                <h1 className='font-semibold text-2xl'>Upload Media</h1>
            </div>

            {/* Toggle Nav */}
            <div className='w-[80%] max-w-150 h-14 bg-black rounded-full flex justify-around items-center gap-2.5 mt-20'>

                <div onClick={() => setUploadType('post')}
                    className={`w-[30%] h-10 flex justify-center items-center text-[18px] rounded-full cursor-pointer transition
                         ${uploadType === 'post'
                            ? 'bg-white text-black shadow-2xl shadow-amber-300'
                            : 'text-white hover:bg-white hover:text-black hover:shadow-2xl hover:shadow-amber-300'
                        }`}
                >
                    Post
                </div>

                <div onClick={() => setUploadType('story')}
                    className={`w-[30%] h-10 flex justify-center items-center text-[18px] rounded-full cursor-pointer transition
                          ${uploadType === 'story'
                            ? 'bg-white text-black shadow-2xl shadow-amber-300'
                            : 'text-white hover:bg-white hover:text-black hover:shadow-2xl hover:shadow-amber-100'
                        }`}
                >
                    Story
                </div>

                <div onClick={() => setUploadType('loop')}
                    className={`w-[30%] h-10 flex justify-center items-center text-[18px] rounded-full cursor-pointer transition
                           ${uploadType === 'loop'
                            ? 'bg-white text-black shadow-2xl shadow-amber-300'
                            : 'text-white hover:bg-white hover:text-black hover:shadow-2xl hover:shadow-amber-300'
                        }`}
                >
                    Loop
                </div>

            </div>

            {/* uploading section */}
            {/* <div onClick={() => mediaInput.current.click()} className='w-[80%] max-w-125 h-60 bg-[#0e1316] border-gray-800 border-2 flex flex-col items-center justify-center gap-2 mt-[15vh] rounded-2xl cursor-pointer hover:bg-[#353a3d] text-amber-100'>
                <input type='file' hidden ref={mediaInput} onChange={handleMedia} />
                <AiOutlinePlus className='w-6 h-6 text-2xl cursor-pointer' />
                <div className='text-[19px]'>
                    Upload {uploadType}
                </div>

            </div> */}

            {/* file uploading process */}
            {/* Upload box */}
            {!frontendMedia && (
                <div
                    onClick={() => mediaInput.current.click()}
                    className='w-[80%] max-w-125 h-60 bg-[#0e1316] border-gray-800 border-2 flex flex-col items-center justify-center gap-2 mt-[15vh] rounded-2xl cursor-pointer hover:bg-[#353a3d] text-amber-100'
                >
                    <input type='file'accept={uploadType=='loop'? 'video/*':''} hidden ref={mediaInput} onChange={handleMedia} />

                    <AiOutlinePlus className='w-6 h-6 text-2xl' />

                    <div className='text-[19px]'>
                        Upload {uploadType}
                    </div>
                </div>
            )}

            {/* Preview */}
            {frontendMedia && (
                <div className='w-[80%] max-w-125 mt-[10vh]  flex justify-center'>

                    {mediaType === "image" && (
                        <div className=' '>
                            <img
                                src={frontendMedia}
                                alt="preview"
                                className="rounded-2xl max-h-100"
                            />
                            {uploadType !== 'story' &&
                                <input type='text'
                                    className='w-full border-b-gray-400 border-b-2 outline-none px-2.5  mt-5'
                                    placeholder='Write caption'
                                    onChange={(e) => setCaption(e.target.value)}
                                    value={caption}
                                />}
                        </div>
                    )}

                    {/* {mediaType === "video" && (
                        <div className='relative cursor-pointer max-w-full rounded-2xl overflow-hidden'>
                            <video
                                src={frontendMedia}
                                controls
                                className="rounded-2xl max-h-100 w-full"
                            />
                            {uploadType !== 'story' && (
                                <input
                                    type='text'
                                    className='w-full border-b-gray-400 border-b-2 outline-none px-2.5 mt-5'
                                    placeholder='Write caption'
                                />
                            )}
                        </div>
                    )} */}

                    {mediaType === "video" && (
                        <div className="w-full">
                            <VideoPlayer media={frontendMedia} />
                            {/* <video src={frontendMedia} controls style={{width:"400px"}} /> */}

                            {uploadType !== "story" && (
                                <input
                                    type="text"
                                    className="w-full border-b-gray-400 border-b-2 outline-none px-2.5 mt-5"
                                    placeholder="Write caption"
                                    onChange={(e) => setCaption(e.target.value)}
                                    value={caption}
                                />
                            )}
                        </div>
                    )}

                </div>
            )}
            {frontendMedia &&
                <button
                    className='px-2.5 w-[60%] max-w-100 py-1 h-12.5 bg-black text-white mt-12.5 cursor-pointer rounded-2xl'
                    onClick={handleUpload}
                    disabled={loading}
                >
                    {loading ? 'Uploading...' : `Upload ${uploadType}`}
                </button>}

        </div >
    )
}

export default Upload