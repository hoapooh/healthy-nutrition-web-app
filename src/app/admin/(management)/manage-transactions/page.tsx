import { Metadata } from "next";
import { ManageTransactionsPageContent } from "@/features/admin/transactions";

export const metadata: Metadata = {
  title: "Admin Transactions",
  description: "Manage your transactions effectively and efficiently.",
};

export default function TransactionsPage() {
  return <ManageTransactionsPageContent />;
}
