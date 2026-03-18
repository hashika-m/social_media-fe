import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/api";
import { setStoryList } from "../redux/storySlice";

function useGetAllStories() {

    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.user)

    useEffect(() => {

        const fetchStories = async () => {
            try {
                const result = await api.get(`/story/getAll`, { withCredentials: true })
                dispatch(setStoryList(result.data))
            } catch (error) {
                console.log(error)
            }
        }

        fetchStories()

    }, [dispatch, userData])

}

export default useGetAllStories