"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Loader2 } from "lucide-react";
import useImageUpload from "../../hooks/use-image-upload";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProfileImageUploaderProps {
  userFullName: string;
  className?: string;
}

const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({
  userFullName,
  className,
}) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isUploading,
    previewImage,
    currentImage,
  } = useImageUpload();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const displayImage = previewImage || currentImage;

  return (
    <div className={cn("relative", className)}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            {...getRootProps()}
            className={cn(
              "group relative cursor-pointer transition-all duration-200",
              isDragActive && "scale-105",
              isUploading && "cursor-not-allowed opacity-70",
            )}
          >
            <input {...getInputProps()} disabled={isUploading} />

            <Avatar className="h-20 w-20">
              <AvatarImage
                src={displayImage}
                alt={userFullName}
                className="object-cover"
              />
              <AvatarFallback className="bg-green-100 text-lg font-semibold text-green-600">
                {getInitials(userFullName)}
              </AvatarFallback>
            </Avatar>

            {/* Overlay */}
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100",
                isDragActive && "opacity-100",
                isUploading && "opacity-100",
              )}
            >
              {isUploading ? (
                <Loader2 className="h-6 w-6 animate-spin text-white" />
              ) : (
                <Camera className="h-6 w-6 text-white" />
              )}
            </div>

            {/* Upload indicator when dragging */}
            {isDragActive && !isUploading && (
              <div className="absolute -inset-2 rounded-full border-2 border-dashed border-green-500 bg-green-50/20" />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          {/* Upload instructions */}
          <div className="mt-2 text-center">
            <p className="text-xs">
              {isUploading ? "Uploading..." : "Click or drag to update photo"}
            </p>
            <p className="text-xs">PNG, JPG, GIF up to 5MB</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default ProfileImageUploader;
