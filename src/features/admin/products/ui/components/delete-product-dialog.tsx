"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { useDeleteProductMutation } from "@/services/product-services";
import { Product } from "@/types/product";
import toast from "react-hot-toast";

interface DeleteProductDialogProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function DeleteProductDialog({
  product,
  open,
  onOpenChange,
  onSuccess,
}: DeleteProductDialogProps) {
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const handleDelete = async () => {
    try {
      await deleteProduct(product.id).unwrap();
      toast.success("Product deleted successfully!");
      onSuccess();
      onOpenChange(false);
    } catch (error: unknown) {
      console.error("Failed to delete product:", error);
      toast.error("Failed to delete product");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            product <strong>&quot;{product.name}&quot;</strong> and remove all
            associated data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete Product
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
