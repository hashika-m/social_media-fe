
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/api";
import { toggleFollow, setUserData } from "../redux/userSlice";

function FollowButton({ targetUserId, tailwind }) {

  const following = useSelector(state => state.user.following)
  const isFollowing = following.includes(targetUserId)

  const dispatch = useDispatch()

  const handleFollow = async () => {
    try {
      dispatch(toggleFollow(targetUserId))
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
