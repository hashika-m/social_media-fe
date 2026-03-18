import api from "../api/api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPostData } from "../redux/postSlice";

const useGetAllPost = () => {
  const dispatch = useDispatch()
  const {userData}=useSelector(state=>state.user)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const result = await api.get('/post/getAll')
        dispatch(setPostData(result.data))
      } catch (error) {
        console.log(error)
      }
    }

    fetchPost()
  }, [dispatch,userData])
}

export default useGetAllPost