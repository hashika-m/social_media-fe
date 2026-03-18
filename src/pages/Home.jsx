import React from 'react'
import LeftSidebar from '../components/LeftSidebar'
import Feed from '../components/Feed'
import RightSidebar from '../components/RightSidebar'
import useGetAllPost from '../hooks/usegetAllPost'
import useGetAllStories from '../hooks/useGetAllStories'
// import useFetchAllMedia from '../hooks/useFetchAllMedia'

const Home = () => {
  useGetAllPost()
  useGetAllStories()
  //  useFetchAllMedia()   // fetches posts, stories, loops
  return (
    <>
      <div className="w-full flex justify-center items-center">
        <LeftSidebar/>
        <Feed/>
        <RightSidebar/>
      </div>
    </>
  )
}

export default Home





// testing purpose of deletng token expiry for the user

// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import api from "../api/api";
// import { setUserData } from "../redux/userSlice";

// const Home = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector((state) => state.user.userDate);

//   const handleLogout = async () => {
//     try {
//       await api.get("/auth/signout");
//       dispatch(setUserData(null));    // clear redux
//       navigate("/signin");            // redirect
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-br from-indigo-100 via-white to-purple-100 flex flex-col items-center justify-center px-4">
      
//       <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md text-center">
        
//         <h1 className="text-3xl font-bold text-gray-800 mb-4">
//           Welcome {user?.name || "User"} 👋
//         </h1>

//         <p className="text-gray-500 mb-8">
//           You are successfully logged in.
//         </p>

//         <button
//           onClick={handleLogout}
//           className="w-full py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition duration-300"
//         >
//           Logout
//         </button>

//       </div>

//     </div>
//   );
// };

// export default Home;
