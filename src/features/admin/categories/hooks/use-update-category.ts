import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUpdateCategoryMutation } from "@/services/category-services";
import { Category } from "@/types/category";
import { toast } from "react-hot-toast";

const updateCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Tên là bắt buộc")
    .max(100, "Tên phải ít hơn 100 ký tự"),
  type: z.string().min(1, "Loại là bắt buộc"),
  description: z
    .string()
    .min(1, "Mô tả là bắt buộc")
    .max(500, "Mô tả phải ít hơn 500 ký tự"),
});

export type UpdateCategoryFormValues = z.infer<typeof updateCategorySchema>;

interface UseUpdateCategoryProps {
  category: Category;
  onSuccess: () => void;
  onOpenChange: (open: boolean) => void;
}

export const useUpdateCategory = ({
  category,
  onSuccess,
  onOpenChange,
}: UseUpdateCategoryProps) => {
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

  const form = useForm<UpdateCategoryFormValues>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: {
      name: category.name,
      type: category.type,
      description: category.description || "",
    },
  });

  React.useEffect(() => {
    if (category) {
      form.reset({
        name: category.name,
        type: category.type,
        description: category.description || "",
      });
    }
  }, [category, form]);
  const onSubmit = async (values: UpdateCategoryFormValues) => {
    try {
      await updateCategory({
        id: category.id,
        body: values,
      }).unwrap();
      toast.success("Cập nhật danh mục thành công!");
      onOpenChange(false);
      onSuccess();
    } catch (error: unknown) {
      console.error("Error updating category:", error);
      toast.error("Cập nhật danh mục thất bại");
    }
  };

  return {
    form,
    isLoading,
    onSubmit,
    updateCategorySchema,
  };
};
