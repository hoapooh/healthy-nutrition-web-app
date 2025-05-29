import { z } from "zod";
import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "@/services/auth-services";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(3, "Password must be at least 3 characters long"),
    confirmPassword: z
      .string()
      .min(3, "Password must be at least 3 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

const useSignUpHook = () => {
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: FormValues) {
    register(values)
      .unwrap()
      .then((data) => {
        toast.success(data.message || "Registration successful!");
        router.push("/sign-in");
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        toast.error("Invalid credentials or user already exists.");
      });
  }

  const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
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
  };
};

export default useSignUpHook;
