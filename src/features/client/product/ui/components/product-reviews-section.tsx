"use client";

import React, { useMemo } from "react";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";
import {
  useGetAllReviewsQuery,
  useConfirmReviewQuery,
} from "@/services/review-services";
import { useAuth } from "@/store/hooks/use-auth";
import { Review as ReviewType } from "@/types/review";

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
}

interface ProductReviewsSectionProps {
  productId: string;
  className?: string;
}

export const ProductReviewsSection = ({
  productId,
  className = "",
}: ProductReviewsSectionProps) => {
  const { user } = useAuth();

  // Fetch reviews for this product
  const { data: reviewsData, isLoading: reviewsLoading } =
    useGetAllReviewsQuery({
      productId,
      limit: 100, // Get all reviews for now
    });

  // Check if current user can review this product
  const { data: canReviewData } = useConfirmReviewQuery(
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

    return reviewsData.result.items.map((review: ReviewType) => ({
      id: review.id,
      author: "Anonymous User",
      rating: review.rating,
      date: new Date(review.createdAt).toLocaleDateString(),
      comment: review.comment,
      helpful: 0, // API doesn't provide helpful count
    }));
  }, [reviewsData?.result?.items]);

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
      <Separator /> {/* Individual Reviews */}
      <div className="space-y-6">
        {totalReviews === 0 ? (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">No reviews yet.</p>
            {user && canUserReview && (
              <p className="text-muted-foreground mt-2 text-sm">
                Be the first to review this product!
              </p>
            )}
            {user && !canUserReview && (
              <p className="text-muted-foreground mt-2 text-sm">
                You can only review products once per product.
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
              <div className="mb-3 flex items-start justify-between">
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
              <p className="text-muted-foreground mb-3">{review.comment}</p>
              <div className="flex items-center gap-4 text-sm">
                {/* <button className="text-muted-foreground hover:text-primary">
                  Helpful ({review.helpful})
                </button>
                <button className="text-muted-foreground hover:text-primary">
                  Reply
                </button> */}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
