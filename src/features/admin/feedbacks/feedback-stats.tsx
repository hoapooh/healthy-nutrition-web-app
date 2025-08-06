"use client";

import { MessageSquare } from "lucide-react";
import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Feedback } from "@/types/feedback";

interface FeedbackStatsProps {
  feedbacks: Feedback[];
}

export const FeedbackStats: React.FC<FeedbackStatsProps> = ({ feedbacks }) => {
  const totalFeedbacks = feedbacks.length;

  return (
    <div className="space-y-6">
      {/* Total Feedbacks Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Toàn bộ phản hồi
          </CardTitle>
          <MessageSquare className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalFeedbacks}</div>
          <p className="text-muted-foreground text-xs">
            <span className="text-green-600">+12% from last month</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
