"use client";

import { Loader2 } from "lucide-react";
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
import { Feedback } from "@/types/feedback";

interface FeedbackDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  feedback: Feedback | null;
  isDeleting: boolean;
}

export const FeedbackDeleteDialog: React.FC<FeedbackDeleteDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  feedback,
  isDeleting,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xóa phản hồi</AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <span>Bạn có chắc chắn muốn xóa phản hồi này không?</span>
            {feedback && (
              <div className="bg-muted mt-4 rounded-lg p-3">
                <div className="text-foreground line-clamp-3 text-sm">
                  &ldquo;{feedback.content}&rdquo;
                </div>
              </div>
            )}
            <span className="text-destructive">
              Hành động này không thể hoàn tác.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Hủy</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isDeleting}
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang xóa...
              </>
            ) : (
              "Xóa phản hồi"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
