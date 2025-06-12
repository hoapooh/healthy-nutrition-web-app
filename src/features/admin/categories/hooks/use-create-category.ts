import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateCategoryMutation } from "@/services/category-services";
import { toast } from "react-hot-toast";

const createCategorySchema = z.object({
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

export type CreateCategoryFormValues = z.infer<typeof createCategorySchema>;

interface UseCreateCategoryProps {
  onSuccess: () => void;
  onOpenChange: (open: boolean) => void;
}

export const useCreateCategory = ({
  onSuccess,
  onOpenChange,
}: UseCreateCategoryProps) => {
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const form = useForm<CreateCategoryFormValues>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      type: "",
      description: "",
    },
  });
  const onSubmit = async (values: CreateCategoryFormValues) => {
    try {
      await createCategory(values).unwrap();
      toast.success("Tạo danh mục thành công!");
      form.reset();
      onOpenChange(false);
      onSuccess();
    } catch (error: unknown) {
      console.error("Error creating category:", error);
      toast.error("Tạo danh mục thất bại");
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      form.reset();
    }
    onOpenChange(newOpen);
  };

  return {
    form,
    isLoading,
    onSubmit,
    handleOpenChange,
    createCategorySchema,
  };
};
