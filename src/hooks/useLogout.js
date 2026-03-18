import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import api from "../api/api"
import { setUserData } from "../redux/userSlice"
import { setPostData } from "../redux/postSlice"
import { setStoryData } from "../redux/storySlice"
import { setLoopData } from "../redux/loopSlice"

const useLogout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logout = async () => {
    try {
      await api.get("/auth/signout")

      // clear redux
      dispatch(setUserData(null))
      dispatch(setPostData([]))
      dispatch(setStoryData([]))
      dispatch(setLoopData([]))

      navigate("/signin")
    } catch (error) {
      console.log(error)
    }
  }

  return logout
}

export default useLogout