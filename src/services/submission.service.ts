"use server"

import { httpClient } from "@/lib/axios/httpClient";
import { IApprovedSubmission, ISubmission } from "@/types/submission.types";
import { IRejectionSubmissionPayload, IRevisionSubmissionPayload, ISubmissionPayload } from "@/zod/submission.validation";


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

export async function approveBountySubmission(bountyId:string,submissionId:string) {
  try {
    return await httpClient.put<IApprovedSubmission>(`/submissions/${bountyId}/${submissionId}/approve`,{})
  }catch(error:any) {
    console.log("Error while approving submission", error)
    throw error
  }
}
export async function rejectBountySubmission(submissionId:string, payload:IRejectionSubmissionPayload) {
  try {
    return await httpClient.put(`/submissions/tasks/${submissionId}/reject`,payload)
  }catch(error:any) {
    console.log("Error while rejecting submission", error)
    throw error
  }
}
export async function revisionBountySubmission(submissionId:string, payload:IRevisionSubmissionPayload) {
  try {
    return await httpClient.patch<ISubmission>(`/submissions/tasks/${submissionId}/revision`,payload)
  }catch(error:any) {
    console.log("Error while revisioning submission", error)
    throw error
  }
}
export async function resubmitBountySubmission(submissionId:string, payload:ISubmissionPayload) {
  try {
    return await httpClient.patch(`/submissions/tasks/${submissionId}/resubmit`,payload)
  }catch(error:any) {
    console.log("Error while revisioning submission", error)
    throw error
  }
}
