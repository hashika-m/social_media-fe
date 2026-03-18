import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Home from './pages/Home'
import PublicRoute from './components/PublicRoute'
import ProtectedRoute from './components/ProtectedRoute'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import api from './api/api'
import { setUserData, setAuthLoading } from './redux/userSlice'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import Upload from './pages/Upload'
import Loops from './pages/Loops'
import useAllLoops from './hooks/useGetAllLoops'
import Story from './pages/Story'
import Messages from './pages/Messages'
import MessageArea from './pages/MessageArea'
// import useGetAllStories from './hooks/useGetAllStories'
// import useGetAllPost from './hooks/usegetAllPost'
// import { useSelector } from "react-redux";
// import { io } from 'socket.io-client'
// import { setOnlineUsers } from './redux/socketSlice'
import useGetFollowingList from './hooks/useGetFollowingList'
import useGetPrevChatUsers from './hooks/useGetPrevChatUsers'
// import { socket } from './hooks/socket'
import { setOnlineUsers } from './redux/socketSlice'
import { connectSocket, getSocket } from "./hooks/socket";
import Search from './pages/Search'
import useGetAllNotifications from './hooks/useGetAllNotifications'
import Notifications from './pages/Notifications'
const App = () => {
  // auth checking
  const dispatch = useDispatch()
  //  useGetAllPost()  //to get all post in feed
  useAllLoops()
  // useGetAllStories()
  useGetFollowingList()
  useGetPrevChatUsers()
  const fetchNotifications = useGetAllNotifications()
  const { userData } = useSelector(state => state.user)

  // useEffect(() => {
  //   if (userData) {

  //     socket.on('getOnlineUsers', (users) => {
  //       dispatch(setOnlineUsers(users));
  //       console.log(users)
  //     });

  //     return () => {
  //       socket.off('getOnlineUsers')
  //     };
  //   }
  // }, [userData, dispatch]);

  // new connection socket
  useEffect(() => {
    if (!userData?._id) return;

    const socket = connectSocket(userData._id);

    console.log("Sending userId:", userData._id);

    socket.on("getOnlineUsers", (users) => {
      console.log("Online users:", users);
      dispatch(setOnlineUsers(users));
    });

    return () => {
      socket.disconnect();
    };
  }, [userData]);

  // notification
  useEffect(() => {
    if (userData) {
      fetchNotifications(); // fetch all existing notifications
      connectSocket(userData._id); // connect the socket for real-time updates
    }
  }, [userData]);


  // authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get('/user/current')
        dispatch(setUserData(res.data))
      } catch (error) {
        dispatch(setUserData(null))
        console.log(error)
      } finally {
        dispatch(setAuthLoading(false))
      }
    }

    checkAuth()
  }, [dispatch])



  return (
    <>
      <Routes>

        {/* Root route - redirect to signin */}
        <Route path="/" element={<Navigate to="/signin" replace />} />

        {/* Public */}
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />

        <Route
          path="/signin"
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />

        <Route
          path="/forgotPassword"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />

        <Route
          path="/resetPassword/:token"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />

        {/* Protected */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editprofile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          }
        />
        <Route
          path="/loops"
          element={
            <ProtectedRoute>
              <Loops />
            </ProtectedRoute>
          }
        />
        <Route
          path="/story/:email"
          element={
            <ProtectedRoute>
              <Story />
            </ProtectedRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/messageArea"
          element={
            <ProtectedRoute>
              <MessageArea />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  )
}

export default App
// -------------------------------------------------------------without socket
// import React from 'react'
// import { Route, Routes, Navigate } from 'react-router-dom'
// import SignUp from './pages/SignUp'
// import SignIn from './pages/SignIn'
// import ForgotPassword from './pages/ForgotPassword'
// import ResetPassword from './pages/ResetPassword'
// import Home from './pages/Home'
// import PublicRoute from './components/PublicRoute'
// import ProtectedRoute from './components/ProtectedRoute'
// import { useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import api from './api/api'
// import { setUserData, setAuthLoading } from './redux/userSlice'
// import Profile from './pages/Profile'
// import EditProfile from './pages/EditProfile'
// import Upload from './pages/Upload'
// import Loops from './pages/Loops'
// import useAllLoops from './hooks/useGetAllLoops'
// import Story from './pages/Story'
// import Messages from './pages/Messages'
// import MessageArea from './pages/MessageArea'
// // import useGetAllStories from './hooks/useGetAllStories'
// // import useGetAllPost from './hooks/usegetAllPost'
// // import { useSelector } from "react-redux";
// // import {io} from 'socket.io-client'
// // import { setOnlineUsers, setSocket } from './redux/socketSlice'
// const App = () => {
//   // auth checking
//   const dispatch = useDispatch()
//   //  useGetAllPost()  //to get all post in feed
//   useAllLoops()
//   // useGetAllStories()
//   // const {userData}=useSelector(state=>state.user)
//   // const {socket}=useSelector(state=>state.socket)
//   // useEffect(()=>{
//   //   if(userData){
//   //     const socketIo=io(import.meta.env.VITE_SOCKET_URL,{
//   //       query:{
//   //         userId:userData._id
//   //       }
//   //     })
//   //     dispatch(setSocket(socketIo))
//   //     socketIo.on('getOnlineUsers',(users)=>{
//   //       dispatch(setOnlineUsers(users))
//   //     })
//   //     return ()=>socketIo.close()
//   //   }else{
//   //     if(socket){
//   //       socket.close()
//   //       dispatch(setSocket(null))
//   //     }
//   //   }
//   // },[userData])

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const res = await api.get('/user/current')
//         dispatch(setUserData(res.data))
//       } catch (error) {
//         dispatch(setUserData(null))
//         console.log(error)
//       } finally {
//         dispatch(setAuthLoading(false))
//       }
//     }

//     checkAuth()
//   }, [dispatch])



//   return (
//     <>
//       <Routes>

//         {/* Root route - redirect to signin */}
//         <Route path="/" element={<Navigate to="/signin" replace />} />

//         {/* Public */}
//         <Route
//           path="/signup"
//           element={
//             <PublicRoute>
//               <SignUp />
//             </PublicRoute>
//           }
//         />

//         <Route
//           path="/signin"
//           element={
//             <PublicRoute>
//               <SignIn />
//             </PublicRoute>
//           }
//         />

//         <Route
//           path="/forgotPassword"
//           element={
//             <PublicRoute>
//               <ForgotPassword />
//             </PublicRoute>
//           }
//         />

//         <Route
//           path="/resetPassword/:token"
//           element={
//             <PublicRoute>
//               <ResetPassword />
//             </PublicRoute>
//           }
//         />

//         {/* Protected */}
//         <Route
//           path="/home"
//           element={
//             <ProtectedRoute>
//               <Home />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/profile/:id"
//           element={
//             <ProtectedRoute>
//               <Profile />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/editprofile"
//           element={
//             <ProtectedRoute>
//               <EditProfile />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/upload"
//           element={
//             <ProtectedRoute>
//               <Upload />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/loops"
//           element={
//             <ProtectedRoute>
//               <Loops />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/story/:email"
//           element={
//             <ProtectedRoute>
//               <Story />
//             </ProtectedRoute>
//           }
//         />
//          <Route
//           path="/messages"
//           element={
//             <ProtectedRoute>
//               <Messages />
//             </ProtectedRoute>
//           }
//         />
//          <Route
//           path="/messageArea"
//           element={
//             <ProtectedRoute>
//               <MessageArea />
//             </ProtectedRoute>
//           }
//         />

//       </Routes>
//     </>
//   )
// }

// export default App




