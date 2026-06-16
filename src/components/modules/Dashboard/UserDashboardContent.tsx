"use client"
import {
  getSubmissionGraph,
  getEarningsGraph,
  getSpendingGraph,
  getTaskGraph,
} from "@/services/dashboard.service"
import { useQuery } from "@tanstack/react-query"
import EarningsLineChart from "@/components/shared/EarningsLineChart"
import SubmissionsBarChart from "@/components/shared/SubmissionBarChart"
import EarningsVsSpendingChart from "@/components/shared/EarningsVsSpeandingChart"
import SubmissionsOverTasksChart from "@/components/shared/SubmissionsOverTasksChart"

const UserDashboardContent = () => {

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



  return (
    <section className="space-y-10 py-12">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SubmissionsBarChart data={submissionGraph?.data || []} />
        <EarningsLineChart data={earningsGraph?.data || []} />
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

    </section>
  )
}

export default UserDashboardContent
