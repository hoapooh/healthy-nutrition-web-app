import { z } from "zod";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateAccountMutation } from "@/services/user-services";
import { useAuth } from "@/store/hooks/use-auth";
import { useAppDispatch } from "@/store/hooks";
import { updateUser } from "@/store/slices/auth-slice";

const updateProfileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters long"),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
});

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;

const useUpdateProfile = () => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const [updateProfile, { isLoading }] = useUpdateAccountMutation();
  const [isEditMode, setIsEditMode] = useState(false);
  const form = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      address: "",
    },
  });
  // Update form values when user data is loaded
  useEffect(() => {
    if (user) {
      form.reset({
        fullName: user.fullName || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
      });
    }
  }, [user, form]);

  // Helper function to get current user values
  const getCurrentUserValues = () => ({
    fullName: user?.fullName || "",
    phoneNumber: user?.phoneNumber || "",
    address: user?.address || "",
  });

  const onSubmit = async (values: UpdateProfileFormValues) => {
    try {
      await updateProfile({
        params: values,
        body: {}, // No image update here, handled separately
      }).unwrap();

      // Update the user in the store
      dispatch(updateUser(values));

      toast.success("Profile updated successfully!");
      setIsEditMode(false);
      form.reset(values); // Reset form with new values
    } catch (error: unknown) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };
  const handleCancel = () => {
    // Reset form to original values
    form.reset(getCurrentUserValues());
    setIsEditMode(false);
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  return {
    user,
    form,
    onSubmit,
    isLoading,
    isEditMode,
    setIsEditMode,
    handleCancel,
    handleEdit,
    updateProfileSchema,
  };
};

export default useUpdateProfile;
