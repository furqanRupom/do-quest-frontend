import UserDashboardContent from "@/components/modules/Dashboard/UserDashboardContent"
import WelcomeCard from "@/components/shared/WelcomeCard"
import { getUserInfo } from "@/services/auth.service"
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
import { ApiResponse } from "@/types/api.types"
import { IUserMetaResponse } from "@/types/dashboard.types"
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery,
} from "@tanstack/react-query"

const UserDashboardPage = async () => {
  const queryClient = new QueryClient()
  const user = await getUserInfo();


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

      <WelcomeCard
        name={user.name}
      />
      <UserDashboardContent />
    </HydrationBoundary>
  )
}

export default UserDashboardPage
