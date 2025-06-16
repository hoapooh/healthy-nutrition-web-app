import { useDeleteCategoryMutation } from "@/services/category-services";
import { Category } from "@/types/category";
import { toast } from "react-hot-toast";

interface UseDeleteCategoryProps {
  category: Category;
  onSuccess: () => void;
  onOpenChange: (open: boolean) => void;
}

export const useDeleteCategory = ({
  category,
  onSuccess,
  onOpenChange,
}: UseDeleteCategoryProps) => {
  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();
  const handleDelete = async () => {
    try {
      await deleteCategory({ id: category.id }).unwrap();
      toast.success("Danh mục đã được xóa thành công!");
      onOpenChange(false);
      onSuccess();
    } catch (error: unknown) {
      console.error("Error deleting category:", error);
      toast.error("Xóa danh mục thất bại");
    }
  };

  return {
    isLoading,
    handleDelete,
  };
};
