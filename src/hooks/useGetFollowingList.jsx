import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api/api';
import { setFollowing } from '../redux/userSlice';

const useGetFollowingList = () => {
    const dispatch = useDispatch();
    const {StoryData}=useSelector(state=>state.story)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await api.get('/user/following',{withCredentials:true});
               dispatch(setFollowing(result.data))
            } catch (err) {
                console.error('Error fetching current user:', err);
            }
        };

        fetchUser();
    }, [StoryData]);

};

export default useGetFollowingList;