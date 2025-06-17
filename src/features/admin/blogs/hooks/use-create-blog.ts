import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateBlogMutation } from "@/services/blog-services";
import { toast } from "react-hot-toast";

const createBlogSchema = z.object({
  title: z
    .string()
    .min(1, "Tiêu đề là bắt buộc")
    .max(200, "Tiêu đề phải ít hơn 200 ký tự"),
  content: z
    .string()
    .min(1, "Nội dung là bắt buộc")
    .min(10, "Nội dung phải có ít nhất 10 ký tự"),
  excerpt: z
    .string()
    .min(1, "Tóm tắt là bắt buộc")
    .max(500, "Tóm tắt phải ít hơn 500 ký tự"),
  tags: z
    .array(z.string())
    .min(1, "Cần ít nhất một thẻ")
    .max(10, "Tối đa 10 thẻ"),
  image: z.union([z.instanceof(File), z.string()]).optional(),
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
      image: undefined,
    },
  });

  const onSubmit = async (values: CreateBlogFormValues) => {
    try {
      // Only send File objects, ignore string URLs for create
      const imageFile =
        values.image instanceof File
          ? values.image
          : new File([], "", { type: "image/jpeg" });

      const createBlogRequest = {
        params: {
          title: values.title,
          content: values.content,
          excerpt: values.excerpt,
          tags: values.tags,
        },
        body: {
          imageBlog: imageFile,
        },
      };

      await createBlog(createBlogRequest).unwrap();
      toast.success("Tạo blog thành công!");
      form.reset();
      onOpenChange(false);
      onSuccess();
    } catch (error: unknown) {
      console.error("Error creating blog:", error);
      toast.error("Tạo blog thất bại");
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
