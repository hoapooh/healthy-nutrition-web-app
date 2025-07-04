"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, Eye } from "lucide-react";
import { Blog } from "@/types/blog";
import Image from "next/image";

interface BlogPreviewDialogProps {
  blog: Blog | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BlogPreviewDialog({
  blog,
  open,
  onOpenChange,
}: BlogPreviewDialogProps) {
  if (!blog) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-7xl min-w-4xl overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            <DialogTitle>Xem trước</DialogTitle>
          </div>
          <DialogDescription>
            Xem trước bài viết blog như nó sẽ xuất hiện với độc giả.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Blog Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              {blog.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl leading-tight font-bold">{blog.title}</h1>

            <div className="text-muted-foreground flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <span>
                  {new Date(blog.createdAt).toLocaleDateString("vi-VN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            {blog.images && blog.images.length > 0 && (
              <div className="overflow-hidden rounded-lg">
                <Image
                  src={blog.images[0]}
                  alt={blog.title}
                  height={1080}
                  width={1920}
                  className="h-64 w-full object-cover"
                />
              </div>
            )}
          </div>

          <Separator />

          {/* Blog Excerpt */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Trích đoạn</h3>
            <p className="text-muted-foreground italic">{blog.excerpt}</p>
          </div>

          <Separator />

          {/* Blog Content */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Nội dung</h3>
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>

          {/* Blog Footer */}
          <Separator />
          <div className="text-muted-foreground space-y-1 text-sm">
            <p>Xuất bản: {new Date(blog.createdAt).toLocaleString()}</p>
          </div>
        </div>

        <style jsx global>{`
          .prose h1 {
            font-size: 2rem;
            font-weight: 700;
            margin: 1.5rem 0 1rem;
          }
          .prose h2 {
            font-size: 1.75rem;
            font-weight: 600;
            margin: 1.25rem 0 0.75rem;
          }
          .prose h3 {
            font-size: 1.5rem;
            font-weight: 600;
            margin: 1rem 0 0.5rem;
          }
          .prose h4 {
            font-size: 1.25rem;
            font-weight: 600;
            margin: 1rem 0 0.5rem;
          }
          .prose p {
            margin: 0.75rem 0;
            line-height: 1.6;
          }
          .prose ul,
          .prose ol {
            margin: 0.75rem 0;
            padding-left: 1.5rem;
          }
          .prose li {
            margin: 0.25rem 0;
          }
          .prose blockquote {
            border-left: 4px solid #e2e8f0;
            padding-left: 1rem;
            margin: 1rem 0;
            font-style: italic;
            color: #64748b;
          }
          .prose strong {
            font-weight: 600;
          }
          .prose em {
            font-style: italic;
          }
          .prose code {
            background-color: #f1f5f9;
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            font-size: 0.875rem;
          }
          .prose pre {
            background-color: #1e293b;
            color: #f8fafc;
            padding: 1rem;
            border-radius: 0.5rem;
            overflow-x: auto;
            margin: 1rem 0;
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
}
