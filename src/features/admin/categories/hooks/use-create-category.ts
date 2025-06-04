import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateCategoryMutation } from "@/services/category-services";
import { toast } from "react-hot-toast";

const createCategorySchema = z.object({
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
      toast.success("Category created successfully!");
      form.reset();
      onOpenChange(false);
      onSuccess();
    } catch (error: unknown) {
      console.error("Error creating category:", error);
      toast.error("Failed to create category");
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
