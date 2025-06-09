"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateFeedbackMutation } from "@/services/feedback-services";
import toast from "react-hot-toast";

const HomeFeedback = () => {
  const [feedbackContent, setFeedbackContent] = useState("");
  const [createFeedback, { isLoading }] = useCreateFeedbackMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!feedbackContent.trim()) {
      toast.error("Please enter your feedback before sending");
      return;
    }

    try {
      await createFeedback({ content: feedbackContent }).unwrap();
      toast.success("Thank you for your feedback! We appreciate your input.");
      setFeedbackContent("");
    } catch (error) {
      console.error("Failed to send feedback:", error);
      toast.error("Failed to send feedback. Please try again.");
    }
  };

  return (
    <div className="mt-10 bg-gradient-to-r from-green-50 to-blue-50 px-4 py-12">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl">
          We Value Your Feedback
        </h2>
        <p className="mb-8 text-base text-gray-600 md:text-lg">
          Feel free to share your feedback about our platform or anything you
          want to be updated. Your insights help us improve and serve you
          better!
        </p>

        <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
          <div className="flex flex-col gap-4 sm:flex-row">
            <Input
              type="text"
              placeholder="Share your thoughts, suggestions, or feedback..."
              value={feedbackContent}
              onChange={(e) => setFeedbackContent(e.target.value)}
              className="h-12 flex-1 border-2 border-gray-200 px-4 text-base transition-colors focus:border-green-500"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading || !feedbackContent.trim()}
              className="h-12 bg-green-600 px-8 font-semibold text-white transition-colors hover:bg-green-700 disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Send Feedback"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomeFeedback;
