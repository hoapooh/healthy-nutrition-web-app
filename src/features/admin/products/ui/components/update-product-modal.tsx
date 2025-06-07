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
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0.01, "Price must be greater than 0"),
  brand: z.string().min(1, "Brand is required"),
  stockQuantity: z.number().min(0, "Stock quantity must be 0 or greater"),
  categoryIds: z.array(z.string()).min(1, "At least one category is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  calories: z.number().min(0, "Calories must be 0 or greater"),
  protein: z.number().min(0, "Protein must be 0 or greater"),
  cholesterol: z.number().min(0, "Cholesterol must be 0 or greater"),
  lipid: z.number().min(0, "Lipid must be 0 or greater"),
  sugar: z.number().min(0, "Sugar must be 0 or greater"),
  carbs: z.number().min(0, "Carbs must be 0 or greater"),
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
        "nutritionFact.calories": values.calories,
        "nutritionFact.protein": values.protein,
        "nutritionFact.cholesterol": values.cholesterol,
        "nutritionFact.lipid": values.lipid,
        "nutritionFact.sugar": values.sugar,
        "nutritionFact.carbs": values.carbs,
      };

      const body =
        selectedFiles.length > 0 ? { imageProduct: selectedFiles } : undefined;

      await updateProduct({
        id: product.id,
        params,
        body,
      }).unwrap();

      toast.success("Product updated successfully!");
      onOpenChange(false);
      onSuccess();
    } catch (error: unknown) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    }
  };

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-7xl min-w-5xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Product</DialogTitle>
          <DialogDescription>
            Update product information, images, and nutritional facts.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter product name" {...field} />
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
                      <FormLabel>Brand</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter brand name" {...field} />
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
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter product description"
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
                        <FormLabel>Price (VND)</FormLabel>
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
                        <FormLabel>Stock Quantity</FormLabel>
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
                <h3 className="text-lg font-semibold">Categories & Tags</h3>

                <FormField
                  control={form.control}
                  name="categoryIds"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categories</FormLabel>
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
                      <FormLabel>Tags</FormLabel>
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Enter tag"
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
                            Add
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
              </div>
            </div>

            {/* Nutrition Facts */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                Nutrition Facts (per 100g)
              </h3>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="calories"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Calories (kcal)</FormLabel>
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
                      <FormLabel>Carbohydrates (g)</FormLabel>
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
                      <FormLabel>Fat/Lipid (g)</FormLabel>
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
                      <FormLabel>Sugar (g)</FormLabel>
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
              <h3 className="text-lg font-semibold">Product Images</h3>

              {/* Existing Images */}
              {existingImages.length > 0 && (
                <div className="space-y-2">
                  <p className="text-muted-foreground text-sm">
                    Current Images:
                  </p>
                  <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
                    {existingImages.map((image, index) => (
                      <div key={index} className="group relative">
                        <Image
                          src={image}
                          alt={`Product ${index + 1}`}
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
                    ? "New Images:"
                    : "Upload New Images (Optional):"}
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
                      ? "Drop the images here..."
                      : "Drag & drop images here, or click to select"}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Supports: JPG, PNG, GIF, WebP (max 5MB each)
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
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Product"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
