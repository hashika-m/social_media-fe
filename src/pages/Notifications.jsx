import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import NotificationCard from '../components/NotificationCard';
import { useEffect } from 'react';
import { getSocket } from '../hooks/socket';
import { setNotificationData } from '../redux/userSlice';

const Notifications = () => {
    const navigate = useNavigate()
    const { notificationData } = useSelector(state => state.user)
    const dispatch = useDispatch();

    useEffect(() => {
        const socket = getSocket();
        if (!socket) return;

        socket.on('newNotification', (notification) => {
            dispatch(setNotificationData(prev => [notification, ...prev]));
        });

        return () => socket.off('newNotification');
    }, [dispatch]);
    return (
        <div className='w-full h-screen bg-gray-200'>
            {/* header */}
            <div className="w-full h-16 flex items-center gap-5 px-6 fixed top-0 border-b shadow-xl z-10 bg-gray-200">
                <IoMdArrowRoundBack
                    className="w-6 h-6 cursor-pointer hover:text-red-700"
                    onClick={() => navigate(`/home`)}
                />
                <h1 className='font-semibold text-2xl'>Notification</h1>
            </div>
            {/* mapping all notifications */}
            <div className='w-full flex flex-col gap-5 pt-20  h-full overflow-auto'>
                {notificationData.map((n, index) => (
                    <NotificationCard n={n} key={index} />
                ))}
            </div>
        </div>
    )
}

export default Notifications