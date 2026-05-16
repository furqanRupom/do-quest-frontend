"use server"

import { httpClient } from "@/lib/axios/httpClient";
import { ISubmission } from "@/types/submission.types";
import { ISubmissionPayload } from "@/zod/submission.validation";


export async function submitBounty(bountyId:string,payload:ISubmissionPayload) {
  try {
    return await httpClient.post<ISubmission>(`/submissions/${bountyId}`,payload)
  }
  catch(error){
    console.log("Error while submitting bounty",error)
    throw error
  }
}

export async function getBountySubmissions(bountyId:string, queryString:string) {
  try {
    return await httpClient.get<ISubmission[]>(
      queryString ? `/submissions/${bountyId}?${queryString}` : `/submissions/${bountyId}?${queryString}`
    )
  }catch(error:any) {
    console.log("Error while fetching all bounties  submissions",error)
    throw error
  }
}


export async function getMyBountySubmissions(queryString:string) {
  try {
    return await httpClient.get<ISubmission[]>(
      queryString ? `/submissions/tasks/my?${queryString}` : "/submissions/tasks/my"
    )
  }catch(error:any) {
    console.log("Error while fetching my bounties submissions", error)
    throw error
  }
}

