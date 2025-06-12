import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCredentials } from "@/store/slices/auth-slice";
import { useLoginMutation } from "@/services/auth-services";
import toast from "react-hot-toast";

const formSchema = z.object({
  email: z.string().email("Địa chỉ email không hợp lệ"),
  password: z.string().min(3, "Mật khẩu phải có ít nhất 3 ký tự"),
});

type FormValues = z.infer<typeof formSchema>;

const useSignInHook = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    login(values)
      .unwrap()
      .then((data) => {
        const userResponse = data.accessToken;

        dispatch(
          setCredentials({
            token: userResponse.accessToken,
            user: {
              fullName: userResponse.fullName,
              id: userResponse.id,
              role: userResponse.role,
              image: userResponse.image,
            },
          }),
        );
        toast.success("Chào mừng 🍎🍏!");
        // Optionally redirect or perform other actions after successful login
        router.replace("/");
      })
      .catch((error) => {
        toast.error("Thông tin đăng nhập không hợp lệ. Vui lòng thử lại.");
        console.log("Login failed:", error);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return {
    form,
    onSubmit,
    isLoading,
    showPassword,
    togglePasswordVisibility,
  };
};

export default useSignInHook;
