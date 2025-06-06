import { useDeleteBlogMutation } from "@/services/blog-services";
import { Blog } from "@/types/blog";
import { toast } from "react-hot-toast";

interface UseDeleteBlogProps {
  blog: Blog;
  onSuccess: () => void;
  onOpenChange: (open: boolean) => void;
}

export const useDeleteBlog = ({
  blog,
  onSuccess,
  onOpenChange,
}: UseDeleteBlogProps) => {
  const [deleteBlog, { isLoading }] = useDeleteBlogMutation();

  const handleDelete = async () => {
    try {
      await deleteBlog({ id: blog.id }).unwrap();
      toast.success("Blog deleted successfully!");
      onOpenChange(false);
      onSuccess();
    } catch (error: unknown) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog");
    }
  };

  return {
    isLoading,
    handleDelete,
  };
};
