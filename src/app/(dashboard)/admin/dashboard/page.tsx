import AdminDashboardContent from "@/components/modules/Dashboard/AdminDashboardContent";
import { getDashboardData } from "@/services/dashboard.service";
import { ApiResponse } from "@/types/api.types";
import { ICountTotals } from "@/types/dashboard.types";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const AdminDashboardPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["admin-dashboard-data"],
    queryFn: getDashboardData,
    staleTime: 30 * 1000, 
    gcTime: 5 * 60 * 1000,
  });


  const dashboardData = queryClient.getQueryData(["admin-dashboard-data"]) as ApiResponse<ICountTotals>;

  console.log(dashboardData.data, "Dashboard Data from Page Component");

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <AdminDashboardContent/>
    </HydrationBoundary>
  )
}

export default AdminDashboardPage
