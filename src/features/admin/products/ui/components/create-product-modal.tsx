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
        toast.error("Please select at least one product image");
        return;
      }

      const params: CreateProductParams = {
        name: data.name,
        description: data.description,
        price: data.price,
        categoryIds: data.categoryIds,
        tags: data.tags,
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

      toast.success("Product created successfully!");
      onSuccess();
      onOpenChange(false);
      form.reset();
      setSelectedFiles([]);
    } catch (error: unknown) {
      console.error("Failed to create product:", error);
      toast.error("Failed to create product");
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      form.reset();
      setSelectedFiles([]);
      setNewTag("");
    }
    onOpenChange(newOpen);
  };

  const watchedCategories = form.watch("categoryIds");
  const watchedTags = form.watch("tags");

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-7xl min-w-5xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Product</DialogTitle>
          <DialogDescription>
            Add a new product to your inventory. Fill in all the required
            information.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter product description"
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
                        <FormLabel>Price ($)</FormLabel>
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
              </div>

              {/* Categories and Tags */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Categories & Tags</h3>

                <div>
                  <FormLabel>Categories</FormLabel>
                  <Select onValueChange={addCategory}>
                    <SelectTrigger className="mt-2 w-full">
                      <SelectValue placeholder="Select categories" />
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
                  <FormLabel>Tags</FormLabel>
                  <div className="mt-2 flex gap-2">
                    <Input
                      placeholder="Add tag"
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
                      Add
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
              </div>
            </div>

            {/* Nutrition Facts */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Nutrition Facts</h3>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="calories"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Calories</FormLabel>
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
                      <FormLabel>Carbs (g)</FormLabel>
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
                      <FormLabel>Lipid (g)</FormLabel>
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
                      <FormLabel>Sugar (g)</FormLabel>
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
              <h3 className="text-lg font-semibold">Product Images</h3>
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
                    ? "Drop the images here..."
                    : "Drag & drop images here, or click to select"}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Supports: JPEG, PNG, GIF, WebP
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
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Product
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
