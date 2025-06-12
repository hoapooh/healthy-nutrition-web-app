import { z } from "zod";
import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChangePasswordMutation } from "@/services/auth-services";
import useLogOut from "@/store/hooks/use-log-out";

const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(3, "Mật khẩu hiện tại là bắt buộc"),
    newPassword: z.string().min(3, "Mật khẩu mới phải có ít nhất 3 ký tự"),
    confirmPassword: z.string().min(3, "Vui lòng xác nhận mật khẩu mới"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu mới không khớp",
    path: ["confirmPassword"],
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "Mật khẩu mới phải khác mật khẩu hiện tại",
    path: ["newPassword"],
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

const useChangePassword = () => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [passwordVisibility, setPasswordVisibility] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const { handleLogout } = useLogOut();

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: ChangePasswordFormValues) => {
    try {
      await changePassword(values).unwrap();
      toast.success("Password changed successfully!");
      form.reset();
      handleLogout(); // Log out user after password change
    } catch (error: unknown) {
      console.error("Error changing password:", error);
      toast.error("Failed to change password. Try again!");
    }
  };

  const togglePasswordVisibility = (field: keyof typeof passwordVisibility) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return {
    form,
    onSubmit,
    isLoading,
    passwordVisibility,
    togglePasswordVisibility,
    changePasswordSchema,
  };
};

export default useChangePassword;
