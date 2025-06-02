import { SectionCards } from "@/features/admin/dashboard/ui/components/section-cards";
import { ChartAreaInteractive } from "@/features/admin/dashboard/ui/components/chart-area-interactive";
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
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          {/* <DataTable data={data} /> */}
        </div>
      </div>
    </div>
  );
}
