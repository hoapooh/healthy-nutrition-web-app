import { useAppDispatch } from "../hooks";
import { clearCredentials } from "../slices/auth-slice";
import toast from "react-hot-toast";

const useLogOut = () => {
  const dispatch = useAppDispatch();

  // Handler for logout action
  const handleLogout = () => {
    dispatch(clearCredentials());
    toast.success("Bye bye! 👋");
  };

  return {
    handleLogout,
  };
};

export default useLogOut;
