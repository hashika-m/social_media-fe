
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/api";
import { setUserData } from "../redux/userSlice";
// import { toggleFollow} from "../redux/userSlice";


function FollowButton({ targetUserId, tailwind }) {

  const following = useSelector(state => state.user.following)
  // const isFollowing = following.includes(targetUserId)
  const isFollowing = following.some(
    (user) => user._id === targetUserId || user === targetUserId
  )

  const dispatch = useDispatch()


  const handleFollow = async (e) => {
    e.stopPropagation()
    e.preventDefault()
    try {
      // dispatch(toggleFollow(targetUserId))
      const res = await api.post(`/user/follow/${targetUserId}`, {}, { withCredentials: true })
      dispatch(setUserData(res.data.updatedUser))
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <button className={tailwind} onClick={handleFollow}>
      {isFollowing ? "Following" : "Follow"}
    </button>
  )
}

export default FollowButton
