import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/api";
import { setLoopData } from "../redux/loopSlice";

const useAllLoops = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.user);

  useEffect(() => {
    const fetchLoops = async () => {
      try {
        const result = await api.get('/loop/getAll', { withCredentials: true });
        dispatch(setLoopData(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchLoops();
  }, [dispatch, userData]); // refetch if userData changes
};

export default useAllLoops;