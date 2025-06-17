"use client";

import React from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BlogImageUploaderProps {
  value?: File | string | null;
  onChange: (file: File | null) => void;
  disabled?: boolean;
  className?: string;
}

const BlogImageUploader: React.FC<BlogImageUploaderProps> = ({
  value,
  onChange,
  disabled = false,
  className,
}) => {
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [isUploading, setIsUploading] = React.useState(false);
  // Create preview URL when file changes
  React.useEffect(() => {
    if (value) {
      if (value instanceof File) {
        const url = URL.createObjectURL(value);
        setPreviewUrl(url);
        return () => URL.revokeObjectURL(url);
      } else if (typeof value === "string") {
        setPreviewUrl(value);
      }
    } else {
      setPreviewUrl(null);
    }
  }, [value]);

  const onDrop = React.useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setIsUploading(true);
        // Simulate upload delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        onChange(file);
        setIsUploading(false);
      }
    },
    [onChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
    disabled: disabled || isUploading,
  });

  const removeImage = () => {
    onChange(null);
    setPreviewUrl(null);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {previewUrl ? (
        // Preview state
        <div className="relative">
          <div className="relative overflow-hidden rounded-lg border-2 border-dashed border-gray-300">
            {" "}
            <Image
              src={previewUrl}
              alt="Blog thumbnail preview"
              width={1200}
              height={630}
              className="h-48 w-full object-cover"
            />
            {!disabled && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={removeImage}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>{" "}
          <p className="text-center text-sm text-gray-600">
            {value instanceof File ? value.name : "Ảnh thumbnail hiện tại"}
          </p>
        </div>
      ) : (
        // Upload state
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              {...getRootProps()}
              className={cn(
                "flex h-48 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-all duration-200 hover:border-gray-400 hover:bg-gray-100",
                isDragActive && "border-green-500 bg-green-50",
                isUploading && "cursor-not-allowed opacity-70",
                disabled && "cursor-not-allowed opacity-50",
              )}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center space-y-2">
                {isUploading ? (
                  <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                ) : isDragActive ? (
                  <Upload className="h-8 w-8 text-green-500" />
                ) : (
                  <ImageIcon className="h-8 w-8 text-gray-400" />
                )}
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">
                    {isUploading
                      ? "Đang tải lên..."
                      : isDragActive
                        ? "Thả ảnh vào đây"
                        : "Nhấn để chọn hoặc kéo ảnh vào đây"}
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF, WEBP tối đa 5MB
                  </p>
                </div>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="text-center">
              <p className="text-xs">Ảnh thumbnail cho bài viết</p>
              <p className="text-xs">Kích thước khuyến nghị: 1200x630px</p>
            </div>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
};

export default BlogImageUploader;
