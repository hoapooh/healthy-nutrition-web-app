"use client";

import { Trash2 } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Feedback } from "@/types/feedback";

interface FeedbackItemProps {
  feedback: Feedback;
  onDelete: (feedback: Feedback) => void;
  isDeleting: boolean;
}

export const FeedbackItem: React.FC<FeedbackItemProps> = ({
  feedback,
  onDelete,
  isDeleting,
}) => {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {feedback.content}
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(feedback)}
            disabled={isDeleting}
            className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
