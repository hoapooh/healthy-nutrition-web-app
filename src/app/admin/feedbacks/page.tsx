import React from "react";

const FeedbackPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Feedback</h1>
      <div className="grid gap-6">
        <div className="bg-card rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">Feedback Management</h2>
          <p className="text-muted-foreground">
            This is the Feedback page. You can manage user feedback here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
