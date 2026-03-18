import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api/api';
import { setUserData } from '../redux/userSlice';

const useGetCurrentUserHook = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const {StoryData}=useSelector(state=>state.story)

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await api.get('/user/current');
                if (response.data) {
                    dispatch(setUserData(response.data));
                }
            } catch (err) {
                console.error('Error fetching current user:', err);
                setError(err.message);
                dispatch(setUserData(null));
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentUser();
    }, [dispatch,StoryData]);

    return { loading, error };
};

export default useGetCurrentUserHook;