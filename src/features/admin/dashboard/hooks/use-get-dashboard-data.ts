import { useGetDashboardDataQuery } from "@/services/dashboard-services";

const useGetDashboardData = () => {
  const { data: dashboardData, isLoading: isDashboardDataLoading } =
    useGetDashboardDataQuery();
  return { dashboardData, isDashboardDataLoading };
};

export default useGetDashboardData;
