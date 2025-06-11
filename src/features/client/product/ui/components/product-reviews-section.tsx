"use client";

import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Send, Loader2, User } from "lucide-react";
import {
  useGetAllReviewsQuery,
  useConfirmReviewQuery,
  useCreateReviewMutation,
} from "@/services/review-services";
import { useAuth } from "@/store/hooks/use-auth";
import { Review as ReviewType } from "@/types/review";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

// Review form validation schema
const reviewFormSchema = z.object({
  rating: z
    .number()
    .min(1, "Please select a rating")
    .max(5, "Rating cannot exceed 5 stars"),
  comment: z
    .string()
    .min(10, "Comment must be at least 10 characters")
    .max(500, "Comment cannot exceed 500 characters"),
});

type ReviewFormValues = z.infer<typeof reviewFormSchema>;

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  userImage?: string;
}

interface ProductReviewsSectionProps {
  productId: string;
  className?: string;
}

// Star Rating Component
interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  disabled?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  onRatingChange,
  disabled = false,
}) => {
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`transition-colors ${disabled ? "cursor-not-allowed" : "cursor-pointer hover:scale-110"}`}
          onMouseEnter={() => !disabled && setHoveredRating(star)}
          onMouseLeave={() => !disabled && setHoveredRating(0)}
          onClick={() => !disabled && onRatingChange(star)}
          disabled={disabled}
        >
          <Star
            className={`h-6 w-6 transition-colors ${
              star <= (hoveredRating || rating)
                ? "fill-current text-yellow-400"
                : "text-gray-300 hover:text-yellow-200"
            }`}
          />
        </button>
      ))}
      <span className="text-muted-foreground ml-2 text-sm">
        {rating > 0
          ? `${rating} star${rating !== 1 ? "s" : ""}`
          : "Select rating"}
      </span>
    </div>
  );
};

// Review Input Form Component
interface ReviewInputFormProps {
  productId: string;
  userId: string;
  onSuccess: () => void;
}

const ReviewInputForm: React.FC<ReviewInputFormProps> = ({
  productId,
  userId,
  onSuccess,
}) => {
  const [createReview, { isLoading }] = useCreateReviewMutation();

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const onSubmit = async (data: ReviewFormValues) => {
    try {
      await createReview({
        userId,
        productId,
        rating: data.rating,
        comment: data.comment,
      }).unwrap();

      toast.success("Review submitted successfully!");
      form.reset();
      onSuccess();
    } catch (error) {
      console.error("Failed to submit review:", error);
      toast.error("Failed to submit review. Please try again.");
    }
  };

  return (
    <div className="bg-card rounded-lg border p-6">
      <h3 className="mb-4 text-lg font-semibold">Write a Review</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Rating Field */}
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating *</FormLabel>
                <FormControl>
                  <StarRating
                    rating={field.value}
                    onRatingChange={field.onChange}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Comment Field */}
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comment *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Share your thoughts about this product..."
                    className="min-h-[100px] resize-none"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormMessage />
                  <span className="text-muted-foreground text-xs">
                    {field.value.length}/500 characters
                  </span>
                </div>
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit Review
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export const ProductReviewsSection = ({
  productId,
  className = "",
}: ProductReviewsSectionProps) => {
  const { user } = useAuth();
  const [checkCurrentUser, setCheckCurrentUser] = useState(false);

  // Fetch reviews for this product
  const {
    data: reviewsData,
    isLoading: reviewsLoading,
    refetch: refetchReviews,
  } = useGetAllReviewsQuery({
    productId,
    limit: 100,
  });

  // Check if current user can review this product
  const { data: canReviewData, refetch: refetchCanReview } =
    useConfirmReviewQuery(
      {
        userId: user?.id || "",
        productId,
      },
      {
        skip: !user?.id, // Skip if user is not logged in
      },
    );

  // Transform API reviews to component format
  const reviews: Review[] = useMemo(() => {
    if (!reviewsData?.result?.items) return [];

    return reviewsData.result.items.map((review: ReviewType) => {
      if (review.user.id === user?.id) setCheckCurrentUser(true);

      return {
        id: review.id,
        author: review.user.fullName,
        rating: review.rating,
        date: new Date(review.createdAt).toLocaleDateString("vi-VN", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        comment: review.comment,
        userImage: review.user!.image,
      };
    });
  }, [reviewsData?.result?.items, user?.id]);

  // Calculate statistics from actual reviews
  const { averageRating, totalReviews, ratingDistribution } = useMemo(() => {
    if (reviews.length === 0) {
      return {
        averageRating: 0,
        totalReviews: 0,
        ratingDistribution: [
          { stars: 5, count: 0, percentage: 0 },
          { stars: 4, count: 0, percentage: 0 },
          { stars: 3, count: 0, percentage: 0 },
          { stars: 2, count: 0, percentage: 0 },
          { stars: 1, count: 0, percentage: 0 },
        ],
      };
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const avgRating = totalRating / reviews.length;

    // Count ratings by star level
    const starCounts = [0, 0, 0, 0, 0]; // Index 0 = 1 star, Index 4 = 5 stars
    reviews.forEach((review) => {
      if (review.rating >= 1 && review.rating <= 5) {
        starCounts[review.rating - 1]++;
      }
    });

    // Calculate rating distribution
    const distribution = starCounts
      .map((count, index) => ({
        stars: index + 1,
        count,
        percentage: Math.round((count / reviews.length) * 100),
      }))
      .reverse(); // Reverse to show 5 stars first

    return {
      averageRating: Math.round(avgRating * 10) / 10,
      totalReviews: reviews.length,
      ratingDistribution: distribution,
    };
  }, [reviews]);

  const canUserReview = canReviewData?.message === true;

  const handleReviewSuccess = () => {
    refetchReviews();
    refetchCanReview();
  };

  if (reviewsLoading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-3/4 rounded bg-gray-200"></div>
          <div className="h-4 w-1/2 rounded bg-gray-200"></div>
          <div className="h-4 w-2/3 rounded bg-gray-200"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Rating Summary */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="text-center">
          <div className="mb-2 text-4xl font-bold text-green-600">
            {averageRating}
          </div>
          <div className="mb-2 flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${i < Math.floor(averageRating) ? "fill-current text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <div className="text-muted-foreground text-sm">
            Based on {totalReviews} reviews
          </div>
        </div>

        <div className="space-y-2">
          {ratingDistribution.map((rating) => (
            <div key={rating.stars} className="flex items-center gap-3">
              <div className="flex w-16 items-center gap-1">
                <span className="text-sm">{rating.stars}</span>
                <Star className="h-3 w-3 fill-current text-yellow-400" />
              </div>
              <Progress value={rating.percentage} className="flex-1" />
              <span className="text-muted-foreground w-8 text-sm">
                {rating.count}
              </span>
            </div>
          ))}
        </div>
      </div>
      <Separator /> {/* Review Input Form - Show only if user can review */}
      {user?.id && canUserReview && !checkCurrentUser && (
        <>
          <ReviewInputForm
            productId={productId}
            userId={user.id}
            onSuccess={handleReviewSuccess}
          />
          <Separator />
        </>
      )}
      {/* Individual Reviews */}
      <div className="space-y-6">
        {totalReviews === 0 ? (
          <div className="py-8 text-center">
            <p className="font-semibold text-green-600">No reviews yet.</p>
            {user && canUserReview && !checkCurrentUser && (
              <p className="text-muted-foreground mt-2 text-sm">
                Be the first to review this product!
              </p>
            )}
            {user && canUserReview && checkCurrentUser && (
              <p className="text-muted-foreground mt-2 text-sm">
                You can only review products once per product.
              </p>
            )}
            {user && !canUserReview && (
              <p className="text-muted-foreground mt-2 text-sm">
                Buy this product to leave a review.
              </p>
            )}
            {!user && (
              <p className="text-muted-foreground mt-2 text-sm">
                Please log in to write a review.
              </p>
            )}
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="border-b pb-6 last:border-b-0">
              <div className="mb-3 flex items-start gap-4">
                {/* User Avatar */}
                <Avatar className="h-10 w-10">
                  <AvatarImage src={review.userImage} alt={review.author} />
                  <AvatarFallback className="bg-green-100 text-green-600">
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>

                {/* Review Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{review.author}</h4>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? "fill-current text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <span className="text-muted-foreground text-sm">
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-2 mb-3">
                    {review.comment}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    {/* <button className="text-muted-foreground hover:text-primary">
                      Helpful ({review.helpful})
                    </button>
                    <button className="text-muted-foreground hover:text-primary">
                      Reply
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
