import { useState } from "react";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import { useUpdateAccountMutation } from "@/services/user-services";
import { useAuth } from "@/store/hooks/use-auth";
import { useAppDispatch } from "@/store/hooks";
import { updateUser } from "@/store/slices/auth-slice";

const useImageUpload = () => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const [updateAccount, { isLoading }] = useUpdateAccountMutation();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    // Create preview
    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);
    setIsUploading(true);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('image', file);

      await updateAccount({
        params: {}, // No params for image upload
        body: { image: file },
      }).unwrap();

      // Update user image in store
      dispatch(updateUser({ image: previewUrl }));
      
      toast.success("Profile image updated successfully!");
    } catch (error: unknown) {
      console.error("Error uploading image:", error);
      toast.error("Failed to update profile image. Please try again.");
      setPreviewImage(null);
    } finally {
      setIsUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    },
    multiple: false,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const resetPreview = () => {
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
      setPreviewImage(null);
    }
  };

  return {
    getRootProps,
    getInputProps,
    isDragActive,
    isUploading: isUploading || isLoading,
    previewImage,
    resetPreview,
    currentImage: user?.image,
  };
};

export default useImageUpload;
