"use server"

import { httpClient } from "@/lib/axios/httpClient";
import { ISubmission } from "@/types/submission.types";
import { ISubmissionPayload } from "@/zod/submission.validation";


export async function submitBounty(bountyId:string,payload:ISubmissionPayload) {
  try {
    return await httpClient.post<ISubmission>(`/tasks/${bountyId}/submissions`,payload)
  }
  catch(error){
    console.log("Error while submitting bounty",error)
    throw error
  }
}
