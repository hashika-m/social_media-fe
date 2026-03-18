// useGetPrevChatUsers.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { setPrevChatUsers } from '../redux/messageSlice';
import api from '../api/api';

const useGetPrevChatUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPrevChats = async () => {
      try {
        const result = await api.get('/message/prevChats');

        // Ensure we always pass an array
        const prevChats = Array.isArray(result.data) ? result.data : [];
        dispatch(setPrevChatUsers(prevChats));

      } catch (err) {
        console.error('Error fetching previous chat users:', err);
        dispatch(setUserData(null));
        dispatch(setPrevChatUsers([]));
      }
    };

    fetchPrevChats();
  }, [dispatch]);
};

export default useGetPrevChatUsers;