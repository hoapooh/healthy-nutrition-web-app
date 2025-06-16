"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Edit2, Save, X, Loader2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { UpdateProfileFormValues } from "../../hooks/use-update-profile";

interface EditableProfileFieldsProps {
  className?: string;
  form: UseFormReturn<UpdateProfileFormValues>;
  onSubmit: (values: UpdateProfileFormValues) => void;
  isLoading: boolean;
  isEditMode: boolean;
  handleCancel: () => void;
  handleEdit: () => void;
}

const EditableProfileFields: React.FC<EditableProfileFieldsProps> = ({
  className,
  form,
  onSubmit,
  isLoading,
  isEditMode,
  handleCancel,
  handleEdit,
}) => {
  if (!isEditMode) {
    return (
      <div className={className}>
        <Button
          variant="outline"
          size="sm"
          onClick={handleEdit}
          className="flex items-center space-x-2"
        >
          <Edit2 className="h-4 w-4" />
          <span>Chỉnh sửa thông tin</span>
        </Button>
      </div>
    );
  }

  return (
    <div className={className}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name Field */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Họ và tên</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập họ và tên của bạn"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Number Field */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số điện thoại</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập số điện thoại"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address Field */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Địa chỉ</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Nhập địa chỉ của bạn"
                    className="resize-none"
                    rows={3}
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCancel}
              disabled={isLoading}
              className="flex items-center space-x-2"
            >
              <X className="h-4 w-4" />
              <span>Hủy</span>
            </Button>
            <Button
              type="submit"
              size="sm"
              variant={isLoading ? "secondary" : "healthy"}
              disabled={isLoading}
              className="flex items-center space-x-2"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              <span>{isLoading ? "Đang lưu..." : "Lưu thay đổi"}</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditableProfileFields;
