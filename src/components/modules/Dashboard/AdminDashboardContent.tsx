"use client"

import StatsCard from "@/components/shared/StatsCard"
import { getDashboardData } from "@/services/dashboard.service"
import { ApiResponse } from "@/types/api.types"
import { ICountTotals } from "@/types/dashboard.types"
import { useQuery } from "@tanstack/react-query"

const AdminDashboardContent = () => {
  const { data: adminDashboardData } = useQuery({
    queryKey: ["admin-dashboard-data"],
    queryFn: getDashboardData,
    refetchOnWindowFocus: "always", // Refetch the data when the window regains focus
  });

  const { data } = adminDashboardData as ApiResponse<ICountTotals>;
  console.log(data) // {submissions:number,tasks:number,users:number}
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
      <StatsCard title="Total Tasks and Bounties" value={data.tasks} iconName="CalenderDays" description="Total number of tasks and bounties"/>


      <StatsCard title="Total Submissions" value={data.submissions} iconName="CalenderDays" description="Total number of submissions "/>

      
      <StatsCard title="Total Users" value={data.users} iconName="CalenderDays" description="Total Users"/>
    </div>
  );
}

export default AdminDashboardContent
