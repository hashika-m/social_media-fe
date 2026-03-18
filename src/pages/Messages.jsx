import React from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import OnlineUser from '../components/OnlineUser';
import profile from '../assets/profile.jpeg';
import { setSelectedUser } from '../redux/messageSlice';

const Messages = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userData } = useSelector(state => state.user);
  const { onlineUsers } = useSelector(state => state.socket);
  const { prevChatUsers } = useSelector(state => state.message);

  // Safe arrays
  const safePrevChatUsers = Array.isArray(prevChatUsers) ? prevChatUsers : [];
  const safeFollowing = Array.isArray(userData?.following) ? userData.following : [];

  return (
    <div className='w-full h-screen flex flex-col'>

      {/* Header */}
      <div className="w-full h-16 flex gap-5 items-center px-6 fixed bg-white z-10">
        <IoMdArrowRoundBack
          className="w-6 h-6 cursor-pointer hover:text-red-700 lg:hidden"
          onClick={() => navigate(`/home`)}
        />
        <h1 className='font-semibold text-2xl'>Messages</h1>
      </div>

      {/* Online users */}
      <div className='w-full mt-16 h-12.5 flex gap-5 items-center overflow-x-auto px-4 border-b shadow-xl'>
        {safeFollowing.map((user) => (
          onlineUsers?.includes(user._id) && (
            <OnlineUser key={user._id} user={user} />
          )
        ))}
      </div>

      {/* Previous chat users */}
      <div className='flex-1 overflow-y-auto flex flex-col gap-4 p-4'>
        {safePrevChatUsers.map((user) => (
          <div
            key={user._id}
            className='flex items-center gap-4 cursor-pointer hover:bg-amber-100 p-2 rounded-lg'
            onClick={() => {
              dispatch(setSelectedUser(user));
              navigate('/messageArea');
            }}
          >
            {/* Profile */}
            {onlineUsers?.includes(user._id) ? (
              <OnlineUser user={user} />
            ) : (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/profile/${user._id}`);
                }}
                className='w-12 h-12 rounded-full overflow-hidden'
              >
                <img
                  src={user.profilePic || profile}
                  alt='profilePic'
                  className='w-full h-full object-cover'
                />
              </div>
            )}

            {/* User info */}
            <div className='flex flex-col'>
              <span className='font-semibold'>{user.name}</span>
              <span className='text-sm text-gray-500'>{user.email}</span>
              {onlineUsers?.includes(user._id) && <div className='text-amber-900 text-xs'>Active Now</div>}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Messages;

