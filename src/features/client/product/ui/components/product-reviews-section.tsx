"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
}

interface RatingDistribution {
  stars: number;
  count: number;
  percentage: number;
}

interface ProductReviewsSectionProps {
  className?: string;
}

export const ProductReviewsSection = ({
  className = "",
}: ProductReviewsSectionProps) => {
  const reviews: Review[] = [
    {
      id: "1",
      author: "Sarah Johnson",
      rating: 5,
      date: "2024-01-15",
      comment:
        "Excellent product! Great quality and taste. Highly recommended for anyone looking to maintain a healthy diet.",
      helpful: 12,
    },
    {
      id: "2",
      author: "Mike Chen",
      rating: 4,
      date: "2024-01-10",
      comment: "Good nutritional value and packaging. Delivery was quick too.",
      helpful: 8,
    },
    {
      id: "3",
      author: "Emily Davis",
      rating: 5,
      date: "2024-01-05",
      comment:
        "Amazing results after using this for a month. Feel much more energetic!",
      helpful: 15,
    },
  ];

  const averageRating = 4.7;
  const totalReviews = 127;
  const ratingDistribution: RatingDistribution[] = [
    { stars: 5, count: 85, percentage: 67 },
    { stars: 4, count: 28, percentage: 22 },
    { stars: 3, count: 10, percentage: 8 },
    { stars: 2, count: 3, percentage: 2 },
    { stars: 1, count: 1, percentage: 1 },
  ];

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

      <Separator />

      {/* Individual Reviews */}
      <div className="space-y-6">
        {reviews.map((review) => (
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
              <button className="text-muted-foreground hover:text-primary">
                Helpful ({review.helpful})
              </button>
              <button className="text-muted-foreground hover:text-primary">
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
