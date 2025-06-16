import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUpdateBlogMutation } from "@/services/blog-services";
import { Blog } from "@/types/blog";
import { toast } from "react-hot-toast";
import React from "react";

const updateBlogSchema = z.object({
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
  status: z.enum(["draft", "published"]),
  image: z.string().optional(),
});

export type UpdateBlogFormValues = z.infer<typeof updateBlogSchema>;

interface UseUpdateBlogProps {
  blog: Blog | null;
  onSuccess: () => void;
  onOpenChange: (open: boolean) => void;
}

export const useUpdateBlog = ({
  blog,
  onSuccess,
  onOpenChange,
}: UseUpdateBlogProps) => {
  const [updateBlog, { isLoading }] = useUpdateBlogMutation();

  const form = useForm<UpdateBlogFormValues>({
    resolver: zodResolver(updateBlogSchema),
    defaultValues: {
      title: blog?.title || "",
      content: blog?.content || "",
      excerpt: blog?.excerpt || "",
      tags: blog?.tags || [],
      status: (blog?.status as "draft" | "published") || "draft",
      image: blog?.image || "",
    },
  });

  React.useEffect(() => {
    if (blog) {
      form.reset({
        title: blog.title,
        content: blog.content,
        excerpt: blog.excerpt,
        tags: blog.tags,
        status: blog.status as "draft" | "published",
        image: blog.image || "",
      });
    }
  }, [blog, form]);

  const onSubmit = async (values: UpdateBlogFormValues) => {
    try {
      await updateBlog({
        id: blog!.id,
        body: values,
      }).unwrap();
      toast.success("Cập nhật blog thành công!");
      onOpenChange(false);
      onSuccess();
    } catch (error: unknown) {
      console.error("Error updating blog:", error);
      toast.error("Cập nhật blog thất bại");
    }
  };

  return {
    form,
    isLoading,
    onSubmit,
    updateBlogSchema,
  };
};
