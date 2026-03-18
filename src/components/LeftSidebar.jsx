import React, { useEffect } from 'react'
import logo from '../assets/icon.png'
import profile from '../assets/profile.jpeg'
import { CiHeart } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import api from '../api/api.js'
import { useNavigate } from 'react-router-dom';
// import useLogout from "../hooks/useLogout.js"
import { setUserData, setSuggestedUsers } from '../redux/userSlice';
import FollowButton from './FollowButton.jsx';

// import { setSuggestedUsers } from '../redux/userSlice.js';
const LeftSidebar = () => {

  const { userData, suggestedUsers } = useSelector(state => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(suggestedUsers)
  const { notificationData } = useSelector(state => state.user)
  console.log("Notifications in Redux:", notificationData);
  
  // Fetch Suggested Users
  useEffect(() => {
    if (!userData) return;

    const fetchSuggestedUsers = async () => {
      try {
        const res = await api.get('/user/suggested');
        dispatch(setSuggestedUsers(res.data));
      } catch (error) {
        console.log("Error fetching suggested users:", error);
      }
    };

    fetchSuggestedUsers();
  }, [dispatch, userData]); // run once


  //  Logout
  const handleLogout = async () => {
    try {
      await api.get("/auth/signout");
      dispatch(setUserData(null));
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };
  // const logout = useLogout()

  return (
    <div className="w-[25%] hidden lg:flex flex-col min-h-screen bg-white border-r border-gray-200 px-4 py-6 cursor-pointer">

      {/* Top Section */}
      <div className="flex items-center justify-between mb-5">
        <div className='flex  items-center justify-start gap-1.5 font-semibold text-black text-2xl'>
          <img src={logo} alt="logo" className="w-10" />
          <span>Socila Media Platform</span>
        </div>



        <div  onClick={()=>navigate('/notifications')} className="relative cursor-pointer">
          <CiHeart className="w-6 h-6 text-gray-700 hover:text-red-500 transition duration-200" />

          {(notificationData?.length > 0 &&
            notificationData.some((n) => n.isRead === false)) && (
              <div className="w-3 h-3 bg-red-600 rounded-full absolute -top-1 -right-1"></div>
            )}
        </div>
      </div>

      {/* Profile Section */}
      <div className="flex items-center justify-between gap-0.5 xl:gap-4">

        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-300">
            <img
              src={userData?.profilePic || profile}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col leading-tight">
            <h3 className="font-semibold text-gray-800 text-sm">
              {userData?.name || "User Name"}
            </h3>
            <p className="text-xs text-gray-500">
              {userData?.email || "email@example.com"}
            </p>
          </div>
        </div>

        {/* <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition duration-200 cursor-pointer"
        >
          Logout
        </button> */}
        <IoIosLogOut onClick={handleLogout} className="font-bold text-red-700 hover:text-red-900 text-3xl cursor-pointer" />
        {/* <IoIosLogOut
          onClick={logout}
          className="font-bold text-red-700 hover:text-red-900 text-3xl cursor-pointer"
        /> */}

      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-3"></div>

      {/* Suggested Users */}
      <div className="flex-1 overflow-y-auto ">
        <h4 className="text-sm font-semibold text-gray-700 mb-3 ">
          Suggested Users
        </h4>

        {suggestedUsers && suggestedUsers.length > 0 ? (
          <div className="flex flex-col gap-3 ">
            {suggestedUsers.slice(0, 5).map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition border-b-2 border-gray-200 "
                onClick={() => navigate(`/profile/${user._id}`)}
              >
                <div className="flex items-center gap-3 ">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src={user.profilePic || profile}
                      alt="suggested"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-800">
                    {user.name}
                    {/* {user.email} */}
                  </span>
                </div>
                <FollowButton tailwind={"text-medium px-3 py-1 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition cursor-pointer"} targetUserId={user._id} />
                {/* <button className="text-medium px-3 py-1 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition cursor-pointer">
                  Follow
                </button> */}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-500">No suggestions available</p>
        )}
      </div>

    </div>
  )
}

export default LeftSidebar