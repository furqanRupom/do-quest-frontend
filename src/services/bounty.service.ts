// all bounties operation like add new bounties and  tasks, retrives, retrives by id, update, delete

"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { type IChangeTaskAndBountyStatus, type INewTaskAndBounty, type ITaskAndBounty } from "@/types/bounty.types"
import { ICreateBountyTaskPayload } from "@/zod/bounty.validation"

export async function retriveBountiesAndTasks(queryString: string) {
  try {
    return await httpClient.get<ITaskAndBounty[]>(
      queryString ? `/tasks?${queryString}` : "/tasks"
    )

  } catch (error) {
    console.log("Error while retriving bounties tasks :", error)
    console.error(error)
  }
}

export async function addNewBountyAndTask(payload: ICreateBountyTaskPayload) {
  try {
    console.log(payload)
    return await httpClient.post<ITaskAndBounty>("/payment/tasks", payload)
  }
  catch (error) {
    console.log("Error while adding new bounty and task :", error)
    throw error
  }
}


export async function updateBountyAndTask(id: string, payload: any) {
  try {
    return await httpClient.put<ITaskAndBounty>(`/tasks/${id}`, payload)
  } catch (error) {
    console.log("Error updating bounty tasks:", error)
    throw error
  }
}

export async function deleteBountyAndTask(id: string) {
  try {
    return await httpClient.delete<boolean>(`/tasks/${id}`)
  } catch (error) {
    console.log("Error deleting tasks:", error)
    throw error
  }
}

export async function getBountyAndTaskById(id: string) {
  try {
    return await httpClient.get<ITaskAndBounty>(`/tasks/${id}`)
  } catch (error) {
    console.log("Error fetching bounty and task by id:", error)
    throw error
  }
}


export async function changeBountyAndTaskStatus(id: string, payload: IChangeTaskAndBountyStatus) {
  try {
    return await httpClient.put<ITaskAndBounty>(`/tasks/status/${id}`, payload)
  } catch (error) {
    console.log("Error updating bounty tasks:", error)
    throw error
  }
}

export async function retriveAllTaskBountiesAdmin(queryString: string) {
  try {
    return await httpClient.get<ITaskAndBounty[]>(
      queryString ? `/admin/tasks?{queryString}` : "/admin/tasks"
    )
  } catch (error) {
    console.log("Error fetching tasks and bounties for admin : ", error)
    throw error
  }
}
export async function retriveAllMyBounties(queryString: string) {
  try {
    return await httpClient.get<ITaskAndBounty[]>(
      queryString ? `/tasks/my?{queryString}` : "/tasks/my"
    )
  } catch (error) {
    console.log("Error fetching tasks and bounties for admin : ", error)
    throw error
  }
}
