"use client"
import StatsCard from "@/components/shared/StatsCard"
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
import { useQuery } from "@tanstack/react-query"
import EarningsLineChart from "@/components/shared/EarningsLineChart"
import SpendingLineChart from "@/components/shared/SpendingLineChart"
import TaskLineChart from "@/components/shared/TaskLineChart"
import SubmissionsBarChart from "@/components/shared/SubmissionBarChart"
import SubmissionStatusPieChart from "@/components/shared/SubmissionStatusPieChart"
import CategoryStatsBarChart from "@/components/shared/CategoryStatsBarChart"
import FinanceOverviewAreaChart from "@/components/shared/FinanceOverviewAreaChart"
import EarningsVsSpendingChart from "@/components/shared/EarningsVsSpeandingChart"
import SubmissionsOverTasksChart from "@/components/shared/SubmissionsOverTasksChart"

const UserDashboardContent = () => {
  const { data: metaRes } = useQuery({
    queryKey: ["user-dashboard-meta"],
    queryFn: userDashboardMetaData,
    refetchOnWindowFocus: "always",
  })

  const { data: submissionGraph } = useQuery({
    queryKey: ["submission-graph"],
    queryFn: () => getSubmissionGraph("30d"),
  })

  const { data: earningsGraph } = useQuery({
    queryKey: ["earnings-graph"],
    queryFn: () => getEarningsGraph("30d"),
  })

  const { data: spendingGraph } = useQuery({
    queryKey: ["spending-graph"],
    queryFn: () => getSpendingGraph("30d"),
  })

  const { data: taskGraph } = useQuery({
    queryKey: ["task-graph"],
    queryFn: () => getTaskGraph("30d"),
  })

  const { data: submissionStatusData } = useQuery({
    queryKey: ["submission-status"],
    queryFn: getSubmissionStatus,
  })

  const { data: categoryStatsData } = useQuery({
    queryKey: ["category-stats"],
    queryFn: getCategoryStats,
  })

  const { data: financeOverviewData } = useQuery({
    queryKey: ["finance-overview"],
    queryFn: () => getFinanceOverview("30d"),
  })

  const meta = metaRes as ApiResponse<IUserMetaResponse>

  return (
    <section className="space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <StatsCard
          title="Submissions"
          value={meta?.data?.worker?.totalSubmissions}
          iconName="Send"
          description="Total submissions you made"
        />
        <StatsCard
          title="Earnings"
          value={meta?.data?.wallet?.totalEarnings}
          iconName="Wallet"
          description="Total earned from tasks"
        />
        <StatsCard
          title="Active Tasks"
          value={meta?.data?.owner?.activeTasks}
          iconName="Briefcase"
          description="Tasks you created"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SubmissionsBarChart data={submissionGraph?.data || []} />
        <EarningsLineChart data={earningsGraph?.data || []} />
        <SpendingLineChart data={spendingGraph?.data || []} />
        <TaskLineChart data={taskGraph?.data || []} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EarningsVsSpendingChart
          earningsData={earningsGraph?.data || []}
          spendingData={spendingGraph?.data || []}
        />
        <SubmissionsOverTasksChart
          submissionData={submissionGraph?.data || []}
          taskData={taskGraph?.data || []}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SubmissionStatusPieChart 
          data={submissionStatusData?.data as any || null}
        />
        <FinanceOverviewAreaChart 
          earningsData={financeOverviewData?.data?.earnings|| null}
          spendingData={financeOverviewData?.data?.spending || null}
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <CategoryStatsBarChart 
          data={categoryStatsData?.data as any || null}
        />
      </div>
    </section>
  )
}

export default UserDashboardContent
