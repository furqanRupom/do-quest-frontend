"use server"

import { httpClient } from "@/lib/axios/httpClient"
import {
  ICountTotals,
  IUserMetaResponse,
  ISubmissionGraphResponse,
  IEarningsGraphResponse,
  ISpendingGraphResponse,
  ISubmissionStatusGraphResponse,
  ICategoryStatsGraphResponse,
  IFinanceOverviewResponse,
  ITaskGraphResponse,
} from "@/types/dashboard.types"

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




export async function userDashboardMetaData (){
  try {
    return await httpClient.get<IUserMetaResponse>("/dashboard/meta")
  }catch(error:any){
    return {
      success:false,
      message:error.message || "An error occured while retrieving user dashboard meta data",
      data:null
    }
  }
}


export async function getSubmissionGraph(range = "30d") {
  try {
    const response = await httpClient.get<ISubmissionGraphResponse>(
      `/dashboard/graph/submissions?range=${range}`
    )
    return response
  } catch (error: any) {
    return {
      success: false,
      message:
        error.message || "Error fetching submission graph data",
      data: null,
    }
  }
}


export async function getEarningsGraph(range = "30d") {
  try {
    const response = await httpClient.get<IEarningsGraphResponse>(
      `/dashboard/graph/earnings?range=${range}`
    )
    return response
  } catch (error: any) {
    return {
      success: false,
      message:
        error.message || "Error fetching earnings graph data",
      data: null,
    }
  }
}


export async function getSpendingGraph(range = "30d") {
  try {
    const response = await httpClient.get<ISpendingGraphResponse>(
      `/dashboard/graph/spending?range=${range}`
    )
    return response
  } catch (error: any) {
    return {
      success: false,
      message:
        error.message || "Error fetching spending graph data",
      data: null,
    }
  }
}
export async function getTaskGraph(range = "30d") {
  try {
    const response = await httpClient.get<ITaskGraphResponse>(
      `/dashboard/graph/tasks?range=${range}`
    )
    return response
  } catch (error: any) {
    return {
      success: false,
      message:
        error.message || "Error fetching task graph data",
      data: null,
    }
  }
}

export async function getSubmissionStatus() {
  try {
    const response = await httpClient.get<ISubmissionStatusGraphResponse>(
      `/dashboard/graph/submission-status`
    )
    return response
  } catch (error: any) {
    return {
      success: false,
      message:
        error.message || "Error fetching submission status data",
      data: null,
    }
  }
}


export async function getCategoryStats() {
  try {
    const response = await httpClient.get<ICategoryStatsGraphResponse>(
      `/dashboard/graph/categories`
    )
    return response
  } catch (error: any) {
    return {
      success: false,
      message:
        error.message || "Error fetching category stats data",
      data: null,
    }
  }
}


export async function getFinanceOverview(range = "30d") {
  try {
    const response = await httpClient.get<IFinanceOverviewResponse>(
      `/dashboard/graph/finance?range=${range}`
    )
    return response
  } catch (error: any) {
    return {
      success: false,
      message:
        error.message || "Error fetching finance overview data",
      data: null,
    }
  }
}
 
