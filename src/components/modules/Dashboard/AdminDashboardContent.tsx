"use client"

import StatsCard from "@/components/shared/StatsCard"
import TasksBountiesBarChart from "@/components/shared/TasksBountiesBarChart"
import { getDashboardData, getTasksBounteisBarChartData } from "@/services/dashboard.service"
import { ApiResponse } from "@/types/api.types"
import { ICountTotals } from "@/types/dashboard.types"
import { useQuery } from "@tanstack/react-query"

const AdminDashboardContent = () => {
  const { data: adminDashboardData } = useQuery({
    queryKey: ["admin-dashboard-data"],
    queryFn: getDashboardData,
    refetchOnWindowFocus: "always",
  });

  const { data: adminDashboardBarData } = useQuery({
    queryKey: ["admin-dashboard-bar-data"],
    queryFn: getTasksBounteisBarChartData,
    refetchOnWindowFocus: "always",
  });
  const { data } = adminDashboardData as ApiResponse<ICountTotals>;
  const barChartData = adminDashboardBarData as ApiResponse<any>;
  return (
    <section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
        <StatsCard title="Total Tasks and Bounties" value={data.tasks} iconName="CalenderDays" description="Total number of tasks and bounties" />


        <StatsCard title="Total Submissions" value={data.submissions} iconName="CalenderDays" description="Total number of submissions " />


        <StatsCard title="Total Users" value={data.users} iconName="CalenderDays" description="Total Users" />
      </div>
      <div className="pt-20">

        <TasksBountiesBarChart data={barChartData?.data} />
      </div>
    </section>
  );
}

export default AdminDashboardContent
