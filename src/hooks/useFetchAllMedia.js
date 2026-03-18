import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import api from "../api/api"
import { setPostData } from "../redux/postSlice"
import { setStoryData } from "../redux/storySlice"
import { setLoopData } from "../redux/loopSlice"

const useFetchAllMedia = () => {
  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.user)

  useEffect(() => {
    if (!userData) return

    const fetchAllMedia = async () => {
      try {
        const [posts, stories, loops] = await Promise.all([
          api.get("/post/getAll"),
          api.get("/story/getAll"),
          api.get("/loop/getAll")
        ])
        dispatch(setPostData(posts.data))
        dispatch(setStoryData(stories.data))
        dispatch(setLoopData(loops.data))
      } catch (err) {
        console.log(err)
      }
    }

    fetchAllMedia()
  }, [userData, dispatch])
}

export default useFetchAllMedia