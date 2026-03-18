import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IoMdArrowRoundBack } from "react-icons/io";
import profile from '../assets/profile.jpeg'
import { BsImageFill } from "react-icons/bs";
import { BsFillSendFill } from "react-icons/bs";
import SenderMessage from '../components/SenderMessage';
import ReceiverMessage from '../components/ReceiverMessage';
import api from '../api/api';
import { setMessages } from '../redux/messageSlice';
// import { socket } from '../hooks/socket';
import { getSocket } from '../hooks/socket';




const MessageArea = () => {
    const { selectedUser, messages } = useSelector(state => state.message);
    const { userData } = useSelector(state => state.user);
    const navigate = useNavigate()
    const [input, setInput] = useState('')
    const imageInput = useRef(null)
    const [frontendImage, setFrontendImage] = useState(null)
    const [backendImage, setBackendImage] = useState(null)
    const dispatch = useDispatch()
    const socket = getSocket();
    // const { socket } = useSelector(state => state.socket)
    const handleImage = (e) => {
        const file = e.target.files[0]
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))

    }
    const handleSendMessage = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('message', input)
            if (backendImage) {
                formData.append('image', backendImage)
            }
            const result = await api.post(`/message/send/${selectedUser._id}`, formData, { withCredentials: true })
            dispatch(setMessages([...messages, result.data]))
            setInput('')
            setBackendImage(null)
            setFrontendImage(null)

        } catch (error) {
            console.log(error)
        }
    }
    const getAllMessages = async () => {
        try {
            const result = await api.get(`/message/getAll/${selectedUser._id}`, { withCredentials: true })
            dispatch(setMessages(result.data))

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAllMessages()


    }, [])

    // useEffect(()=>{
    //     socket.on('newMessage',(mess)=>{
    //         dispatch(setMessages((messages)=>[...messages,mess]))
    //         console.log(mess)
    //     })
    //     return ()=>socket.off('newMessage')
    // },[])
    // new connection socket
    useEffect(() => {
        if (!socket) return;

        const handleMessage = (mess) => {
            dispatch(setMessages([...messages, mess]));
        };
        socket.on('newMessage', handleMessage);
        return () => socket.off('newMessage', handleMessage);
    }, [socket, messages]);


    return (
        <div className='w-full h-screen relative'>
            {/* header */}
            <div className='flex items-center  gap-2 px-5 py-2.5 fixed top-0 z-100 '>
                {/* back btn */}
                <div className=" h-10 flex gap-5 items-center px-5">
                    <IoMdArrowRoundBack
                        className="w-6 h-6 cursor-pointer hover:text-red-700"
                        onClick={() => navigate(`/home`)}
                    />
                </div>
                {/* profile pic */}
                <div onClick={() => navigate(`/profile/${selectedUser.userEmail}`)}
                    className='w-10 h-10  rounded-full cursor-pointer overflow-hidden '>
                    <img src={selectedUser.profilePic || profile} alt='profilePic' className='w-full object-cover' />
                </div>
                {/* users name */}
                <div className='text-sm font-semibold'>
                    <div>{selectedUser.name}</div>
                    <div className='text-gray-700 tetx-xs'>{selectedUser.email}</div>
                </div>
            </div>

            {/* chat layout */}
            <div className='w-full h-[80%] pt-25 lg:pb-37.5 px-10 flex flex-col gap-7 overflow-auto bg-white/80'>
                {messages && messages.map((m, index) => (
                    m.sender == userData._id ?
                        <SenderMessage key={index} message={m} /> :
                        <ReceiverMessage key={index} message={m} />
                ))}
            </div>

            {/* input text area */}
            <div className='w-full h-20 fixed bottom-0 flex justify-center items-center bg-gray-200 z-100'>
                <form onSubmit={handleSendMessage}
                    className='w-[90%] max-w-200 h-[80%] rounded-full bg-white/80 flex items-center gap-2.5 px-5 relative'>
                    {frontendImage && <div className='w-25 rounded-2xl h-25 absolute -top-30 right-2.5 overflow-hidden'>
                        <img src={frontendImage} alt='image' className='h-full object-cover' />
                    </div>
                    }

                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
                        placeholder='Message' className='w-full h-full px-5 text-md text-black  outline-0'
                    />
                    <input type='file' onChange={handleImage}
                        accept='image/*' hidden
                        ref={imageInput}
                    />
                    <div onClick={() => imageInput.current.click()}>
                        <BsImageFill className='w-6 h-6  cursor-pointer' />
                    </div>

                    {(input || frontendImage) &&
                        <button className='cursor-pointer w-15 h-10 rounded-full bg-amber-500 flex items-center justify-center'>
                            <BsFillSendFill className='w-6 h-5 ' />
                        </button>
                    }

                </form>
            </div>
        </div>
    )
}

export default MessageArea
// -----------------------------------------------without socket
// import React, { useEffect, useRef, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { IoMdArrowRoundBack } from "react-icons/io";
// import profile from '../assets/profile.jpeg'
// import { BsImageFill } from "react-icons/bs";
// import { BsFillSendFill } from "react-icons/bs";
// import SenderMessage from '../components/SenderMessage';
// import ReceiverMessage from '../components/ReceiverMessage';
// import api from '../api/api';
// import { setMessages } from '../redux/messageSlice';



// const MessageArea = () => {
//     const { selectedUser, messages } = useSelector(state => state.message);
//     const { userData } = useSelector(state => state.user);
//     const navigate = useNavigate()
//     const [input, setInput] = useState('')
//     const imageInput = useRef(null)
//     const [frontendImage, setFrontendImage] = useState(null)
//     const [backendImage, setBackendImage] = useState(null)
//     const dispatch = useDispatch()
//     // const { socket } = useSelector(state => state.socket)
//     const handleImage = (e) => {
//         const file = e.target.files[0]
//         setBackendImage(file)
//         setFrontendImage(URL.createObjectURL(file))

//     }
//     const handleSendMessage = async (e) => {
//         e.preventDefault()
//         try {
//             const formData = new FormData()
//             formData.append('message', input)
//             if (backendImage) {
//                 formData.append('image', backendImage)
//                 console.log("Selected image:", backendImage)
//             }
//             const result = await api.post(`/message/send/${selectedUser._id}`, formData, { withCredentials: true })
//             dispatch(setMessages([...messages, result.data]))
//             setInput('')
//             setBackendImage(null)
//             setFrontendImage(null)
//         } catch (error) {
//             console.log(error)
//         }
//     }
//     const getAllMessages = async () => {
//         try {
//             const result = await api.get(`/message/getAll/${selectedUser._id}`, { withCredentials: true })
//             dispatch(setMessages(result.data))
//             // dispatch(addMessage(result.data))

//         } catch (error) {
//             console.log(error)
//         }
//     }
//     useEffect(() => {
//         if (!selectedUser) return
//         getAllMessages()
//     }, [selectedUser])

//     // useEffect(() => {
//     //     if (!socket) return;

//     //     const handleNewMessage = (message) => {
//     //         dispatch(addMessage(message))
//     //     }

//     //     socket.on("newMessage", handleNewMessage)

//     //     return () => {
//     //         socket.off("newMessage", handleNewMessage)
//     //     }

//     // }, [socket])
//     // if (!selectedUser) {
//     //     return (
//     //         <div className="h-screen flex items-center justify-center">
//     //             No chat selected
//     //         </div>
//     //     )
//     // }
//     return (
//         <div className='w-full h-screen relative'>
//             {/* header */}
//             <div className='flex items-center  gap-2 px-5 py-2.5 fixed top-0 z-100 '>
//                 {/* back btn */}
//                 <div className=" h-10 flex gap-5 items-center px-5">
//                     <IoMdArrowRoundBack
//                         className="w-6 h-6 cursor-pointer hover:text-red-700"
//                         onClick={() => navigate(`/home`)}
//                     />
//                 </div>
//                 {/* profile pic */}
//                 <div onClick={() => navigate(`/profile/${selectedUser._id}`)}
//                     className='w-10 h-10  rounded-full cursor-pointer overflow-hidden '>
//                     <img src={selectedUser.profilePic || profile} alt='profilePic' className='w-full object-cover' />
//                 </div>
//                 {/* users name */}
//                 <div className='text-sm font-semibold'>
//                     <div>{selectedUser.name}</div>
//                     <div className='text-gray-700 tetx-xs'>{selectedUser.email}</div>
//                 </div>
//             </div>

//             {/* chat layout */}
//             <div className='w-full h-[80%] pt-25 lg:pb-37.5 px-10 flex flex-col gap-7 overflow-auto bg-white/80'>
//                 {messages && messages.map((m, index) => (
//                     m.sender == userData._id ?
//                         <SenderMessage key={index} message={m} /> :
//                         <ReceiverMessage key={index} message={m} />
//                 ))}
//             </div>

//             {/* input text area */}
//             <div className='w-full h-20 fixed bottom-0 flex justify-center items-center bg-gray-200 z-100'>
//                 <form onSubmit={handleSendMessage}
//                     className='w-[90%] max-w-200 h-[80%] rounded-full bg-white/80 flex items-center gap-2.5 px-5 relative'>
//                     {frontendImage && <div className='w-25 rounded-2xl h-25 absolute -top-30 right-2.5 overflow-hidden'>
//                         <img src={frontendImage} alt='image' className='h-full object-cover' />
//                     </div>
//                     }

//                     <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
//                         placeholder='Message' className='w-full h-full px-5 text-md text-black  outline-0'
//                     />
//                     <input type='file' onChange={handleImage}
//                         accept='image/*' hidden
//                         ref={imageInput}
//                     />
//                     <div onClick={() => imageInput.current.click()}>
//                         <BsImageFill className='w-6 h-6  cursor-pointer' />
//                     </div>

//                     {(input || frontendImage) &&
//                         <button className='cursor-pointer w-15 h-10 rounded-full bg-amber-500 flex items-center justify-center'>
//                             <BsFillSendFill className='w-6 h-5 ' />
//                         </button>
//                     }

//                 </form>
//             </div>
//         </div>
//     )
// }

// export default MessageArea

