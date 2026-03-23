import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/api";
import { setProfileData, setUserData } from "../redux/userSlice";
import { IoMdArrowRoundBack } from "react-icons/io";
import profile from '../assets/profile.jpeg';
import Navbar from '../components/Navbar';
import FollowButton from "../components/FollowButton";
import Post from "../components/Post";
import { setPostData } from "../redux/postSlice";
import { setSelectedUser } from "../redux/messageSlice";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profileData, userData } = useSelector(state => state.user);
  const { postData } = useSelector(state => state.post)
  const [loading, setLoading] = useState(true);
  const [postType, setPostType] = useState('posts')
  console.log(userData.saved)
  const [showList, setShowList] = useState(null)
  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/user/getProfile/${id}`, { withCredentials: true });
        dispatch(setProfileData(res.data));
        dispatch(setPostData(res.data.post))
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProfile();
  }, [id, dispatch]);

  // Logout
  const handleLogout = async () => {
    try {
      await api.get("/auth/signout", { withCredentials: true });
      dispatch(setUserData(null));
      dispatch(setProfileData(null));
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin h-12 w-12 rounded-full border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-600 text-lg">Profile not found</div>
      </div>
    );
  }

  // Compute mutual friends (both follow each other)
  const mutualFriends = profileData.following?.filter(followingUser =>
    profileData.followers?.some(followerUser => followerUser._id === followingUser._id)
  ) || [];

  return (
    <div className="w-full min-h-screen bg-gray-100">

      {/* Header */}
      <div className="w-full h-16 flex justify-between items-center px-6 bg-white border-b">
        <IoMdArrowRoundBack
          className="w-6 h-6 cursor-pointer hover:text-red-700"
          onClick={() => navigate('/home')}
        />
        <div className="font-semibold text-lg text-gray-700">{profileData?.name || profileData?.email}</div>
        <div
          className="font-semibold cursor-pointer text-red-700 hover:text-red-800"
          onClick={handleLogout}
        >
          Log Out
        </div>
      </div>

      {/* Profile Card */}
      <div className="max-w-5xl mx-auto mt-3 rounded-xl p-6 bg-white shadow-lg">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

          {/* Left - Profile Info */}
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2">
              <img
                src={profileData?.profilePic || profile}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-gray-800 font-semibold text-lg">{profileData?.name || profileData?.email}</div>
              <div className="text-gray-700">{profileData?.profession || "New User"}</div>
              <div className="text-gray-600 max-w-md">{profileData?.bio || "No bio yet."}</div>
            </div>
          </div>

          {/* Right - Stats */}
          <div className="flex justify-center items-end md:justify-end gap-10">

            {/* Posts */}
            <div className="text-center">
              <div className="text-xl font-semibold">{profileData?.post?.length || 0}</div>
              <div className="text-gray-600 text-sm">Posts</div>
            </div>

            {/* Friends */}
            <div onClick={() => setShowList('friends')} className="text-center cursor-pointer">
              <div className="flex -space-x-3 justify-center items-center mb-1">
                {mutualFriends.slice(0, 3).map(friend => (
                  <div key={friend._id} className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                    <img
                      src={friend.profilePic || profile}
                      alt={friend.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                {mutualFriends.length > 3 && (
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm text-gray-700 font-bold">
                    +{mutualFriends.length - 3}
                  </div>
                )}
              </div>
              <div className="text-gray-600 text-sm">Friends ({mutualFriends.length})</div>
            </div>

            {/* Following */}
            <div onClick={() => setShowList('following')} className="text-center cursor-pointer">
              <div className="flex -space-x-3 justify-center items-center mb-1">
                {profileData?.following?.slice(0, 3).map(user => (
                  <div key={user._id} className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                    <img
                      src={user.profilePic || profile}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}

                {profileData?.following?.length > 3 && (
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm text-gray-700 font-bold">
                    +{profileData.following.length - 3}
                  </div>
                )}
              </div>

              <div className="text-gray-600 text-sm">
                Following ({profileData?.following?.length || 0})
              </div>
            </div>

          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex justify-center items-center gap-4 mt-6">
          {profileData?._id === userData?._id ? (
            <button
              onClick={() => navigate('/editprofile')}
              className="px-6 py-2 bg-amber-600 text-white font-semibold rounded-2xl hover:bg-amber-700 transition"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <FollowButton
                targetUserId={profileData?._id}
                tailwind="px-6 py-2 bg-amber-600 text-white font-semibold rounded-2xl hover:bg-amber-700 transition"
              />
              <button onClick={() => {
                dispatch(setSelectedUser(profileData))
                navigate('/messageArea')
              }}
                className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-2xl hover:bg-gray-700 transition">
                Message
              </button>
            </>
          )}
        </div>
      </div>

      {/* Posts */}
      <div className="w-full flex justify-center mt-6">
        <div className="w-full max-w-4xl flex flex-col items-center rounded-t-2xl bg-gray-200 gap-5 pt-6 pb-12">

          <div className='w-[60%] max-w-100 h-14 rounded-full flex justify-center items-center gap-2.5 mt-10  bg-amber-600'>

            <div onClick={() => setPostType('posts')}
              className={`w-[30%] h-10 flex justify-center items-center text-[18px] rounded-full cursor-pointer transition
                         ${postType === 'posts'
                  ? 'bg-white text-black shadow-2xl shadow-amber-300'
                  : 'text-white hover:bg-white hover:text-black hover:shadow-2xl hover:shadow-amber-300'
                }`}
            >
              Posts
            </div>
            {profileData?._id == userData._id && <div onClick={() => setPostType('saved')}
              className={`w-[30%] h-10 flex justify-center items-center text-[18px] rounded-full cursor-pointer transition
                          ${postType === 'saved'
                  ? 'bg-white text-black shadow-2xl shadow-amber-300'
                  : 'text-white hover:bg-white hover:text-black hover:shadow-2xl hover:shadow-amber-100'
                }`}
            >
              Saved
            </div>}


          </div>

          <Navbar profileUserId={profileData?._id} />
          {/* {postType=='posts' &&    postData?.map((post, index) => (
            <Post key={index} post={post} />
          ))}
          {postType=='saved' &&    userData.saved?.map((post, index) => (
             <Post key={index} post={post} />
          ))} */}
          {profileData?._id == userData._id && <>
            {postType === 'posts' && postData?.map((post, index) => (
              <Post key={index} post={post} />
            ))}

            {postType === 'saved' && userData.saved?.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </>}

          {profileData?._id !== userData._id &&
            postData?.map((post, index) => (
              <Post key={index} post={post} />
            ))}

        </div>
      </div>

      {showList && (
        <div className="fixed inset-0 bg-gray-200 bg-opacity-40 flex justify-center items-center z-50">

          <div className="bg-white w-[90%] max-w-md rounded-2xl p-5 max-h-[70vh] overflow-y-auto">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {showList === "friends" ? "Friends" : "Following"}
              </h2>
              <button onClick={() => setShowList(null)} className="text-red-500">Close</button>
            </div>

            {/* List */}
            {(showList === "friends" ? mutualFriends : profileData.following)?.map(user => (
              <div key={user._id} className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg">

                <img
                  src={user.profilePic || profile}
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div className="text-sm font-medium text-gray-700">
                  {user.name}
                </div>

              </div>
            ))}

          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;