import { z } from "zod";
import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChangePasswordMutation } from "@/services/auth-services";

const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(3, "Current password is required"),
    newPassword: z
      .string()
      .min(3, "New password must be at least 3 characters long"),
    confirmPassword: z.string().min(3, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New passwords don't match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "New password must be different from current password",
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
