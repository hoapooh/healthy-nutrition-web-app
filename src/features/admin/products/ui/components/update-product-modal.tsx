"use client";

import React, { useCallback, useState, useEffect } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Loader2, Upload, X } from "lucide-react";
import { useUpdateProductMutation } from "@/services/product-services";
import { useGetAllCategoriesQuery } from "@/services/category-services";
import toast from "react-hot-toast";
import Image from "next/image";
import { Product } from "@/types/product";

// Form validation schema
const updateProductSchema = z.object({
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

type UpdateProductFormValues = z.infer<typeof updateProductSchema>;

interface UpdateProductModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function UpdateProductModal({
  product,
  open,
  onOpenChange,
  onSuccess,
}: UpdateProductModalProps) {
  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const { data: categoriesResponse } = useGetAllCategoriesQuery({
    limit: 100,
  });
  const categories = categoriesResponse?.result?.items || [];
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [newWeight, setNewWeight] = useState("");

  const form = useForm<UpdateProductFormValues>({
    resolver: zodResolver(updateProductSchema),
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

  // Reset form when product changes
  useEffect(() => {
    if (product) {
      const defaultValues = {
        name: product.name || "",
        description: product.description || "",
        price: product.price || 0,
        brand: product.brand || "",
        stockQuantity: product.stockQuantity || 0,
        categoryIds: product.categoryIds || [],
        tags: product.tags || [],
        weights: product.weights || [],
        calories: product.nutritionFact?.calories || 0,
        protein: product.nutritionFact?.protein || 0,
        cholesterol: product.nutritionFact?.cholesterol || 0,
        lipid: product.nutritionFact?.lipid || 0,
        sugar: product.nutritionFact?.sugar || 0,
        carbs: product.nutritionFact?.carbs || 0,
      };

      form.reset(defaultValues);
      setExistingImages(product.imageUrls || []);
      setSelectedFiles([]);
    }
  }, [product, form]);
  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      form.reset();
      setSelectedFiles([]);
      setExistingImages([]);
      setNewTag("");
      setNewWeight("");
    }
  }, [open, form]);

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
    maxSize: 5242880, // 5MB
  });

  const removeFile = (indexToRemove: number) => {
    setSelectedFiles((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
  };

  const removeExistingImage = (indexToRemove: number) => {
    setExistingImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
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

  const onSubmit = async (values: UpdateProductFormValues) => {
    if (!product) return;

    try {
      const params = {
        name: values.name,
        description: values.description,
        price: values.price,
        brand: values.brand,
        stockQuantity: values.stockQuantity,
        categoryIds: values.categoryIds,
        tags: values.tags,
        weights: values.weights,
        "nutritionFact.calories": values.calories,
        "nutritionFact.protein": values.protein,
        "nutritionFact.cholesterol": values.cholesterol,
        "nutritionFact.lipid": values.lipid,
        "nutritionFact.sugar": values.sugar,
        "nutritionFact.carbs": values.carbs,
      };

      const body =
        selectedFiles.length > 0 ? { imageProduct: selectedFiles } : {};
      await updateProduct({
        id: product.id,
        params,
        body,
      }).unwrap();

      toast.success("Cập nhật sản phẩm thành công!");
      onOpenChange(false);
      onSuccess();
    } catch (error: unknown) {
      console.error("Error updating product:", error);
      toast.error("Cập nhật sản phẩm thất bại");
    }
  };

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-7xl min-w-5xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Cập nhật sản phẩm</DialogTitle>
          <DialogDescription>
            Cập nhật thông tin sản phẩm, hình ảnh và dữ liệu dinh dưỡng.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mô tả</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Nhập mô tả sản phẩm"
                          className="resize-none"
                          rows={4}
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
              </div>

              {/* Categories and Tags */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Danh mục, Thẻ, Trọng lượng
                </h3>
                <FormField
                  control={form.control}
                  name="categoryIds"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Danh mục</FormLabel>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div
                            key={category.id}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="checkbox"
                              id={`category-${category.id}`}
                              checked={field.value.includes(category.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  field.onChange([...field.value, category.id]);
                                } else {
                                  field.onChange(
                                    field.value.filter(
                                      (id) => id !== category.id,
                                    ),
                                  );
                                }
                              }}
                              className="rounded border-gray-300"
                            />
                            <label
                              htmlFor={`category-${category.id}`}
                              className="text-sm font-medium"
                            >
                              {category.name}
                            </label>
                          </div>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thẻ</FormLabel>
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Nhập thẻ"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                addTag();
                              }
                            }}
                          />
                          <Button
                            type="button"
                            onClick={addTag}
                            variant="outline"
                          >
                            Thêm
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {field.value.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="flex items-center gap-1"
                            >
                              {tag}
                              <X
                                className="h-3 w-3 cursor-pointer"
                                onClick={() => removeTag(tag)}
                              />
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weights"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weights (grams)</FormLabel>
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            placeholder="Enter weight (e.g. 250)"
                            value={newWeight}
                            onChange={(e) => setNewWeight(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                addWeight();
                              }
                            }}
                          />
                          <Button
                            type="button"
                            onClick={addWeight}
                            variant="outline"
                          >
                            Add
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {field.value.map((weight) => (
                            <Badge
                              key={weight}
                              variant="secondary"
                              className="flex items-center gap-1"
                            >
                              {weight}g
                              <X
                                className="h-3 w-3 cursor-pointer"
                                onClick={() => removeWeight(weight)}
                              />
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                          step="0.1"
                          placeholder="0"
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
                  name="protein"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Protein (g)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          placeholder="0"
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
                          placeholder="0"
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
                          placeholder="0"
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
                          placeholder="0"
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
                          placeholder="0"
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
            {/* Images */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Hình ảnh sản phẩm</h3>
              {/* Existing Images */}
              {existingImages.length > 0 && (
                <div className="space-y-2">
                  <p className="text-muted-foreground text-sm">
                    Hình ảnh hiện tại:
                  </p>
                  <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
                    {existingImages.map((image, index) => (
                      <div key={index} className="group relative">
                        <Image
                          src={image}
                          alt={`Sản phẩm ${index + 1}`}
                          width={100}
                          height={100}
                          className="h-20 w-full rounded-md border object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeExistingImage(index)}
                          className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* New Images Upload */}
              <div className="space-y-2">
                <p className="text-muted-foreground text-sm">
                  {selectedFiles.length > 0
                    ? "Hình ảnh mới:"
                    : "Tải lên hình ảnh mới (Tùy chọn):"}
                </p>
                <div
                  {...getRootProps()}
                  className={`cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
                    isDragActive
                      ? "border-primary bg-primary/5"
                      : "border-muted-foreground/25 hover:border-primary/50"
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                  <p className="text-muted-foreground mb-2 text-sm">
                    {isDragActive
                      ? "Thả hình ảnh vào đây..."
                      : "Kéo & thả hình ảnh vào đây, hoặc nhấp để chọn"}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Hỗ trợ: JPG, PNG, GIF, WebP (tối đa 5MB mỗi file)
                  </p>
                </div>
              </div>
              {/* New Selected Files Preview */}
              {selectedFiles.length > 0 && (
                <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="group relative">
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        width={100}
                        height={100}
                        className="h-20 w-full rounded-md border object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <X className="h-3 w-3" />
                      </button>
                      <div className="absolute right-0 bottom-0 left-0 truncate rounded-b-md bg-black/50 p-1 text-xs text-white">
                        {file.name}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang cập nhật...
                  </>
                ) : (
                  "Cập nhật sản phẩm"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
