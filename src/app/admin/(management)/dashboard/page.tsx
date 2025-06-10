import { SectionCards } from "@/features/admin/dashboard/ui/components/section-cards";
import { AccountRegisterChart } from "@/features/admin/dashboard/ui/components/account-register-chart";
import { TransactionsChart } from "@/features/admin/dashboard/ui/components/transactions-chart";
import { Metadata } from "next";
// import data from "./data.json";
// import { DataTable } from "@/features/admin/main/ui/components/data-table";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description:
    "Welcome to the admin dashboard. Here you can manage your application, view statistics, and more.",
};

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          {/* <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div> */}
          <div className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-2 lg:px-6">
            <AccountRegisterChart />
            <TransactionsChart />
          </div>
          {/* <DataTable data={data} /> */}
        </div>
      </div>
    </div>
  );
}
