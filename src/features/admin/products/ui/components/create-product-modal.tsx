"use client";

import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDropzone } from "react-dropzone";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, Upload, X } from "lucide-react";
import { useCreateProductMutation } from "@/services/product-services";
import { useGetAllCategoriesQuery } from "@/services/category-services";
import { CreateProductParams } from "@/types/product";
import toast from "react-hot-toast";
import Image from "next/image";

// Form validation schema
const createProductSchema = z.object({
  name: z.string().min(1, "Tên sản phẩm là bắt buộc"),
  description: z.string().min(1, "Mô tả là bắt buộc"),
  price: z.number().min(0.01, "Giá phải lớn hơn 0"),
  brand: z.string().min(1, "Thương hiệu là bắt buộc"),
  stockQuantity: z.number().min(0, "Số lượng tồn kho phải từ 0 trở lên"),
  categoryIds: z.array(z.string()).min(1, "Cần ít nhất một danh mục"),
  tags: z.array(z.string()).min(1, "Cần ít nhất một thẻ"),
  weights: z.array(z.number()).min(1, "Cần ít nhất 1 giá trị trọng lượng"),
  calories: z.number().min(0, "Calo phải từ 0 trở lên"),
  protein: z.number().min(0, "Protein phải từ 0 trở lên"),
  cholesterol: z.number().min(0, "Cholesterol phải từ 0 trở lên"),
  lipid: z.number().min(0, "Lipid phải từ 0 trở lên"),
  sugar: z.number().min(0, "Đường phải từ 0 trở lên"),
  carbs: z.number().min(0, "Carbs phải từ 0 trở lên"),
});

type CreateProductFormValues = z.infer<typeof createProductSchema>;

interface CreateProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function CreateProductModal({
  open,
  onOpenChange,
  onSuccess,
}: CreateProductModalProps) {
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const { data: categoriesResponse } = useGetAllCategoriesQuery({
    limit: 100,
  });
  const categories = categoriesResponse?.result?.items || [];
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [newTag, setNewTag] = useState("");
  const [newWeight, setNewWeight] = useState("");

  const form = useForm<CreateProductFormValues>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      brand: "",
      stockQuantity: 0,
      categoryIds: [],
      tags: [],
      weights: [],
      calories: 0,
      protein: 0,
      cholesterol: 0,
      lipid: 0,
      sugar: 0,
      carbs: 0,
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const imageFiles = acceptedFiles.filter((file) =>
      file.type.startsWith("image/"),
    );
    setSelectedFiles((prev) => [...prev, ...imageFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    multiple: true,
  });

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (newTag.trim() && !form.getValues("tags").includes(newTag.trim())) {
      const currentTags = form.getValues("tags");
      form.setValue("tags", [...currentTags, newTag.trim()]);
      setNewTag("");
    }
  };
  const removeTag = (tagToRemove: string) => {
    const currentTags = form.getValues("tags");
    form.setValue(
      "tags",
      currentTags.filter((tag) => tag !== tagToRemove),
    );
  };
  const addWeight = () => {
    const weightNumber = parseFloat(newWeight.trim());
    if (
      newWeight.trim() &&
      !isNaN(weightNumber) &&
      weightNumber > 0 &&
      !form.getValues("weights").includes(weightNumber)
    ) {
      const currentWeights = form.getValues("weights");
      form.setValue("weights", [...currentWeights, weightNumber]);
      setNewWeight("");
    }
  };

  const removeWeight = (weightToRemove: number) => {
    const currentWeights = form.getValues("weights");
    form.setValue(
      "weights",
      currentWeights.filter((weight) => weight !== weightToRemove),
    );
  };

  const addCategory = (categoryId: string) => {
    const currentCategories = form.getValues("categoryIds");
    if (!currentCategories.includes(categoryId)) {
      form.setValue("categoryIds", [...currentCategories, categoryId]);
    }
  };

  const removeCategory = (categoryId: string) => {
    const currentCategories = form.getValues("categoryIds");
    form.setValue(
      "categoryIds",
      currentCategories.filter((id) => id !== categoryId),
    );
  };

  const onSubmit = async (data: CreateProductFormValues) => {
    try {
      if (selectedFiles.length === 0) {
        toast.error("Vui lòng chọn ít nhất một hình ảnh sản phẩm");
        return;
      }
      const params: CreateProductParams = {
        name: data.name,
        description: data.description,
        price: data.price,
        categoryIds: data.categoryIds,
        tags: data.tags,
        weights: data.weights,
        brand: data.brand,
        stockQuantity: data.stockQuantity,
        "nutritionFact.calories": data.calories,
        "nutritionFact.protein": data.protein,
        "nutritionFact.cholesterol": data.cholesterol,
        "nutritionFact.lipid": data.lipid,
        "nutritionFact.sugar": data.sugar,
        "nutritionFact.carbs": data.carbs,
      };

      await createProduct({
        params,
        body: {
          imageProduct: selectedFiles,
        },
      }).unwrap();
      toast.success("Sản phẩm đã được tạo thành công!");
      onSuccess();
      onOpenChange(false);
      form.reset();
      setSelectedFiles([]);
    } catch (error: unknown) {
      console.error("Failed to create product:", error);
      toast.error("Tạo sản phẩm thất bại");
    }
  };
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      form.reset();
      setSelectedFiles([]);
      setNewTag("");
      setNewWeight("");
    }
    onOpenChange(newOpen);
  };

  const watchedCategories = form.watch("categoryIds");
  const watchedTags = form.watch("tags");
  const watchedWeights = form.watch("weights");

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-7xl min-w-5xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tạo sản phẩm mới</DialogTitle>
          <DialogDescription>
            Thêm sản phẩm mới vào kho của bạn. Điền tất cả thông tin bắt buộc.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Thông tin cơ bản</h3>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên sản phẩm</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập tên sản phẩm" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mô tả</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Nhập mô tả sản phẩm"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Giá (VND)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value) || 0)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="stockQuantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số lượng tồn kho</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value) || 0)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thương hiệu</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập tên thương hiệu" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Categories and Tags */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Danh mục & Thẻ</h3>
                <div>
                  <FormLabel>Danh mục</FormLabel>
                  <Select onValueChange={addCategory}>
                    <SelectTrigger className="mt-2 w-full">
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id}
                          disabled={watchedCategories.includes(category.id)}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {watchedCategories.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {watchedCategories.map((categoryId) => {
                        const category = categories.find(
                          (c) => c.id === categoryId,
                        );
                        return (
                          <Badge key={categoryId} variant="secondary">
                            {category?.name || categoryId}
                            <button
                              type="button"
                              onClick={() => removeCategory(categoryId)}
                              className="ml-1 rounded-full p-0.5 hover:bg-gray-200"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        );
                      })}
                    </div>
                  )}
                  {form.formState.errors.categoryIds && (
                    <p className="text-destructive mt-1 text-sm font-medium">
                      {form.formState.errors.categoryIds.message}
                    </p>
                  )}
                </div>
                <div>
                  <FormLabel>Thẻ</FormLabel>
                  <div className="mt-2 flex gap-2">
                    <Input
                      placeholder="Thêm thẻ"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                    />
                    <Button type="button" onClick={addTag} variant="outline">
                      Thêm
                    </Button>
                  </div>
                  {watchedTags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {watchedTags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 rounded-full p-0.5 hover:bg-gray-200"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                  {form.formState.errors.tags && (
                    <p className="text-destructive mt-1 text-sm font-medium">
                      {form.formState.errors.tags.message}
                    </p>
                  )}
                </div>

                <div>
                  <FormLabel>Weights (grams)</FormLabel>
                  <div className="mt-2 flex gap-2">
                    <Input
                      type="number"
                      placeholder="Add weight (e.g. 250)"
                      value={newWeight}
                      onChange={(e) => setNewWeight(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addWeight();
                        }
                      }}
                    />
                    <Button type="button" onClick={addWeight} variant="outline">
                      Add
                    </Button>
                  </div>
                  {watchedWeights.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {watchedWeights.map((weight) => (
                        <Badge key={weight} variant="secondary">
                          {weight}g
                          <button
                            type="button"
                            onClick={() => removeWeight(weight)}
                            className="ml-1 rounded-full p-0.5 hover:bg-gray-200"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                  {form.formState.errors.weights && (
                    <p className="text-destructive mt-1 text-sm font-medium">
                      {form.formState.errors.weights.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* Nutrition Facts */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                Thông tin dinh dưỡng (trên 100g)
              </h3>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="calories"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Calo (kcal)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="protein"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Protein (g)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          placeholder="0.0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="carbs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Carbohydrate (g)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          placeholder="0.0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lipid"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chất béo/Lipid (g)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          placeholder="0.0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sugar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Đường (g)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          placeholder="0.0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cholesterol"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cholesterol (mg)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          placeholder="0.0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* Image Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Hình ảnh sản phẩm</h3>
              <div
                {...getRootProps()}
                className={`cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
                  isDragActive
                    ? "border-primary bg-primary/5"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  {isDragActive
                    ? "Thả hình ảnh vào đây..."
                    : "Kéo & thả hình ảnh vào đây, hoặc nhấp để chọn"}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Hỗ trợ: JPEG, PNG, GIF, WebP
                </p>
              </div>
              {selectedFiles.length > 0 && (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="relative">
                      <div className="aspect-square overflow-hidden rounded-lg border bg-gray-100">
                        <Image
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                          className="h-full w-full object-cover"
                          width={250}
                          height={250}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                      <p className="mt-1 truncate text-xs text-gray-500">
                        {file.name}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Tạo sản phẩm
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
