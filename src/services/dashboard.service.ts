"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { ICountTotals } from "@/types/dashboard.types"

export async function getDashboardData() {
  try {
    const response = await httpClient.get<ICountTotals>("/admin/count/totals")
    return response
  } catch (error: any) {
    console.error(error)
    return {
      success: false,
      message: error.message || "An error occured while retrieving dashboard data",
      data: null
    }
  }
}
export async function getTasksBounteisBarChartData() {
  try {
    const response = await httpClient.get<any>("/admin/tasks/bar-chart")
    return response
  } catch (error: any) {
    console.error(error)
    return {
      success: false,
      message: error.message || "An error occured while retrieving dashboard data",
      data: null
    }
  }
}
