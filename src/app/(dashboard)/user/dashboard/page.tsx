import UserDashboardContent from "@/components/modules/Dashboard/UserDashboardContent"
import {
  userDashboardMetaData,
  getSubmissionGraph,
  getEarningsGraph,
  getSpendingGraph,
  getTaskGraph,
  getSubmissionStatus,
  getCategoryStats,
  getFinanceOverview,
} from "@/services/dashboard.service"
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"

const UserDashboardPage = async () => {
  const queryClient = new QueryClient()

  /* ================= META ================= */
  await queryClient.prefetchQuery({
    queryKey: ["user-dashboard-meta"],
    queryFn: userDashboardMetaData,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  })

  /* ================= GRAPHS ================= */
  await queryClient.prefetchQuery({
    queryKey: ["submission-graph"],
    queryFn: () => getSubmissionGraph("30d"),
    staleTime: 30 * 1000,
  })

  await queryClient.prefetchQuery({
    queryKey: ["earnings-graph"],
    queryFn: () => getEarningsGraph("30d"),
    staleTime: 30 * 1000,
  })

  await queryClient.prefetchQuery({
    queryKey: ["spending-graph"],
    queryFn: () => getSpendingGraph("30d"),
    staleTime: 30 * 1000,
  })

  await queryClient.prefetchQuery({
    queryKey: ["task-graph"],
    queryFn: () => getTaskGraph("30d"),
    staleTime: 30 * 1000,
  })

  await queryClient.prefetchQuery({
    queryKey: ["submission-status"],
    queryFn: getSubmissionStatus,
    staleTime: 30 * 1000,
  })

  await queryClient.prefetchQuery({
    queryKey: ["category-stats"],
    queryFn: getCategoryStats,
    staleTime: 30 * 1000,
  })

  await queryClient.prefetchQuery({
    queryKey: ["finance-overview"],
    queryFn: () => getFinanceOverview("30d"),
    staleTime: 30 * 1000,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserDashboardContent />
    </HydrationBoundary>
  )
}

export default UserDashboardPage
