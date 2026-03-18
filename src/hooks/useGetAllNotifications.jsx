import { useDispatch, useSelector } from "react-redux";
import api from "../api/api";
import { setNotificationData } from "../redux/userSlice";

function useGetAllNotifications() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const fetchNotifications = async () => {
    try {
      if (!userData) return; // optional check
      const result = await api.get("/user/getAllNotifications", { withCredentials: true });
      dispatch(setNotificationData(result.data));
      console.log(result.data)
    } catch (error) {
      console.log("Error fetching notifications:", error);
    }
  };

  return fetchNotifications;
}

export default useGetAllNotifications;