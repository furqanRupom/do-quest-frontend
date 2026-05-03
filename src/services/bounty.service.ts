// all bounties operation like add new bounties and  tasks, retrives, retrives by id, update, delete

"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { IChangeTaskAndBountyStatus, INewTaskAndBounty, ITaskAndBounty } from "@/types/bounty.types"

export async function retriveBountiesAndTasks(queryString:string) {
  try {
      return await  httpClient.get<ITaskAndBounty[]>(
        queryString ? `/tasks?${queryString}` : "/tasks"
      )

  } catch (error) {
    console.log("Error while retriving bounties tasks :",error)
    console.error(error)
  }
}

export async function addNewBountyAndTask(payload: INewTaskAndBounty){
  try{
    return await httpClient.post("/tasks",payload) 
  }
  catch(error){
    console.log("Error while adding new bounties and tasks :",error)
    console.error(error)
  }
}


export async function updateBountyAndTask (id: string, payload: any) {
  try {
    return await httpClient.put<ITaskAndBounty>(`/tasks/${id}`, payload)
  } catch (error) {
    console.log("Error updating bounty tasks:", error)
    throw error
  }
}

export async function deleteBountyAndTask (id: string) {
  try {
    return await httpClient.delete<boolean>(`/tasks/${id}`)
  } catch (error) {
    console.log("Error deleting tasks:", error)
    throw error
  }
}

export async function getBountyAndTaskById  (id: string)  {
  try {
    return await httpClient.get<ITaskAndBounty>(`/tasks/${id}`)
  } catch (error) {
    console.log("Error fetching bounty and task by id:", error)
    throw error
  }
}


export async function changeBountyAndTaskStatus(id:string,payload:IChangeTaskAndBountyStatus){
  try {
    return await httpClient.put<ITaskAndBounty>(`/admin/tasks/${id}`, payload)
  } catch (error) {
    console.log("Error updating bounty tasks:", error)
    throw error
  }
}
