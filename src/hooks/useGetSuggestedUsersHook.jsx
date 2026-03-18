import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api/api';
import { setSuggestedUsers, setUserData } from '../redux/userSlice';

const useGetSuggestedUsersHook = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const {userData}=useSelector(state=>state.user)

    useEffect(() => {
        const fetchSuggestedUser = async () => {
            try {
                const response = await api.get('/user/suggested');
                if (response.data) {
                    dispatch(setSuggestedUsers(response.data));
                }
            } catch (err) {
                console.error('Error fetching current user:', err);
                setError(err.message);
                dispatch(setUserData(null));
            } finally {
                setLoading(false);
            }
        };

        fetchSuggestedUser();
    }, [dispatch,userData]);

    return { loading, error };
};

export default useGetSuggestedUsersHook;