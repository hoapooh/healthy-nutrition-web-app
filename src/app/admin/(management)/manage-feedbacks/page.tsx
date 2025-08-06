import { Metadata } from "next";

import { FeedbackList } from "@/features/admin/feedbacks";

export const metadata: Metadata = {
  title: "Quản lý phản hồi",
  description: "Manage user feedback effectively.",
};

const FeedbackPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-primary mb-6 text-3xl font-bold">Quản lý phản hồi</h1>
      <FeedbackList />
    </div>
  );
};

export default FeedbackPage;
