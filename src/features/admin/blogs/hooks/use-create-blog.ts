import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateBlogMutation } from "@/services/blog-services";
import { toast } from "react-hot-toast";

const createBlogSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  content: z
    .string()
    .min(1, "Content is required")
    .min(10, "Content must be at least 10 characters"),
  excerpt: z
    .string()
    .min(1, "Excerpt is required")
    .max(500, "Excerpt must be less than 500 characters"),
  tags: z
    .array(z.string())
    .min(1, "At least one tag is required")
    .max(10, "Maximum 10 tags allowed"),
  status: z.enum(["draft", "published"]),
  image: z.string().optional(),
});

export type CreateBlogFormValues = z.infer<typeof createBlogSchema>;

interface UseCreateBlogProps {
  onSuccess: () => void;
  onOpenChange: (open: boolean) => void;
}

export const useCreateBlog = ({
  onSuccess,
  onOpenChange,
}: UseCreateBlogProps) => {
  const [createBlog, { isLoading }] = useCreateBlogMutation();

  const form = useForm<CreateBlogFormValues>({
    resolver: zodResolver(createBlogSchema),
    defaultValues: {
      title: "",
      content: "",
      excerpt: "",
      tags: [],
      status: "draft",
      image: "",
    },
  });

  const onSubmit = async (values: CreateBlogFormValues) => {
    try {
      await createBlog(values).unwrap();
      toast.success("Blog created successfully!");
      form.reset();
      onOpenChange(false);
      onSuccess();
    } catch (error: unknown) {
      console.error("Error creating blog:", error);
      toast.error("Failed to create blog");
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
    createBlogSchema,
  };
};
