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
      toast.success("Blog updated successfully!");
      onOpenChange(false);
      onSuccess();
    } catch (error: unknown) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog");
    }
  };

  return {
    form,
    isLoading,
    onSubmit,
    updateBlogSchema,
  };
};
