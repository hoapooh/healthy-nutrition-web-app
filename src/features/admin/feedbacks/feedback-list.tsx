"use client";

import { MessageSquare, Search } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useDeleteFeedbackMutation,
  useGetAllFeedbacksQuery,
} from "@/services/feedback-services";
import { Feedback } from "@/types/feedback";

import { FeedbackDeleteDialog } from "./feedback-delete-dialog";
import { FeedbackItem } from "./feedback-item";
import { FeedbackStats } from "./feedback-stats";

export interface FeedbackData {
  id: string;
  content: string;
  createdAt?: string;
}

export const FeedbackList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: feedbackResponse,
    isLoading,
    error,
    refetch,
  } = useGetAllFeedbacksQuery({
    pageIndex: currentPage,
    limit: pageSize,
  });

  const feedbacks = React.useMemo(() => {
    return feedbackResponse?.result?.items || [];
  }, [feedbackResponse?.result?.items]);

  const totalCount = feedbackResponse?.result?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  console.log(feedbackResponse);

  const [deleteFeedback, { isLoading: isDeleting }] =
    useDeleteFeedbackMutation();

  // Filter feedbacks
  const filteredFeedbacks = React.useMemo(() => {
    return feedbacks.filter((feedback: Feedback) => {
      const matchesSearch = feedback.content
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [feedbacks, searchTerm]);

  const handleDeleteClick = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedFeedback) return;

    try {
      await deleteFeedback(selectedFeedback.id).unwrap();
      toast.success("Feedback deleted successfully");
      setDeleteDialogOpen(false);
      setSelectedFeedback(null);
    } catch (error) {
      toast.error("Failed to delete feedback");
      console.error("Delete feedback error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Failed to load feedbacks. Please try again later.
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="ml-2"
          >
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      {!isLoading && !error && <FeedbackStats feedbacks={feedbacks} />}

      {/* Header with stats */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          <h2 className="text-2xl font-semibold">Tất cả phản hồi</h2>
          <Badge variant="secondary" className="ml-2">
            {filteredFeedbacks.length} trên {feedbacks.length}
          </Badge>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          placeholder="Tìm kiếm phản hồi theo nội dung..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Feedback List */}
      {filteredFeedbacks.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MessageSquare className="text-muted-foreground mb-4 h-12 w-12" />
            <h3 className="mb-2 text-lg font-medium">No feedbacks found</h3>
            <p className="text-muted-foreground text-center">
              {searchTerm
                ? "No feedbacks match your search criteria."
                : "No feedbacks have been submitted yet."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredFeedbacks.map((feedback: Feedback) => (
            <FeedbackItem
              key={feedback.id}
              feedback={feedback}
              onDelete={handleDeleteClick}
              isDeleting={isDeleting && selectedFeedback?.id === feedback.id}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-muted-foreground text-sm">
              Hiển thị {(currentPage - 1) * pageSize + 1} đến{" "}
              {Math.min(currentPage * pageSize, totalCount)} của {totalCount}{" "}
              kết quả
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm">
                Số hàng trên trang:
              </span>
              <Select
                value={pageSize.toString()}
                onValueChange={(value) => {
                  setPageSize(Number(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-16">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNumber =
                    Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                  if (pageNumber > totalPages) return null;

                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        onClick={() => setCurrentPage(pageNumber)}
                        isActive={currentPage === pageNumber}
                        className="cursor-pointer"
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <FeedbackDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        feedback={selectedFeedback}
        isDeleting={isDeleting}
      />
    </div>
  );
};
