"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useCreateBlog } from "../../hooks/use-create-blog";
import { RichTextEditor } from "./rich-text-editor";
import BlogImageUploader from "./blog-image-uploader";

interface CreateBlogModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function CreateBlogModal({
  open,
  onOpenChange,
  onSuccess,
}: CreateBlogModalProps) {
  const { form, isLoading, onSubmit, handleOpenChange } = useCreateBlog({
    onSuccess,
    onOpenChange,
  });

  const [tagInput, setTagInput] = React.useState("");
  const watchedTags = form.watch("tags");

  const addTag = (tag: string) => {
    if (tag.trim() && !watchedTags.includes(tag.trim())) {
      form.setValue("tags", [...watchedTags, tag.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    form.setValue(
      "tags",
      watchedTags.filter((tag) => tag !== tagToRemove),
    );
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(tagInput);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-7xl min-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tạo blog mới</DialogTitle>
          <DialogDescription>
            Tạo một bài viết blog mới với nội dung phong phú và thẻ.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tiêu đề</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tiêu đề bài viết" {...field} />
                    </FormControl>
                    <FormMessage />{" "}
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trích đoạn</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Mô tả ngắn gọn về bài viết"
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Một tóm tắt ngắn gọn sẽ được hiển thị trong danh sách blog.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nội dung</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Viết nội dung bài viết ở đây..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ảnh Thumbnail</FormLabel>
                  <FormControl>
                    <BlogImageUploader
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    Ảnh thumbnail sẽ hiển thị trong danh sách bài viết và chia
                    sẻ mạng xã hội.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={() => (
                <FormItem>
                  <FormLabel>Thẻ</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Input
                        placeholder="Nhập thẻ và nhấn Enter"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagInputKeyDown}
                        onBlur={() => addTag(tagInput)}
                      />
                      {watchedTags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {watchedTags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                              <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="ml-1 rounded-full p-0.5 hover:bg-gray-200 hover:text-black"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Nhấn Enter hoặc phím phẩy để thêm thẻ. Nhấn X để xóa chúng.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={isLoading}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Đang tạo..." : "Tạo blog"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
