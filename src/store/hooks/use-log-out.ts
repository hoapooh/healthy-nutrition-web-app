import { useAppDispatch } from "../hooks";
import { clearCredentials } from "../slices/auth-slice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const useLogOut = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Handler for logout action
  const handleLogout = () => {
    dispatch(clearCredentials());
    router.replace("/");
    toast.success("Bye bye! 👋");
  };

  return {
    handleLogout,
  };
};

export default useLogOut;
