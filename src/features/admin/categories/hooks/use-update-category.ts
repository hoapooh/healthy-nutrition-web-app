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
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  type: z.string().min(1, "Type is required"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be less than 500 characters"),
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
      toast.success("Category updated successfully!");
      onOpenChange(false);
      onSuccess();
    } catch (error: unknown) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category");
    }
  };

  return {
    form,
    isLoading,
    onSubmit,
    updateCategorySchema,
  };
};
